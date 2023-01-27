/**
 * EthereumController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getBalance: (req,res) => {
    const {address} = req.query
    sails.helpers.etherBalance(address).then(result => {
      res.ok({
        balance: result
      })
    })
  },
  rate: async (req, res) => {
    const {from, to} = req.body;
    const rate = await sails.helpers.getEthPrice(from, to);
    res.ok(rate)
  },
  purchase: async (req, res) => {
    const {amount} = req.body;
    const user = await User.findOne({id: req.payload.id}).populate('wallet');
    const rate = await sails.helpers.getEthPrice('ETH', 'INR');
    const totalPrice = amount * rate['INR'];
    if(user.wallet.amount < totalPrice){
      return res.badRequest(`Insufficient fund - required amount ${totalPrice}, available amount ${user.wallet.amount}`)
    }
    sails.helpers.transferEther(user.wallet.address, amount).then(result => {
      console.log(result)
      Wallet.update({id: user.wallet.id}).set({amount: user.wallet.amount-totalPrice}).then(result => {})
      Ethereum.create({
        user: req.payload.id,
        ether: amount,
        price: totalPrice,
        rate: rate['INR'],
        transactionHash: result.transactionHash
      }).then(createdRecord => {
        console.log(createdRecord);
      })
      return res.ok({
        transactionHash: result.transactionHash
      });
    }).catch(e => {
      res.badRequest(e)
    })
    // return res.ok();
  },
  transactions: (req, res) => {
    Ethereum.find({user: req.payload.id}).then(records => {
      res.ok(records)
    })
  }
};

