import { isNullOrUndefined } from 'util';
/* eslint-disable no-unused-vars */
function errorHandler(err, _req, res, next) {
  if (!isNullOrUndefined(err.status)) {
    const { message } = err;
    return res.status(err.status).json({
      error: { message },
    });
  }

  console.log(err);
  return res.status(500).json({ error: { message: 'Something went wrong.' } });
}

module.exports = errorHandler;
