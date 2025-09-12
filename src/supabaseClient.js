import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase env vars. Ensure .env.local has VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY at project root.', { supabaseUrl, hasKey: !!supabaseAnonKey });
  // Throwing an error here will prevent the app from crashing due to an uninitialized client
  // but will still show a clear error in the console.
  throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
