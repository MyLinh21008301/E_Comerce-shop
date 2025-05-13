'use client'

import { useAuth } from '@/context/AuthContext'
import { useEffect } from 'react'

export default function AuthStatus() {
  const { authState, isLoading, kcLogin, kcLogout } = useAuth()

  useEffect(()=>{
    console.log('AuthState:', authState)
  },[authState])

  if (isLoading) {
    return <div>Loading authentication status...</div>
  }

  useEffect(() => {
    console.log('AuthState:', authState)
  },[])

  return (
    <div>
      {authState.isAuthenticated ? (
        <div>
          <p>Welcome, {authState.user?.last_name + " " + authState.user?.first_name || authState.user?.email}</p>
          <button onClick={kcLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={kcLogin}>Login</button>
      )}
    </div>
  )
}