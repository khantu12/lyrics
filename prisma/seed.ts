import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export async function main() {
  const users = await prisma.user.findMany()
  console.log("@@@@ users: ", users)
}

main()