import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import { Suspense } from 'react';

export const preferredRegion = 'home';
export const dynamic = 'force-dynamic';

export default async function Home() {
	const session = await getServerSession(authOptions);
	return (
		<main className='relative flex min-h-screen flex-col items-center justify-center'>
			{session && (
				<Suspense fallback={<div>Loading...</div>}>
					<pre>{JSON.stringify(session, null, 1)}</pre>
				</Suspense>
			)}
		</main>
	);
}
