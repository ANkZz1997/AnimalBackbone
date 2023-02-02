/**
 * DisputeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  //user api's
  index: async (req, res) => {
    const {page = 1, limit = 20, sort = 'createdAt', order = 'DESC'} = req.query;
    const criteria = req.body;
    criteria.user = req.payload.id;
    const totalCount = await Dispute.count(criteria);
    Dispute.find(criteria)
      .limit(limit)
      .skip((page-1)*limit)
      .sort(`${sort} ${order}`)
      .then(result => {
        res.ok({
          records: result,
          totalCount
        });
      }).catch(e => {
      res.badRequest(e);
    });
  },
  getEntities: (req, res) => {
    res.ok(require('./../constants/Entity'));
  },
  create: (req, res) => {
    const {description, relatedItem, relatedItemType} = req.body
    Dispute.create({
      user: req.payload.id,
      description,
      relatedItem,
      relatedItemType
    }).fetch().then(record => {
      res.ok(record);
    });
  },
  newMessage: (req, res) => {
    const {dispute, message} = req.body;
    Conversation.create({
      dispute,
      user: req.payload.id,
      message,
    }).fetch().then(record => {
      res.ok(record)
    });
  },

  //admin api's
  markAsPending:  (req, res) => {
    const {id} = req.query;
    Dispute.update({id}).set({status: 'PENDING'}).then(result => {
      res.ok()
    });
  },
  markAsClosed:  (req, res) => {
    const {id} = req.query;
    Dispute.update({id}).set({status: 'CLOSED'}).then(result => {
      res.ok()
    });
  },
  newResponse: (req, res) => {
    const {dispute, message} = req.body;
    Conversation.create({
      dispute,
      user: req.payload.id,
      message,
      response: true
    }).fetch().then(record => {
      res.ok(record)
    });
  }
};

