'use client';

import { signIn, useSession } from 'next-auth/react';
import { redirect, useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useRef } from 'react';

export default function Signin() {
	const { status } = useSession();
	const searchParams = useSearchParams();
	const error = searchParams.get('error');

	const email = useRef<HTMLInputElement>(null);
	const password = useRef<HTMLInputElement>(null);

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();

		signIn('credentials', {
			email: email?.current?.value,
			password: password?.current?.value,
			redirect: true,
			callbackUrl: '/',
		});
	};

	useEffect(() => {
		if (status === 'authenticated') {
			redirect('/'); // Replace '/dashboard' with your desired redirect path
		}
	}, [status]);

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
							Sign In
						</h5>

						<form className='form-control w-full max-w-lg gap-2' onSubmit={handleSubmit}>
							<div className='relative z-0 w-full mb-6 group'>
								<input
									ref={email}
									type='email'
									name='email'
									id='email'
									autoComplete='email'
									className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
									placeholder=' '
									required
								/>
								<label
									htmlFor='floating_email'
									className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
								>
									Email address
								</label>
							</div>

							<div className='relative z-0 w-full mb-6 group'>
								<input
									ref={password}
									type='password'
									name='password'
									id='password'
									autoComplete='password'
									className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
									placeholder=' '
									required
								/>
								<label
									htmlFor='floating_password'
									className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
								>
									Password
								</label>
							</div>

							<button
								type='submit'
								className='text-white bg-secondary hover:bg-secondary-light focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center'
							>
								Sign In
							</button>
							{error === 'CredentialsSignin' && (
								<p className='text-red-700'>Email or Password is Incorrect</p>
							)}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
