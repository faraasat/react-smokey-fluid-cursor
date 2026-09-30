import React from 'react';

/**
 * This file defines the foundational TypeScript interfaces
 * and type aliases used throughout the Smokey Fluid simulation engine.
 *
 * It abstracts WebGL object types (FBOs, textures, uniforms, etc.)
 * to provide clear, type-safe contracts for interacting with GPU resources.
 *
 * Developers integrating or extending this package should primarily
 * adjust configuration options defined in `ISmokeyFluidConfig`.
 */
/**
 * Generic alias for either WebGL1 or WebGL2 rendering contexts.
 *
 * - WebGLRenderingContext → legacy WebGL1 API
 * - WebGL2RenderingContext → modern API with extended texture formats and MRT support
 *
 * This alias allows code to remain compatible across both WebGL versions.
 */
type GL = WebGLRenderingContext | WebGL2RenderingContext;
/**
 * Describes a format pair used for texture or renderbuffer configuration.
 *
 * - `internalFormat`: how GPU stores the texture internally (e.g., RGBA16F)
 * - `format`: how the data is laid out when uploading pixels (e.g., RGBA)
 *
 * Used for compatibility mapping between WebGL1 and WebGL2.
 */
interface GLFormat {
    internalFormat: number;
    format: number;
}
/**
 * Represents detected WebGL extension and format capabilities
 * for the current context. This allows the engine to dynamically
 * choose the optimal texture formats and filtering modes.
 *
 * Usually populated at initialization after checking for extensions like:
 * - OES_texture_half_float
 * - OES_texture_float_linear
 * - EXT_color_buffer_float
 */
interface GLExtInfo {
    /** Supported RGBA floating-point texture format */
    formatRGBA: GLFormat | null;
    /** Supported RG (two-channel) texture format (WebGL2 only) */
    formatRG: GLFormat | null;
    /** Supported R (single-channel) texture format (WebGL2 only) */
    formatR: GLFormat | null;
    /** GL constant for HALF_FLOAT type (e.g., gl.HALF_FLOAT_OES) */
    halfFloatTexType: number;
    /** Whether linear filtering (smooth interpolation) for float textures is available */
    supportLinearFiltering: boolean;
    /** True if running on WebGL2 (vs WebGL1 + extensions) */
    isWebGL2: boolean;
}
/**
 * Framebuffer Object (FBO) descriptor — wraps a texture and its framebuffer target.
 *
 * Each FBO represents a GPU render target that can store color or data fields
 * (such as velocity, pressure, or density in fluid simulation).
 */
interface FBO {
    /** GPU texture attached to the framebuffer */
    texture: WebGLTexture | null;
    /** The framebuffer object itself */
    fbo: WebGLFramebuffer | null;
    /** Width of the texture in pixels */
    width: number;
    /** Height of the texture in pixels */
    height: number;
    /** Normalized texel size (1 / width) */
    texelSizeX: number;
    /** Normalized texel size (1 / height) */
    texelSizeY: number;
    /**
     * Binds this FBO's texture to a given texture unit (slot).
     * Returns the bound texture unit index for convenience.
     *
     * Example:
     * ```ts
     * const unit = velocityFBO.attach(0); // binds to TEXTURE0
     * gl.uniform1i(uniforms.uVelocity, unit);
     * ```
     */
    attach(id: number): number;
}
/**
 * Represents a double-buffered framebuffer system.
 *
 * Used heavily in fluid simulations to "ping-pong" between two framebuffers:
 * - One for reading previous state
 * - One for writing the next frame
 *
 * After each simulation step, `swap()` is called to exchange them.
 */
