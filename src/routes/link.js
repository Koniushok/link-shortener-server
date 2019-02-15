// @flow
import express, { type $Response, type $Request } from 'express';
import shortid from 'shortid';
import { LinkModel, validateLink } from '../models/link';
import auth from '../middleware/auth';

const router = express.Router();

type Request = $Request & { userId: string };
router.get('/', async (req: $Request, res: $Response) => {
  let links;
  let linkCount;
  const page = Number(req.query.page);
  const items = Number(req.query.items);
  if (!page || !items) {
    return res.status(400).send('Bad queryString');
  }
  if (req.query.tag) {
    links = await LinkModel.find({ tags: req.query.tag })
      .skip((page - 1) * items)
      .limit(items);
    linkCount = await LinkModel.count({ tags: req.query.tag });
  } else {
    links = await LinkModel.find()
      .skip((page - 1) * items)
      .limit(items);
    linkCount = await LinkModel.count();
  }

  res.send({ links, linkCount });
});

router.get('/my', auth, async (req: Request, res: $Response) => {
  let links;
  let linkCount;
  const page = Number(req.query.page);
  const items = Number(req.query.items);
  if (!page || !items) {
    return res.status(400).send('Bad queryString');
  }
  if (req.query.tag) {
    links = await LinkModel.find({ user: req.userId, tags: req.query.tag })
      .skip((page - 1) * items)
      .limit(items);
    linkCount = await LinkModel.count({ user: req.userId, tags: req.query.tag });
  } else {
    links = await LinkModel.find({ user: req.userId })
      .skip((page - 1) * items)
      .limit(items);
    linkCount = await LinkModel.count({ user: req.userId });
  }

  res.send({ links, linkCount });
});

router.get('/:id', async (req: $Request, res: $Response) => {
  const link = await LinkModel.findById(req.params.id);
  if (!link) {
    return res.status(404).send('Link not found');
  }
  res.send(link);
});

router.post('/', auth, async (req: Request, res: $Response) => {
  const { error } = validateLink(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  req.body.user = req.userId;
  req.body.shortLink = shortid.generate();
  const checkLink = await LinkModel.findOne({ shortLink: req.body.shortLink });
  if (checkLink) {
    return res.status(500).send('Error shortening the link');
  }
  const link = new LinkModel(req.body);
  await link.save();
  res.send(link);
});

router.put('/:id', auth, async (req: Request, res: $Response) => {
  let link = await LinkModel.findById(req.params.id);
  if (!link) {
    return res.status(404).send('Link not found');
  }
  if (link.user.toString() !== req.userId) {
    return res.status(403).send('Not enough rights');
  }
  const { error } = validateLink(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  link = await LinkModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
  res.send(link);
});

router.delete('/:id', auth, async (req: Request, res: $Response) => {
  let link = await LinkModel.findById(req.params.id);
  if (!link) {
    return res.status(404).send('Link not found');
  }
  if (link.user.toString() !== req.userId) {
    return res.status(403).send('Not enough rights');
  }
  link = await LinkModel.findByIdAndDelete(req.params.id);
  res.send(link);
});

export default router;
