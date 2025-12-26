import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    define: {
      global: 'window',
    },
    base: command === 'serve' ? '/' : '/website/',
  };
  return config;
})
