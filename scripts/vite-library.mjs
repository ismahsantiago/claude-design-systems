import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

/**
 * The shared library build for every design system in this repo.
 *
 * Two decisions worth knowing:
 *
 * `@ds/shared` is deliberately NOT external. Each system ships its own fully
 * compiled copy of the components, which is what `/design-sync` uploads — it
 * needs real compiled components on `window.<globalName>`, not an import of a
 * workspace package that will not exist on the other side.
 *
 * All CSS collapses into a single `dist/styles.css`, theme first. Rendered
 * designs only receive the transitive `@import` closure of one stylesheet, so
 * anything not reachable from that file is invisible to the design agent.
 *
 * @param {string} packageUrl `import.meta.url` of the package's vite config.
 * @param {string} globalName UMD-style global, e.g. `SaasClean`.
 */
export function createLibraryConfig(packageUrl, globalName) {
  const root = new URL('.', packageUrl);

  return {
    plugins: [
      react(),
      dts({
        // The ambient `declare module '*.css'` lives at the repo root; passing
        // an explicit `include` here overrides the one in tsconfig, so it has
        // to be listed again or every side-effect CSS import reports an error.
        include: [
          fileURLToPath(new URL('src', root)),
          fileURLToPath(new URL('../../types', root)),
        ],
        exclude: ['**/*.stories.tsx'],
      }),
    ],
    build: {
      lib: {
        entry: fileURLToPath(new URL('src/index.ts', root)),
        name: globalName,
        formats: ['es', 'cjs'],
        fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'react/jsx-runtime'],
        output: {
          globals: { react: 'React', 'react-dom': 'ReactDOM' },
          assetFileNames: (asset) =>
            asset.names?.some((name) => name.endsWith('.css'))
              ? 'styles.css'
              : '[name][extname]',
        },
      },
      sourcemap: true,
      emptyOutDir: true,
    },
  };
}
