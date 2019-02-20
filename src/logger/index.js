// @flow
import { createLogger, format, transports } from 'winston';
import 'express-async-errors';

const fileLogger = './src/logger/';
const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.json(),
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(info => `(${info.level})[${info.timestamp}] ${info.message}`),
      ),
    }),
    new transports.File({
      filename: `${fileLogger}combined.log`,
    }),
    new transports.File({
      filename: `${fileLogger}error.log`,
      level: 'error',
    }),
  ],
  exceptionHandlers: [
    new transports.Console(),
    new transports.File({
      filename: `${fileLogger}exception.log`,
    }),
    new transports.File({ filename: `${fileLogger}combined.log` }),
  ],
});

process.on('unhandledRejection', (ex) => {
  throw ex;
});
export default logger;
