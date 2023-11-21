import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import AddLocationScreen from '../screens/AddLocation';
import ForecastScreen from '../screens/Forecast/Screen';

export type WeatherStackNavigationProp =
  NativeStackNavigationProp<WeatherStackParamList>;

export type WeatherStackParamList = {
  Forecast: undefined;
  AddLocation: undefined;
};

const Stack = createNativeStackNavigator<WeatherStackParamList>();

const WeatherStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Forecast"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Forecast" component={ForecastScreen} />
      <Stack.Screen
        name="AddLocation"
        component={AddLocationScreen}
        options={{headerShown: true, title: 'Add Location'}}
      />
    </Stack.Navigator>
  );
};

export default WeatherStack;
