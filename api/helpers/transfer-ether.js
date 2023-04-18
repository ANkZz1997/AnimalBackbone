const networks = require('./../constants/networks')
const Web3 = require('web3');

const sender = sails.config.custom.wallet;
const privateKey = sails.config.custom.privateKey;

module.exports = {


  friendlyName: 'Transfer ether',


  description: '',


  inputs: {
    receiver: {
      type: 'string',
      required: true
    },
    amount: {
      type: 'string',
      required: true
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
    sails.log.info(`transfering ethers from ${sender} to ${inputs.receiver}`);
    const {receiver, amount, chainId} = inputs;
    const network = await Network.findOne({chainId});
    const web3 = new Web3(network.host);
    try {
      const gasPrice = await web3.eth.getGasPrice();
      const nonce = await web3.eth.getTransactionCount(sender);
      const tx = {
        from: sender,
        to: receiver,
        value: web3.utils.toWei(amount.toString(), 'ether'),
        gas: 21000,
        gasPrice: gasPrice,
        nonce: nonce
      };
      sails.log.info('created transaction object')
      console.log(tx)
      const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
      sails.log.info('transaction signed')
      const result = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
      console.log('transaction sent to chain')
      return exits.success(result);
    } catch (e) {
      sails.log.info('transfer failed');
      sails.log.error(e)
      return exits.fail(e)
    }
  }


};

