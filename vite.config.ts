import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import WindiCSS from 'vite-plugin-windicss';
import inject from '@rollup/plugin-inject';

export default defineConfig({
  
  plugins: [
    solidPlugin(),
    WindiCSS({
      scan: {
        fileExtensions: ['html', 'js', 'ts', 'jsx', 'tsx'],
      },
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      plugins: [inject({ Buffer: ['buffer', 'Buffer'] })],
    },
    target: 'esnext',
  },
});
