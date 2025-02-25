import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export function H3(props: ComponentProps<'h3'>) {
  return (
    <h3
      {...props}
      className={twMerge('scroll-m-20 text-2xl font-semibold tracking-tight', props.className)}
    />
  );
}
