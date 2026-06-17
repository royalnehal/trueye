export const ADMIN_SESSION_COOKIE = 'trueye_admin_session'

function getSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || 'trueye-dev-secret'
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

async function hmac(message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message))
  return toHex(signature)
}

export async function createSessionToken(): Promise<string> {
  const issuedAt = Date.now().toString()
  const signature = await hmac(issuedAt)
  return `${issuedAt}.${signature}`
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false
  const [issuedAt, signature] = token.split('.')
  if (!issuedAt || !signature) return false
  const expected = await hmac(issuedAt)
  return expected === signature
}

export function verifyPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD || 'trueye-admin'
  return password === adminPassword
}
