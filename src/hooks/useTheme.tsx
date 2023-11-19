import {useContext} from 'react';
import {useColorScheme, StyleSheet} from 'react-native';
import {ThemeProvider, ACTIONS, IThemeProps} from '../components/ThemeProvider';
import colors from '../constants/colors';

const useTheme = () => {
  const {dispatch, theme} = useContext(ThemeProvider);

  const updateTheme = (newTheme: Partial<IThemeProps>) => {
    dispatch({
      type: ACTIONS.CHANGE_THEME,
      value: newTheme,
    });
  };
  return [theme, updateTheme] as const;
};

const useThemeStyles = () => {
  const [theme] = useTheme();
  const systemColorScheme = useColorScheme();
  const colorScheme = theme.mode === 'system' ? systemColorScheme : theme.mode;
  const themeStyles = StyleSheet.create({
    primaryText: {
      color: colors.primary,
    },
    openSheet: {
      backgroundColor: colorScheme === 'dark' ? '#000000' : '#ffffff',
    },
    container: {
      flex: 1,
      backgroundColor:
        colorScheme === 'dark'
          ? colors.background.dark
          : colors.background.light,
    },
    secondaryContainer: {
      backgroundColor:
        colorScheme === 'dark'
          ? colors.secondaryBackground.dark
          : colors.secondaryBackground.light,
    },
    text: {
      color: colorScheme === 'dark' ? colors.text.dark : colors.text.light,
    },
    secondaryText: {
      color:
        colorScheme === 'dark'
          ? colors.secondaryText.dark
          : colors.secondaryText.light,
    },
    input: {
      backgroundColor:
        colorScheme === 'dark'
          ? colors.textInputBackground.dark
          : colors.textInputBackground.light,
      color: colorScheme === 'dark' ? colors.text.light : colors.text.dark,
    },
    navigationHeaderDivider: {
      borderBottomColor:
        colorScheme === 'dark' ? colors.divider.dark : colors.divider.light,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    placeholderText: {
      color:
        colorScheme === 'dark'
          ? colors.placeholder.dark
          : colors.placeholder.light,
    },
  });

  return themeStyles;
};

export {useThemeStyles, useTheme};
