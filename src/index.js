import mongoose from 'mongoose';
import config from 'config';

mongoose
  .connect(config.get('database'))
  .then(() => console.log('Connected to MongoDB'))
  .catch(() => console.error('Could not connect to MongoDB'));
