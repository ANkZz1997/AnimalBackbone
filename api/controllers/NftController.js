/**
 * NftController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    all:async (req,res) => {
        await Nft.find().populateAll().then(result => {
            res.status(200).json(result);
          });
      }
};

