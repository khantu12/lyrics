import prisma from '@/lib/prisma';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function searchSongs(query: string) {
  // TODO: Check if this query is safe, or if it can be exploited
  return await prisma.$queryRaw`
    SELECT s.id, s.title as song_title, a.title AS album_title, ar.name AS artist
    FROM "Song" s
    LEFT JOIN "Album" a ON s."albumId" = a.id
    LEFT JOIN "Artist" ar ON s."artistId" = ar.id
    WHERE to_tsvector('simple', s.title) @@ plainto_tsquery('simple', ${query})
    
    UNION ALL
    
    SELECT a.id, a.title as album_title, NULL AS album, ar.name AS artist
    FROM "Album" a
    LEFT JOIN "Artist" ar ON a."artistId" = ar.id
    WHERE to_tsvector('simple', a.title) @@ plainto_tsquery('simple', ${query})

    UNION ALL
    
    SELECT l.id as line_id, l.text AS line_text, s.title AS album, ar.name AS artist
    FROM "Line" l
    LEFT JOIN "Song" s ON l."songId" = s.id
    LEFT JOIN "Artist" ar ON s."artistId" = ar.id
    WHERE to_tsvector('simple', l.text) @@ plainto_tsquery('simple', ${query})
    LIMIT 50;
  `;
}

export async function GET(request: NextApiRequest) {
  const url = new URL(request?.url || '');
  const query = url.searchParams.get('query');
  if (!query || query.length < 2)
    return NextResponse.json(
      { error: 'Query must be at least 2 characters long' },
      { status: 400 },
    );
  const searchResult = await searchSongs(query);
  return NextResponse.json({ searchResult }, { status: 200 });
}
