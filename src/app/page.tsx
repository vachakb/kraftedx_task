'use client'

import * as React from 'react'
import { useSignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { CustomGoogleOneTap } from './components/CustomGoogleOneTap'
import  GoogleSignInButton  from './components/GoogleButton'

export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const router = useRouter()
 
  

  // Handle the submission of the sign-in form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.push('/')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Display a form to capture the user's email and password
  return (
    <div className="flex flex-col  py-8 mx-auto bg-linear-to-b from-gray-400/15 to-gray-500/15 w-100 h-130 border-transparent rounded-lg shadow-sm">
      <h1 className='text-3xl font-bold my-5 mb-8 mx-auto'>Sign in</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className='flex flex-col gap-2 mb-7 mx-9'>
          <label htmlFor="email" className='text-sm text-gray-500 font-bold'>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            type="email"
            value={email}
            className='bg-gray-500/15 border border-gray-400 rounded-md h-10'
          />
        </div>
        <div className='flex flex-col gap-2 mb-7 mx-9'>
          <label htmlFor="password" className='text-sm text-gray-500 font-bold'>Enter password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            type="password"
            value={password}
            className='bg-gray-500/15 border border-gray-400 rounded-md h-10'
          />
        </div>
        <button type="submit" className='block mx-auto bg-blue-500 text-white-500  h-10 w-80 my-7 border border-gray-500 rounded-sm'>Sign in</button>
        <hr className='w-80 mx-auto'/>
        <div className = "mx-auto"> 
        <GoogleSignInButton />
       </div>
      </form>
    </div>
  )
}