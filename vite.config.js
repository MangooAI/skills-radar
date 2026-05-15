import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => ({
  plugins: [vue()],
  // 生产模式用 GitHub Pages 路径，开发模式用根路径
  base: mode === 'production' ? '/skills-radar/' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  server: {
    port: 3000,
    strictPort: false
  }
}))