/**
 * Dispute.js
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
    description: {
      type: 'string'
    },
    conversation: {
      collection: 'Conversation',
      via: 'dispute'
    },
    status: {
      type: 'string',
      isIn: ['NEW', 'PENDING', 'CLOSED'],
      defaultsTo: 'NEW'
    },
    relatedItem: {
      type: 'string'
    },
    relatedItemType: {
      type: 'number'
    }
  },

};

