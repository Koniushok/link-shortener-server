// @flow
import express, { type $Response, type $Request } from 'express';
import mongoose from 'mongoose';
import auth from '../middleware/auth';
import { validateUser, UserModel } from '../models/user';
import { LinkModel } from '../models/link';

const router = express.Router();

router.post('/', async (req: $Request, res: $Response) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await UserModel.findOne({ loginName: req.body.loginName });
  if (user) {
    return res.status(400).send('Such login already exists');
  }

  user = new UserModel(req.body);
  await user.save();
  user.totalClinks = 0;
  user.linkCount = 0;
  res.send(user);
});

router.get('/me', auth, async (req: $Request & { userId: string }, res: $Response) => {
  const user = await UserModel.findById(req.userId);
  if (!user) {
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
    doc[0] = { totalClinks: 10, linkCount: 10 };
  }
  res.send({ ...user.toObject(), ...doc[0] });
});

export default router;
