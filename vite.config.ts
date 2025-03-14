import { defineConfig } from 'vite'
import { resolve } from 'path'
import { peerDependencies, dependencies } from './package.json'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { type Plugin } from 'rollup'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from './src/styles/preset'

/*
* Resolve tailwind preset to json file
*/
function resolveTailwindPreset(): Plugin {
  return {
    name: 'TailwindPresetResolver',
    generateBundle() {
      const resolvedTailwindConfig = JSON.stringify(resolveConfig(tailwindConfig), null, 2)
      const outputFile = 'styles/presetResolved.json'
      this.emitFile({ type: 'asset', fileName: outputFile, source: resolvedTailwindConfig })
    }
  }
}

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['./src/**/*']
    }),
    resolveTailwindPreset(),
    viteStaticCopy({
      targets: [
        {
          src: './src/styles/layout-base.css',
          dest: './styles'
        },
        {
          src: './src/styles/preset.ts',
          dest: './styles'
        },
        {
          src: './src/styles/inter.css',
          dest: './styles'
        },
        {
          src: 'node_modules/@fontsource/inter/files/inter-latin-{300,400,500,600,700,800}-normal.{woff,woff2}',
          dest: './styles'
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, './src/index.ts'),
        icons: resolve(__dirname, './src/components/icons/index.ts'),
        utils: resolve(__dirname, './src/lib/utils.ts')
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
