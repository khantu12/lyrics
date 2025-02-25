import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export function H2(props: ComponentProps<'h2'>) {
  return (
    <h2
      {...props}
      className={twMerge(
        'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
        props.className,
      )}
    />
  );
}
