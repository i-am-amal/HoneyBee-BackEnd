// pm2.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Import your Vite configuration from vite.config.js (ES module syntax)
import viteConfig from './vite.config.js';

// Export the Vite configuration as a CommonJS module
module.exports = defineConfig({
  ...viteConfig,
  plugins: [
    ...viteConfig.plugins,
    react(),
  ],
});
