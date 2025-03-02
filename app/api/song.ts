import prisma from '@/lib/prisma';

export const getTopSongs = async () => {
  return await prisma.song.findMany({
    take: 10,
    select: {
      id: true,
      title: true,
      image: true,
      artist: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export const getSong = async (id: number) => {
  return await prisma.song.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      description: true,
      image: true,
      album: {
        select: {
          id: true,
          title: true,
        },
      },
      artist: {
        select: {
          id: true,
          name: true,
        },
      },
      lines: {
        select: {
          id: true,
          text: true,
          type: true,
          order: true,
          annotations: {
            select: {
              id: true,
              text: true,
              range: true,
              user: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
        orderBy: {
          order: 'asc',
        },
      },
    },
  });
};
