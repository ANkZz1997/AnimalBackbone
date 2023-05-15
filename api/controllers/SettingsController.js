/**
 * SettingsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getNetworks: (req, res) => {
    Network.find({enabled:true}).then((networks) => res.ok(networks));
  },
  getSettings: (req, res) => {
    Settings.findOne({uid: 1}).then(setting => {
      delete setting['adminPrivateKey'];
      return res.ok(setting);
    });
  }
};
