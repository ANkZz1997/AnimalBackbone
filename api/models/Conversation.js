/**
 * Conversation.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    dispute: {
      model: 'Dispute'
    },
    user: {
      model: 'User',
    },
    message: {
      type: 'string'
    },
    media: {
      model: 'Media'
    },
    response: {
      type: 'boolean',
      defaultsTo: false
    },
    readStatus: {
      type: 'boolean',
      defaultsTo: false
    }
  },

};

