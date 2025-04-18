import { clerkMiddleware,createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])


export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    try {
      await auth.protect()
    } catch (e) {
      // 👇 Redirect unauthenticated users to the home page instead of Clerk fallback
      const url = new URL('/', req.url)
      return NextResponse.redirect(url)
    }
  }
   
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}