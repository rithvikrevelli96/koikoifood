import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { ArrowLeft, MapPin, Bike, Check, PhoneCall } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import { theme, F } from '../../design-system';
import { Text as RNText } from 'react-native';

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

export default function TrackingScreen() {
  const {
    back,
    t
  } = useAppContext();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }}>
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={back} style={[styles.backIconCircle, { backgroundColor: t.surface }]}>
          <ArrowLeft size={16} color={t.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: t.text }]}>Live Tracking</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Simulated Map Visual */}
        <View style={[styles.mapMock, { backgroundColor: t.surface }]}>
          <MapPin size={48} color={theme.colors.secondary} />
          <Text style={{ fontSize: 12, fontWeight: 'bold', color: t.text, marginTop: 8 }}>Villas 45, Green Glen Layout</Text>
          <Text style={{ fontSize: 10, color: t.muted }}>Arjun is 2.4 km away from your villa</Text>
        </View>

        {/* Delivery Agent Card */}
        <View style={[styles.agentCard, { backgroundColor: t.card, borderColor: t.border }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.agentAvatar}>
              <Text style={{ fontSize: 16 }}>🚴</Text>
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 14, fontWeight: '900', color: t.text }}>Arjun Dev</Text>
              <Text style={{ fontSize: 11, color: t.muted }}>Delivery Executive · 4.9 Rating</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.agentCallBtn}>
            <PhoneCall size={14} color="#FFFFFF" />
            <Text style={{ fontSize: 11, color: '#FFFFFF', fontWeight: 'bold', marginLeft: 6 }}>Call Arjun</Text>
          </TouchableOpacity>
        </View>

        {/* Delivery Steps logs */}
        <Text style={[styles.sectionSubTitle, { color: t.text, marginTop: 24, marginBottom: 12 }]}>Delivery Status Timeline</Text>
        <View style={styles.timelineBlock}>
          {[
            { t: 'Order Received', desc: '11:00 AM · Kitchen acknowledged slot', done: true },
            { t: 'Food Preparation Complete', desc: '11:20 AM · Chef packed in insulated steel box', done: true },
            { t: 'Dispatched from Hub', desc: '11:25 AM · Handed over to Arjun', done: true },
            { t: 'Arrived at Gate', desc: 'Awaiting arrival at security gate', active: true }
          ].map((step, i) => (
            <View key={i} style={styles.timelineRow}>
              <View style={styles.timelineIndicatorColumn}>
                <View style={[styles.timelineNodeLarge, { backgroundColor: step.done ? theme.colors.success : step.active ? theme.colors.secondary : t.surface }]}>
                  {step.done && <Check size={10} color="#FFFFFF" strokeWidth={3} />}
                </View>
                {i < 3 && <View style={[styles.timelineConnector, { backgroundColor: step.done ? theme.colors.success : t.border }]} />}
              </View>
              <View style={{ flex: 1, marginLeft: 12, paddingBottom: 24 }}>
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: step.done || step.active ? t.text : t.muted }}>{step.t}</Text>
                <Text style={{ fontSize: 11, color: t.muted, marginTop: 2 }}>{step.desc}</Text>
              </View>
            </View>
          ))}
        </View>
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
  mapMock: {
    height: 180,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  agentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 18,
    borderWidth: 1,
  },
  agentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FEF6EC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  agentCallBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.success,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  timelineBlock: {
    marginLeft: 10,
  },
  timelineRow: {
    flexDirection: 'row',
  },
  timelineIndicatorColumn: {
    alignItems: 'center',
  },
  timelineNodeLarge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineConnector: {
    width: 2,
    height: 40,
  },
  sectionSubTitle: {
    fontSize: 14,
    fontWeight: '900',
  },
});
