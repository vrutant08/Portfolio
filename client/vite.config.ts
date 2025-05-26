import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
      jsxImportSource: 'react',
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    dedupe: ['gsap', 'wouter', 'react', 'react-dom', 'lucide-react']
  },
  optimizeDeps: {
    include: ['gsap', 'wouter', 'lucide-react', 'react', 'react-dom'],
    exclude: []
  },
  build: {
    outDir: path.resolve(__dirname, "../dist/public"),
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'gsap': ['gsap'],
          'icons': ['lucide-react'],
          'vendor': ['wouter', 'react', 'react-dom']
        }
      },
      external: []
    }
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  }
});
