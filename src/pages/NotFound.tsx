import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { Button } from '../components/ui/button';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-extrabold text-primary opacity-50">404</h1>
        <h2 className="text-3xl font-bold mt-4">
          {t('notFound.title', 'Page Not Found')}
        </h2>
        <p className="text-muted-foreground mt-2 mb-6">
          {t('notFound.description', "Sorry, the page you are looking for doesn't exist or has been moved.")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => navigate(-1)} variant="outline">
            {t('notFound.goBack', 'Go Back')}
          </Button>
          <Button asChild>
            <Link to="/">{t('notFound.goHome', 'Go to Home')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;