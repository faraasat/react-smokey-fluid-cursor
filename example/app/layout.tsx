import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "React Smokey Fluid Cursor Example",
  description: "A simple example of the React Smokey Fluid Cursor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
