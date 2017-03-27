const Router = require('koa-router');
const __dir = require('path').dirname(require.main.filename);
const indexCtrl = require(`${__dir}/controllers/index.js`);
const search = require(`${__dir}/routes/api/search`);
const airlines = require(`${__dir}/routes/api/airlines`);
const airports = require(`${__dir}/routes/api/airports`);
const router = new Router();

router.get('/', indexCtrl);

router.use(search.routes(), airlines.routes(), airports.routes());

module.exports = router;
