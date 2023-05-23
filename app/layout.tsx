import './globals.css';
import { Inter } from 'next/font/google';

export const metadata = {
	title: 'next-next-auth-prisma',
	description: '',
};

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
	display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' data-theme='light'>
			<body className={inter.variable}>{children}</body>
		</html>
	);
}
