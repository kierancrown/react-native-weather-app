import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import LocationAccessScreen from '../screens/onboarding/LocationAccess';
import UnitsScreen from '../screens/onboarding/Units';

export type OnboardingStackNavigationProp =
  NativeStackNavigationProp<OnboardingStackParamList>;

export type OnboardingStackParamList = {
  LocationAccess: undefined;
  Units: undefined;
};

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

const OnboardingStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="LocationAccess"
      screenOptions={{headerShown: false, gestureEnabled: false}}>
      <Stack.Screen name="LocationAccess" component={LocationAccessScreen} />
      <Stack.Screen name="Units" component={UnitsScreen} />
    </Stack.Navigator>
  );
};

export default OnboardingStack;
