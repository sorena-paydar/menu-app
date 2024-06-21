'use client';

import withAuth from '@/hoc/withAuth';
import useAPI from '@/hooks/useAPI';
import { GET_CATEGORY_DETAILS_EP } from '@/app/categories/API/endpoint';
import { useEffect, useState } from 'react';
import { Category } from '@/types/category';
import { format } from 'date-fns';
import { Skeleton } from '@/components/skeleton';
import { Retry } from '@/components/retry';

function CategoryDetails({
  params: { categoryId },
}: {
  params: { categoryId: string };
}) {
  const [category, setCategory] = useState<Category>();

  const {
    request: getCategoryDetailsRequest,
    pending: getCategoryDetailsPending,
  } = useAPI({
    method: 'get',
    route: GET_CATEGORY_DETAILS_EP({ categoryId }),
    successCallback: ({ data }) => {
      setCategory(data);
    },
  });

  useEffect(() => {
    getCategoryDetailsRequest();
  }, []);

  if (getCategoryDetailsPending) {
    return (
      <div className="px-5 mt-8">
        <Skeleton />
      </div>
    );
  }

  if (!category) {
    return <Retry />;
  }

  return (
    <main className="flex flex-col px-5 mt-8">
      <div className="flex flex-col border border-gray-200 rounded-lg p-4 gap-y-3">
        <div className="flex gap-x-3">
          <span className="text-gray-400">Branch Name: </span>
          <h4>{category.name}</h4>
        </div>

        <div className="flex gap-x-3">
          <span className="text-gray-400">Created At: </span>
          <span>{format(category.createdAt, 'MMMM do, yyyy')}</span>
        </div>
      </div>
    </main>
  );
}

export default withAuth(CategoryDetails);
