/**
 * BidController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async (req, res) => {
    const {auctionId, price} = req.body;
    Auction.findOne({id: auctionId, status: 'ACTIVE'})
      .then(async result => {
        if(!result) return res.badRequest('Auction does not exist');
        if(price < result.basePrice) return res.badRequest('Price can not be less then base price');
        Bid.create({
          user: req.payload.id,
          auction: auctionId,
          price
        }).fetch().then(async _result => {
          await sails.helpers.captureActivities({
            action:"NFT",
            type:"BID",
            user:req.payload.id,
            nft:result.nft,
            auction:auctionId,
            bid:_result.id,
            payload:{
              ipAddress:req.ip
            }
          });
          res.ok(_result);
        }).catch(e => {
          res.badRequest(e)
        });
      });
  }
};

