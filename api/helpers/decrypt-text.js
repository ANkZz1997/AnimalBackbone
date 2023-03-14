const CryptoJS = require("crypto-js");

module.exports = {
  friendlyName: "Decrypt Text",
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
    try {
      const secret = sails.config.custom.encryptionSecret;
      console.log("-----------------------");
      console.log(inputs.payload.text);
      console.log("-----------------------");
      let bytes = CryptoJS.AES.decrypt(inputs.payload.text, secret);
      let originalText = bytes.toString(CryptoJS.enc.Utf8);
      console.log(originalText);
      exits.success(originalText);
    } catch (error) {
      return exits.fail(error);
    }
  },
};
