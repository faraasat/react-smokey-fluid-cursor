import React from 'react';
import { ISmokeyFluidConfig, FluidHandle } from 'smokey-fluid-cursor';
export { CharacterName, DoubleFBO, FBO, FluidHandle, GL, GLExtInfo, ISmokeyFluidConfig, PaletteName, Preset, PresetName, characterNames, getPreset, initFluid, paletteNames, presetNames, presets } from 'smokey-fluid-cursor';

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

export { SmokeyFluidCursor, type SmokeyFluidCursorProps, useSmokeyFluidCursor };
