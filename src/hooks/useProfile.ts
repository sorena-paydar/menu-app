'use client';

import useAPI from '@/hooks/useAPI';
import { GET_PROFILE_EP } from '@/API/endpoint';
import { useEffect } from 'react';
import { setProfile } from '@/store/slices/profile';
import { useDispatch } from 'react-redux';
import { ProfileRequest } from '@/types/profile';
import Cookies from 'js-cookie';
import { COOKIES } from '@/constants/auth';
import { ROUTES } from '@/constants/routes';

export function useProfile(): ProfileRequest {
  const dispatch = useDispatch();

  const {
    request: getProfile,
    pending,
    error,
  } = useAPI({
    method: 'GET',
    route: GET_PROFILE_EP,
    successCallback: ({ data }) => {
      dispatch(setProfile(data));
    },
  });

  useEffect(() => {
    const authToken = Cookies.get(COOKIES['authToken']);

    if (!authToken) {
      window.location.href = ROUTES['register'];
      return;
    }

    getProfile();
  }, []);

  return { pending, error };
}
