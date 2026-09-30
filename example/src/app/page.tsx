"use client";

import { useMemo, useRef, useState } from "react";
import { SmokeyFluidCursor, presets, presetNames, paletteNames, characterNames } from "react-smokey-fluid-cursor";
import type { FluidHandle, Preset, PresetName } from "react-smokey-fluid-cursor";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";
import { Code } from "@/components/code";
import { track } from "@/components/analytics";

export default function Home() {
  const fluid = useRef<FluidHandle>(null);
  const [paused, setPaused] = useState(false);
  const [preset, setPreset] = useState<PresetName>("Spectrum Flow");
  const [query, setQuery] = useState("");
  const [curl, setCurl] = useState<number | null>(null);
  const [intensity, setIntensity] = useState<number | null>(null);

  /** Drives both the full-page effect and the scoped one below. */
  const active: Preset = useMemo(() => {
    const base = presets[preset];
    return {
      ...base,
      ...(curl !== null ? { curl } : {}),
      ...(intensity !== null ? { colorIntensity: intensity } : {}),
    };
  }, [preset, curl, intensity]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? presetNames.filter((n) => n.toLowerCase().includes(q)) : presetNames;
  }, [query]);

  const choose = (name: PresetName) => {
    setPreset(name);
    setCurl(null);
    setIntensity(null);
    track("preset_selected", { preset: name });
  };

  const toggle = () => {
    const h = fluid.current;
    if (!h) return;
    h.isPaused() ? h.resume() : h.pause();
    setPaused(h.isPaused());
  };

  return (
    <>
      {/* Cheap changes are pushed via setConfig; the component is not remounted. */}
      <SmokeyFluidCursor ref={fluid} config={active} />

      <main className="wrap">
        <Hero />

        <section className="card">
          <h2>Live controls</h2>
          <p className="sub">
            Move your pointer anywhere on the page. Everything below retunes the
            running simulation — nothing is remounted.
          </p>

          <div className="row">
            <button className="demo primary" onClick={toggle}>
              {paused ? "Resume" : "Pause"}
            </button>
            <span className={`pill ${paused ? "off" : "on"}`}>
              {paused ? "paused" : "running"}
            </span>
            <span className="pill">{preset}</span>
          </div>

          <div className="field">
            <label htmlFor="curl">
              Swirl <code>curl: {curl ?? active.curl}</code>
            </label>
            <input
              id="curl"
              type="range"
              min={0}
              max={50}
              value={curl ?? active.curl ?? 10}
              onChange={(e) => setCurl(Number(e.target.value))}
            />
          </div>

          <div className="field">
            <label htmlFor="intensity">
              Brightness{" "}
              <code>colorIntensity: {(intensity ?? active.colorIntensity ?? 0.15).toFixed(2)}</code>
            </label>
            <input
              id="intensity"
              type="range"
              min={0.05}
              max={0.6}
              step={0.05}
              value={intensity ?? active.colorIntensity ?? 0.15}
              onChange={(e) => setIntensity(Number(e.target.value))}
            />
          </div>
        </section>

        <section className="card">
          <h2>100 presets</h2>
          <p className="sub">
            Every palette crossed with every motion character, shipped in the
            package as <code>presets</code>. {paletteNames.length} palettes ×{" "}
            {characterNames.length} characters.
          </p>

          <div className="preset-filter">
            <input
              type="search"
              className="preset-search"
              placeholder={`Filter ${presetNames.length} presets…`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Filter presets"
            />
          </div>

          <p className="sub" style={{ marginTop: 14 }}>
            Showing {visible.length} of {presetNames.length}
          </p>

          <ul className="presets">
            {visible.map((name) => (
              <li key={name}>
                <button
                  className={`preset${preset === name ? " is-active" : ""}`}
                  onClick={() => choose(name)}
                  aria-pressed={preset === name}
                >
                  <span className="preset__swatch" aria-hidden="true">
                    {(presets[name].palette ?? ["#ff4ecd", "#4ea8ff", "#ffd24e"]).map((c, i) => (
                      <i key={i} style={{ background: c }} />
                    ))}
                  </span>
                  <span className="preset__name">{name}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="card">
          <h2>Scoped to a section</h2>
          <p className="sub">
            <code>scoped</code> plus <code>position: &quot;absolute&quot;</code>{" "}
            keeps the effect inside the component&apos;s own wrapper. It follows
            the controls above, so you can compare the same settings at two
            scales.
          </p>
          <SmokeyFluidCursor
            scoped
            className="scoped"
            config={{
              id: "scoped-canvas",
              position: "absolute",
              zIndex: 0,
              dyeResolution: 512,
              ...active,
            }}
          >
            <span>Move your pointer in here</span>
          </SmokeyFluidCursor>
        </section>

        <section className="card">
          <h2>Usage</h2>
          <Code language="tsx">{`import { SmokeyFluidCursor, presets } from "react-smokey-fluid-cursor";

export default function Layout({ children }) {
  return (
    <>
      <SmokeyFluidCursor config={presets["Ocean Swirl"]} />
      {children}
    </>
  );
}`}</Code>
        </section>

        <section className="card">
          <h2>Imperative control</h2>
          <Code language="tsx">{`const fluid = useRef<FluidHandle>(null);

<SmokeyFluidCursor ref={fluid} config={presets["Magma Storm"]} />
<button onClick={() => fluid.current?.pause()}>Pause</button>`}</Code>
        </section>

        <Footer />
      </main>
    </>
  );
}
