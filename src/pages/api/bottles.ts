import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(405).end();

  const { latitude, longitude, userId } = req.body;

  if (
    typeof latitude !== 'number' ||
    typeof longitude !== 'number' ||
    typeof userId !== 'number'
  ) {
    return res.status(400).json({ error: 'Invalid input types' });
  }

  const bottle = await prisma.bottle.create({
    data: {
      latitude,
      longitude,
      user: { connect: { id: userId } },
    },
  });

  await prisma.user.update({
    where: { id: userId },
    data: { points: { increment: 1 } },
  });

  res.status(201).json(bottle);
}
