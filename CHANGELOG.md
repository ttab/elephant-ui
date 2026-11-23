# @ttab/elephant-ui

## 2.1.1

### Patch Changes

- dependencies updates:
    - Updated dependency [`@base-ui/react@^1.9.0` ↗︎](https://www.npmjs.com/package/@base-ui/react/v/1.9.0) (from `^1.5.0`, in `dependencies`)

- dependencies updates:
    - Updated dependency [`lucide-react@^1.66.0` ↗︎](https://www.npmjs.com/package/lucide-react/v/1.66.0) (from `^1.33.0`, in `dependencies`)

- dependencies updates:
    - Updated dependency [`tailwind-merge@^3.7.0` ↗︎](https://www.npmjs.com/package/tailwind-merge/v/3.7.0) (from `^3.3.1`, in `dependencies`)

## 2.1.0

### Minor Changes

- `ComboBox` takes an `autoFocus` prop, which focuses its trigger on mount. It
  only moves focus to the button: the popover stays closed until the trigger is
  clicked or Enter/Space is pressed on it, so a form can open on a picker without
  opening the picker itself. The trigger rings on plain `:focus` while the prop is
  set, since focus taken on mount is not `:focus-visible` to a browser that saw
  the mouse open the form.

- `ComboBox` takes a `fitToViewport` prop, which lets its list grow past the
  300px cap to the room between the trigger and the viewport edge, or on a narrow
  screen to the height of the drawer. It still scrolls once that room runs out.
  Meant for short, fixed lists that should show in full.

### Patch Changes

- ComboBox renders a custom trigger on mobile too. The Drawer trigger ignored the children it was given and drew its own label from the selection or placeholder, so a ComboBox with a custom trigger looked right on desktop and wrong on a phone. Both triggers now prefer children where they are given.

## 2.0.0

### Major Changes

- Rebuilt on Base UI, replacing all sixteen Radix primitives, and re-exporting lucide-react 1.x.

  The package surface is unchanged: the same entry points (`.`, `./icons`, `./utils`, `./styles/*`) and the same components, with none added or removed. What changed is how they are implemented and what they accept.

  Breaking:

  - The `asChild` escape hatch is gone. Components that forwarded Radix's `asChild` now take Base UI's `render` prop instead, e.g. `Button` accepts `render?: useRender.RenderProp` from `@base-ui/react/use-render`.
  - `@ttab/elephant-ui/icons` re-exports lucide-react wholesale, so its 0.x to 1.x upgrade reaches consumers directly. Icons renamed or dropped in lucide 1.x are renamed or missing here.
  - Radix prop and ref types no longer appear in the public types. Anything that imported them through this package needs the Base UI equivalent.
  - The `react` and `react-dom` peer floor is now `^19.2.8`.

### Patch Changes

- Moves the package's repository link on GitHub Packages to the monorepo. The manifest already names it; a publish is what makes the registry act on it, and publish permission follows that link.

## 2.0.0-beta.2

### Major Changes

- Rebuilt on Base UI, replacing all sixteen Radix primitives, and re-exporting lucide-react 1.x.

  The package surface is unchanged: the same entry points (`.`, `./icons`, `./utils`, `./styles/*`) and the same components, with none added or removed. What changed is how they are implemented and what they accept.

  Breaking:

  - The `asChild` escape hatch is gone. Components that forwarded Radix's `asChild` now take Base UI's `render` prop instead, e.g. `Button` accepts `render?: useRender.RenderProp` from `@base-ui/react/use-render`.
  - `@ttab/elephant-ui/icons` re-exports lucide-react wholesale, so its 0.x to 1.x upgrade reaches consumers directly. Icons renamed or dropped in lucide 1.x are renamed or missing here.
  - Radix prop and ref types no longer appear in the public types. Anything that imported them through this package needs the Base UI equivalent.
  - The `react` and `react-dom` peer floor is now `^19.2.8`.

### Patch Changes

- Moves the package's repository link on GitHub Packages to the monorepo. The manifest already names it; a publish is what makes the registry act on it, and publish permission follows that link.
