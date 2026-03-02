import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath } from 'url';
import path from 'path';

// Эмуляция __dirname для ES-модулей
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Используем @ для чистоты кода (хорошая практика)
      '@components': path.resolve(__dirname, './src/components'),
      '@types': path.resolve(__dirname, './src/types'),
      // Добавим алиас для самого src, чтобы избежать путаницы с относительными путями
      '@': path.resolve(__dirname, './src'),
    },
  },
});
