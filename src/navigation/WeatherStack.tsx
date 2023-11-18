import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import ExampleScreen from '../screens/Example';
import AddLocationScreen from '../screens/AddLocation';

export type WeatherStackNavigationProp =
  NativeStackNavigationProp<WeatherStackParamList>;

export type WeatherStackParamList = {
  Example: undefined;
  AddLocation: undefined;
};

const Stack = createNativeStackNavigator<WeatherStackParamList>();

const WeatherStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Example"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Example" component={ExampleScreen} />
      <Stack.Screen
        name="AddLocation"
        component={AddLocationScreen}
        options={{headerShown: true, title: 'Add Location'}}
      />
    </Stack.Navigator>
  );
};

export default WeatherStack;
