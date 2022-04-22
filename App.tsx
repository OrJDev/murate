import * as React from 'react';
import { useFonts } from '@use-expo/font';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './navigation';
import { NavigationContainer } from '@react-navigation/native';
import { SongsProvider } from './context/Songs';

export default function App() {
  const [isReady] = useFonts({
    "Poppins-Black": require("./assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-SemiBold.ttf"),
  })
  if (!isReady) {
    return null;
  } else {
    return (
      <SongsProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <Navigation />
            <StatusBar hidden />
          </NavigationContainer>
        </SafeAreaProvider>
      </SongsProvider>
    );
  }
}
