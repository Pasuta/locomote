const Router = require('koa-router');
const airlinesCtrl = require(`../../controllers/api/airlines`);
const router = new Router({
  prefix: '/api/airlines'
});

router.get('/', airlinesCtrl);

module.exports = router;
