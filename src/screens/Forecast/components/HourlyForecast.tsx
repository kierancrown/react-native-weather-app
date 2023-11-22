import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {RootState} from '../../../redux/store';
import {useSelector} from 'react-redux';

import dayjs from 'dayjs';
import {roundNumber} from '../../../utils/math';

import {day, night} from '../../../constants/weatherAssets';

import LottieView from 'lottie-react-native';
import {BlurView} from '@react-native-community/blur';
import {Hour} from '../../../types/api';
import {FlashList} from '@shopify/flash-list';

interface IHourlyForecastProps {
  conditions: Hour[];
}

const CURRENT_HOUR = dayjs().hour();

const HourlyForecast = ({conditions}: IHourlyForecastProps) => {
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
        <Text style={styles.headerTitle}>Hourly Forecast</Text>
      </View>
      <View style={styles.listContainer}>
        <FlashList
          horizontal
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          nestedScrollEnabled
          estimatedItemSize={66}
          initialScrollIndex={CURRENT_HOUR}
          data={conditions}
          renderItem={({item}) => {
            return (
              <View style={styles.item}>
                <Text style={[styles.text, styles.time]}>
                  {dayjs(item.time).format('HH')}
                </Text>
                <LottieView
                  source={
                    item.is_day
                      ? day[item.condition.code].icon
                      : night[item.condition.code].icon
                  }
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
    </View>
  );
};

export default HourlyForecast;

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
