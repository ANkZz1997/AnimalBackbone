/**
 * Settings.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    uid: {type: 'number'},
    // general
    commission: {type: 'string'},
    commissionType: {type: 'string', isIn: ['value', 'percent']},
    lazymint: {type: 'boolean', defaultsTo: true},

    // adminWallet
    adminPrivateKey: {type: 'string', encrypt: true},

    // pinata
    pinataApiKey: {type: 'string'},
    pinataSecret: {type: 'string'},

    // stripe
    stripeSecret: {type: 'string'},

  },
};

