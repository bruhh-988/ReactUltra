import React, { ReactNode, useEffect, Suspense } from 'react';
import { ThemeProvider } from './ThemeProvider';
import { I18nProvider } from './I18nProvider';
import { AuthProvider } from './AuthProvider';
import { RouterProvider, AppRoutes } from './RouterProvider';

// 添加性能监控
const reportWebVitals = (metric: any) => {
  // 将性能指标发送到分析服务
  if (import.meta.env.PROD) {
    console.log(metric);
    // 这里可以添加发送到分析服务的代码
    // 例如: 发送到 Google Analytics 或自定义后端
  }
};

// 简单的加载中组件
const LoadingFallback = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
    <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent"></div>
  </div>
);

interface AppProviderProps {
  children: ReactNode;
}

/**
 * AppProvider 是应用程序的根提供者，它组合了所有上下文提供者
 * 并确保提供者之间的依赖关系正确排序
 */
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // 监控首次内容绘制
  useEffect(() => {
    // 只在生产环境中进行性能监控
    if (import.meta.env.PROD) {
      // 首次内容绘制
      const paintTimingObserver = new PerformanceObserver((entries) => {
        entries.getEntries().forEach((entry) => {
          const lcpEntry = entry as PerformanceEntry;
          reportWebVitals({
            name: "LCP",
            value: lcpEntry.startTime,
            id: lcpEntry.entryType
          });
        });
      });
      
      paintTimingObserver.observe({
        type: "largest-contentful-paint",
        buffered: true
      });
      
      return () => {
        paintTimingObserver.disconnect();
      };
    }
  }, []);

  return (
    <ThemeProvider>
      <I18nProvider>
        <RouterProvider>
          <AuthProvider>
            <Suspense fallback={<LoadingFallback />}>
              <AppRoutes />
              {children}
            </Suspense>
          </AuthProvider>
        </RouterProvider>
      </I18nProvider>
    </ThemeProvider>
  );
};