import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      proxy: {
        '/api/n8n-chat': {
          target: 'https://kavithaambati.app.n8n.cloud',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/n8n-chat/, '/webhook/b23c6e14-a39e-4071-8939-b1a1049ca014/chat'),
          secure: true,
        },
      },
    },
  };
});
