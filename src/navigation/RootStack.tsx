import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

import WeatherStack from './WeatherStack';
import {useThemeStyles} from '../hooks/useTheme';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import OnboardingStack from './OnboardingStack';

const RootStack = () => {
  const themeStyles = useThemeStyles();
  const onboardingComplete = useSelector(
    (state: RootState) => state.onboarding.onboardingComplete,
  );

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
        {onboardingComplete ? <WeatherStack /> : <OnboardingStack />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default RootStack;
