import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";

const SITE_URL = "https://smartix.uz";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: new Date("2026-07-01"),
    changeFrequency: "monthly",
    priority: locale === "uz" ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${SITE_URL}/${l}`])
      ),
    },
  }));
}
