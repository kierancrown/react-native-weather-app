import React, {FC, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import LocationIcon from '../assets/location-dot-outline.svg';
import CurrentLocationIcon from '../assets/location-arrow.svg';
import {BlurView} from '@react-native-community/blur';
import Animated, {
  SharedValue,
  clamp,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useThemeStyles} from '../hooks/useTheme';
import {useAutoComplete} from '../hooks/useWeatherApi';
import RNLocation from 'react-native-location';

import rnTextSize from 'react-native-text-size';

import SearchIcon from '../assets/search.svg';
import {setCurrentLocation} from '../redux/slices/locationsSlice';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const HEIGHT = 40;

//#region Animation Hook
const useLocationFabAnimation = (
  autoWidth: SharedValue<number>,
  openState: SharedValue<number>,
  keyboardHeight: SharedValue<number>,
  themeStyles: any, // Replace 'any' with your theme styles type
) => {
  const insets = useSafeAreaInsets();

  const openContainerAnimatedStyles = useAnimatedStyle(() => {
    const openedHeight = clamp(
      SCREEN_HEIGHT - insets.top - 32 - keyboardHeight.value,
      130,
      SCREEN_HEIGHT - insets.top - 32,
    );

    return {
      // TODO: Somehow make the width shrink to auto
      width: interpolate(
        openState.value,
        [0, 1],
        [autoWidth.value, SCREEN_WIDTH - 32],
      ),
      opacity: interpolate(openState.value, [0, 1], [0.8, 1]),
      borderColor: interpolateColor(
        openState.value,
        [0, 1],
        ['#ffffff', themeStyles.container.backgroundColor],
      ),
      backgroundColor: interpolateColor(
        openState.value,
        [0, 1],
        ['transparent', themeStyles.container.backgroundColor],
      ),
      height: interpolate(openState.value, [0, 1], [HEIGHT, openedHeight]),
      borderRadius: interpolate(openState.value, [0, 1], [999, 10]),
    };
  });

  const openInputAnimatedStyles = useAnimatedStyle(() => {
    return {
      pointerEvents: openState.value === 0 ? 'none' : 'auto',
      opacity: withTiming(openState.value),
    };
  });

  const openStateAnimatedTextStyles = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        openState.value,
        [0, 1],
        ['#ffffff', themeStyles.text.color],
      ),
    };
  });

  const openStateAnimatedHeaderStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(openState.value, [0, 1], [0, -26]),
        },
      ],
    };
  });

  const openStateAnimatedHeaderIconStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(openState.value, [0, 1], [1, 0]),
    };
  });

  return {
    openContainerAnimatedStyles,
    openInputAnimatedStyles,
    openStateAnimatedTextStyles,
    openStateAnimatedHeaderStyles,
    openStateAnimatedHeaderIconStyles,
  };
};
//#endregion

