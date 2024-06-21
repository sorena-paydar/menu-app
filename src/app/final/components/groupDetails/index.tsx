import useAPI from '@/hooks/useAPI';
import { GET_BRANCH_GROUP_PUBLIC_DETAILS_EP } from '@/app/final/API/endpoint';
import { useEffect, useState } from 'react';
import { GroupFinal } from '@/types/group';
import { Skeleton } from '@/components/skeleton';
import { format } from 'date-fns';
import Typography from '@mui/material/Typography';

interface Props {
  groupId: string;
}

export const GroupFinalDetails = ({ groupId }: Props) => {
  const [groupData, setGroupData] = useState<GroupFinal>();

  const { request: getGroupFinalRequest, pending: getGroupFinalPending } =
    useAPI({
      method: 'get',
      route: GET_BRANCH_GROUP_PUBLIC_DETAILS_EP({
        groupId,
      }),
      successCallback: ({ data }) => {
        setGroupData(data);
      },
    });

  useEffect(() => {
    getGroupFinalRequest();
  }, []);

  if (getGroupFinalPending) {
    return (
      <div className="px-5 mt-6">
        <Skeleton />
      </div>
    );
  }

  if (!groupData) {
    return (
      <div className="mt-6 flex flex-col items-center justify-center">
        <Typography variant="h6" color="grey">
          This branch has no menu group!
        </Typography>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border overflow-hidden mt-6">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          {groupData.name}
        </h2>
        <p className="text-gray-600 text-center mt-2">ID: {groupData._id}</p>
        <p className="text-gray-600 text-center mt-2">
          Created At: {format(groupData.createdAt, 'MMMM do, yyyy')}
        </p>
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800">Categories</h3>
          <ul className="mt-2">
            {groupData.categories.map((category) => (
              <li
                key={category._id}
                className="border-b last:border-b-0 border-gray-200 py-2"
              >
                <span className="font-medium text-gray-900">
                  {category.name}
                </span>
                <ul className="ml-4 mt-2">
                  {category.items
                    .sort((a, b) => a.position - b.position)
                    .map((item, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        Item {index + 1}
                      </li>
                    ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
