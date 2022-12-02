/**
 * Activity.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    action: {
      type: 'string',
      isIn: ['AUTH', 'NFT', 'MARKETPLACE', 'AUCTION', 'BID'],
      required: true
    },
    type: {
      type: 'string',
      isIn: ['ADD', 'REMOVE', 'LOGIN'],
      required: true
    }
  }
};

