import React, { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  actions,
  className
}) => {
  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-center sm:justify-between py-6", className)}>
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
      
      {actions && (
        <div className="mt-4 sm:mt-0 sm:ml-4 flex flex-wrap gap-2 sm:space-x-2">{actions}</div>
      )}
    </div>
  );
};