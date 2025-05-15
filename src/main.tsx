import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import WebFont from 'webfontloader';

// 使用 lazy 加载主应用
const App = lazy(() => import('./App'));

// 添加加载中组件
const LoadingFallback = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-background/20">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
  </div>
);

// 性能监控
function reportWebVitals() {
  if ('performance' in window && 'getEntriesByType' in performance) {
    // FCP 指标
    const navigationEntries = performance.getEntriesByType('navigation');
    if (navigationEntries.length > 0) {
      const navEntry = navigationEntries[0] as PerformanceNavigationTiming;
      console.log('FCP:', navEntry.domContentLoadedEventEnd - navEntry.startTime);
    }

    // LCP 监控
    let lcpReported = false;
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (!lcpReported) {
        lcpReported = true;
        console.log('LCP:', lastEntry.startTime);
      }
    });
    
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    
    // CLS 监控
    let clsValue = 0;
    let clsReported = false;
    const clsObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!clsReported) {
          const clsEntry = entry as any;
          clsValue += clsEntry.value;
          console.log('CLS update:', clsValue);
        }
      }
    });
    
    clsObserver.observe({ type: 'layout-shift', buffered: true });
    
    // 5秒后报告最终CLS
    setTimeout(() => {
      if (!clsReported) {
        clsReported = true;
        console.log('Final CLS:', clsValue);
      }
    }, 5000);
  }
}

// 使用预加载策略优化字体加载
WebFont.load({
  google: {
    families: ['Inter:300,400,500,600,700&display=swap', 'Roboto Mono:400,500&display=swap']
  },
  // 添加加载完成回调
  active: () => {
    console.log('Fonts loaded successfully');
  },
  inactive: () => {
    console.warn('Failed to load fonts');
  }
});

// 注册Service Worker
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(error => {
        console.error('ServiceWorker registration failed: ', error);
      });
  });
}

// 初始化应用
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <Suspense fallback={<LoadingFallback />}>
        <App />
      </Suspense>
    </StrictMode>
  );
  
  // 检测并报告网站性能指标
  if (import.meta.env.PROD) {
    reportWebVitals();
  }
}