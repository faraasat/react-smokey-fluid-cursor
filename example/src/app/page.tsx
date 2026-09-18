"use client";

import { useState } from "react";
import { SmokeyFluidCursor } from "react-smokey-fluid-cursor";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";
import { track } from "@/components/analytics";

const PRESETS = {
  default: { label: "Default", config: {} },
  vivid: { label: "Vivid", config: { curl: 30, splatForce: 9000, densityDissipation: 2 } },
  calm: { label: "Calm", config: { curl: 3, splatForce: 4000, densityDissipation: 5 } },
  dense: { label: "Dense", config: { dyeResolution: 1024, pressureIteration: 30, curl: 18 } },
} as const;

type PresetKey = keyof typeof PRESETS;

export default function Home() {
  const [preset, setPreset] = useState<PresetKey>("default");

  const choose = (key: PresetKey) => {
    setPreset(key);
    track("preset_changed", { preset: key });
  };

  return (
    <>
      {/* Remounted per preset so the simulation restarts with the new config. */}
      <SmokeyFluidCursor
        key={preset}
        config={{ ...PRESETS[preset].config, id: "demo-canvas" }}
      />

      <main className="wrap">
        <Hero />

        <section className="card">
          <h2>Try a preset</h2>
          <p className="sub">
            Move your pointer across the page. Each preset remounts the
            component, which tears the old simulation down and starts a new one.
          </p>
          <div className="row">
            {(Object.keys(PRESETS) as PresetKey[]).map((k) => (
              <button
                key={k}
                className={`demo${preset === k ? " primary" : ""}`}
                onClick={() => choose(k)}
              >
                {PRESETS[k].label}
              </button>
            ))}
          </div>
        </section>

        <section className="card">
          <h2>Usage</h2>
          <p className="sub">Drop it in once, anywhere in your tree.</p>
          <pre>{`import { SmokeyFluidCursor } from "react-smokey-fluid-cursor";

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
          <h2>Current config</h2>
          <p className="sub">Anything you omit falls back to the defaults.</p>
          <pre>{JSON.stringify(PRESETS[preset].config, null, 2)}</pre>
        </section>

        <Footer />
      </main>
    </>
  );
}
