const productRouter = require('../routes/products')
const userRouter = require('../routes/users')
const express = require('express');
const clientRouter = require('../routes/client')
const categoryRouter = require('../routes/category')

function apiRouter (app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productRouter)
  router.use('/users', userRouter)
  router.use('/clients', clientRouter)
  router.use('/categories', categoryRouter)
}

module.exports = apiRouter;
