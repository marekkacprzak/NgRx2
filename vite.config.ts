/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
  plugins: [
    angular({
      jit: true,
      liveReload: false,
      include: [/src\/.*\.spec\.ts$/, /node_modules\/@ngrx/],
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.spec.ts'],
    setupFiles: ['src/test-setup.ts'],
    server: {
      deps: {
        inline: [/@ngrx/, /@angular/],
      },
    },
  },
});
