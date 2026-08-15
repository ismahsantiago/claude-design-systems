/// <reference types="vite/client" />

/**
 * Components import their own stylesheet for its side effect; the bundler
 * collects them into `dist/styles.css`. TypeScript needs to be told these
 * imports exist and carry no value.
 */
declare module '*.css';
