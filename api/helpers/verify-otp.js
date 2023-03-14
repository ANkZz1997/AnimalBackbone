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
    const decoded = await sails.helpers.decryptText({text:inputs.payload.token});
    const verificationDetails = JSON.parse(decoded);
    Otp.findOne({ id: verificationDetails.otpId, otp: inputs.payload.otp })
      .then(async (result) => {
        if (result) {
          await Otp.destroy({id:result.id});
          exits.success({varified:true, user:result.user});
        } else {
          exits.success({varified:false});
        }
      })
      .catch((e) => {
        exits.success({varified:false});
      });
  },
};
