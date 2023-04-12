const ethers = require("ethers");
const Web3 = require("web3");
module.exports = {


  friendlyName: 'Generate minting signature',


  description: '',


  inputs: {
    privateKey: {type: 'string'},
    tokenId: {type: 'string'},
    price: {type: 'string'},
    chainId: {type: 'number'},
  },


  exits: {
    success: {
      description: 'All done.',
    },
  },


  fn: async function (inputs, exits) {
    // TODO
    sails.log.info('generating voucher for nft: ' + inputs.uri)
    const {privateKey, tokenId, price, chainId} = inputs;
    sails.log.info('initializing node with chainId: ' + chainId)
    const network = await Network.findOne({chainId: chainId});
    const web3 = new Web3(network.host);
    const voucher = {
      tokenId,
      price: web3.utils.toWei(price, 'ether')
    };
    const types = {
      NFTTransferVoucher: [
        { name: "tokenId", type: "uint256" },
        { name: "price", type: "uint256" },
      ]
    };
    const domain = {
      name: 'Animal Nft',
      version: '1',
      verifyingContract: network.address,
      chainId: chainId
    };
    const signer = new ethers.Wallet(privateKey);
    sails.log.info('signing using minter wallet')
    const signature = await signer.signTypedData(domain, types, voucher);
    sails.log.info('voucher signed')
    voucher.signature = signature;
    return exits.success(voucher);
  }


};

