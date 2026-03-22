import { createClient } from '@supabase/supabase-js';

// Support both Docusaurus style env names and Vite style env names.
const supabaseUrl =
  process.env.DOCUSAURUS_SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  '';

const supabaseAnonKey =
  process.env.DOCUSAURUS_SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  '';

if (!supabaseUrl || !supabaseAnonKey) {
  // For local debugging only; remove/disable in production if you don't want secrets in logs.
  console.warn('[Supabase] Missing credentials:', {
    supabaseUrl: supabaseUrl ? '[provided]' : '[missing]',
    supabaseAnonKey: supabaseAnonKey ? '[provided]' : '[missing]',
  });
}

export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;
