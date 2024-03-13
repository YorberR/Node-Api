

function errorLogs (err, req, res, next) {
  console.log('errorLogs')
  console.error(err)
  next(err)
}

function errorHandler (err, req, res, next) {
  console.log('hamdlerError')
  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
}

module.exports = {
  errorLogs,
  errorHandler
}
