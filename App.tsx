import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types/navigation';
import { useFonts, SpaceGrotesk_300Light, SpaceGrotesk_400Regular, SpaceGrotesk_500Medium, SpaceGrotesk_600SemiBold, SpaceGrotesk_700Bold } from '@expo-google-fonts/space-grotesk';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import Exercise from './pages/Exercise';

import './global.css';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

// Previne o splash screen de ser escondido automaticamente
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded] = useFonts({
    SpaceGrotesk_300Light,
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    
    <GluestackUIProvider mode="dark">
      <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Exercise"
        screenOptions={{
          headerShown: false, // Remove o header padrão
        }}
      >
        <Stack.Screen name="Exercise" component={Exercise} />
      </Stack.Navigator>
    </NavigationContainer>
    </GluestackUIProvider>
  
  );
}