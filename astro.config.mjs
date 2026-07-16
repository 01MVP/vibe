import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://vibe.01mvp.com",
  integrations: [sitemap()],
  output: "static",
});
