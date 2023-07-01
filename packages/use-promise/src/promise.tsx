import {useCallback, useRef, useState} from 'react'
import {promiseFulfilled, promiseInitial, promisePending, promiseRejected, PromiseState} from './promise-state.tsx'


export function usePromise<Value, Args extends unknown[]>(
	createPromise: (...args: Args) => Promise<Value>,
	initialState: PromiseState<Value> = promiseInitial(),
) {
	const promiseRef = useRef<Promise<Value>>()
	const [state, setState] = useState<PromiseState<Value>>(initialState)

	const callback = useCallback(
		(...args: Args): void => {
			setState(promisePending())

			const promise = createPromise(...args)
			promiseRef.current = promise

			promise
			.then(value => {
				if (promise !== promiseRef.current) return
				setState(promiseFulfilled(value))
			})
			.catch(reason => {
				if (promise !== promiseRef.current) return
				setState(promiseRejected(reason))
			})
		},
		[createPromise],
	)

	return [state, callback] as const
}
