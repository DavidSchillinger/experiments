import {atom, selector} from 'recoil'


export type Todo = {
	id: number,
	text: string,
	isComplete: boolean,
}

export type TodoFilter = 'Show All' | 'Show Completed' | 'Show Uncompleted';

const todoListState = atom<Todo[]>({
	key: 'todoListState',
	default: [],
})

const todoListFilterState = atom<TodoFilter>({
	key: 'todoListFilterState',
	default: 'Show All',
})

const filteredTodoListState = selector({
	key: 'filteredTodoListState',
	get: ({get}): Todo[] => {
		const filter = get(todoListFilterState)
		const list = get(todoListState)

		switch (filter) {
		case 'Show Completed':
			return list.filter((item) => item.isComplete)
		case 'Show Uncompleted':
			return list.filter((item) => !item.isComplete)
		case 'Show All':
			return list
		}
	},
})

const todoListStatsState = selector({
	key: 'todoListStatsState',
	get: ({get}) => {
		const todoList = get(todoListState)

		const totalNum = todoList.length
		const totalCompletedNum = todoList.filter((item) => item.isComplete).length
		const totalUncompletedNum = totalNum - totalCompletedNum
		const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum

		const allText = (
			todoList
			.filter((item) => !item.isComplete)
			.reduce((result, item) => `${result} ${item.text}`, '')
		)

		return {
			totalNum,
			totalCompletedNum,
			totalUncompletedNum,
			percentCompleted,
			allText,
		}
	},
})

export {
	todoListState,
	todoListFilterState,
	filteredTodoListState,
	todoListStatsState,
}
