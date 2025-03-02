import prisma from '@/lib/prisma';

export const getAlbum = async (id: number) => {
  return await prisma.album.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      year: true,
      description: true,
      image: true,
      artist: {
        select: {
          id: true,
          name: true,
        },
      },
      songs: {
        select: {
          id: true,
          title: true,
          image: true,
        },
      },
    },
  });
};
