import prisma from '@/lib/prisma';

export const getArtist = async (id: number) => {
  return await prisma.artist.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      image: true,
      description: true,
      realName: true,
      songs: {
        select: {
          id: true,
          title: true,
          image: true,
        },
      },
      albums: {
        select: {
          id: true,
          title: true,
          image: true,
          year: true,
        },
      },
    },
  });
};
