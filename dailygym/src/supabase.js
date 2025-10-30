
import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://sdlcxekswsmdfonerejs.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkbGN4ZWtzd3NtZGZvbmVyZWpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3NjUwMzgsImV4cCI6MjA3NzM0MTAzOH0.yp7Pqvp8D-x_8Es9yD2UJmzrDrJyc2Qept2nq9LIzLA';


export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});