import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useThemeStyles} from '../../../hooks/useTheme';
import {HapticFeedbackTypes} from '../../../utils/haptics';
import Button from '../../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../redux/store';
import {setTempUnit} from '../../../redux/slices/unitsSlice';

const TempRow: FC = () => {
  const themeStyles = useThemeStyles();
  const dispatch = useDispatch<AppDispatch>();
  const tempUnit = useSelector(
    (state: RootState) => state.persistent.units.tempUnit,
  );

  const changeTempMode = (mode: 'C' | 'F') => {
    dispatch(setTempUnit(mode));
  };

  const cycleTempMode = () => {
    switch (tempUnit) {
      case 'C':
        changeTempMode('F');
        break;
      default:
        changeTempMode('C');
        break;
    }
  };

  return (
    <View style={styles.row}>
      <View style={styles.textContainer}>
        <Text style={[styles.title, themeStyles.text]}>Temp Units</Text>
        <Text style={[styles.description, themeStyles.secondaryText]}>
          Change the unit of temperature
        </Text>
      </View>
      <View style={styles.spacer} />
      <Button
        title={tempUnit === 'C' ? 'Cº' : 'Fº'}
        fill
        color={themeStyles.text.color}
        buttonStyle={styles.button}
        rounded="full"
        animateOnPress="both"
        haptics={HapticFeedbackTypes.impactLight}
        onPress={cycleTempMode}
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

export default TempRow;
