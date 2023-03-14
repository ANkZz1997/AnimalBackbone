const { exists } = require("grunt");

module.exports = {
  friendlyName: "Verify OTP",
  description: "",
  inputs: {
    payload: {
      type: "ref",
    },
  },
  exits: {
    success: {
      description: "OTP Verified.",
    },
    fail: {
      description: "Something went wrong",
    },
  },
  fn: async function (inputs, exits) {
    debugger;
    const decoded = await sails.helpers.decryptText({text:inputs.payload.token});
    console.log(decoded);
    const verificationDetails = JSON.parse(decoded);
    console.log(verificationDetails);
    console.log(inputs.payload);
    Otp.findOne({ id: verificationDetails.otpId, otp: inputs.payload.otp })
      .then(async (result) => {
        console.log(result);
        if (result) {
          await Otp.({id:result.id});
          exits.success({varified:true, user:result.user});
        } else {
          exits.success({varified:false});
        }
      })
      .catch((e) => {
        console.log(e);
        exits.success({varified:false});
      });
  },
};
