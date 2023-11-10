import {expect, it, vi} from 'vitest'
import {wait} from './wait'


vi.useFakeTimers()

it('should wait', async () => {
	const spy = vi.fn()
	wait(200).then(spy)
	expect(spy).not.toHaveBeenCalled()

	await vi.advanceTimersByTimeAsync(100)
	expect(spy).not.toHaveBeenCalled()

	await vi.advanceTimersByTimeAsync(100)
	expect(spy).toHaveBeenCalledTimes(1)
})
