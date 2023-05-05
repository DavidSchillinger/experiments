import {QueryClient, QueryClientProvider, useQuery} from '@tanstack/react-query';
import {Suspense} from 'react'
import {ErrorBoundary} from 'react-error-boundary'


const queryClient = new QueryClient({
	defaultOptions: {queries: {suspense: true}},
});

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ErrorBoundary fallback={<p>Error!</p>}>
				<Suspense fallback={<p>Loading…</p>}>
					<Success/>
				</Suspense>
			</ErrorBoundary>

			<ErrorBoundary fallback={<p>Error!</p>}>
				<Suspense fallback={<p>Loading…</p>}>
					<Error/>
				</Suspense>
			</ErrorBoundary>
		</QueryClientProvider>
	)
}

const wait = (ms: number) => new Promise(resolve => {
	setTimeout(resolve, ms);
});

type Data = {
	name: string,
	description: string,
	subscribers_count: number,
	stargazers_count: number,
	forks_count: number,
}

function Success() {
	const {data} = useQuery<Data, Error>({
		queryKey: ['repoData'],
		queryFn: () => wait(1000).then(() => (
			fetch('https://api.github.com/repos/tannerlinsley/react-query')
			.then(response => response.json())
		)),
	})

	if (!data) return null;

	return (
		<div>
			<h1>{data.name}</h1>
			<p>{data.description}</p>
			<strong>👀 {data.subscribers_count}</strong>{' '}
			<strong>✨ {data.stargazers_count}</strong>{' '}
			<strong>🍴 {data.forks_count}</strong>
		</div>
	)
}

function Error() {
	useQuery({
		queryKey: ['errorFetch'],
		queryFn: () => wait(1000).then(() => {
			throw 'REJECTED';
		}),
	})

	return null;
}
