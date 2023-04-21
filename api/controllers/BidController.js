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
        
        const lastBid = await Bid.find({
          auction: auctionId
        })
        .limit(1)
        .sort(`createdAt DESC`);

        if(lastBid.length > 0 && lastBid[0].user === req.payload.id){
          return res.badRequest('Last build was made by you. Please wait for another user to bid before placing a new bid on this auction.')
        }
        
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
              ipAddress:req.clientIp
            }
          });
          res.ok(_result);
        }).catch(e => {
          res.badRequest(e)
        });
      });
  },

  lastBid: async (req, res) => {
    try{
      const {auctionId} = req.query;
      const auction = await Auction.findOne({id: auctionId, status: 'ACTIVE'});
      if(!auction) return res.badRequest('Auction does not exist');
      const lastBid = await Bid.find({
        auction: auctionId
      })
      .populate('user')
      .populate('auction')
      .limit(1)
      .sort(`createdAt DESC`);

      if(lastBid.length > 0){
        res.ok(lastBid[0]);
      } else {
        res.badRequest('No Bid found for this Auction Yet');
      }
    }catch (e) {
      res.badRequest(e);
    }
  }
};