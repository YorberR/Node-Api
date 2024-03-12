const productRouter = require('../routes/products')
const userRouter = require('../routes/users')
const express = require('express');

function apiRouter (app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productRouter)
  router.use('/users', userRouter)
}

module.exports = apiRouter;
