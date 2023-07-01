import {resolve} from 'node:path'
import {defineConfig} from 'vite'
import typescript from '@rollup/plugin-typescript'
import baseConfig from '../../vite.base.config'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {peerDependencies} from './package.json'

export default defineConfig({
	...baseConfig,
	build: {
		sourcemap: true,
		lib: {
			formats: ['es'],
			entry: resolve(__dirname, 'src/main.tsx'),
			fileName: 'main.esm',
		},
		rollupOptions: {
			external: Object.keys(peerDependencies ?? {}),
			plugins: [typescript({noForceEmit: true})],
		},
	},
})
