import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      base: '/wedding-website/',
      manifest: {
        name: 'Maya & Yoav\'s Wedding',
        short_name: 'Wedding',
        description: 'Maya & Yoav – May 30, 2026 at R48 Hotel and Garden, Tel Aviv.',
        theme_color: '#1a2332',
        background_color: '#f5f7fa',
        display: 'standalone',
        start_url: '/wedding-website/',
        icons: [
          {
            src: '/wedding-website/favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
      },
    }),
  ],
  base: '/wedding-website/',
});
