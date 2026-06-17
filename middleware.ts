import { NextResponse, type NextRequest } from 'next/server'
import { ADMIN_SESSION_COOKIE, verifySessionToken } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin/login') || pathname.startsWith('/api/admin/login')) {
    return NextResponse.next()
  }

  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value
    if (!(await verifySessionToken(token))) {
      if (pathname.startsWith('/api/admin')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
