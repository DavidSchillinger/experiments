import {resolve} from 'node:path'
import {defineConfig} from 'vite'
import typescript from '@rollup/plugin-typescript'
import baseConfig from '../../vite.base.config'

export default defineConfig({
	...baseConfig,
	build: {
		minify: true,
		sourcemap: true,
		lib: {
			formats: ['es'],
			entry: resolve(__dirname, 'src/main.tsx'),
			fileName: 'main.esm',
		},
		rollupOptions: {
			external: ['react'],
			plugins: [typescript({noForceEmit: true})],
		},
	},
})
