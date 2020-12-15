import type { NextApiRequest, NextApiResponse } from 'next';
import { nanoid } from 'nanoid';
import denv from 'dotenv';
import * as yup from 'yup';

// Express Stuff
import expressRateLimit from 'express-rate-limit';
import expressSlowDown from 'express-slow-down';
import Cors from 'cors';

// My stuff
import URLSModel from './db/urls-model';
import Middleware from './middlewares/middleware';
import Connection from './db/index';

// Connect
Connection();

denv.config();

function getNewAlias(): string {
  return nanoid(8);
}

const schema = yup.object().shape({
  url: yup.string().trim().url().required(),
});

export default async (req: NextApiRequest, res: NextApiResponse): Promise<boolean> => {
  if (req.method !== 'POST') {
    res.status(404).json({ error: 'Cannot GET on this route!' });
    res.end();
    return false;
  }

  // Execute some middlewares
  await Middleware(req, res, expressSlowDown({
    windowMs: 30 * 1000,
    delayAfter: 1,
    delayMs: 500,
  }));

  await Middleware(req, res, expressRateLimit({
    windowMs: 30 * 1000,
    max: 1,
  }));

  const { url } = req.body;

  // Validate the URL
  await schema.validate({ url });

  // Ban some wacky words from here
  const found = ['tidis.net', 'projectsa.net'].map((a) => url.includes(a));
  if (found.length > 0 && found.includes(true)) {
    res.status(403).json({ error: 'Cannot shorten this URL!' });
    res.end();
    return false;
  }

  // Start register the URL
  const body = {
    a_url: '',
    a_alias: '',
  };

  let alias = getNewAlias();

  try {
    // Check if there is any alias
    const query = URLSModel.find({}).select({ a_alias: alias });

    query.exec((err, someValue) => {
      if (err) throw new Error(err.message);

      if (someValue?.length > 0) {
        alias = getNewAlias();
        return true;
      }

      return false;
    });

    body.a_url = req.body.url;
    body.a_alias = alias;

    const URLS = new URLSModel(body);

    URLS.save((err, inst) => {
      if (err) throw new Error(err.message);
      const ret = { ...inst._doc };

      delete ret._id;
      delete ret.__v;
      delete ret.a_createdAt;

      ret.success = true;

      res.status(201).json(ret);
      res.end();
      return true;
    });

    return true;

    //
  } catch (error) {
    res.status(500).json(error);
    res.end();
    return false;
  }
};
