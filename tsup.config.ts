import { defineConfig } from "tsup";
import { glslMinifyPlugin } from "./glsl-minify";

export default defineConfig({
  entry: ["src/index.tsx"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  target: "es2019",
  external: ["react", "react-dom"],

  // Single-entry library: code splitting produces shared chunks that the
  // `banner` below cannot reach, which is how the "use client" directive
  // used to get lost.
  splitting: false,

  // Libraries ship readable code — the consuming app's bundler minifies.
  minify: false,

  // Sourcemaps are deliberately not published: they were ~65% of the install
  // footprint and this build is already readable.
  sourcemap: false,

  shims: false,

  // Shader source is ~40% of this bundle and lives in template literals, which
  // JS minifiers leave untouched. Strip GLSL comments/indentation at build time.
  esbuildPlugins: [glslMinifyPlugin()],

  // NOTE: do not enable tsup's `treeshake`. It runs an extra rollup pass
  // after esbuild that strips this banner, silently shipping a client
  // component without its directive.
  banner: { js: '"use client";' },
});
