'use client'

import * as React from 'react'
import { useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import GoogleSignInButton from '../components/GoogleButton'
import Link from 'next/link'
import { ClerkAPIError } from '@clerk/types'
import { isClerkAPIResponseError } from '@clerk/nextjs/errors'

export default function Page() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [verifying, setVerifying] = React.useState(false)
  const [code, setCode] = React.useState('')
  const [errors, setErrors] = React.useState<ClerkAPIError[]>()
  const router = useRouter()
  React.useEffect(() => {
    const circles = [
      { id: 'circle1', speed: 0.01, size: 80 },
      { id: 'circle2', speed: 0.01, size: 60 },
      { id: 'circle3', speed: 0.01, size: 40 },
    ]
  
    const mouse = { x: 0, y: 0 }
  
    const circleStates = circles.map(({ id, speed, size }) => {
      const el = document.getElementById(id)
      return {
        el,
        speed,
        size,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      }
    })
  
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
  
    const animate = () => {
      circleStates.forEach((circle) => {
        if (!circle.el) return
  
        const maxX = window.innerWidth - circle.size
        const maxY = window.innerHeight - circle.size
  
        circle.x += (mouse.x - circle.x) * circle.speed
        circle.y += (mouse.y - circle.y) * circle.speed
  
        const clampedX = Math.max(0, Math.min(circle.x, maxX))
        const clampedY = Math.max(0, Math.min(circle.y, maxY))
  
        circle.el.style.left = `${clampedX}px`
        circle.el.style.top = `${clampedY}px`
      })
  
      requestAnimationFrame(animate)
    }
  
    document.addEventListener('mousemove', handleMouseMove)
    requestAnimationFrame(animate)
  
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Handle submission of the sign-up form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors(undefined)
    if (!isLoaded) return

    // Start the sign-up process using the email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      })

      // Set 'verifying' true to display second form
      // and capture the OTP code
      setVerifying(true)
    } catch (err: ClerkAPIError|any) {
    
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      if (isClerkAPIResponseError(err)) setErrors(err.errors)
        console.error(JSON.stringify(err, null, 2))
    }
  }

  // Handle the submission of the verification form
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.push('/dashboard')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err: ClerkAPIError|any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error('Error:', JSON.stringify(err, null, 2))
    }
  }

  // Display the verification form to capture the OTP code
  if (verifying) {
    return (
      <div className='z-10'>
         <div className='absolute size-10 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%  blur-3xl brightness-100 shadow-4xl z-0 animate-float1'>hello </div>
      <div className='absolute left-200 top-40 size-100 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%  blur-3xl brightness-100 shadow-4xl z-0 animate-float2' id='circle1'>hello </div>
      <div className='absolute left-150 top-40 size-80 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%  blur-3xl brightness-100 shadow-4xl z-0 animate-float3'>hello </div>
      <div className='absolute size-50 left-20 top-0 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%  blur-3xl brightness-100 shadow-4xl z-0 animate-float3'>hello </div>
      <div className='absolute left-200 top-40 size-100 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%  blur-3xl brightness-100 shadow-4xl z-0 animate-float2'>hello </div>
      <div className='absolute left-10 top-20 size-30 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%  blur-3xl brightness-100 shadow-4xl z-0 animate-float1' id='circle2'>hello </div>
      <div className='absolute size-20 top-10 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%  blur-3xl brightness-100 shadow-4xl z-0 animate-float2'>hello </div>
      <div className='absolute left-100 top-30 size-70 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%  blur-3xl brightness-100 shadow-4xl z-0 animate-float1'>hello </div>
      <div className='absolute left-50 top-20 size-100 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%  blur-3xl brightness-100 shadow-4xl z-0 animate-float3' id='circle3'>hello </div>
      <div className='absolute size-60 top-20 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%  blur-3xl brightness-100 shadow-4xl z-0 animate-float2'>hello </div>
      <div className='absolute left-50 top-10 size-90 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%  blur-3xl brightness-100 shadow-4xl z-0 animate-float3'>hello </div>
      <div className='absolute left-100 top-0 size-100 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%  blur-3xl brightness-100 shadow-4xl z-0 animate-float1'>hello </div>
      <div className="relative flex flex-col  py-8 mx-auto bg-linear-to-b from-gray-400/15 to-gray-500/15 w-100 h-130 border-transparent rounded-lg shadow-sm z-100 ">
        
        <h1 className='text-3xl font-bold my-5 mb-8 mx-auto'>Sign up</h1>
        <form onSubmit={handleVerify}>
        <div className='flex flex-col gap-2 mb-7 mx-9'>
          <label id="code" className='text-sm text-gray-500 font-bolds'>Enter your verification code</label>
          <input className='bg-gray-500/15 border border-gray-400 rounded-md h-10 p-2' value={code} id="code" name="code" onChange={(e) => setCode(e.target.value)} />
          </div>
          <button  className='block mx-auto bg-blue-500 text-white-500  h-10 w-82 my-7 border border-gray-500 rounded-sm hover:cursor-pointer hover:bg-blue-700' type="submit">Verify</button>
        </form>
      </div>
      </div>
      
    )
  }
   

  // Display the initial sign-up form to capture the email and password
  return (
   <>
      <div className='absolute size-10 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%  blur-3xl brightness-100 shadow-4xl z-0 animate-float1'>hello </div>
      <div className='absolute left-200 top-40 size-100 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%  blur-3xl brightness-100 shadow-4xl z-0 animate-float2' id='circle1'>hello </div>
      <div className='absolute left-150 top-40 size-80 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%  blur-3xl brightness-100 shadow-4xl z-0 animate-float3'>hello </div>
      <div className='absolute size-50 left-20 top-0 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%  blur-3xl brightness-100 shadow-4xl z-0 animate-float3'>hello </div>
      <div className='absolute left-200 top-40 size-100 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%  blur-3xl brightness-100 shadow-4xl z-0 animate-float2'>hello </div>
      <div className='absolute left-10 top-20 size-30 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%  blur-3xl brightness-100 shadow-4xl z-0 animate-float1' id='circle2'>hello </div>
      <div className='absolute size-20 top-10 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%  blur-3xl brightness-100 shadow-4xl z-0 animate-float2'>hello </div>
      <div className='absolute left-100 top-30 size-70 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%  blur-3xl brightness-100 shadow-4xl z-0 animate-float1'>hello </div>
      <div className='absolute left-50 top-20 size-100 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%  blur-3xl brightness-100 shadow-4xl z-0 animate-float3' id='circle3'>hello </div>
      <div className='absolute size-60 top-20 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%  blur-3xl brightness-100 shadow-4xl z-0 animate-float2'>hello </div>
      <div className='absolute left-50 top-10 size-90 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%  blur-3xl brightness-100 shadow-4xl z-0 animate-float3'>hello </div>
      <div className='absolute left-100 top-0 size-100 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%  blur-3xl brightness-100 shadow-4xl z-0 animate-float1'>hello </div>
      <div className="relative flex flex-col  py-8 mx-auto bg-linear-to-b from-gray-400/15 to-gray-500/15 w-100 h-130 border-transparent rounded-lg shadow-sm z-100 ">
        
        <h1 className='text-3xl font-bold my-5 mb-8 mx-auto'>Sign up</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='flex flex-col gap-2 mb-7 mx-9'>
            <label htmlFor="email" className='text-sm text-gray-500 font-bold'>Email</label>
            <input
              onChange={(e) => setEmailAddress(e.target.value)}
              id="email"
              name="email"
              type="email"
              value={emailAddress}
              className='bg-gray-500/15 border border-gray-400 rounded-md h-10 p-2'
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
              className='bg-gray-500/15 border border-gray-400 rounded-md h-10 p-2'
            />
          </div>
          <div id="clerk-captcha" />

          <button type="submit" className='block mx-auto bg-blue-500 text-white-500  h-10 w-82 my-7 border border-gray-500 rounded-sm hover:cursor-pointer hover:bg-blue-700'>Sign up</button>
          <hr className='w-80 mx-auto' />
          <div className="mx-auto">
            <GoogleSignInButton />
          </div>
        </form>
        <Link href="/" className='text-sm text-white-300 font-medium mx-auto'>Already have an account? <u>Sign in</u></Link>
        {errors && (
        <ul>
          {errors.map((el, index) => (
            <li key={index}>{el.longMessage}</li>
          ))}
        </ul>
      )}
      </div>
      </>
  )
}