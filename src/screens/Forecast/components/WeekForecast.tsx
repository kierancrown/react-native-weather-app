import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {RootState} from '../../../redux/store';
import {useSelector} from 'react-redux';

import dayjs from 'dayjs';
import {roundNumber} from '../../../utils/math';

import rnTextSize from 'react-native-text-size';

import {day} from '../../../utils/weatherAssets';

import LottieView from 'lottie-react-native';
import {BlurView} from '@react-native-community/blur';
import {Forecastday} from '../../../types/api';

interface IWeekForecastProps {
  days: Forecastday[];
}

const SCREEN_WIDTH = Dimensions.get('screen').width;

const WeekForecast = ({days}: IWeekForecastProps) => {
  const unitsPreferences = useSelector(
    (state: RootState) => state.persistent.units,
  );

  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    (async () => {
      const size = await rnTextSize.measure({
        text: 'Today',
        width: SCREEN_WIDTH,
        fontFamily: 'RNS Sanz',
        fontWeight: 'bold',
        fontSize: 16,
      });

      setTextWidth(size.width);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <BlurView
        style={StyleSheet.absoluteFillObject}
        blurType="regular"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{days.length} Day Forecast</Text>
      </View>
      <View style={styles.listContainer}>
        {days.map((forecast, i) => {
          return (
            <View style={styles.item} key={forecast.date_epoch}>
              <Text style={[styles.text, styles.date, {width: textWidth}]}>
                {i === 0 ? 'Today' : dayjs(forecast.date).format('ddd')}
              </Text>
              <LottieView
                source={day[forecast.day.condition.code].icon}
                autoPlay
                loop
                style={styles.icon}
              />
              <Text style={styles.condition}>
                {forecast.day.condition.text}
              </Text>
              <Text style={[styles.text, styles.temp]}>
                {roundNumber(
                  unitsPreferences.tempUnit === 'C'
                    ? forecast.day.avgtemp_c
                    : forecast.day.avgtemp_f,
                )}
                °
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default WeekForecast;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  listContainer: {
    gap: 16,
    paddingVertical: 8,
  },
  item: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    width: 32,
    height: 32,
  },
  text: {
    color: '#ffffff',
  },
  condition: {
    fontFamily: 'RNS Sanz',
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'left',
  },
  date: {
    fontFamily: 'RNS Sanz',
    fontWeight: 'bold',
    fontSize: 16,
  },
  temp: {
    fontFamily: 'RNS Sanz',
    fontWeight: '800',
    fontSize: 16,
    marginLeft: 'auto',
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
  spacer: {
    flex: 1,
  },
});
