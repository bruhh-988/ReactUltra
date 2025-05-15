import React, { ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { lazy, Suspense } from 'react';
import { routes } from '../config/routes.config';

// Layouts
import Layout from '../components/layout/Layout';

// Loading fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent"></div>
  </div>
);

interface RouterProviderProps {
  children: ReactNode;
}

/**
 * RouterProvider handles the routing configuration for the application.
 * It includes route guards for authenticated and non-authenticated routes.
 */
export const RouterProvider: React.FC<RouterProviderProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
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
                routeElement = <Layout><RouteElement /></Layout>;
              } else {
                routeElement = <RouteElement />;
              }
            } else if (route.redirectTo) {
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
        {children}
      </Suspense>
    </BrowserRouter>
  );
};