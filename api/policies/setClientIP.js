module.exports = function (req, res, next) {
  req.clientIp = req.headers["x-forwarded-for"];
  next();
};
