import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // needed for wagmi / viem in browser
  define: {
    global: 'globalThis',
  },
});
