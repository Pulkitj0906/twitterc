import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb';
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return res.status(405).end();
  }

  try {
    const { postId } = req.body;

    const { currentUser } = await serverAuth(req, res);

    if (!postId || typeof postId !== 'string') {
      throw new Error('Invalid ID');
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId
      }
    });

    if (!post) {
      throw new Error('Invalid ID');
    }

    let updatedbookmarkIds = [...(post.bookmarkIds || [])];

    if (req.method === 'POST') {
      updatedbookmarkIds.push(currentUser.id);
    }

    if (req.method === 'DELETE') {
      updatedbookmarkIds = updatedbookmarkIds.filter((boookmarkId) => boookmarkId !== currentUser?.id);
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId
      },
      data: {
        bookmarkIds: updatedbookmarkIds
      }
    });

    return res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}