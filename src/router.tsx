import {createBrowserRouter} from 'react-router-dom'
import {RootRoute} from './routes/root'


export const router = createBrowserRouter([
	{
		path: '/',
		element: <RootRoute/>,
		children: [
			{
				path: '/posts',
				lazy: () => import('./routes/posts'),
			},
			{
				path: '/users',
				lazy: () => import('./routes/users'),
			},
			{
				path: '/users/:userId',
				lazy: () => import('./routes/users/user'),
			},
		],
	},
])
