const Web3 = require('web3');
const web3 = new Web3(sails.config.custom.blockchain.goerli.node);
module.exports = {


  friendlyName: 'Ether balance',


  description: '',


  inputs: {
    address: {
      type: 'string'
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
    console.log(inputs)
    const {address} = inputs
    console.log(address)
    web3.eth.getBalance(address, (error, balance) => {
      if (error) {
        return exits.fail(error)
      }
      exits.success(web3.utils.fromWei(balance, 'ether'))
    });
  }


};

