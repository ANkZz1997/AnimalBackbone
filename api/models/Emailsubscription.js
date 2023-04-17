/**
 * Emailsubscription.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

 module.exports = {
    attributes: {
      email: {
        type: 'string',
        unique: true,
      },
      isDeleted: {
        type: 'boolean',
        defaultsTo: false
      },
      isActive: {
        type: 'boolean',
        defaultsTo: true
      }
    },
  };
  