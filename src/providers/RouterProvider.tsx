import React, { ReactNode, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { routes, preloadRoute } from '../config/routes.config';

// Layouts
import Layout from '../components/layout/Layout';

// Loading fallback with better UI
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen bg-background">
    <div className="flex flex-col items-center gap-2">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent"></div>
      <p className="text-sm text-muted-foreground">加载中...</p>
    </div>
  </div>
);

interface RouterProviderProps {
  children: ReactNode;
}

// 将需要 useAuth 的逻辑移到单独的组件
const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // 监听路由变化，记录当前路径
  useEffect(() => {
    // 保存当前路径到localStorage，这样可以在认证状态变化时恢复
    if (isAuthenticated && location.pathname !== '/login') {
      localStorage.setItem('lastPath', location.pathname);
    }
    
    // 实现路由预加载
    const links = document.querySelectorAll('a[href^="/"]');
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        const href = link.getAttribute('href');
        if (href) preloadRoute(href);
      });
    });
    
    return () => {
      links.forEach(link => {
        link.removeEventListener('mouseenter', () => {});
      });
    };
  }, [location.pathname, isAuthenticated]);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {routes.map((route) => {
          const RouteElement = route.element;
          let routeElement;
          
          // Check auth guards
          const guardsPassed = route.guards ? 
            route.guards.every(guard => guard(isAuthenticated)) : true;
            
          if (guardsPassed) {
            if (route.meta.layout === 'default') {
              routeElement = (
                <Suspense fallback={<LoadingFallback />}>
                  <Layout>
                    <RouteElement />
                  </Layout>
                </Suspense>
              );
            } else {
              routeElement = (
                <Suspense fallback={<LoadingFallback />}>
                  <RouteElement />
                </Suspense>
              );
            }
          } else if (route.redirectTo) {
            // 如果需要认证但没有认证，记住当前尝试访问的URL
            if (route.meta.auth && !isAuthenticated) {
              sessionStorage.setItem('redirectAfterLogin', location.pathname);
            }
            routeElement = <Navigate to={route.redirectTo} replace />;
          }
          
          return (
            <Route 
              key={route.path} 
              path={route.path} 
              element={routeElement} 
            />
          );
        })}
      </Routes>
    </Suspense>
  );
};

/**
 * RouterProvider handles the routing configuration for the application.
 * It includes route guards for authenticated and non-authenticated routes.
 */
export const RouterProvider: React.FC<RouterProviderProps> = ({ children }) => {
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  );
};

// 导出 AppRoutes 供其他组件使用
export { AppRoutes };