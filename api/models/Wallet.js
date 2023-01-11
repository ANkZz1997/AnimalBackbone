/**
 * Wallet.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    user: {
      model: 'User',
    },
    address: {
      type: 'string',
      required: true,
      unique: true
    },
    privateKey: {
      type: 'string',
    },
    nonce: {
      type: 'number',
      defaultsTo: Math.floor(Math.random() * 1000000)
    },
    amount: {
      type: 'number',
      defaultsTo: 0
    }
  },
  customToJSON: function() {
    // Return a shallow copy of this record with the password and ssn removed.
    return _.omit(this, ['privateKey'])
  }

};

