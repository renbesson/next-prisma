'use client';

import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { Prisma } from '@prisma/client';
import { handleUpdateProfile } from './handleUpdateProfile';
import { useRef } from 'react';

export default function UpdateProfile() {
	const { data: session, update } = useSession();

	const formRef = useRef<HTMLFormElement | undefined>(undefined);

	const handleSubmit = async (event: FormData) => {
		const formData = new FormData(formRef.current);
		const name = formData.get('name') as string;
		const email = formData.get('email') as string;

		const user = await handleUpdateProfile(session?.user?.id, {
			name,
			email,
		});
		console.log(user);
		if (user) {
			signIn('credentials', {
				email: user.email,
				password: user.password,
				redirect: true,
				callbackUrl: '/',
			});
		}
	};

	return (
		<div
			className='bg-no-repeat bg-cover bg-center relative'
			style={{
				backgroundImage: 'url(/images/signin.jpeg)',
			}}
		>
			<div className='h-[calc(100vh-64px)] sm:flex sm:flex-col md:flex-row mx-0 justify-evenly'>
				<div className='flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl'>
					<h1 className='mb-3 font-bold text-contrast text-5xl text-shadow'>Welcome Back!</h1>
				</div>
				<div className='flex justify-center self-center max-w-lg'>
					<div className='max-h-sm w-80 max-w-sm p-5 bg-contrast border border-gray-200 rounded-lg shadow-2xl'>
						<h5 className='mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
							Update Profile
						</h5>

						<form
							className='flex flex-col form-control w-full max-w-xs gap-3'
							ref={formRef}
							action={handleSubmit}
						>
							<div>
								<label className='label'>
									<span className='label-text'>Name</span>
								</label>
								<input
									id='name'
									name='name'
									autoComplete='name'
									type='text'
									placeholder='Eg: Bubbaloo'
									className='input input-bordered w-full max-w-xs'
								/>
							</div>

							<div>
								<label className='label'>
									<span className='label-text'>Email</span>
								</label>
								<input
									id='email'
									name='email'
									autoComplete='email'
									type='email'
									placeholder='Eg: best@email.ca'
									className='input input-bordered w-full max-w-xs'
								/>
							</div>

							<div>
								<button
									type='submit'
									className='text-white bg-secondary hover:bg-secondary-light focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center'
								>
									Update Profile
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
