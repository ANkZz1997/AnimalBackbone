/**
 * ContractEventController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const {abi} = require("./../constants/networks")
const ethers = require("ethers");
const privateKey = sails.config.custom.privateKey;
const web3Obj = {};


const handleTransfer = (from, to, tokenId) => {
  NftTransaction.findOne({fromAddress: from.toLowerCase(), toAddress: to.toLowerCase(), status: 'PENDING'})
    .populateAll()
    .then(async result => {
      if(result) {
        if(result.nft.minted && !result.nft.tokenId) {
          await Nft.update({id: result.nft.id}).set({tokenId: tokenId});
        }
        if(result.toUser.type === 'DECENTRALISED') {
          await Marketplace.update({id: result.marketplace.id}).set({status: "COMPLETED"})
        }
        await NftTransaction.update({id: result.id}).set({status: 'SUCCESS'});
      } else {

      }
    });
};

module.exports = {
  startListening:  (req, res) => {
    const contractABI = abi;
    Network.find().then(r => {
      r.forEach(n => {
        web3Obj[n.chainId] = {};
        sails.log.info('Setting provider: ' + n.host)
        web3Obj[n.chainId].chainId = n.chainId;
        web3Obj[n.chainId].provider = new ethers.JsonRpcProvider(n.host);
        web3Obj[n.chainId].signer = new ethers.Wallet(privateKey, web3Obj[n.chainId].provider);
        web3Obj[n.chainId].contract = new ethers.Contract(n.address, abi, web3Obj[n.chainId].signer);
        sails.log.info('Subscribing for : ' + n.host)
        web3Obj[n.chainId].contract.on("Transfer", (from, to, tokenId) => {
          setTimeout(() => {handleTransfer(from, to, tokenId)}, 10000)
          console.log({from, to, tokenId});
        });
        // web3Obj[n.chainId].contract.on("Minted", (nftId, nftCreator, time) => {
        //   console.log({nftId, nftCreator, time});
        // });
      })
    })
    res.ok('started')
  }
};

