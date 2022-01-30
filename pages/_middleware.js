import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  //Token will exist if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET })

  const { pathname } = req.nextUrl
  //Allow the request if the follwing is true...
  // a request for next-auth session &
  // if the token exists
  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next()
  }

  //Redirect to login if they dont haave a requesting a protected route
  if (!token && pathname !== '/login') {
    return NextResponse.redirect('/login')
  }
}
