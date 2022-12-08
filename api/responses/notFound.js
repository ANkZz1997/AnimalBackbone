module.exports = function notFound(message = 'Not Found') {
  const req = this.req;
  const res = this.res;
  const status = 404;
  const response = {status, message}
  return res.status(status).send(response);
};
