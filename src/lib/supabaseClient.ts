import {createClient} from '@supabase/supabase-js';

const env = typeof process !== 'undefined' ? process.env : undefined;
const supabaseUrl = env?.DOCUSAURUS_SUPABASE_URL;
const supabaseAnonKey = env?.DOCUSAURUS_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

