import 'react-native-gesture-handler'
import React from 'react';
import AppLoading from 'expo-app-loading'
import { enableScreens } from 'react-native-screens'
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins'

import { Routes } from './src/routes';

enableScreens()

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <Routes />
  );
}
