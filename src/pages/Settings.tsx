import React, { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from '../hooks/useTranslation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Separator } from '../components/ui/separator';
import { toast } from '../components/ui/sonner';
import { Check, Moon, Sun, SunMoon } from 'lucide-react';

const Settings: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, languages, t } = useTranslation();
  const [activeTab, setActiveTab] = useState('appearance');
  
  // Appearance settings
  const [sidebarPosition, setSidebarPosition] = useState('left');
  const [compactMode, setCompactMode] = useState(false);
  const [animations, setAnimations] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  
  // Language settings
  const [dateFormat, setDateFormat] = useState('MMM D, YYYY');
  const [timeFormat, setTimeFormat] = useState('12h');
  
  // Notification settings
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [updateNotifications, setUpdateNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  
  // Privacy settings
  const [analytics, setAnalytics] = useState(true);
  const [cookies, setCookies] = useState(true);
  
  const handleSaveAppearance = () => {
    // In a real app, would save to backend
    toast.success(t('settings.appearanceSaved', 'Appearance settings saved successfully'), {
      icon: <Check className="h-4 w-4" />,
    });
  };
  
  const handleSaveLanguage = () => {
    // In a real app, would save to backend
    toast.success(t('settings.languageSaved', 'Language settings saved successfully'), {
      icon: <Check className="h-4 w-4" />,
    });
  };
  
  const handleSaveNotifications = () => {
    // In a real app, would save to backend
    toast.success(t('settings.notificationsSaved', 'Notification preferences saved successfully'), {
      icon: <Check className="h-4 w-4" />,
    });
  };
  
  const handleSavePrivacy = () => {
    // In a real app, would save to backend
    toast.success(t('settings.privacySaved', 'Privacy settings saved successfully'), {
      icon: <Check className="h-4 w-4" />,
    });
  };

  return (
    <div className="container mx-auto p-6">
      <PageHeader 
        title={t('settings.title', 'Settings')}
        description={t('settings.description', 'Configure your application preferences')}
      />
      
      <div className="grid gap-6 mt-6">
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab} 
          defaultValue="appearance"
        >
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="appearance">
              {t('settings.appearance', 'Appearance')}
            </TabsTrigger>
            <TabsTrigger value="language">
              {t('settings.language', 'Language')}
            </TabsTrigger>
            <TabsTrigger value="notifications">
              {t('settings.notifications', 'Notifications')}
            </TabsTrigger>
            <TabsTrigger value="privacy">
              {t('settings.privacy', 'Privacy')}
            </TabsTrigger>
          </TabsList>
          
          {/* Appearance Tab */}
          <TabsContent value="appearance" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('settings.themeSettings', 'Theme Settings')}</CardTitle>
                <CardDescription>
                  {t('settings.themeDescription', 'Customize the look and feel of the application')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>{t('settings.themeMode', 'Theme Mode')}</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button 
                      variant={theme === "light" ? "default" : "outline"}
                      className="w-full justify-start px-3 py-6"
                      onClick={() => setTheme("light")}
                    >
                      <Sun className="mr-2 h-5 w-5" />
                      {t('settings.lightMode', 'Light')}
                    </Button>
                    <Button 
                      variant={theme === "dark" ? "default" : "outline"}
                      className="w-full justify-start px-3 py-6"
                      onClick={() => setTheme("dark")}
                    >
                      <Moon className="mr-2 h-5 w-5" />
                      {t('settings.darkMode', 'Dark')}
                    </Button>
                    <Button 
                      variant={theme === "system" ? "default" : "outline"}
                      className="w-full justify-start px-3 py-6"
                      onClick={() => setTheme("system")}
                    >
                      <SunMoon className="mr-2 h-5 w-5" />
                      {t('settings.systemMode', 'System')}
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label>{t('settings.sidebarPosition', 'Sidebar Position')}</Label>
                  <RadioGroup
                    value={sidebarPosition}
                    onValueChange={setSidebarPosition}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="left" id="left" />
                      <Label htmlFor="left">{t('settings.leftPosition', 'Left')}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="right" id="right" />
                      <Label htmlFor="right">{t('settings.rightPosition', 'Right')}</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between space-x-4">
                    <div className="space-y-0.5">
                      <Label>{t('settings.compactMode', 'Compact Mode')}</Label>
                      <p className="text-sm text-muted-foreground">
                        {t('settings.compactModeDescription', 'Reduce spacing between elements for a more compact view')}
                      </p>
                    </div>
                    <Switch
                      checked={compactMode}
                      onCheckedChange={setCompactMode}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-4">
                    <div className="space-y-0.5">
                      <Label>{t('settings.animations', 'Animations')}</Label>
                      <p className="text-sm text-muted-foreground">
                        {t('settings.animationsDescription', 'Enable or disable UI animations throughout the application')}
                      </p>
                    </div>
                    <Switch
                      checked={animations}
                      onCheckedChange={setAnimations}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-4">
                    <div className="space-y-0.5">
                      <Label>{t('settings.reduceMotion', 'Reduce Motion')}</Label>
                      <p className="text-sm text-muted-foreground">
                        {t('settings.reduceMotionDescription', 'Minimize animations for accessibility')}
                      </p>
                    </div>
                    <Switch
                      checked={reduceMotion}
                      onCheckedChange={setReduceMotion}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <Button onClick={handleSaveAppearance}>
                  {t('common.saveChanges', 'Save Changes')}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Language Tab */}
          <TabsContent value="language" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('settings.languageSettings', 'Language Settings')}</CardTitle>
                <CardDescription>
                  {t('settings.languageDescription', 'Choose your preferred language and regional settings')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="language-selector">
                    {t('settings.selectLanguage', 'Select Language')}
                  </Label>
                  <Select
                    value={language}
                    onValueChange={setLanguage}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.flag} {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date-format">
                      {t('settings.dateFormat', 'Date Format')}
                    </Label>
                    <Select
                      value={dateFormat}
                      onValueChange={setDateFormat}
                    >
                      <SelectTrigger id="date-format">
                        <SelectValue placeholder={t('settings.selectFormat', 'Select format')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MMM D, YYYY">Jun 1, 2023</SelectItem>
                        <SelectItem value="D MMM YYYY">1 Jun 2023</SelectItem>
                        <SelectItem value="YYYY-MM-DD">2023-06-01</SelectItem>
                        <SelectItem value="DD/MM/YYYY">01/06/2023</SelectItem>
                        <SelectItem value="MM/DD/YYYY">06/01/2023</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="time-format">
                      {t('settings.timeFormat', 'Time Format')}
                    </Label>
                    <Select
                      value={timeFormat}
                      onValueChange={setTimeFormat}
                    >
                      <SelectTrigger id="time-format">
                        <SelectValue placeholder={t('settings.selectFormat', 'Select format')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12h">12-hour (1:30 PM)</SelectItem>
                        <SelectItem value="24h">24-hour (13:30)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Separator />
                
                <Button onClick={handleSaveLanguage}>
                  {t('common.saveChanges', 'Save Changes')}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Notifications Tab */}
          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('settings.notificationPreferences', 'Notification Preferences')}</CardTitle>
                <CardDescription>
                  {t('settings.notificationDescription', 'Manage how you receive notifications')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between space-x-4">
                    <div className="space-y-0.5">
                      <Label>{t('settings.pushNotifications', 'Push Notifications')}</Label>
                      <p className="text-sm text-muted-foreground">
                        {t('settings.pushDescription', 'Receive notifications when the application is in the background')}
                      </p>
                    </div>
                    <Switch
                      checked={pushNotifications}
                      onCheckedChange={setPushNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-4">
                    <div className="space-y-0.5">
                      <Label>{t('settings.emailNotifications', 'Email Notifications')}</Label>
                      <p className="text-sm text-muted-foreground">
                        {t('settings.emailNotificationsDescription', 'Receive notifications to your email address')}
                      </p>
                    </div>
                    <Switch
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label>{t('settings.notificationTypes', 'Notification Types')}</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="flex items-center justify-between space-x-4">
                      <Label htmlFor="updates">{t('settings.updateNotifications', 'System Updates')}</Label>
                      <Switch
                        id="updates"
                        checked={updateNotifications}
                        onCheckedChange={setUpdateNotifications}
                      />
                    </div>
                    <div className="flex items-center justify-between space-x-4">
                      <Label htmlFor="marketing">{t('settings.marketingEmails', 'Marketing Emails')}</Label>
                      <Switch
                        id="marketing"
                        checked={marketingEmails}
                        onCheckedChange={setMarketingEmails}
                      />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <Button onClick={handleSaveNotifications}>
                  {t('common.saveChanges', 'Save Changes')}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Privacy Tab */}
          <TabsContent value="privacy" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('settings.privacySettings', 'Privacy & Data')}</CardTitle>
                <CardDescription>
                  {t('settings.privacyDescription', 'Manage your data and privacy preferences')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between space-x-4">
                    <div className="space-y-0.5">
                      <Label>{t('settings.analytics', 'Usage Analytics')}</Label>
                      <p className="text-sm text-muted-foreground">
                        {t('settings.analyticsDescription', 'Help improve the app by sharing anonymous usage data')}
                      </p>
                    </div>
                    <Switch
                      checked={analytics}
                      onCheckedChange={setAnalytics}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-4">
                    <div className="space-y-0.5">
                      <Label>{t('settings.cookies', 'Cookie Preferences')}</Label>
                      <p className="text-sm text-muted-foreground">
                        {t('settings.cookiesDescription', 'Manage how cookies are used to store your preferences')}
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <Switch
                        checked={cookies}
                        onCheckedChange={setCookies}
                      />
                      <Button variant="outline" size="sm">
                        {t('settings.manageCookies', 'Manage Cookies')}
                      </Button>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>{t('settings.dataExport', 'Export Your Data')}</Label>
                      <p className="text-sm text-muted-foreground">
                        {t('settings.dataExportDescription', 'Download a copy of your data in a portable format')}
                      </p>
                    </div>
                    <Button variant="outline">
                      {t('settings.requestData', 'Request Data')}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>{t('settings.accountDeletion', 'Account Deletion')}</Label>
                      <p className="text-sm text-muted-foreground">
                        {t('settings.accountDeletionDescription', 'Permanently delete your account and all your data')}
                      </p>
                    </div>
                    <Button variant="destructive">
                      {t('settings.deleteAccount', 'Delete Account')}
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <Button onClick={handleSavePrivacy}>
                  {t('common.saveChanges', 'Save Changes')}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;