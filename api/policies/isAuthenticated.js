module.exports = async (req, res, next) => {
  if(!req.headers.authorization) return res.badRequest('No Access Token');
  let partials = req.headers.authorization.split(' ');
  let scheme = partials[0];
  if(scheme !== 'Bearer') return res.badRequest('Invalid Token Scheme');
  let token = partials[1];
  let payload = await sails.helpers.verifyToken(token);
  req.payload = payload;
  req.payload.chainId = req.headers.chainid;
  req.body={
    ...req.body
  };
  next();
}
