
import { createClient } from "@supabase/supabase-js";

// Check if Supabase URL and key are available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate that environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Supabase environment variables are missing. Make sure to add them in your Supabase integration settings."
  );
}

// Create Supabase client with fallback to empty strings to prevent runtime errors
// Note: The client won't function correctly without proper credentials
export const supabase = createClient(
  supabaseUrl || "",
  supabaseAnonKey || ""
);
