'use client';
import { getSong } from '@/app/api/song';
import { H3 } from '@/components/typography';
import { cn } from '@/lib/utils';
import { useState } from 'react';

type Line = NonNullable<Awaited<ReturnType<typeof getSong>>>['lines'][number];

type LinesProps = {
  sections: Line[][];
};

export const Lines = ({ sections }: LinesProps) => {
  const [selectedLine, setSelectedLine] = useState<Line | null>(null);

  return (
    <div className="grid grid-cols-2 gap-5 px-10">
      <div>
        {sections.map((section, index) => (
          <div key={index} className="flex flex-col gap-1">
            {section.map((line) => (
              <span
                key={line.id}
                className={cn([
                  line.annotations.length && 'cursor-pointer bg-gray-300 hover:bg-pink-200',
                  selectedLine?.id === line.id && 'bg-pink-200',
                  'max-w-max',
                ])}
                onClick={() => {
                  if (line.annotations.length) setSelectedLine(line);
                }}
              >
                {line.type === 'section' ? `[${line.text}]` : line.text}
              </span>
            ))}
          </div>
        ))}
      </div>
      {selectedLine !== null && (
        <div className="w-2/3">
          <div className="flex flex-row items-center justify-between">
            <H3>Lyrics Annotation</H3>
            <p className="text-sm">0 Contributors</p>
          </div>
          <div>
            <div className="pt-4">
              {selectedLine.annotations.map((annotation) => (
                <div key={annotation.id} className="flex flex-col gap-2">
                  <p>{annotation.text}</p>
                  <p className="text-sm text-gray-500">{annotation.user.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
