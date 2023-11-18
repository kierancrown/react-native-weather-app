import React, {FC, useState} from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import {useThemeStyles} from '../../hooks/useTheme';

import {useAutoComplete} from '../../hooks/useWeatherApi';
import {FlashList} from '@shopify/flash-list';
import SearchInput from './components/SearchInput';
import EmptyView from './components/EmptyView';

const AddLocationScreen: FC = () => {
  const themeStyles = useThemeStyles();

  const [query, setQuery] = useState<string>('');
  const results = useAutoComplete(query);

  const ListHeader = <SearchInput query={query} setQuery={setQuery} />;
  const listEmpty = <EmptyView />;

  return (
    <View style={styles.container}>
      <FlashList
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={listEmpty}
        data={results}
        estimatedItemSize={100}
        renderItem={({item}) => (
          <Pressable
            onPress={() => {
              console.log('pressed');
            }}>
            <Text style={themeStyles.text}>{item.name}</Text>
          </Pressable>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AddLocationScreen;
