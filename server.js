const http = require('http')
const express = require('express')
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

const app = express()

app.use(require('morgan')('short'));

/* eslint-disable */
(function initWebpack() {
  const webpack = require('webpack')
  const webpackConfig = require('./webpack/common.config.babel')
  const compiler = webpack(webpackConfig)
  const userRouter = require('./server/routes/user');
  const productRouter = require('./server/routes/product');
  const companyRouter = require('./server/routes/company');
  const quoteRouter = require('./server/routes/quote');
  const customerRouter = require('./server/routes/customer');
  const quoteProductRouter = require('./server/routes/quoteProduct');
  const emailRouter = require('./server/routes/email');
  const schedulerRouter = require('./server/routes/scheduler');
  const customerContactRouter = require('./server/routes/customerContact');
  const activityTaskHistRouter = require('./server/routes/activityTaskHist');
  const taskEmailRouter = require('./server/routes/taskEmail');
  const emailLogRouter = require('./server/routes/emailLog');
  const currencyTypeRouter = require('./server/routes/currencyType');
  const reminderRouter = require('./server/routes/reminder');
  const termConditionRouter = require('./server/routes/termCondition');
  const marketingRouter = require('./server/routes/marketing');
  const authRouter = require('./server/routes/auth');

  app.use(bodyParser.json());
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

  app.use(helmet());

  app.use(cors());

  // app.use(logger('dev'));
  app.use(express.json());

  app.use(express.urlencoded({ extended: false }));

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true
  }))

  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
  }))

  app.use(express.static(__dirname + '/'))

  app.use('/api/user', userRouter);
  app.use('/api/product', productRouter);
  app.use('/api/company', companyRouter);
  app.use('/api/quote', quoteRouter);
  app.use('/api/customer', customerRouter);
  app.use('/api/quoteProduct', quoteProductRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/email', emailRouter);
  app.use('/api/scheduler', schedulerRouter);
  app.use('/api/customerContact', customerContactRouter);
  app.use('/api/activityTaskHist', activityTaskHistRouter);
  app.use('/api/taskEmail', taskEmailRouter);
  app.use('/api/currencyType', currencyTypeRouter);
  app.use('/api/emailLog', emailLogRouter);
  app.use('/api/reminder', reminderRouter);
  app.use('/api/termCondition', termConditionRouter);
  app.use('/api/marketing', marketingRouter);
})()

app.get('/*', function root(req, res) {
  res.sendFile(__dirname + '/src/index.html')
})

const server = http.createServer(app)
server.listen(process.env.PORT || 3000, function onListen() {
  const address = server.address()
  console.log('Listening on: %j', address)
  console.log(' -> that probably means: http://localhost:%d', address.port)
})

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }

  res.status(500)
  res.render('error', { error: err })
}

app.use(errorHandler)

/* eslint-disable */