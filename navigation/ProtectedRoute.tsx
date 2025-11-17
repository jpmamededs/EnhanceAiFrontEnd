import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { Spinner } from '@/components/ui/spinner';

type ProtectedRouteProps = {
  children: React.ReactNode;
  requireAuth?: boolean;
};

export default function ProtectedRoute({ children, requireAuth = true }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !isAuthenticated) {
        navigation.navigate('Auth' as never);
      } else if (!requireAuth && isAuthenticated) {
        navigation.navigate('Home' as never);
      }
    }
  }, [isAuthenticated, loading, requireAuth, navigation]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Spinner size="large" />
      </View>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return null;
  }

  if (!requireAuth && isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
