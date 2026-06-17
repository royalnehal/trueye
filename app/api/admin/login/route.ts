import { NextResponse } from 'next/server'
import { ADMIN_SESSION_COOKIE, createSessionToken, verifyPassword } from '@/lib/auth'

export async function POST(request: Request) {
  const { password } = await request.json()

  if (typeof password !== 'string' || !verifyPassword(password)) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  const token = await createSessionToken()
  const response = NextResponse.json({ success: true })
  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8,
  })
  return response
}
