import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
// Electron plugin is disabled for now (see comment below).
// import electron from 'vite-plugin-electron/simple';

export default defineConfig({
  plugins: [
    react(),
    // electron({
    //   entry: 'electron/main.ts',
    // }),
  ],
  resolve: {
    // Alias to allow imports like "@packages/adb-engine" from the desktop app.
    alias: {
      '@packages': resolve(__dirname, '../../packages'),
    },
  },
  server: {
    // Vite dev server port (default 5173)
    port: 5173,
  },
  // Ensure workspace packages are pre‑bundled so Vite can resolve the monorepo imports.
  optimizeDeps: {
    include: [
      '@packages/adb-engine',
      '@packages/device-detector',
      '@packages/fastboot-engine',
    ],
  },
});
