const networks = require('./../constants/networks')
const Web3 = require('web3');

module.exports = {
  friendlyName: 'Mint nft',
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
  },
  fn: async function (inputs, exits) {
    sails.log.info('minting nft : ' + inputs.voucher.uri)
    const {privateKey, minter, redeemer, voucher, chainId} = inputs;
    const web3 = new Web3(networks[chainId].node);
    await web3.eth.accounts.wallet.add(privateKey);
    const contract = new web3.eth.Contract(sails.config.custom.nftAbi, networks[chainId].address);
    const gasPrice = await web3.eth.getGasPrice();
    const _voucher = [voucher.minPrice, voucher.uri, voucher.royaltyPercentage, voucher.signature]
    console.log('minter', minter)
    console.log('redeemer', redeemer)
    console.log('voucher', _voucher)
    console.log('price', voucher.minPrice)

    contract.methods.redeem(minter, redeemer, _voucher).send({
      from: redeemer,
      value: voucher.minPrice,
      gas: 253240,
      gasPrice: gasPrice,
    }).then(txn => {
      console.log('success')
      console.log(txn)
      return exits.success(txn)
    }).catch(e => {
      console.log('error')
      console.log(e)
    })

  }


};

