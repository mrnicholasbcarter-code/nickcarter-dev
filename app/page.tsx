import Link from "next/link";
import { projects, site } from "@/content/site";

export default function HomePage() {
  const featured = projects.filter((p) => p.status === "featured");
  const drafts = projects.filter((p) => p.status === "draft");

  return (
    <div className="space-y-14">
      <section className="space-y-4">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Portfolio · draft</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{site.name}</h1>
        <p className="max-w-2xl text-mist/80">{site.summary}</p>
        <div className="flex flex-wrap gap-3 pt-2 text-sm">
          <Link
            href="/resume"
            className="rounded-full bg-mist px-4 py-2 font-medium text-ink no-underline"
          >
            Resume (draft)
          </Link>
          <a
            href={site.links.verdictCore}
            className="rounded-full border border-white/20 px-4 py-2 no-underline"
            target="_blank"
            rel="noreferrer"
          >
            Verdict on GitHub
          </a>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm uppercase tracking-[0.18em] text-mist/60">Featured</h2>
        <ul className="space-y-4">
          {featured.map((p) => (
            <li
              key={p.name}
              className="rounded-3xl border border-accent/35 bg-gradient-to-b from-accent/10 to-white/[0.02] p-7 shadow-[0_0_0_1px_rgba(110,168,255,0.08)]"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <a
                  href={p.href}
                  className="text-2xl font-semibold tracking-tight no-underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {p.name}
                </a>
                <span className="rounded-full border border-accent/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-accent">
                  featured
                </span>
              </div>
              <p className="mt-3 text-base leading-relaxed text-mist/85">{p.blurb}</p>
              <p className="mt-4 font-mono text-xs text-mist/45">{p.tags.join(" · ")}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm uppercase tracking-[0.18em] text-mist/60">More projects · draft blurbs</h2>
        <ul className="space-y-3">
          {drafts.map((p) => (
            <li key={p.name} className="border-b border-white/5 pb-3">
              <a href={p.href} className="text-sm font-medium no-underline" target="_blank" rel="noreferrer">
                {p.name}
              </a>
              <p className="mt-1 text-sm text-mist/55">{p.blurb}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
