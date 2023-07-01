import {useMemo} from 'react'
import {usePromise} from './promise.tsx'
import axios, {AxiosRequestConfig} from 'axios'


export function useAxios<Value>() {
	const fetch = useMemo(selfAbortingAxios, [])

	return usePromise(fetch<Value>)
}

function selfAbortingAxios() {
	let controller: AbortController | undefined

	return function fetch<Value>(config: AxiosRequestConfig<Value>) {
		controller?.abort()
		controller = new AbortController()

		const signal = controller.signal

		return (
			axios<Value>({signal, ...config})
			.then(response => response.data)
			.finally(() => {
				controller = undefined
			})
		)
	}
}
