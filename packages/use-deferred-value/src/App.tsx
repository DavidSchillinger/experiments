import {CSSProperties, useDeferredValue, useState} from 'react'
import SlowList from './SlowList'
import {useDebounce} from 'use-debounce'


// Is this actually ideal? My understanding is that React still starts the attempt to render on each keystroke,
// so we're still using resources in the background? Isn't debouncing this just better?

// Debounce causes a _minimum_ delay of (debounce delay + ui render time).
// Deferring causes a _maximum_ delay of (ui render time).
// So deferring feels much faster but is more resource intensive, which is likely never a real issue.
// We also never have to find a "reasonable" debounce delay with useDeferredValue. Also: Suspense integration.

const container: CSSProperties = {
	display: 'flex',
	gap: '2rem',
}

export default function App() {
	return (
		<div style={container}>
			<Defer/>
			<Debounce/>
		</div>
	)
}

function Defer() {
	const [text, setText] = useState('')
	const deferredText = useDeferredValue(text)

	return (
		<div>
			<h3>Defer:</h3>
			<input value={text} onChange={e => setText(e.target.value)}/>
			<SlowList text={deferredText}/>
		</div>
	)
}

function Debounce() {
	const [text, setText] = useState('')
	const [debouncedText] = useDebounce(text, 200)

	return (
		<div>
			<h3>Debounce:</h3>
			<input value={text} onChange={e => setText(e.target.value)}/>
			<SlowList text={debouncedText}/>
		</div>
	)
}
