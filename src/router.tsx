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
		],
	},
])
