// @flow
import jwt from 'jsonwebtoken';
import config from 'config';
import type {
  Middleware, NextFunction, $Response, $Request,
} from 'express';

const auth: Middleware = (
  req: $Request & { userId: string },
  res: $Response,
  next: NextFunction,
) => {
  const token = req.header('token');
  if (!token) {
    return res.status(401).send('No token');
  }
  try {
    const { _id } = jwt.verify(token, config.get('jwtKey'));
    req.userId = _id;
    next();
  } catch (ex) {
    res.status(401).send('Invalid token.');
  }
};

export default auth;
