import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { comparePassword } from '@/lib/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, password } = req.body;

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const match = await comparePassword(password, user.password);
  if (!match) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  res.status(200).json({ id: user.id, username: user.username });
}
