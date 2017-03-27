const views = require('co-views');

const render = views('./views', {
  map: { html: 'swig' }
});

module.exports = function *() {
  this.body = yield render('index', {});
};
