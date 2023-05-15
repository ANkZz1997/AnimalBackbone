const abi = require('./../constants/networks').abi
const Web3 = require('web3');
const { ethers } = require('ethers');

module.exports = {
  withdrawEthers: async (req, res) => {
    const user = await User.findOne({id: req.payload.id}).populate('wallet');
    const network = await Network.findOne({chainId: req.payload.chainId});
    const provider = new ethers.JsonRpcProvider(network.host);
    const signer = new ethers.Wallet(user.wallet.privateKey, provider);
    const contract = new ethers.Contract(network.address, abi, signer);
    const tx = await contract.withdraw();
    const receipt = await tx.wait();
    return res.ok(receipt);

  },
  availableToWithdraw: async (req, res) => {
    const user = await User.findOne({id: req.payload.id}).populate('wallet');
    const network = await Network.findOne({chainId: req.payload.chainId});
    const web3 = new Web3(network.host);
    const account = web3.eth.accounts.privateKeyToAccount(user.wallet.privateKey);
    const contract = new web3.eth.Contract(abi, network.address );
    contract.methods.availableToWithdraw().call({from: account.address}).then(balance => {
      res.ok({balance});
    }).catch(e => res.badRequest(e));
  }
};
