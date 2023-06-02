'use server';

import prisma from '../../lib/prisma';
import { hash } from 'bcrypt';

export const handleSignup = async (name: string, email: string, password: string) => {
	try {
		if (name && email && password) {
			const user = await prisma.user.create({
				data: {
					name: name!,
					email: email!,
					password: await hash(password.toLowerCase(), 12),
				},
			});
			if (user) return user;
		} else return { message: 'Missing either Name, Email, or Password.' };
	} catch (error) {
		console.error(error);
		return error;
	}
};
