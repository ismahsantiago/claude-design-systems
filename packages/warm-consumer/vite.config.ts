import { defineConfig } from 'vite';
import { createLibraryConfig } from '../../scripts/vite-library.mjs';

export default defineConfig(createLibraryConfig(import.meta.url, 'WarmConsumer'));
