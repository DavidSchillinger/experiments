import {ChangeEvent, Fragment} from 'react'
import {useRecoilState} from 'recoil'
import {TodoFilter, todoListFilterState} from './state'


function TodoListFilters() {
	const [filter, setFilter] = useRecoilState(todoListFilterState)

	const updateFilter = ({target: {value}}: ChangeEvent<HTMLSelectElement>) => {
		setFilter(value as TodoFilter) // This cast is probably not actually safe.
	}

	return (
		<Fragment>
			Filter:
			<select value={filter} onChange={updateFilter}>
				<option value='Show All'>All</option>
				<option value='Show Completed'>Completed</option>
				<option value='Show Uncompleted'>Uncompleted</option>
			</select>
		</Fragment>
	)
}

export default TodoListFilters
