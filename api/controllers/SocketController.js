/**
 * SocketController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  join: (req, res) => {
    sails.log.info(`User ${req.payload.id} joined the room`);
    sails.sockets.join(req, req.payload.id);
    res.ok();
  },
  leave: (req, res) => {
    const { id } = req.body
    console.log(req.body);
    sails.sockets.leave(req, id);
    res.ok();
  },

  // admin api's
  joinUserRoom: (req, res) => {
    const {user} = req.body
    console.log(user)
    sails.log.info(`Admin is joining user's room`);
    sails.sockets.join(req, user);
    res.ok();
  },
  leaveRoom: (req, res) => {
    const {user} = req.body
    console.log(user)
    sails.sockets.leave(req, user, () => {
      res.ok();
    })
  }
};

