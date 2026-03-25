import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [sveltekit(), tailwindcss()],
  build: {
    assetsInlineLimit: 4096, // inline assets < 4KB as base64 (saves HTTP requests)
  },
});
