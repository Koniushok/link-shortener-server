// @flow
import { type $Response, type $Request, type NextFunction } from 'express';
import logger from '../logger';

function error(err: Error, req: $Request, res: $Response, next: NextFunction) {
  if (error) {
    logger.error(err.message, err);
    res.status(500).send('Server error.');
    throw Promise.reject(error);
  }

  return next();
}
export default error;
