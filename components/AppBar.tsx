import Link from 'next/link';
import { Suspense } from 'react';
import Loading from '../components/Loading';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

interface User {
	name: string;
	email: string;
}

export default async function AppBar({ children }: { children: React.ReactNode }) {
	const { user } = await getServerSession(authOptions);
	const handleSignOut = async (event: any) => {
		event.preventDefault();

		try {
		} catch (error) {
			console.error(error);
		}
	};

	const SignedInOptions = () => {
		return (
			<>
				<li>
					<label htmlFor={'updateProfileModal'}>Update Profile</label>
				</li>
				<li>
					<label onClick={handleSignOut}>Sign Out</label>
				</li>
			</>
		);
	};

	const SignedOutOptions = () => {
		return (
			<>
				<li>
					<label htmlFor={'signInModal'}>Sign In</label>
				</li>
				<li>
					<label htmlFor={'signUpModal'}>Sign Up</label>
				</li>
			</>
		);
	};

	const MenuItems = [
		{ text: 'Firestore', link: '/firestore' },
		{ text: 'Storage', link: '/storage' },
	];

	return (
		<Suspense fallback={<Loading />}>
			{/* <SignIn /> */}
			{/* <SignUp /> */}
			{/* <UpdateProfile /> */}
			<div className='drawer'>
				<input id='side-drawer' type='checkbox' className='drawer-toggle' />
				<div className='drawer-content flex flex-col'>
					{/* <!-- Navbar --> */}
					<div className='navbar bg-secondary'>
						<label htmlFor='side-drawer' tabIndex={0} className='btn btn-ghost md:hidden'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-5 w-5'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M4 6h16M4 12h8m-8 6h16'
								/>
							</svg>
						</label>
						<div className='flex-1'>
							<Link className='btn btn-ghost normal-case text-xl' href='/'>
								daisyUI
							</Link>
						</div>
						<div className='flex-1 hidden md:block'>
							{MenuItems.map(({ text, link }) => (
								<Link className='btn btn-ghost normal-case text-lg' href={link}>
									{text}
								</Link>
							))}
						</div>
						<div className='flex-none'>
							<p className='mr-2 text-xl font-bold'>{user?.displayName}</p>
							<div className='dropdown dropdown-end'>
								<label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
									<div className='w-10 rounded-full'>
										<img src='/images/avatar.png' />
									</div>
								</label>
								<ul
									tabIndex={0}
									className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'
								>
									<Suspense fallback={<SignedOutOptions />}>
										<SignedInOptions />
									</Suspense>
								</ul>
							</div>
						</div>
					</div>
					{/* <!-- Page content here --> */}
					{children}
				</div>
				<div className='drawer-side'>
					<label htmlFor='side-drawer' className='drawer-overlay'></label>
					<ul className='menu p-4 w-80 bg-base-100'>
						{/* <!-- Sidebar content here --> */}
						{MenuItems.map(({ text, link }) => (
							<li>
								<Link href={link}>{text}</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</Suspense>
	);
}
