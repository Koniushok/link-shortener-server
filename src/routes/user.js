// @flow
import express, { type $Response, type $Request } from 'express';
import { validateUser, UserModel } from '../models/user';

const router = express.Router();

router.post('/', async (req: $Request, res: $Response) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await UserModel.findOne({ loginName: req.body.loginName });
  if (user) return res.status(400).send('Such login already exists');

  user = new UserModel(req.body);

  await user.save();
  res.send('Successfully registered');
});

export default router;
