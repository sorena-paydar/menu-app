import { Skeleton } from '@/components/skeleton';
import { format } from 'date-fns';
import { useFieldArray, useWatch } from 'react-hook-form';
import { Item } from '@/types/item';
import classnames from 'classnames';
import Typography from '@mui/material/Typography';
import { ROUTES } from '@/constants/routes';
import Link from 'next/link';
import { useCategories } from '@/hooks/useCategories';
import { Group } from '@/types/group';
import { Category } from '@/types/category';

interface Props {
  name: string;
  control: any;
  errorMessage?: string;
}

export const CreateGroupCategories = ({
  name,
  control,
  errorMessage,
}: Props) => {
  const { fields, append, remove } = useFieldArray({
    name,
    control,
  });
  const value = useWatch({ name, control }) || [];

  const { categories, getCategoriesPending } = useCategories();

  const selectItemHandler = ({ _id }: Category) => {
    const index = value.findIndex((item: Category) => item._id === _id);

    if (index === -1) {
      append({ _id, position: fields.length + 1 });
      return;
    }

    remove(index);
  };

  if (getCategoriesPending) return <Skeleton />;

  return (
    <div className="flex flex-col gap-y-3">
      {categories.length === 0 ? (
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

      {categories.map((category: Category & { id: string }) => {
        const isItemSelected = value.some(
          (selectedItem: Group) => selectedItem._id === category._id,
        );

        return (
          <div
            className={classnames(
              'relative flex flex-col border border-gray-200 rounded-lg p-4 gap-y-3',
              { 'border-blue-500': isItemSelected },
            )}
            key={category._id}
            onClick={() => selectItemHandler(category)}
          >
            <div className="flex gap-x-3">
              <span className="text-gray-400">Name: </span>
              <h4>{category.name}</h4>
            </div>

            <div className="flex gap-x-3">
              <span className="text-gray-400">Created At: </span>
              <span>{format(category.createdAt, 'MMMM do, yyyy')}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
