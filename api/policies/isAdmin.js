module.exports = async (req, res, next) => {
  if(!req.payload.isAdmin)
    return res.badRequest('Only admin is authorized to call this api');
  next();
}
