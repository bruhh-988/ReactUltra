import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios';
import { API_BASE_URL, API_TIMEOUT, API_HEADERS } from '@/config/api.config';
import { StorageService } from './StorageService';
import { LoggerService } from './LoggerService';

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface RequestConfig extends AxiosRequestConfig {
  cancelId?: string;
}

class ApiServiceClass {
  private client: AxiosInstance;
  private cancelTokens: Map<string, CancelTokenSource>;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: API_HEADERS,
    });
    this.cancelTokens = new Map();

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = StorageService.get<string>('authToken');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        LoggerService.error('API request interceptor error', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized (token expired, etc.)
          StorageService.remove('authToken');
          // You could trigger a logout action or redirect here
        }
        
        LoggerService.error('API response error', {
          url: error.config?.url,
          status: error.response?.status,
          error: error.message,
        });
        
        return Promise.reject(error);
      }
    );
  }

  /**
   * Set auth token for API requests
   */
  public setAuthToken(token: string | null): void {
    if (token) {
      this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete this.client.defaults.headers.common.Authorization;
    }
  }

  /**
   * Make GET request
   */
  public async get<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const { cancelId, ...axiosConfig } = config || {};
    
    if (cancelId) {
      this.setupCancelToken(cancelId, axiosConfig);
    }
    
    try {
      const response: AxiosResponse<T> = await this.client.get<T>(url, axiosConfig);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      this.handleRequestError(error);
      throw error;
    }
  }

  /**
   * Make POST request
   */
  public async post<T>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    const { cancelId, ...axiosConfig } = config || {};
    
    if (cancelId) {
      this.setupCancelToken(cancelId, axiosConfig);
    }
    
    try {
      const response: AxiosResponse<T> = await this.client.post<T>(url, data, axiosConfig);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      this.handleRequestError(error);
      throw error;
    }
  }

  /**
   * Make PUT request
   */
  public async put<T>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    const { cancelId, ...axiosConfig } = config || {};
    
    if (cancelId) {
      this.setupCancelToken(cancelId, axiosConfig);
    }
    
    try {
      const response: AxiosResponse<T> = await this.client.put<T>(url, data, axiosConfig);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      this.handleRequestError(error);
      throw error;
    }
  }

  /**
   * Make DELETE request
   */
  public async delete<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const { cancelId, ...axiosConfig } = config || {};
    
    if (cancelId) {
      this.setupCancelToken(cancelId, axiosConfig);
    }
    
    try {
      const response: AxiosResponse<T> = await this.client.delete<T>(url, axiosConfig);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      this.handleRequestError(error);
      throw error;
    }
  }

  /**
   * Cancel a request by ID
   */
  public cancelRequest(cancelId: string): void {
    const source = this.cancelTokens.get(cancelId);
    if (source) {
      source.cancel(`Request canceled: ${cancelId}`);
      this.cancelTokens.delete(cancelId);
    }
  }

  /**
   * Set up cancel token for a request
   */
  private setupCancelToken(cancelId: string, config: AxiosRequestConfig): void {
    // Cancel any existing request with the same ID
    this.cancelRequest(cancelId);
    
    const source = axios.CancelToken.source();
    this.cancelTokens.set(cancelId, source);
    config.cancelToken = source.token;
  }

  /**
   * Handle axios request errors
   */
  private handleRequestError(error: any): void {
    if (axios.isCancel(error)) {
      LoggerService.info('Request canceled', error.message);
    } else {
      LoggerService.error('API request failed', error);
    }
  }
}

// Create singleton instance
export const ApiService = new ApiServiceClass();