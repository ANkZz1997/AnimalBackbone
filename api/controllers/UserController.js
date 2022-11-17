/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  nft: async (req, res) => {
    await Nft.find({ user: req.payload.id })
      .populateAll()
      .then((result) => {
        res.status(200).json(result);
      });
  },

  profile: async (req, res) => {
    await User.findOne({ id: req.payload.id })
      .then((result) => {
        res.status(200).json(result);
      });
  },

  updateProfile: async (req, res) => {
    const { firstName, lastName, contact } = req.body;
    req.file('avatar').upload({
      dirname: require('path').resolve(sails.config.appPath, 'uploads')
    },async (error, uploadedFile) => {
      if(error) {
        return res.badRequest(error);
      }
      let filename = '';
      let media = {};
      if(uploadedFile.length > 0){
        media = await Media.create({
          fd: uploadedFile[0].fd,
          size: uploadedFile[0].size,
          type: uploadedFile[0].type,
          filename: uploadedFile[0].filename,
          status: uploadedFile[0].status,
          field: uploadedFile[0].field,
          extra: uploadedFile[0].extra,
        }).fetch();
        const file = uploadedFile[0].fd;
        filename = file.replace(/^.*[\\\/]/, '');
      }
      const user = await User.findOne({id:req.payload.id});
      const userDetails = {
        avatar: media.id || user.avatar,
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
        contact: contact || user.contact
      };
      const updatedUser = await User.update({id:req.payload.id},userDetails).fetch();
      updatedUser[0].avatar = updatedUser[0].avatar;
      res.status(200).json(updatedUser);
    });
  },
};

