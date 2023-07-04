import type {StorybookConfig} from '@storybook/react-vite'

const config: StorybookConfig = {
	stories: [
		'../packages/**/*.stories.tsx',
		'../packages/**/*.mdx',
		'../storybook/**/*.mdx',
	],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
	],
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
	docs: {
		autodocs: 'tag',
	},
	core: {
		disableTelemetry: true,
	},
}

export default config
