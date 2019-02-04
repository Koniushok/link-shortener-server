// @flow
import express, { type $Response, type $Request } from 'express';
import { LinkModel, validateLink } from '../models/link';
import auth from './auth';

const router = express.Router();

router.get('/', auth, async (req: $Request & { userId: string }, res: $Response) => {
  const links = await LinkModel.find({ user: { $ne: req.userId } });
  res.send(links);
});

router.get('/my', auth, async (req: $Request & { userId: string }, res: $Response) => {
  const links = await LinkModel.find({ user: req.userId });
  res.send(links);
});

router.get('/:id', auth, async (req: $Request & { userId: string }, res: $Response) => {
  const link = await LinkModel.findById(req.params.id);
  res.send(link);
});

router.put('/:id', auth, async (req: $Request & { userId: string }, res: $Response) => {
  const { error } = validateLink(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  await LinkModel.update({ _id: req.params.id }, req.body);
  const link = await LinkModel.findById(req.params.id);
  if (!link) {
    res.status(404).send('link not found');
  }
  res.send(link);
});

export default router;
