module.exports = function ok(data = {}, message = 'SUCCESS') {
  const req = this.req;
  const res = this.res;
  const status = 200;
  const response = {status, message, data}
  return res.status(status).send(response);
};
