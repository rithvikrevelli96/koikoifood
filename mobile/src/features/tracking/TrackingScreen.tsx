import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { ArrowLeft, MapPin, Bike, Check, PhoneCall } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import {
  theme,
  Text,
  Button,
  PageLayout,
  Card
} from '../../design-system';

export default function TrackingScreen() {
  const {
    back,
    t,
    setToast
  } = useAppContext();

  const handleCallArjun = () => {
    const phoneUrl = 'tel:+919876543210';
    Linking.openURL(phoneUrl).catch(() => {
      setToast('📞 Calling Arjun (+91 98765 43210)...');
    });
    setToast('📞 Dialing delivery partner Arjun...');
  };

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
        <Text variant="title" color="primary" style={{ marginLeft: 16 }}>LIVE TRACKING</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 20, paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
        
        {/* Simulated Map Visual */}
        <View style={[styles.mapMock, { backgroundColor: theme.colors.light.surface, borderColor: theme.colors.light.border }]}>
          <MapPin size={48} color={theme.colors.secondary} />
          <Text variant="body" color="text" style={{ fontWeight: 'bold', marginTop: 8 }}>Villas 45, Green Glen Layout</Text>
          <Text variant="caption" color="sub" style={{ marginTop: 2 }}>
            Arjun is <Text variant="mono" color="secondary" style={{ fontSize: 13, fontWeight: '700' }}>2.4 km</Text> away from your villa
          </Text>
        </View>

        {/* Delivery Agent Card */}
        <Card style={{ padding: 16, marginTop: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.agentAvatar}>
                <Text variant="body" style={{ fontSize: 16 }}>🚴</Text>
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text variant="body" color="text" style={{ fontWeight: '900' }}>Arjun Dev</Text>
                <Text variant="caption" color="sub" style={{ marginTop: 2 }}>
                  Delivery Executive · <Text variant="mono" color="accent" style={{ fontWeight: '700' }}>4.9</Text> ★
                </Text>
              </View>
            </View>

            <Button
              title="Call Arjun"
              variant="primary"
              size="small"
              fullWidth={false}
              style={{ paddingHorizontal: 12, height: 32 }}
              iconLeft={<PhoneCall size={12} color="#FFFFFF" />}
              onPress={handleCallArjun}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Call Arjun"
              accessibilityHint="Places a phone call to delivery partner Arjun Dev"
            />
          </View>
        </Card>

        {/* Delivery Steps logs */}
        <Text variant="label" color="text" style={{ fontWeight: '900', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 28, marginBottom: 16 }}>Delivery Status Timeline</Text>
        
        <View style={styles.timelineBlock}>
          {[
            { t: 'Order Received', desc: '11:00 AM · Kitchen acknowledged slot', done: true },
            { t: 'Food Preparation Complete', desc: '11:20 AM · Chef packed in insulated steel box', done: true },
            { t: 'Dispatched from Hub', desc: '11:25 AM · Handed over to Arjun', done: true },
            { t: 'Arrived at Gate', desc: 'Awaiting arrival at security gate', active: true }
          ].map((step, i) => (
            <View key={i} style={styles.timelineRow}>
              <View style={styles.timelineIndicatorColumn}>
                <View style={[styles.timelineNodeLarge, { backgroundColor: step.done ? theme.colors.success : step.active ? theme.colors.secondary : theme.colors.light.border }]}>
                  {step.done && <Check size={10} color="#FFFFFF" strokeWidth={3} />}
                </View>
                {i < 3 && <View style={[styles.timelineConnector, { backgroundColor: step.done ? theme.colors.success : theme.colors.light.border }]} />}
              </View>
              <View style={{ flex: 1, marginLeft: 12, paddingBottom: 24 }}>
                <Text variant="body" color={step.done || step.active ? 'text' : 'muted'} style={{ fontWeight: 'bold' }}>{step.t}</Text>
                <Text variant="caption" color="sub" style={{ marginTop: 2 }}>{step.desc}</Text>
              </View>
            </View>
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
  mapMock: {
    height: 220,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
  },
  agentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(201, 107, 60, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineBlock: {
    paddingLeft: 4,
  },
  timelineRow: {
    flexDirection: 'row',
  },
  timelineIndicatorColumn: {
    alignItems: 'center',
    width: 24,
  },
  timelineNodeLarge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  timelineConnector: {
    width: 2,
    flex: 1,
    marginVertical: -2,
    zIndex: 0,
  },
});
