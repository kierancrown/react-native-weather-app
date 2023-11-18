import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import LocationAccessScreen from '../screens/onboarding/LocationAccess';

export type OnboardingStackNavigationProp =
  NativeStackNavigationProp<OnboardingStackParamList>;

export type OnboardingStackParamList = {
  LocationAccess: undefined;
};

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

const OnboardingStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="LocationAccess"
      screenOptions={{headerShown: false, gestureEnabled: false}}>
      <Stack.Screen name="LocationAccess" component={LocationAccessScreen} />
    </Stack.Navigator>
  );
};

export default OnboardingStack;
