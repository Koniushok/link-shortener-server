// @flow
import type { $Response, $Request } from 'express';
import config from 'config';
import { LinkModel } from '../models/link';

const redirect = async (req: $Request, res: $Response) => {
  const link = await LinkModel.findOneAndUpdate(
    { shortLink: req.params.shortLink },
    { $inc: { clicks: 1 } },
    { new: true },
  );
  if (link) {
    res.redirect(link.url);
  } else {
    res.redirect(`${config.get('corsOrigin')}/not-found`);
  }
};

export default redirect;
