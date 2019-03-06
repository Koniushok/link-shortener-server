// @flow
import express, { type $Response, type $Request } from 'express';
import { UserModel, validateAuth } from '../models/user';
import logger from '../../logger';

const router = express.Router();

router.post('/', async (req: $Request, res: $Response) => {
  const { error } = validateAuth(req.body);
  if (error) {
    logger.error('Failed validateAuth', { body: req.body });
    return res.status(400).send(error.details[0].message);
  }
  const user = await UserModel.findOne({ loginName: req.body.loginName });
  if (!user) {
    logger.error(`User authorization(loginName: ${req.body.loginName}). Invalid login`, {
      body: req.body,
    });
    return res.status(400).send('Invalid login or password.');
  }

  if (req.body.password !== user.password) {
    logger.error(`User authorization(loginName: ${req.body.loginName}). Invalid password`, {
      body: req.body,
    });
    return res.status(400).send('Invalid login or password.');
  }
  logger.info(`User(loginName: ${req.body.loginName}) has logged in`);
  const token = user.getToken();
  res.send(token);
});

export default router;
