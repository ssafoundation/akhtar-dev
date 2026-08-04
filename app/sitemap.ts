import type { MetadataRoute } from "next";
import { projects } from "@/data/site";
import { siteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/portfolio", "/services", "/contact", "/privacy"];
  const projectRoutes = projects.map((project) => `/portfolio/${project.slug}`);

  return [...routes, ...projectRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8
  }));
}
