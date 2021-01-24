import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Set-Cookie', 'sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/');
  res.end();
};
