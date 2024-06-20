import { useState } from 'react';
import axios from 'axios';
import { UseApiRequestOptions, UseApiRequestResponse } from '@/types/api';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';

const useApiRequest = <T>({
  route,
  method,
  successCallback,
  failedCallback,
}: UseApiRequestOptions): UseApiRequestResponse<T> => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = async (data?: any) => {
    setPending(true);
    try {
      const response = await axios.request<T>({
        url: apiUrl + route,
        method,
        data,
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
