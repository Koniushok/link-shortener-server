// @flow
import express, { type $Response, type $Request } from 'express';
import { UserModel, validateUser } from '../models/user';

const router = express.Router();

router.post('/', async (req: $Request, res: $Response) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = await UserModel.findOne({ loginName: req.body.loginName });
  if (!user) {
    return res.status(400).send('Invalid login or password.');
  }

  if (req.body.password !== user.password) {
    return res.status(400).send('Invalid login or password.');
  }

  const token = user.getToken();
  res.send(token);
});

export default router;
