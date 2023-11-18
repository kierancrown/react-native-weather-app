import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LocationDotIcon from '../../../assets/location-dot.svg';
import {useThemeStyles} from '../../../hooks/useTheme';

const EmptyView = () => {
  const themeStyles = useThemeStyles();

  return (
    <View style={styles.container}>
      <LocationDotIcon
        width={100}
        height={100}
        fill={themeStyles.secondaryText.color}
      />
      <Text style={[styles.text, themeStyles.secondaryText]}>
        Nothing to see here
      </Text>

      <Text style={[styles.smallText, themeStyles.secondaryText]}>
        Try searching for a city, or add your current location
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 12,
  },
  text: {
    marginTop: 12,
    fontFamily: 'RNS Sanz',
    fontSize: 20,
    fontWeight: 'bold',
  },
  smallText: {
    fontFamily: 'RNS Sanz',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    width: '80%',
    marginTop: 8,
  },
});

export default EmptyView;
