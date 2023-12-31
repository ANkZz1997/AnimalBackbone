/**
 * Marketplace.js
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
    nft: {
      model: 'Nft'
    },
    price: {
      type: 'float',
      columnType: 'double',
      required: true
    },
    status: {
      type: 'string',
      isIn: ['PENDING', 'COMPLETED', 'DELETED'],
      defaultsTo: 'PENDING'
    },
    isDeleted: {
      type: 'boolean',
      defaultsTo: false
    },
    voucher: {
      type: 'json'
    },
    chainId: {
      type: 'number'
    }
  },

};

