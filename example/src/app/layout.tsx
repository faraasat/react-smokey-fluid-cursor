import type { Metadata } from "next";
import { Analytics } from "@/components/analytics";
import "./globals.css";


export const metadata: Metadata = {
  title: "react-smokey-fluid-cursor — live demo",
  description: "WebGL fluid cursor trails as a React and Next.js component.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
        <Analytics packageName="react-smokey-fluid-cursor" />
      </body>
    </html>
  );
}
