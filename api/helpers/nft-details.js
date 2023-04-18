module.exports = {
  friendlyName: "NFT Details",
  description: "Return NFT and Increment View",
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
    const id = inputs.payload.id;
    Nft.findOne({ id })
      .populate("minter")
      .populate("user")
      .populate("wishlistedBy")
      .then((result) => {
        const wishlistedBy = result.wishlistedBy.filter(
          (user) => user.id === inputs.payload.loggedInUser
        );
        if (wishlistedBy.length > 0) {
          result.markedFav = true;
        } else {
          result.markedFav = false;
        }
        delete result.wishlistedBy;
        Nft.updateOne({ id })
          .set({ views: (result.views || 0) + 1 })
          .then();
        exits.success(result);
      })
      .catch((e) => {
        exits.fail(e);
      });
  },
};
