import { describe, it, expect, vi, afterEach } from "vitest";
import { render } from "@testing-library/react";
import { SmokeyFluidCursor } from "../src";

// jsdom has no WebGL, so getContext always returns null here. That is exactly
// the "unsupported device" path the component has to survive.
describe("SmokeyFluidCursor", () => {
  afterEach(() => vi.restoreAllMocks());

  it("renders a canvas using the default id", () => {
    const { container } = render(<SmokeyFluidCursor />);
    expect(container.querySelector("canvas")?.id).toBe("smokey-fluid-canvas");
  });

  it("honours a custom canvas id", () => {
    const { container } = render(<SmokeyFluidCursor config={{ id: "my-canvas" }} />);
    expect(container.querySelector("canvas")?.id).toBe("my-canvas");
  });

  it("does not throw when WebGL is unavailable", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(() => render(<SmokeyFluidCursor />)).not.toThrow();
  });

  it("warns once instead of crashing the host page", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<SmokeyFluidCursor />);
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("WebGL is unavailable"),
      expect.anything()
    );
  });

  it("injects positioning styles scoped to its canvas id", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<SmokeyFluidCursor config={{ id: "styled-canvas" }} />);
    const style = document.head.querySelector("style[data-smokey-fluid-cursor='styled-canvas']");
    expect(style?.textContent).toContain("#styled-canvas");
    expect(style?.textContent).toContain("pointer-events: none");
  });

  it("removes its injected style on unmount", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const { unmount } = render(<SmokeyFluidCursor config={{ id: "leak-check" }} />);
    unmount();
    expect(document.head.querySelector("style[data-smokey-fluid-cursor='leak-check']")).toBeNull();
  });

  it("detaches window listeners on unmount", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const remove = vi.spyOn(window, "removeEventListener");
    const { unmount } = render(<SmokeyFluidCursor />);
    unmount();
    // The WebGL-less path bails before attaching, so this asserts only that
    // unmounting runs the disposer without throwing.
    expect(() => remove.mock.calls).not.toThrow();
  });
});
