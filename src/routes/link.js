// @flow
import express, { type $Response, type $Request } from 'express';
import shortid from 'shortid';
import { LinkModel, validateLink } from '../models/link';
import auth from '../middleware/auth';
import logger from '../logger';

const router = express.Router();

type Request = $Request & { userId: string };
router.get('/', async (req: $Request, res: $Response) => {
  const page = Number(req.query.page);
  const items = Number(req.query.items);
  if (!page || !items) {
    logger.error('Bad queryString(not page or items)', { query: req.query });
    return res.status(400).send('Bad queryString');
  }

  const links = await LinkModel.find(req.query.tag && { tags: req.query.tag })
    .sort(String(req.query.sort))
    .skip((page - 1) * items)
    .limit(items);

  const linkCount = await LinkModel.count(req.query.tag && { tags: req.query.tag });
  logger.info(`Get links(page:${page}, items:${items}, query: ${String(req.query.tag)}, sort: ${String(req.query.sort)})`, {
    query: req.query,
  });
  res.send({ links, linkCount });
});

router.get('/my', auth, async (req: Request, res: $Response) => {
  const page = Number(req.query.page);
  const items = Number(req.query.items);
  if (!page || !items) {
    logger.error('Bad queryString(not page or items)', { query: req.query });
    return res.status(400).send('Bad queryString');
  }

  const links = await LinkModel.find(
    req.query.tag ? { tags: req.query.tag, user: req.userId } : { user: req.userId },
  )
    .sort(String(req.query.sort))
    .skip((page - 1) * items)
    .limit(items);

  const linkCount = await LinkModel.count(
    req.query.tag ? { tags: req.query.tag, user: req.userId } : { user: req.userId },
  );
  logger.info(`Get my links(page:${page}, items:${items}, tag: ${String(req.query.tag)}, sort: ${String(req.query.sort)})`, {
    query: req.query,
  });
  res.send({ links, linkCount });
});

router.get('/:id', async (req: $Request, res: $Response) => {
  const link = await LinkModel.findById(req.params.id);
  if (!link) {
    logger.error(`Link not found (id: ${req.params.id}`);
    return res.status(404).send('Link not found');
  }
  logger.info(`Get link (id: ${req.params.id}`);
  res.send(link);
});

router.post('/', auth, async (req: Request, res: $Response) => {
  const { error } = validateLink(req.body);
  if (error) {
    logger.error('Failed validateLink', { body: req.body });
    return res.status(400).send(error.details[0].message);
  }
  req.body.user = req.userId;
  req.body.tag = req.body.tags.length;
  req.body.shortLink = shortid.generate();
  const checkLink = await LinkModel.findOne({ shortLink: req.body.shortLink });
  if (checkLink) {
    logger.error('Error shortening the link');
    return res.status(500).send('Error shortening the link');
  }
  const link = new LinkModel(req.body);
  await link.save();
  logger.info('Created new lick', { link: link.toObject() });
  res.send(link);
});

router.put('/:id', auth, async (req: Request, res: $Response) => {
  let link = await LinkModel.findById(req.params.id);
  if (!link) {
    logger.error(`Edit link. Link not found(id: ${req.params.id})`);
    return res.status(404).send('Link not found');
  }
  if (link.user.toString() !== req.userId) {
    logger.error(`Edit link. Not enough rights(linkId: ${req.params.id},userId: ${req.userId})`);
    return res.status(403).send('Not enough rights');
  }
  const { error } = validateLink(req.body);
  if (error) {
    logger.error('Failed validateLink', { body: req.body });
    return res.status(400).send(error.details[0].message);
  }
  req.body.tag = req.body.tags.length;
  link = await LinkModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
  logger.info('Link update', { link: link.toObject() });
  res.send(link);
});

router.delete('/:id', auth, async (req: Request, res: $Response) => {
  let link = await LinkModel.findById(req.params.id);
  if (!link) {
    logger.error(`Link delete. Link not found(id: ${req.params.id})`);
    return res.status(404).send('Link not found');
  }
  if (link.user.toString() !== req.userId) {
    logger.error(`Link delete. Not enough rights(linkId: ${req.params.id},userId: ${req.userId})`);
    return res.status(403).send('Not enough rights');
  }
  link = await LinkModel.findByIdAndDelete(req.params.id);
  logger.info('Link delete', { link: link.toObject() });
  res.send(link);
});

export default router;
