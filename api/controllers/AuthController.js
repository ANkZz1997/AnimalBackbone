/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const ethUtil = require('ethereumjs-util')
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
      result.wallet = wallet;
      result.token = await sails.helpers.signToken({id:result.id});
      return res.ok(result);
    }).catch(e => {
      return res.badRequest(e);
    });
  },
  login: (req, res) => {
    User.findOne({username: req.body.username, password: req.body.password}).populateAll().then( async result => {
      if(result) {
        result.token = await sails.helpers.signToken({id:result.id});
        res.ok(result)
      } else {
        res.badRequest('User not found')
      }
    }).catch(e => {
      return res.badRequest('Something went wrong');
    })
  },
  loginNonce: (req, res) => {
    const {address} = req.body;
    Wallet.create({address}).fetch().then(result => {
      res.ok(result);
    });
  },
  verifySignature: async (req, res) => {
    const {address, signature} = req.body;
    const wallet = await Wallet.findOne({address: address});
    const msg = `Welcome to SDNA Crypt
      Click to sign in and accept the SDNA Crypt Terms of Service: https://sdnatech.com

      This request will not trigger a blockchain transaction or cost any gas fees.

      Your authentication status will reset after 24 hours.

      Wallet address:
      ${address}

      Nonce:
      ${wallet.nonce}`;
    const msgHash = ethUtil.hashPersonalMessage(ethUtil.toBuffer(msg));
    const signatureParams = ethUtil.fromRpcSig(ethUtil.toBuffer(signature));
    const publicKey = ethUtil.ecrecover(msgHash,signatureParams.v, signatureParams.r, signatureParams.s);
    const generatedPublicKey = ethUtil.bufferToHex(ethUtil.publicToAddress(publicKey));
    if(address.toLowerCase() === generatedPublicKey.toLowerCase()){
      if(wallet.user) {
        User.findOne({id: wallet.user}).populateAll().then(async result => {
          result.token = await sails.helpers.signToken({id:result.id});
          res.ok(result);
        })
      } else {
        User.create({
          type: 'DECENTRALISED',
          firstName: 'Unnamed',
          wallet: wallet.id
        }).fetch().then(async result => {
          result.wallet = wallet;
          result.token = await sails.helpers.signToken({id:result.id});
          Wallet.update({address: address}).set({user: result.id, nonce: Math.floor(Math.random()*1000000)}).then(result => {})
          return res.ok(result);
        });
      }
    } else {
      res.badRequest('Signature verification Failed');
    }
  }
};

