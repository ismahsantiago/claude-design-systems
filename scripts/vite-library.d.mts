import type { UserConfig } from 'vite';

/**
 * Build config shared by every design system package.
 *
 * @param packageUrl `import.meta.url` of the calling package's vite config.
 * @param globalName UMD-style global name, e.g. `SaasClean`.
 */
export function createLibraryConfig(packageUrl: string, globalName: string): UserConfig;
