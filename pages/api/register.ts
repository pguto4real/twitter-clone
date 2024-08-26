import bcrypt from 'bcrypt'
import { hash } from 'bcrypt'
import prisma from '@/libs/prismadb'
import { NextApiRequest, NextApiResponse } from 'next'




export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end()
    }
   
    try {
        const { email,username, name, password } = req.body

        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (existingUser) {
            return res.status(422).json({ error: "Email taken " })
        }
      
        //hash password

        const hashedPassword = await hash(password, 12)
 
            const user = await prisma.user.create({
                data: {
                    email,
                    name,
                    username,
                    hashedPassword,
                }
            })
           
        return res.status(200).json(user)
    } catch (error) {
        console.log(error)
        return res.status(400).end()
    }
}
