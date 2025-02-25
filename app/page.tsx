import Link from 'next/link';

const songs = [
  { id: 1, title: 'Sunflowers' },
  { id: 2, title: 'Your best friend is a hater' },
];

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <div className="flex flex-col gap-2">
        <h2>Songs</h2>
        {songs.map((song, index) => (
          <Link key={index} href={`song/${song.id}`}>
            <div className="rounded-lg border p-4">{song.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
