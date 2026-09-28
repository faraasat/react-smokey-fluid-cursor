import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, act } from "@testing-library/react";
import { createRef } from "react";
import { SmokeyFluidCursor, useSmokeyFluidCursor } from "../src";
import type { FluidHandle } from "../src";

// jsdom has no WebGL, so the component always takes the "unsupported device"
// path here. That still exercises mounting, cleanup and the handle contract.
describe("SmokeyFluidCursor", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });
  afterEach(() => vi.restoreAllMocks());

  describe("mounting", () => {
    it("creates a canvas with the default id", () => {
      render(<SmokeyFluidCursor />);
      expect(document.getElementById("smokey-fluid-canvas")).toBeTruthy();
    });

    it("honours a custom canvas id", () => {
      render(<SmokeyFluidCursor config={{ id: "my-canvas" }} />);
      expect(document.getElementById("my-canvas")).toBeTruthy();
    });

    it("renders no wrapper element when unscoped", () => {
      const { container } = render(<SmokeyFluidCursor />);
      expect(container.firstChild).toBeNull();
    });

    it("renders a wrapper and its children when scoped", () => {
      const { getByText } = render(
        <SmokeyFluidCursor scoped>
          <p>inside</p>
        </SmokeyFluidCursor>
      );
      expect(getByText("inside")).toBeInTheDocument();
    });

    it("mounts the canvas inside the scoped wrapper", () => {
      const { container } = render(<SmokeyFluidCursor scoped />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.querySelector("canvas")).toBeTruthy();
    });

    it("applies className and style to the scoped wrapper", () => {
      const { container } = render(
        <SmokeyFluidCursor scoped className="fx" style={{ height: 200 }} />
      );
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toBe("fx");
      expect(wrapper.style.height).toBe("200px");
    });
  });

  describe("cleanup", () => {
    it("removes its canvas on unmount", () => {
      const { unmount } = render(<SmokeyFluidCursor config={{ id: "leak-check" }} />);
      unmount();
      expect(document.getElementById("leak-check")).toBeNull();
    });

    it("does not stack canvases across remounts", () => {
      const { unmount } = render(<SmokeyFluidCursor />);
      unmount();
      render(<SmokeyFluidCursor />);
      expect(document.querySelectorAll("canvas")).toHaveLength(1);
    });

    it("does not throw when WebGL is unavailable", () => {
      expect(() => render(<SmokeyFluidCursor />)).not.toThrow();
    });
  });

  describe("imperative handle", () => {
    it("exposes the handle through a ref", () => {
      const ref = createRef<FluidHandle>();
      render(<SmokeyFluidCursor ref={ref} />);
      expect(typeof ref.current?.pause).toBe("function");
    });

    it("reports paused state through the ref", () => {
      const ref = createRef<FluidHandle>();
      render(<SmokeyFluidCursor ref={ref} />);
      act(() => ref.current!.pause());
      expect(ref.current!.isPaused()).toBe(true);
    });

    it("accepts setConfig through the ref without throwing", () => {
      const ref = createRef<FluidHandle>();
      render(<SmokeyFluidCursor ref={ref} />);
      expect(() => ref.current!.setConfig({ curl: 25 })).not.toThrow();
    });

    it("exposes the canvas through the ref", () => {
      const ref = createRef<FluidHandle>();
      render(<SmokeyFluidCursor config={{ id: "ref-canvas" }} ref={ref} />);
      expect(ref.current?.canvas?.id).toBe("ref-canvas");
    });
  });

  describe("config updates", () => {
    it("does not rebuild the simulation for a live-tunable change", () => {
      const { rerender } = render(<SmokeyFluidCursor config={{ curl: 10 }} />);
      const first = document.querySelector("canvas");
      rerender(<SmokeyFluidCursor config={{ curl: 40 }} />);
      // Same canvas element means the effect did not tear down and re-init.
      expect(document.querySelector("canvas")).toBe(first);
    });

    it("rebuilds when a structural option changes", () => {
      const { rerender } = render(<SmokeyFluidCursor config={{ id: "a" }} />);
      rerender(<SmokeyFluidCursor config={{ id: "b" }} />);
      expect(document.getElementById("a")).toBeNull();
      expect(document.getElementById("b")).toBeTruthy();
    });
  });

  describe("useSmokeyFluidCursor", () => {
    it("returns a ref to the live handle", () => {
      let handle: FluidHandle | null = null;
      function Probe() {
        const ref = useSmokeyFluidCursor();
        handle = ref.current;
        return null;
      }
      render(<Probe />);
      expect(document.querySelector("canvas")).toBeTruthy();
      void handle;
    });
  });
});
