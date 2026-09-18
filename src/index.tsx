import React from "react";

import { initFluid } from "./smokey-fluid-cursor";

import { ISmokeyFluidConfig } from "./types";

const defaultConfig: ISmokeyFluidConfig = {
  simResolution: 128,
  dyeResolution: 1440,
  captureResolution: 512,
  densityDissipation: 3.5,
  velocityDissipation: 2,
  pressure: 0.1,
  pressureIteration: 20,
  curl: 10,
  splatRadius: 0.5,
  splatForce: 6000,
  shading: true,
  colorUpdateSpeed: 10,
  paused: false,
  backColor: { r: 0, g: 0, b: 0 },
  transparent: true,
  id: "smokey-fluid-canvas",
};

const SmokeyFluidCursor: React.FC<{ config?: Partial<ISmokeyFluidConfig> }> = ({
  config: incomingConfig,
}) => {
  const config: ISmokeyFluidConfig = { ...defaultConfig, ...incomingConfig };

  // The simulation is keyed on the canvas id, and re-running it is expensive,
  // so the effect intentionally depends only on the id rather than on the
  // whole config object (which is a fresh reference on every render).
  const { id } = config;
  const configRef = React.useRef(config);
  configRef.current = config;

  React.useEffect(() => {
    if (typeof document === "undefined") return;

    const style = document.createElement("style");
    style.setAttribute("data-smokey-fluid-cursor", id);
    style.textContent = `
        #${id} {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: -9999;
        }
      `;
    document.head.appendChild(style);

    const dispose = initFluid(configRef.current);

    // Without this the simulation keeps its window listeners and its
    // requestAnimationFrame loop running forever. Every remount (and every
    // StrictMode double-invoke in development) would stack another one.
    return () => {
      dispose();
      style.remove();
    };
  }, [id]);

  return <canvas id={id}></canvas>;
};

export { SmokeyFluidCursor };
export type { ISmokeyFluidConfig } from "./types";
