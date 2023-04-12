const networks = require('./../constants/networks')
const Web3 = require('web3');

module.exports = {
  withdrawEthers: (req, res) => {

  },
  availableToWithdraw: async (req, res) => {
    const settings = await Settings.findOne({uid: 1});
    const network = await Network.findOne({chainId: req.payload.chainId});
    const web3 = new Web3(network.host);
    const address = web3.eth.accounts.privateKeyToAccount(settings.adminPrivateKey);
    const abi = sails.config.custom.nftAbi;
    const contract = new web3.eth.Contract(abi, network.address);
    contract.methods.availableToWithdraw().call().then(balance => {
      res.ok({balance});
    }).catch(e => res.badRequest(e));
  }
};
