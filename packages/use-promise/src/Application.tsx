import {useCallback, useEffect} from 'react'
import {PromiseStatus} from './hooks/promise.tsx'
import {useAxios} from './hooks/fetch.tsx'
import {usePrevious} from './hooks/previous.tsx'


type Todo = {id: number}

export function Application() {
	const [state, fetch] = useAxios<Todo[]>()
	const previous = usePrevious(state)

	const handleClick = useCallback(
		() => {
			fetch({url: `https://jsonplaceholder.typicode.com/todos/1`})
		},
		[fetch],
	)

	useEffect(() => console.log('STATE', state), [state])
	useEffect(() => console.log('PREVIOUS', previous), [previous])

	return (
		<div>
			<button type='button' onClick={handleClick}>
				Execute
			</button>

			<br/><br/>

			STATE: {state.status}
			{state.status === PromiseStatus.Fulfilled && (
				<pre>{JSON.stringify(state.value, null, '\t')}</pre>
			)}

			<br/><br/>

			PREVIOUS: {previous?.status}
			{previous?.status === PromiseStatus.Fulfilled && (
				<pre>{JSON.stringify(previous.value, null, '\t')}</pre>
			)}
		</div>
	)
}
