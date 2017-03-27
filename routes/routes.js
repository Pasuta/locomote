const Router = require('koa-router');
const indexCtrl = require(`../controllers/index.js`);
const search = require(`../routes/api/search`);
const airlines = require(`../routes/api/airlines`);
const airports = require(`../routes/api/airports`);
const router = new Router();

router.get('/', indexCtrl);

router.use(search.routes(), airlines.routes(), airports.routes());

module.exports = router;
