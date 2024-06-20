'use client';

import { useState } from 'react';
import axios from 'axios';
import { UseApiRequestOptions, UseApiRequestResponse } from '@/types/api';
import Cookies from 'js-cookie';
import { COOKIES } from '@/constants/auth';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';

const useApiRequest = <T>({
  route,
  method,
  successCallback,
  failedCallback,
}: UseApiRequestOptions): UseApiRequestResponse<T> => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const authToken = Cookies.get(COOKIES['authToken']);

  const request = async (data?: any) => {
    setPending(true);
    try {
      const response = await axios.request<T>({
        url: apiUrl + route,
        method,
        data,
        ...(authToken && {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }),
      });

      successCallback?.(response.data);
    } catch (err) {
      // @ts-ignore
      setError(err.message || 'An error occurred');
      // @ts-ignore
      failedCallback?.(err.response?.data);
    } finally {
      setPending(false);
    }
  };

  return {
    pending,
    error,
    request,
  };
};

export default useApiRequest;
