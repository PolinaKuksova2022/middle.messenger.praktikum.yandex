import { resolve } from 'path';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  build: {
    outDir: resolve(__dirname, 'dist'),
  },  
  plugins: [handlebars({
        partialDirectory: resolve(__dirname, 'src/partials'),
    }),
  ],
}) 