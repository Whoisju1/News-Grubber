function errorHandler(error, req, res, next) { // eslint-disable-line no-unused-vars
  res.status(error.status || 500).json({
    error: {
      message: error.message || 'Oops! Something went wrong.',
    },
  });
}

module.exports = errorHandler;
