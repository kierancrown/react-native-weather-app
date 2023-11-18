import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Alert} from 'react-native';
import Button from '../../components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useThemeStyles} from '../../hooks/useTheme';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {OnboardingStackNavigationProp} from '../../navigation/OnboardingStack';
import {HapticFeedbackTypes} from '../../utils/haptics';
import RNLocation from 'react-native-location';

const SCREEN_WIDTH = Dimensions.get('window').width;
RNLocation.configure({
  distanceFilter: 5.0,
});

const LocationAccessScreen = () => {
  const themeStyles = useThemeStyles();
  const {navigate} = useNavigation<OnboardingStackNavigationProp>();
  const [alreadyGranted, setAlreadyGranted] = useState(false);

  useEffect(() => {
    const checkLocationPermission = async () => {
      try {
        const granted = await RNLocation.checkPermission({
          ios: 'whenInUse',
          android: {
            detail: 'fine',
          },
        });
        setAlreadyGranted(granted);
      } catch (error) {
        // Would normally log to Sentry or something here
        console.error(error);
        navigate('Units');
      }
    };
    checkLocationPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLocationRequest = async () => {
    try {
      if (alreadyGranted) {
        navigate('Units');
        return;
      }

      await RNLocation.requestPermission({
        ios: 'whenInUse',
        android: {
          detail: 'fine',
          rationale: {
            title: 'We need to access your location',
            message: 'We use your location to show you accurate weather.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        },
      });

      navigate('Units');
    } catch (error) {
      Alert.alert(
        'Error requesting location access',
        'Please try again later.',
        [{text: 'OK'}],
      );
    }
  };

  const skipRequest = () => {
    navigate('Units');
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
        {alreadyGranted ? 'Location access granted' : 'Where are you?'}
      </Text>
      <Text style={[styles.subtitle, themeStyles.text]}>
        {alreadyGranted
          ? 'Great! We can use your location to show you the weather.'
          : 'We need your location to provide you with the most accurate weather information.'}
      </Text>
      <Button
        title={alreadyGranted ? 'Continue' : 'Request Location Access'}
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
      {alreadyGranted === false && (
        <Button
          title="No thanks, I'll pass"
          textStyle={styles.buttonText}
          onPress={skipRequest}
          haptics={HapticFeedbackTypes.impactLight}
        />
      )}
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
    fontFamily: 'RNS Sanz',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'RNS Sanz',
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    marginTop: 16,
  },
  buttonText: {
    fontFamily: 'RNS Sanz',
    fontWeight: 'bold',
    fontSize: 18,
  },
  buttonFillText: {
    color: 'white',
  },
});

export default LocationAccessScreen;
