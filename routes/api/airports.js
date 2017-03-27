const Router = require('koa-router');
const airportsCtrl = require(`../../controllers/api/airports`);
const router = new Router({
  prefix: '/api/airports'
});

router.get('/', airportsCtrl);

module.exports = router;
