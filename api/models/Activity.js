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
      isIn: ['AUTH', 'NFT'],
      required: true
    },
    type: {
      type: 'string',
      isIn: ['LOGIN', 'CHANGEPASSWORD', 'CREATE', 'BUY', 'MARKFAV', 'UNMARKFAV', 'ADDTOMARKET', 'REMOVEFROMMARKET', 'UPDATEPRICE', "BID"],
      required: true
    },
    user: {
      model: 'User',
      required: true
    },
    nft: {
      model: 'Nft'
    },
    marketplace: {
      model: 'Marketplace'
    },
    auction: {
      model: 'Auction'
    },
    bid: {
      model: 'Bid'
    },
    payload:{
      type:'json'
    }
  }
};

