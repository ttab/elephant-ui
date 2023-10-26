import { defineConfig } from 'vite'
import { resolve } from 'path'
import { peerDependencies, dependencies } from './package.json'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
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
      entry: {
        "index": resolve(__dirname, './src/index.ts'),
        "icons": resolve(__dirname, './src/components/icons/index.ts'),
      },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}.${format}.js`,
      name: 'ElephantUI'
    },
    rollupOptions: {
      external: [
        ...Object.keys(peerDependencies),
        ...Object.keys(dependencies)],
      output: {
        preserveModules: true,
        exports: 'named'
      }
    },

    target: 'esnext',
    sourcemap: true
  }
})
