/**
 * Nft.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    image: {
      type: 'string',
    },
    IpfsHash: {
      type: 'string',
    },
    metaData: {
      type: 'string',
    },
    Timestamp: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    royalty: {
      type: 'number'
    },
    description: {
      type: 'string'
    },
    category: {
      type: 'string',
    },
    collection: {
      type: 'string'
    },
    attributes: {
      type: 'json',
      columnType: 'array'
    },
    user :{
      model: 'User'
    }
  },

};

