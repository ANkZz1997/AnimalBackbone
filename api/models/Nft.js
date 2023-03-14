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
    media: {
      model: 'Media',
    },
    ipfsHash: {
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
    minPrice: {
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
      model: 'User',
      // required: true
    },
    minter: {
      model: 'User',
      // required: true
    },
    marketPlaceId: {
      type: 'string',
    },
    auctionId: {
      type: 'string',
    },
    status: {
      type: 'string',
      isIn: ['PORTFOLIO', 'MARKETPLACE', 'AUCTION'],
      defaultsTo: 'PORTFOLIO'
    },
    transferCount: {
      type: 'number',
      defaultsTo: 0,
    },
    wishlistedBy: {
      collection: 'User',
      via: 'wishlist'
    },
    minted: {
      type: 'boolean',
      defaultsTo: false
    },
    chainId: {
      type: 'number'
    },
    views: {
      type: 'number'
    }
  },
};

