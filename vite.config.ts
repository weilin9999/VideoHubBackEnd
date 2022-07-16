import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src'),},
  },
  server:{
    port: 3000
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // 将pinia的全局库实例打包进vendor，避免和页面一起打包造成资源重复引入
          if (id.includes(path.resolve(__dirname, './src/store/index.ts'))) {
            return 'vendor';
          }
        }
      }
    }
  }
})
