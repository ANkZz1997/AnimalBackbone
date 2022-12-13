/**
 * AuctionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: async (req, res) => {
    const {page = 1, limit = 20, sort = 'createdAt', order = 'DESC'} = req.query;
    const criteria = req.body;
    const totalCount = await Auction.count(criteria);
    Auction.find(criteria)
      .limit(limit)
      .skip((page-1)*limit)
      .sort(`${sort} ${order}`)
      .then(result => {
        res.ok({
          records: result,
          totalCount
        });
      }).catch(e => {
      res.badRequest(e);
    });
  },
  list: (req, res) => {
    Auction.find({status: 'ACTIVE'}).populateAll()
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
            res.ok(_result);
          });
      });
  },
  detail: (req, res) => {
    const {id} = req.query;
    Auction.findOne({id: id})
      .populate('user')
      .populate('nft')
      .then(result => {
        res.ok(result);
      });
  }
};

