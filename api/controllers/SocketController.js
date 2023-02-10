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
  }
};

