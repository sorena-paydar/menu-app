import { Method } from 'axios';

export interface UseApiRequestResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
}

export interface UseApiRequestOptions {
  route: string;
  method: Method;
  initialData?: any;
  requestData?: any;
}
