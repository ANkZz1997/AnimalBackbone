/**
 * StripeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const stripe = require("stripe")(sails.config.custom.stripeSecret);
module.exports = {
  list: (req, res) => {
    Stripe.find({user: req.payload.id})
      .then(records => {
        res.ok(records);
      })
  },
  createPayment: async (req, res) => {
    const {amount} = req.body
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    paymentIntent.piId = paymentIntent.id;
    paymentIntent.user = req.payload.id;
    paymentIntent.processed = false;
    delete paymentIntent.id;
    Stripe.create(paymentIntent).fetch().then(async record => {
      await sails.helpers.captureActivities({
        action:"PAYMENT",
        type:"INTENT",
        user:req.payload.id,
        payload:{
          amount:amount,
          paymentIntentId:record.id,
          ipAddress:req.clientIp
        }
      });
      res.ok(record)
    });
  },
  verifyPayment: async (req, res) => {
    const {payment_intent, payment_intent_client_secret} = req.query;
    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);
    // return res.ok(paymentIntent)
    Stripe.findOne({piId: payment_intent}).then(async record => {
      if (!record) return res.redirect('https://nft.sdnatech.com/paymentStatus?id=null');
      if (record.processed) return res.redirect(`https://nft.sdnatech.com/paymentStatus?id=${record.id}`);
      if (paymentIntent.status !== record.status) {
        if (paymentIntent.status === 'succeeded') {
          Wallet.findOne({user: record.user}).then(wallet => {
            Wallet.update({user: record.user}).set({amount: wallet.amount + paymentIntent.amount_received})
              .then(async () => {
                delete paymentIntent.id;
                Stripe.update({piId: payment_intent}).set({...paymentIntent, processed: true}).fetch().then(async _record => {
                  await sails.helpers.captureActivities({
                    action:"PAYMENT",
                    type:"VERIFIED",
                    user:record.user,
                    payload:{
                      amount:paymentIntent.amount_received,
                      paymentIntentId:record.id,
                      ipAddress:req.clientIp
                    }
                  });
                  res.redirect(`https://nft.sdnatech.com/paymentStatus?id=${record.id}`)
                }).catch(e => {
                  res.redirect(`https://nft.sdnatech.com/paymentStatus?id=${record.id}`)
                })
              })
          });
        } else {
          await Stripe.update({piId: payment_intent}).set(paymentIntent)
          res.redirect(`https://nft.sdnatech.com/paymentStatus?id=${record.id}`)
        }
      } else {
        return res.redirect(`https://nft.sdnatech.com/paymentStatus?id=${record.id}`)
      }
    })
  },
  paymentStatus: (req, res) => {
    const {id} = req.query;
    Stripe.findOne({id: id}).then(record => {
      res.ok(record);
    });
  }
};

