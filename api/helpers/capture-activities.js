module.exports = {
  friendlyName: "Activitiy Messages",
  description: "",
  inputs: {
    payload: {
      type: "ref",
    },
  },
  exits: {
    success: {
      description: "All done.",
    },
    fail: {
      description: "Something went wrong",
    },
  },

  fn: async function (inputs, exits) {
    try{
    await Activity.create(
      inputs.payload
     );  
    return exits.success(inputs.payload);
    }catch(err){
      return exits.success();
    }
  },
};

//test