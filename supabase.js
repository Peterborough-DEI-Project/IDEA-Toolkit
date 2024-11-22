import { useState, useEffect } from 'react'
  import { createClient } from '@supabase/supabase-js'
  import { Auth } from '@supabase/auth-ui-react'
  import { ThemeSupa } from '@supabase/auth-ui-shared'

  const supabase = createClient('https://rwteudaqtbaekocdeawp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3dGV1ZGFxdGJhZWtvY2RlYXdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwNjkwMzYsImV4cCI6MjA0NzY0NTAzNn0.iRUJ_2MzpVo2ckBkBz6KTNbMx6fscw3AMfmMW3P5W-8')

  export default function App() {
    const [session, setSession] = useState(null)

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })

      return () => subscription.unsubscribe()
    }, [])

    if (!session) {
      return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
    }
    else {
      return (<div>Logged in!</div>)
    }
  }