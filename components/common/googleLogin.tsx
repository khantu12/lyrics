import { signIn } from '@/app/auth';
import { Icons } from '../icons';
import { Button } from '../ui/button';

export const GoogleLogin = () => {
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <form
        className="flex items-center justify-center"
        action={async () => {
          'use server';
          await signIn('google');
        }}
      >
        <Button variant="outline" type="submit" className="w-full">
          <Icons.google className="mr-2 size-4" />
          Google
        </Button>
      </form>
    </>
  );
};
