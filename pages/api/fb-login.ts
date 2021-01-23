import { NextApiRequest, NextApiResponse } from 'next';
import fireadmin from '../../lib/firebase/admin';

export default async (req:NextApiRequest, res: NextApiResponse) => {
  const { idToken } = req.body;

  const cookie = await fireadmin.auth().createSessionCookie(idToken, {
    expiresIn: 1000 * 60 * 60 * 24,
  });

  const { uid } = await fireadmin.auth().verifyIdToken(idToken, true);
  const record = await fireadmin.auth().getUser(uid);

  res.setHeader('Set-Cookie', `sid=${cookie}; HttpOnly; Max-Age=${1000 * 60 * 60 * 24}; Path=/`);
  res.json({
    user: record.displayName,
    email: record.email,
    picture: record.photoURL,
  });
};
