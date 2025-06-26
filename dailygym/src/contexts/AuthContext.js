import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../supabase'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => subscription?.unsubscribe()
  }, [])

  const value = {
    user,
    signIn: async (email, password) => {
      const { error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      })
      return { error }
    },
    signUp: async (email, password) => {
      const { error } = await supabase.auth.signUp({ email, password })
      return { error }
    },
    signOut: async () => {
      await supabase.auth.signOut()
    }
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}