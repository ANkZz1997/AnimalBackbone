const networks = require('./../constants/networks')
const Web3 = require('web3');
module.exports = {


  friendlyName: 'Ether balance',


  description: '',


  inputs: {
    address: {
      type: 'string'
    },
    chainId: {
      type: 'number'
    }
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
    // TODO
    const {address, chainId} = inputs
    const network = await Network.findOne({chainId});
    const web3 = new Web3(network.host);
    web3.eth.getBalance(address, (error, balance) => {
      if (error) {
        return exits.fail(error)
      }
      exits.success(web3.utils.fromWei(balance, 'ether'))
    });
  }


};

