/**
 * Types for `contract.mjs`, so TypeScript code can read the contract instead of
 * repeating it. The Tokens story does exactly that: a token added to the
 * contract shows up in the documentation without anyone remembering to add it.
 */

export interface TokenSpec {
  name: string;
  description: string;
}

export interface TokenGroup {
  title: string;
  tokens: TokenSpec[];
}

export declare const CONTRACT: TokenGroup[];
export declare const REQUIRED_TOKENS: string[];
export declare const EXPRESSIVE_TOKENS: string[];
export declare const LOCALLY_SCOPED: RegExp;
