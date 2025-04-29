const boom = require('@hapi/boom');

function errorHandler(err, req, res, next) {
  console.error(err);
  
  if (err.isBoom) {
    const { output } = err;
    return res.status(output.statusCode).json({
      statusCode: output.statusCode,
      error: output.payload.error,
      message: output.payload.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }

  // Handle Sequelize validation errors
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    const errors = err.errors.map(error => ({
      field: error.path,
      message: error.message
    }));
    
    return res.status(400).json({
      statusCode: 400,
      error: 'Bad Request',
      message: 'Validation error',
      details: errors,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }

  // Default error response
  return res.status(500).json({
    statusCode: 500,
    error: 'Internal Server Error',
    message: err.message || 'Something went wrong',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
}

function errorLogs(err, req, res, next) {
  console.error(`Error: ${err.message}`);
  console.error(err.stack);
  next(err);
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

module.exports = { errorHandler, errorLogs, boomErrorHandler };
