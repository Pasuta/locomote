const request = require('koa-request');

module.exports = function *airlines(next) {
  const options = {
    url: 'http://node.locomote.com/code-task/airlines',
    headers: { 'User-Agent': 'request' }
  };

  const response = yield request(options);
  let body;
  try {
    body = JSON.parse(response.body);
  } catch (e) {
    body = {error: e};
  }
  this.body = body;
  yield next;

};
