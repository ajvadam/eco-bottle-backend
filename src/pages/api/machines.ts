import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const machines = await prisma.machine.findMany();
    return res.status(200).json(machines);
  }

  return res.status(405).end();
}
