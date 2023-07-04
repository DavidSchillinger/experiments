import {Action, Actions, Blocks, Code, CodeBlock, Highlight, Tag} from './blocks'
import {useCallback, useState} from 'react'
import {wait} from './wait'

export function UseMemo() {
	return (
		<Blocks>
			<div style={{display: 'flex', flexDirection: 'column', gap: '1rem', flex: '1 1 0px'}}>
				<CodeBlock title='✅ Expensive computation, with useMemo:'>
					<Code>{`useMemo(() => expensive(), [])`}</Code>
				</CodeBlock>

				<ExpensiveWithUseMemo/>
			</div>

			<div style={{display: 'flex', flexDirection: 'column', gap: '1rem', flex: '1 1 0px'}}>
				<CodeBlock title='❗ Expensive computation, without useMemo:'>
					<Code>{`expensive()`}</Code>
				</CodeBlock>

				<ExpensiveWithoutUseMemo/>
			</div>

			<div style={{width: '100%'}}/>

			<div style={{display: 'flex', flexDirection: 'column', gap: '1rem', flex: '1 1 0px'}}>
				<CodeBlock title='✅ Dependant only re-computes when dependency changes:'>
					<pre>
						<Code>{`// Inside <WithUseMemo/>\n`}</Code>
						<Code>{`const value = useMemo(() => ({name: 'Hello!'}), [])\n\n`}</Code>
						<Code>{`// Inside <Expensive/>\n`}</Code>
						<Code>{`useMemo(() => expensive(value), [value])`}</Code>
					</pre>
				</CodeBlock>

				<UseMemoComputedDependency/>
			</div>

			<div style={{display: 'flex', flexDirection: 'column', gap: '1rem', flex: '1 1 0px'}}>
				<CodeBlock title='❗ Dependant forced to re-compute on every render:'>
					<pre>
						<Code>{`// Inside <WithoutUseMemo/>\n`}</Code>
						<Code>{`const value = {name: 'Hello!'}\n\n`}</Code>
						<Code>{`// Inside <Expensive/>\n`}</Code>
						<Code>{`useMemo(() => expensive(value), [value])`}</Code>
					</pre>
				</CodeBlock>

				<RenderComputedDependency/>
			</div>
		</Blocks>
	)
}

function ExpensiveWithUseMemo() {
	const {highlights, fastRender, slowRender} = useBasicDemoRenderAnimations()

	return (
		<UseMemoDemo
			highlights={highlights}
			expensiveName='WithUseMemo'
			onClickInitialRender={slowRender}
			onClickReRender={fastRender}
		/>
	)
}

function ExpensiveWithoutUseMemo() {
	const {highlights, slowRender} = useBasicDemoRenderAnimations()

	return (
		<UseMemoDemo
			highlights={highlights}
			expensiveName='WithoutUseMemo'
			onClickInitialRender={slowRender}
			onClickReRender={slowRender}
		/>
	)
}

function UseMemoComputedDependency() {
	const {highlights, slowRender, fastRender} = useDependencyDemoRenderAnimations()

	return (
		<UseMemoDependencyDemo
			highlights={highlights}
			computeName='WithUseMemo'
			onClickInitialRender={slowRender}
			onClickReRender={fastRender}
		/>
	)
}

function RenderComputedDependency() {
	const {highlights, slowRender} = useDependencyDemoRenderAnimations()

	return (
		<UseMemoDependencyDemo
			highlights={highlights}
			computeName='WithoutUseMemo'
			onClickInitialRender={slowRender}
			onClickReRender={slowRender}
		/>
	)
}

function UseMemoDependencyDemo(props: {
	highlights: DependencyDemoHighlights,
	computeName: string,
	onClickInitialRender: () => void,
	onClickReRender: () => void,
}) {
	const {highlights, computeName, onClickInitialRender, onClickReRender} = props

	return (
		<CodeBlock>
			<pre>
				<Tag highlight={highlights.outer}>{`<Outer>`}</Tag>
				<Tag highlight={highlights.compute}>{`\t<${computeName}>`}</Tag>
				<Tag highlight={highlights.expensive}>{`\t\t<Expensive>`}</Tag>
				<Tag highlight={highlights.inner}>{`\t\t\t<Inner/>`}</Tag>
				<Tag highlight={highlights.expensive}>{`\t\t</Expensive>`}</Tag>
				<Tag highlight={highlights.compute}>{`\t</${computeName}>`}</Tag>
				<Tag highlight={highlights.outer}>{`</Outer>`}</Tag>
			</pre>

			<Actions>
				<Action onClick={onClickInitialRender}>
					▶️ initial render
				</Action>

				<Action onClick={onClickReRender}>
					▶️ re-render
				</Action>
			</Actions>
		</CodeBlock>
	)
}

