import prisma from "@/lib/prisma"

export const getTopSongs = async () => {
  return await prisma.song.findMany({
    take: 10,
    select: {
      title: true,
      image: true,
      artist: {
        select: {
          id: true,
          name: true,
        }
      }
    }
  })
}