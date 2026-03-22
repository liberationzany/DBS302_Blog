import { createClient } from '@supabase/supabase-js';

const env = (() => {
  // Standard Docusaurus/webpack-injected process.env support.
  if (typeof process !== 'undefined' && (process as any).env) {
    return (process as any).env;
  }

  // Fallback for environments exposing globalThis.process (safe fallback for SSR variants)
  if (
    typeof globalThis !== 'undefined' &&
    (globalThis as any).process &&
    (globalThis as any).process.env
  ) {
    return (globalThis as any).process.env;
  }

  return {};
})();

// Support both Docusaurus style env names and Vite style env names.
const supabaseUrl =
  (env.DOCUSAURUS_SUPABASE_URL as string) ||
  (env.VITE_SUPABASE_URL as string) ||
  (env.SUPABASE_URL as string) ||
  '';
const supabaseAnonKey =
  (env.DOCUSAURUS_SUPABASE_ANON_KEY as string) ||
  (env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY as string) ||
  (env.VITE_SUPABASE_ANON_KEY as string) ||
  (env.SUPABASE_ANON_KEY as string) ||
  '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('[Supabase] Missing credentials:', {
    supabaseUrl: supabaseUrl ? '[provided]' : '[missing]',
    supabaseAnonKey: supabaseAnonKey ? '[provided]' : '[missing]',
  });
}

export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;
