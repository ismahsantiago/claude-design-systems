import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src'],
      exclude: ['src/**/*.stories.tsx'],
    }),
  ],
  build: {
    lib: {
      entry: fileURLToPath(new URL('src/index.ts', import.meta.url)),
      name: 'StarterDS',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        // A single predictable stylesheet keeps the consumer contract simple:
        // one import of `starter-design-system/styles.css` brings tokens +
        // every component style, in that order.
        assetFileNames: (asset) =>
          asset.names?.some((name) => name.endsWith('.css')) ? 'styles.css' : '[name][extname]',
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
