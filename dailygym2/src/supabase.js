
import { createClient } from '@supabase/supabase-js';

// As constantes agora estão com os nomes corretos (camelCase)
const supabaseUrl = 'https://uuxsfzelxhluxelssnmd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1eHNmemVseGhsdXhlbHNzbm1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1NjEwNDEsImV4cCI6MjA2NDEzNzA0MX0.O06phbrfcgMJDuZNUHJ1diTmIYGSN_0-DfRQ4akInQc';

// Agora a função createClient vai encontrar as variáveis supabaseUrl e supabaseAnonKey
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});