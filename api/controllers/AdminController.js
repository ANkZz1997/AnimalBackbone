/**
 * AdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const moment = require("moment");
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
    const totalCount = await Kyc.count();
    const criteria = req.body;

    Kyc.find(criteria)
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
        console.log(data);
        res.ok({
          records: data,
          totalCount,
        });
      })
      .catch((e) => {
        res.badRequest(e);
    });
  },
};
