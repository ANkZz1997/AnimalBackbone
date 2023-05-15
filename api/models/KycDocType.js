/**
 * DocumentType.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: {
      type: "string",
    },
    addressProof: {
      type: "boolean",
      defaultsTo: false,
    },
    identitiyProof: {
      type: "boolean",
      defaultsTo: false,
    },
    enabled: {
      type: "boolean",
      defaultsTo: false,
    },
  },
};
