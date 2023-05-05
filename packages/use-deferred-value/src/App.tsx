import {Fragment, useDeferredValue, useState} from 'react'
import SlowList from './SlowList'


// Is this actually ideal? My understanding is that React still starts the attempt to render on each keystroke,
// so we're still using resources in the background? Isn't debouncing this just better?

export default function App() {
	const [text, setText] = useState('');
	const deferredText = useDeferredValue(text);

	return (
		<Fragment>
			<input value={text} onChange={e => setText(e.target.value)}/>
			<SlowList text={deferredText}/>
		</Fragment>
	);
}
