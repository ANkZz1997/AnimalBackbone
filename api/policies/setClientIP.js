module.exports = function(req, res, next) {
    req.ip = req.headers['x-forwarded-for'] || req.ip;
    next();
  };