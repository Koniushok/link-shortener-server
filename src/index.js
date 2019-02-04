// @flow
import mongoose from 'mongoose';
import config from 'config';
import express from 'express';
import cors from 'cors';
import auth from './routes/auth';
import user from './routes/user';
import link from './routes/link';

const app = express();

mongoose
  .connect(config.get('database'))
  .then(() => console.log('Connected to MongoDB'))
  .catch(() => console.error('Could not connect to MongoDB'));

app.use(cors());
app.use(express.json());
app.use('/auth', auth);
app.use('/user', user);
app.use('/link', link);

const port = process.env.PORT || config.get('port');
app.listen(port, () => console.log(`Listening (port: ${port})`));
