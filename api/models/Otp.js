/**
 * Otp.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    otp: {
      type: 'string',
    },
    user: {
      model: 'User'
    },
    type: {
      type: 'string',
      isIn: ['EMAIL', 'MOBILE']
    },
    for:{
      type:'string',
      isIn:['FORGOTPASSWORD','EMAILCONFIRMATION']
    }
  },

};

