import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from '@/libs/prismadb'
import { compare } from 'bcrypt'
// import bcrypt from 'bcrypt'

import { PrismaAdapter } from "@next-auth/prisma-adapter";

export default NextAuth({
    providers: [

        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text'
                },
                password: {
                    label: 'Password',
                    type: 'password',
                },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid Credentials")
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })
            
                if (!user || !user.hashedPassword) {
                    throw new Error("Invalid Credentials")
                }

                const isCorrectpassword = await compare(
                    credentials.password,
                    user.hashedPassword
                )

                if (!isCorrectpassword) {
                    throw new Error("Incorrect password")
                }
                return user;
            }

        })
    ]
    ,
    debug: process.env.NODE_ENV === 'development',
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt'
    }
    ,
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET
    },
    secret: process.env.NEXTAUTH_SECRET
})