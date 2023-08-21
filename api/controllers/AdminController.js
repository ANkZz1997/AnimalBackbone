/**
 * AdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const moment = require("moment");
const fs = require("fs");
const objectid = require('objectid');

module.exports = {
  users: async (req, res) => {
    const {
      page = 1,
      limit = 20,
      sort = "createdAt",
      order = "DESC",
    } = req.query;
    const criteria = req.body;
    const totalCount = await User.count(criteria).meta({makeLikeModifierCaseInsensitive: true});
    User.find(criteria)
      .limit(limit)
      .populate("user")
      .populate("nft")
      .populate("marketplace")
      .populate("auction")
      .populate("bid")
      .meta({makeLikeModifierCaseInsensitive: true})
      .skip((page - 1) * limit)
      .sort(`${sort} ${order}`)
      .then((result) => {
        res.ok({
          records: result,
          totalCount,
        });
      })
      .catch((e) => {
        res.badRequest(e);
      });
  },
  nft: async (req, res) => {
    try{
    const {
      page = 1,
      limit = 20,
      sort = "createdAt",
      order = "DESC",
    } = req.query;
    
    const {chainId, search, minter, minted=''} = req.body;
    const criteria = {};
    const filter = {};
    filter[sort] = (order === 'DESC')?-1:1;
    const db = Nft.getDatastore().manager;
    if(search) {
      criteria["$or"] = [{ "name" : {"$regex":search, '$options' : 'i'}},{ "user.firstName" : {"$regex":search, '$options' : 'i'}}, { "user.lastName" : {"$regex":search, '$options' : 'i'}},{ "user.email" : {"$regex":search, '$options' : 'i'}}];
    }
    if(chainId){
      criteria['chainId'] = Number(chainId);;
    }
    if(minter){
      criteria['minter'] = objectid(minter);
    }
    if(minted !== '') {
      criteria['minted'] = minted;
    }

  
    db.collection('nft').aggregate(
      [
        {
          $lookup: {
            from: 'user',
            localField: 'user',
            foreignField: '_id',
            as: 'user',
          },
        },
        { $unwind: '$user' },
        { $match: criteria },
        { $sort: filter },
        {
          $addFields: {
            id:"$_id",
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
        try{
          result = await result.toArray();
          res.ok({
            records:
              result[0].records && result[0].records.length > 0
                ? result[0].records
                : [],
            totalCount:
              result[0].totalCount.length > 0 ? result[0].totalCount[0].count : 0,
          });
        }catch(e){
          res.badRequest('Something went wrong');
        }
      }
    );
    }catch(e){
      res.badRequest(e);
    }
  },
  auctions: async (req, res) => {
    const {
      page = 1,
      limit = 20,
      sort = "createdAt",
      order = "DESC",
    } = req.query;

    const {chainId, search, category, status, minted=''} = req.body;
    const criteria = { };
    const filter = {};
    filter[sort] = (order === 'DESC')?-1:1;
    if(search) {
      criteria["$or"] = [{ "nft.name" : {"$regex":search, '$options' : 'i'}},{ "user.firstName" : {"$regex":search, '$options' : 'i'}}, { "user.lastName" : {"$regex":search, '$options' : 'i'}},{ "user.email" : {"$regex":search, '$options' : 'i'}}];
    }
    if(chainId){
      criteria['chainId'] = Number(chainId);
    }
    if(category){
      criteria['nft.category'] = category;
    }

    if(minted !== '') {
      criteria['nft.minted'] = minted;
    }

    if(status){
      criteria['status'] = status;
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
        { $unwind: '$user' },
        { $unwind: '$nft' },
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
        try{
          result = await result.toArray();
          res.ok({
            records:
              result[0].records && result[0].records.length > 0
                ? result[0].records
                : [],
            totalCount:
              result[0].totalCount.length > 0 ? result[0].totalCount[0].count : 0,
          });
        }catch(e){
          res.badRequest('Something went wrong');
        }
      }
    );
  },
  marketplace: async (req, res) => {
    const {
      page = 1,
      limit = 20,
      sort = "createdAt",
      order = "DESC",
    } = req.query;
    
    const {chainId, search, category, minted=''} = req.body;
    const criteria = { };
    const filter = {};
    filter[sort] = (order === 'DESC')?-1:1;
    if(search) {
      criteria["$or"] = [{ "nft.name" : {"$regex":search, '$options' : 'i'}},{ "user.firstName" : {"$regex":search, '$options' : 'i'}}, { "user.lastName" : {"$regex":search, '$options' : 'i'}},{ "user.email" : {"$regex":search, '$options' : 'i'}}];
    }
    if(chainId){
      criteria['chainId'] = Number(chainId);
    }
    if(category){
      criteria['nft.category'] = category;
    }
    if(minted !== '') {
      criteria['nft.minted'] = minted;
    }

    const db = Marketplace.getDatastore().manager;
    db.collection('marketplace').aggregate(
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
        { $unwind: '$user' },
        { $unwind: '$nft' },
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
        try{
          result = await result.toArray();
          res.ok({
            records:
              result[0].records && result[0].records.length > 0
                ? result[0].records
                : [],
            totalCount:
              result[0].totalCount.length > 0 ? result[0].totalCount[0].count : 0,
          });
        }catch(e){
          res.badRequest('Something went wrong');
        }
      }
    );
  },
  bids: async (req, res) => {
    const {
      page = 1,
      limit = 20,
      sort = "createdAt",
      order = "DESC",
    } = req.query;
    const criteria ={};
    const { auction, search } = req.body;
    const filter = {};
    filter[sort] = (order === 'DESC')?-1:1;
    if (auction) {
      criteria["auction"] = objectId(auction);
    }
    if(search) {
      criteria["$or"] = [{ "auction.nft.name" : {"$regex":search, '$options' : 'i'}}];
    }
    const db = Bid.getDatastore().manager;
    db.collection('bid').aggregate(
      [
        {
          $lookup: {
            from: 'auction',
            localField: 'auction',
            foreignField: '_id',
            as: 'auction',
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
        { $unwind: '$user' },
        { $unwind: '$auction' },
        {
          $lookup: {
            from: 'nft',
            localField: 'auction.nft',
            foreignField: '_id',
            as: 'auction.nft',
          },
        },
        { $unwind: '$auction.nft' },
        { $match: criteria },
        { $sort: filter },
        {
          $addFields: {
            id:"$_id",
            auction:{
              id:"$auction._id",
              nft:{ id:"$auction.nft._id" }
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
        try{
          result = await result.toArray();
          res.ok({
            records:
              result[0].records && result[0].records.length > 0
                ? result[0].records
                : [],
            totalCount:
              result[0].totalCount.length > 0 ? result[0].totalCount[0].count : 0,
          });
        }catch(e){
          res.badRequest('Something went wrong');
        }
      }
    );
  },
  dashboard: async (req, res) => {
    const startOfDay = moment().startOf("day").valueOf();
    const totalUsers = await User.count();
    const activeUserCount = await User.count({ status: "ACTIVE" });
    const blockedUserCount = await User.count({ status: "BLOCKED" });
    const newUserCount = await User.count({ status: "NEW" });
    const todayUser = await User.count({ createdAt: { ">=": startOfDay } });
    const inactiveUser = await User.count({ status: "INACTIVE" });
    res.ok({
      totalUsers,
      activeUserCount,
      newUserCount,
      todayUser,
      inactiveUser,
      blockedUserCount,
    });
  },
  updateUserStatus: async (req, res) => {
    const { id, status } = req.body;
    User.update({ id })
      .set({ status })
      .fetch()
      .then(async (result) => {
        await sails.helpers.captureActivities({
          action:"AUTH",
          type:"USERSTATUS",
          user:id,
          payload:{
            ipAddress:req.ip,
            status:status
          }
        });
        res.ok(result);
      })
      .catch((e) => {
        res.badRequest(e);
      });
  },
  getUserDetail: async (req, res) => {
    const { id } = req.query;
    try {
      const result = await User.findOne({ id }).populateAll();
      const activeNetworks = await Network.find({ enabled: true });
      let networks = [];
      if (activeNetworks.length > 0) {
        for(const network of activeNetworks) {
          const amount = await sails.helpers.etherBalance(
            result.wallet.address,
              network.chainId
          );
          networks.push({
            name:network.name,
            logo:network.logo,
            amount
          });
        };
      }
      result.networks = networks;
      const createdCount = await Nft.count({minter: id});
      const purchasedCount = await Activity.count({user:id, type:'BUY'});
      const soldCount = await Activity.count({user:id, type:'SOLD'});
      const wishlistCount = result.wishlist && result.wishlist.length > 0 ? result.wishlist.length : 0;   
      result.createdCount = createdCount;
      result.purchasedCount = purchasedCount;
      result.soldCount = soldCount;
      result.favCount = wishlistCount;
      res.ok(result);
    } catch (e) {
      res.badRequest(e);
    }
  },
  getMarketplaceDetail: async (req, res) => {
    const { id } = req.query;
    Marketplace.findOne({ id })
      .populateAll()
      .then(async (result) => {
        const nftId = result.nft.id;
        if(nftId){
          const nftDetails =  await Nft.findOne({ id:nftId }).populate('wishlistedBy');
          nftDetails.wishlistedCount = (nftDetails.wishlistedBy)?nftDetails.wishlistedBy.length : 0;
          delete nftDetails['wishlistedBy'];
          result['nft'] = nftDetails;
        }
        res.ok(result);
      })
      .catch((e) => {
        res.badRequest(e);
      });
  },
  getAuctionDetail: async (req, res) => {
    const { id } = req.query;
    Auction.findOne({ id })
      .populateAll()
      .then(async(result) => {
        const nftId = result.nft.id;
        if(nftId){
          const nftDetails =  await Nft.findOne({ id:nftId }).populate('wishlistedBy');
          nftDetails.wishlistedCount = (nftDetails.wishlistedBy)?nftDetails.wishlistedBy.length : 0;
          delete nftDetails['wishlistedBy'];
          result['nft'] = nftDetails;
        }
        res.ok(result);
      })
      .catch((e) => {
        res.badRequest(e);
      });
  },
  getBidDetail: (req, res) => {
    const { id } = req.query;
    Bid.findOne({ id })
      .populateAll()
      .then((result) => {
        res.ok(result);
      })
      .catch((e) => {
        res.badRequest(e);
      });
  },
  getNftDetail: (req, res) => {
    const { id } = req.query;
    Nft.findOne({ id })
      .populateAll()
      .then((result) => {
        result.wishlistedCount = (result.wishlistedBy)?result.wishlistedBy.length : 0;
        delete result.wishlistedBy;
        res.ok(result);
      })
      .catch((e) => {
        res.badRequest(e);
      });
  },
  dispute: async (req, res) => {
    const {
      page = 1,
      limit = 20,
      sort = "createdAt",
      order = "DESC",
    } = req.query;
    const criteria = req.body;
    const totalCount = await Dispute.count(criteria);
    
    Dispute.find(criteria)
      .limit(limit)
      .populate('user')
      .skip((page - 1) * limit)
      .sort(`${sort} ${order}`)
      .then((result) => {
        res.ok({
          records: result,
          totalCount,
        });
      })
      .catch((e) => {
        res.badRequest(e);
      });
  },
  kyc: async (req, res) => {
    const {
      page = 1,
      limit = 20,
      sort = "createdAt",
      order = "DESC",
    } = req.query;
    delete req.body.populate;
    const { status='', search='' } = req.body;
    const filter = {}, criteria = {};
    filter[sort] = (order === 'DESC')?-1:1;
    if (status) {
      criteria["status"] = status
    }
    if(search) {
      criteria["$or"] = [{ "user.firstName" : {"$regex":search, '$options' : 'i'}}, { "user.lastName" : {"$regex":search, '$options' : 'i'}},{ "user.email" : {"$regex":search, '$options' : 'i'}}];
    }
    const db = Kyc.getDatastore().manager;
    db.collection('kyc').aggregate(
      [
        {
          $lookup: {
            from: 'kycdoctype',
            localField: 'addressProofDocType',
            foreignField: '_id',
            as: 'addressProofDocType',
          },
        },
        {
          $lookup: {
            from: 'kycdoctype',
            localField: 'identityProofDocType',
            foreignField: '_id',
            as: 'identityProofDocType',
          }
        },
        {
          $lookup: {
            from: 'user',
            localField: 'user',
            foreignField: '_id',
            as: 'user',
          },
        },
        { $unwind: '$user' },
        { $unwind: '$addressProofDocType' },
        { $unwind: '$identityProofDocType' },
        { $match: criteria },
        { $sort: filter },
        {
          $addFields: {
            id:"$_id",
            addressProofDocType:{
              id:"$addressProofDocType._id"
            },
            identityProofDocType:{
              id:"$identityProofDocType._id"
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
        try{
          result = await result.toArray();
          res.ok({
            records:
              result[0].records && result[0].records.length > 0
                ? result[0].records
                : [],
            totalCount:
              result[0].totalCount.length > 0 ? result[0].totalCount[0].count : 0,
          });
        }catch(e){
          res.badRequest('Something went wrong');
        }
      }
    );
  },

  getActivities: async (req, res) => {
    const {
      page = 1,
      limit = 20,
      sort = "createdAt",
      order = "DESC",
    } = req.query;
    const criteria = {
      type : { "!=": ['LOGIN','CHANGEPASSWORD'] },
      ...req.body
    };
    const totalCount = await Activity.count(criteria);
    Activity.find(criteria)
      .populateAll()
      .limit(limit)
      .skip((page - 1) * limit)
      .sort(`${sort} ${order}`)
      .then(async (result) => {
        const data = await sails.helpers.displayActivities(result);
        res.ok({
          records: data,
          totalCount,
        });
      })
      .catch((e) => {
        res.badRequest(e);
    });
  },
  addBanner: async (req, res) => {
    const { name, description, link,order,isActive } = req.body;
    req.file("image").upload(
      {
        dirname: require("path").resolve(sails.config.appPath, "uploads"),
      },
      async (error, uploadedFile) => {
        if (error) {
          return res.badRequest(error);
        }
        let media = {};
        if (uploadedFile.length > 0) {
          media = await Media.create({
            fd: uploadedFile[0].fd,
            size: uploadedFile[0].size,
            type: uploadedFile[0].type,
            filename: uploadedFile[0].filename,
            status: uploadedFile[0].status,
            field: uploadedFile[0].field,
            extra: uploadedFile[0].extra,
          }).fetch();
        }
        const bannerDetails = {
          image: media.id,
          name: name,
          description: description,
          link: link,
          order:order,
          isActive: isActive,
        };

        Banner.create(bannerDetails)
          .fetch()
          .then(async (result) => {
            res.status(200).json(result);
          })
          .catch((e) => {
            return res.badRequest(e);
          });
      }
    );
  },
  updateBannerStatus: (req, res) => {
    const { id, isActive } = req.body;
    Banner.update({ id })
      .set({ isActive })
      .fetch()
      .then((result) => {
        res.ok(result);
      })
      .catch((e) => {
        res.badRequest(e);
      });
  },
  deleteBanner: async (req, res) => {
    const { id } = req.body;
    Banner.update({ id: id})
      .set({ isDeleted: true, isActive:false})
      .fetch()
      .then(async (result) => {
        res.ok(result);
      });
  },
  banners:async (req, res) => {
    const {
      page = 1,
      limit = 20,
      sort = "createdAt",
      order = "DESC",
    } = req.query;

    const criteria = req.body;
    criteria['isDeleted'] = false;
    //criteria['isActive'] = true;
    const totalCount = await Banner.count(criteria);
    Banner.find(criteria)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort(`${sort} ${order}`)
      .then((result) => {
        res.ok({
          records: result,
          totalCount,
        });
      })
      .catch((e) => {
        res.badRequest(e);
      });
  },

  // api only for super admin
  getSettings: (req, res) => {
    Settings.findOne({uid: 1}).then(setting => {
      return res.ok(setting);
    });
  },
  setCommission: (req, res) => {
    const {value} = req.query;
    Settings.update({uid: 1}).set({commission: value}).then(() => {
      sails.log.info(`commission updated with value ${value}`)
      res.ok();
    })
  },
  setCommissionType: (req, res) => {
    const {value} = req.query;
    Settings.update({uid: 1}).set({commissionType: value}).then(() => {
      sails.log.info(`commission type updated with value ${value}`)
      res.ok();
    })
  },
  setLazyMint: (req, res) => {
    const {value} = req.query;
    Settings.update({uid: 1}).set({lazymint: value}).then(() => {
      sails.log.info(`enable lazy mint is set to ${value}`)
      res.ok();
    })
  },
  setPinataCreds: (req, res) => {
    const {pinataApiKey, pinataSecret} = req.body;
    Settings.update({uid: 1}).set({pinataApiKey, pinataSecret}).then(() => {
      sails.log.info('Pinata Credentials Stored successfully')
      res.ok();
    })
  },
  setStripeSecret: (req, res) => {
    const {value} = req.query;
    Settings.update({uid: 1}).set({stripeSecret: value}).then(() => {
      sails.log.info('Stripe secret is stored');
      res.ok();
    });
  },

  stripeCallbackUrl: (req, res) => {
    const {stripeCallbackUrl} = req.body;
    Settings.update({uid: 1}).set({stripeCallbackUrl}).then(() => {
      sails.log.info('Stripe Callback URL is stored');
      res.ok();
    });
  },

  setplatformDetails: async (req, res) => {
    const {platformTitle} = req.body;
    const file = req.file('logo');
    if(file._files.length > 0)
    {
      req.file('logo').upload({
        dirname: require('path').resolve(sails.config.appPath, 'uploads')
      }, async (error, uploadedFile) => {
        if(error) return res.badRequest(error);
        if(uploadedFile.length > 0) {
          const media = await Media.create({
            fd: uploadedFile[0].fd,
            size: uploadedFile[0].size,
            type: uploadedFile[0].type,
            filename: uploadedFile[0].filename,
            status: uploadedFile[0].status,
            field: uploadedFile[0].field,
            extra: uploadedFile[0].extra,
          }).fetch();
          Settings.update({uid: 1}).set({platformTitle, platformLogo:media.id}).then(() => {
            sails.log.info('Company Logo and Title are stored');
            res.ok();
          });
        }
      });
    } else {
      const settings = await Settings.update({uid: 1}).set({ platformTitle }).fetch();
      res.ok(settings);
    }
  },

  // network api's
  getNetworks: (req, res) => {
    Network.find().then(networks => res.ok(networks));
  },
  addNetwork: (req, res) => {
    const { host, chainId, address,name } = req.body;
    req.file('logo').upload({
      dirname: require('path').resolve(sails.config.appPath, 'uploads')
    }, async (error, uploadedFile) => {
      if(error) return res.badRequest(error);
      let media = {};
      if(uploadedFile.length > 0) {
        media = await Media.create({
          fd: uploadedFile[0].fd,
          size: uploadedFile[0].size,
          type: uploadedFile[0].type,
          filename: uploadedFile[0].filename,
          status: uploadedFile[0].status,
          field: uploadedFile[0].field,
          extra: uploadedFile[0].extra,
        }).fetch();
        Network.create({host, chainId, address, logo: media.id,name }).fetch().then( result => {
          res.ok(result)
        })
      }
    });
  },
  setNetworkAsDefault: (req, res) => {
    const {id} = req.query;
    Network.update({}).set({isDefault: false}).then(() => {
      Network.update({id}).set({isDefault: true}).then(() => res.ok()).catch(e => res.badRequest(e))
    }).catch(e => res.badRequest(e));
  },
  setNetworkEnableStatus: (req, res) => {
    const {networkId, status} = req.body;
    console.log(networkId)
    Network.find({id: networkId}).then(r => {
      console.log(r)
    })
    Network.update({id: networkId}).set({enabled: status}).fetch().then( r => res.ok(r))
      .catch(e => res.badRequest(e))
  },

  deleteNetwork: async (req, res) => {
    try{
      const {networkId} = req.body;
      console.log(networkId);
      const network = await Network.findOne({id:networkId});
      if(network){
        await Network.destroyOne({id:networkId});
        const media = await Media.findOne({id:network.logo});
        if(media){
          await Media.destroyOne({id:network.logo});
          fs.unlink(media.fd,(e) => {
            if(e){
              console.log('Media not removed');
            } else{
              console.log('Media Removed');
            }
            res.ok();
          });
        } else{
          res.ok();
        }
      } else {
        res.badRequest('Network not Found')
      }
    }catch(e){
      res.badRequest(e);
    }
  },

  editNetwork: async (req, res) => {
    try{
      const { host, chainId, address,name, networkId } = req.body;
      const network = await Network.findOne({id:networkId});
      if(network){
        const file = req.file('logo');
        if(file._files.length > 0)
        {
          req.file('logo').upload({
            dirname: require('path').resolve(sails.config.appPath, 'uploads')
          }, async (error, uploadedFile) => {
            if(error) return res.badRequest(error);
            if(uploadedFile.length > 0) {
              const media = await Media.findOne({id:network.logo});
              if(media){
                await Media.destroy({id:network.logo});
                fs.unlink(media.fd,(e) => {
                  if(e){
                    console.log('Media not removed');
                  } else{
                    console.log('Media Removed');
                  }
                });
              }
              const uploadedMedia = await Media.create({
                fd: uploadedFile[0].fd,
                size: uploadedFile[0].size,
                type: uploadedFile[0].type,
                filename: uploadedFile[0].filename,
                status: uploadedFile[0].status,
                field: uploadedFile[0].field,
                extra: uploadedFile[0].extra,
              }).fetch();
              Network.update({id:networkId}).set({host, chainId, address, logo: uploadedMedia.id,name }).fetch().then( result => {
                res.ok(result);
              });
            }
          });
        }else{
          const networkUpdate = await Network.update({id:networkId}).set({host, chainId, address, name }).fetch();
          res.ok(networkUpdate)
        }
      }else{
        return res.badRequest('Network not found');
      }
    }catch(e){
      res.badRequest(e);
    }
  },

  addKYCDocType: async (req, res) => {
    const {name, addressProof=false, identitiyProof=false, enabled=false} = req.body;
    KycDocType.create({ name, addressProof, identitiyProof, enabled }).fetch().then( result => {
      res.ok(result);
    });
  },

  getKYCDocType: (req, res) => {
    KycDocType.find().then(documentTypes => res.ok(documentTypes));
  },

  setKYCDocTypeStatus: (req, res) => {
    const {documentTypeId, status} = req.body;
    KycDocType.findOne({id: documentTypeId}).then(document => {
      if(document){
        KycDocType.update({id: documentTypeId}).set({enabled: status}).then( r => res.ok())
        .catch(e => res.badRequest(e));
      } else {
        res.badRequest('Document Not Found');
      }
    }).catch(e => res.badRequest('Something went wrong'));
  },

  editKYCDocType: async (req, res) => {
    try{
      const {name, addressProof=false, identitiyProof=false, enabled=false, documentTypeId} = req.body;
      const documentType = await KycDocType.findOne({id:documentTypeId});
      if(documentType){
        KycDocType.update({id:documentTypeId}).set({name, addressProof, identitiyProof, enabled }).fetch().then( result => {
          res.ok(result);
        });
      } else {
        return res.badRequest('Document Not Found');
      }
    }catch(e){
      res.badRequest(e);
    }
  },

  editProfile: async (req, res) => {
    try{
    const { name } = req.body;
    const file = req.file("avatar");
    if (file._files.length > 0) {
      req.file("avatar").upload(
        {
          dirname: require("path").resolve(sails.config.appPath, "uploads"),
        },
        async (error, uploadedFile) => {
          if (error) {
            return res.badRequest(error);
          }
          const admin = await Admin.findOne({ id: req.payload.id });
          
            media = {};
            media = await Media.create({
              fd: uploadedFile[0].fd,
              size: uploadedFile[0].size,
              type: uploadedFile[0].type,
              filename: uploadedFile[0].filename,
              status: uploadedFile[0].status,
              field: uploadedFile[0].field,
              extra: uploadedFile[0].extra,
            }).fetch();

            const adminDetails = {
              avatar: media.id,
              name: name || admin.name,
            };
            const updatedUser = await Admin.update(
              { id: req.payload.id },
            ).set(adminDetails).fetch();


            if (uploadedFile.length > 0) {
              if(admin.avatar){
                let media = await Media.findOne({ id: admin.avatar });
                if (media) {
                  await Media.destroyOne({ id: media.id });
                  fs.unlink(media.fd, (e) => {
                    if (e) {
                      console.log("Media not removed");
                    } else {
                      console.log("Media Removed");
                    }
                  });
                }
              }



            res.ok(updatedUser);
          }
        }
      );
    } else {
      const editProfile = await Admin.update({ id: req.payload.id })
        .set({ name })
        .fetch();
      res.ok(editProfile);
    }
  }catch(e){
    return res.badRequest('Document Not Found');
  }
  },

  changePassword: async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const admin = await Admin.findOne({ id: req.payload.id }).decrypt();
      if (admin) {
        if (admin.password === oldPassword) {
          await Admin.update(
            { id: req.payload.id },
            { password: newPassword }
          ).fetch();
          res.ok();
        } else {
          res.badRequest("Old Password is not correct");
        }
      } else {
        res.badRequest("Something went wrong");
      }
    } catch (err) {
      return res.badRequest("Something went wrong");
    }
  },
  createAdminUser: async (req, res) => {
    try {
      
      const { name, username, password, role } = req.body;
      const user = await Admin.find({username});
      if(user.length > 0) return res.badRequest('This user is already exists.');
      const userRole = await Role.find({id:role});
      if(!userRole.length) res.badRequest('Role not exists');
      Admin.create({
          username,
          name,
          role,
          password
        })
        .fetch()
        .then(async (result) => {
          res.ok(result);
        })
    } catch (e) {
      return res.badRequest('Something went wrong');
    }
  }
};
