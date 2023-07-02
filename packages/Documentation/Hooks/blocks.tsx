import {CSSProperties, ReactNode} from 'react'

const codeBlockStyle: CSSProperties = {
	display: 'flex',
	gap: '1.5rem',
	background: '#1B1C1D',
	border: '1px solid rgba(255,255,255,.1)',
	borderRadius: '4px',
	padding: '20px',
	maxWidth: 'fit-content',
	boxShadow: 'rgba(0, 0, 0, 0.20) 0 2px 5px 0',
	position: 'relative',
}

const codeBlockTitleStyle: CSSProperties = {
	color: 'whitesmoke',
	marginBottom: '0.25rem',
}

export function CodeBlock(props: {children: ReactNode, title?: string}) {
	const {children, title} = props

	return (
		<div>
			{title && (
				<div style={codeBlockTitleStyle}>
					{title}
				</div>
			)}

			<div style={codeBlockStyle}>
				{children}
			</div>
		</div>
	)
}

export type Highlight = false | 'blocking' | 'rendered'

const tagStyle = (highlight: Highlight) => {
	return ({
		tabSize: 4,
		display: 'block',
		color: color(),
		transition: 'color 350ms',
	})

	function color(): string {
		if (!highlight) return 'rgb(85, 181, 219)'
		if (highlight === 'blocking') return 'rgb(205, 63, 69)'
		if (highlight === 'rendered') return 'yellow'
	}
}

export function Tag(props: {children: ReactNode, highlight: false | 'blocking' | 'rendered'}) {
	const {children, highlight} = props

	return (
		<code style={tagStyle(highlight)}>
			{children}
		</code>
	)
}

const textStyle: CSSProperties = {
	color: 'whitesmoke',
}

export function Text(props: {children: ReactNode, style?: CSSProperties}) {
	const {children, style} = props

	return (
		<span style={{...textStyle, ...style}}>
			{children}
		</span>
	)
}

const codeStyle: CSSProperties = {
	...textStyle,
	color: 'whitesmoke',
}

export function Code(props: {children: ReactNode}) {
	const {children} = props

	return (
		<code style={codeStyle}>
			{children}
		</code>
	)
}

const actionStyle: CSSProperties = {
	color: 'whitesmoke',
	border: 0,
	background: 'transparent',
	padding: '0.25rem',
	cursor: 'pointer',
}

export function Action(props: {children: ReactNode, onClick: () => void}) {
	const {children, onClick} = props

	return (
		<button
			type='button'
			style={actionStyle}
			onClick={onClick}
		>
			<code>{children}</code>
		</button>
	)
}

const actionsStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'start',
}

export function Actions(props: {children: ReactNode}) {
	const {children} = props

	return (
		<div style={actionsStyle}>
			{children}
		</div>
	)
}

const blocksStyle: CSSProperties = {
	display: 'flex',
	gap: '1rem',
	flexWrap: 'wrap',
}

export function Blocks(props: {children: ReactNode}) {
	const {children} = props

	return (
		<div style={blocksStyle}>
			{children}
		</div>
	)
}
