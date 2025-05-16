import React, { ReactNode, Suspense, lazy } from 'react';
import { ThemeProvider } from './ThemeProvider';
import { I18nProvider } from './I18nProvider';
import { AuthProvider } from './AuthProvider';
import { RouterProvider, AppRoutes } from './RouterProvider';
import { ErrorBoundary } from '../components/common/ErrorBoundary';

// 延迟加载不是立即需要的组件
const LazyToaster = lazy(() => import('../components/ui/sonner').then(module => ({ default: module.Toaster })));

// 优化的加载反馈组件
const LoadingFallback = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-background/60 backdrop-blur-[2px] z-50">
    <div className="flex flex-col items-center gap-3">
      <div className="animate-spin rounded-full h-8 w-8 border-[3px] border-primary border-t-transparent"></div>
      <p className="text-sm font-medium text-muted-foreground">加载中...</p>
    </div>
  </div>
);

// 错误反馈组件
const ErrorFallbackComponent = ({ error, resetError }: { error: Error; resetError: () => void }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
    <div className="w-96 p-6 rounded-lg border border-destructive/20 bg-card shadow-lg">
      <h2 className="text-lg font-semibold text-destructive">应用出错了</h2>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      <button 
        onClick={resetError}
        className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 text-sm font-medium"
      >
        重试
      </button>
    </div>
  </div>
);

interface AppProviderProps {
  children: ReactNode;
}

/**
 * AppProvider 是应用程序的根提供者，整合所有上下文提供者
 * 并确保提供者之间的依赖关系正确排序
 */
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <ErrorBoundary fallback={<ErrorFallbackComponent error={new Error("应用程序出错")} resetError={() => window.location.reload()} />}>
      <ThemeProvider>
        <I18nProvider>
          <RouterProvider>
            <AuthProvider>
              {/* 主应用内容 */}
              <Suspense fallback={<LoadingFallback />}>
                <AppRoutes />
                {children}
                {/* Toast通知组件 */}
                <Suspense fallback={null}>
                  <LazyToaster 
                    position="top-right" 
                    richColors 
                    closeButton 
                    duration={3000}
                    visibleToasts={3}
                  />
                </Suspense>
              </Suspense>
            </AuthProvider>
          </RouterProvider>
        </I18nProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};