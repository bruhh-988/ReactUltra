import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  BarChart3,
  ArrowUpRight,
  Users,
  ShoppingCart,
  CreditCard,
  Activity,
  LineChart,
  PieChart
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  // Placeholder data for stats
  const stats = [
    {
      title: 'Total Users',
      value: '4,231',
      change: '+12.3%',
      trend: 'up',
      icon: <Users className="h-5 w-5" />
    },
    {
      title: 'Sales',
      value: '$45.2k',
      change: '+5.1%',
      trend: 'up',
      icon: <ShoppingCart className="h-5 w-5" />
    },
    {
      title: 'Revenue',
      value: '$21.5k',
      change: '-2.3%',
      trend: 'down',
      icon: <CreditCard className="h-5 w-5" />
    },
    {
      title: 'Active Sessions',
      value: '2,431',
      change: '+11.9%',
      trend: 'up',
      icon: <Activity className="h-5 w-5" />
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('dashboard.title', 'Dashboard')}</h1>
        <p className="text-muted-foreground">
          {t('dashboard.subtitle', 'Welcome to ReactUltra admin dashboard')}
        </p>
      </div>
      
      <Separator className="my-6" />
      
      {/* Stats overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="bg-primary/10 p-2 rounded-md">
                  {stat.icon}
                </div>
                {stat.trend === 'up' ? (
                  <div className="flex items-center text-sm text-success">
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                    {stat.change}
                  </div>
                ) : (
                  <div className="flex items-center text-sm text-destructive">
                    <ArrowUpRight className="mr-1 h-4 w-4 transform rotate-180" />
                    {stat.change}
                  </div>
                )}
              </div>
              <div className="mt-4">
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{t(`dashboard.${stat.title.toLowerCase().replace(' ', '')}`, stat.title)}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-5 w-5" />
              {t('dashboard.revenueOverTime', 'Revenue Over Time')}
            </CardTitle>
            <CardDescription>
              {t('dashboard.revenueDescription', 'Monthly revenue for the current year')}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="text-muted-foreground">
              {/* Chart would be rendered here in a real application */}
              <BarChart3 className="h-20 w-20 opacity-50" />
              <p className="mt-2 text-center text-sm">{t('dashboard.chartPlaceholder', 'Chart visualization here')}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              {t('dashboard.trafficSources', 'Traffic Sources')}
            </CardTitle>
            <CardDescription>
              {t('dashboard.trafficDescription', 'User acquisition channels')}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[320px] flex items-center justify-center">
            <div className="text-muted-foreground">
              {/* Chart would be rendered here in a real application */}
              <PieChart className="h-20 w-20 opacity-50" />
              <p className="mt-2 text-center text-sm">{t('dashboard.chartPlaceholder', 'Chart visualization here')}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent activity section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{t('dashboard.recentActivity', 'Recent Activity')}</CardTitle>
            <Button variant="outline" size="sm">
              {t('common.viewAll', 'View All')}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* This would be populated with actual activity data in a real application */}
            <div className="text-center py-8 text-muted-foreground">
              <p>{t('dashboard.activityPlaceholder', 'Activity feed will be displayed here')}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;