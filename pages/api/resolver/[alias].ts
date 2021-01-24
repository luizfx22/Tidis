import { NextApiRequest, NextApiResponse } from 'next';

// My stuff
import Connection from '../db/db';
import URLSModel from '../db/urls-model';

Connection();

const CACHE_CONTROL_HEADER_VALUE = 'max-age=0, s-maxage=86400, stale-while-revalidate, public';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).end();
    return false;
  }

  const { alias } = req.query;

  const result = await URLSModel.findOne({
    a_alias: alias,
  }).select('a_url').exec();

  if (!result || !result?.a_url) {
    res.status(404).json({ success: false, message: 'Slug not found! Babe' });
    return false;
  }

  res.setHeader('Cache-Control', CACHE_CONTROL_HEADER_VALUE);

  res.redirect(302, result.a_url).end();
  return true;
};
