
import prisma from '@/libs/prismadb'
import { NextApiRequest, NextApiResponse } from 'next'




export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'DELETE' && req.method !== 'POST') {
        return res.status(405).end()
    }

    try {
        const { userId, currentUser } = req.body
        if (!userId || typeof userId !== 'string') {
            throw new Error('Invalid ID')
        }
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!user) {
            throw new Error('Invalid ID')
        }

        let updatedFollowingIds = [...(user?.followingIds || [])]

        if (req.method === 'POST') {
            updatedFollowingIds.push(userId)
        }
        if (req.method === 'DELETE') {
            updatedFollowingIds = updatedFollowingIds.filter(followingId => followingId !== userId)
        }
        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                followingIds:updatedFollowingIds
            }
        })
        return res.status(200).json(updatedUser)
    } catch (error) {
        console.log(error)
        return res.status(400).end()
    }
}
