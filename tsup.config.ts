import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.tsx"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  target: "es2019",
  external: ["react", "react-dom"],
  splitting: false,
  minify: false,
  sourcemap: true,
  shims: false,
  // NOTE: do not enable tsup's `treeshake`. It runs an extra rollup pass
  // after esbuild that strips this banner, silently shipping a client
  // component without its directive. esbuild already tree-shakes the bundle.
  banner: { js: '"use client";' },
});
