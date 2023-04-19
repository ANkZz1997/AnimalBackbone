/**
 * NftTransactionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  initiate: async (req, res) => {
    const {fromId, toId, nftId, marketplaceId, auctionId} = req.body;
    const from = await User.find({id: fromId}).populate('wallet');
    const to = await User.find({id: toId}).populate('wallet');
    NftTransaction.create({
      fromUser: from.id,
      fromAddress: from.wallet.address.toLowerCase(),
      toUser: to.id,
      toAddress: to.wallet.address.toLowerCase(),
      nftId: nftId,
      chainId: req.payload.chainId,
      marketplace: marketplaceId,
      auction: auctionId
    });
  }
};

