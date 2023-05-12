import {useEffect, useRef} from 'react'


export function usePrevious<Value>(value: Value): Value | undefined {
	const previousValueRef = useRef<Value>()

	useEffect(
		() => {
			previousValueRef.current = value
		},
		[value],
	)

	return previousValueRef.current
}
