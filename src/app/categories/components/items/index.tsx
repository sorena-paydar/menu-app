import { useItems } from '@/hooks/useItems';
import { Skeleton } from '@/components/skeleton';
import { format } from 'date-fns';
import { useFieldArray, useWatch } from 'react-hook-form';
import { Item } from '@/types/item';
import classnames from 'classnames';
import Typography from '@mui/material/Typography';
import { ROUTES } from '@/constants/routes';
import Link from 'next/link';

interface Props {
  name: string;
  control: any;
  errorMessage?: string;
}

export const CreateCategoryItems = ({ name, control, errorMessage }: Props) => {
  const { fields, append, remove } = useFieldArray({
    name,
    control,
  });
  const value = useWatch({ name, control }) || [];

  const { items, getItemsPending } = useItems();

  const selectItemHandler = ({ _id }: Item) => {
    const index = value.findIndex((item: Item) => item._id === _id);

    if (index === -1) {
      append({ _id, position: fields.length + 1 });
      return;
    }

    remove(index);
  };

  if (getItemsPending) return <Skeleton />;

  return (
    <div className="flex flex-col gap-y-3">
      {items.length === 0 ? (
        <div className="flex flex-col gap-y-2">
          <Typography variant="body2" color="red">
            No Items Found!
          </Typography>

          <Link href={ROUTES['items']} className="text-blue-500">
            Go to Items page and create one
          </Link>
        </div>
      ) : (
        errorMessage && <p className="text-red-500">{errorMessage}</p>
      )}

      {items.map((item: Item & { id: string }) => {
        const isItemSelected = value.some(
          (selectedItem: Item) => selectedItem._id === item._id,
        );

        return (
          <div
            className={classnames(
              'relative flex flex-col border rounded-lg p-4 gap-y-3',
              { 'border-gray-200 ': !isItemSelected },
              { 'border-blue-500': isItemSelected },
            )}
            key={item._id}
            onClick={() => selectItemHandler(item)}
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
          </div>
        );
      })}
    </div>
  );
};
