import React, {FC} from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';
import {useThemeStyles, useTheme} from '../hooks/useTheme';

const ExampleScreen: FC = () => {
  const style = useThemeStyles();
  const [theme, updateTheme] = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.text, style.text]}>Hello World</Text>
      <Switch
        value={theme.mode === 'dark'}
        onChange={() =>
          updateTheme({
            mode: theme.mode === 'dark' ? 'light' : 'dark',
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ExampleScreen;
