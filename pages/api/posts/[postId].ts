import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET' && req.method !=='DELETE') {
    return res.status(405).end();
  }

  try {
    if(req.method==='GET'){
      const { postId } = req.query;

      if (!postId || typeof postId !== 'string') {
        throw new Error('Invalid ID');
      }

      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
        include: {
          user: true,
          comments: {
            include: {
              user: true
            },
            orderBy: {
              createdAt: 'desc'
            }
          },
        },
      });

        return res.status(200).json(post);
    }
    if (req.method === 'DELETE') {
      const { postId } = req.query;

      if (!postId || typeof postId !== 'string') {
        return res.status(400).json({message:'Invalid post ID'})
      }

      const { currentUser } = await serverAuth(req, res);

      const post = await prisma.post.findUnique({
        where: {
          id:postId
        },
        select: {
          userId: true
        }
      })
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      if (post.userId !== currentUser.id) {
        return res.status(403).json({ message: "Unauthorized to delete this post" });
      }

      await prisma.post.delete({
        where: {
          id: postId
        }
      });

      return res.status(200).json({message: 'Post deleted successfully'})
    }
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
