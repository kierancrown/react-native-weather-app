import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useThemeStyles} from '../hooks/useTheme';

const ExampleScreen: FC = () => {
  const style = useThemeStyles();

  return (
    <View style={styles.container}>
      <Text style={[styles.text, style.text]}>Hello World</Text>
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
