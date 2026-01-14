import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/mk_mechanical_web/',
  server: {
    port: 8000
  }
})
