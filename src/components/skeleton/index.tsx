import MuiSkeleton from '@mui/material/Skeleton';
import classnames from 'classnames';

interface Props {
  count?: number;
  className?: string;
  skeletonClassName?: string;
}

export const Skeleton = ({
  count = 3,
  className,
  skeletonClassName,
}: Props) => {
  return (
    <div className={classnames('flex flex-col', className)}>
      {Array.from({ length: count }, (_, index) => (
        <MuiSkeleton
          animation="wave"
          key={index}
          className={classnames('h-20', skeletonClassName)}
        />
      ))}
    </div>
  );
};
