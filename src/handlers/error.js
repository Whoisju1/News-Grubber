/* eslint-disable no-unused-vars */
function errorHandler(error, _req, res, next) {
  const { NODE_ENV } = process.env;
  if (error.status) {
    return res.status(error.status).json({
      error: {
        message: error.message || 'Oops! Something went wrong.',
      },
    });
  }

  const isProd = NODE_ENV === 'production';

  return res.status(500).json({
    error: {
      message: isProd ? 'Oops! Something went wrong.' : error.message,
    },
  });
}

module.exports = errorHandler;
