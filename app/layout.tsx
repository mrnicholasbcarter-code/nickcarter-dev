import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · AI infrastructure & decision systems`, template: `%s · ${site.name}` },
  description: site.summary,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: `${site.name} · AI infrastructure & decision systems`,
    description: site.summary,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name} · AI infrastructure & decision systems` }],
  },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"], title: `${site.name} · AI infrastructure & decision systems`, description: site.summary },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { colorScheme: "dark", themeColor: "#07111f" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <div className="site-shell">
          <header className="site-header">
            <Link href="/" className="brand" aria-label={`${site.name}, home`}>
              <span className="brand-mark" aria-hidden="true">{site.shortName}</span>
              <span><strong>{site.name}</strong><small>AI infrastructure &amp; decision systems</small></span>
            </Link>
            <nav aria-label="Primary navigation">
              <Link href="/#work">Work</Link>
              <Link href="/#approach">Approach</Link>
              <Link href="/resume">Resume</Link>
              <a href={site.links.github} target="_blank" rel="noreferrer">GitHub<span className="sr-only"> (opens in a new tab)</span></a>
            </nav>
          </header>
          <main id="main-content">{children}</main>
          <footer className="site-footer">
            <div><strong>{site.name}</strong><p>{site.location} · {site.availability}</p></div>
            <div className="footer-links">
              <a href={site.links.github}>GitHub</a>
              <a href={site.links.linkedin}>LinkedIn</a>
              <Link href="/resume">Resume</Link>
            </div>
            <p className="evidence-note">Claims on this site are bounded to public repository evidence. Live-provider availability, adoption, and production scale are not implied.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
