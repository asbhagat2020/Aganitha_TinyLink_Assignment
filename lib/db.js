// // lib/db.js
// import { PrismaClient } from '@prisma/client'

// const globalForPrisma = globalThis

// const prisma = globalForPrisma.prisma || new PrismaClient()

// if (process.env.NODE_ENV !== 'production') {
//   globalForPrisma.prisma = prisma
// }

// export const db = prisma


import { PrismaClient } from '@prisma/client'

let prisma

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global._prisma) {
    global._prisma = new PrismaClient()
  }
  prisma = global._prisma
}

prisma.$connect()

export const db = prisma