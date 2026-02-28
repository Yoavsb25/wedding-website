import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

/** Ensures .jsx/.tsx are served as application/javascript so browsers accept module scripts */
function jsxMimePlugin() {
  return {
    name: 'jsx-mime',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const originalSetHeader = res.setHeader.bind(res);
        res.setHeader = (name, value) => {
          if (name.toLowerCase() === 'content-type' && value === 'text/jsx')
            value = 'application/javascript';
          return originalSetHeader(name, value);
        };
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [
    jsxMimePlugin(),
    react(),
    // VitePWA last so closeBundle runs after other plugins (avoids "Unexpected early exit")
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
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MB
      },
      // Temporarily disable PWA so build completes (workbox generateSW races with Rollup terser on exit).
      // Re-enable when upgrading vite-plugin-pwa or workbox to a version that fixes the race.
      disable: true,
    }),
  ],
  base: '/wedding-website/',
});
