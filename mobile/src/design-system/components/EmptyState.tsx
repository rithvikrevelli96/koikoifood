import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Inbox } from 'lucide-react-native';
import { theme } from '../theme';
import { Text } from './Text';
import { Button } from './Button';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ComponentType<any>;
  actionLabel?: string;
  onActionPress?: () => void;
  style?: ViewStyle;
}

export function EmptyState({
  title,
  description,
  icon: Icon = Inbox,
  actionLabel,
  onActionPress,
  style,
}: EmptyStateProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconContainer}>
        <Icon size={40} color={theme.colors.light.sub} strokeWidth={1.5} />
      </View>
      <Text variant="title" color="text" style={styles.title}>{title}</Text>
      <Text variant="caption" color="sub" style={styles.description}>{description}</Text>
      {actionLabel && onActionPress && (
        <Button
          title={actionLabel}
          onPress={onActionPress}
          variant="secondary"
          style={styles.actionBtn}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xxl,
    textAlign: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.light.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.light.text,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  description: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 13,
    color: theme.colors.light.sub,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: theme.spacing.xxl,
  },
  actionBtn: {
    maxWidth: 200,
  },
});
