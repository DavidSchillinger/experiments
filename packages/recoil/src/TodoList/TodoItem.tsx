import {useRecoilState} from 'recoil'
import {Todo, todoListState} from './state'
import {ChangeEvent} from 'react'


function replaceItemAtIndex<T>(list: T[], index: number, newValue: T) {
	return [...list.slice(0, index), newValue, ...list.slice(index + 1)]
}

function removeItemAtIndex<T>(list: T[], index: number) {
	return [...list.slice(0, index), ...list.slice(index + 1)]
}

const TodoItem = ({item}: { item: Todo }) => {
	const [todoList, setTodoList] = useRecoilState(todoListState)
	const index = todoList.findIndex((listItem) => listItem === item)

	const editItemText = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
		const newList = replaceItemAtIndex(todoList, index, {
			...item,
			text: value,
		})

		setTodoList(newList)
	}

	const toggleItemCompletion = () => {
		const newList = replaceItemAtIndex(todoList, index, {
			...item,
			isComplete: !item.isComplete,
		})

		setTodoList(newList)
	}

	const deleteItem = () => {
		const newList = removeItemAtIndex(todoList, index)

		setTodoList(newList)
	}

	return (
		<div>
			<input type='text' value={item.text} onChange={editItemText}/>
			<input
				type='checkbox'
				checked={item.isComplete}
				onChange={toggleItemCompletion}
			/>
			<button onClick={deleteItem}>X</button>
		</div>
	)
}

export default TodoItem
