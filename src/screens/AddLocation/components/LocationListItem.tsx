import React, {FC} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {useThemeStyles} from '../../../hooks/useTheme';

import LocationDotIcon from '../../../assets/location-dot.svg';
import {AutoCompleteResult} from '../../../types/api';

interface ILocationListItemProps {
  item: AutoCompleteResult;
  onPress: (id: number) => void;
}

const LocationListItem: FC<ILocationListItemProps> = ({item, onPress}) => {
  const themeStyles = useThemeStyles();

  const handlePress = () => {
    onPress(item.id);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.container, themeStyles.navigationHeaderDivider]}>
      <LocationDotIcon
        width={20}
        height={20}
        fill={themeStyles.secondaryText.color}
      />
      <Text style={[styles.text, themeStyles.text]}>{item.name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 12,
    padding: 14,
  },
  text: {
    fontFamily: 'RNS Sanz',
    fontSize: 18,
    fontWeight: '600',
    padding: 0,
  },
});

export default LocationListItem;
