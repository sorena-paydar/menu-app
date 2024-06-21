'use client';

import withAuth from '@/hoc/withAuth';
import useAPI from '@/hooks/useAPI';
import { useEffect, useState } from 'react';
import {
  GET_BRANCH_GROUP_PUBLIC_DETAILS_EP,
  GET_BRANCH_PUBLIC_DETAILS_EP,
} from '@/app/final/API/endpoint';
import { Branch } from '@/types/branch';
import { Skeleton } from '@/components/skeleton';
import { Retry } from '@/components/retry';
import { Group } from '@/types/group';
import { GroupFinalDetails } from '@/app/final/components/groupDetails';

function Final({ params: { branchId } }: { params: { branchId: string } }) {
  const [branchData, setBranchData] = useState<Branch>();

  const { request: getBranchFinalRequest, pending: getBranchFinalPending } =
    useAPI({
      method: 'get',
      route: GET_BRANCH_PUBLIC_DETAILS_EP({ branchId }),
      successCallback: ({ data }) => {
        setBranchData(data);
      },
      failedCallback: (error: { message: string }) => {
        // generateSnackbar({
        //   message: error.message,
        //   variant: 'error',
        // });
      },
    });

  useEffect(() => {
    getBranchFinalRequest();
  }, []);

  if (getBranchFinalPending) {
    return (
      <div className="px-5">
        <Skeleton />
      </div>
    );
  }

  if (!branchData) {
    return <Retry />;
  }

  return (
    <main className="flex flex-col px-5 mt-8">
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="p-4">
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-900">
              {branchData.name}
            </h1>
            <p className="text-gray-600 mt-2">
              Address: {branchData.location.address}
            </p>
            <p className="text-gray-600 mt-2">ID: {branchData._id}</p>
            {branchData.menuGroup && (
              <p className="text-gray-600 mt-2">
                Menu Group: {branchData.menuGroup}
              </p>
            )}
            {branchData.tables && (
              <p className="text-gray-600 mt-2">Tables: {branchData.tables}</p>
            )}
          </div>
        </div>
      </div>

      {branchData.menuGroup && (
        <GroupFinalDetails groupId={branchData.menuGroup} />
      )}
    </main>
  );
}

export default withAuth(Final);
