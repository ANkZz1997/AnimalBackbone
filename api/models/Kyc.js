/**
 * Kyc.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

/**
 * Status info
 * PENDING: 'when user initiate kyc verification request'
 * REJECTED: 'when admin reject the kyc request for any reason'
 * APPROVED: 'when admin verify kyc document and approve'
 */

module.exports = {

  attributes: {
    user: {
      model: 'User',
      required: true
    },
    status: {
      type: 'string',
      isIn: ['PENDING', 'REJECTED', 'APPROVED'],
      defaultsTo: 'PENDING'
    },
    identityProof: {
      model: 'Media'
    },
    addressProof: {
      model: 'Media'
    },
    remarks: {
      type: 'string',
    }
  },

};