interface DoubleFBO {
    /** Buffer width in pixels */
    width: number;
    /** Buffer height in pixels */
    height: number;
    /** Normalized texel size (1 / width) */
    texelSizeX: number;
    /** Normalized texel size (1 / height) */
    texelSizeY: number;
    /** Framebuffer currently used for reading */
    read: FBO;
    /** Framebuffer currently used for writing */
    write: FBO;
    /** Swaps read/write buffers for next iteration */
    swap(): void;
}
/**
 * ---------------------------------------------------------
 * 🔧 Smokey Fluid Configuration
 * ---------------------------------------------------------
 *
 * This interface defines **all configurable simulation parameters**
 * that can be customized externally (e.g., by UI, app settings, or user code).
 *
 * Each property controls a different aspect of the fluid’s physics,
 * rendering behavior, or visual appearance.
 */
interface ISmokeyFluidConfig {
    /** Simulation grid resolution for velocity/pressure fields (lower = faster but coarser) */
    simResolution: number;
    /** Visual color/dye buffer resolution (affects rendering detail) */
    dyeResolution: number;
    /** Resolution used for high-quality screenshots or recording */
    captureResolution: number;
    /** Rate at which color fades from the fluid (higher = faster fade) */
    densityDissipation: number;
    /** Rate at which velocity energy dissipates (higher = faster slowdown) */
    velocityDissipation: number;
    /** Initial pressure clear multiplier (affects stability of solver) */
    pressure: number;
    /** Number of Jacobi iterations when solving pressure (higher = more accurate but slower) */
    pressureIteration: number;
    /** Strength of vorticity confinement (adds swirling, curl-like motion) */
    curl: number;
    /** Base normalized radius of user splats (0–1 range relative to screen size) */
    splatRadius: number;
    /** Force multiplier applied when user interacts (e.g., mouse/touch input) */
    splatForce: number;
    /** Enable or disable lighting/shading effects for visual depth */
    shading: boolean;
    /** Speed at which the dynamic color palette rotates during simulation */
    colorUpdateSpeed: number;
    /** If true, pauses the main simulation loop (used for debugging or static rendering) */
    paused: boolean;
    /**
     * Canvas background color (can be in 0–1 normalized range or 0–255)
     * Example: `{ r: 0, g: 0, b: 0 }` for black.
     */
    backColor: {
        r: number;
        g: number;
        b: number;
    };
    /**
     * Determines whether the canvas should preserve alpha transparency.
     * If `true`, blending with HTML backgrounds is allowed.
     */
    transparent: boolean;
    /**
     * ID assigned to the canvas element.
     * Default is "smokey-fluid-canvas".
     */
    id: string;
    /**
     * An existing canvas to render into — an element, or a CSS selector.
     *
     * Takes precedence over `id` and `container`. Use this when the canvas is
     * already part of your markup or managed by a framework.
     */
    canvas?: HTMLCanvasElement | string | null;
    /**
     * Element (or CSS selector) to create the canvas inside, when no canvas
     * matches `canvas`/`id` yet.
     *
     * Defaults to `document.body`, which with `position: "fixed"` gives the
     * classic full-viewport effect. Point it at a section to scope the effect
     * to just that area.
     */
    container?: HTMLElement | string | null;
    /**
     * CSS position for the canvas. Use `"absolute"` to confine the effect to a
     * positioned container; `"fixed"` covers the viewport. Default `"fixed"`.
     */
    position: "fixed" | "absolute" | "static" | "relative";
    /** Stacking order of the canvas. Default `-9999` (behind page content). */
    zIndex: number;
    /**
     * Whether the canvas receives pointer events. Default `false`, so clicks
     * pass straight through to your UI.
     */
    pointerEvents: boolean;
    /** Extra class name applied to the canvas element. */
    className?: string;
    /**
     * Upper bound on the device pixel ratio used for the render buffers.
     *
     * Default `2`. Uncapped, a 3x phone renders nine times the pixels of a 1x
     * display for a purely decorative effect, which drains battery and drops
     * frame rate.
     */
    maxDpr: number;
    /**
     * Pause the simulation while the page is hidden (background tab). Default
     * `true` — an invisible animation should not burn CPU or battery.
     */
    pauseOnHidden: boolean;
    /**
     * Honour the `prefers-reduced-motion` media query. When the visitor has
     * asked for reduced motion the simulation starts paused. Default `true`.
     */
    respectReducedMotion: boolean;
    /**
     * Colour palette for the fluid, as CSS hex strings (e.g. `["#ff4ecd"]`).
     *
     * When omitted, colours are generated randomly across the full hue range,
     * which is the original behaviour.
     */
    palette?: string[] | null;
    /**
     * Brightness multiplier applied to generated colours. Default `0.15`;
     * raise it for a more saturated, higher-contrast trail.
     */
    colorIntensity: number;
}
/**
 * Controls returned by {@link initFluid}.
 */
