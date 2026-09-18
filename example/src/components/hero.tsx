export function Hero() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return (
    <header className="hero">
      <img src={`${base}/banner.svg`} alt="react-smokey-fluid-cursor" />
      <h1>react-smokey-fluid-cursor</h1>
      <p>WebGL fluid cursor trails as a React &amp; Next.js component. Move your mouse anywhere on this page.</p>
      <nav className="links">
        <a href="https://www.npmjs.com/package/react-smokey-fluid-cursor">npm</a>
        <a href="https://github.com/faraasat/react-smokey-fluid-cursor">GitHub</a>
        <a href="https://github.com/faraasat/react-smokey-fluid-cursor#readme">Docs</a>
      </nav>
    </header>
  );
}
