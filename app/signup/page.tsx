'use client';

import React, { FormEvent } from 'react';
import Link from 'next/link';
import { handleSignup } from './handleSignUp';
import { signIn } from 'next-auth/react';
import { Prisma } from '@prisma/client';

export default function Signup() {
	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		const form = new FormData(event.target as HTMLFormElement);
		const name = form.get('name') as string;
		const email = form.get('email') as string;
		const password = form.get('new-password') as string;

    // Creates the user in the database
		const user: Prisma.UserSelect = (await handleSignup(
			name,
			email,
			password!
		)) as Prisma.UserSelect;

    // Signs in if the user was created
		if (user) {
			signIn('credentials', {
				email,
				password,
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
							Sign Up
						</h5>

						<form
							className='flex flex-col form-control w-full max-w-xs gap-3'
							onSubmit={handleSubmit}
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
									required
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
									required
									placeholder='Eg: best@email.ca'
									className='input input-bordered w-full max-w-xs'
								/>
							</div>

							<div>
								<label className='label'>
									<span className='label-text'>Password</span>
								</label>
								<input
									id='new-password'
									name='new-password'
									autoComplete='new-password'
									type='password'
									required
									minLength={8}
									placeholder='Type you password'
									className='input input-bordered w-full max-w-xs'
								/>
							</div>

							<div className='flex justify-between text-sm'>
								<a href='#' className='text-primary'>
									Forgot your password?
								</a>
								<Link href='/signin' className='text-secondary'>
									Have an account?
								</Link>
							</div>

							<div>
								<button
									type='submit'
									className='text-white bg-secondary hover:bg-secondary-light focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center'
								>
									Sign Up
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
