import React, {FC} from 'react';
import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import LocationFab from '../components/LocationFab';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {BlurView} from '@react-native-community/blur';

interface IForecastProps {}

const ForecastScreen: FC<IForecastProps> = () => {
  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue(0);

  const statusBarOpacity = useAnimatedStyle(() => {
    return {
      opacity: withTiming(scrollY.value <= 0 ? 0 : 1, {
        duration: 220,
      }),
    };
  });

  return (
    <LinearGradient colors={['#2F80ED', '#56CCF2']} style={styles.flex}>
      <Animated.View
        style={[
          styles.statusBarBlur,
          {
            height: insets.top + 8,
          },
          statusBarOpacity,
        ]}>
        <BlurView
          style={StyleSheet.absoluteFillObject}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />
      </Animated.View>
      <ScrollView
        onScroll={event => {
          StatusBar.setBarStyle(
            event.nativeEvent.contentOffset.y <= 0
              ? 'light-content'
              : 'dark-content',
            true,
          );
          scrollY.value = event.nativeEvent.contentOffset.y;
        }}
        scrollEventThrottle={16}>
        <SafeAreaView style={styles.container}>
          <View style={styles.locationViewContainer}>
            <LocationFab currentLocation="Paris" />
            <View style={styles.spacer} />
            <Text style={styles.updatedText}>Updated: 2 mins ago</Text>
          </View>
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  statusBarBlur: {
    position: 'absolute',
    width: '100%',
    overflow: 'hidden',
    zIndex: 10000,
  },
  spacer: {
    flex: 1,
  },
  locationViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  updatedText: {
    fontFamily: 'RNS Sanz',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default ForecastScreen;
