# ElephantUI

## Usage

See contents of the directory `src/components/ui` for available components.

See [shadcn/UI documentation](https://ui.shadcn.com/docs/components/) for usage of available components — or when necessary the local showroom possibilities as described below.

Install in your project using `npm i @ttab/elephant-ui`

## Build styles

In the project in which you are using `elephant-ui` add the following:

`vite.config.ts`

```js
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: './node_modules/@ttab/elephant-ui/dist/styles/**/*.{woff,woff2}',
            dest: './assets'
          }
        ]
      }),
      react(),
      tailwindcss()
    ],
```

Vite plugin `tailwindcss()` will handle the build of the tailwind styles. With HMR during development.

`<projext>/index.css`

```css
@import "tailwindcss";
@import '@ttab/elephant-ui/styles/index.css';

/* Define other packages from which classes should be included in the final CSS */
@source "../node_modules/@ttab/elephant-ui";
@source "../node_modules/@ttab/textbit";

/* Define fonts and paths */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-display: swap;
  font-weight: 300;
  src: url(/elephant/assets/inter-latin-300-normal.woff2) format('woff2'), url(/elephant/assets/inter-latin-300-normal.woff) format('woff');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
```

`<project>/App.tsx` or equivalent entry point

```js
import './index.css'

```

This will import the needed base styles from `elephant-ui` and prepare for the tailwind build.

See complete usage in `elephant-chrome` repo.

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
