/**
 * AdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  users: async (req, res) => {
    const {page = 1, limit = 20, sort = 'createdAt', order = 'DESC'} = req.query;
    const totalCount = await User.count();
    const criteria = req.body;
    User.find(criteria)
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
  nft: async (req, res) => {
    const {page = 1, limit = 20, sort = 'createdAt', order = 'DESC'} = req.query;
    const totalCount = await Nft.count();
    const criteria = req.body;
    Nft.find(criteria)
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
  auctions: async (req, res) => {
    const {page = 1, limit = 20, sort = 'createdAt', order = 'DESC'} = req.query;
    const totalCount = await Auction.count();
    const criteria = req.body;
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
  marketplace: async (req, res) => {
    const {page = 1, limit = 20, sort = 'createdAt', order = 'DESC'} = req.query;
    const totalCount = await Marketplace.count();
    const criteria = req.body;
    Marketplace.find(criteria)
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
  bids: async (req, res) => {
    const {page = 1, limit = 20, sort = 'createdAt', order = 'DESC'} = req.query;
    const totalCount = await Bid.count();
    const criteria = req.body;
    Bid.find(criteria)
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
};

