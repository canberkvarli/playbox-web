import { createClient } from "@supabase/supabase-js";

// Server-side client for the marketing site's form routes. Uses the anon key —
// the lead tables have RLS with an INSERT-only policy for anon and no read
// policy, so submissions can be written but nothing is publicly readable.
const url = process.env.SUPABASE_URL;
const anonKey = process.env.SUPABASE_ANON_KEY;

export const supabase =
  url && anonKey
    ? createClient(url, anonKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      })
    : null;
