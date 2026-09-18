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

That is the whole integration. The canvas is positioned `fixed`,
full-viewport, `pointer-events: none` and `z-index: -9999`, so it sits behind
your content and never intercepts clicks.

> **Next.js App Router:** the package ships the `"use client"` directive, so it
> can be imported straight into a server component.

## Configuration

Every field is optional.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `string` | `"smokey-fluid-canvas"` | Id of the rendered canvas. Changing it restarts the simulation. |
| `simResolution` | `number` | `128` | Velocity/pressure grid. Lower is faster and coarser. |
| `dyeResolution` | `number` | `1440` | Colour buffer resolution. The main quality/cost dial. |
| `densityDissipation` | `number` | `3.5` | How fast colour fades. Higher fades sooner. |
| `velocityDissipation` | `number` | `2` | How fast motion slows. |
| `pressure` | `number` | `0.1` | Initial pressure multiplier. |
| `pressureIteration` | `number` | `20` | Jacobi iterations. Higher is more accurate, slower. |
| `curl` | `number` | `10` | Vorticity confinement — the swirliness. |
| `splatRadius` | `number` | `0.5` | Size of each pointer splat. |
| `splatForce` | `number` | `6000` | Force applied per splat. |
| `shading` | `boolean` | `true` | Lighting for a sense of depth. |
| `colorUpdateSpeed` | `number` | `10` | How fast the palette rotates. |
| `backColor` | `{ r, g, b }` | `{ r: 0, g: 0, b: 0 }` | Canvas background. |
| `transparent` | `boolean` | `true` | Blend with the page background. |
| `paused` | `boolean` | `false` | Freeze the simulation. |

```tsx
<SmokeyFluidCursor
  config={{ curl: 30, splatForce: 9000, densityDissipation: 2 }}
/>
```

### Changing config at runtime

The simulation is expensive to build, so it is not rebuilt when `config`
changes. To apply a new configuration, remount the component with a `key`:

```tsx
<SmokeyFluidCursor key={preset} config={PRESETS[preset]} />
```

## Lifecycle

On unmount the component stops the render loop, detaches its window listeners
and releases the WebGL context. Mounting and unmounting repeatedly — including
StrictMode's development double-invoke — does not stack simulations.

## Performance

The defaults target a modern desktop GPU. On lower-powered devices, drop
`dyeResolution` to `512` and `pressureIteration` to `10`. Quality is lowered
automatically when the GPU lacks linear filtering for float textures.

## Browser support

Requires WebGL (WebGL 2 when available, with a WebGL 1 fallback). Without it the
component logs a warning, renders an inert canvas, and never throws — so a
decorative effect can't take down your app.

## Contributing

Issues and pull requests are welcome.

```bash
git clone https://github.com/faraasat/react-smokey-fluid-cursor.git
cd react-smokey-fluid-cursor
npm install
npm test          # vitest
npm run typecheck # tsc --noEmit
npm run build     # tsup
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
