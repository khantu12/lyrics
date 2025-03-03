import Link from 'next/link';
import { Search } from './common/search';
import { Button } from './ui/button';
import { auth } from '@/app/auth';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export const Navigation = async () => {
  const session = await auth();

  return (
    <nav className="flex items-center gap-5 bg-[#0a0a0a] p-4">
      <h1 className="text-xl font-medium text-white">Lyrics</h1>
      <div className="flex w-full items-center justify-between text-white">
        <Link href="/">Home</Link>
        <div className="flex w-1/3 items-center justify-end gap-3">
          <Search />
          {session ? (
            <Link href="/account">
              <Avatar className="cursor-pointer">
                <AvatarImage src={session?.user?.image || 'https://github.com/shadcn.png'} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <Link href="/sign-in">
              <Button variant="secondary">Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
