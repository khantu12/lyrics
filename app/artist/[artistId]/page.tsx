import { getArtist } from '@/app/api/artist';
import { H1 } from '@/components/typography';

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
      <div className="ml-10 flex flex-col gap-5"></div>
    </div>
  );
}
