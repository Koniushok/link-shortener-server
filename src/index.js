// @flow
import mongoose from 'mongoose';
import config from 'config';
import express from 'express';
import cors from 'cors';
import delay from './middleware/delay';
import auth from './routes/auth';
import user from './routes/user';
import link from './routes/link';

const app = express();

mongoose
  .connect(config.get('database'))
  .then(() => console.log('Connected to MongoDB'))
  .catch(() => console.error('Could not connect to MongoDB'));

app.use(delay);
app.use(
  cors({
    origin: config.get('corsOrigin'),
  }),
);
app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/user', user);
app.use('/api/link', link);

const port = process.env.PORT || config.get('port');
app.listen(port, () => console.log(`Listening (port: ${port})`));
