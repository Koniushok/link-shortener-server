// @flow
import { type $Response, type $Request } from 'express';
import logger from '../logger';

function error(err: Error, req: $Request, res: $Response) {
  logger.error(err.message, err);
  res.status(500).send('Server error.');
}
export default error;
