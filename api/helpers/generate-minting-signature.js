const networks = require("../constants/networks");
const ethers = require("ethers");
const Web3 = require("web3");
module.exports = {


  friendlyName: 'Generate minting signature',


  description: '',


  inputs: {
    privateKey: {type: 'string'},
    minPrice: {type: 'string'},
    uri: {type: 'string'},
    royaltyPercentage: {type: 'string'},
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
    const {privateKey, minPrice, uri, royaltyPercentage, chainId} = inputs;
    sails.log.info('initializing node with chainId: ' + chainId)
    const web3 = new Web3(networks[chainId].node);
    const voucher = {
      minPrice: web3.utils.toWei(minPrice, 'ether'),
      uri: uri,
      royaltyPercentage: royaltyPercentage.toString()
    };
    const types = {
      NFTVoucher: [
        { name: "minPrice", type: "uint256" },
        { name: "uri", type: "string" },
        { name: "royaltyPercentage", type: "uint256" }
      ]
    };
    const domain = {
      name: 'Pangea',
      version: '1',
      verifyingContract: networks[chainId].address,
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

