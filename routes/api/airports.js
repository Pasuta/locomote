const Router = require('koa-router');
const __dir = require('path').dirname(require.main.filename);
const airportsCtrl = require(`${__dir}/controllers/api/airports`);
const router = new Router({
  prefix: '/api/airports'
});

router.get('/', airportsCtrl);

module.exports = router;
