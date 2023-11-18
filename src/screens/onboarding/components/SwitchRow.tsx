import React, {FC} from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';
import {useThemeStyles} from '../../../hooks/useTheme';

interface ISwitchRowProps {
  onChange: (value: boolean) => void;
  value: boolean;
  title: string;
  description?: string;
}

const SwitchRow: FC<ISwitchRowProps> = ({
  onChange,
  value,
  title,
  description,
}) => {
  const themeStyles = useThemeStyles();

  return (
    <View style={styles.row}>
      <View style={styles.textContainer}>
        <Text style={[styles.title, themeStyles.text]}>{title}</Text>
        {description && (
          <Text style={[styles.description, themeStyles.secondaryText]}>
            {description}
          </Text>
        )}
      </View>
      <Switch value={value} onValueChange={onChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    rowGap: 8,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    rowGap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
  },
});

export default SwitchRow;
