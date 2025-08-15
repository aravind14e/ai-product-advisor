import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AdvisorScreen from './src/AdvisorScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <AdvisorScreen />
        <StatusBar style="auto" />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
