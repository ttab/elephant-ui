# ElephantUI

## Usage
See contents of the directory `src/components/ui` for available components.

See [shadcn/UI documentation](https://ui.shadcn.com/docs/components/) for usage of available components — or when necessary the local showroom possibilities as described below.

Install in your project using `npm i @ttab/elephant-ui`

## Build styles
In the project in which you are using `elephant-ui` add the following:

`tailwind.config.ts`
```js
import preset from '@ttab/elephant-ui/styles/preset'
export default {
  presets: [preset],
  content: [
    './src/**/*.{html,tsx}',
    './node_modules/@ttab/elephant-ui/dist/src/components/ui/*.js'
  ],
  theme: {
    extend: {}
  },
  plugins: []
} satisfies Config

```
This will add the needed preset from `elephant-ui` and add the needed paths to the `content` array.

`input.css`
```css
@import '@ttab/elephant-ui/dist/styles/layout-base.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

```
This will import the needed base styles from `elephant-ui` and add the needed `tailwind` directives.

## Import
```typescript
// Components
import { Button } from '@ttab/elephant-ui'
// Icons
import { Waves } from '@ttab/elephant-ui/icons'
// Utils
import { cn } from '@ttab/elephant-ui/lib/utils'
```
## Icons
Icons are from [lucide-react](https://lucide.dev/icons/).

## Adding additional components
See available components at [shadcn/UI documentation](https://ui.shadcn.com/docs/components/).

1. Use for example `npx shadcn-ui@latest add accordion` to add an accordion.
2. Open the `src/components/ui/accordion.tsx` file and change import of `cn` to be `import { cn } from "@/lib/utils"`.

## Showcasing components during development

Add component examples and usage in `src/showroom/components` and import into ``src/showroom/app.tsx`.

Run `npm run dev` and open given url in your local browser to see example of how we could have a local testbed while developing.

_This might not be necessary unless we change the shadcn/ui default code/usage. And on the other hand it might not be sufficient in the future..._
