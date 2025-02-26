import { H1, H2, H3 } from '@/components/typography';
import Link from 'next/link';
import { getTopSongs } from './api/song';

export default async function Home() {
  const songs = await getTopSongs();

  return (
    <div className="mt-8 flex flex-col gap-9">
      <H1>Lyrics Top 10</H1>
      <div className="flex flex-col gap-1">
        <H2>Songs</H2>
        {songs.map((song, index) => (
          <Link
            key={index}
            href={`song/${song.id}`}
            className="grid grid-cols-[80px_1fr_1fr_100px] items-center rounded-sm p-3 hover:bg-pink-200"
          >
            <span>{index + 1}</span>
            <H3>{song.title}</H3>
            <span>{song.artist?.name}</span>
            {/* <span className="flex items-center gap-2">
              <EyeOpenIcon />
              {toNumberString(song.)}
            </span> */}
          </Link>
        ))}
      </div>
    </div>
  );
}
