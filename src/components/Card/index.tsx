import clsx from 'clsx';
import { HTMLAttributes } from 'react';

const Card = ({
  children,
  className,
  ...restProps
}: React.DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => (
  <div className={clsx('bg-white rounded-lg shadow-lg', className)} {...restProps}>
    {children}
  </div>
);

export default Card;
