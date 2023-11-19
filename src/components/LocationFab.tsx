import React, {FC, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import LocationIcon from '../assets/location-dot-outline.svg';
import {BlurView} from '@react-native-community/blur';
import Animated, {
  SharedValue,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useThemeStyles} from '../hooks/useTheme';
import {useAutoComplete} from '../hooks/useWeatherApi';

import SearchIcon from '../assets/search.svg';

interface ILocationFabProps {
  currentLocation: string;
}

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const HEIGHT = 40;

//#region Animation Hook
const useLocationFabAnimation = (
  openState: SharedValue<number>,
  keyboardHeight: SharedValue<number>,
  themeStyles: any, // Replace 'any' with your theme styles type
) => {
  const insets = useSafeAreaInsets();

  const openContainerAnimatedStyles = useAnimatedStyle(() => {
    const openedHeight = SCREEN_HEIGHT - insets.top - 32 - keyboardHeight.value;

    return {
      width: interpolate(openState.value, [0, 1], [100, SCREEN_WIDTH - 32]),
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

const LocationFab: FC<ILocationFabProps> = ({currentLocation}) => {
  const themeStyles = useThemeStyles();
  const inputRef = useRef<TextInput>(null);
  const openState = useSharedValue(0);
  const keyboardHeight = useSharedValue(0);

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const {results, loading} = useAutoComplete(query);

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
  } = useLocationFabAnimation(openState, keyboardHeight, themeStyles);

  return (
    <Pressable onPress={handlePress} style={styles.wrapper}>
      <Animated.View style={[styles.container, openContainerAnimatedStyles]}>
        <BlurView
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
            {isOpen ? 'Add new location' : currentLocation}
          </Animated.Text>
        </Animated.View>

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
                style={[styles.openTextInput]}
                placeholder="Search for a location"
                returnKeyLabel="Close"
                returnKeyType="done"
                ref={inputRef}
                value={query}
                onChangeText={setQuery}
                onFocus={() => {
                  setIsOpen(true);
                  openState.value = withTiming(1);
                }}
                onBlur={() => {
                  setIsOpen(false);
                  openState.value = withTiming(0, {
                    duration: 200,
                  });
                }}
              />
            </Pressable>

            <View style={styles.resultContainer}>
              {results.map(result => (
                <Pressable
                  key={result.id}
                  onPress={() => {
                    Alert.alert("You've selected a location", result.name);
                    Keyboard.dismiss();
                    setQuery('');
                  }}
                  style={[
                    styles.openInput,
                    {
                      backgroundColor:
                        themeStyles.secondaryContainer.backgroundColor,
                    },
                  ]}>
                  <LocationIcon width={18} height={18} fill="#000000" />
                  <Text>
                    {result.name}, {result.country}
                  </Text>
                </Pressable>
              ))}
            </View>
          </Animated.View>
        </Pressable>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  hide: {
    opacity: 0,
  },
  wrapper: {
    zIndex: 999,
  },
  container: {
    position: 'absolute',
    top: -(HEIGHT / 2),
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
  },
  resultContainer: {
    marginTop: 8,
    gap: 8,
  },
});

export default LocationFab;
