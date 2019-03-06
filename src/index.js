// @flow
import mongoose from 'mongoose';
import config from 'config';
import express from 'express';
import cors from 'cors';
import logger from './logger';
import redirect from './v1/routes/redirect';
import routeV1 from './v1/routes';

const app = express();

mongoose
  .connect(config.get('database'), {
    useCreateIndex: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(() => logger.error('Could not connect to MongoDB'));

app.use(cors());
app.use('/api/v1', routeV1);
app.use('/api', routeV1);
app.use('/:shortLink', redirect);

const port = process.env.PORT || config.get('port');
app.listen(port, () => console.log(`Listening (port: ${port})`));
