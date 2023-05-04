import {Await, defer, LoaderFunction, useLoaderData} from 'react-router-dom'
import {Suspense} from 'react'
import {wait} from '../../../shared/wait.tsx'


type User = {
	id: number,
	name: string,
	email: string,
}

type Album = {
	id: number,
	title: string,
}

export const loader: LoaderFunction = ({params}) => {
	const base = 'https://jsonplaceholder.typicode.com';

	return defer({
		user: wait(1000).then(() => fetch(`${base}/users/${params.userId}`).then(r => r.json())),
		albums: fetch(`${base}/albums?userId=${params.userId}`).then(r => r.json()),
	})
}

export function Component() {
	const deferred = useLoaderData() as { user: Promise<User>, albums: Promise<Album[]> };

	return (
		<article>
			<h1>
				User
			</h1>

			<Suspense fallback={<p>Loading user...</p>}>
				<Await resolve={deferred.user}>
					{(user: User) => (
						<p>
							{user.name} ({user.email})
						</p>
					)}
				</Await>
			</Suspense>

			<h3>
				Albums
			</h3>

			<Suspense fallback={<p>Loading albums...</p>}>
				<Await resolve={deferred.albums}>
					{(albums: Album[]) => albums.map(album => (
						<p key={album.id}>
							{album.title}
						</p>
					))}
				</Await>
			</Suspense>
		</article>
	)
}
