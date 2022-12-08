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
    },
    email: {
      type: 'string',
      unique: true
    },
    contact: {
      type: 'string',
    },
    wallet: {
      model: 'Wallet'
    },
    type: {
      type: 'string',
      isIn: ['CENTRALISED', 'DECENTRALISED'],
      defaultsTo: 'CENTRALISED'
    },
    status: {
      type: 'string',
      isIn: ['NEW', 'ACTIVE', 'BLOCKED', 'INACTIVE', 'DELETED'],
      defaultsTo: 'NEW'
    }
  },
  customToJSON: function() {
    // Return a shallow copy of this record with the password and ssn removed.
    return _.omit(this, ['password'])
  }
};

