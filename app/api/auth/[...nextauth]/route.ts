import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
	session: { strategy: 'jwt' },
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			name: 'Sign in',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'hello@example.com',
				},
				password: {
					label: 'Password',
					type: 'password',
				},
			},
			async authorize(credentials) {
				const user = { id: '1', name: 'Ren', email: 'ren.besson@outlook.com' };
				return user;
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
