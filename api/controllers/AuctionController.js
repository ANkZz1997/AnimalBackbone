/**
 * AuctionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  list: (req, res) => {
    Auction.find({status: 'ACTIVE'}).pupulateAll()
      .then(result => {
        res.ok(result);
      })
  },
  createAuction: (req, res) => {
    const {nftId, basePrice, endTime} = req.body;
    Nft.findOne({id: nftId, user: req.payload.id, status: 'PORTFOLIO'})
      .then(result => {
        Auction.create({
          user: req.payload.id,
          nft: nftId,
          basePrice: basePrice,
          endTime: endTime
        }).fetch()
          .then(async _result => {
            await Nft.update({id: nftId}).set({status: 'AUCTION'});
            res.ok(result)
          });
      });
  }
};

