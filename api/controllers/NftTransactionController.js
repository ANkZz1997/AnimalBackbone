/**
 * NftTransactionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  initiate: async (req, res) => {
    const { fromId, toId, nftId, marketplaceId, auctionId } = req.body;
    const from = await User.findOne({ id: fromId }).populate("wallet");
    const to = await User.findOne({ id: toId }).populate("wallet");
    NftTransaction.create({
      fromUser: from.id,
      fromAddress: from.wallet.address.toLowerCase(),
      toUser: to.id,
      toAddress: to.wallet.address.toLowerCase(),
      nft: nftId,
      chainId: req.payload.chainId,
      marketplace: marketplaceId,
      auction: auctionId,
    })
      .fetch()
      .then((result) => {
        return res.ok(result);
      });
  },

  getTotalTransaction: async (req, res) => {
    try {
      const dataArray = await NftTransaction.find({
        where: {status:"SUCCESS", marketplace: { "!=": null } },
      })
        .populate("toUser")
        .populate("marketplace")
        .then((transactions) =>
          transactions.filter((transaction) => transaction.marketplace !== null)
        );

  

      const resultArray = Object.values(
        dataArray.reduce((acc, obj) => {
          const username = obj.toUser.username;
          const price = parseFloat(obj.marketplace.price); // Convert price to a number

          // Check if price is a valid number
          if (!isNaN(price)) {
            if (!acc[username]) {
              acc[username] = {
                buyerId: obj.toUser.id,
                firstName: obj.toUser.firstName,
                lastName: obj.toUser.lastName,
                avatar: obj.toUser.avatar,
                username: obj.toUser.username,
                totalPrice: 0,
              };
            }

            // Add the price to the total price for this user
            acc[username].totalPrice += price;
            acc[username].totalPrice = parseFloat(
              acc[username].totalPrice.toFixed(6)
            );
          }

          return acc;
        }, {})
      );

      const topBuyers = resultArray.sort((a, b) => b.totalPrice - a.totalPrice).slice(0,20);
      const transactionCount = topBuyers.length;

      return res.ok({ data: topBuyers, totalCount: transactionCount });
    } catch (err) {
      return res.badRequest();
    }
  },
};
