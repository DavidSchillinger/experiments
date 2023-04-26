import {NavLink, Outlet} from 'react-router-dom'
import classes from './index.module.css'


export function RootRoute() {
	return (
		<main>
			<nav className={classes.links}>
				<NavLink to='/'>Home</NavLink>
				<NavLink to='posts'>Posts</NavLink>
			</nav>

			<Outlet/>
		</main>
	)
}
