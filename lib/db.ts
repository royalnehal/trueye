import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

export const dbAvailable = Boolean(process.env.DATABASE_URL)

function getPrisma(): PrismaClient {
  if (!dbAvailable) throw new Error('DATABASE_URL is not set')
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      datasources: { db: { url: process.env.DATABASE_URL } },
    })
  }
  return globalForPrisma.prisma
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    return (getPrisma() as unknown as Record<string | symbol, unknown>)[prop]
  },
})
