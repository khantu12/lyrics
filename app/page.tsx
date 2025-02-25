import Link from 'next/link';

const songs = [{ id: 1, title: 'Sunflowers' }];

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <div>
        {songs.map((song, index) => (
          <Link key={index} href={`song/${song.id}`}>
            Link to {song.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
