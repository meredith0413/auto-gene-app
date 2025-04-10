import { UserConfig, ConfigEnv, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';

import { fileURLToPath } from 'url';

// @see: https://gitee.com/holysheng/vite2-config-description/blob/master/vite.config.ts


const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
