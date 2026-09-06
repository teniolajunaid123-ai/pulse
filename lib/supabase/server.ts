import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/** Service-role client for server-side code (API routes, scripts). Never import from client components. */
export function createServiceClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}
