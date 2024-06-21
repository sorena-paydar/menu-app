'use client';

import useAPI from '@/hooks/useAPI';
import { GET_PROFILE_EP } from '@/API/endpoint';
import { useEffect, useState } from 'react';
import { setProfile } from '@/store/slices/profile';
import { useDispatch } from 'react-redux';
import { ProfileRequest } from '@/types/profile';
import Cookies from 'js-cookie';
import { COOKIES } from '@/constants/auth';
import { ROUTES } from '@/constants/routes';
import { useRouter } from 'next/navigation';

export function useProfile(): ProfileRequest {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const { request: getProfile, error } = useAPI({
    method: 'GET',
    route: GET_PROFILE_EP,
    successCallback: ({ data }) => {
      dispatch(setProfile(data));
      setLoading(false);
    },
  });

  useEffect(() => {
    const authToken = Cookies.get(COOKIES['authToken']);

    if (!authToken) {
      router.push(ROUTES['register']);
      return;
    }

    getProfile();
  }, []);

  return { pending: loading, error };
}
