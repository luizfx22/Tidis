import { NextApiRequest, NextApiResponse } from 'next';
import fireadmin from '../../lib/firebase/admin';
import fireclient from '../../lib/firebase/client';

export default async (req:NextApiRequest, res: NextApiResponse) => {
  const { login, password } = req.body;

  const { user } = await fireclient.auth().createUserWithEmailAndPassword(login, password);
  fireclient.auth().signOut();

  const idToken = await user.getIdToken();
  const session = await fireadmin
    .auth()
    .createSessionCookie(idToken, { expiresIn: 1000 * 60 * 60 * 24 });

  res.setHeader(
    'Set-Cookie',
    `sid=${session}; HttpOnly; Max-Age=${1000 * 60 * 60 * 24}; Path=/`,
  );
  res.json({
    user: user.displayName,
    email: user.email,
    picture: user.photoURL,
  });
};
