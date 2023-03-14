const ejs = require('ejs');

module.exports = {
  friendlyName: "Activitiy Messages Rendering",
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
    const activities = [];
    const messages = sails.config.custom.activitiesMessages;
    if (inputs.payload) {
      for (let data of inputs.payload) {
        let msg = ejs.render(messages[data.action][data.type], data);
        activities.push({
          ...data,
          description: msg,
        });
      }
      exits.success(activities);
    } else {
      exits.success();
    }
  },
};
