import clsx from 'clsx';

const Card = ({ children, className }: React.HTMLProps<'div'>) => (
  <div className={clsx('bg-white rounded-lg shadow-lg', className)}>{children}</div>
);

export default Card;
