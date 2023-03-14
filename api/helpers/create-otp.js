module.exports = {
  friendlyName: "Create OTP",
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
    let otp = Math.floor(100000 + Math.random() * 900000);
    otp = parseInt(otp.toString().substring(0, 6));
    let details = inputs.payload;
    details["otp"] = otp;
    console.log(details);
    Otp.create(details)
      .fetch()
      .then(async (result) => {
        const verificationDetails = {
          timestamp: new Date(),
          user: details.usuer,
          otpId: result.id,
        };
        const token = await sails.helpers.encryptText(
          JSON.stringify(verificationDetails)
        );
        exits.success({
          otp: otp,
          token: token,
        });
      })
      .catch((e) => {
        return exits.fail(e);
      });
  },
};
