import type { Config } from 'tailwindcss'
import preset from './src/styles/preset'
export default {
  presets: [preset],
  darkMode: ['class'],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@ttab/elephant-ui/src/components/ui/**/*.{ts,tsx,js,jsx}'
  ],
  safelist: ['dark']
} satisfies Config
