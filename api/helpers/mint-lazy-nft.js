const ethers = require('ethers');
const networks = require('./../constants/networks')

module.exports = {


  friendlyName: 'Mint lazy nft',


  description: '',


  inputs: {
    privateKey: {type: 'string'},
    minter: {type: 'string'},
    redeemer: {type: 'string'},
    voucher: {type: 'ref'},
    chainId: {type: 'number'}
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
    sails.log.info('minting nft : ' + inputs.voucher.uri)
    const {privateKey, minter, redeemer, voucher, chainId} = inputs;
    const contractAddress = networks[chainId].address;
    const provider = new ethers.JsonRpcProvider(networks[chainId].node);
    const signer = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, sails.config.custom.nftAbi, signer);
    const _voucher = [voucher.minPrice, voucher.uri, voucher.royaltyPercentage, voucher.signature];
    console.log({
      minter,
      redeemer,
      _voucher,
    })
    contract.redeem(minter, redeemer, _voucher, {
      value: voucher.minPrice
    }).then((transaction) => {
      console.log('Transaction:', transaction);
      return exits.success(transaction);
    }).catch((error) => {
      console.error('Error:', error);
      return exits.fail(error)
    });
  }


};

