var jwt = require('jsonwebtoken');
module.exports = {
  friendlyName: 'Verify Token',
  description: 'This helper will be used to verify token',
  extendedDescription: 'helper will verify token using secret and exract payload',

  inputs: {
    token: {
      type: 'string'
    }
  },
  fn: async (inputs,exits)=>{
    let payload = jwt.verify(inputs.token,'secret');
    return exits.success(payload);
  }
};

