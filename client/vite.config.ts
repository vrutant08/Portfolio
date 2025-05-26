import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
      jsxImportSource: 'react',
    })
  ],  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    dedupe: ['gsap', 'wouter', 'react', 'react-dom']
  },
  optimizeDeps: {
    include: ['gsap', 'wouter']
  },
  root: path.resolve(__dirname),
  base: "/",
  build: {
    outDir: path.resolve(__dirname, "../dist/public"),
    emptyOutDir: true,
    sourcemap: true,    rollupOptions: {
      output: {
        manualChunks: {
          'gsap': ['gsap'],
          'vendor': ['wouter', 'react', 'react-dom']
        }
      }
    }
  },
});
