import { nanoid } from 'nanoid';
import * as yup from 'yup';

// Express Stuff
import express from 'express';

import expressRateLimit from 'express-rate-limit';
import expressSlowDown from 'express-slow-down';
import helmet from 'helmet';

// My stuff
import URLSModel from './db/urls-model';
import Connection from './db/db';

const app = express();

app.use(helmet());

// Connect
Connection();

function getNewAlias(): string {
  return nanoid(8);
}

const schema = yup.object().shape({
  url: yup.string().trim().url().required(),
  slug: yup.string().trim().lowercase(),
});

app.use(expressSlowDown({
  windowMs: 30 * 1000,
  delayAfter: 1,
  delayMs: 500,
}));

app.use(expressRateLimit({
  windowMs: 30 * 1000,
  max: 1,
}));

app.post('/api/shorten', async (req, res) => {
  const { url, slug } = req.body;

  // Validate the URL
  const valid = await schema.validate({ url });
  if (!valid) {
    res.status(400).json({ error: 'There is no URL to shorten!' });
    return false;
  }

  // Ban some wacky words from here
  const found = ['tidis.net', 'projectsa.net'].map((a) => url.includes(a));
  if (found.length > 0 && found.includes(true)) {
    res.status(403).json({ error: 'Cannot shorten this URL!' });
    return false;
  }

  // Find an existing slug
  const result = await URLSModel.findOne({
    a_alias: slug,
  }).select('a_alias').exec();

  if (result && result?.a_alias) {
    res.status(409).json({
      error: 'Slug already in use!',
    });
    return false;
  }

  // Start register the URL
  const body = {
    a_url: '',
    a_alias: '',
  };

  try {
    body.a_url = url;
    body.a_alias = slug || getNewAlias();

    const URLS = new URLSModel(body);

    URLS.save((err, inst) => {
      if (err) throw new Error(err.message);
      const ret = { ...inst._doc };

      delete ret._id;
      delete ret.__v;
      delete ret.a_createdAt;

      ret.success = true;

      res.status(201).json(ret);
      return true;
    });

    return true;

    //
  } catch (error) {
    res.status(500).json(error);
    return false;
  }
});

export default app;
