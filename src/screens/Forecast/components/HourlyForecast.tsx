import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {RootState} from '../../../redux/store';
import {useSelector} from 'react-redux';

import dayjs from 'dayjs';
import {roundNumber} from '../../../utils/math';

// import conditionsMap from '../../../assets/weather-conditions.json';
import {day} from '../../../utils/weatherAssets';

import LottieView from 'lottie-react-native';

interface IHourlyForecastProps {
  conditions: Hour[];
}

const HourlyForecast = ({conditions}: IHourlyForecastProps) => {
  const unitsPreferences = useSelector(
    (state: RootState) => state.persistent.units,
  );

  return (
    <View style={styles.container}>
      <FlashList
        horizontal
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={100}
        data={conditions}
        renderItem={({item}) => {
          return (
            <View style={styles.item}>
              <Text style={[styles.text, styles.time]}>
                {dayjs(item.time).format('HH')}
              </Text>
              <LottieView
                // @ts-ignore
                source={day[item.condition.code]}
                autoPlay
                loop
                style={styles.icon}
              />
              <Text style={[styles.text, styles.temp]}>
                {roundNumber(
                  (unitsPreferences.tempUnit === 'C'
                    ? item.temp_c
                    : item.temp_f) ?? 0,
                )}
                °
              </Text>
            </View>
          );
        }}
        keyExtractor={item => item.time}
      />
    </View>
  );
};

export default HourlyForecast;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 8,
  },
  item: {
    padding: 16,
    width: 100,
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
});
