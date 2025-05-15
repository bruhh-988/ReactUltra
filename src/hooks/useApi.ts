// src/hooks/useApi.ts
import { useState, useCallback } from 'react';
import { ApiService, ApiResponse, RequestConfig } from '@/services/ApiService';

interface UseApiOptions {
  onSuccess?: <T>(data: T) => void;
  onError?: (error: Error) => void;
}

/**
 * Hook for making API requests with loading and error states
 */
export const useApi = <T = any>(options?: UseApiOptions) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | undefined>(undefined);

  const get = useCallback(
    async (url: string, config?: RequestConfig): Promise<T> => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await ApiService.get<T>(url, config);
        setData(response.data);
        options?.onSuccess?.(response.data);
        return response.data;
      } catch (err: any) {
        setError(err);
        options?.onError?.(err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [options]
  );

  const post = useCallback(
    async (url: string, postData?: any, config?: RequestConfig): Promise<T> => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await ApiService.post<T>(url, postData, config);
        setData(response.data);
        options?.onSuccess?.(response.data);
        return response.data;
      } catch (err: any) {
        setError(err);
        options?.onError?.(err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [options]
  );

  const put = useCallback(
    async (url: string, putData?: any, config?: RequestConfig): Promise<T> => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await ApiService.put<T>(url, putData, config);
        setData(response.data);
        options?.onSuccess?.(response.data);
        return response.data;
      } catch (err: any) {
        setError(err);
        options?.onError?.(err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [options]
  );

  const del = useCallback(
    async (url: string, config?: RequestConfig): Promise<T> => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await ApiService.delete<T>(url, config);
        setData(response.data);
        options?.onSuccess?.(response.data);
        return response.data;
      } catch (err: any) {
        setError(err);
        options?.onError?.(err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [options]
  );

  const cancelRequest = useCallback((cancelId: string) => {
    ApiService.cancelRequest(cancelId);
  }, []);

  return {
    get,
    post,
    put,
    delete: del, // 'delete' is a reserved word in JS, so we use 'del' internally
    cancelRequest,
    isLoading,
    error,
    data,
  };
};