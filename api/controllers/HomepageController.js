/**
 * HomepageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: async (req, res) => {
    const response = {
      created: await Nft.count({minter: req.payload.id}),
      collected: await Nft.count({user: req.payload.id, minter: {'!=': req.payload.id}}),
      auction: await Auction.find().limit(10),
      marketplace: await Marketplace.find().limit(10),
      nft: await Nft.find().limit(10)
    }
    res.ok(response)
  }
};

