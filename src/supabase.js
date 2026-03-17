import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://yueofaqggcexhkggsjrm.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1ZW9mYXFnZ2NleGhrZ2dzanJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1NjM0NzYsImV4cCI6MjA4OTEzOTQ3Nn0.uO5CklzIClGS6P6p5XxNEOE2YkrD28vwRH93Aeue64o'
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

