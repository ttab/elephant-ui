# @ttab/elephant-ui

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
