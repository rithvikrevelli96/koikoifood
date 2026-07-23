import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { ArrowLeft, Bell } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import {
  theme,
  Text,
  Button,
  PageLayout,
  Card
} from '../../design-system';

export default function NotificationsScreen() {
  const {
    back,
    t,
    isDark,
  } = useAppContext();

  const list = [
    { id: 1, title: 'Lunch Dispatched 🍱', msg: 'Your healthy Lunch box has left the Gundlapochampally kitchen hub.', time: '10 min ago' },
    { id: 2, title: 'Subscribed Successfully! 🎉', msg: 'Welcome to Koi Koi. Your 30-day billing is now live.', time: 'Yesterday' }
  ];

  return (
    <PageLayout style={{ paddingHorizontal: 0 }}>
      {/* Top Header Bar */}
      <View style={[styles.headerBar, { borderBottomColor: t.border, backgroundColor: t.card }]}>
        <Button
          onlyIcon
          variant="ghost"
          size="medium"
          onPress={back}
          iconLeft={<ArrowLeft size={16} color={t.text} />}
          style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: t.surface }}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        />
        <Text variant="title" color="primary" style={{ marginLeft: 16 }}>NOTIFICATIONS</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 20, paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
        {list.length === 0 ? (
          <View style={styles.emptyState}>
            <Bell size={40} color={t.muted} />
            <Text variant="body" color="sub" style={{ fontWeight: '700', marginTop: 16, textAlign: 'center' }}>You're all caught up!</Text>
            <Text variant="caption" color="muted" style={{ marginTop: 6, textAlign: 'center' }}>No new notifications right now.</Text>
          </View>
        ) : (
          <View style={{ gap: 12 }}>
            {list.map(n => (
              <Card key={n.id} style={{ padding: 16 }}>
                <Text variant="title" color="text" style={{ fontSize: 16 }}>{n.title}</Text>
                <Text variant="caption" color="sub" style={{ marginTop: 4, lineHeight: 16 }}>{n.msg}</Text>
                <Text variant="mono" color="muted" style={{ marginTop: 8, fontSize: 11 }}>{n.time}</Text>
              </Card>
            ))}
          </View>
        )}
      </ScrollView>
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
});
