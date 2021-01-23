import { NextApiRequest, NextApiResponse } from 'next';
import { Collections } from '../../../lib/firebase';
import fireadmin from '../../../lib/firebase/admin';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).end();
    return false;
  }

  const { alias } = req.query;

  const result = await fireadmin.firestore().collection(Collections.SLUGS).where('a_slug', '==', alias).get();

  if (result.empty) {
    return res.status(404).json({ success: false, message: 'Slug not found! Bae' });
  }

  const resultData = result.docs[0];

  fireadmin
    .firestore()
    .collection(Collections.SLUGS)
    .doc(resultData.id)
    .update({
      a_hits: resultData.data().a_hits + 1,
    });

  res.redirect(302, resultData.data().a_url).end();

  return true;
};
