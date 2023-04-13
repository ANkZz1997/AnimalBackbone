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
      }).populateAll();
      if (user) {
        let kyc = await Kyc.find({user: user.id});
        if(!kyc.length){
          Kyc.create({user: user.id}).then(_result => {sails.log.info(`User's Kyc record created`)});
        }
        await User.update({ id: user.id }).set({
          lastLoginIP:req.ip
        });
        await sails.helpers.captureActivities({
          action:"AUTH",
          type:"LOGIN",
          user:user.id,
          payload:{
            loginAt:new Date(),
            ipAddress:req.ip
          }
        });
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
            await Kyc.create({user: result.id}).then(_result => {sails.log.info(`User's Kyc record created`)});
            result.token = await sails.helpers.signToken({ id: result.id });
            await User.update({ id: result.id }).set({
              lastLoginIP:req.ip
            });
            await sails.helpers.captureActivities({
              action:"AUTH",
              type:"LOGIN",
              user:result.id,
              payload:{
                loginAt:new Date(),
                ipAddress:req.ip
              }
            });
            return exits.success(result);
          })
          .catch((e) => {
            return exits.error(e);
          });
      }
    }
  },
};
