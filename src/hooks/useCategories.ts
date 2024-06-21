import { useSnackbar } from '@/hooks/useSnackbar';
import { useEffect, useState } from 'react';
import useAPI from '@/hooks/useAPI';
import { GET_CATEGORIES_EP } from '@/app/categories/API/endpoint';

export function useCategories() {
  const { generateSnackbar } = useSnackbar();

  const [categories, setCategories] = useState<any[]>([]);

  const {
    request: getCategoriesRequest,
    pending: getCategoriesPending,
    error: getCategoriesError,
  } = useAPI({
    method: 'get',
    route: GET_CATEGORIES_EP,
    successCallback: ({ data }) => {
      setCategories(data);
    },
    failedCallback: (error: { message: string }) => {
      generateSnackbar({
        message: error.message,
        variant: 'error',
      });
    },
  });

  useEffect(() => {
    getCategoriesRequest();
  }, []);

  return {
    categories,
    getCategoriesPending,
    getCategoriesError,
    setCategories,
  };
}