interface FluidHandle {
    /** Stop the render loop, detach listeners and release the GL context. */
    dispose(): void;
    /** Pause the simulation, leaving the canvas in place. */
    pause(): void;
    /** Resume after {@link FluidHandle.pause}. */
    resume(): void;
    /** Whether the simulation is currently paused. */
    isPaused(): boolean;
    /**
     * Update tunable options in place, without tearing the simulation down.
     *
     * Resolution options (`simResolution`, `dyeResolution`) reallocate the
     * framebuffers; everything else applies on the next frame.
     */
    setConfig(partial: Partial<ISmokeyFluidConfig>): void;
    /**
     * Inject a splash at a point, in CSS pixels relative to the canvas.
     * Useful for driving the effect from something other than the pointer.
     */
    splat(x: number, y: number, color?: {
        r: number;
        g: number;
        b: number;
    }): void;
    /** The canvas being rendered into. */
    readonly canvas: HTMLCanvasElement | null;
}

/**
 * Initializes and starts the fluid simulation
 * @param incomingConfig - Partial configuration object to override default settings
 */
declare const initFluid: (incomingConfig?: Partial<ISmokeyFluidConfig>) => FluidHandle;

/**
 * A named, ready-made configuration.
 *
 * Presets only set appearance and physics — never mounting or placement — so
 * they compose with whatever `canvas`, `container` or `zIndex` you pass.
 */
type Preset = Pick<Partial<ISmokeyFluidConfig>, "palette" | "colorIntensity" | "colorUpdateSpeed" | "curl" | "splatForce" | "splatRadius" | "densityDissipation" | "velocityDissipation" | "pressure" | "pressureIteration" | "shading">;
/**
 * The colour side of a preset.
 *
 * `null` means "no palette": hues are generated across the full spectrum,
 * which is the library's default behaviour.
 */
declare const palettes: {
    readonly Spectrum: null;
    readonly Sunset: readonly ["#ff4ecd", "#ff8a4e", "#ffd24e"];
    readonly Ocean: readonly ["#4ea8ff", "#4effd2", "#7c4dff"];
    readonly Mono: readonly ["#ffffff"];
    readonly Aurora: readonly ["#3affa3", "#38d9ff", "#8f7bff"];
    readonly Ember: readonly ["#ff5722", "#ff9100", "#ffc400"];
    readonly Lagoon: readonly ["#00c2a8", "#00a3ff", "#0057d9"];
    readonly Candy: readonly ["#ff8fd0", "#ffa9f0", "#c79bff"];
    readonly Toxic: readonly ["#b6ff00", "#4dff88", "#00ffc8"];
    readonly Royal: readonly ["#5b2bff", "#8f4dff", "#c44dff"];
    readonly Sakura: readonly ["#ffc2dd", "#ff8fb1", "#ff6f91"];
    readonly Mint: readonly ["#9cffd6", "#5ef2c0", "#2fd6a5"];
    readonly Copper: readonly ["#ff9a5a", "#e2703a", "#b34700"];
    readonly Ultraviolet: readonly ["#7b2cff", "#b429ff", "#ff29f0"];
    readonly Ice: readonly ["#c9f0ff", "#8ad4ff", "#4fb3ff"];
    readonly Magma: readonly ["#ff2d2d", "#ff6a00", "#ffb300"];
    readonly Forest: readonly ["#2f9e44", "#69db7c", "#a9e34b"];
    readonly Dusk: readonly ["#3b3b98", "#7158e2", "#cd84f1"];
    readonly Cyber: readonly ["#00fff0", "#ff00e0", "#fffb00"];
    readonly Pastel: readonly ["#ffd6e0", "#c7ceea", "#b5ead7"];
};
/**
 * The motion side of a preset — how the fluid moves, independent of colour.
 */