function UseMemoDemo(props: {
	highlights: BasicDemoHighlights,
	expensiveName: string,
	onClickInitialRender: () => void,
	onClickReRender: () => void,
}) {
	const {highlights, expensiveName, onClickInitialRender, onClickReRender} = props

	return (
		<CodeBlock>
			<pre>
				<Tag highlight={highlights.outer}>{`<Outer>`}</Tag>
				<Tag highlight={highlights.expensive}>{`\t<${expensiveName}>`}</Tag>
				<Tag highlight={highlights.inner}>{`\t\t<Inner/>`}</Tag>
				<Tag highlight={highlights.expensive}>{`\t</${expensiveName}>`}</Tag>
				<Tag highlight={highlights.outer}>{`</Outer>`}</Tag>
			</pre>

			<Actions>
				<Action onClick={onClickInitialRender}>
					▶️ initial render
				</Action>

				<Action onClick={onClickReRender}>
					▶️ re-render
				</Action>
			</Actions>
		</CodeBlock>
	)
}

type BasicDemoHighlights = {
	outer: Highlight,
	expensive: Highlight,
	inner: Highlight,
}

function useBasicDemoRenderAnimations() {
	const [highlights, setHighlights] = useState<BasicDemoHighlights>({
		outer: false,
		expensive: false,
		inner: false,
	})

	const slowRender = useCallback(
		() => {
			setHighlights({outer: 'rendered', expensive: false, inner: false})

			wait(350).then(() => {
				setHighlights({outer: false, expensive: 'blocking', inner: false})
			})
			.then(() => wait(1000)).then(() => {
				setHighlights({outer: false, expensive: 'rendered', inner: false})
			})
			.then(() => wait(350)).then(() => {
				setHighlights({outer: false, expensive: false, inner: 'rendered'})
			})
			.then(() => wait(350)).then(() => {
				setHighlights({outer: false, expensive: false, inner: false})
			})
		},
		[],
	)

	const fastRender = useCallback(
		() => {
			setHighlights({outer: 'rendered', expensive: false, inner: false})

			wait(350).then(() => {
				setHighlights({outer: false, expensive: 'rendered', inner: false})
			})
			.then(() => wait(350)).then(() => {
				setHighlights({outer: false, expensive: false, inner: 'rendered'})
			})
			.then(() => wait(350)).then(() => {
				setHighlights({outer: false, expensive: false, inner: false})
			})
		},
		[],
	)

	return {
		highlights,
		fastRender,
		slowRender,
	}
}

type DependencyDemoHighlights = {
	outer: Highlight,
	compute: Highlight,
	expensive: Highlight,
	inner: Highlight,
}

function useDependencyDemoRenderAnimations() {
	const [highlights, setHighlights] = useState<DependencyDemoHighlights>({
		outer: false,
		compute: false,
		expensive: false,
		inner: false,
	})

	const slowRender = useCallback(
		() => {
			setHighlights({outer: 'rendered', compute: false, expensive: false, inner: false})

			wait(350).then(() => {
				setHighlights({outer: false, compute: 'rendered', expensive: false, inner: false})
			})
			.then(() => wait(350)).then(() => {
				setHighlights({outer: false, compute: false, expensive: 'blocking', inner: false})
			})
			.then(() => wait(1000)).then(() => {
				setHighlights({outer: false, compute: false, expensive: 'rendered', inner: false})
			})
			.then(() => wait(350)).then(() => {
				setHighlights({outer: false, compute: false, expensive: false, inner: 'rendered'})
			})
			.then(() => wait(350)).then(() => {
				setHighlights({outer: false, compute: false, expensive: false, inner: false})
			})
		},
		[],
	)

	const fastRender = useCallback(
		() => {
			setHighlights({outer: 'rendered', compute: false, expensive: false, inner: false})

			wait(350).then(() => {
				setHighlights({outer: false, compute: 'rendered', expensive: false, inner: false})
			})
			.then(() => wait(350)).then(() => {
				setHighlights({outer: false, compute: false, expensive: 'rendered', inner: false})
			})
			.then(() => wait(350)).then(() => {
				setHighlights({outer: false, compute: false, expensive: false, inner: 'rendered'})
			})
			.then(() => wait(350)).then(() => {
				setHighlights({outer: false, compute: false, expensive: false, inner: false})
			})
		},
		[],
	)

	return {
		highlights,
		fastRender,
		slowRender,
	}
}
