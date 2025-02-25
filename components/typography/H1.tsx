import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export function H1(props: ComponentProps<'h1'>) {
  return (
    <h1
      {...props}
      className={twMerge(
        'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
        props.className,
      )}
    />
  );
}
