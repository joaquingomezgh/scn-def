import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";

// El sitio tiene una sola página
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${SITE_URL}/` }];
}
