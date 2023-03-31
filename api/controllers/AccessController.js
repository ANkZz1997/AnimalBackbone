module.exports = {
  addRole: (req, res) => {
    const {name, code} = req.body;
    Role.create({name, code}).fetch().then(createdRecord => res.ok(createdRecord))
      .catch(e => res.badRequest(e));
  },
  addAccessCode: (req, res) => {
    const {description, code} = req.body;
    Access.create({description, code}).fetch().then(createdRecord => res.ok(createdRecord))
      .catch(e => res.badRequest(e));
  },
  assignAccessCode: (req, res) => {
    const {roleId, accessCodeId} = req.body;
    Role.addToCollection(roleId, 'accessCodes')
      .members(accessCodeId)
      .then(response => res.ok(response))
      .catch(e => res.badRequest(e))
  },
  removeAccessCode: (req, res) => {
    const {roleId, accessCodeId} = req.body;
    Role.removeFromCollection(roleId, 'accessCodes')
      .members(accessCodeId)
      .then(response => res.ok(response))
      .catch(e => res.badRequest(e))
  },
  getRoles: (req, res) => {
    Role.find().populate('accessCodes').then(result => res.ok(result))
      .catch(e => res.badRequest(e));
  },
  getAccessCodes: (req, res) => {
    Access.find().then(result => res.ok(result))
      .catch(e => res.badRequest(e));
  }
};
