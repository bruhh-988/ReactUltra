// src/config/routes.config.ts
import { lazy } from 'react';
import { RouteConfig } from '../types/common.types';

// Lazy loaded components
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Route Guards
const requireAuth = (isAuthenticated: boolean) => isAuthenticated;
const requireNoAuth = (isAuthenticated: boolean) => !isAuthenticated;

export const routes: RouteConfig[] = [
  {
    path: '/',
    element: Dashboard,
    guards: [requireAuth],
    meta: {
      title: 'Dashboard',
      auth: true,
      layout: 'default'
    },
    redirectTo: '/login'
  },
  {
    path: '/login',
    element: Login,
    guards: [requireNoAuth],
    meta: {
      title: 'Login',
      auth: false,
    },
    redirectTo: '/'
  },
  {
    path: '/register',
    element: Register,
    guards: [requireNoAuth],
    meta: {
      title: 'Register',
      auth: false,
    },
    redirectTo: '/'
  },
  {
    path: '/forgot-password',
    element: ForgotPassword,
    guards: [requireNoAuth],
    meta: {
      title: 'Forgot Password',
      auth: false,
    },
    redirectTo: '/'
  },
  {
    path: '/profile',
    element: Profile,
    guards: [requireAuth],
    meta: {
      title: 'Profile',
      auth: true,
      layout: 'default'
    },
    redirectTo: '/login'
  },
  {
    path: '/settings',
    element: Settings,
    guards: [requireAuth],
    meta: {
      title: 'Settings',
      auth: true,
      layout: 'default'
    },
    redirectTo: '/login'
  },
  {
    path: '*',
    element: NotFound,
    meta: {
      title: 'Not Found',
      auth: false,
    },
  },
];

// Helper function to get route by path
export const getRouteByPath = (path: string): RouteConfig | undefined => {
  return findRoute(routes, path);
};

const findRoute = (routes: RouteConfig[], path: string): RouteConfig | undefined => {
  for (const route of routes) {
    if (route.path === path) {
      return route;
    }
    if (route.children) {
      const childRoute = findRoute(route.children, path);
      if (childRoute) {
        return childRoute;
      }
    }
  }
  return undefined;
};