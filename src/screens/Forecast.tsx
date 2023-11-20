import React, {FC} from 'react';
import {
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LocationFab from '../components/LocationFab';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {BlurView} from '@react-native-community/blur';
import {useRealtimeWeather} from '../hooks/useRealtimeWeather';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {roundNumber} from '../utils/math';

interface IForecastProps {}

const ForecastScreen: FC<IForecastProps> = () => {
  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue(0);

  const currentLocation = useSelector(
    (state: RootState) => state.persistent.locations.currentLocation,
  );
  const {
    result: forecast,
    refetch,
    loading,
  } = useRealtimeWeather(`${currentLocation.lat}, ${currentLocation.lon}`);

  const unitsPreferences = useSelector(
    (state: RootState) => state.persistent.units,
  );

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
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refetch}
            progressViewOffset={insets.top}
          />
        }
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
        <LocationFab />
        <SafeAreaView style={styles.container}>
          {/* <Text style={styles.updatedText}>Updated: 2 mins ago</Text> */}

          <View style={styles.currentConditionsContainer}>
            <Text style={styles.tempText}>
              {roundNumber(
                (unitsPreferences.tempUnit === 'C'
                  ? forecast?.current?.temp_c
                  : forecast?.current?.temp_f) ?? 0,
              )}
              °
            </Text>
            <Text style={styles.conditionText}>
              {forecast?.current?.condition?.text}
            </Text>
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
    paddingTop: 86,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  updatedText: {
    fontFamily: 'RNS Sanz',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  tempText: {
    fontFamily: 'RNS Sanz',
    fontSize: 120,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  conditionText: {
    fontFamily: 'RNS Sanz',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  currentConditionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ForecastScreen;
