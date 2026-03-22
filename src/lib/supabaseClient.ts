import { createClient } from '@supabase/supabase-js';

const env = (() => {
  // Use globalThis.importMeta.env if available (browser + Vite/Docusaurus).
  const importMeta = (globalThis as any).importMeta || (globalThis as any).importMeta;
  if (importMeta && importMeta.env) {
    return importMeta.env;
  }

  // Use globalThis.process.env in Node-like contexts
  const ghProcess = (globalThis as any).process;
  if (ghProcess && ghProcess.env) {
    return ghProcess.env;
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
