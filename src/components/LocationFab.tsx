import React, {FC} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import LocationIcon from '../assets/location-dot-outline.svg';
import {BlurView} from '@react-native-community/blur';

interface ILocationFabProps {
  currentLocation: string;
}

const LocationFab: FC<ILocationFabProps> = ({currentLocation}) => {
  return (
    <Pressable style={[styles.container]}>
      <BlurView
        style={StyleSheet.absoluteFillObject}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      />
      <LocationIcon width={18} height={18} fill={'#ffffff'} />
      <Text style={styles.text}>{currentLocation}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 999,
    borderWidth: 1.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    columnGap: 8,
    opacity: 0.8,
    overflow: 'hidden',
    borderColor: '#ffffff',
  },
  text: {
    fontFamily: 'RNS Sanz',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default LocationFab;
