/**
 * MarketplaceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


const createMintingVoucher = async (wallet, price, nft, chainId, cb) => {
  const voucher = await sails.helpers.generateMintingSignature(
    wallet.privateKey,
    price,
    nft.metaData,
    nft.royalty,
    chainId
  );
  return cb(voucher);
};

const createSellingVoucher = async (wallet, nft, price, chainId, cb) => {
  const voucher = await sails.helpers.generateSellingSignature(
    wallet.privateKey,
    nft.tokenId,
    price,
    chainId
  );
  return cb(voucher);
}

const createMatketplaceItem = (userId, nftId, price, voucher, chainId, cb) => {
  Marketplace.create({
    user: userId,
    nft: nftId,
    price,
    voucher,
    chainId: chainId
  }).fetch().then(item => cb(null, item)).catch(e => cb(e))
}

module.exports = {
  index: async (req, res) => {
    const {
      page = 1,
      limit = 20,
      sort = "recent",
    } = req.query;

    const {
      search = ''
    } = req.body;

    let criteria = {
      "status": "PENDING",
      "isDeleted":{$ne:true}
    };

    if(req.payload.chainId){
      criteria['chainId'] =  Number(req.payload.chainId);
    }
    if(search){
      criteria["nft.name"] = {"$regex":search, '$options' : 'i'}
    }

    let filter = sails.config.custom['recent'];

    if(sails.config.custom.marketPlaceFilters[sort]){
      filter = sails.config.custom.marketPlaceFilters[sort];
    }

    //const criteria = req.body;
    //criteria.isDeleted = false;
    //criteria.chainId = req.payload.chainId;
    //const totalCount = await Marketplace.count(criteria);
    /*Marketplace.find(criteria)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort(`${sort} ${order}`)
      .populate("nft")
      .populate("user")
      .then((result) => {
        res.ok({
          records: result,
          totalCount,
        });
      })
      .catch((e) => {
        res.badRequest(e);
      });*/
      
      Marketplace.native((e,collection) => {
        collection.aggregate(
            [
              { $lookup: {from: 'nft', localField: 'nft', foreignField: '_id', as: 'nft' }},
              { $lookup: {from: 'user', localField: 'user', foreignField: '_id', as: 'user'} },
              { $unwind: "$nft" },
              { $unwind: "$user" },
              { $match : criteria},
              { $facet: {
                "records": [
                  { $skip : Number(limit * (page - 1)) },
                  { $limit: Number(limit) },
                  { $sort: filter }
                ],
                "totalCount": [
                  { "$count": "count" }
                ]
              }}
            ],
            async (err,result) => {
              if (err) return res.badRequest(err);
              result = await result.toArray();
              res.ok({
                records: result[0].records,
                totalCount: (result[0].totalCount.length > 0)?result[0].totalCount[0].count:0
              });
            })
      });
  },
  list: (req, res) => {
    const { page, limit } = req.body;
    Marketplace.find({ isDeleted: { "!=": true } })
      .limit(limit)
      .skip(limit * (page - 1))
      .populateAll()
      .then((result) => {
        res.ok(result);
      });
  },
  detail: async (req, res) => {
    const { id } = req.query;
    Marketplace.findOne({ id: id })
      .populate("user")
      .then(async (result) => {
        if(result && result.nft){
          const id = result.nft;
          const nftDetails = await sails.helpers.nftDetails({id,loggedInUser:req.payload.id});
          result['nft'] = nftDetails;
        }
        res.ok(result);
      }).catch((e)=> {
        res.badRequest('Something went wrong');
      });
  },
  addToMarketPlaceWithVoucher: async (req, res) => {
    const { nftId, price, voucher } = req.body;
    const nft = await Nft.findOne({
      id: nftId,
      user: req.payload.id,
      status: "PORTFOLIO",
    });
    createMatketplaceItem(req.payload.id, nft.id, price, voucher, req.payload.chainId, async (err, item) => {
      if(err) return res.badRequest(err);
      await sails.helpers.captureActivities({
        action: "NFT",
        type: "ADDTOMARKET",
        user: req.payload.id,
        payload: {},
        nft: nft.id,
        marketplace: item.id,
      });
      Nft.update({ id: nft.id })
        .set({ status: "MARKETPLACE", marketPlaceId: item.id })
        .then((_result) => {
          res.ok(item);
        });
    })
  },
  addToMarketPlace: async (req, res) => {
    const { nftId, price } = req.body;
    const wallet = await Wallet.findOne({user: req.payload.id});
    const nft = await Nft.findOne({
      id: nftId,
      user: req.payload.id,
      status: "PORTFOLIO",
    });
    if (!nft) return res.badRequest("nft does not exist");
    if(!nft.minted) {
      createMintingVoucher(wallet, price, nft, req.payload.chainId, voucher => {
        createMatketplaceItem(req.payload.id, nft.id, price, voucher, req.payload.chainId, async (err, item) => {
          if(err) return res.badRequest(err);
          await sails.helpers.captureActivities({
            action: "NFT",
            type: "ADDTOMARKET",
            user: req.payload.id,
            payload: {},
            nft: nft.id,
            marketplace: item.id,
          });
          Nft.update({ id: nft.id })
            .set({ status: "MARKETPLACE", marketPlaceId: item.id })
            .then((_result) => {
              res.ok(item);
            });
        });
      });
    } else {
      createSellingVoucher(wallet, nft, price, req.payload.chainId,  voucher => {
        createMatketplaceItem(req.payload.id, nft.id, price, voucher, req.payload.chainId, async (err, item) => {
          if(err) return res.badRequest(err);
          await sails.helpers.captureActivities({
            action: "NFT",
            type: "ADDTOMARKET",
            user: req.payload.id,
            payload: {},
            nft: nft.id,
            marketplace: item.id,
          });
          Nft.update({ id: nft.id })
            .set({ status: "MARKETPLACE", marketPlaceId: item.id })
            .then((_result) => {
              res.ok(item);
            });
        })
      })
    }
  },
  updatePrice: async (req, res) => {
    const { id, price } = req.body;
    const marketplace = await Marketplace.findOne({
      id: id,
      user: req.payload.id,
    });
    Marketplace.update({ id: id, user: req.payload.id })
      .set({ price: price })
      .fetch()
      .then(async (result) => {
        await sails.helpers.captureActivities({
          action: "NFT",
          type: "UPDATEPRICE",
          user: req.payload.id,
          payload: {
            updatedprice: price,
            oldprice: marketplace.price,
          },
          nft: marketplace.nft,
          marketplace: id,
        });
        res.ok(result);
      })
      .catch((e) => {
        res.badRequest(e);
      });
  },
  removeFromMarketplace: (req, res) => {
    const { id } = req.body;
    Marketplace.update({ id: id, user: req.payload.id })
      .set({ isDeleted: true, status: "DELETED" })
      .fetch()
      .then(async (result) => {
        await sails.helpers.captureActivities({
          action: "NFT",
          type: "REMOVEFROMMARKET",
          user: req.payload.id,
          nft: result.nft,
          marketplace: id,
        });
        await Nft.update({ id: result[0].nft }).set({
          status: "PORTFOLIO",
          marketplaceId: "",
        });
        res.ok(result);
      });
  },
  buy: async (req, res) => {
    const { id } = req.body;
    const network = await Network.findOne({chainId: req.payload.chainId});
    Marketplace.findOne({ id, status: "PENDING" }).populate('nft').then(async (result) => {
      if (!result) return res.badRequest();
      const minter = await Wallet.findOne({user: result.user});
      const redeemer = await Wallet.findOne({user: req.payload.id});
      if(!result.nft.minted) {
        sails.log.info('nft is not minted, minting now');
        sails.helpers.mintLazyNft(redeemer.privateKey, minter.address, redeemer.address, result.voucher, network).then(tokenId => {
          Nft.update({id: result.nft.id})
            .set({user: req.payload.id, status: "PORTFOLIO", marketplaceId: "", minted: true, tokenId})
            .then(async (_result) => {
              await sails.helpers.captureActivities({
                action: "NFT",
                type: "BUY",
                user: req.payload.id,
                nft: result.nft.id,
                marketplace: id,
              });
              await sails.helpers.captureActivities({
                action: "NFT",
                type: "SOLD",
                user: result.user,
                nft: result.nft.id,
                marketplace: id,
              });
              await Marketplace.update({id: result.id}).set({
                status: "COMPLETED",
              });
              res.ok(tokenId);
            });
        }).catch(e => res.badRequest(e));
      } else {
        sails.log.info(`nft is minted, transferring now from ${minter.address} to ${redeemer.address}`);
        sails.helpers.transferLazyNft(redeemer.privateKey, minter.address, redeemer.address, result.voucher, network).then(transaction => {
          Nft.update({id: result.nft.id})
            .set({user: req.payload.id, status: "PORTFOLIO", marketplaceId: ""})
            .then(async (_result) => {
              await sails.helpers.captureActivities({
                action: "NFT",
                type: "BUY",
                user: req.payload.id,
                nft: result.nft.id,
                marketplace: id,
              });
              await sails.helpers.captureActivities({
                action: "NFT",
                type: "SOLD",
                user: result.user,
                nft: result.nft.id,
                marketplace: id,
              });
              await Marketplace.update({id: result.id}).set({
                status: "COMPLETED",
              });
              res.ok(transaction);
            });
        }).catch(e => res.badRequest(e));
      }
    });
  },
};
