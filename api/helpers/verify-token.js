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
    if(!payload.isAdmin){
      const user = await User.findOne({id:payload.id});
      if(user.status === 'BLOCKED' || user.status === 'INACTIVE'|| user.status === 'DELETED'){
        return exits.error('invalid token');
      }else{
        return exits.success(payload);
      }
    }else{
      return exits.success(payload);
    }
  }
};

