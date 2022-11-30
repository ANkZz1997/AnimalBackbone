/**
 * BidController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: (req, res) => {
    const {auctionId, price} = req.body;
    Auction.findOne({id: auctionId, status: 'ACTIVE'})
      .then(result => {
        if(!result) return res.badRequest('Auction does not exist');
        if(price < result.basePrice) return res.badRequest('Price can not be less then base price');
        Bid.create({
          user: req.payload.id,
          auction: auctionId,
          price
        }).fetch().then(_result => {
          res.ok(_result);
        }).catch(e => {
          res.badRequest(e)
        });
      });
  }
};

