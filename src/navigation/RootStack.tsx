import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

import WeatherStack from './WeatherStack';
import {useThemeStyles} from '../hooks/useTheme';

const RootStack = () => {
  const themeStyles = useThemeStyles();

  return (
    <SafeAreaProvider>
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: themeStyles.container.backgroundColor,
            primary: themeStyles.primaryText.color,
            text: themeStyles.text.color,
          },
        }}>
        {false ? <WeatherStack /> : <WeatherStack />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default RootStack;
