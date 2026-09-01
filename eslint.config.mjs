import elephant from '../../eslint.config.base.mjs'

export default [
  ...elephant,
  {
    files: ['src/showroom/**'],
    rules: {
      'i18next/no-literal-string': 'off'
    }
  }
]
