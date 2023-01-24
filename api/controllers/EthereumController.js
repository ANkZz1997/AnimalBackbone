/**
 * EthereumController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  rate: async (req, res) => {
    const {from, to} = req.body;
    const rate = await sails.helpers.getEthPrice(from, to);
    res.ok(rate)
  },
};

