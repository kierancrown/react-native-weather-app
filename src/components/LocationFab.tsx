import React, {FC, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Dimensions,
  Keyboard,
  Platform,
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
import {useAutoComplete} from '../hooks/useAutoComplete';
import RNLocation from 'react-native-location';

import rnTextSize from 'react-native-text-size';

import SearchIcon from '../assets/search.svg';
import BookmarkIcon from '../assets/bookmark.svg';

import {
  removeLocation,
  saveLocation,
  setCurrentLocation,
} from '../redux/slices/locationsSlice';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import {HapticFeedbackTypes, triggerHaptic} from '../utils/haptics';
import {AutoCompleteResult} from '../types/api';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const HEIGHT = 40;

//#region Animation Hook
const useLocationFabAnimation = (
  autoWidth: SharedValue<number>,
  openState: SharedValue<number>,
  keyboardHeight: SharedValue<number>,
) => {
  const insets = useSafeAreaInsets();
  const themeStyles = useThemeStyles();

  const openContainerAnimatedStyles = useAnimatedStyle(() => {
    const openedHeight = clamp(
      SCREEN_HEIGHT - insets.top - 32 - keyboardHeight.value,
      130,
      SCREEN_HEIGHT -
        insets.top -
        insets.bottom -
        (Platform.OS === 'ios' ? 32 : 132),
    );

    return {
      left: interpolate(
        openState.value,
        [0, 1],
        [SCREEN_WIDTH / 2 - autoWidth.value / 2, 16],
      ),
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
      borderRadius: interpolate(openState.value, [0, 1], [HEIGHT / 2, 10]),
    };
  });

  const openInputAnimatedStyles = useAnimatedStyle(() => {
    return {
      pointerEvents: openState.value === 0 ? 'none' : 'auto',
      opacity: openState.value,
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

  const openStateAnimatedCloseStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(openState.value, [0, 1], [0, 1]),
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
    openStateAnimatedCloseStyles,
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

  BackHandler.addEventListener('hardwareBackPress', () => {
    if (isOpen) {
      close();
      return true;
    }
    return false;
  });

  const handlePress = async () => {
    await triggerHaptic(HapticFeedbackTypes.impactLight);
    setIsOpen(true);
    openState.value = withTiming(1, {
      duration: 200,
    });
    inputRef.current?.focus();
  };

  const {
    openContainerAnimatedStyles,
    openInputAnimatedStyles,
    openStateAnimatedCloseStyles,
    openStateAnimatedTextStyles,
    openStateAnimatedHeaderStyles,
    openStateAnimatedHeaderIconStyles,
  } = useLocationFabAnimation(autoWidth, openState, keyboardHeight);

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
      opacity: interpolate(openState.value, [0, 1], [0, 0.9]),
      height: SCREEN_HEIGHT,
      width: SCREEN_WIDTH,
      zIndex: 999,
    };
  }, []);

  // Check if current location is current device and grab the info
  useEffect(() => {
    RNLocation.getCurrentPermission().then(permission => {
      if (permission !== 'authorizedWhenInUse') {
        RNLocation.requestPermission({
          ios: 'whenInUse',
          android: {
            detail: 'coarse',
          },
        });
      }
    }, console.error);
    RNLocation.getLatestLocation({timeout: 60000}).then(latestLocation => {
      if (latestLocation) {
        setDeviceLatLon({
          latitude: latestLocation.latitude,
          longitude: latestLocation.longitude,
        });
      }
    });
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

  const bookmark = (location: AutoCompleteResult) => {
    dispatch(
      saveLocation({
        id: `${location.id}`,
        isDeviceLocation: false,
        lat: location.lat,
        lon: location.lon,
        name: location.name,
        country: location.country,
      }),
    );
  };

  const unbookmark = (id: string) => {
    dispatch(removeLocation(id));
  };

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
      {/* Backdrop */}
      <Animated.View
        style={[StyleSheet.absoluteFillObject, backdropAnimatedStyles]}
        pointerEvents={isOpen ? 'auto' : 'none'}>
        <Pressable style={StyleSheet.absoluteFillObject} onPress={close}>
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
          {!isOpen && (
            <BlurView
              ref={blurRef}
              style={StyleSheet.absoluteFillObject}
              blurType="regular"
              blurAmount={10}
              reducedTransparencyFallbackColor="white"
            />
          )}
          <Animated.View style={[styles.pill, openStateAnimatedHeaderStyles]}>
            <Animated.View style={openStateAnimatedHeaderIconStyles}>
              <LocationIcon width={18} height={18} fill="#ffffff" />
            </Animated.View>
            <Animated.Text style={[styles.text, openStateAnimatedTextStyles]}>
              {isOpen ? 'Add new location' : locations.currentLocation.name}
            </Animated.Text>
            <Pressable
              onPress={close}
              disabled={!isOpen}
              style={styles.closeTextContainer}>
              <Animated.Text
                style={[
                  styles.text,
                  themeStyles.primaryText,
                  openStateAnimatedCloseStyles,
                ]}>
                Close
              </Animated.Text>
            </Pressable>
          </Animated.View>
        </Pressable>

        {/* Pulled down state */}
        <Pressable style={[styles.openContainer, !isOpen && styles.hide]}>
          <Animated.View style={[openInputAnimatedStyles]}>
            <Pressable
              style={[styles.openInput, themeStyles.input]}
              onPress={() => {
                inputRef.current?.focus();
              }}>
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
                style={[
                  styles.TextInput,
                  {
                    color: themeStyles.text.color,
                  },
                ]}
                placeholder="Search for a location"
                cursorColor={themeStyles.text.color}
                returnKeyLabel="Close"
                returnKeyType="done"
                ref={inputRef}
                value={query}
                onChangeText={setQuery}
              />
            </Pressable>

            <View style={styles.resultContainer}>
              {/* Current locations */}
              {currentLocationLoading === false &&
              currentLocationResult.length ? (
                <Pressable
                  key={currentLocationResult[0].id}
                  onPress={async () => {
                    await triggerHaptic(HapticFeedbackTypes.impactMedium);
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

              {results.length
                ? results.map(result => {
                    const isSaved = locations.savedLocations?.find(
                      item => item.id === `${result.id}`,
                    );
                    return (
                      <Pressable
                        key={result.id}
                        onPress={async () => {
                          await triggerHaptic(HapticFeedbackTypes.impactMedium);
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

                        <Pressable
                          style={[
                            styles.bookmarkButton,
                            isSaved && styles.bookmarked,
                          ]}
                          onPress={() => {
                            if (isSaved) {
                              unbookmark(`${result.id}`);
                            } else {
                              bookmark(result);
                            }
                          }}>
                          <BookmarkIcon
                            width={18}
                            height={18}
                            fill={
                              isSaved
                                ? themeStyles.primaryText.color
                                : themeStyles.text.color
                            }
                          />
                        </Pressable>
                      </Pressable>
                    );
                  })
                : locations.savedLocations?.map(result => (
                    <Pressable
                      key={result.id}
                      onPress={async () => {
                        await triggerHaptic(HapticFeedbackTypes.impactMedium);
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

                      <Pressable
                        style={[styles.bookmarkButton, styles.bookmarked]}
                        onPress={() => {
                          unbookmark(`${result.id}`);
                        }}>
                        <BookmarkIcon
                          width={18}
                          height={18}
                          fill={themeStyles.primaryText.color}
                        />
                      </Pressable>
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
    zIndex: 999,
    borderWidth: 1.5,
    overflow: 'hidden',
  },
  pill: {
    height: 37,
    flexDirection: 'row',
    width: '100%',
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
  bookmarkButton: {
    marginLeft: 'auto',
    opacity: 0.4,
  },
  bookmarked: {
    opacity: 1,
  },
  closeTextContainer: {
    marginLeft: 'auto',
    marginRight: -32,
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
  resultContainer: {
    marginTop: 8,
    gap: 8,
    zIndex: 999,
  },
  TextInput: {
    width: '100%',
    fontFamily: 'RNS Sanz',
    fontSize: 16,
    fontWeight: 'bold',
    // TODO: Fix Android bug, when setting padi=ding to 0 the input does not focus
    // padding: 0,
  },
});

export default LocationFab;
