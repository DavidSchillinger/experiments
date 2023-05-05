import {RecoilRoot} from 'recoil'
import TodoList from './TodoList'


// Example application reproduced from the Recoil docs.

export default function App() {
	return (
		<RecoilRoot>
			<h1>Recoil:</h1>
			<TodoList/>
		</RecoilRoot>
	)
}
