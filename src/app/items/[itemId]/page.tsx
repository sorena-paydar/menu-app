'use client';

import { useEffect, useState } from 'react';
import useAPI from '@/hooks/useAPI';
import { useSnackbar } from '@/hooks/useSnackbar';
import { Skeleton } from '@/components/skeleton';
import { Item } from '@/types/item';
import { GET_ITEM_DETAILS_EP } from '@/app/items/API/endpoint';
import { format } from 'date-fns';
import { LoadingButton } from '@mui/lab';
import withAuth from '@/hoc/withAuth';

function ItemDetails({ params: { itemId } }: { params: { itemId: string } }) {
  const { generateSnackbar } = useSnackbar();

  const [item, setItem] = useState<Item>();

  const { request: getItemDetailsRequest, pending: getItemDetailsPending } =
    useAPI({
      method: 'get',
      route: GET_ITEM_DETAILS_EP({ itemId }),
      successCallback: ({ data }) => {
        setItem(data);
      },
      failedCallback: (error: { message: string }) => {
        generateSnackbar({
          message: error.message,
          variant: 'error',
        });
      },
    });

  useEffect(() => {
    getItemDetailsRequest();
  }, []);

  if (getItemDetailsPending || !item) {
    return (
      <div className="px-5 mt-8">
        <Skeleton />
      </div>
    );
  }

  return (
    <main className="flex flex-col px-5 mt-8">
      <div className="flex flex-col border border-gray-200 rounded-lg p-4 gap-y-3">
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

      <div className="flex justify-end mt-6">
        <LoadingButton variant="contained" color="error">
          Delete Item
        </LoadingButton>
      </div>
    </main>
  );
}

export default withAuth(ItemDetails);
