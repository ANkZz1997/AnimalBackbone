/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const ethUtil = require("ethereumjs-util");
const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
const passport = require("passport");
const { OAuth2Client } = require("google-auth-library");
const GOOGLE_CLIENT_ID =
  "144163062893-c48rp2sgka2ms7bl9o1r3nsln6mnctvt.apps.googleusercontent.com";
const client = new OAuth2Client(GOOGLE_CLIENT_ID);
const templates = require('./../constants/EmailTemplates');
const Otp = require("../models/Otp");

module.exports = {

  test: (req, res) => {
    sails.helpers.sendMail('rahil1992@gmail.com', templates.welcomeEmail.subject('Raheel'), '', templates.welcomeEmail.content('Raheel')).then(r => {
      return res.ok(r);
    }).catch(e => {
      return res.badRequest(e)
    })

  },
  createUser: async (req, res) => {
    const account = web3.eth.accounts.create();
    const wallet = await Wallet.create(account).fetch();
    let userDetails = req.body;
    req.body.wallet = wallet.id;
    req.file('avatar').upload({
      dirname: require('path').resolve(sails.config.appPath, 'uploads')
    },async (error, uploadedFile) => {
      if(error) {
        return res.badRequest(error);
      }
      let media = {};
      if(uploadedFile.length > 0){
        media = await Media.create({
          fd: uploadedFile[0].fd,
          size: uploadedFile[0].size,
          type: uploadedFile[0].type,
          filename: uploadedFile[0].filename,
          status: uploadedFile[0].status,
          field: uploadedFile[0].field,
          extra: uploadedFile[0].extra,
        }).fetch();
      }
      userDetails['avatar']  = media.id;
      User.create(userDetails)
      .fetch()
      .then(async (result) => {
        sails.helpers.sendMail(result.email, templates.welcomeEmail.subject(`${result.firstName} ${result.lastName}`), '', templates.welcomeEmail.content(`${result.firstName} ${result.lastName}`)).then(r => {
          sails.log.info('Sending welcome email');
        })
        sails.log.info(`User created with the id ${result.id}`)
        Wallet.update({id: wallet.id}).set({user: result.id}).then(_result => {sails.log.info('User wallet is updated with the user address')});
        Kyc.create({user: result.id}).then(_result => {sails.log.info(`User's Kyc record created`)});
        result.wallet = wallet;
        result.token = await sails.helpers.signToken({ id: result.id });
        return res.ok(result);
      })
      .catch((e) => {
        return res.badRequest(e);
      });
    });
  },
  login: (req, res) => {
    User.findOne({ username: req.body.username, password: req.body.password })
      .populateAll()
      .then(async (result) => {
        if (result) {
          result.token = await sails.helpers.signToken({ id: result.id });
          
          await User.update({ id: result.id }).set({
            lastLoginIP:req.clientIp
          });

          console.log('user ==> ', result.id);
          
          await sails.helpers.captureActivities({
            action:"AUTH",
            type:"LOGIN",
            user:result.id,
            payload:{
              loginAt:new Date(),
              ipAddress:req.clientIp
            }
          });
          res.ok(result);
        } else {
          res.badRequest("User not found");
        }
      })
      .catch((e) => {
        return res.badRequest("Something went wrong");
      });
  },
  loginNonce: async (req, res) => {
    const { address } = req.body;
    const wallet = await Wallet.findOne({ address: address.toLowerCase() });
    if (wallet) {
      res.ok(wallet);
    } else {
      Wallet.create({ address: address.toLowerCase() })
        .fetch()
        .then((result) => {
          result["newUser"] = true;
          res.ok(result);
        });
    }
  },
  verifySignature: async (req, res) => {
    let { address, signature, email } = req.body;
    const wallet = await Wallet.findOne({ address: address.toLowerCase() });
    const msg = `
Welcome to SDNA Crypt
Click to sign in and accept the SDNA Crypt Terms of Service: https://sdnatech.com

This request will not trigger a blockchain transaction or cost any gas fees.

Your authentication status will reset after 24 hours.

Wallet address:
${address}

Nonce:
${wallet.nonce}`;
    const msgBuffer = Buffer.from(msg, "utf8");
    const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
    const signatureBuffer = ethUtil.toBuffer(signature);
    const signatureParams = ethUtil.fromRpcSig(signatureBuffer);
    const publicKey = ethUtil.ecrecover(
      msgHash,
      signatureParams.v,
      signatureParams.r,
      signatureParams.s
    );
    const generatedPublicKey = ethUtil.bufferToHex(
      ethUtil.publicToAddress(publicKey)
    );
    if (address.toLowerCase() === generatedPublicKey.toLowerCase()) {
      if (wallet.user) {
        User.findOne({ id: wallet.user })
          .populateAll()
          .then(async (result) => {
            await User.update({ id: result.id }).set({
              lastLoginIP:req.clientIp
            });
            await sails.helpers.captureActivities({
              action:"AUTH",
              type:"LOGIN",
              user:result.id,
              payload:{
                loginAt:new Date(),
                ipAddress:req.clientIp
              }
            });
            result.token = await sails.helpers.signToken({ id: result.id });
            Wallet.update({ address: address.toLowerCase() })
              .set({
                user: result.id,
                nonce: Math.floor(Math.random() * 1000000),
              })
              .fetch()
              .then((result) => {});
            res.ok(result);
          });
      } else {
        User.create({
          type: "DECENTRALISED",
          firstName: "Unnamed",
          wallet: wallet.id,
          username: address.toLowerCase(),
          email: email,
        })
          .fetch()
          .then(async (result) => {
            await User.update({ id: result.id }).set({
              lastLoginIP:req.clientIp
            });
            Kyc.create({user: result.id}).fetch().then(_result => {sails.log.info(`User's KYC record is created with id - ${_result.id}`)})
            result.wallet = wallet;
            result.token = await sails.helpers.signToken({ id: result.id });
            Wallet.update({ address: address.toLowerCase() })
              .set({
                user: result.id,
                nonce: Math.floor(Math.random() * 1000000),
              })
              .then((result) => {sails.log.info(`User wallet nonce is updated`)});
              await sails.helpers.captureActivities({
                action:"AUTH",
                type:"LOGIN",
                user:result.id,
                payload:{
                  loginAt:new Date(),
                  ipAddress:req.clientIp
                }
              });
            return res.ok(result);
          })
          .catch((e) => {
            return res.badRequest(e);
          });
      }
    } else {
      res.badRequest("Signature verification Failed");
    }
  },

  //admin api's
  createAdmin: (req, res) => {
    const secret = "sdnaSecretAdmin";
    const { username, password, code } = req.body;
    if (code === secret) {
      Admin.create({ username, password })
        .fetch()
        .then((result) => {
          res.ok(result);
        })
        .catch((e) => {
          res.badRequest(e);
        });
    } else {
      res.badRequest("Unauthorized");
    }
  },
  adminLogin: (req, res) => {
    const { username, password } = req.body;
    Admin.findOne({ username })
      .decrypt()
      .then(async (result) => {
        if (!result) return res.badRequest("User not exist");
        if (result.password !== password)
          return res.badRequest("Invalid Password");
        result.token = await sails.helpers.signToken({
          id: result.id,
          isAdmin: true,
        });
        res.ok(result);
      })
      .catch((e) => {
        res.badRequest(e);
      });
  },
  socialLogin: async (req, res) => {
    const { type } = req.body;
    console.log(req.clientIp);
    switch (type) {
      case "GMAIL":
        passport.authenticate("google-id-token", async (error, user, info) => {
          if(error){
            console.log(error);
          }
          if (user) {
            res.ok(user);
          } else {
            console.log(info);
            res.badRequest("Something went wrong");
          }
        })(req, res);
        break;
      case "FACEBOOK":
        passport.authenticate("facebook-token", (error, user, info) => {
          if (user) {
            res.ok(user);
          } else {
            res.badRequest("Something went wrong");
          }
        })(req, res);
        break;

      case "GITHUB":
        passport.authenticate("github", (error, user, info) => {
          if (user) {
            res.ok(user);
          } else {
            res.badRequest("Something went wrong");
          }
        })(req, res);
        break;

      default:
        res.badRequest(e);
    }
  },
  forgotPassword: async (req, res) => {
    User.findOne({ email: req.body.email, type: "CENTRALISED" })
      .then(async (result) => {
        if (result) {
          const otpDetails = await sails.helpers.createOtp({
            user: result.id,
            type: "EMAIL",
            for: "FORGOTPASSWORD",
          });
          let name =  `${result.firstName} ${result.lastName}`;
          (!name)? name = result.email : '';
          sails.helpers.sendMail(result.email, templates.forgotPassword.subject(), '', templates.forgotPassword.content({name:name,OTP:otpDetails['otp'], token:otpDetails['token']})).then(r => {
            sails.log.info('Sending forgot password email');
          });
          res.ok({token:otpDetails['token']});
        } else{
          res.badRequest("User not found");
        }
      })
      .catch((e) => {
        console.log(e);
        return res.badRequest("Something went wrong");
      });
  },

  resetPassword:async (req, res) => {
    const { token, otp, password } = req.body;
    const otpDetails =  await sails.helpers.verifyOtp({
      token,
      otp
    });
    if(otpDetails.varified === true){
      await User.update({id:otpDetails.user},{password:password}).fetch();
      res.ok();
    }else{
      return res.badRequest("Something went wrong");
    }
  }
};
