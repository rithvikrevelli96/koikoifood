import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { BottomSheet } from '../BottomSheet';
import { Text } from '../Text';
import { COUNTRIES, Country } from '../../constants/countries';
import { theme } from '../../theme';

interface CountryPickerBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (country: Country) => void;
}

export const CountryPickerBottomSheet = React.memo(({
  visible,
  onClose,
  onSelect,
}: CountryPickerBottomSheetProps) => {
  return (
    <BottomSheet visible={visible} onClose={onClose} height={380}>
      <View style={styles.container}>
        <Text variant="title" color="primary" style={styles.title}>
          Select Country
        </Text>
        <View style={styles.list}>
          {COUNTRIES.map((item) => (
            <TouchableOpacity
              key={item.code}
              style={styles.item}
              accessibilityRole="button"
              accessibilityLabel={`${item.name} dial code ${item.dialCode}`}
              onPress={() => {
                onSelect(item);
                onClose();
              }}
            >
              <Text style={styles.flag}>
                {item.flag}
              </Text>
              <Text variant="body" color="text" style={styles.name}>
                {item.name}
              </Text>
              <Text variant="body" color="secondary" style={styles.dialCode}>
                {item.dialCode}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.sm,
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  list: {
    gap: theme.spacing.xs,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.sm,
    backgroundColor: 'rgba(75, 93, 58, 0.04)',
    marginBottom: theme.spacing.xs,
  },
  flag: {
    fontSize: 22,
    marginRight: theme.spacing.md,
  },
  name: {
    flex: 1,
    fontWeight: '600',
  },
  dialCode: {
    fontWeight: '700',
  },
});
