/**
 * AdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const moment = require("moment");
const fs = require("fs");
module.exports = {
  users: async (req, res) => {
    const {
      page = 1,
      limit = 20,
      sort = "createdAt",
      order = "DESC",
    } = req.query;
    const totalCount = await User.count();
    const criteria = req.body;
    User.find(criteria)
      .limit(limit)
      .populate("user")
      .populate("nft")
      .populate("marketplace")
      .populate("auction")
      .populate("bid")
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
    const {
      page = 1,
      limit = 20,
      sort = "createdAt",
      order = "DESC",
    } = req.query;
    const totalCount = await Nft.count();
    const populate = req.body.populate || [];
    delete req.body.populate;
    const criteria = req.body;
    const query = Nft.find(criteria)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort(`${sort} ${order}`);

    populate.forEach(e => {
      query.populate(e)
    })

    query.then((result) => {
        res.ok({
          records: result,
          totalCount,
        });
      })
      .catch((e) => {
        res.badRequest(e);
      });
  },
  auctions: async (req, res) => {
    const {
      page = 1,
      limit = 20,
      sort = "createdAt",
      order = "DESC",
    } = req.query;
    const totalCount = await Auction.count();
    const populate = req.body.populate || [];
    delete req.body.populate;
    const criteria = req.body;
    const query = Auction.find(criteria)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort(`${sort} ${order}`);
    populate.forEach(e => {
      query.populate(e)
    })
    query.then((result) => {
        res.ok({
          records: result,
          totalCount,
        });
      })
      .catch((e) => {
        res.badRequest(e);
      });
  },
  marketplace: async (req, res) => {
    const {
      page = 1,
      limit = 20,
      sort = "createdAt",
      order = "DESC",
    } = req.query;
    const totalCount = await Marketplace.count();
    const populate = req.body.populate || [];
    delete req.body.populate;
    const criteria = req.body;
    const query = Marketplace.find(criteria)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort(`${sort} ${order}`);
    populate.forEach(e => {
      query.populate(e)
    })
    query.then((result) => {
        res.ok({
          records: result,
          totalCount,
        });
      })
      .catch((e) => {
        res.badRequest(e);
      });
  },
  bids: async (req, res) => {
    const {
      page = 1,
      limit = 20,
      sort = "createdAt",
      order = "DESC",
      auction = null,
    } = req.query;
    const criteria = req.body;
    if (auction) {
      criteria["auction"] = auction;
    }
    const totalCount = await Bid.count(criteria);
    Bid.find(criteria)
      .limit(limit)
      .populate("user")
      .skip((page - 1) * limit)
      .sort(`${sort} ${order}`)
      .populate("auction.nft")
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
  updateUserStatus: (req, res) => {
    const { id, status } = req.body;
    User.update({ id })
      .set({ status })
      .fetch()
      .then((result) => {
        res.ok(result);
      })
      .catch((e) => {
        res.badRequest(e);
      });
  },
  getUserDetail: (req, res) => {
    const { id } = req.query;
    User.findOne({ id })
      .populateAll()
      .then((result) => {
        res.ok(result);
      })
      .catch((e) => {
        res.badRequest(e);
      });
  },
  getMarketplaceDetail: (req, res) => {
    const { id } = req.query;
    Marketplace.findOne({ id })
      .populateAll()
      .then((result) => {
        res.ok(result);
      })
      .catch((e) => {
        res.badRequest(e);
      });
  },
  getAuctionDetail: (req, res) => {
    const { id } = req.query;
    Auction.findOne({ id })
      .populateAll()
      .then((result) => {
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
    const totalCount = await Dispute.count();
    const criteria = req.body;

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
    const populate = req.body.populate || [];
    delete req.body.populate;
    const criteria = req.body;
    criteria['identityProof'] = {"!=":null};
    criteria['addressProof'] = {"!=":null};
    const totalCount = await Kyc.count(criteria);
    
    const query = Kyc.find(criteria)
      .populate('user')
      .populate('addressProofDocType')
      .populate('identityProofDocType')
      .limit(limit)
      .skip((page - 1) * limit)
      .sort(`${sort} ${order}`)
    populate.forEach(e => {
      query.populate(e)
    })

    query.then((result) => {
        res.ok({
          records: result,
          totalCount,
        });
      })
      .catch((e) => {
        res.badRequest(e);
      });
  },

  getActivities: async (req, res) => {
    const {
      page = 1,
      limit = 20,
      sort = "createdAt",
      order = "DESC",
    } = req.query;
    const criteria = req.body;
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

  setplatformDetails: (req, res) => {
    const {platformTitle} = req.body;
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
  }
};
