const Web3 = require('web3');
const web3 = new Web3(sails.config.custom.blockchain.goerli.node);

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
    const {receiver, amount} = inputs;
    // Get the current nonce (number of transactions sent) for the sender
    web3.eth.getTransactionCount(sender)
      .then(nonce => {
        // Build the transaction object
        console.log(nonce)
        const tx = {
          nonce: nonce,
          to: receiver,
          value: web3.utils.toWei(amount, 'ether'),
          gas: 21000,
          gasPrice: web3.utils.toWei('20', 'gwei')
        };
        // Sign the transaction with the sender's private key
        console.log(tx)
        web3.eth.accounts.signTransaction(tx, privateKey)
          .then(signed => {
            console.log('transaction signed');
            // Send the signed transaction to the network
            web3.eth.sendSignedTransaction(signed.rawTransaction)
              .then(receipt => {
                console.log(`Transaction hash: ${receipt.transactionHash}`);
                return exits.success(receipt);
              })
              .catch(err => {
                return exits.fail(err)
              });
          });
      }).catch(e => {
        return exits.fail(e)
    });
  }


};

