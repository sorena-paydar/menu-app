import { useState } from 'react';
import axios from 'axios';
import { UseApiRequestOptions, UseApiRequestResponse } from '@/types/api';

const useApiRequest = <T>({
  route,
  method,
  initialData,
  requestData,
}: UseApiRequestOptions): UseApiRequestResponse<T> => {
  const [data, setData] = useState<T | null>(initialData ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.request<T>({
        url: route,
        method,
        data: requestData,
      });

      setData(response.data);
    } catch (err) {
      // @ts-ignore
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    fetchData,
  };
};

export default useApiRequest;
