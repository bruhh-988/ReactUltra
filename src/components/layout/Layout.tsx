import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { useTheme } from '../../hooks/useTheme';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  
  return (
    <div className="relative min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Main content */}
        <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default Layout;