import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  pages: { signIn: '/admin/login' },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        try {
          const { prisma } = await import('./db/prisma')
          const user = await prisma.user.findUnique({ where: { email: credentials.email } })
          if (!user || user.role !== 'ADMIN') return null

          // In production use bcrypt: bcrypt.compare(credentials.password, user.passwordHash)
          const { createHash } = await import('crypto')
          const hash = createHash('sha256').update(credentials.password).digest('hex')
          if (hash !== user.passwordHash) return null

          return { id: user.id, email: user.email, name: user.name ?? '', role: user.role }
        } catch {
          // Fallback for dev without DB: hardcoded admin
          if (
            credentials.email === process.env.ADMIN_EMAIL &&
            credentials.password === process.env.ADMIN_PASSWORD
          ) {
            return { id: 'dev-admin', email: credentials.email, name: 'Admin', role: 'ADMIN' }
          }
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as unknown as { role: string }).role
      return token
    },
    async session({ session, token }) {
      if (session.user) (session.user as { role?: string }).role = token.role as string
      return session
    },
  },
}
