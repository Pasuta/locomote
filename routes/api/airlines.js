const Router = require('koa-router');
const __dir = require('path').dirname(require.main.filename);
const airlinesCtrl = require(`${__dir}/controllers/api/airlines`);
const router = new Router({
  prefix: '/api/airlines'
});

router.get('/', airlinesCtrl);

module.exports = router;
