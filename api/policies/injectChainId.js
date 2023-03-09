module.exports = async (req, res, next) => {
  req.payload = {};
  req.payload.chainId = req.headers.chainid;
  next();
}
