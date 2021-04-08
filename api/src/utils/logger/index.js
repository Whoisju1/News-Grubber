import { format, transports, createLogger } from 'winston';

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.colorize(),
    format.errors({ stack: true }),
    format.printf(
      ({ timestamp, message, level }) => `${timestamp} [${level}]: ${message}`
    )
  ),
  transports: [new transports.Console({ level: 'info' })],
});

export const errorLogger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true })
  ),
  transports: [
    new transports.File({
      filename: 'errors.log',
      level: 'error',
      format: format.combine(format.prettyPrint()),
    }),
    new transports.Console({ level: 'info' }),
  ],
});

export default logger;
