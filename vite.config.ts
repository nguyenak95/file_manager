/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      enabled: true,
      exclude: ["src/main.tsx", ".eslintrc.cjs"]
    },
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test-utils/setupTest.ts',
    css: true,
  },
})
