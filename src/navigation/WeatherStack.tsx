import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import ExampleScreen from '../screens/Example';

export type AuthStackNavigationProp =
  NativeStackNavigationProp<AuthStackParamList>;

export type AuthStackParamList = {
  Example: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const WeatherStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Example"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Example" component={ExampleScreen} />
    </Stack.Navigator>
  );
};

export default WeatherStack;
