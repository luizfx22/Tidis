import { NextApiRequest, NextApiResponse } from 'next';

// My stuff
import Connection from '../db/index';
import URLSModel from '../db/urls-model';

Connection();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).end();
    return false;
  }

  const { alias } = req.query;

  const result = await URLSModel.findOne({
    a_alias: alias,
  }).select('a_url').exec();

  if (!result) {
    res.status(404).json({ success: false, message: 'Slug not found! Babe' });
    return false;
  }

  res.redirect(302, result.a_url).end();
  return true;
};
