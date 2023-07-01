export enum PromiseStateType {
	Initial = 'initial',
	Pending = 'pending',
	Rejected = 'rejected',
	Fulfilled = 'fulfilled',
}

export type PromiseStateInitial = {type: PromiseStateType.Initial}
export type PromiseStatePending = {type: PromiseStateType.Pending}
export type PromiseStateRejected = {type: PromiseStateType.Rejected, reason: unknown}
export type PromiseStateFulfilled<Value> = {type: PromiseStateType.Fulfilled, value: Value}
export type PromiseState<Value> =
	PromiseStateInitial
	| PromiseStatePending
	| PromiseStateRejected
	| PromiseStateFulfilled<Value>

export const {promiseInitial, isPromiseInitial} = initial()
export const {promisePending, isPromisePending} = pending()
export const {promiseRejected, isPromiseRejected} = rejected()
export const {promiseFulfilled, isPromiseFulfilled} = fulfilled()

function initial() {
	const type = PromiseStateType.Initial
	const staticState: PromiseStateInitial = Object.freeze({type})

	return {
		promiseInitial(): PromiseStateInitial {
			return staticState
		},
		isPromiseInitial<Value>(value: PromiseState<Value>): value is PromiseStateInitial {
			return value.type === type
		},
	}
}

function pending() {
	const type = PromiseStateType.Pending
	const staticState: PromiseStatePending = Object.freeze({type})

	return {
		promisePending(): PromiseStatePending {
			return staticState
		},
		isPromisePending<Value>(value: PromiseState<Value>): value is PromiseStatePending {
			return value.type === type
		},
	}
}

function fulfilled() {
	const type = PromiseStateType.Fulfilled

	return {
		promiseFulfilled<Value>(value: Value): PromiseStateFulfilled<Value> {
			return Object.freeze({type, value})
		},
		isPromiseFulfilled<Value>(value: PromiseState<Value>): value is PromiseStateFulfilled<Value> {
			return value.type === type
		},
	}
}

function rejected() {
	const type = PromiseStateType.Rejected

	return {
		promiseRejected(reason: unknown): PromiseStateRejected {
			return Object.freeze({type, reason})
		},
		isPromiseRejected<Value>(value: PromiseState<Value>): value is PromiseStateRejected {
			return value.type === type
		},
	}
}
