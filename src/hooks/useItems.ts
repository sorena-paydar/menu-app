import { useSnackbar } from '@/hooks/useSnackbar';
import { useEffect, useState } from 'react';
import { Item } from '@/types/item';
import useAPI from '@/hooks/useAPI';
import { GET_ITEMS_EP } from '@/app/items/API/endpoint';

export function useItems() {
  const { generateSnackbar } = useSnackbar();

  const [items, setItems] = useState<any[]>([]);

  const {
    request: getItemsRequest,
    pending: getItemsPending,
    error: getItemsError,
  } = useAPI({
    method: 'get',
    route: GET_ITEMS_EP,
    successCallback: ({ data }) => {
      setItems(data);
    },
    failedCallback: (error: { message: string }) => {
      generateSnackbar({
        message: error.message,
        variant: 'error',
      });
    },
  });

  useEffect(() => {
    getItemsRequest();
  }, []);

  return { items, getItemsPending, getItemsError, setItems };
}