const LocationFab: FC = () => {
  const themeStyles = useThemeStyles();
  const inputRef = useRef<TextInput>(null);
  const blurRef = useRef<View>(null);

  const locations = useSelector(
    (state: RootState) => state.persistent.locations,
  );

  const dispatch = useDispatch<AppDispatch>();

  const autoWidth = useSharedValue(0);
  const openState = useSharedValue(0);
  const keyboardHeight = useSharedValue(0);

  const insets = useSafeAreaInsets();

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const [deviceLatLon, setDeviceLatLon] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const {results, loading} = useAutoComplete(query);
  const {results: currentLocationResult, loading: currentLocationLoading} =
    useAutoComplete(
      deviceLatLon ? `${deviceLatLon.latitude},${deviceLatLon.longitude}` : '',
    );

  Keyboard.addListener('keyboardWillShow', e => {
    keyboardHeight.value = e.endCoordinates.height;
  });

  const handlePress = () => {
    inputRef.current?.focus();
  };

  const {
    openContainerAnimatedStyles,
    openInputAnimatedStyles,
    openStateAnimatedTextStyles,
    openStateAnimatedHeaderStyles,
    openStateAnimatedHeaderIconStyles,
  } = useLocationFabAnimation(
    autoWidth,
    openState,
    keyboardHeight,
    themeStyles,
  );

  const close = () => {
    setQuery('');
    inputRef.current?.blur();
    setIsOpen(false);
    openState.value = withTiming(0, {
      duration: 200,
    });
  };

  const backdropAnimatedStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(openState.value, [0, 1], [0, 0.8]),
      height: SCREEN_HEIGHT,
    };
  }, []);

  // Check if current location is current device and grab the info
  useEffect(() => {
    if (
      locations.currentLocation.isDeviceLocation &&
      locations.currentLocation.lat === 0 &&
      locations.currentLocation.lon === 0
    ) {
      RNLocation.getLatestLocation({timeout: 60000}).then(latestLocation => {
        if (latestLocation) {
          setDeviceLatLon({
            latitude: latestLocation.latitude,
            longitude: latestLocation.longitude,
          });
        }
      });
    }
  }, [locations.currentLocation]);

  // Update redux store with current location
  useEffect(() => {
    if (!currentLocationLoading && currentLocationResult.length) {
      dispatch(
        setCurrentLocation({
          id: `${currentLocationResult[0].id}`,
          isDeviceLocation: true,
          lat: currentLocationResult[0].lat,
          lon: currentLocationResult[0].lon,
          name: currentLocationResult[0].name,
          country: currentLocationResult[0].country,
        }),
      );
    }
  }, [currentLocationResult, currentLocationLoading, dispatch]);

  // Measure the width of the location text (Needed for the animation)
  useEffect(() => {
    (async () => {
      const size = await rnTextSize.measure({
        text: locations.currentLocation.name,
        width: SCREEN_WIDTH,
        fontFamily: 'RNS Sanz',
        fontSize: 16,
      });

      autoWidth.value = size.width + 64;
    })();
  }, [autoWidth, locations.currentLocation.name]);

  return (
    <>
      <Animated.View
        style={[StyleSheet.absoluteFillObject, backdropAnimatedStyles]}>
        <Pressable style={styles.flex} onPress={close}>
          <BlurView
            style={StyleSheet.absoluteFillObject}
            blurType="thickMaterial"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          />
        </Pressable>
      </Animated.View>
      <Animated.View
        style={[
          styles.container,
          openContainerAnimatedStyles,
          {
            top: insets.top + 16,
          },
        ]}>
        <Pressable onPress={handlePress}>
          <BlurView
            ref={blurRef}
            style={StyleSheet.absoluteFillObject}
            blurType="regular"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          />
          <Animated.View style={[styles.pill, openStateAnimatedHeaderStyles]}>
            <Animated.View style={openStateAnimatedHeaderIconStyles}>
              <LocationIcon width={18} height={18} fill="#ffffff" />
            </Animated.View>
            <Animated.Text style={[styles.text, openStateAnimatedTextStyles]}>
              {isOpen ? 'Add new location' : locations.currentLocation.name}
            </Animated.Text>
          </Animated.View>
        </Pressable>

        {/* Pulled down state */}
        <Pressable style={[styles.openContainer, !isOpen && styles.hide]}>
          <Animated.View style={[openInputAnimatedStyles]}>
            <Pressable
              style={[styles.openInput, themeStyles.input]}
              onPress={handlePress}>
              {loading ? (
                <View style={styles.loadingIndicatorContainer}>
                  <ActivityIndicator
                    size="small"
                    color={themeStyles.placeholderText.color}
                  />
                </View>
              ) : (
                <SearchIcon
                  width={18}
                  height={18}
                  fill={themeStyles.placeholderText.color}
                />
              )}
              <TextInput
                style={[styles.openTextInput, themeStyles.text]}
                placeholder="Search for a location"
                cursorColor={themeStyles.text.color}
                returnKeyLabel="Close"
                returnKeyType="done"
                ref={inputRef}
                value={query}
                onChangeText={setQuery}
                onFocus={() => {
                  setIsOpen(true);
                  openState.value = withTiming(1);
                }}
              />
            </Pressable>

            <View style={styles.resultContainer}>
              {currentLocationLoading === false &&
              currentLocationResult.length ? (
                <Pressable
                  key={currentLocationResult[0].id}
                  onPress={() => {
                    dispatch(
                      setCurrentLocation({
                        id: `${currentLocationResult[0].id}`,
                        isDeviceLocation: true,
                        lat: currentLocationResult[0].lat,
                        lon: currentLocationResult[0].lon,
                        name: currentLocationResult[0].name,
                        country: currentLocationResult[0].country,
                      }),
                    );
                    close();
                  }}
                  style={[
                    styles.openInput,
                    {
                      backgroundColor:
                        themeStyles.secondaryContainer.backgroundColor,
                    },
                  ]}>
                  <CurrentLocationIcon
                    width={18}
                    height={18}
                    fill={themeStyles.text.color}
                  />
                  <Text style={themeStyles.text}>
                    {currentLocationResult[0].name},{' '}
                    {currentLocationResult[0].country}
                  </Text>
                </Pressable>
              ) : null}

              {results.map(result => (
                <Pressable
                  key={result.id}
                  onPress={() => {
                    console.log(result);
                    dispatch(
                      setCurrentLocation({
                        id: `${result.id}`,
                        isDeviceLocation: true,
                        lat: result.lat,
                        lon: result.lon,
                        name: result.name,
                        country: result.country,
                      }),
                    );
                    close();
                  }}
                  style={[
                    styles.openInput,
                    {
                      backgroundColor:
                        themeStyles.secondaryContainer.backgroundColor,
                    },
                  ]}>
                  <LocationIcon
                    width={18}
                    height={18}
                    fill={themeStyles.text.color}
                  />
                  <Text style={themeStyles.text}>
                    {result.name}, {result.country}
                  </Text>
                </Pressable>
              ))}
            </View>
          </Animated.View>
        </Pressable>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  hide: {
    opacity: 0,
  },
  flex: {
    flex: 1,
  },
  wrapper: {
    zIndex: 999,
  },
  container: {
    position: 'absolute',
    left: 16,
    zIndex: 999,
    borderWidth: 1.5,
    overflow: 'hidden',
  },
  pill: {
    height: 37,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    columnGap: 8,
  },
  text: {
    fontFamily: 'RNS Sanz',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  openContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    flex: 1,
  },
  loadingIndicatorContainer: {
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  openInput: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
    padding: 8,
    width: '100%',
    borderRadius: 4,
  },
  openTextInput: {
    fontFamily: 'RNS Sanz',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 0,
  },
  resultContainer: {
    marginTop: 8,
    gap: 8,
    zIndex: 999,
  },
});

export default LocationFab;
