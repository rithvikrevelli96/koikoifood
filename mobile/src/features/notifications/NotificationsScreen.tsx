import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import { theme, F } from '../../design-system';
import { Text as RNText } from 'react-native';

const B = {
  orange: theme.colors.secondary,
  orangeL: 'rgba(201, 107, 60, 0.08)',
  green: theme.colors.success,
  greenL: 'rgba(75, 93, 58, 0.08)',
  cream: theme.colors.light.surface,
  creamL: theme.colors.light.bg,
};

function Text({ style, ...props }: any) {
  const flatStyle = StyleSheet.flatten(style || {});
  let fontFamily = F.body;
  const content = String(props.children || '');
  const isNumeric = /[₹\d]/.test(content) && (
    /^[₹\d\s★%\-.:\+a-zA-Z\s]+$/.test(content) ||
    content.includes('kcal') ||
    content.includes('protein') ||
    content.includes('Carbs') ||
    content.includes('₹') ||
    content.includes('min') ||
    content.includes('km')
  );

  if (flatStyle.fontFamily) {
    fontFamily = flatStyle.fontFamily;
  } else if (flatStyle.fontSize >= 15 && (flatStyle.fontWeight === '900' || flatStyle.fontWeight === '800' || flatStyle.fontWeight === 'bold')) {
    fontFamily = isNumeric ? F.mono : F.heading;
  } else if (isNumeric) {
    fontFamily = F.mono;
  }
  return <RNText style={[{ fontFamily }, style]} {...props} />;
}

export default function NotificationsScreen() {
  const {
    back,
    t
  } = useAppContext();

  const list = [
    { id: 1, title: 'Lunch Dispatched 🍱', msg: 'Your healthy Lunch box has left the Bellandur kitchen hub.', time: '10 min ago' },
    { id: 2, title: 'Subscribed Successfully! 🎉', msg: 'Welcome to Koi Koi. Your 30-day billing is now live.', time: 'Yesterday' }
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }}>
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={back} style={[styles.backIconCircle, { backgroundColor: t.surface }]}>
          <ArrowLeft size={16} color={t.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: t.text }]}>Notifications</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {list.map(n => (
          <View key={n.id} style={[styles.notiCard, { backgroundColor: t.card, borderColor: t.border }]}>
            <Text style={{ fontSize: 13, fontWeight: 'bold', color: t.text }}>{n.title}</Text>
            <Text style={{ fontSize: 11, color: t.sub, marginTop: 4 }}>{n.msg}</Text>
            <Text style={{ fontSize: 9, color: t.muted, marginTop: 6 }}>{n.time}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.06)',
  },
  backIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '900',
    marginLeft: 12,
  },
  notiCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    marginBottom: 10,
  },
});
