// @flow
import express from 'express';
import delay from '../middleware/delay';
import auth from './auth';
import user from './user';
import link from './link';
import swagger from '../swagger';
import error from '../middleware/error';

const router = express.Router();

router.use(delay);
router.use(express.json());
router.use('/docs', swagger);
router.use('/auth', auth);
router.use('/user', user);
router.use('/link', link);
router.use(error);

export default router;
