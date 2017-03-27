const Router = require('koa-router');
const searchCtrl = require(`../../controllers/api/search`);
const router = new Router({
  prefix: '/api/search'
});

router.get('/', searchCtrl);

module.exports = router;
