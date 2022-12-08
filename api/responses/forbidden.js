module.exports = function forbidden(message = 'Forbidden') {
  const req = this.req;
  const res = this.res;
  const status = 403;
  const response = {status, message}
  return res.status(status).send(response);
};
