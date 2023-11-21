import React, {FC, useEffect, useState} from 'react';
import {
  Dimensions,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LocationFab from '../../components/LocationFab';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {BlurView} from '@react-native-community/blur';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {roundNumber} from '../../utils/math';
import {useForecast} from '../../hooks/useForecast';
import HourlyForecast from './components/HourlyForecast';
import LottieView from 'lottie-react-native';
import {day, night} from '../../utils/weatherAssets';
import {useTheme} from '../../hooks/useTheme';
import WeekForecast from './components/WeekForecast';

interface IForecastProps {}

const SCREEN_WIDTH = Dimensions.get('screen').width;

const ForecastScreen: FC<IForecastProps> = () => {
  const [, , systemColorScheme] = useTheme();
  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue(0);
  const [backgroundGradient, setBackgroundGradient] = useState([
    '#2F80ED',
    '#56CCF2',
  ]);

  const currentLocation = useSelector(
    (state: RootState) => state.persistent.locations.currentLocation,
  );
  const {
    result: forecast,
    refetch,
    loading,
  } = useForecast(`${currentLocation.lat}, ${currentLocation.lon}`);

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

  useEffect(() => {
    if (forecast) {
      setBackgroundGradient(
        forecast.current.is_day
          ? day[forecast.current.condition.code].background
          : night[forecast.current.condition.code].background,
      );
    }
  }, [forecast]);

  return (
    <LinearGradient colors={backgroundGradient} style={styles.flex}>
      {Platform.OS === 'ios' && (
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
            blurType={systemColorScheme === 'light' ? 'light' : 'dark'}
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          />
        </Animated.View>
      )}
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refetch}
            progressViewOffset={insets.top}
          />
        }
        contentContainerStyle={{
          minHeight:
            Dimensions.get('screen').height - insets.top - insets.bottom,
        }}
        onScroll={event => {
          if (systemColorScheme === 'light') {
            StatusBar.setBarStyle(
              event.nativeEvent.contentOffset.y <= 0
                ? 'light-content'
                : 'dark-content',
              true,
            );
          }
          scrollY.value = event.nativeEvent.contentOffset.y;
        }}
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="always">
        <LocationFab />
        <SafeAreaView style={styles.container}>
          <View style={styles.iconContainer}>
            {forecast && (
              <LottieView
                source={
                  forecast.current.is_day
                    ? day[forecast.current.condition.code].icon
                    : night[forecast.current.condition.code].icon
                }
                autoPlay
                loop
                style={styles.icon}
              />
            )}
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

              <View style={styles.hiLoContainer}>
                <Text style={styles.hiLoText}>
                  H:{' '}
                  {roundNumber(
                    (unitsPreferences.tempUnit === 'C'
                      ? forecast?.forecast?.forecastday[0]?.day?.maxtemp_c
                      : forecast?.forecast?.forecastday[0]?.day?.maxtemp_f) ??
                      0,
                  )}
                  °
                </Text>
                <Text style={styles.hiLoText}>
                  L:{' '}
                  {roundNumber(
                    (unitsPreferences.tempUnit === 'C'
                      ? forecast?.forecast?.forecastday[0]?.day?.mintemp_c
                      : forecast?.forecast?.forecastday[0]?.day?.mintemp_f) ??
                      0,
                  )}
                  °
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.hourlyContainer}>
            {forecast && (
              <>
                <HourlyForecast
                  conditions={forecast?.forecast?.forecastday[0]?.hour ?? []}
                />

                <WeekForecast days={forecast?.forecast.forecastday ?? []} />
              </>
            )}
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
    padding: 16,
  },
  iconContainer: {
    width: SCREEN_WIDTH - 32,
    paddingVertical: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: SCREEN_WIDTH / 2,
    height: SCREEN_WIDTH / 2,
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
    gap: 16,
  },
  hiLoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  hiLoText: {
    fontFamily: 'RNS Sanz',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  hiLoSplitter: {
    fontFamily: 'RNS Sanz',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  hourlyContainer: {
    flex: 1,
    gap: 16,
  },
});
export default ForecastScreen;
