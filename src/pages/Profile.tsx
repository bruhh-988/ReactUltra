import React, { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from '../hooks/useTranslation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { toast } from '../components/ui/sonner';
import { formatDate } from '../lib/utils';
import { AlertCircle, Check, Loader2, Upload, User } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form';
import { Alert, AlertDescription } from '../components/ui/alert';

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ProfileValues = z.infer<typeof profileSchema>;
type PasswordValues = z.infer<typeof passwordSchema>;

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("general");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  
  const profileForm = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      username: user?.username || '',
    },
  });
  
  const passwordForm = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const handleProfileUpdate = async (values: ProfileValues) => {
    setIsUpdating(true);
    setUpdateError(null);
    
    try {
      await updateProfile({
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.username,
      });
      toast(t('profile.updateSuccess', 'Profile updated successfully'), {
        icon: <Check className="h-4 w-4" />
      });
    } catch (error) {
      setUpdateError('Failed to update profile. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePasswordUpdate = async (values: PasswordValues) => {
    setIsChangingPassword(true);
    setPasswordError(null);
    
    try {
      // In real app, would call an API to change password
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast(t('profile.passwordUpdateSuccess', 'Password updated successfully'), {
        icon: <Check className="h-4 w-4" />
      });
      passwordForm.reset({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      setPasswordError('Failed to update password. Please check your current password and try again.');
    } finally {
      setIsChangingPassword(false);
    }
  };

  if (!user) return null;

  return (
    <div className="container mx-auto p-6">
      <PageHeader 
        title={t('profile.title', 'My Profile')}
        description={t('profile.description', 'Manage your account settings and preferences')}
      />
      
      <div className="grid gap-6 mt-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatar} alt={user.username} />
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Button size="sm" variant="outline" className="mt-4">
                  <Upload className="mr-2 h-4 w-4" />
                  {t('profile.changeAvatar', 'Change avatar')}
                </Button>
              </div>
              
              <div className="flex-1 space-y-1 text-center md:text-left">
                <h2 className="text-2xl font-bold">{user.firstName} {user.lastName}</h2>
                <p className="text-muted-foreground">{user.email}</p>
                <p className="text-muted-foreground">{user.role}</p>
                <p className="text-sm text-muted-foreground">
                  {t('profile.memberSince', 'Member since')} {formatDate(user.createdAt)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="general">{t('profile.generalTab', 'General')}</TabsTrigger>
            <TabsTrigger value="security">{t('profile.securityTab', 'Security')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('profile.personalInfo', 'Personal Information')}</CardTitle>
                <CardDescription>
                  {t('profile.updatePersonalInfo', 'Update your personal details')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {updateError && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{updateError}</AlertDescription>
                  </Alert>
                )}
                
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(handleProfileUpdate)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={profileForm.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('profile.firstName', 'First Name')}</FormLabel>
                            <FormControl>
                              <Input {...field} disabled={isUpdating} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={profileForm.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('profile.lastName', 'Last Name')}</FormLabel>
                            <FormControl>
                              <Input {...field} disabled={isUpdating} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={profileForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('profile.username', 'Username')}</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={isUpdating} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div>
                      <Label>{t('profile.email', 'Email Address')}</Label>
                      <Input 
                        value={user.email} 
                        disabled 
                        className="bg-muted"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        {t('profile.emailChangeNote', 'To change your email, please contact support')}
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <Button type="submit" disabled={isUpdating}>
                      {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {isUpdating
                        ? t('common.saving', 'Saving...')
                        : t('common.saveChanges', 'Save Changes')}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('profile.changePassword', 'Change Password')}</CardTitle>
                <CardDescription>
                  {t('profile.updatePassword', 'Update your password')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {passwordError && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{passwordError}</AlertDescription>
                  </Alert>
                )}
                
                <Form {...passwordForm}>
                  <form onSubmit={passwordForm.handleSubmit(handlePasswordUpdate)} className="space-y-4">
                    <FormField
                      control={passwordForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('profile.currentPassword', 'Current Password')}</FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              {...field} 
                              disabled={isChangingPassword} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={passwordForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('profile.newPassword', 'New Password')}</FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              {...field} 
                              disabled={isChangingPassword} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={passwordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('profile.confirmPassword', 'Confirm New Password')}</FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              {...field} 
                              disabled={isChangingPassword} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" disabled={isChangingPassword}>
                      {isChangingPassword && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {isChangingPassword
                        ? t('common.updating', 'Updating...')
                        : t('common.updatePassword', 'Update Password')}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;