'use client';

import useAPI from '@/hooks/useAPI';
import { GET_PROFILE_EP } from '@/API/endpoint';
import { useEffect } from 'react';
import { PROTECTED_ROUTES, ROUTES } from '@/constants/routes';
import Cookies from 'js-cookie';
import { COOKIES } from '@/constants/auth';

export function useProfile() {
  const { request: getProfile, pending } = useAPI({
    method: 'GET',
    route: GET_PROFILE_EP,
    successCallback: (data) => {
      console.log({ data });
    },
  });

  useEffect(() => {
    if (PROTECTED_ROUTES.includes(window.location.pathname)) {
      const authToken = Cookies.get(COOKIES['authToken']);

      if (!authToken) {
        window.location.href = ROUTES['register'];

        return;
      }

      getProfile();
    }
  }, []);

  return {};
}
