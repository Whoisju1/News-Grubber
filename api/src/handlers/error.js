import logger, { errorLogger } from '../utils/logger';

/* eslint-disable no-unused-vars */
function errorHandler(err, _req, res, _next) {
  const { status = null, message } = err;
  if (status) {
    return res.status(err.status).json({
      error: { message },
    });
  }
  // log unhanlded errors to files
  errorLogger.error(err);
  logger.error(err);
  return res.status(500).json({ error: { message: 'Something went wrong.' } });
}

export default errorHandler;
