import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-reanimated';

import BottomNavigator from '@/components/bottom-navigator';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();
  const palette = useMemo(() => {
    const colors: [string, string, string, string, string] = ['#0b1020', '#172332', '#22313f', '#1b2c38', '#162530'];
    const shuffled = [...colors].sort(() => Math.random() - 0.5);
    return shuffled as [string, string, string, string, string];
  }, []);
  const gradientDirection = useMemo(() => {
    const directions = [
      { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
      { start: { x: 1, y: 0 }, end: { x: 0, y: 1 } },
      { start: { x: 0, y: 0.2 }, end: { x: 1, y: 0.8 } },
      { start: { x: 0.2, y: 0 }, end: { x: 0.8, y: 1 } },
    ];
    return directions[Math.floor(Math.random() * directions.length)];
  }, []);
  const showBottomNavigator =
    pathname === '/home' ||
    pathname === '/devices' ||
    pathname === '/history' ||
    pathname === '/account';

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={styles.root}>
        <LinearGradient
          colors={palette}
          start={gradientDirection.start}
          end={gradientDirection.end}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.gradientOverlay} />
        <Stack screenOptions={{ headerShown: false, animation: 'none', contentStyle: { backgroundColor: 'transparent' } }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
        </Stack>
        {showBottomNavigator && <BottomNavigator />}
      </View>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
});