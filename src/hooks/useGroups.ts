import { useSnackbar } from '@/hooks/useSnackbar';
import { useEffect, useState } from 'react';
import { Group } from '@/types/group';
import useAPI from '@/hooks/useAPI';
import { GET_GROUPS_EP } from '@/app/groups/API/endpoint';

export function useGroups() {
  const { generateSnackbar } = useSnackbar();

  const [groups, setGroups] = useState<any[]>([]);

  const {
    request: getGroupsRequest,
    pending: getGroupsPending,
    error: getGroupError,
  } = useAPI({
    method: 'get',
    route: GET_GROUPS_EP,
    successCallback: ({ data }) => {
      setGroups(data);
    },
    // failedCallback: (error: { message: string }) => {
    //   generateSnackbar({
    //     message: error.message,
    //     variant: 'error',
    //   });
    // },
  });

  useEffect(() => {
    getGroupsRequest();
  }, []);

  return {
    groups,
    getGroupsRequest,
    getGroupsPending,
    getGroupError,
    setGroups,
  };
}
