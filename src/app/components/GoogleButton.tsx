'use client'

import { useSignIn } from '@clerk/nextjs'

import Image from 'next/image'
import googleLogo from '../assets/google-g-logo-85b2.png'



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
      className="flex flex-row items-center justify-center p-2 gap-3 block mx-auto bg-white text-white-500 text-black  h-10 w-82 my-7 border border-gray-500 rounded-sm hover:cursor-pointer hover:bg-gray-300 "
    >
      <Image
        src={googleLogo}
        width={25}
        height={25}
        alt="Google logo"
        
        />
      Sign in with Google
    </button>
  )
}
