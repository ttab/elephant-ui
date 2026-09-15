import { defineConfig } from 'vite'
import { resolve } from 'path'
import pkg from './package.json' with { type: 'json' }
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['./src/**/*'],
      exclude: ['./src/**/*.test.ts', './src/**/*.test.tsx', './src/test/**']
    }),
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: './src/styles/index.css',
          dest: './styles',
          rename: { stripBase: true }
        },
        {
          src: './node_modules/@fontsource/inter/files/inter-latin-{300,400,500,600,700,800}-normal.{woff,woff2}',
          dest: './styles',
          rename: { stripBase: true }
        },
        {
          src: 'src/types/lucide-react.d.ts',
          dest: 'components/icons',
          rename: { stripBase: true, name: 'index.d.ts' }
        }

      ]
    })
  ],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, './src')
    },
    dedupe: [
      'react',
      'react-dom',
      'react/jsx-runtime'
    ]
  },
  build: {
    lib: {
      entry: {
        index: resolve(import.meta.dirname, './src/index.ts'),
        icons: resolve(import.meta.dirname, './src/components/icons/index.ts'),
        utils: resolve(import.meta.dirname, './src/lib/utils.ts')
      },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}.${format}.js`,
      name: 'ElephantUI'
    },
    rollupOptions: {
      external: (id) => {
        const externals = [
          ...Object.keys(pkg.peerDependencies),
          ...Object.keys(pkg.dependencies)
        ]
        return externals.some((name) => id === name || id.startsWith(`${name}/`))
      },
      output: {
        exports: 'named'
      }
    },

    target: 'esnext',
    sourcemap: true
  }
})
