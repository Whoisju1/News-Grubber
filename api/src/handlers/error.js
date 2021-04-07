/* eslint-disable no-unused-vars */
function errorHandler(err, _req, res, _next) {
  const { status = null, message } = err;
  if (status) {
    return res.status(err.status).json({
      error: { message },
    });
  }

  return res.status(500).json({ error: { message: 'Something went wrong.' } });
}

module.exports = errorHandler;
