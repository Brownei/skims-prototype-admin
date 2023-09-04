import { NextAuthOptions } from 'next-auth'
import { prismaClient } from '@/lib/prismaClient';
import { connectToDB } from "@/lib/database";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials"
import {compare} from 'bcrypt-ts';
import { IUser, adminProfile } from '@/types/index';

function getGoogleCredentials() {
  const clientId= process.env.GOOGLE_CLIENT_ID
  const clientSecret= process.env.GOOGLE_CLIENT_SECRET 

  if(!clientId || clientId?.length === 0) {
    throw new Error('No clientID for provider')
  }

  if(!clientSecret || clientSecret?.length === 0) {
    throw new Error('No clientSecret for provider')
  }

  return {clientId, clientSecret}
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismaClient),
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret
    }),
    CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" },
          },

          async authorize(credentials) {
            await connectToDB()

            //Check if there is a email and password anywhere
            if(!credentials?.email || !credentials?.password) {
              console.log('No credentials')
              return null
            }

            //Check if there is a user
            const admin = await prismaClient.admin.findFirst({
              where: {
                email: credentials.email
              }
            })
            if(!admin) {
              console.log('No admin with this email')
              return null
            }

            //Check if passwords match!
            const passwordMatch = await compare(credentials.password, admin.hashedPassword!)
            if(!passwordMatch) {
              console.log('Passwords do not match')
              return null
            }

            //Return the admin
            return admin
          }
    })
  ],

  session: {
    strategy: 'jwt'
  },

  // callbacks: {
  //   session({token, session}) {
  //     if(token) {
  //       session.user.id = token.id
  //       session.user.name = token.name
  //       session.user.email = token.email
  //       session.user.image = token.picture
  //     }
  //     return session
  //   },

  //   async jwt({token, user}) {
  //     const admin = await prismaClient.admin.findUnique({
  //       where: {
  //         email: token.email!
  //       }
  //     })

  //     if(!admin) {
  //       token.id = user!.id
  //       return token
  //     }

  //     return {
  //       id: admin.id,
  //       name: admin.name,
  //       email: admin.email,
  //       picture: admin.image
  //     }
  //   },

  //   redirect() {
  //     return '/dashboard/overview'
  //   }
  // },

  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/',
  },
}