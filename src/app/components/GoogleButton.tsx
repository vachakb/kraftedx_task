'use client'

import { useSignIn } from '@clerk/nextjs'
import { useEffect } from 'react'

export default function GoogleSignInButton() {
  const { signIn } = useSignIn()

  const handleGoogleSignIn = async () => {
    try {
      await signIn?.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/',
        redirectUrlComplete: '/dashboard',
      })
    } catch (err) {
      console.error('Google sign-in error:', err)
    }
  }

  return (
    <button
      onClick={handleGoogleSignIn}
      className=" block mx-auto bg-white text-white-500 text-black  h-10 w-82 my-7 border border-gray-500 rounded-sm "
    >
      Sign in with Google
    </button>
  )
}
