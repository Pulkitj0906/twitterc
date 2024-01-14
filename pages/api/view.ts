import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb';
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
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

        // Ensure unique user IDs in the views array
        const updatedViews = Array.from(new Set([...(post.views || []), currentUser.id]));

        const updatedPost = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                views: updatedViews
            }
        });

        return res.status(200).json(updatedPost);
    } catch (error) {
        console.error(error);
        return res.status(400).end();
    }
}
