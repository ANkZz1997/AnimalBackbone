module.exports = {
  friendlyName: "Fetch Settings",
  description: "",
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
      const settings = await Settings.findOne({ uid: 1 });
      return exits.success(settings);
    } catch (e) {
      exits.fail(e);
    }
  },
};
