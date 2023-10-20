import {RouteWrapper} from "./src/router";
import MetaMaskProvider from "./src/providers/useMetaMask";
import { useFonts } from 'expo-font';
import {StyleSheet, View} from 'react-native';
import React from "react";

export default function App() {
  const [fontsLoaded] = useFonts({
    'space-grotesk': require('./src/assets/fonts/SpaceGrotesk-Regular.ttf'),
    'space-grotesk-medium': require('./src/assets/fonts/SpaceGrotesk-Medium.ttf'),
    'space-grotesk-semibold': require('./src/assets/fonts/SpaceGrotesk-SemiBold.ttf'),
    'space-grotesk-bold': require('./src/assets/fonts/SpaceGrotesk-Bold.ttf'),
  });

  return (
    <View style={globalStyles.appContainer}>
      <MetaMaskProvider>
        <RouteWrapper />
      </MetaMaskProvider>
    </View>
  );
}

const globalStyles = StyleSheet.create({
  appContainer: {
    flex: 1,
    fontFamily: 'space-grotesk',
  },
});
