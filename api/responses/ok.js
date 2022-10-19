/**
 * ok.js
 *
 * A custom response.
 *
 * Example usage:
 * ```
 *     return res.ok();
 *     // -or-
 *     return res.ok(optionalData);
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'ok'
 *       }
 *     }
 * ```
 *
 * ```
 *     throw 'somethingHappened';
 *     // -or-
 *     throw { somethingHappened: optionalData }
 * ```
 */

module.exports = function ok(data = {}, message = 'SUCCESS') {
  const req = this.req;
  const res = this.res;
  const status = 200;
  const response = {status, message, data}
  return res.status(status).send(response);
};
