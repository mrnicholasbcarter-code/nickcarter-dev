import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `${site.name} · Portfolio`,
  description: site.verdictOneLiner,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto min-h-screen max-w-3xl px-6 py-10">
          <header className="mb-12 flex flex-wrap items-baseline justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <Link href="/" className="text-lg font-semibold tracking-tight no-underline">
                {site.name}
              </Link>
              <p className="mt-1 text-sm text-mist/70">{site.title}</p>
            </div>
            <nav className="flex gap-5 text-sm text-mist/80">
              <Link href="/">Home</Link>
              <Link href="/resume">Resume</Link>
              <a href={site.links.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href={site.links.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </nav>
          </header>
          <main>{children}</main>
          <footer className="mt-16 border-t border-white/10 pt-6 text-xs text-mist/50">
            <p>{site.verdictOneLiner}</p>
            <p className="mt-2">Site shell — portfolio &amp; resume copy still being finalized.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
