/**
 * Wallet.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    address: {
      type: 'string',
      required: true
    },
    privateKey: {
      type: 'string',
      required: true
    }
  },

};

