import React from 'react';
import {
  StyleSheet,
  View,
  Modal as RNModal,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import { theme } from '../theme';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  containerStyle?: ViewStyle;
}

export function Modal({
  visible,
  onClose,
  children,
  containerStyle,
}: ModalProps) {
  return (
    <RNModal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.content,
                { backgroundColor: theme.colors.light.card },
                containerStyle,
              ]}
            >
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xxl,
  },
  content: {
    width: '100%',
    maxWidth: 340,
    borderRadius: theme.radius.dialog, // 28px radius
    padding: theme.spacing.xl,
    ...theme.shadows.dialog,
  },
});
