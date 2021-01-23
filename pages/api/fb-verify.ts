import { NextApiRequest, NextApiResponse } from 'next';
import fireadmin from '../../lib/firebase/admin';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { sid } = req.body;

  const { uid } = await fireadmin.auth().verifySessionCookie(sid);
  const record = await fireadmin.auth().getUser(uid);

  res.json({
    user: record.displayName,
    email: record.email,
    picture: record.photoURL,
  });
};
