import {
  ActivityIndicator,
  Pressable,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React, {ReactElement} from 'react';
import {triggerHaptic, HapticFeedbackTypes} from '../utils/haptics';
import {useTheme, useThemeStyles} from '../hooks/useTheme';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface IButtonProps {
  testID?: string;
  title: string;
  color?: string;
  haptics?: HapticFeedbackTypes;
  size?: 'small' | 'medium' | 'large';
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  fill?: boolean;
  rounded?: 'none' | 'small' | 'medium' | 'full' | number;
  animateOnPress?: 'scale' | 'opacity' | 'both' | 'none';
  icon?: ReactElement<any>;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
  disableOnLoading?: boolean;
  outline?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
}

const Button = ({
  testID,
  title,
  color: colorProp,
  haptics,
  size = 'medium',
  rounded = 'medium',
  fill = false,
  disabled = false,
  animateOnPress = 'both',
  buttonStyle,
  textStyle,
  icon,
  iconPosition = 'left',
  loading = false,
  disableOnLoading = true,
  outline = false,
  onPress,
  onLongPress,
}: IButtonProps) => {
  const [theme] = useTheme();
  const color = colorProp || theme.primary;
  const themeAwareStyles = useThemeStyles();
  const buttonScale = useSharedValue(1);
  const buttonOpacity = useSharedValue(1);

  const buttonStyles: ViewStyle = {
    borderRadius:
      typeof rounded === 'number'
        ? rounded
        : rounded === 'small'
        ? 6
        : rounded === 'medium'
        ? 12
        : rounded === 'full'
        ? 9999
        : rounded === 'none'
        ? 0
        : 0,
    borderWidth: outline
      ? size === 'large'
        ? 2
        : size === 'medium'
        ? 1.5
        : size === 'small'
        ? 1
        : 0
      : 0,
    borderColor: color,
    paddingHorizontal:
      !fill && !outline
        ? 0
        : size === 'small'
        ? 12
        : size === 'large'
        ? 24
        : 16,
    paddingVertical:
      !fill && !outline ? 0 : size === 'small' ? 6 : size === 'large' ? 12 : 8,
    flexDirection: iconPosition === 'left' ? 'row' : 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: fill ? (disabled ? 'gray' : color) : 'transparent',
    ...buttonStyle,
  };

  const buttonTextStyles: TextStyle = {
    color: fill
      ? themeAwareStyles.container.backgroundColor
      : disabled
      ? 'gray'
      : color,
    fontFamily: 'RNS Sanz',
    fontWeight: '600',
    fontSize: size === 'small' ? 14 : size === 'large' ? 22 : 18,
    ...textStyle,
  };

  const ActivityIndicatorStyles: ViewStyle = {
    marginRight: iconPosition === 'left' ? 8 : 0,
    marginLeft: iconPosition === 'right' ? 8 : 0,
  };

  const internalOnPress = () => {
    if (haptics) {
      triggerHaptic(haptics);
    }
    onPress?.();
  };

  const internalOnLongPress = () => {
    if (haptics) {
      triggerHaptic(haptics);
    }
    onLongPress?.();
  };

  const onPressDown = () => {
    switch (animateOnPress) {
      case 'scale':
        buttonScale.value = withTiming(0.95, {duration: 66});
        break;
      case 'opacity':
        buttonOpacity.value = withTiming(0.5, {duration: 66});
        break;
      case 'both':
        buttonScale.value = withTiming(0.95, {duration: 66});
        buttonOpacity.value = withTiming(0.5, {duration: 66});
        break;
    }
  };

  const onPressUp = () => {
    switch (animateOnPress) {
      case 'scale':
        buttonScale.value = withTiming(1, {duration: 66});
        break;
      case 'opacity':
        buttonOpacity.value = withTiming(1, {duration: 66});
        break;
      case 'both':
        buttonScale.value = withTiming(1, {duration: 66});
        buttonOpacity.value = withTiming(1, {duration: 66});
        break;
    }
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{scale: buttonScale.value}],
      opacity: buttonOpacity.value,
    };
  });

  return (
    <Animated.View style={animatedStyles} testID={testID}>
      <Pressable
        style={[buttonStyles]}
        onPress={internalOnPress}
        onLongPress={internalOnLongPress}
        onPressIn={onPressDown}
        onPressOut={onPressUp}
        disabled={loading && disableOnLoading ? true : disabled}>
        {loading === true ? (
          <ActivityIndicator
            color={fill ? themeAwareStyles.container.backgroundColor : color}
            style={ActivityIndicatorStyles}
          />
        ) : icon ? (
          React.cloneElement(icon, {
            style: ActivityIndicatorStyles,
            fill: fill
              ? themeAwareStyles.container.backgroundColor
              : disabled
              ? 'gray'
              : color,
            width: size === 'small' ? 14 : size === 'large' ? 22 : 18,
            height: size === 'small' ? 14 : size === 'large' ? 22 : 18,
          })
        ) : null}
        <Text style={[buttonTextStyles]}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
};

export default Button;
