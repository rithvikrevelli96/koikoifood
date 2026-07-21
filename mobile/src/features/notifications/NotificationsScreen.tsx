import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
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
  } = useAppContext();

  const list = [
    { id: 1, title: 'Lunch Dispatched 🍱', msg: 'Your healthy Lunch box has left the Gundlapochampally kitchen hub.', time: '10 min ago' },
    { id: 2, title: 'Subscribed Successfully! 🎉', msg: 'Welcome to Koi Koi. Your 30-day billing is now live.', time: 'Yesterday' }
  ];

  return (
    <PageLayout style={{ paddingHorizontal: 0 }}>
      {/* Top Header Bar */}
      <View style={styles.headerBar}>
        <Button
          onlyIcon
          variant="ghost"
          size="medium"
          onPress={back}
          iconLeft={<ArrowLeft size={16} color={theme.colors.light.text} />}
          style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: theme.colors.light.surface }}
        />
        <Text variant="title" color="primary" style={{ marginLeft: 16 }}>NOTIFICATIONS</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 20, paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
        <View style={{ gap: 12 }}>
          {list.map(n => (
            <Card key={n.id} style={{ padding: 16 }}>
              <Text variant="title" color="text" style={{ fontSize: 16 }}>{n.title}</Text>
              <Text variant="caption" color="sub" style={{ marginTop: 4, lineHeight: 16 }}>{n.msg}</Text>
              <Text variant="mono" color="muted" style={{ marginTop: 8, fontSize: 11 }}>{n.time}</Text>
            </Card>
          ))}
        </View>
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
    borderBottomColor: '#E8E2D8',
  },
});
