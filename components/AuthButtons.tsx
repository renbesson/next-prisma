'use client';

import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

const classes =
	'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white';

  export const SignUpButton = () => (
    <Link href='/signup' className={classes}>
      Sign Up
    </Link>
  );

export const SignInButton = () => (
	<a href='#' className={classes} onClick={() => signIn()}>
		Sign In
	</a>
);

export const SignOutButton = () => (
	<a href='#' className={classes} onClick={() => signOut()}>
		Sign Out
	</a>
);
