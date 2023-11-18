import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme, useThemeStyles} from '../../../hooks/useTheme';
import {HapticFeedbackTypes} from '../../../utils/haptics';
import Button from '../../../components/Button';

const ThemeRow: FC = () => {
  const [theme, setTheme] = useTheme();
  const themeStyles = useThemeStyles();

  const changeThemeMode = (mode: 'light' | 'dark' | 'system') => {
    setTheme({
      mode,
    });
  };

  const cycleThemeMode = () => {
    switch (theme.mode) {
      case 'light':
        changeThemeMode('system');
        break;
      case 'dark':
        changeThemeMode('light');
        break;
      case 'system':
        changeThemeMode('dark');
        break;
    }
  };

  return (
    <View style={styles.row}>
      <View style={styles.textContainer}>
        <Text style={[styles.title, themeStyles.text]}>App Theme</Text>
        <Text style={[styles.description, themeStyles.secondaryText]}>
          Change the theme of the app
        </Text>
      </View>
      <View style={styles.spacer} />
      <Button
        title={
          theme.mode === 'light'
            ? 'Light'
            : theme.mode === 'dark'
            ? 'Dark'
            : 'System'
        }
        fill
        rounded="full"
        color={themeStyles.text.color}
        animateOnPress="both"
        haptics={HapticFeedbackTypes.impactLight}
        onPress={cycleThemeMode}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    rowGap: 8,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingRight: 16,
    rowGap: 4,
  },
  title: {
    fontFamily: 'RNS Sanz',
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontFamily: 'RNS Sanz',
    fontSize: 16,
  },
  spacer: {
    flex: 1,
  },
});

export default ThemeRow;
