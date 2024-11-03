import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';

const manifestForPlugIn: Partial<VitePWAOptions> = {
  manifest: {
    name: 'Memoji',
    short_name: 'Memoji',
    description:
      'Memoji - Аналог популярной игры Мемори. В Мемори есть колода карточек с парными изображениями. Колода раскладывается в случайном порядке рубашкой вверх. Игрок может открывать 2 карточки за один ход. Если при открытии карт образовалась «парочка», она остаётся открытой. Игра продолжается, пока не будет открыто всё поле.',
    icons: [
      {
        src: '/icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icon-128x128.png',
        sizes: '128x128',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icon-152x152.png',
        sizes: '152x152',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/logo.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'apple touch icon',
      },
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/logo.png',
        sizes: '500x500',
        type: 'image/png',
        purpose: 'favicon',
      },
    ],
    theme_color: '#22ab93',
    background_color: '#ffffff',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    orientation: 'portrait-primary',
  },
};
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)],
});
