import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

// https://vite.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, path.resolve(__dirname, "./src/env")) };

  return defineConfig({
    plugins: [
        react(),
        tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, "./src")
      }
    }
  });
}