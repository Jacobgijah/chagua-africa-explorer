import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
  const isProd = mode === "production";
  const repoName = "kilinge-trails"; // 👈 MUST match your GitHub repo name exactly

  return {
    // Required for GitHub Pages project sites:
    // in production, assets resolve under /<repoName>/
    base: isProd ? `/${repoName}/` : "/",

    server: {
      host: "::",
      port: 8080,
    },

    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    // not strictly necessary (defaults are fine) but explicit:
    build: {
      outDir: "dist",
      assetsDir: "assets",
      sourcemap: false, // set true if you want debugging maps
    },
  };
});
