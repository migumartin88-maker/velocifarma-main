import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/static';

export default defineConfig({
  output: 'static',
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  }),
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
