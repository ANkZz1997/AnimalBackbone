/**
 * MarketplaceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  list: (req, res) => {
    const {page, limit} = req.body;
    Marketplace.find().limit(limit).skip(limit*(page - 1)).populateAll().then(result => {
      res.ok(result);
    });
  },
  detail: (req, res) => {
    const {id} = req.query;
    Marketplace.findOne({id: id})
      .populate('user')
      .populate('nft')
      .then(result => {
        res.ok(result)
      });
  },
  addToMarketPlace: async (req, res) => {
    const {nftId, price} = req.body;
    const nft = await Nft.findOne({id: nftId, user: req.payload.id, status: 'PORTFOLIO'});
    if(!nft) return res.badRequest("nft does not exist");
    Marketplace.create({
      user: req.payload.id,
      nft: nft.id,
      price
    }).fetch().then(result => {
      Nft.update({id: nft.id}).set({status: 'MARKETPLACE'}).then(_result => {
        res.ok(result)
      });
    });
  },
  updatePrice: async (req, res) => {
    const {id, price} = req.body;
    Marketplace.update({id: id, user: req.payload.id}).set({price: price})
      .fetch()
      .then(result => {
        res.ok(result);
      }).catch(e => {
        res.badRequest(e);
      });
  },
  removeFromMarketplace: (req, res) => {
    const {id} = req.body;
    Marketplace.update({id: id, user: req.payload.id})
      .set({isDeleted: true, status: 'DELETED'})
      .fetch()
      .then(result => {
        res.ok(result)
      })
  },
  buy: (req, res) => {
    const {id} = req.body;
    Marketplace.findOne({id, status: 'PENDING'})
      .then(result => {
        if(!result) return res.badRequest();
        Nft.update({id: result.nft})
          .set({user: req.payload.id, status: 'PORTFOLIO'})
          .then(_result => {
            res.ok(_result);
          });
      });
  }
};
