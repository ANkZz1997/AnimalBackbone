const ethers = require("ethers");
const privateKey = sails.config.custom.privateKey;
const web3Obj = {};
const {abi} = require("../constants/networks");

const handleTransfer = (from, to, tokenId) => {
  
  NftTransaction.findOne({fromAddress: from.toLowerCase(), toAddress: to.toLowerCase(), status: 'PENDING'})
    .populateAll()
    .then(async result => {
      if(result) {
        console.log('result ====>',result)
        if(result.nft.minted && !result.nft.tokenId) {
          await Nft.update({id: result.nft.id}).set({tokenId: parseInt(tokenId)});
        }
        if(result.toUser.type === 'DECENTRALISED') {
          await Nft.update({id: result.nft.id}).set({user: result.toUser.id, status: "PORTFOLIO", marketplaceId: "", minted: true, tokenId: parseInt(tokenId)});
          await Marketplace.update({id: result.marketplace.id}).set({status: "COMPLETED"})
        }
        await NftTransaction.update({id: result.id}).set({status: 'SUCCESS'});
      } else {

      }
    });
};
module.exports = {


  friendlyName: 'Rpc listener',


  description: '',


  inputs: {
    network: {type: 'ref'}
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs, exits) {
    const {network} = inputs;
    web3Obj[network.chainId] = {};
    sails.log.info('Setting provider: ' + network.host)
    web3Obj[network.chainId].chainId = network.chainId;
    web3Obj[network.chainId].provider = new ethers.JsonRpcProvider(network.host);
    web3Obj[network.chainId].signer = new ethers.Wallet(privateKey, web3Obj[network.chainId].provider);
    web3Obj[network.chainId].contract = new ethers.Contract(network.address, abi, web3Obj[network.chainId].signer);
    sails.log.info('Subscribing for : ' + network.host)
    web3Obj[network.chainId].contract.on("Transfer", (from, to, tokenId) => {
      console.log('=====> ----rpc listener working   ---')
      console.log({from, to, tokenId})
      setTimeout(() => {
        handleTransfer(from, to, tokenId)
      }, 10000)
      console.log({from, to, tokenId});
    });
    exits.success();
  }


};

