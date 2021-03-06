// @flow
import express, { type $Response, type $Request } from 'express';
import mongoose from 'mongoose';
import auth from '../middleware/auth';
import { validateUser, UserModel } from '../models/user';
import { LinkModel } from '../models/link';
import logger from '../../logger';

const router = express.Router();

router.post('/', async (req: $Request, res: $Response) => {
  const { error } = validateUser(req.body);
  if (error) {
    logger.error('Failed validateUser', { body: req.body });
    return res.status(400).send(error.details[0].message);
  }

  let user = await UserModel.findOne({ loginName: req.body.loginName });
  if (user) {
    logger.error(`Such login already exists (loginName: ${req.body.loginName})`);
    return res.status(400).send('Such login already exists');
  }

  user = new UserModel(req.body);
  await user.save();
  const token = user.getToken();
  logger.info('Create new user', { user: user.toObject() });
  res.send(token);
});

router.get('/me', auth, async (req: $Request & { userId: string }, res: $Response) => {
  const user = await UserModel.findById(req.userId);
  if (!user) {
    logger.error(`User not-found (id: ${req.userId})`);
    return res.status(401).send('User has been deleted');
  }
  const doc = await LinkModel.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(req.userId),
      },
    },
    {
      $group: {
        _id: null,
        totalClinks: { $sum: '$clicks' },
        linkCount: { $sum: 1 },
      },
    },
    { $project: { _id: 0 } },
  ]);
  if (!doc.length) {
    doc[0] = { totalClinks: 0, linkCount: 0 };
  }
  logger.info(`Get user (id: ${req.userId})`, { user: user.toObject(), ...doc[0] });
  res.send({ ...user.toObject(), ...doc[0] });
});

export default router;
