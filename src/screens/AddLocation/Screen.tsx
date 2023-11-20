import React, {FC, useState} from 'react';
import {View, StyleSheet} from 'react-native';

import {useAutoComplete} from '../../hooks/useAutoComplete';
import {FlashList} from '@shopify/flash-list';
import SearchInput from './components/SearchInput';
import EmptyView from './components/EmptyView';
import LocationListItem from './components/LocationListItem';

const AddLocationScreen: FC = () => {
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
          <LocationListItem item={item} onPress={() => {}} />
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
