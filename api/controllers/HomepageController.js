/**
 * HomepageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: async (req, res) => {
    const response = {
      banners: await Banner.find({select: sails.config.custom.bannerAttributes, where:{isActive:true, isDeleted: false }}).sort('order ASC').limit(5),
      createdCount: await Nft.count({user:req.payload.id, minter: req.payload.id, minted: false}),
      collectedCount: await Nft.count({user: req.payload.id, minted:true}),
      auction: await Auction.find().populate('nft').limit(10),
      marketplace: await Marketplace.find().populate('nft').limit(10),
      nft: await Nft.find().populate('nft').limit(10),
      wishlist: await User.findOne({id: req.payload.id}).populate('wishlist', {limit: 10})
    }
    res.ok(response)
  }
};

