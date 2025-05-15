import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { useAuth } from '../../hooks/useAuth';
import {
  LayoutDashboard,
  Settings,
  User,
  HelpCircle,
  LogOut,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { logout } = useAuth();
  const [expanded, setExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  
  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/',
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: <User className="h-5 w-5" />
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: <Settings className="h-5 w-5" />
    }
  ];
  
  const toggleExpanded = () => setExpanded(prev => !prev);
  const toggleMobile = () => setMobileOpen(prev => !prev);
  
  return (
    <>
      {/* Mobile sidebar toggle */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={toggleMobile}
      >
        <Menu className="h-5 w-5" />
      </Button>
      
      {/* Sidebar background overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleMobile}
        />
      )}
      
      {/* Sidebar container */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border bg-sidebar text-sidebar-foreground transition-all",
          expanded ? "w-64" : "w-16",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex h-16 items-center border-b border-border px-4">
          {/* Logo */}
          <div className={cn(
            "flex items-center transition-all", 
            expanded ? "justify-between w-full" : "justify-center"
          )}>
            {expanded ? (
              <>
                <span className="text-xl font-bold">ReactUltra</span>
                <Button variant="ghost" size="icon" onClick={toggleMobile} className="md:hidden">
                  <X className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={toggleExpanded} className="hidden md:flex">
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Button variant="ghost" size="icon" onClick={toggleExpanded} className="hidden md:flex">
                <ChevronRight className="h-5 w-5 rotate-180" />
              </Button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 py-4">
          <nav className="px-2 space-y-1">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center py-2 px-3 rounded-md transition-colors",
                    isActive 
                      ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                    !expanded && "justify-center"
                  )}
                >
                  {item.icon}
                  {expanded && <span className="ml-3">{item.name}</span>}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>
        
        {/* Footer */}
        <div className="border-t border-border p-4">
          <div className="space-y-2">
            <Button 
              variant="ghost" 
              className={cn(
                "w-full justify-start", 
                !expanded && "justify-center"
              )}
            >
              <HelpCircle className="h-5 w-5" />
              {expanded && <span className="ml-3">Help</span>}
            </Button>
            
            <Button 
              variant="ghost" 
              className={cn(
                "w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10", 
                !expanded && "justify-center"
              )}
              onClick={logout}
            >
              <LogOut className="h-5 w-5" />
              {expanded && <span className="ml-3">Logout</span>}
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};