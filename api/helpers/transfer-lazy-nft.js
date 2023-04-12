const ethers = require("ethers");
const abi = require('../constants/networks').abi;
module.exports = {


  friendlyName: 'Transfer lazy nft',


  description: '',


  inputs: {
    privateKey: {type: 'string'},
    seller: {type: 'string'},
    buyer: {type: 'string'},
    voucher: {type: 'ref'},
    network: {type: 'ref'},
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
    const {privateKey, seller, buyer, voucher, network} = inputs;
    const contractAddress = network.address;
    const provider = new ethers.JsonRpcProvider(network.host);
    const signer = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const _voucher = [voucher.tokenId, voucher.price, voucher.signature];
    console.log(JSON.stringify(_voucher))
    contract.buy(seller, buyer, _voucher, {
      value: voucher.price
    }).then(transaction => {
      return exits.success(transaction)
    }).catch(e => {
      return exits.fail(e)
    })
  }


};

