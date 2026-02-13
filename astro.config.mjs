import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://shadowkai0121.github.io",
  base: "/FFXIV-zhCT-Dungeon-Note/",
  trailingSlash: "always",
  integrations: [sitemap()],
});
