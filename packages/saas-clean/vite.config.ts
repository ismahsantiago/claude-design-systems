import { defineConfig } from 'vite';
import { createLibraryConfig } from '../../scripts/vite-library.mjs';

/**
 * Every system builds identically — only the package differs — so the config
 * lives in one place. Editing this file is how a system opts out of the
 * standard build, which should be rare enough to be worth explaining in a
 * comment when it happens.
 */
export default defineConfig(createLibraryConfig(import.meta.url, 'SaasClean'));
