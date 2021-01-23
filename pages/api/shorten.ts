import { nanoid } from 'nanoid';
import * as yup from 'yup';

// Express Stuff
import express from 'express';

import expressRateLimit from 'express-rate-limit';
import expressSlowDown from 'express-slow-down';
import helmet from 'helmet';
import { auth } from 'firebase-admin';
import fireadmin from '../../lib/firebase/admin';
import { Collections } from '../../lib/firebase';

const app = express();

app.use(helmet());

function getNewAlias(): string {
  return nanoid(8);
}

async function checkUserValid(sid: string): Promise<string> {
  try {
    return (await fireadmin.auth().verifySessionCookie(sid, true)).uid;
  } catch (e) {
    return null;
  }
}

const schema = yup.object().shape({
  url: yup.string().trim().url().required(),
  slug: yup.string().trim(),
});

app.use(expressSlowDown({
  windowMs: 50 * 1000,
  delayAfter: 5,
  delayMs: 750,
}));

app.use(expressRateLimit({
  windowMs: 50 * 1000,
  max: 5,
}));

app.post('/api/shorten', async (req, res) => {
  const { url } = req.body;
  let { slug } = req.body;
  const { sid } = req.cookies;

  slug = slug || getNewAlias();

  const uid = await checkUserValid(sid);

  if (!sid || !uid) {
    slug = getNewAlias();
  }

  // Validate the URL
  const valid = await schema.validate({ url, slug });
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
  const snap = await fireadmin
    .firestore()
    .collection(Collections.SLUGS)
    .where('a_slug', '==', slug)
    .get();

  if (!snap.empty) {
    res
      .status(403)
      .json({ error: 'Cannot shorten this URL! Slug is already in use!' });
    return false;
  }

  await fireadmin.firestore().collection(Collections.SLUGS).add({
    a_url: valid.url,
    a_slug: valid.slug,
    a_hits: 0,
    a_uid: uid,
  });

  res.status(201).json({
    a_url: valid.url,
    a_slug: valid.slug,
    a_hits: 0,
  });

  return true;
});

export default app;
