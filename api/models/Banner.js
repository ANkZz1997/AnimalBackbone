/**
 * Banner.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: {
      type: 'string',
      unique: true,
    },
    description: {
      type: 'string',
    },
    link: {
      type: 'string',
    },
    image: {
      type: 'string',
    },
    order:{
      type:'number',
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
