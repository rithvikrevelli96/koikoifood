import React from 'react';
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ViewStyle,
  ScrollViewProps
} from 'react-native';

interface ScrollableLayoutProps extends ScrollViewProps {
  children: React.ReactNode;
  contentContainerStyle?: ViewStyle;
  keyboardAvoidingBehavior?: 'padding' | 'height' | 'position';
}

export const ScrollableLayout = React.forwardRef<ScrollView, ScrollableLayoutProps>(({
  children,
  contentContainerStyle,
  keyboardAvoidingBehavior,
  ...props
}, ref) => {
  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={keyboardAvoidingBehavior || (Platform.OS === 'ios' ? 'padding' : Platform.OS === 'android' ? 'height' : 'padding')}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <ScrollView
        ref={ref}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        automaticallyAdjustKeyboardInsets={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
        {...props}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
});

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
