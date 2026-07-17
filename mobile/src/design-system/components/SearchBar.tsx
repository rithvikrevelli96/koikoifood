import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { Search, X } from 'lucide-react-native';
import { theme } from '../theme';

interface SearchBarProps {
  value: string;
  onChangeText: (val: string) => void;
  placeholder?: string;
  onClear?: () => void;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search dishes, kitchens...',
  onClear,
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Search size={18} color={theme.colors.light.sub} style={styles.icon} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.light.sub}
        style={styles.input}
        accessible={true}
        accessibilityLabel="Search input"
      />
      {!!value && (
        <TouchableOpacity
          onPress={onClear || (() => onChangeText(''))}
          style={styles.clearBtn}
          accessibilityLabel="Clear search text"
        >
          <X size={16} color={theme.colors.light.sub} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    borderRadius: 14,
    backgroundColor: theme.colors.light.input,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    marginVertical: theme.spacing.md,
  },
  icon: {
    marginRight: theme.spacing.sm,
  },
  input: {
    flex: 1,
    height: '100%',
    fontFamily: theme.typography.bodyFamily,
    fontSize: 14,
    color: theme.colors.light.text,
  },
  clearBtn: {
    padding: 4,
  },
});
