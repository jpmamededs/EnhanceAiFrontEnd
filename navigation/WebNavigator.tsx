import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExerciseWeb from '@/pages/Exercise.web';
import HomeWeb from '@/pages/Home.web';
import AuthWeb from '@/pages/Auth.web';
import AuthRegisterWeb from '@/pages/AuthRegister.web';

const Stack = createNativeStackNavigator();

export default function WebNavigator() {
    return (
        <NavigationContainer
            linking={{
                prefixes: ['http://localhost:8081'],
                config: {
                    screens: {
                        Exercise: '',
                        Home: 'home',
                        Auth: 'auth/login',
                        Register: 'auth/register',
                    },
                },
            }}
        >
            <Stack.Navigator>
                <Stack.Screen name="Exercise" component={ExerciseWeb} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={HomeWeb} options={{ headerShown: false }} />
                <Stack.Screen name="Auth" component={AuthWeb} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={AuthRegisterWeb} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}