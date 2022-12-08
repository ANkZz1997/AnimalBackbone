module.exports = function created(data = {}, message = 'Created') {
  const req = this.req;
  const res = this.res;
  const status = 201;
  const response = {status, message, data}
  return res.status(status).send(response);
};
