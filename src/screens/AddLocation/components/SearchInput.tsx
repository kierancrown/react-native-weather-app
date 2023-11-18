import React, {FC} from 'react';
import {Pressable, StyleSheet, TextInput} from 'react-native';

import SearchIcon from '../../../assets/search.svg';
import {useThemeStyles} from '../../../hooks/useTheme';

interface ISearchInputProps {
  query: string;
  setQuery: (query: string) => void;
}

const SearchInput: FC<ISearchInputProps> = ({query, setQuery}) => {
  const searchInputRef = React.useRef<TextInput>(null);
  const themeStyles = useThemeStyles();

  const focusSearchInput = () => {
    searchInputRef.current?.focus();
  };

  return (
    <Pressable
      onPress={focusSearchInput}
      style={[
        styles.inputWrapper,
        themeStyles.input,
        themeStyles.navigationHeaderDivider,
      ]}>
      <SearchIcon
        fill={themeStyles.placeholderText.color}
        width={20}
        height={20}
      />
      <TextInput
        autoFocus
        placeholder="Search..."
        ref={searchInputRef}
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        placeholderTextColor={themeStyles.placeholderText.color}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 12,
    padding: 14,
  },
  input: {
    fontFamily: 'RNS Sanz',
    fontSize: 18,
    fontWeight: '600',
    padding: 0,
  },
});

export default SearchInput;
