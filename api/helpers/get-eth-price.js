const request = require('request');
var rp = require('request-promise');
const exchangeUrl = (from, to) => `https://min-api.cryptocompare.com/data/price?fsym=${from}&tsyms=${to}`
module.exports = {


  friendlyName: 'Get eth price',


  description: '',


  inputs: {
    from: {
      type: 'string',
      required: true
    },
    to: {
      type: 'string',
      required: true
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'Eth price',
    },

  },


  fn: async function (inputs) {
    const url = exchangeUrl(inputs.from, inputs.to);
    const options = {
      uri: url,
      json: true
    }
    const rate = await rp.get(options);
    // Get eth price.
    // TODO

    // Send back the result through the success exit.
    return rate;
  }


};

