import {memo} from 'react'


export default memo(function SlowList({text}: {text: string}) {
	// Log once. The actual slowdown is inside SlowItem.
	console.log('[ARTIFICIALLY SLOW] Rendering 250 <SlowItem />')

	return (
		<ul className='items'>
			{Array.from(Array(250)).map((_, index) => (
				<SlowItem key={index} text={text}/>
			))}
		</ul>
	)
})

function SlowItem({text}: {text: string}) {
	const startTime = performance.now()
	while (performance.now() - startTime < 1) {
		// Do nothing for 1 ms per item to emulate extremely slow code
	}

	return (
		<li className='item'>
			Text: {text}
		</li>
	)
}
