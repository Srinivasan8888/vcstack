import { cookies } from 'next/headers'

const SESSION_COOKIE = 'indianvcs_admin'
const SESSION_VALUE = 'authenticated'

/** Check if the current request has a valid admin session */
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  return cookieStore.get(SESSION_COOKIE)?.value === SESSION_VALUE
}

/** Verify the static admin password from env */
export function verifyPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) return false
  return password === adminPassword
}

export { SESSION_COOKIE, SESSION_VALUE }
