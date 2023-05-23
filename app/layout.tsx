import { AuthProvider } from '@/components/AuthProvider';
import './globals.css';
import { Inter } from 'next/font/google';
import AppBar from '@/components/AppBar';

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
			<body className={inter.variable}>
				<AuthProvider>
					<AppBar />
					{children}
				</AuthProvider>
				<script src='https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js'></script>
			</body>
		</html>
	);
}
