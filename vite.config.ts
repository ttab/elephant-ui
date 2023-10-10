import { defineConfig } from 'vite'
import { resolve } from 'path'
import { peerDependencies, dependencies } from './package.json'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react({
      'jsxRuntime': 'classic',
    }),
    dts({
      include: ['./src/**/*'],
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src")
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (ext) => `elephant-ui.${ext}.js`,
      name: 'ElephantUI'
    },
    rollupOptions: {
      external: [...Object.keys(peerDependencies), ...Object.keys(dependencies)], output: { preserveModules: true, exports: 'named' }
    },
    
    target: 'esnext',
    sourcemap: true
  }
})