import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  base: process.env.BASE_URL || '/',
  server: {
    host: "::",
    port: 8080,
    strictPort: true, // Prevent fallback to another port if 8080 is taken
    open: mode === 'development', // Auto-open browser in dev
  },
  preview: {
    port: 8080, // Match dev server port
  },
  plugins: [
    react({
      jsxImportSource: '@welldone-software/why-did-you-render', // Optional for debugging
      devTarget: 'esnext', // Faster dev builds
    }),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Add other common aliases
      "@components": path.resolve(__dirname, "./src/components"),
      "@assets": path.resolve(__dirname, "./src/assets"),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: mode === 'development',
    emptyOutDir: true, // Clear dist folder before build
    chunkSizeWarningLimit: 1600, // Increase chunk size warning limit (in kB)
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-toast'],
          // Add more explicit chunks if needed
        },
        entryFileNames: `assets/[name].[hash].js`,
        chunkFileNames: `assets/[name].[hash].js`,
        assetFileNames: `assets/[name].[hash].[ext]`,
      },
      external: [
        // Add any packages that should NOT be bundled
      ],
    },
  },
  optimizeDeps: {
    include: [
      // Pre-bundle dependencies for faster dev startup
      'react',
      'react-dom',
      'react-router-dom',
    ],
    exclude: [
      // Exclude from pre-bundling
      '@radix-ui/react-dialog',
    ],
  },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    'process.env.NODE_ENV': JSON.stringify(mode), // Better env handling
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly', // Better CSS module classnames
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`, // Global SCSS
      },
    },
  },
  esbuild: {
    jsxInject: `import React from 'react'`, // Auto-inject React in JSX files
  },
}));
