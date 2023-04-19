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
    NftTransaction.create({
      fromUser: from.id,
      fromAddress: from.wallet.address.toLowerCase(),
      toUser: to.id,
      toAddress: to.wallet.address.toLowerCase(),
      nftId: nftId,
      chainId: req.payload.chainId,
      marketplace: marketplaceId,
      auction: auctionId
    }).fetch().then(result => {
      return res.ok(result)
    });
  }
};

