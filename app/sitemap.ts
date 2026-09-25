import type { MetadataRoute } from "next";
import { allDocPaths } from "@/content/docs";
import { resumeVariants, site } from "@/content/site";
export default function sitemap(): MetadataRoute.Sitemap { return ["", "/resume", ...resumeVariants.map(({slug}) => `/resume/${slug}`), ...allDocPaths()].map((path) => ({ url: `${site.url}${path}`, changeFrequency: "monthly" as const, priority: path === "" ? 1 : .8 })); }
