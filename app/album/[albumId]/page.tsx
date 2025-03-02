import { getAlbum } from '@/app/api/album';
import { H1 } from '@/components/typography';
import Link from 'next/link';

export default async function Page({ params }: { params: Promise<{ albumId: string }> }) {
  const { albumId } = await params;
  const album = await getAlbum(Number(albumId));

  return (
    <div className="flex flex-col gap-10">
      <div className="relative left-1/2 ml-[-50vw] w-screen bg-pink-500 text-white">
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col gap-4">
            <H1>{album?.title}</H1>
            <div className="flex gap-4">
              {/* TODO: Use Next image */}
              <img
                alt="artist image"
                src={album?.image ?? ''}
                width={200}
                height={200}
                className="rounded-md"
              />
              <div className="flex flex-col justify-between gap-2">
                <div>
                  <Link
                    href={`/artist/${album?.artist?.id}`}
                    className="text-xl underline underline-offset-2 hover:text-zinc-800"
                  >
                    {album?.artist?.name}
                  </Link>
                  <p className="mt-2">{album?.year}</p>
                </div>
                <p className="mb-4">{album?.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-10 flex flex-col gap-5">
        <H1 className="font-bold">Tracklist</H1>
        <div className="flex flex-col gap-1">
          {album?.songs.map((song, index) => (
            <Link
              key={song.id}
              className="flex gap-4 rounded-md p-2 hover:bg-pink-200"
              href={`/song/${song.id}`}
            >
              <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center gap-4">
                  <p className="text-lg font-semibold text-gray-500">{index + 1}</p>
                  <span className="text-lg font-semibold">{song.title}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
