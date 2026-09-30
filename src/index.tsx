import React from "react";

import { initFluid } from "./smokey-fluid-cursor";

import { FluidHandle, ISmokeyFluidConfig } from "./types";

export interface SmokeyFluidCursorProps {
  /** Simulation options. See ISmokeyFluidConfig. */
  config?: Partial<ISmokeyFluidConfig>;
  /**
   * Render the effect inside this component's own wrapper element rather than
   * over the whole viewport. Combine with `config.position: "absolute"` to
   * scope the fluid to a section of the page.
   */
  scoped?: boolean;
  /** Class name for the wrapper element (only rendered when `scoped`). */
  className?: string;
  /** Inline styles for the wrapper element (only rendered when `scoped`). */
  style?: React.CSSProperties;
  /** Content to render inside the scoped wrapper. */
  children?: React.ReactNode;
}

/**
 * Options that can be pushed to a running simulation via `setConfig`, rather
 * than requiring a full teardown. Resolution and mounting options are not in
 * this list because they reallocate buffers or move DOM.
 */
const LIVE_TUNABLE = [
  "densityDissipation",
  "velocityDissipation",
  "pressure",
  "pressureIteration",
  "curl",
  "splatRadius",
  "splatForce",
  "shading",
  "colorUpdateSpeed",
  "paused",
  "transparent",
  "backColor",
  "palette",
  "colorIntensity",
  "zIndex",
  "pointerEvents",
  "maxDpr",
  "pauseOnHidden",
  "respectReducedMotion",
] as const satisfies ReadonlyArray<keyof ISmokeyFluidConfig>;

/**
 * Options that require the simulation to be rebuilt when they change.
 * Everything else is pushed through `setConfig`.
 */
const structuralKey = (config?: Partial<ISmokeyFluidConfig>) =>
  JSON.stringify([
    config?.id,
    config?.position,
    config?.className,
    config?.simResolution,
    config?.dyeResolution,
    config?.captureResolution,
  ]);

/**
 * Runs the fluid simulation for the lifetime of the calling component.
 *
 * Returns a ref to the live {@link FluidHandle}, so callers can pause, resume
 * or retune without remounting.
 */
export function useSmokeyFluidCursor(
  config?: Partial<ISmokeyFluidConfig>,
  containerRef?: React.RefObject<HTMLElement | null>
): React.RefObject<FluidHandle | null> {
  const handleRef = React.useRef<FluidHandle | null>(null);

  // Kept in a ref so the effect can read the newest config without listing the
  // whole object as a dependency (it is a fresh reference every render).
  const configRef = React.useRef(config);
  configRef.current = config;

  const key = structuralKey(config);

  React.useEffect(() => {
    const handle = initFluid({
      ...configRef.current,
      ...(containerRef?.current ? { container: containerRef.current } : {}),
    });
    handleRef.current = handle;

    // Without this the simulation keeps its window listeners and its
    // requestAnimationFrame loop running forever. Every remount - including
    // StrictMode's development double-invoke - would stack another one.
    return () => {
      handle.dispose();
      handleRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, containerRef]);

  // Push cheap option changes into the running simulation instead of
  // rebuilding it.
  React.useEffect(() => {
    const handle = handleRef.current;
    if (!handle || !config) return;

    const patch: Partial<ISmokeyFluidConfig> = {};
    for (const k of LIVE_TUNABLE) {
      if (config[k] !== undefined) (patch as Record<string, unknown>)[k] = config[k];
    }
    handle.setConfig(patch);
  });

  return handleRef;
}

/**
 * Drop-in fluid cursor effect.
 *
 * By default it covers the viewport and sits behind your content. Pass
 * `scoped` with `config.position: "absolute"` to confine it to one section.
 */
export const SmokeyFluidCursor = React.forwardRef<
  FluidHandle,
  SmokeyFluidCursorProps
>(function SmokeyFluidCursor(
  { config, scoped = false, className, style, children },
  ref
) {
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const handleRef = useSmokeyFluidCursor(
    config,
    scoped ? wrapperRef : undefined
  );

  // Expose the live handle to the parent, so it can pause/resume/retune.
  // The handle only exists after the mount effect has run, so before that the
  // imperative methods are harmless no-ops rather than a null deref.
  React.useImperativeHandle(
    ref,
    () => ({
      dispose: () => handleRef.current?.dispose(),
      pause: () => handleRef.current?.pause(),
      resume: () => handleRef.current?.resume(),
      isPaused: () => handleRef.current?.isPaused() ?? true,
      setConfig: (patch) => handleRef.current?.setConfig(patch),
      splat: (x, y, color) => handleRef.current?.splat(x, y, color),
      get canvas() {
        return handleRef.current?.canvas ?? null;
      },
    }),
    [handleRef]
  );

  if (!scoped) return null;

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{ position: "relative", overflow: "hidden", ...style }}
    >
      {children}
    </div>
  );
});

export { initFluid };
export type {
  ISmokeyFluidConfig,
  FluidHandle,
  GL,
  GLExtInfo,
  FBO,
  DoubleFBO,
} from "./types";

export {
  presets,
  presetNames,
  paletteNames,
  characterNames,
  getPreset,
} from "./presets";
export type {
  Preset,
  PresetName,
  PaletteName,
  CharacterName,
} from "./presets";
