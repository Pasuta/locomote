const views = require('co-views');
const __dir = require('path').dirname(require.main.filename);

const render = views(`${__dir}/views`, {
  map: { html: 'swig' }
});

module.exports = function *() {
  this.body = yield render('index', {});
};
