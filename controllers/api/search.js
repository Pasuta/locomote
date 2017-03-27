const moment = require('moment');
const Promise = require('bluebird');
const request = require('koa-request');
const request2 = Promise.promisifyAll(require('request'));
const _ = require('lodash');
const host = 'http://node.locomote.com/code-task';

module.exports = function *search(next) {
  const ctx = this;
  const query = ctx.query;

  const date = moment(new Date(query.date)).format('YYYY-MM-DD');
  const queryDates = {
    '-2': moment(date).add('days', -2).format('YYYY-MM-DD'),
    '-1': moment(date).add('days', -1).format('YYYY-MM-DD'),
    '0': moment(date).format('YYYY-MM-DD'),
    '1': moment(date).add('days', 1).format('YYYY-MM-DD'),
    '2': moment(date).add('days', 2).format('YYYY-MM-DD')
  };

  const optionsAirlines = {
    url: `${host}/airlines`,
    headers: { 'User-Agent': 'request' }
  };

  const optionsAirportsFrom = {
    url: `${host}/airports?q=${query.from}`,
    headers: { 'User-Agent': 'request' }
  };

  const optionsAirportsTo = {
    url: `${host}/airports?q=${query.to}`,
    headers: { 'User-Agent': 'request' }
  };

  const responseAirlines = yield request(optionsAirlines);
  const responseAirportsFrom = yield request(optionsAirportsFrom);
  const responseAirportsTo = yield request(optionsAirportsTo);

  const airlines = JSON.parse(responseAirlines.body);
  // const airlines = JSON.parse(responseAirlines.body).splice(4);

  const airportsFrom = JSON.parse(responseAirportsFrom.body);
  const airportsTo = JSON.parse(responseAirportsTo.body);
  let routes = [];
  _.forEach(airportsFrom, function (from) {
    _.forEach(airportsTo, function (to) {
      routes.push({'from': from.airportCode, 'to': to.airportCode});
    });
  });

  let results = {};
  let queries = [];
  let options;
  for (let r in routes) {
    if (routes.hasOwnProperty(r)) {
      let route = routes[r];
      for (let day in queryDates) {
        if (queryDates.hasOwnProperty(day)) {
          results[day] = [];
          for ( let airline of airlines) {
            const url = `${host}/flight_search/${airline.code}?date=${queryDates[day]}&from=${route.from}&to=${route.to}`;
            options =  {
              url: url,
              headers: { 'User-Agent': 'request' }
            };
            console.log(`Make request to ${url}`);
            queries.push(request2.getAsync(options).bind({day: day, results: results}).then(parseAnswer));
          }
        }
      }
    }
  }

  yield Promise.all(queries);

  this.body = JSON.stringify(results);
  yield next;
};

function parseAnswer(response) {
  const self = this;
  let body;
  try {
    body = JSON.parse(response.body);
  } catch (e) {
    console.error(e);
    body = {error: "Smth goes wrong! Please, check your search data"};
  }
  self.results[self.day] = self.results[self.day].concat(body);
}
