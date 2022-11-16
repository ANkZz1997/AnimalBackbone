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
        result.avatar = (result.avatar) ? require('util').format('%s/images/%s', sails.config.custom.baseUrl, result.avatar): '';
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
      if(uploadedFile.length > 0){
        const file = uploadedFile[0].fd;
        filename = file.replace(/^.*[\\\/]/, '');
      }
      const user = await User.findOne({id:req.payload.id});
      const userDetails = {
        avatar: filename || user.avatar,
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
        contact: contact || user.contact
      };
      const updatedUser = await User.update({id:req.payload.id},userDetails).fetch();
      updatedUser[0].avatar = (updatedUser[0].avatar) ? require('util').format('%s/images/%s', sails.config.custom.baseUrl, updatedUser[0].avatar): '';
      res.status(200).json(updatedUser);
    });
  },
};

