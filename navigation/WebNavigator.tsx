import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExerciseWeb from '@/pages/Exercise.web';
import HomeWeb from '@/pages/Home.web';
import AuthWeb from '@/pages/Auth.web';
import AuthRegisterWeb from '@/pages/AuthRegister.web';
import ProtectedRoute from '@/navigation/ProtectedRoute';
import ProfileWeb from '@/pages/Profile.web';

const Stack = createNativeStackNavigator();

export default function WebNavigator() {
    return (
        <NavigationContainer
            linking={{
                prefixes: ['http://localhost:8081'],
                config: {
                    screens: {
                        Home: '',
                        Exercise: 'exercise',
                        Auth: 'auth/login',
                        Register: 'auth/register',
                        Profile: 'profile',
                    },
                },
            }}
        >
            <Stack.Navigator>
                {/* ----------------- Protected Routes  ----------------- */}
                <Stack.Screen name="Exercise" options={{ headerShown: false }}>
                    {() => (
                        <ProtectedRoute requireAuth={true}>
                            <ExerciseWeb />
                        </ProtectedRoute>
                    )}
                </Stack.Screen>
                <Stack.Screen name="Profile" options={{ headerShown: false }}>
                    {() => (
                        <ProtectedRoute requireAuth={true}>
                            <ProfileWeb />
                        </ProtectedRoute>
                    )}
                </Stack.Screen>
                {/* ----------------- Open Routes  ----------------- */}
                <Stack.Screen name="Home" component={HomeWeb} options={{ headerShown: false }} />
                <Stack.Screen name="Auth" options={{ headerShown: false }}>
                    {() => (
                        <ProtectedRoute requireAuth={false}>
                            <AuthWeb />
                        </ProtectedRoute>
                    )}
                </Stack.Screen>
                <Stack.Screen name="Register" options={{ headerShown: false }}>
                    {() => (
                        <ProtectedRoute requireAuth={false}>
                            <AuthRegisterWeb />
                        </ProtectedRoute>
                    )}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}