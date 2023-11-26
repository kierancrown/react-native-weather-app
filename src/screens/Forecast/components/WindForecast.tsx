import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {RootState} from '../../../redux/store';
import {useSelector} from 'react-redux';

import {roundNumber} from '../../../utils/math';

import {BlurView} from '@react-native-community/blur';
import {Current} from '../../../types/api';

import WindIcon from '../../../assets/wind.svg';

interface IWindForecastProps {
  conditions: Current;
}

const WindForecast = ({conditions}: IWindForecastProps) => {
  const unitsPreferences = useSelector(
    (state: RootState) => state.persistent.units,
  );

  return (
    <View style={styles.container}>
      <BlurView
        style={StyleSheet.absoluteFillObject}
        blurType="regular"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      />
      <View style={styles.header}>
        <WindIcon width={14} height={14} fill="#ffffff" opacity={0.8} />
        <Text style={styles.headerTitle}>Wind</Text>
      </View>
      <View style={styles.listContainer}>
        <Text>
          {unitsPreferences.speedUnit === 'mph'
            ? `${roundNumber(conditions.wind_mph)} mph`
            : `${roundNumber(conditions.wind_kph)} kph`}
        </Text>

        <Text>
          {unitsPreferences.speedUnit === 'mph'
            ? `${roundNumber(conditions.gust_mph)} mph`
            : `${roundNumber(conditions.gust_kph)} kph`}
        </Text>
      </View>
    </View>
  );
};

export default WindForecast;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  listContainer: {
    height: 100,
    minHeight: 2,
    minWidth: 2,
  },
  item: {
    padding: 16,
    width: 66,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 32,
    height: 32,
  },
  text: {
    color: '#ffffff',
  },
  time: {
    fontFamily: 'RNS Sanz',
    fontWeight: 'bold',
    fontSize: 14,
  },
  temp: {
    fontFamily: 'RNS Sanz',
    fontWeight: 'bold',
    fontSize: 18,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontFamily: 'RNS Sanz',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
