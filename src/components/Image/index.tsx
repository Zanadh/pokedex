import { ImgHTMLAttributes } from 'react';
import Skeleton from '../Skeleton';

interface IImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  isLoading?: boolean;
  isError?: boolean;
}
const Image = ({ isLoading, isError, ...props }: IImageProps) => {
  if (isLoading || isError) return <Skeleton.ImageSkeleton className={props.className} />;
  return <img {...props} />;
};

export default Image;
