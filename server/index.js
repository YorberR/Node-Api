const productRouter = require('../routes/products')
const userRouter = require('../routes/users')

function apiRouter (app) {
  app.use('/products', productRouter)
  app.use('/users', userRouter)
}

module.exports = apiRouter;
