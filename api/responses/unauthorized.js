module.exports = function unauthorized(message = 'Unauthorized') {
  const req = this.req;
  const res = this.res;
  const status = 401;
  const response = {status, message}
  return res.status(status).send(response);
};
