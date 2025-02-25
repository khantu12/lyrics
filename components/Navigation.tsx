import Link from 'next/link';

export const Navigation = () => {
  return (
    <nav className="flex items-center gap-5 bg-slate-300 p-4">
      <h1 className="text-xl font-medium">Lyrics</h1>
      <Link href="/">Home</Link>
    </nav>
  );
};
