/**
 * NftTransactionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  initiate: async (req, res) => {
    const {fromId, toId, nftId, marketplaceId, auctionId} = req.body;
    const from = await User.findOne({id: fromId}).populate('wallet');
    const to = await User.findOne({id: toId}).populate('wallet');
    console.log('from ====> ',from) 
    console.log('to ====> ',to) 

    const marketplace = await Marketplace.findOne({id:marketplaceId})
    const settings = await Settings.findOne({ uid: 1 });
    let platformFee
      if(settings.commissionType == 'percent'){
        platformFee = (marketplace.price * settings.commission)/100
      }
    NftTransaction.create({
      fromUser: from.id,
      fromAddress: from.wallet.address.toLowerCase(),
      toUser: to.id,
      toAddress: to.wallet.address.toLowerCase(),
      nft: nftId,
      chainId: req.payload.chainId,
      marketplace: marketplaceId,
      auction: auctionId,
      platformFee:platformFee,
    }).fetch().then(result => {
      console.log('final result  ====>',result)
      return res.ok(result)
    });
  },

};

