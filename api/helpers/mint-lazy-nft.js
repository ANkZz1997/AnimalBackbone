const ethers = require('ethers');
const abi = require('../constants/networks').abi;

module.exports = {


  friendlyName: 'Mint lazy nft',


  description: '',


  inputs: {
    privateKey: {type: 'string'},
    minter: {type: 'string'},
    redeemer: {type: 'string'},
    voucher: {type: 'ref'},
    network: {type: 'ref'},
    value: {type: 'string'}
  },


  exits: {

    success: {
      description: 'All done.',
    },
    fail: {
      description: 'Something went wrong'
    }

  },


  fn: async function (inputs, exits) {
    sails.log.info('minting nft : ' + inputs.voucher.uri);
    const retVal = {};
    const {privateKey, minter, redeemer, voucher, network} = inputs;
    const contractAddress = network.address;
    const provider = new ethers.JsonRpcProvider(network.host);
    const signer = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const _voucher = [voucher.minPrice, voucher.uri, voucher.royaltyPercentage, voucher.signature];
    contract.redeem(minter, redeemer, _voucher, {
      value: voucher.minPrice
    }).then(async (transaction) => {
      sails.log.info("transaction successful");
      return exits.success(transaction);
      // contract.off("Transfer");
    }).catch((error) => {
      console.error('Error:', error);
      return exits.fail(error)
    });
  }
};

