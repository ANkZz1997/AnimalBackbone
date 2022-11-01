/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  nft:async (req,res) => {
    await Nft.find({ user: req.payload.id }).populateAll().then(result => {
        res.status(200).json(result);
      });
  }
};

