// src/config/routes.config.ts
import { lazy, ComponentType } from 'react';
import { RouteConfig } from '../types/common.types';

// 使用加权预加载策略
interface PreloadableComponent {
  component: Promise<any>;
  preloadWeight: number; // 1-10 数值越高优先级越高
  preloadStatus: 'none' | 'pending' | 'loaded';
}

// 组件缓存
const componentCache: Record<string, PreloadableComponent> = {
  // 主要路由组件
  'Dashboard': {
    component: import('../pages/Dashboard'),
    preloadWeight: 10,
    preloadStatus: 'none'
  },
  'Login': {
    component: import('../pages/auth/Login'),
    preloadWeight: 9,
    preloadStatus: 'none'
  },
  'Register': {
    component: import('../pages/auth/Register'),
    preloadWeight: 5,
    preloadStatus: 'none'
  },
  'ForgotPassword': {
    component: import('../pages/auth/ForgotPassword'),
    preloadWeight: 4,
    preloadStatus: 'none'
  },
  'Profile': {
    component: import('../pages/Profile'),
    preloadWeight: 7,
    preloadStatus: 'none'
  },
  'Settings': {
    component: import('../pages/Settings'),
    preloadWeight: 6,
    preloadStatus: 'none'
  },
  'NotFound': {
    component: import('../pages/NotFound'),
    preloadWeight: 3,
    preloadStatus: 'none'
  }
};

// 优化的懒加载函数
function optimizedLazy(key: string): ComponentType<any> {
  return lazy(() => {
    componentCache[key].preloadStatus = 'pending';
    return componentCache[key].component.then(module => {
      componentCache[key].preloadStatus = 'loaded';
      return module;
    });
  });
}

// 懒加载组件
const Dashboard = optimizedLazy('Dashboard');
const Profile = optimizedLazy('Profile');
const Settings = optimizedLazy('Settings');
const NotFound = optimizedLazy('NotFound');

// 认证页面
const Login = optimizedLazy('Login');
const Register = optimizedLazy('Register');
const ForgotPassword = optimizedLazy('ForgotPassword');

// 路由守卫函数
const requireAuth = (isAuthenticated: boolean) => isAuthenticated;
const requireNoAuth = (isAuthenticated: boolean) => !isAuthenticated;

// 智能预加载函数
export const preloadRoute = (route: string) => {
  // 已经加载过的路由不再重复加载
  const preloadKey = getPreloadKeyFromRoute(route);
  if (preloadKey && componentCache[preloadKey] && componentCache[preloadKey].preloadStatus === 'none') {
    componentCache[preloadKey].preloadStatus = 'pending';
    componentCache[preloadKey].component.then(() => {
      componentCache[preloadKey].preloadStatus = 'loaded';
    });
  }
};

// 获取路由对应的预加载键
function getPreloadKeyFromRoute(route: string): string | null {
  switch (route) {
    case '/': return 'Dashboard';
    case '/login': return 'Login';
    case '/register': return 'Register';
    case '/forgot-password': return 'ForgotPassword';
    case '/profile': return 'Profile';
    case '/settings': return 'Settings';
    default: return null;
  }
}

// 初始化时预加载高优先级组件
export const initPreload = () => {
  // 按优先级排序
  const sortedComponents = Object.entries(componentCache)
    .sort((a, b) => b[1].preloadWeight - a[1].preloadWeight)
    .slice(0, 2); // 只预加载最高优先级的2个组件
  
  // 延迟预加载，不阻塞初始渲染
  setTimeout(() => {
    sortedComponents.forEach(([key, config]) => {
      if (config.preloadStatus === 'none') {
        config.preloadStatus = 'pending';
        config.component.then(() => {
          config.preloadStatus = 'loaded';
        });
      }
    });
  }, 2000);
};

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

// 获取路由配置
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