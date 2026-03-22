import { createClient } from '@supabase/supabase-js';

const env = (() => {
  // Standard Docusaurus/webpack-injected process.env support.
  if (typeof process !== 'undefined' && (process as any).env) {
    return (process as any).env;
  }

  // Very old fallback for Vite-style import.meta.env (unlikely here but safe)
  if (typeof import !== 'undefined' && typeof import.meta !== 'undefined' && (import.meta as any).env) {
    return (import.meta as any).env;
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
