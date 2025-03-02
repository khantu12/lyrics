import prisma from '@/lib/prisma';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function searchSongs(query: string) {
  const songTitleResult = prisma.$queryRaw`
    SELECT s.id as song_id, s.image as song_image, s.title as song_title, a.title AS album_title, ar.name AS artist_name
    FROM "Song" s
    LEFT JOIN "Album" a ON s."albumId" = a.id
    LEFT JOIN "Artist" ar ON s."artistId" = ar.id
    WHERE to_tsvector('simple', s.title) @@ plainto_tsquery('simple', ${query});
  `;

  const albumTitleResult = prisma.$queryRaw`
    SELECT a.id as album_id, a.image as album_image, a.title as album_title, ar.name AS artist_name
    FROM "Album" a
    LEFT JOIN "Artist" ar ON a."artistId" = ar.id
    WHERE to_tsvector('simple', a.title) @@ plainto_tsquery('simple', ${query})
  `;

  const artistNameResult = prisma.$queryRaw`
    SELECT ar.id as artist_id, ar.image as artist_image, ar.name as artist_name
    FROM "Artist" ar
    WHERE to_tsvector('simple', ar.name) @@ plainto_tsquery('simple', ${query})
  `;

  const lineTextResult = prisma.$queryRaw`
    SELECT s.id as song_id, s.image as song_image, l.id as line_id, l.text AS line_text, s.title AS song_title, ar.name AS artist_name
    FROM "Line" l
    JOIN "Song" s ON l."songId" = s.id
    LEFT JOIN "Artist" ar ON s."artistId" = ar.id
    WHERE to_tsvector('simple', l.text) @@ plainto_tsquery('simple', ${query})
    LIMIT 50;
  `;

  const [str, atr, ltr, anr] = await Promise.all([
    songTitleResult,
    albumTitleResult,
    lineTextResult,
    artistNameResult,
  ]);

  return {
    songTitleResult: str,
    albumTitleResult: atr,
    lineTextResult: ltr,
    artistNameResult: anr,
  } as any;
}

export async function GET(request: NextApiRequest) {
  const url = new URL(request?.url || '');
  const query = url.searchParams.get('query');
  if (!query) return NextResponse.json({}, { status: 200 });
  const searchResult = await searchSongs(query);
  if (
    searchResult.albumTitleResult.length === 0 &&
    searchResult.songTitleResult.length === 0 &&
    searchResult.lineTextResult.length === 0 &&
    searchResult.artistNameResult.length === 0
  )
    return NextResponse.json({}, { status: 404 });
  return NextResponse.json({ searchResult }, { status: 200 });
}
