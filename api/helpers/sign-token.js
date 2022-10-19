const jwt = require('jsonwebtoken');
module.exports = {
  friendlyName: 'Assign New Token',
  description: 'This helper will be used to assign new token',
  extendedDescription: 'Use `activeSince` to only retrieve users who logged in since a certain date/time.',

  inputs: {
    payload: {
      type: 'ref'
    }
  },
  fn: async (inputs,exits)=>{
    let token = jwt.sign(inputs.payload,'secret',{ expiresIn: 60 * 60 });
    return exits.success(token);
  }
};

