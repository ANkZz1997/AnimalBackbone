/**
 * Access.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    code: {type: 'string', required: true, unique: true},
    description: {type: 'string', required: true},
  },

};

