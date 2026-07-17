import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ViewStyle
} from 'react-native';
import { ChevronDown, Check } from 'lucide-react-native';
import { theme } from '../theme';
import { Modal } from './Modal';

interface DropdownProps {
  label: string;
  selectedValue: string;
  options: string[];
  onValueChange: (val: string) => void;
  containerStyle?: ViewStyle;
}

export function Dropdown({
  label,
  selectedValue,
  options,
  onValueChange,
  containerStyle,
}: DropdownProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (item: string) => {
    onValueChange(item);
    setModalVisible(false);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setModalVisible(true)}
        style={styles.trigger}
        accessible={true}
        accessibilityRole="combobox"
        accessibilityLabel={`${label}: ${selectedValue}`}
      >
        <Text style={styles.triggerText}>{selectedValue}</Text>
        <ChevronDown size={18} color={theme.colors.light.sub} />
      </TouchableOpacity>

      <Modal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <Text style={styles.modalTitle}>Select {label}</Text>
        <FlatList
          data={options}
          keyExtractor={item => item}
          renderItem={({ item }) => {
            const isSelected = item === selectedValue;
            return (
              <TouchableOpacity
                onPress={() => handleSelect(item)}
                style={[
                  styles.optionItem,
                  isSelected && { backgroundColor: theme.colors.light.surface },
                ]}
              >
                <Text
                  style={[
                    styles.optionText,
                    isSelected && { color: theme.colors.primary, fontWeight: '700' },
                  ]}
                >
                  {item}
                </Text>
                {isSelected && (
                  <Check size={16} color={theme.colors.primary} strokeWidth={3} />
                )}
              </TouchableOpacity>
            );
          }}
          style={styles.list}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.lg,
    width: '100%',
  },
  label: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.light.text,
    marginBottom: theme.spacing.sm,
  },
  trigger: {
    height: 56,
    borderRadius: theme.radius.control,
    backgroundColor: theme.colors.light.input,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  triggerText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 15,
    color: theme.colors.light.text,
  },
  modalTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.light.text,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  list: {
    maxHeight: 250,
  },
  optionItem: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    borderRadius: 8,
    marginVertical: 2,
  },
  optionText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 14,
    color: theme.colors.light.text,
  },
});
