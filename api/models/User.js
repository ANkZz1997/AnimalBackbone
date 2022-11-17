/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    avatar:{
      type: 'string'
    },
    firstName:{
      type: 'string'
    },
    lastName:{
      type: 'string'
    },
    password: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    contact: {
      type: 'string',
      required: true
    },
    wallet: {
      model: 'Wallet'
    }
  },

};

