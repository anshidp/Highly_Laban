import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'assets/*.png', 'assets/*.jpg', 'assets/*.JPG', 'assets/*.PNG', 'assets/*.mp4'],
      manifest: {
        name: 'Hyle Laban',
        short_name: 'Hyle Laban',
        theme_color: '#020d1a',
        background_color: '#020d1a',
        display: 'standalone',
        icons: [
          {
            src: '/assets/logo.PNG',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/assets/logo.PNG',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,svg,JPG,PNG,mp4}'],
        maximumFileSizeToCacheInBytes: 50 * 1024 * 1024, // Allow up to 50MB files to be cached (good for smaller videos/HD images)
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 365 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              }
            }
          }
        ]
      }
    })
  ],
  base: '/Highly_Laban/',
})
