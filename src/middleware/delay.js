// @flow
import config from 'config';
import type {
  Middleware, NextFunction, $Response, $Request,
} from 'express';

const delay: Middleware = (req: $Request, res: $Response, next: NextFunction) => {
  const time = process.env.DELAY || config.get('delay');
  if (time) {
    setTimeout(next, Number(time));
  } else {
    next();
  }
};

export default delay;
