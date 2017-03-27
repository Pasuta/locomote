const request = require('koa-request');
const _ = require('lodash');

module.exports = function *airports(next) {

  const ctx = this;
  const query = ctx.query;

  if (_.isEmpty(query) || _.isUndefined(query.q) || query.q.length < 2) {
    this.body = 'query must contain at least two letters';
    yield next;
  } else {

    const options = {
      url: `http://node.locomote.com/code-task/airports?q=${query.q}`,
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
  }

};
