import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import { SignInButton, SignOutButton, SignUpButton } from './AuthButtons';
import Link from 'next/link';

async function AppBar() {
	const session = await getServerSession(authOptions);

	const SignInMenu = () => (
		<ul className='py-2' aria-labelledby='user-menu-button'>
			<li>
				<Link
					href='/updateProfile'
					className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
				>
					Update Profile
				</Link>
			</li>
			<li>
				<SignOutButton />
			</li>
		</ul>
	);

	const SignOutMenu = () => (
		<ul className='py-2' aria-labelledby='user-menu-button'>
			<li>
				<SignUpButton />
			</li>
			<li>
				<SignInButton />
			</li>
		</ul>
	);

	const MainMenuOption = ({ text, link }: { text: string; link: string }) => (
		<li>
			<Link
				href={link}
				className='block py-2 pl-3 pr-4 rounded md:bg-transparent md:hover:text-secondary'
				aria-current='page'
			>
				{text}
			</Link>
		</li>
	);

	return (
		<nav className='bg-primary shadow-2xl'>
			<div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2'>
				<Link href='/' className='flex items-center'>
					<img src='https://flowbite.com/docs/images/logo.svg' className='h-12 mr-3' alt='logo' />
					<span className='text-2xl font-semibold'>Site Name</span>
				</Link>
				<div className='flex items-center md:order-2'>
					<button
						type='button'
						className='flex mr-3 text-sm bg-secondary rounded-full md:mr-0 focus:ring-4'
						id='user-menu-button'
						aria-expanded='false'
						data-dropdown-toggle='user-dropdown'
						data-dropdown-placement='bottom'
					>
						<span className='sr-only'>Open user menu</span>
						<Image
							className='rounded-full border-2 border-secondary'
							width={48}
							height={48}
							src='/images/avatar.png'
							alt='user photo'
						/>
					</button>
					{/* <!-- Dropdown menu --> */}
					<div
						className='z-50 hidden my-4 text-base list-none bg-contrast rounded-lg shadow-2xl'
						id='user-dropdown'
					>
						{session && (
							<div className='px-4 py-3'>
								<span className='block text-sm text-gray-900 dark:text-white'>
									{session.user?.name}
								</span>
								<span className='block text-sm  text-gray-500 truncate dark:text-gray-400'>
									{session.user?.email}
								</span>
							</div>
						)}
						{session ? <SignInMenu /> : <SignOutMenu />}
					</div>
					<button
						data-collapse-toggle='mobile-menu-2'
						type='button'
						className='inline-flex items-center p-2 ml-1 text-sm text-secondary rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200'
						aria-controls='mobile-menu-2'
						aria-expanded='false'
					>
						<span className='sr-only'>Open main menu</span>
						<svg
							className='w-6 h-6'
							aria-hidden='true'
							fill='currentColor'
							viewBox='0 0 20 20'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								fillRule='evenodd'
								d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
								clipRule='evenodd'
							></path>
						</svg>
					</button>
				</div>
				<div
					className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1'
					id='mobile-menu-2'
				>
					<ul className='flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg bg-gray-50 md:bg-primary md:flex-row md:space-x-8 md:mt-0 md:border-0'>
						<MainMenuOption text='Home' link='/' />
						<MainMenuOption text='Pricing' link='/' />
						<MainMenuOption text='Contact' link='/' />
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default AppBar as unknown as () => JSX.Element;
