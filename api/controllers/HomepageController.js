/**
 * HomepageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: async (req, res) => {
    const response = {
      createdCount: await Nft.count({minter: req.payload.id}),
      collectedCount: await Nft.count({user: req.payload.id, minter: {'!=': req.payload.id}}),
      auction: await Auction.find().populate('nft').limit(10),
      marketplace: await Marketplace.find().populate('nft').limit(10),
      nft: await Nft.find().populate('nft').limit(10),
      wishlist: await User.findOne({id: req.payload.id}).populate('wishlist', {limit: 10})
    }
    res.ok(response)
  }
};

