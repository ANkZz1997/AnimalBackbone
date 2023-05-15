/**
 * AuctionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const objectid = require('objectid');

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

const createAuctionItem = (userId, nftId, basePrice, endTime, chainId, voucher, cb) => {
  Auction.create({
    user: userId,
    nft: nftId,
    basePrice,
    endTime,
    chainId,
    voucher
  }).fetch().then(result => cb(null, result)).catch(e => cb(e, null))
};

module.exports = {
  index: async (req, res) => {
    // const {page = 1, limit = 20, sort = 'createdAt', order = 'DESC'} = req.query;
    // const criteria = req.body;
    // criteria.chainId = req.payload.chainId;
    // const totalCount = await Auction.count(criteria);
    // Auction.find(criteria)
    //   .limit(limit)
    //   .skip((page-1)*limit)
    //   .sort(`${sort} ${order}`)
    //   .populate('nft')
    //   .populate('user')
    //   .then(result => {
    //     res.ok({
    //       records: result,
    //       totalCount
    //     });
    //   }).catch(e => {
    //   res.badRequest(e);
    // });
    const {
      page = 1,
      limit = 20,
      sort = "recent",
    } = req.query;

    const {
      search = '',
      user,
      status
    } = req.body;

    let criteria = {
      "isDeleted":{$ne:true}
    };

    if(req.payload.chainId){
      criteria['chainId'] =  Number(req.payload.chainId);
    }
    if(search){
      criteria["nft.name"] = {"$regex":search, '$options' : 'i'}
    }

    if(user && objectid.isValid(user)){
      criteria['user._id'] = objectid(user);
    }

    if(status){
      criteria['status'] = status;
    }

    let filter = sails.config.custom['recent'];

    if(sails.config.custom.auctionFilters[sort]){
      filter = sails.config.custom.auctionFilters[sort];
    }

    const db = Auction.getDatastore().manager;
    db.collection('auction').aggregate(
      [
        {
          $lookup: {
            from: 'nft',
            localField: 'nft',
            foreignField: '_id',
            as: 'nft',
          },
        },
        {
          $lookup: {
            from: 'user',
            localField: 'user',
            foreignField: '_id',
            as: 'user',
          },
        },
        { $unwind: '$nft' },
        { $unwind: '$user' },
        { $match: criteria },
        { $sort: filter },
        {
          $addFields: { 
            id:"$_id",
            nft:{
              id:"$nft._id"
            },
            user:{
              id:"$user._id"
            }
          }
        },
        {
          $facet: {
            records: [
              { $skip: Number(limit * (page - 1)) },
              { $limit: Number(limit) }
            ],
            totalCount: [{ $count: 'count' }],
          },
        },
      ],
      async (err, result) => {
        if (err) return res.badRequest(err);
        result = await result.toArray();
        res.ok({
          records:
            result[0].records && result[0].records.length > 0
              ? result[0].records
              : [],
          totalCount:
            result[0].totalCount.length > 0 ? result[0].totalCount[0].count : 0,
        });
      }
    );
  },
  list: (req, res) => {
    Auction.find({status: 'ACTIVE'}).populateAll()
      .then(result => {
        res.ok(result);
      })
  },
  createAuction: async (req, res) => {
    const {nftId, basePrice, endTime} = req.body;
    const user = await User.findOne({id: req.payload.id}).populate('wallet');
    Nft.findOne({id: nftId, user: req.payload.id, status: 'PORTFOLIO'})
      .then(nft => {
        if(nft.minted) {
          createSellingVoucher(user.wallet, nft, basePrice, req.payload.chainId, (voucher) => {
            createAuctionItem(
              req.payload.id,
              nftId,
              basePrice,
              endTime,
              req.payload.chainId,
              voucher,
              async (err, result) => {
                if(err) return sails.log.error(err);
                await Nft.update({id: nftId}).set({status: 'AUCTION', auctionId: result.id});
                res.ok(result);
              }
            )
          });
        } else {
          createMintingVoucher(user.wallet, basePrice, nft, req.payload.chainId, (voucher) => {
            createAuctionItem(
              req.payload.id,
              nftId,
              basePrice,
              endTime,
              req.payload.chainId,
              voucher,
              async (err, result) => {
                if(err) return sails.log.error(err);
                await Nft.update({id: nftId}).set({status: 'AUCTION', auctionId: result.id});
                res.ok(result);
              }
            );
          });
        }
      });
  },
  detail: async (req, res) => {
    const {id} = req.query;
    Auction.findOne({id: id})
      .populate('user')
      .then( async result => {
        if(result && result.nft){
          const id = result.nft;
          const nftDetails = await sails.helpers.nftDetails({id, loggedInUser:req.payload.id, chainId:req.payload.chainId});
          result['nft'] = nftDetails;
        }
        res.ok(result);
      }).catch((e)=> {
        res.badRequest('Something went wrong');
      });
  },
  bids: async (req, res) => {
    const {page = 1, limit = 20, sort = 'createdAt', order = 'DESC'} = req.query;
    const { id } = req.query;
    Auction.findOne({ id: id, user: req.payload.id })
      .then( async (result) => {
        const criteria = {auction: result.id};
        const totalCount = await Bid.count(criteria);
        Bid.find(criteria)
        .limit(limit)
        .populate("user")
        .skip((page-1)*limit)
        .sort(`${sort} ${order}`)
        .then((bids)=>{
          res.ok({
            records: bids,
            totalCount
          });
        });
      })
      .catch((e) => {
        res.badRequest(e);
      });
  }
};

