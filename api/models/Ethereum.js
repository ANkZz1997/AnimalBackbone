/**
 * Ethereum.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    user: {
      model: 'User',
      required: true
    },
    ether: {
      type: 'number',
      required: true
    },
    price: {
      type: 'number'
    },
    rate: {
      type: 'json'
    },
    transactionHash: {
      type: 'string'
    }
  },

};

