/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
module.exports = {
  test: (req, res) => {
    return res.ok('Success')
  },
  createUser: async (req, res) => {
    const account = web3.eth.accounts.create();
    const wallet = await Wallet.create(account).fetch();
    req.body.wallet = wallet.id;
    User.create(req.body).fetch().then(async result => {
      result.token = await sails.helpers.signToken({id:result.id});
      return res.ok(result);
    }).catch(e => {
      return res.badRequest(e)
    })
  },
  login: (req, res) => {
    User.findOne({username: req.body.username, password: req.body.password}).then( async result => {
      if(result) {
        result.token = await sails.helpers.signToken({id:result.id});
        res.ok(result)
      } else {
        res.badRequest('User not found')
      }
    }).catch(e => {
      return res.badRequest('Something went wrong');
    })
  }
};

