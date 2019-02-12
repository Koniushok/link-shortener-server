// @flow
import config from 'config';
import type {
  Middleware, NextFunction, $Response, $Request,
} from 'express';

const delay: Middleware = (req: $Request, res: $Response, next: NextFunction) => {
  const time = Number(process.env.DELAY) || config.get<Number>('delay');
  if (time) {
    setTimeout(next, time);
  } else {
    next();
  }
};

export default delay;
