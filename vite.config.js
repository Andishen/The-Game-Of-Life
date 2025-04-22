import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/The-Game-Of-Life',
  plugins: [react()],
});
