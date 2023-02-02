module.exports = {
  index: (req, res) => {
    const {id, t} = req.query;
    const criteria = {id, user: req.payload.id}
    let promise = null;
    if(t) {
      promise = Dispute.find({id, user: req.payload.id});
      promise.populate('conversation', {where: {createdAt: {'>': t}, response: true}})
    } else {
      promise = Dispute.find({id, user: req.payload.id});
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
