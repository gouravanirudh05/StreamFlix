import { defineConfig } from "vite";
import sitemap from "vite-plugin-sitemap";

export default defineConfig({
  plugins: [
    sitemap({
      hostname: "https://streamflix.com",
      dynamicRoutes: ["/movies", "/tv-shows", "/player/:id"]
    }),
  ],
});
