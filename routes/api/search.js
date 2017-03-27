const Router = require('koa-router');
const __dir = require('path').dirname(require.main.filename);
const searchCtrl = require(`${__dir}/controllers/api/search`);
const router = new Router({
  prefix: '/api/search'
});

router.get('/', searchCtrl);

module.exports = router;
