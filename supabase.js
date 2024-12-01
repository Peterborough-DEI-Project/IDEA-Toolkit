import { Auth } from '@supabase/auth-ui-react'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient('https://rwteudaqtbaekocdeawp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3dGV1ZGFxdGJhZWtvY2RlYXdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwNjkwMzYsImV4cCI6MjA0NzY0NTAzNn0.iRUJ_2MzpVo2ckBkBz6KTNbMx6fscw3AMfmMW3P5W-8')
  
async function signOut() {
    const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Error signing out:', error.message);
  } else {
    console.log('Successfully signed out');
  }
  }

  async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error('Error signing in:', error.message);
    } else {
      console.log('Successfully signed in:', data);
    }
  }

  export { supabase, signOut, signIn }
