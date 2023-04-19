const cron = require('node-cron');
const moment = require("moment/moment");

const revertFailedAuction = async (auction) => {
  sails.log.info('Ending auction and reverting NFT');
  await Auction.update({id: auction.id}).set({status: 'FAILED'});
  await Nft.update({id: auction.nft.id}).set({auctionId: "", status: 'PORTFOLIO'});
};
const transferAuctionedNft = async (auction) => {
  if(!auction.bid.length) {
    sails.log.info(`No Bid found for auction id: ${auction.id}`)
    revertFailedAuction(auction)
  } else {
    const seller = await Wallet.findOne({user: auction.user.id});
    const redeemer = await Wallet.findOne({user: auction.bid[0].user});
    const network = await Network.findOne({chainId: auction.chainId});
    await NftTransaction.create({
      fromUser: auction.user.id,
      fromAddress: seller.address.toLowerCase(),
      toUser: auction.bid[0].user,
      toAddress: redeemer.address.toLowerCase(),
      nftId: auction.nft.id,
      auction: auction.id
    })
    if(auction.nft.minted) {
      sails.log.info('NFT is already minted');
      sails.log.info('Initiating NFT Transfer');
      sails.helpers.transferLazyNft(redeemer.privateKey, seller.address, redeemer.address, auction.voucher, network, auction.bid[0].price).then(transaction => {
        sails.log.info('NFT Transferred');
        Nft.update({id: auction.nft.id})
          .set({user: auction.bid[0].user, status: "PORTFOLIO", auctionId: ""})
          .then(async () => {
            sails.log.info('NFT record updated');
            await Auction.update({id: auction.id}).set({status: "ENDED"});
            sails.log.info('Auction Ended');
          }).catch(e => sails.log.error(e));
      }).catch(e=> {
          sails.log.error(e);
        })
    } else {
      sails.log.info('NFT is not minted')
      console.log(JSON.stringify([auction.voucher.minPrice, auction.voucher.uri, auction.voucher.royaltyPercentage, auction.voucher.signature]))
      sails.helpers.mintLazyNft(redeemer.privateKey, seller.address, redeemer.address, auction.voucher, network, auction.bid[0].price).then(tokenId => {
        sails.log.info('NFT is minted with token id: '+tokenId)
        Nft.update({id: auction.nft.id})
          .set({user: auction.bid[0].user, status: "PORTFOLIO", auctionId: "", minted: true, tokenId})
          .then(async () => {
            sails.log.info('NFT record updated');
            await Auction.update({id: auction.id}).set({status: "ENDED"});
            sails.log.info('Auction ended');
          }).catch(e => sails.log.error(e))
      }).catch(e=> {
        sails.log.error(e);
      })
    }

  }
}
// Schedule task to run at the end of the day
const task = cron.schedule('59 * * * * *', () => {
  // Perform your task here
  sails.log.info('Scheduled task started');
  sails.log.info("checking for expired auctions");
  const currentTime = moment().valueOf();
  console.log(`Current time is ${currentTime}`)
  Auction.find({endTime: {'<': currentTime}, status: 'ACTIVE'}).populate('nft').populate('user').populate('bid', {sort: 'price DESC', limit: 1}).then(auctions => {
    if(auctions.length) {
      sails.log.info('Found Expired Auctions');
      auctions.forEach(e => {
        sails.log.info(`Transferring NFT: ${e.nft.id} to User: ${e.user.id}`)
        transferAuctionedNft(e)
      })
    }
  })
}, {
  scheduled: false
});

// Start the scheduler
task.start();
