export function wait(ms: number) {
	return new Promise(resolve => {
		setTimeout(() => resolve(null), ms)
	})
}

if (import.meta.vitest) {
	const {it, expect, vi} = import.meta.vitest

	vi.useFakeTimers();

	it('should wait', async () => {
		const spy = vi.fn();
		wait(200).then(spy);
		expect(spy).not.toHaveBeenCalled();

		await vi.advanceTimersByTimeAsync(100);
		expect(spy).not.toHaveBeenCalled();

		await vi.advanceTimersByTimeAsync(100);
		expect(spy).toHaveBeenCalledTimes(1);
	});
}
