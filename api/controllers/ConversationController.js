module.exports = {
  index: (req, res) => {
    const {id, t} = req.query;
    let promise = Dispute.find({id, user: req.payload.id});
    if(t) {
      if(req.payload.isAdmin) {
        promise.populate('conversation', {where: {createdAt: {'>': t}, response: false}})
      } else {
        promise.populate('conversation', {where: {createdAt: {'>': t}, response: true}})
      }
    } else {
      promise.populate('conversation')
    }
    promise.then(result => {
        return res.ok(result)
    }).catch(e => {
      sails.log.error(e);
      return res.badRequest(e);
    })
  },
}
