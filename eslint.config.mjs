import elephant from '@ttab/eslint-config-elephant'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default [
  ...elephant,
  {
    settings: {
      react: {
        version: '19'
      }
    }
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: false,
        project: './tsconfig.json',
        tsconfigRootDir: __dirname
      }
    }
  }
]
