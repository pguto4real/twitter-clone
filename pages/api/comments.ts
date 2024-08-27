
import prisma from '@/libs/prismadb'
import { NextApiRequest, NextApiResponse } from 'next'




export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end()
    }

    try {
        const { body, currentUser } = req.body
        const { postId } = req.query
   
        if (!postId || typeof postId !== 'string') {
            throw new Error('Invalid ID')
        }
        if (!currentUser) {
            throw new Error('Not Signed inn')
        } 
            const comment = await prisma.comment.create({
                data:{
                 body,
                 userId:currentUser.id,
                 postId
                }
             })
             return res.status(200).json(comment)
        
       
        
        
    } catch (error) {
        console.log(error)
        return res.status(400).end()
    }
}
