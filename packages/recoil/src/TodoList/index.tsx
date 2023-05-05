import {Fragment} from 'react'
import {useRecoilValue} from 'recoil'
import TodoListStats from './TodoListStats'
import TodoListFilters from './TodoListFilters'
import TodoItemCreator from './TodoItemCreator'
import TodoItem from './TodoItem'
import {filteredTodoListState} from './state'


const TodoList = () => {
	const todoList = useRecoilValue(filteredTodoListState)

	return (
		<Fragment>
			<TodoListStats/>

			<div style={{display: 'flex', gap: '10px'}}>
				<TodoItemCreator/>
				<TodoListFilters/>
			</div>

			{todoList.map((todoItem) => (
				<TodoItem item={todoItem} key={todoItem.id}/>
			))}
		</Fragment>
	)
}

export default TodoList
