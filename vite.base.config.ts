/// <reference types="vitest" />

import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'


// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	define: {
		'import.meta.vitest': 'undefined',
	},
	test: {
		environment: 'happy-dom',
		includeSource: ['src/**/*.{ts,tsx}'],
	},
})
