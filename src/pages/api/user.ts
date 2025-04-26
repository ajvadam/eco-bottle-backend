import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') return res.status(405).end();

  const { id } = req.query;

  const userId = parseInt(id as string);
  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, username: true, points: true },
  });

  if (!user) return res.status(404).json({ error: 'User not found' });

  res.status(200).json(user);
}
