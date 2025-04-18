'use client'

import * as React from 'react'
import { useSignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { CustomGoogleOneTap } from './components/CustomGoogleOneTap'
import GoogleSignInButton from './components/GoogleButton'

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
        router.push('/dashboard')
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
    <>
    <div className='absolute size-10 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%  blur-3xl brightness-100 shadow-4xl z-0 animate-float1'>hello </div>
    <div className='absolute left-200 top-80 size-100 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%  blur-3xl brightness-100 shadow-4xl z-0 animate-float2'>hello </div>
    <div className='absolute left-150 top-50 size-80 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%  blur-3xl brightness-100 shadow-4xl z-0 animate-float3'>hello </div>
    <div className='absolute size-50 left-20 top-0 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%  blur-3xl brightness-100 shadow-4xl z-0 animate-float3'>hello </div>
    <div className='absolute left-200 top-50 size-100 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%  blur-3xl brightness-100 shadow-4xl z-0 animate-float2'>hello </div>
    <div className='absolute left-10 top-20 size-30 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%  blur-3xl brightness-100 shadow-4xl z-0 animate-float1'>hello </div>
    <div className='absolute size-20 top-10 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%  blur-3xl brightness-100 shadow-4xl z-0 animate-float2'>hello </div>
    <div className='absolute left-100 top-30 size-70 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%  blur-3xl brightness-100 shadow-4xl z-0 animate-float1'>hello </div>
    <div className='absolute left-50 top-20 size-100 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%  blur-3xl brightness-100 shadow-4xl z-0 animate-float3'>hello </div>
    <div className='absolute size-60 top-20 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%  blur-3xl brightness-100 shadow-4xl z-0 animate-float2'>hello </div>
    <div className='absolute left-50 top-10 size-90 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%  blur-3xl brightness-100 shadow-4xl z-0 animate-float3'>hello </div>
    <div className='absolute left-100 top-0 size-100 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%  blur-3xl brightness-100 shadow-4xl z-0 animate-float1'>hello </div>
    <div className="relative flex flex-col  py-8 mx-auto bg-linear-to-b from-gray-400/15 to-gray-500/15 w-100 h-130 border-transparent rounded-lg shadow-sm z-100 ">
      
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
            className='bg-gray-500/15 border border-gray-400 rounded-md h-10 '
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
            className='bg-gray-500/15 border border-gray-400 rounded-md h-10 '
          />
        </div>
        <button type="submit" className='block mx-auto bg-blue-500 text-white-500  h-10 w-82 my-7 border border-gray-500 rounded-sm '>Sign in</button>
        <hr className='w-80 mx-auto' />
        <div className="mx-auto">
          <GoogleSignInButton />
        </div>
      </form>
    </div>
    </>
  )
}