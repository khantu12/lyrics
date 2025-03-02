'use client';

import { ReactNode, useCallback, useState } from 'react';
import { Input } from '../ui/input';
import { debounce } from 'lodash';
import axios, { AxiosError } from 'axios';
import { Popover, PopoverAnchor, PopoverContent } from '../ui/popover';
import Link from 'next/link';

type SearchResults = {
  songTitleResult: {
    song_id: number;
    song_title: string;
    song_image: string;
    album_title: string;
    artist_name: string;
  }[];
  albumTitleResult: {
    album_id: number;
    album_image: string;
    album_title: string;
    artist_name: string;
  }[];
  lineTextResult: {
    song_id: number;
    song_image: string;
    line_id: number;
    line_text: string;
    song_title: string;
    artist_name: string;
  }[];
  artistNameResult: {
    artist_id: number;
    artist_image: string;
    artist_name: string;
  }[];
};

export const Search = () => {
  const [results, setResults] = useState<{
    data: SearchResults | null;
    status: number | undefined;
  } | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const search = useCallback(
    debounce(async (query: string) => {
      if (!query) return setResults(null);
      try {
        const res = await axios.get('/api/search', { params: { query } });
        setResults({ data: res.data.searchResult, status: 200 });
      } catch (err: unknown) {
        if (err instanceof AxiosError) setResults({ data: null, status: err.response?.status });
      }
    }, 300),
    [],
  );

  return (
    <>
      <Popover open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
        <PopoverAnchor>
          <Input
            className="w-[300px]"
            placeholder="Search songs, artists, or lyrics..."
            onFocus={() => setOpen(true)}
            onChange={(event) => {
              search(event.target.value);
              setOpen(true);
            }}
          />
        </PopoverAnchor>
        <PopoverContent onOpenAutoFocus={(e) => e.preventDefault()}>
          {results === null ? (
            <p>Write to search...</p>
          ) : results.status === 404 ? (
            <p>No results found</p>
          ) : (
            <>
              {!!results?.data?.songTitleResult.length && (
                <SearchSongsSection
                  data={results.data.songTitleResult}
                  onLinkClick={() => setOpen(false)}
                />
              )}
              {!!results?.data?.lineTextResult?.length && (
                <SearchLyricsSection
                  data={results.data.lineTextResult}
                  onLinkClick={() => setOpen(false)}
                />
              )}
              {!!results?.data?.artistNameResult?.length && (
                <SearchArtistsSection
                  data={results.data.artistNameResult}
                  onLinkClick={() => setOpen(false)}
                />
              )}
              {!!results?.data?.albumTitleResult?.length && (
                <SearchAlbumsSection
                  data={results.data.albumTitleResult}
                  onLinkClick={() => setOpen(false)}
                />
              )}
            </>
          )}
        </PopoverContent>
      </Popover>
    </>
  );
};

const SearchSongsSection = (props: {
  data?: SearchResults['songTitleResult'];
  onLinkClick?: () => void;
}) => {
  return (
    <SearchContainer>
      <SearchSection>Songs</SearchSection>
      {props.data?.map((res) => (
        <SearchLink
          key={res.song_id}
          href={`/song/${res.song_id}`}
          onClick={() => props.onLinkClick?.()}
        >
          <div className="flex gap-2">
            <img src={res.song_image} alt="" className="size-[50px]" />
            <div className="flex flex-col">
              <span className="font-semibold">{res.song_title}</span>
              <span>{res.artist_name}</span>
            </div>
          </div>
        </SearchLink>
      ))}
    </SearchContainer>
  );
};

const SearchLyricsSection = (props: {
  data?: SearchResults['lineTextResult'];
  onLinkClick?: () => void;
}) => {
  return (
    <SearchContainer>
      <SearchSection>Lyrics</SearchSection>
      {props.data?.map((res) => (
        <SearchLink
          key={res.line_id}
          href={`/song/${res.song_id}?line=${res.line_id}`}
          onClick={() => props.onLinkClick?.()}
        >
          <div className="flex gap-2">
            <img src={res.song_image} alt="" className="size-[50px]" />
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <span className="font-semibold">{res.song_title}</span>
                <span>{res.artist_name}</span>
              </div>
              <span className="text-sm text-gray-500">{res.line_text}</span>
            </div>
          </div>
        </SearchLink>
      ))}
    </SearchContainer>
  );
};

const SearchArtistsSection = (props: {
  data?: SearchResults['artistNameResult'];
  onLinkClick?: () => void;
}) => {
  return (
    <SearchContainer>
      <SearchSection>Artists</SearchSection>
      {props.data?.map((res) => (
        <SearchLink
          key={res.artist_id}
          href={`/artist/${res.artist_id}`}
          onClick={() => props.onLinkClick?.()}
        >
          <div className="flex gap-2">
            <img src={res.artist_image} alt="" className="size-[50px]" />
            <span className="font-semibold">{res.artist_name}</span>
          </div>
        </SearchLink>
      ))}
    </SearchContainer>
  );
};

const SearchAlbumsSection = (props: {
  data?: SearchResults['albumTitleResult'];
  onLinkClick?: () => void;
}) => {
  return (
    <SearchContainer>
      <SearchSection>Albums</SearchSection>
      {props.data?.map((res) => (
        <SearchLink
          key={res.album_id}
          href={`/album/${res.album_id}`}
          onClick={() => props.onLinkClick?.()}
        >
          <div className="flex gap-2">
            <img src={res.album_image} alt="" className="size-[50px]" />
            <div className="flex flex-col">
              <span className="font-semibold">{res.album_title}</span>
              <span>{res.artist_name}</span>
            </div>
          </div>
        </SearchLink>
      ))}
    </SearchContainer>
  );
};

const SearchLink = (props: { href: string; children: ReactNode; onClick?: () => void }) => {
  return (
    <Link
      href={props.href}
      onClick={props.onClick}
      className="flex flex-col rounded-md p-2 hover:bg-pink-200"
    >
      {props.children}
    </Link>
  );
};

const SearchSection = (props: { children: ReactNode }) => {
  return <span className="w-full border-b p-1">{props.children}</span>;
};

const SearchContainer = (props: { children: ReactNode }) => {
  return <div className="mt-3 flex flex-col gap-2">{props.children}</div>;
};
