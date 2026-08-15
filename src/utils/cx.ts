/**
 * Anything a conditional class expression can evaluate to. Guard forms like
 * `cond && 'ds-x'` and `count && 'ds-y'` both land here.
 */
export type ClassValue = string | number | bigint | boolean | null | undefined;

/** Tiny class-name joiner. Only truthy strings survive. */
export function cx(...parts: ClassValue[]): string {
  return parts.filter((part): part is string => typeof part === 'string' && part !== '').join(' ');
}
