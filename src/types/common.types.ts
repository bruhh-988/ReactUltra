// src/types/common.types.ts
import { ReactNode, LazyExoticComponent, ComponentType } from 'react';

export type RouteGuard = (isAuthenticated: boolean) => boolean;

export interface RouteMeta {
  title?: string;
  description?: string;
  auth?: boolean;
  requiredPermissions?: string[];
  layout?: string;
}

export interface RouteConfig {
  path: string;
  element: ComponentType | LazyExoticComponent<any>;
  guards?: RouteGuard[];
  meta: RouteMeta;
  children?: RouteConfig[];
  redirectTo?: string;
}

export interface BreadcrumbItem {
  label: string;
  path?: string;
  icon?: ReactNode;
}

export interface MenuItem {
  key: string;
  label: string;
  icon?: ReactNode;
  path?: string;
  children?: MenuItem[];
  permissions?: string[];
}

export interface TableColumn {
  key: string;
  title: string;
  dataIndex: string;
  render?: (text: any, record: any) => ReactNode;
  sorter?: boolean | ((a: any, b: any) => number);
  filters?: { text: string; value: string }[];
  onFilter?: (value: string, record: any) => boolean;
  width?: number | string;
}

export interface TablePagination {
  current: number;
  pageSize: number;
  total: number;
  onChange: (page: number, pageSize: number) => void;
}

export interface ChartOptions {
  title?: string;
  xAxis?: {
    type: string;
    name?: string;
  };
  yAxis?: {
    type: string;
    name?: string;
  };
  series?: any[];
  tooltip?: any;
  legend?: any;
}

export interface UploadOptions {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  maxCount?: number;
}

export interface UploadedFile {
  uid: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  status: 'uploading' | 'done' | 'error';
  percent?: number;
  error?: any;
}

export interface FormConfig {
  fields: FormField[];
  layout?: 'horizontal' | 'vertical' | 'inline';
  labelWidth?: number | string;
  submitText?: string;
  cancelText?: string;
  resetText?: string;
}

export interface FormField {
  name: string;
  label?: string;
  type: 'text' | 'textarea' | 'number' | 'select' | 'checkbox' | 'radio' | 'date' | 'file' | 'custom';
  placeholder?: string;
  defaultValue?: any;
  options?: { label: string; value: any }[];
  rules?: FormRule[];
  disabled?: boolean;
  hidden?: boolean;
  span?: number;
  component?: ReactNode;
}

export interface FormRule {
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: RegExp;
  message?: string;
  validator?: (value: any, formValues: any) => Promise<void> | void;
}