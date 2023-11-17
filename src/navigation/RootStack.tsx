import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';

import WeatherStack from './WeatherStack';

const RootStack = () => {
  return (
    <>
      <SafeAreaProvider>
        <NavigationContainer>
          {false ? <WeatherStack /> : <WeatherStack />}
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
};

export default RootStack;
