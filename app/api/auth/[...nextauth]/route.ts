import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient, User } from '@prisma/client';
import { compare } from 'bcrypt';
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
					autoComplete: 'email',
				},
				password: {
					label: 'Password',
					type: 'password',
					autoComplete: 'password',
				},
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) return null;

				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email,
					},
				});

				// Returns null if user doesn't exist in the database
				if (!user) return null;

				// Returns null if password doesn't match
				const isPasswordValid = await compare(credentials.password, user.password);
				if (!isPasswordValid) return null;

				return {
					id: user.id + '',
					email: user.email,
					name: user.name,
				};
			},
		}),
	],
	callbacks: {
		session: ({ token, session }) => {
			return { ...session, user: { ...session.user, id: token.id } };
		},
		jwt: ({ token, user }) => {
			if (user) {
				const u = user as unknown as User;
				return { ...token, id: u.id };
			}
			return token;
		},
	},
	pages: {
		signIn: '/signin',
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
