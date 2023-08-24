

module.exports = {
  friendlyName: 'Check Empty Object',
  description: '',
  inputs: {
    payload: {
        type: "ref",
      },
  },
  exits: {
    success: {
      description: 'All done.',
    },
    fail: {
      description: 'Something went wrong'
    }
  },
  fn: async function (inputs, exits) {
    const objLength = Object.keys(inputs.payload).length === 0;
    exits.success(objLength);
  }
};

