import type { NextApiRequest, NextApiResponse } from 'next';
import crs from 'crypto-random-string'
import denv from 'dotenv';
import mongoose from 'mongoose';
import URLSModel from './db/urls_model'

denv.config()

function getNewAlias():string {
  return crs({ length: 8, type: 'url-safe' })
}

mongoose.connect(`mongodb+srv://tidis:${process.env.DB_PASS}@shortendb.mnjto.mongodb.net/shorten?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'This route only accepts POST methods' })
    return false
  }

  if (!req.body) {
    res.status(403).json({ error: 'You must pass a body!' })
    return false
  }

  if (!req.body?.url) {
    res.status(403).json({ error: 'You must pass a URL in that body!' })
    return false
  }

  // Some validations
  const body = {}
  let alias = getNewAlias()

  try {

  // Check if there is any alias
  const query = URLSModel.find({}).select({ "a_alias": alias })

  query.exec((err, someValue) => {
    if (err) throw new Error(err.message)

    if (someValue?.length > 0) {
      alias = getNewAlias()
    } else {
      return true
    }
  });

  body["a_url"] = req.body.url
  body["a_alias"] = alias

  const URLS = new URLSModel(body);
    URLS.save((err, inst) => {
      if (err) throw new Error(err.message)
      res.status(201).json(inst)
    })
  } catch (error) {
    res.status(500).json(error)
    return false
  }
}