import {Await, defer, Link, useLoaderData} from 'react-router-dom'
import {Suspense} from 'react'


type User = {
	id: number,
	name: string,
	email: string,
}

export function loader() {
	return defer({
		users: fetch('https://jsonplaceholder.typicode.com/users').then(r => r.json()),
	})
}

export function Component() {
	const deferred = useLoaderData() as {users: Promise<User[]>}

	return (
		<article>
			<h1>
				Users
			</h1>

			<Suspense fallback={<p>Loading...</p>}>
				<Await resolve={deferred.users}>
					{(users: User[]) => users.map(user => (
						<p key={user.id}>
							<Link to={user.id.toString()}>{user.name} ({user.email})</Link>
						</p>
					))}
				</Await>
			</Suspense>
		</article>
	)
}
