<p align="center">
  <img src="https://raw.githubusercontent.com/faraasat/react-smokey-fluid-cursor/main/.github/assets/banner.svg" alt="react-smokey-fluid-cursor" width="100%" />
</p>

<p align="center">
  A GPU-accelerated fluid-simulation cursor trail for React and Next.js — one component, no configuration required.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/react-smokey-fluid-cursor"><img alt="npm version" src="https://img.shields.io/npm/v/react-smokey-fluid-cursor?color=cb3837&label=npm&logo=npm"></a>
  <a href="https://www.npmjs.com/package/react-smokey-fluid-cursor"><img alt="downloads" src="https://img.shields.io/npm/dm/react-smokey-fluid-cursor?color=cb3837&label=downloads"></a>
  <a href="https://bundlephobia.com/package/react-smokey-fluid-cursor"><img alt="bundle size" src="https://img.shields.io/bundlephobia/minzip/react-smokey-fluid-cursor?label=minzipped"></a>
  <a href="https://github.com/faraasat/react-smokey-fluid-cursor/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/faraasat/react-smokey-fluid-cursor/actions/workflows/ci.yml/badge.svg"></a>
  <img alt="types" src="https://img.shields.io/badge/types-included-3178c6?logo=typescript&logoColor=white">
  <a href="https://github.com/faraasat/react-smokey-fluid-cursor/blob/main/LICENSE"><img alt="license" src="https://img.shields.io/npm/l/react-smokey-fluid-cursor?color=blue"></a>
</p>

<p align="center">
  <a href="https://faraasat.github.io/react-smokey-fluid-cursor/"><b>Live demo</b></a> ·
  <a href="https://www.npmjs.com/package/react-smokey-fluid-cursor">npm</a> ·
  <a href="https://github.com/faraasat/react-smokey-fluid-cursor/blob/main/CHANGELOG.md">Changelog</a> ·
  <a href="https://github.com/faraasat/react-smokey-fluid-cursor/issues">Issues</a>
</p>

---

## Why

A real-time Navier–Stokes fluid solver running in WebGL, wired to your pointer
and wrapped as a single React component. It cleans up after itself on unmount,
survives React StrictMode's double-invoke, and degrades quietly on devices
without WebGL instead of crashing your page.

