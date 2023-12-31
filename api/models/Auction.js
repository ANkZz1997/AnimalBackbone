/**
 * Auction.js
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
      model: 'Nft',
      required: true
    },
    basePrice: {
      type: 'number',
      required: true
    },
    endTime: {
      type: 'number',
      required: true
    },
    status: {
      type: 'string',
      isIn: ['ACTIVE', 'ENDED', 'REMOVED', 'FAILED' , 'SETTLEMENT'],
      defaultsTo: 'ACTIVE'
    },
    bid: {
      collection: 'Bid',
      via: 'auction'
    },
    voucher: {
      type: 'json'
    },
    chainId: {
      type: 'number'
    }
  },
};

