import {useCallback, useLayoutEffect, useRef, useState} from 'react'
import {Action, Actions, Blocks, Code, CodeBlock, Highlight, Tag} from './blocks'
import {wait} from './wait'

export function UseState() {
	return (
		<Blocks>
			<UseStateCorrect/>
			<UseStateMutation/>
			<UseStateDuplication/>
		</Blocks>
	)
}

function UseStateCorrect() {
	const {highlights, animateSetState, animateInitialRender} = useRenderAnimation()

	return (
		<CodeBlock title='✅ Correct usage:'>
			<pre>
				<Tag highlight={highlights.outer}>{`<Outer>`}</Tag>
				<Tag highlight={highlights.useState}>{`\t<UseState>`}</Tag>
				<Tag highlight={highlights.inner}>{`\t\t<Inner/>`}</Tag>
				<Tag highlight={highlights.useState}>{`\t</UseState>`}</Tag>
				<Tag highlight={highlights.outer}>{`</Outer>`}</Tag>
			</pre>

			<Actions>
				<Action onClick={animateInitialRender}>
					▶️ initial render
				</Action>

				<Action onClick={animateSetState}>
					▶️ setState(nextValue)
				</Action>
			</Actions>
		</CodeBlock>
	)
}

function useRenderAnimation() {
	type Highlights = {
		outer: Highlight,
		useState: Highlight,
		inner: Highlight,
	}

	const [highlights, setHighlights] = useState<Highlights>({
		outer: false,
		useState: false,
		inner: false,
	})

	const animateSetState = useCallback(
		() => {
			setHighlights({outer: false, useState: 'rendered', inner: false})

			wait(350).then(() => {
				setHighlights({outer: false, useState: false, inner: 'rendered'})
			})
			.then(() => wait(350)).then(() => {
				setHighlights({outer: false, useState: false, inner: false})
			})
		},
		[],
	)

	const animateInitialRender = useCallback(
		() => {
			setHighlights({outer: 'rendered', useState: false, inner: false})

			wait(350).then(() => {
				setHighlights({outer: false, useState: 'rendered', inner: false})
			})
			.then(() => wait(350)).then(() => {
				setHighlights({outer: false, useState: false, inner: 'rendered'})
			})
			.then(() => wait(350)).then(() => {
				setHighlights({outer: false, useState: false, inner: false})
			})
		},
		[],
	)

	return {
		highlights,
		animateSetState,
		animateInitialRender,
	}
}

function UseStateMutation() {
	return (
		<CodeBlock title='❗State mutation:'>
			<pre>
				<Tag highlight={false}>{`<Outer>`}</Tag>
				<Tag highlight={false}>{`\t<UseState>`}</Tag>
				<Tag highlight={false}>{`\t\t<Inner/>`}</Tag>
				<Tag highlight={false}>{`\t</UseState>`}</Tag>
				<Tag highlight={false}>{`</Outer>`}</Tag>
			</pre>

			<Actions>
				<Action onClick={() => null}>
					▶️ state.prop = 'Not reactive!'
				</Action>
			</Actions>
		</CodeBlock>
	)
}

function UseStateDuplication() {
	const isInitialRender = useRef(true)
	const [animated, setAnimated] = useState(false)
	const [original, setOriginal] = useState('foo')
	const [duplicate] = useState(original)

	useLayoutEffect(
		() => {
			if (isInitialRender.current) {
				return () => {
					isInitialRender.current = false
				}
			}

			setAnimated(true)

			const timeout = window.setTimeout(() => setAnimated(false), 350)

			return () => window.clearTimeout(timeout)
		},
		[original],
	)

	return (
		<CodeBlock title='❗State duplication:'>
			<pre>
				<Code>{`const [original, setOriginal] = useState('foo')\n`}</Code>
				<Code>{`const [duplicate, setDuplicate] = useState(state)\n\n`}</Code>

				<Tag highlight={animated ? 'rendered' : false}>
					{`<div>{original}</div>`}
				</Tag>
				<Code>
					↳ {`<div>${original}</div>`}
				</Code>

				<Tag highlight={animated ? 'rendered' : false}>
					{`<div>{duplicate}</div>`}
				</Tag>
				<Code>
					↳ {`<div>${duplicate}</div>`}
				</Code>
			</pre>

			<Actions>
				<Action onClick={() => setOriginal(c => c === 'bar' ? 'foo' : 'bar')}>
					▶️ setOriginal({original === 'bar' ? `'foo'` : `'bar'`})
				</Action>
			</Actions>
		</CodeBlock>
	)
}
