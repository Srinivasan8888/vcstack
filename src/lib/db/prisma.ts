/* eslint-disable @typescript-eslint/no-explicit-any */

let PrismaClientCtor: any
try {
  PrismaClientCtor = require('@prisma/client').PrismaClient
} catch {
  // @prisma/client not generated — static fallback will be used
}

const globalForPrisma = globalThis as unknown as { prisma: any }

export const prisma: any =
  globalForPrisma.prisma ??
  (PrismaClientCtor
    ? new PrismaClientCtor({
        log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
      })
    : null)

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
