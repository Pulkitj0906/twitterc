import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb';
import { Prisma} from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const { userId,senderId } = req.query;

    if (!userId || typeof userId !== 'string') {
      throw new Error('Invalid ID');
    }
    const whereCondition: Prisma.NotificationWhereInput = {
      userId,
    };

    if (senderId && typeof senderId === 'string') {
      whereCondition.senderId = { equals: senderId };
    }



    const notifications = await prisma.notification.findMany({
      where:whereCondition,
      orderBy: {
        createdAt: 'desc'
      }
    });

    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        hasNotification: false,
      }
    });

    return res.status(200).json(notifications);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}