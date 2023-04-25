const jwt = require("jsonwebtoken");
const ethUtil = require("ethereumjs-util");
const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
const templates = require('./../constants/EmailTemplates');

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
    const ipAddr = inputs.payload.ipAddress;
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
        if(user.status === 'BLOCKED' || user.status === 'INACTIVE'){
          return res.badRequest("your account is suspended by admin");
        }
        await User.update({ id: user.id }).set({
          socialId: inputs.payload.socialId,
          socialAccountType: inputs.payload.socialAccountType,
          lastLoginIP:ipAddr
        });
        await sails.helpers.captureActivities({
          action:"AUTH",
          type:"LOGIN",
          user:user.id,
          payload:{
            loginAt:new Date(),
            ipAddress:ipAddr
          }
        });
        user.token = await sails.helpers.signToken({ id: user.id });
        return exits.success(user);
      } else {
        const account = web3.eth.accounts.create();
        const wallet = await Wallet.create(account).fetch();
        inputs.payload.wallet = wallet.id;
        delete inputs.payload['ipAddress'];
        User.create(inputs.payload)
          .fetch()
          .then(async (result) => {
            const updatedWallet = await Wallet.update({ id: wallet.id }).set({
              user: result.id
            }).fetch();
            result.wallet = updatedWallet;
            const settings = await sails.helpers.fetchSettings();
            const name = `${result.firstName} ${result.lastName}`;
            const info = { ...settings, name:name };
            sails.helpers.sendMail(result.email, templates.welcomeEmail.subject(name), '', templates.welcomeEmail.content(info)).then(r => {
              sails.log.info('Sending welcome email');
            });
            await Kyc.create({user: result.id}).then(_result => {sails.log.info(`User's Kyc record created`)});
            result.token = await sails.helpers.signToken({ id: result.id });
            await User.update({ id: result.id }).set({
              lastLoginIP:ipAddr
            });
            await sails.helpers.captureActivities({
              action:"AUTH",
              type:"LOGIN",
              user:result.id,
              payload:{
                loginAt:new Date(),
                ipAddress:ipAddr
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
