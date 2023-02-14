/**
 * MarketplaceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: async (req, res) => {
    const {page = 1, limit = 20, sort = 'createdAt', order = 'DESC'} = req.query;
    const criteria = req.body;
    criteria.isDeleted = false;
    const totalCount = await Marketplace.count(criteria);
    Marketplace.find(criteria)
      .limit(limit)
      .skip((page-1)*limit)
      .sort(`${sort} ${order}`)
      .populate('nft')
      .populate('user')
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
    const {page, limit} = req.body;
    Marketplace.find(
      {isDeleted: {'!=': true}}
    ).limit(limit).skip(limit*(page - 1)).populateAll().then(result => {
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
    }).fetch().then(async result => {
      await sails.helpers.captureActivities({
        action:"NFT",
        type:"ADDTOMARKET",
        user:req.payload.id,
        payload:{
        },
        nft:nft.id,
        marketplace: result.id
    });
      Nft.update({id: nft.id}).set({status: 'MARKETPLACE', marketPlaceId: result.id}).then(_result => {
        res.ok(result)
      });
    });
  },
  updatePrice: async (req, res) => {
    const {id, price} = req.body;
    const marketplace = await Marketplace.findOne({id: id, user: req.payload.id});
    Marketplace.update({id: id, user: req.payload.id}).set({price: price})
      .fetch()
      .then(async result => {
        await sails.helpers.captureActivities({
          action:"NFT",
          type:"UPDATEPRICE",
          user:req.payload.id,
          payload:{
            updatedprice:price,
            oldprice: marketplace.price
          },
          nft:marketplace.nft,
          marketplace: id
      });
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
      .then(async result => {
        await sails.helpers.captureActivities({
          action:"NFT",
          type:"REMOVEFROMMARKET",
          user:req.payload.id,
          nft:result.nft,
          marketplace: id
      });
        await Nft.update({id: result[0].nft}).set({status: 'PORTFOLIO', marketplaceId: ''})
        res.ok(result)
      });
  },
  buy: (req, res) => {
    const {id} = req.body;
    Marketplace.findOne({id, status: 'PENDING'})
      .then(result => {
        if(!result) return res.badRequest();
        Nft.update({id: result.nft})
          .set({user: req.payload.id, status: 'PORTFOLIO', marketplaceId: ''})
          .then(async _result => {
            await sails.helpers.captureActivities({
              action:"NFT",
              type:"BUY",
              user:req.payload.id,
              nft:result.nft,
              marketplace: id
          });
            await Marketplace.update({id: result.id}).set({status: 'COMPLETED'})
            res.ok(_result);
          });
      });
  }
};

