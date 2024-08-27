
import prisma from '@/libs/prismadb'
import { NextApiRequest, NextApiResponse } from 'next'




export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end()
    }

    try {

        const { userId } = req.query;
        console.log('userId', userId)
        if (!userId || typeof userId !== 'string') {
            throw new Error("Invalid ID")
        }

        const notifications = await prisma.notifications.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        console.log('i got here1')
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                hasNotification: false
            }
        })



        return res.status(200).json(notifications);
    } catch (error) {
        console.log(error)
        return res.status(400).end()
    }
}
