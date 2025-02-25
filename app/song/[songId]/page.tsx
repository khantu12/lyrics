import { getSong } from '@/app/api/song';
import { H1 } from '@/components/typography';

export default async function Page({ params }: { params: { songId: string } }) {
  const song = await getSong(Number(params.songId as string));

  const sections = (() => {
    if (!song?.lines.length) return [[]];
    const lines: (typeof song.lines)[number][][] = [[]];
    let currentSection = 0;
    for (let i = 0; i < song?.lines?.length; i++) {
      const line = song.lines[i];
      if (line.type === 'section') {
        lines.push([]);
        currentSection = lines.length - 1;
      }
      lines[currentSection].push(line);
    }
    return lines;
  })();

  return (
    <div className="flex flex-col gap-10">
      <div className="relative left-1/2 ml-[-50vw] w-screen bg-slate-600 text-white">
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col gap-4">
            <H1>{song?.title}</H1>
            <div className="flex gap-4">
              <img alt="" src={song?.image ?? ''} width={200} height={200} />
              <div className="flex gap-2">
                <span>{song?.artist?.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {sections.map((section, index) => (
          <div key={index} className="flex flex-col gap-1">
            {section.map((line) => (
              <span key={line.id}>{line.type === 'section' ? `[${line.text}]` : line.text}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
