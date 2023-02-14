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
    console.log(inputs.payload);

    if (inputs.payload) {
      for (let data of inputs.payload) {
        console.log(messages[data.action][data.type]);
        let msg = ejs.render(messages[data.action][data.type], data);
        console.log(msg);
        activities.push({
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          id: data.id,
          action:data.action,
          type:data.type,
          description: msg
        });
      }
      exits.success(activities);
    } else {
      exits.success();
    }
  },
};
