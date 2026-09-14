import type { Metadata } from "next";
import { experience, site, skillsDraft } from "@/content/site";

export const metadata: Metadata = {
  title: `${site.name} · Resume`,
  description: "Resume draft — content still being finalized.",
};

export default function ResumePage() {
  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Resume · draft</p>
        <h1 className="text-3xl font-semibold tracking-tight">{site.name}</h1>
        <p className="text-mist/70">
          {site.title} · {site.location}
        </p>
        <p className="max-w-2xl text-sm text-mist/75">{site.summary}</p>
        <p className="text-sm text-mist/60">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          {" · "}
          <a href={site.links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          {" · "}
          <a href={site.links.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm uppercase tracking-[0.18em] text-mist/60">Experience</h2>
        <p className="text-sm text-mist/55">
          Placeholder roles — replace from finished resume in <code className="font-mono text-xs">content/site.ts</code>.
        </p>
        <ul className="space-y-6">
          {experience.map((role) => (
            <li key={`${role.company}-${role.title}`} className="rounded-2xl border border-dashed border-white/15 p-5">
              {role.draft ? (
                <span className="mb-2 inline-block rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-mist/60">
                  draft
                </span>
              ) : null}
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-medium">
                  {role.title} · {role.company}
                </h3>
                <span className="text-xs text-mist/50">{role.dates}</span>
              </div>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-mist/75">
                {role.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm uppercase tracking-[0.18em] text-mist/60">Skills · draft</h2>
        <ul className="flex flex-wrap gap-2">
          {skillsDraft.map((s) => (
            <li key={s} className="rounded-full border border-white/10 px-3 py-1 text-xs text-mist/70">
              {s}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
