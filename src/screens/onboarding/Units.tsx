import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Button from '../../components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useThemeStyles} from '../../hooks/useTheme';
import {HapticFeedbackTypes} from '../../utils/haptics';
import ThemeRow from './components/ThemeRow';
import TempRow from './components/TempRow';
import SpeedRow from './components/SpeedRow';
import DistanceRow from './components/DistanceRow';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../redux/store';
import {completeOnboarding} from '../../redux/slices/onboardingSlice';

const UnitsScreen = () => {
  const themeStyles = useThemeStyles();
  const dispatch = useDispatch<AppDispatch>();

  const finish = () => {
    dispatch(completeOnboarding());
  };

  return (
    <SafeAreaView style={styles.container} testID="ONBOARDING_SCREEN">
      <View style={styles.titleContainer}>
        <Text style={[styles.title, themeStyles.text]}>
          Just a few more things
        </Text>
        <Text style={[styles.subtitle, themeStyles.text]}>
          Setup any preferences for how we display data to you.
        </Text>
      </View>
      <View style={styles.spacer}>
        <TempRow />
        <DistanceRow />
        <SpeedRow />
        <ThemeRow />
      </View>
      <Button
        title="Looks good"
        textStyle={styles.buttonText}
        onPress={finish}
        haptics={HapticFeedbackTypes.impactLight}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    rowGap: 32,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 32,
    rowGap: 16,
  },
  spacer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 46,
    paddingBottom: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    marginTop: 16,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  buttonFillText: {
    color: 'white',
  },
});

export default UnitsScreen;
