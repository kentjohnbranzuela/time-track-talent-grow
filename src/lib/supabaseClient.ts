
import { createClient } from "@supabase/supabase-js";

// Check if Supabase URL and key are available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// For development purposes only - these values allow the app to build
// but won't connect to a real database
const devFallbackUrl = "https://example.supabase.co";
const devFallbackKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4YW1wbGUiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxMzA5ODU0MCwiZXhwIjoxOTI4Njc0NTQwfQ.fake-key-for-dev";

// Validate that environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase environment variables are missing. Using development fallbacks. To use real Supabase functionality, configure your Supabase integration in the project settings."
  );
}

// Create Supabase client with fallback values for development
export const supabase = createClient(
  supabaseUrl || devFallbackUrl,
  supabaseAnonKey || devFallbackKey
);