declare const characters: {
    readonly Calm: {
        readonly curl: 3;
        readonly splatForce: 4200;
        readonly splatRadius: 0.45;
        readonly densityDissipation: 4.6;
        readonly velocityDissipation: 2.6;
        readonly pressureIteration: 16;
        readonly colorUpdateSpeed: 6;
    };
    readonly Flow: {
        readonly curl: 10;
        readonly splatForce: 6000;
        readonly splatRadius: 0.5;
        readonly densityDissipation: 3.5;
        readonly velocityDissipation: 2;
        readonly pressureIteration: 20;
        readonly colorUpdateSpeed: 10;
    };
    readonly Swirl: {
        readonly curl: 24;
        readonly splatForce: 7200;
        readonly splatRadius: 0.55;
        readonly densityDissipation: 3;
        readonly velocityDissipation: 1.6;
        readonly pressureIteration: 24;
        readonly colorUpdateSpeed: 12;
    };
    readonly Storm: {
        readonly curl: 40;
        readonly splatForce: 9500;
        readonly splatRadius: 0.65;
        readonly densityDissipation: 2.2;
        readonly velocityDissipation: 1.2;
        readonly pressureIteration: 28;
        readonly colorUpdateSpeed: 16;
    };
    readonly Wisp: {
        readonly curl: 6;
        readonly splatForce: 3200;
        readonly splatRadius: 0.32;
        readonly densityDissipation: 6.5;
        readonly velocityDissipation: 3.4;
        readonly pressureIteration: 12;
        readonly colorUpdateSpeed: 8;
    };
};
type PaletteName = keyof typeof palettes;
type CharacterName = keyof typeof characters;
type PresetName = `${PaletteName} ${CharacterName}`;
/**
 * 100 ready-made looks: every colour palette crossed with every motion
 * character, named `"<Palette> <Character>"` — e.g. `"Ocean Swirl"`.
 *
 * ```ts
 * import { initFluid, presets } from "smokey-fluid-cursor";
 *
 * initFluid(presets["Ocean Swirl"]);
 * ```
 */
declare const presets: Record<PresetName, Preset>;
/** Every preset name, in definition order. */
declare const presetNames: PresetName[];
/** The palette names presets are built from. */
declare const paletteNames: PaletteName[];
/** The motion characters presets are built from. */
declare const characterNames: CharacterName[];
/** Looks up a preset by name, returning `undefined` when it does not exist. */
declare const getPreset: (name: string) => Preset | undefined;

interface SmokeyFluidCursorProps {
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
 * Runs the fluid simulation for the lifetime of the calling component.
 *
 * Returns a ref to the live {@link FluidHandle}, so callers can pause, resume
 * or retune without remounting.
 */
declare function useSmokeyFluidCursor(config?: Partial<ISmokeyFluidConfig>, containerRef?: React.RefObject<HTMLElement | null>): React.RefObject<FluidHandle | null>;
/**
 * Drop-in fluid cursor effect.
 *
 * By default it covers the viewport and sits behind your content. Pass
 * `scoped` with `config.position: "absolute"` to confine it to one section.
 */
declare const SmokeyFluidCursor: React.ForwardRefExoticComponent<SmokeyFluidCursorProps & React.RefAttributes<FluidHandle>>;

export { type CharacterName, type DoubleFBO, type FBO, type FluidHandle, type GL, type GLExtInfo, type ISmokeyFluidConfig, type PaletteName, type Preset, type PresetName, SmokeyFluidCursor, type SmokeyFluidCursorProps, characterNames, getPreset, initFluid, paletteNames, presetNames, presets, useSmokeyFluidCursor };
