import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // loadEnv with '' prefix loads ALL env vars (including non-VITE_ ones)
  // so TALLY_API_KEY is available to the dev proxy without being bundled
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    // needed for wagmi / viem in browser
    define: {
      global: 'globalThis',
    },
    server: {
      proxy: {
        // Route /api/tally → Tally API with the key injected server-side.
        // In production this is handled by netlify/functions/tally.js instead.
        '/api/tally': {
          target:      'https://api.tally.xyz',
          changeOrigin: true,
          rewrite:     () => '/query',
          configure:   (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              if (env.TALLY_API_KEY) proxyReq.setHeader('Api-Key', env.TALLY_API_KEY);
            });
          },
        },
      },
    },
  };
});
