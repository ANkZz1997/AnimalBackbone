const Web3 = require('web3');
const ethers = require('ethers')
const web3 = new Web3(sails.config.custom.blockchain.goerli.node);

const privateKey = sails.config.custom.privateKey;

const createVoucher = async (nft, pk) => {
  console.log(nft)
  const voucher = {
    minPrice: web3.utils.toWei(nft.minPrice, 'ether'),
    uri: nft.metaData,
    royaltyPercentage: nft.royalty
  }
  const types = {
    NFTVoucher: [
      { name: "minPrice", type: "uint256" },
      { name: "uri", type: "string" },
      { name: "royaltyPercentage", type: "uint256" }
    ]
  }
  const domain = {
    name: 'Animal NFT',
    version: '1',
    verifyingContract: sails.config.custom.blockchain.goerli.contract,
    chainId: 5
  }
  const signer = new ethers.Wallet(pk)
  const signature = await signer.signTypedData(domain, types, voucher);
  return {
    ...voucher,
    signature,
  }
}
module.exports = {


  friendlyName: 'Mint nft',


  description: '',


  inputs: {
    minter: {type: 'ref'},
    redeemer: {type: 'ref'},
    nft: {type: 'ref'},
    marketplaceItem: {type: 'ref'}
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs, exits) {
    const {minter, redeemer, nft, marketplaceItem} = inputs;
    await web3.eth.accounts.wallet.add(redeemer.wallet.privateKey);
    const voucher = await createVoucher(nft, minter.wallet.privateKey)
    const contract = new web3.eth.Contract(sails.config.custom.nftAbi, sails.config.custom.blockchain.goerli.contract);
    console.log(voucher)
    console.log({
      from: redeemer.wallet.address,
      value: web3.utils.toWei(marketplaceItem.price, 'ether'),
      gas: 253120,
      gasPrice: web3.utils.toWei('300', 'gwei')
    })
    const txn = await contract.methods.redeem(minter.wallet.address, redeemer.wallet.address, voucher).send({
      from: redeemer.wallet.address,
      value: web3.utils.toWei(marketplaceItem.price, 'ether'),
      gas: 253120,
      gasPrice: web3.utils.toWei('300', 'gwei')
    });
    console.log(txn)
    return exits.success(txn)
  }


};

