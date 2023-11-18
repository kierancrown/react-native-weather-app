import React from 'react';
import {View, Text, StyleSheet, Dimensions, Alert} from 'react-native';
import Button from '../../components/common/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useThemeStyles} from '../../hooks/useTheme';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {OnboardingStackNavigationProp} from '../../navigation/OnboardingStack';
import {HapticFeedbackTypes} from 'react-native-haptic-feedback';

const SCREEN_WIDTH = Dimensions.get('window').width;

const LocationAccessScreen = () => {
  const themeStyles = useThemeStyles();
  const {navigate} = useNavigation<OnboardingStackNavigationProp>();

  const handleLocationRequest = () => {
    Alert.alert('Request Location Access');
  };

  const skipRequest = () => {
    navigate('LocationAccess');
  };

  return (
    <SafeAreaView style={styles.container} testID="ONBOARDING_SCREEN">
      <View style={styles.spacer}>
        <FastImage
          style={styles.image}
          resizeMode="contain"
          source={require('../../assets/cityscape.png')}
        />
      </View>
      <Text style={[styles.title, themeStyles.text]}>
        Location Access Required
      </Text>
      <Text style={[styles.subtitle, themeStyles.text]}>
        We need your location to provide you with the most accurate weather
        information.
      </Text>
      <Button
        title="Request Location Access"
        fill
        rounded={8}
        size="large"
        buttonStyle={styles.button}
        textStyle={StyleSheet.flatten([
          styles.buttonText,
          styles.buttonFillText,
        ])}
        onPress={handleLocationRequest}
        haptics={HapticFeedbackTypes.impactLight}
      />
      <Button
        title="No thanks, I'll pass"
        textStyle={styles.buttonText}
        onPress={skipRequest}
        haptics={HapticFeedbackTypes.impactLight}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 2,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    padding: 16,
    rowGap: 32,
  },
  spacer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export default LocationAccessScreen;
