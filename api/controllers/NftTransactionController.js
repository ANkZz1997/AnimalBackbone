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
    const marketplace = await Marketplace.findOne({id:marketplaceId}).populate('nft')
    const settings = await Settings.findOne({ uid: 1 });

    console.log('from ====> ',from) 
    console.log('to ====> ',to) 

    let platformFee
    if(settings.commissionType == 'percent'){
      platformFee = (marketplace.price * settings.commission)/100
    }
    
    if(marketplace.nft.minted){
      await Royalty.create({
        minter:marketplace.nft.minter,
        toUser: to.id,
        fromAddress: from.wallet.address.toLowerCase(),
        toAddress: to.wallet.address.toLowerCase(),
        fromUser: from.id,
        nft: marketplace.nft.id,
        royalty : ((marketplace.price * marketplace.nft.royalty) /100).toFixed(6),
        marketplace: marketplace.id,
        chainId:marketplace.chainId,
        hash:''
      })
    }

    await NftTransaction.create({
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
