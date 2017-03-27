const koa = require('koa');
const app = module.exports = new koa();
const serve = require('koa-static');
const path = require('path');

const notFound = require('./middlewares/notFound');
const routes = require('./routes/routes');

app.use(routes.routes());
app.use(serve(path.join(__dirname, 'public')));
app.use(notFound);

app.listen(3000);
