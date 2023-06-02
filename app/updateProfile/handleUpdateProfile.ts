'use server';

import prisma from '../../lib/prisma';

interface Data {
	name: string;
	email: string;
}

export const handleUpdateProfile = async (id: string, data: Data) => {
	try {
		if (id) {
			const user = await prisma.user.update({
				where: {
					id,
				},
				data: {
					name: data.name,
					email: data.email.toLowerCase(),
				},
			});
			if (user) return user;
		} else return { message: 'Missing either Name, Email, or Password.' };
	} catch (error) {
		console.error(error);
		return error;
	}
};
