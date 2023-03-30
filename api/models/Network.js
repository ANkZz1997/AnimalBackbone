/**
 * Network.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    host: {type: 'string'},
    chainId: {type: 'string'},
    address: {type: 'string'},
    logo: {model: 'Media'},
    enabled: {type: 'boolean'}
  },

};

