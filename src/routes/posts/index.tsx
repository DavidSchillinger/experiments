import {Await, defer, useLoaderData} from 'react-router-dom'
import {Suspense} from 'react'


type Post = {
	id: number,
	userId: number,
	title: string,
	body: string,
}

export function loader() {
	return defer({
		posts: fetch('https://jsonplaceholder.typicode.com/posts').then(r => r.json()),
	})
}

export function Component() {
	const deferred = useLoaderData() as { posts: Promise<Post[]> };

	return (
		<article>
			<h1>Posts</h1>

			<Suspense fallback={<p>Loading...</p>}>
				<Await resolve={deferred.posts}>
					{(posts: Post[]) => posts.map(post => (
						<article key={post.id}>
							<h4>{post.title}</h4>
							<p>{post.body}</p>
						</article>
					))}
				</Await>
			</Suspense>
		</article>
	)
}
