import { getArtist } from '@/app/api/artist';
import { H1 } from '@/components/typography';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default async function Page({ params }: { params: Promise<{ artistId: string }> }) {
  const { artistId } = await params;
  const artist = await getArtist(Number(artistId));

  return (
    <div className="flex flex-col gap-10">
      <div className="relative left-1/2 ml-[-50vw] w-screen bg-pink-500 text-white">
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col gap-4">
            <H1>{artist?.name}</H1>
            <div className="flex gap-4">
              {/* TODO: Use Next image */}
              <img
                alt="artist image"
                src={artist?.image ?? ''}
                width={200}
                height={200}
                className="rounded-md"
              />
              <div className="flex gap-2">
                <span className="text-xl">{artist?.realName}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-10 flex flex-col gap-5">
        <H1 className="font-bold">Discography</H1>
        <Tabs value={'albums'}>
          <TabsList>
            <TabsTrigger value="albums">Albums</TabsTrigger>
            <TabsTrigger value="singles">Singles and EPs</TabsTrigger>
          </TabsList>
          <TabsContent value="albums" className="mt-4 grid grid-cols-3 gap-4">
            {artist?.albums.map((album, index) => (
              <div key={album.id} className="flex gap-4">
                <img
                  alt="album image"
                  src={album.image}
                  width={100}
                  height={100}
                  className="rounded-md"
                />
                <div className="flex flex-col gap-2">
                  <span className="text-lg font-semibold">{album.title}</span>
                  <span className="text-sm">
                    {index === 0 ? 'Latest Release' : album?.year} · Album
                  </span>
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="singles">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
