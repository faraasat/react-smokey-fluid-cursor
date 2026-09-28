"use client";

import { useRef, useState } from "react";
import { SmokeyFluidCursor } from "react-smokey-fluid-cursor";
import type { FluidHandle } from "react-smokey-fluid-cursor";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";
import { track } from "@/components/analytics";

const PALETTES: Record<string, string[] | null> = {
  Spectrum: null,
  Sunset: ["#ff4ecd", "#ff8a4e", "#ffd24e"],
  Ocean: ["#4ea8ff", "#4effd2", "#7c4dff"],
  Mono: ["#ffffff"],
};

export default function Home() {
  const fluid = useRef<FluidHandle>(null);
  const [paused, setPaused] = useState(false);
  const [palette, setPalette] = useState("Spectrum");
  const [curl, setCurl] = useState(10);
  const [intensity, setIntensity] = useState(0.15);

  const toggle = () => {
    const h = fluid.current;
    if (!h) return;
    if (h.isPaused()) h.resume();
    else h.pause();
    setPaused(h.isPaused());
    track("simulation_toggled", { paused: h.isPaused() });
  };

  return (
    <>
      {/*
        Config changes here are pushed into the running simulation via
        setConfig — the component is never remounted.
      */}
      <SmokeyFluidCursor
        ref={fluid}
        config={{
          palette: PALETTES[palette],
          curl,
          colorIntensity: intensity,
        }}
      />

      <main className="wrap">
        <Hero />

        <section className="card">
          <h2>Live controls</h2>
          <p className="sub">
            Move your pointer anywhere on the page. Every control below retunes
            the running simulation — nothing is remounted.
          </p>

          <div className="row">
            <button className="demo primary" onClick={toggle}>
              {paused ? "Resume" : "Pause"}
            </button>
            <span className={`pill ${paused ? "off" : "on"}`}>
              {paused ? "paused" : "running"}
            </span>
          </div>

          <div className="field">
            <label>Palette</label>
            <div className="row">
              {Object.keys(PALETTES).map((name) => (
                <button
                  key={name}
                  className={`demo${palette === name ? " primary" : ""}`}
                  onClick={() => {
                    setPalette(name);
                    track("palette_changed", { palette: name });
                  }}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <label htmlFor="curl">
              Swirl <code>curl: {curl}</code>
            </label>
            <input
              id="curl"
              type="range"
              min={0}
              max={50}
              value={curl}
              onChange={(e) => setCurl(Number(e.target.value))}
            />
          </div>

          <div className="field">
            <label htmlFor="intensity">
              Brightness <code>colorIntensity: {intensity.toFixed(2)}</code>
            </label>
            <input
              id="intensity"
              type="range"
              min={0.05}
              max={0.6}
              step={0.05}
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
            />
          </div>
        </section>

        <section className="card">
          <h2>Scoped to a section</h2>
          <p className="sub">
            <code>scoped</code> plus <code>position: &quot;absolute&quot;</code>{" "}
            keeps the effect inside the component&apos;s own wrapper.
          </p>
          <SmokeyFluidCursor
            scoped
            className="scoped"
            config={{
              id: "scoped-canvas",
              position: "absolute",
              zIndex: 0,
              palette: ["#4ea8ff", "#7c4dff"],
              dyeResolution: 512,
            }}
          >
            <span>Move your pointer in here</span>
          </SmokeyFluidCursor>
        </section>

        <section className="card">
          <h2>Usage</h2>
          <pre tabIndex={0}>{`import { SmokeyFluidCursor } from "react-smokey-fluid-cursor";

export default function Layout({ children }) {
  return (
    <>
      <SmokeyFluidCursor />
      {children}
    </>
  );
}`}</pre>
        </section>

        <section className="card">
          <h2>Imperative control</h2>
          <pre tabIndex={0}>{`const fluid = useRef<FluidHandle>(null);

<SmokeyFluidCursor ref={fluid} />
<button onClick={() => fluid.current?.pause()}>Pause</button>`}</pre>
        </section>

        <Footer />
      </main>
    </>
  );
}
