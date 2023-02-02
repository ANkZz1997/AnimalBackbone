module.exports = {
  chat: (req, res) => {
    sails.sockets.broadcast('connection', 'nnn', {data: 'Hello'})
    return res.ok()
  }
}
