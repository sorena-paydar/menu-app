import { useGroups } from '@/hooks/useGroups';
import { Skeleton } from '@/components/skeleton';
import { useWatch } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { Group } from '@/types/group';
import classnames from 'classnames';
import { format } from 'date-fns';

interface Props {
  name: string;
  setValue: any;
  control: any;
  errorMessage?: string;
}

export const GroupList = ({ name, setValue, control, errorMessage }: Props) => {
  const value = useWatch({ name, control }) || null;

  const { groups, getGroupsPending, setGroups } = useGroups();

  const selectGroupHandler = ({ _id }: Group) => {
    if (value && value === _id) {
      setValue(name, null);
      return;
    }
    setValue(name, _id);
  };

  if (getGroupsPending) return <Skeleton />;

  return (
    <div className="flex flex-col gap-y-3">
      {groups.length === 0 ? (
        <div className="flex flex-col">
          <Typography variant="body2" color="red">
            No Group Found!
          </Typography>
          <Link href={ROUTES['groups']} className="text-blue-500 underline">
            Go to Groups via this link.
          </Link>
        </div>
      ) : (
        errorMessage && <p className="text-red-500">{errorMessage}</p>
      )}

      {groups.map((group: Group & { id: string }) => {
        const isGroupSelected = group._id === value;

        return (
          <div
            className={classnames(
              'relative flex flex-col border  rounded-lg p-4 gap-y-3',
              { 'border-gray-200': !isGroupSelected },
              { 'border-blue-500': isGroupSelected },
            )}
            key={group._id}
            onClick={() => selectGroupHandler(group)}
          >
            <div className="flex gap-x-3">
              <span className="text-gray-400">Name: </span>
              <h4>{group.name}</h4>
            </div>

            <div className="flex gap-x-3">
              <span className="text-gray-400">Created At: </span>
              <span>{format(group.createdAt, 'MMMM do, yyyy')}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
