/// <reference types="vite/client" />

/**
 * Ambient declarations shared by every workspace package.
 *
 * Components import their own stylesheet for its side effect and the bundler
 * collects them; TypeScript needs to be told these imports exist and carry no
 * value. This lives at the repo root rather than inside a package because each
 * package typechecks `@ds/shared`'s sources through the workspace link.
 */
declare module '*.css';
