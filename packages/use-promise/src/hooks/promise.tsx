import {useCallback, useRef, useState} from 'react'


export enum PromiseStatus {
	Initial = 'initial',
	Pending = 'pending',
	Rejected = 'rejected',
	Fulfilled = 'fulfilled',
}

export type PromiseInitial = {status: PromiseStatus.Initial}
export type PromisePending = {status: PromiseStatus.Pending}
export type PromiseRejected = {status: PromiseStatus.Rejected, reason: unknown}
export type PromiseFulfilled<Value> = {status: PromiseStatus.Fulfilled, value: Value}
export type PromiseState<Value> = PromiseInitial | PromisePending | PromiseRejected | PromiseFulfilled<Value>

export function promiseFulfilled<Value>(value: Value): PromiseFulfilled<Value> {
	return {status: PromiseStatus.Fulfilled, value}
}

export function promiseRejected(reason: unknown): PromiseRejected {
	return {status: PromiseStatus.Rejected, reason}
}

export function usePromise<Value, Args extends unknown[] = unknown[]>(
	createPromise: (...args: Args) => Promise<Value>,
	initialState: PromiseState<Value> = {status: PromiseStatus.Initial},
) {
	const promiseRef = useRef<Promise<Value>>()
	const [state, setState] = useState<PromiseState<Value>>(initialState)

	const wrapped = useCallback(
		(...args: Args): void => {
			setState({status: PromiseStatus.Pending})

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

	return [state, wrapped] as const
}
