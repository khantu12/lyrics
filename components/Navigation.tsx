import Link from 'next/link';
import { Search } from './common/search';

export const Navigation = () => {
  return (
    <nav className="flex items-center gap-5 bg-[#0a0a0a] p-4">
      <h1 className="text-xl font-medium text-white">Lyrics</h1>
      <div className="flex w-full items-center justify-between text-white">
        <Link href="/">Home</Link>
        <div className="w-1/3">
          <Search />
        </div>
      </div>
    </nav>
  );
};
