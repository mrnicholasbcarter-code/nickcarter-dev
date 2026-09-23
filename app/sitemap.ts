import type { MetadataRoute } from "next";
import { resumeVariants, site } from "@/content/site";
export default function sitemap(): MetadataRoute.Sitemap { return ["", "/resume", ...resumeVariants.map(({slug}) => `/resume/${slug}`)].map((path) => ({ url: `${site.url}${path}`, changeFrequency: "monthly" as const, priority: path === "" ? 1 : .8 })); }
