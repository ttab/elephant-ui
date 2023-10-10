# ElephantUI

## Usage
See contents of the directory `src/components/ui` for available components.

See [shadcn/UI documentation](https://ui.shadcn.com/docs/components/) for usage of available components — or when necessary the local showroom possibilities as described below.

Import in your project using `npm i @ttab/elephant-ui`


## Adding components
See available components at [shadcn/UI documentation](https://ui.shadcn.com/docs/components/).ß

1. Use for example `npx shadcn-ui@latest add accordion` to add an accordion.
2. Open the `src/components/ui/accordion.tsx` file and change import of `cn` to be `import { cn } from "@/lib/utils"`.

## Showcasing components during development

Add component examples and usage in `src/showroom/components` and import into ``src/showroom/app.tsx`.

Run `npm run dev` and open given url in your local browser to see example of how we could have a local testbed while developing.

_This might not be necessary unless we change de shadcn/ui default code/usage. And on the other hand it might not be sufficient in the future..._