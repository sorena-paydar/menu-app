import { format } from 'date-fns';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Item } from '@/types/item';

export const ItemPreview = (item: Item) => {
  return (
    <div
      className="relative flex flex-col border border-gray-200 rounded-lg p-4 gap-y-3"
      key={item._id}
    >
      <div className="flex gap-x-3">
        <span className="text-gray-400">Name: </span>
        <h4>{item.name}</h4>
      </div>

      <div className="flex gap-x-3">
        <span className="text-gray-400">Price: </span>
        <span>${item.price}</span>
      </div>

      <div className="flex gap-x-3">
        <span className="text-gray-400">Description: </span>
        <span>{item.description}</span>
      </div>

      <div className="flex gap-x-3">
        <span className="text-gray-400">Created At: </span>
        <span>{format(item.createdAt, 'MMMM do, yyyy')}</span>
      </div>

      <Link
        href={ROUTES['items'] + `/${item._id}`}
        className="absolute top-1 right-1"
      >
        <IconButton>
          <ArrowForwardIosIcon />
        </IconButton>
      </Link>
    </div>
  );
};
