import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useThemeStyles} from '../../../hooks/useTheme';
import {HapticFeedbackTypes} from '../../../utils/haptics';
import Button from '../../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../redux/store';
import {setSpeedUnit} from '../../../redux/slices/unitsSlice';

const SpeedRow: FC = () => {
  const themeStyles = useThemeStyles();
  const dispatch = useDispatch<AppDispatch>();
  const speedUnit = useSelector(
    (state: RootState) => state.persistent.units.speedUnit,
  );

  const changeSpeedMode = (mode: 'km/h' | 'mph') => {
    dispatch(setSpeedUnit(mode));
  };

  const cycleSpeedMode = () => {
    switch (speedUnit) {
      case 'km/h':
        changeSpeedMode('mph');
        break;
      default:
        changeSpeedMode('km/h');
        break;
    }
  };

  return (
    <View style={styles.row}>
      <View style={styles.textContainer}>
        <Text style={[styles.title, themeStyles.text]}>Speed Units</Text>
        <Text style={[styles.description, themeStyles.secondaryText]}>
          Change the unit of wind speeds etc
        </Text>
      </View>
      <View style={styles.spacer} />
      <Button
        title={speedUnit}
        fill
        color={themeStyles.text.color}
        buttonStyle={styles.button}
        rounded="full"
        animateOnPress="both"
        haptics={HapticFeedbackTypes.impactLight}
        onPress={cycleSpeedMode}
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
  button: {
    marginLeft: 'auto',
  },
  spacer: {
    flex: 1,
  },
});

export default SpeedRow;
