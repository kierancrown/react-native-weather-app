import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useThemeStyles, useTheme} from '../hooks/useTheme';
import Button from '../components/Button';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../redux/store';
import {resetSettings} from '../redux/slices/onboardingSlice';
import {resetUnits} from '../redux/slices/unitsSlice';
import {useNavigation} from '@react-navigation/native';
import {WeatherStackNavigationProp} from '../navigation/WeatherStack';

const ExampleScreen: FC = () => {
  const [, updateTheme] = useTheme();
  const style = useThemeStyles();
  const dispatch = useDispatch<AppDispatch>();
  const {navigate} = useNavigation<WeatherStackNavigationProp>();

  const reset = () => {
    updateTheme({
      mode: 'system',
    });
    dispatch(resetUnits());
    dispatch(resetSettings());
  };

  const openSheet = () => {
    navigate('AddLocation');
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.text, style.text]}>Hello World</Text>
      <Button title="RESET EVERYTING" color="red" onPress={reset} />
      <Button title="Add City" onPress={openSheet} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ExampleScreen;
