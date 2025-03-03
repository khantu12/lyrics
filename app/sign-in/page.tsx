import { Metadata } from 'next';
import Link from 'next/link';

import { UserAuthForm } from './userAuthForm';
import { GoogleLogin } from '@/components/common/googleLogin';
import { auth } from '../auth';
import { redirect } from 'next/navigation';
// import { buttonVariants } from '@/registry/new-york/ui/button';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.',
};

export default async function AuthenticationPage() {
  const session = await auth();
  if (session) redirect('/');

  return (
    <>
      <div className="container relative mx-auto hidden flex-col items-center justify-center md:grid lg:max-w-none lg:px-0">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
              <p className="text-sm text-muted-foreground">Enter your email below to sign in</p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{' '}
              <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
                Privacy Policy
              </Link>
              .
            </p>
            <GoogleLogin />
            <span className="flex justify-center gap-1 text-sm text-muted-foreground">
              Don&apos;t have an account yet?
              <Link
                href="/sign-up"
                className="font-semibold underline underline-offset-2 hover:text-zinc-800"
              >
                Sign Up
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