> Not using React? See
> [`smokey-fluid-cursor`](https://github.com/faraasat/smokey-fluid-cursor).

## Installation

```bash
npm install react-smokey-fluid-cursor
```

<details>
<summary>yarn / pnpm / bun</summary>

```bash
yarn add react-smokey-fluid-cursor
pnpm add react-smokey-fluid-cursor
bun add react-smokey-fluid-cursor
```
</details>

**Peer dependencies:** `react >= 17`, `react-dom >= 17`.

## Quick start

```tsx
import { SmokeyFluidCursor } from "react-smokey-fluid-cursor";

export default function Layout({ children }) {
  return (
    <>
      <SmokeyFluidCursor />
      {children}
    </>
  );
}
```

That is the whole integration. The component renders nothing itself — it
creates a `fixed`, full-viewport canvas behind your content with
`pointer-events: none`, and tears it down on unmount.

> **Next.js App Router:** the package ships the `"use client"` directive, so it
> can be imported straight into a server component.

## Scope it to one section

Pass `scoped` and an `absolute` position, and the effect stays inside the
component's own wrapper instead of covering the page:

```tsx
<SmokeyFluidCursor
  scoped
  style={{ height: 320, borderRadius: 16 }}
  config={{ position: "absolute", zIndex: 0, palette: ["#4ea8ff", "#7c4dff"] }}
>
  <h2>Hover me</h2>
</SmokeyFluidCursor>
```

When `scoped`, the wrapper gets `position: relative` and `overflow: hidden`
automatically, so the fluid is clipped to it.

## Controlling it

Grab a ref for a live handle — pause, resume or retune without remounting:

```tsx
import { useRef } from "react";
import { SmokeyFluidCursor } from "react-smokey-fluid-cursor";
import type { FluidHandle } from "react-smokey-fluid-cursor";

function Page() {
  const fluid = useRef<FluidHandle>(null);

  return (
    <>
      <SmokeyFluidCursor ref={fluid} />
      <button onClick={() => fluid.current?.pause()}>Pause</button>
      <button onClick={() => fluid.current?.setConfig({ curl: 30 })}>Swirl</button>
    </>
  );
}
```

| Method | Description |
| --- | --- |
| `pause()` / `resume()` | Freeze or restart the simulation. |
| `isPaused()` | Current state. |
| `setConfig(partial)` | Retune in place, no remount. |
| `splat(x, y, color?)` | Inject a splash, in CSS pixels relative to the canvas. |
| `dispose()` | Tear down early (the component already does this on unmount). |
| `canvas` | The canvas being rendered into. |

### The hook

For full control over where the effect lives:

```tsx
import { useSmokeyFluidCursor } from "react-smokey-fluid-cursor";

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  useSmokeyFluidCursor({ position: "absolute" }, ref);
  return <div ref={ref} style={{ position: "relative", height: 300 }} />;
}
```

## Updating config

Cheap options (`curl`, `splatForce`, `palette`, `colorIntensity`, dissipation,
`paused`, `zIndex`, …) are pushed straight into the running simulation.

Structural options (`id`, `position`, `simResolution`, `dyeResolution`) rebuild
it, because they reallocate buffers or move DOM. Changing those every render
would be expensive, so keep them stable.

## Configuration

Every option is optional.

### Mounting & placement

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `container` | `HTMLElement \| string` | `document.body` | Where to create the canvas. Set automatically when `scoped`. |
| `canvas` | `HTMLCanvasElement \| string` | — | Render into an existing canvas instead. |
| `id` | `string` | `"smokey-fluid-canvas"` | Id assigned to the canvas. |
| `position` | `"fixed" \| "absolute" \| "relative" \| "static"` | `"fixed"` | `absolute` confines the effect to its container. |
| `zIndex` | `number` | `-9999` | Stacking order. |
| `pointerEvents` | `boolean` | `false` | Whether the canvas swallows clicks. |
| `className` | `string` | — | Extra class on the canvas. |

### Performance & accessibility

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `maxDpr` | `number` | `2` | Caps the device pixel ratio. Uncapped, a 3x phone renders **nine times** the pixels of a 1x display. |
| `pauseOnHidden` | `boolean` | `true` | Stop the loop while the tab is backgrounded. |
| `respectReducedMotion` | `boolean` | `true` | Start paused for `prefers-reduced-motion: reduce`. |
| `paused` | `boolean` | `false` | Start frozen. |

### Appearance

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `palette` | `string[]` | `null` | Hex colours to draw from, e.g. `["#ff4ecd"]`. Omit for random hues. |
| `colorIntensity` | `number` | `0.15` | Brightness multiplier. |
| `backColor` | `{ r, g, b }` | `{ r: 0, g: 0, b: 0 }` | Canvas background. |
| `transparent` | `boolean` | `true` | Blend with the page background. |
| `shading` | `boolean` | `true` | Lighting, for depth. |
| `colorUpdateSpeed` | `number` | `10` | How fast the palette rotates. |

### Simulation

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `simResolution` | `number` | `128` | Velocity/pressure grid. |
| `dyeResolution` | `number` | `1440` | Colour buffer resolution — the main quality/cost dial. |
| `densityDissipation` | `number` | `3.5` | How fast colour fades. |
| `velocityDissipation` | `number` | `2` | How fast motion slows. |
| `pressure` | `number` | `0.1` | Initial pressure multiplier. |
| `pressureIteration` | `number` | `20` | Jacobi iterations. |
| `curl` | `number` | `10` | Vorticity confinement — the swirliness. |
| `splatRadius` | `number` | `0.5` | Size of each splat. |
| `splatForce` | `number` | `6000` | Force per splat. |

## Lifecycle

On unmount the component stops the render loop, detaches its window listeners,
releases the WebGL context and removes the canvas it created. Mounting and
unmounting repeatedly — including StrictMode's development double-invoke —
does not stack simulations.

## Performance

The big levers, in order of impact:

1. **`maxDpr`** — already capped at `2`. Drop to `1` for the weakest devices.
2. **`dyeResolution`** — `512` is much cheaper and still looks good.
3. **`pressureIteration`** — `10` roughly halves the solver cost.

```tsx
<SmokeyFluidCursor config={{ maxDpr: 1, dyeResolution: 512, pressureIteration: 10 }} />
```

## Accessibility

A full-screen animation is a real problem for people with vestibular
disorders. By default this honours `prefers-reduced-motion: reduce` by starting
paused, and reacts if the preference changes while the page is open.

## Browser support

Requires WebGL (WebGL 2 when available, WebGL 1 fallback). Without it the
component logs a warning and renders nothing — it never throws, so a decorative
effect cannot take down your app.

## Contributing

Issues and pull requests are welcome.

```bash
git clone https://github.com/faraasat/react-smokey-fluid-cursor.git
cd react-smokey-fluid-cursor
npm install
npm test          # vitest unit tests
npm run typecheck # tsc --noEmit
npm run build     # tsup
```

End-to-end tests run against the built demo in a real browser (desktop and
mobile viewports), and cover the things unit tests cannot: layout, CSS and
keyboard behaviour.

```bash
npm run build && npm --prefix example install && npm --prefix example run build
npm run test:e2e      # playwright
npm run test:e2e:ui   # interactive
```

To run the demo site against your local build:

```bash
npm run example:dev
```

Releases are manual — nothing publishes on a push to `main`. Maintainers run
the **Release** workflow from the Actions tab.

## Privacy

The published package contains **no telemetry**. The demo site at
[faraasat.github.io/react-smokey-fluid-cursor](https://faraasat.github.io/react-smokey-fluid-cursor/) uses
Google Analytics and Aptabase; the library itself never phones home.

## License

[MIT](./LICENSE) © [Farasat Ali](https://github.com/faraasat)
