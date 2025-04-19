'use client'

import { useClerk } from '@clerk/nextjs'

export const SignOutButton = () => {
  const { signOut } = useClerk()

  return (
    // Clicking this button signs out a user
    // and redirects them to the home page "/".
    <button className ="bg-blue-500 w-20 h-10 border-transparent rounded-md hover:cursor-pointer hover:bg-blue-700 " onClick={() => signOut({ redirectUrl: '/' })}>Sign out</button>
  )
}