import { Method } from 'axios';

export interface UseApiRequestResponse<T> {
  pending: boolean;
  error: string | null;
  request: (data?: unknown) => Promise<void>;
}

export interface UseApiRequestOptions {
  route: string;
  method: Method;
  successCallback?: (data: any) => void;
  failedCallback?: (error: any) => void;
}
