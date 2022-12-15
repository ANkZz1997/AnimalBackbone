const jwt = require("jsonwebtoken");
const ethUtil = require("ethereumjs-util");
const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");

module.exports = {
  friendlyName: "Add Update User on Social Login",
  description: "This helper will be used to Add Update User on Social Login",
  extendedDescription:
    "This helper will be used to Add Update User on Social Login.",

  inputs: {
    payload: {
      type: "ref",
    },
  },
  fn: async (inputs, exits) => {
    if (inputs.payload.socialId) {
      const user = await User.findOne({
        or: [
          { email: inputs.payload.email },
          {
            socialId: inputs.payload.socialId,
            socialAccountType: inputs.payload.socialAccountType,
          },
        ],
      });
      if (user) {
        user.token = await sails.helpers.signToken({ id: user.id });
        return exits.success(user);
      } else {
        const account = web3.eth.accounts.create();
        const wallet = await Wallet.create(account).fetch();
        inputs.payload.wallet = wallet.id;
        User.create(inputs.payload)
          .fetch()
          .then(async (result) => {
            const updatedWallet = await Wallet.update({ id: wallet.id }).set({
              user: result.id
            }).fetch();
            result.wallet = updatedWallet;
            result.token = await sails.helpers.signToken({ id: result.id });
            return exits.success(result);
          })
          .catch((e) => {
            return exits.error(e);
          });
      }
    }
  },
};
