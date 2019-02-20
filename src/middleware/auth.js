// @flow
import jwt from 'jsonwebtoken';
import config from 'config';
import type {
  Middleware, NextFunction, $Response, $Request,
} from 'express';
import logger from '../logger';

const auth: Middleware = (
  req: $Request & { userId: string },
  res: $Response,
  next: NextFunction,
) => {
  const token = req.header('token');
  if (!token) {
    logger.error('[auth Middleware] No token.');
    return res.status(401).send('No token');
  }
  try {
    const { _id }: { _id: string } = jwt.verify(token, config.get('jwtKey'));
    req.userId = _id;
    next();
  } catch {
    logger.error(`[auth Middleware] Invalid token( token: ${token} )`);
    res.status(401).send('Invalid token.');
  }
};

export default auth;
