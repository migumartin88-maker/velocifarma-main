import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  vite: {
    resolve: {
      preserveSymlinks: true,
    },
    optimizeDeps: {
      noDiscovery: true,
      include: [],
    },
    server: {
      fs: {
        strict: true,
      },
      watch: {
        usePolling: true,
        interval: 1000,
      },
    },
  },
});
