const CryptoJS = require("crypto-js");
module.exports = {
  friendlyName: "Encrypt Text",
  description: "",
  inputs: {
    text: {
      type: 'string',
      required: true
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
    const text = inputs.text;
    console.log(text);
    const secret = sails.config.custom.encryptionSecret;
    const ciphertext = CryptoJS.AES.encrypt(text, secret).toString();
    exits.success(ciphertext);
  },
};
