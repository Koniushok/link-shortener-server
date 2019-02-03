// @flow
import express from 'express';
import { userModel, validateUser } from '../models/user';

const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = await userModel.findOne({ loginName: req.body.loginName });
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
