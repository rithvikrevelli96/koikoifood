import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, useWindowDimensions, Platform } from 'react-native';
import { ArrowLeft, Cpu, Smartphone, Info } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import { B, F, theme, Card } from '../../design-system';

interface DeviceInfoScreenProps {
  onBack: () => void;
}

export default function DeviceInfoScreen({ onBack }: DeviceInfoScreenProps) {
  const { t } = useAppContext();
  const { width, height, scale, fontScale } = useWindowDimensions();

  const deviceParams = [
    { label: 'Device Model', val: Platform.OS === 'web' ? 'Web Browser' : 'Pixel 8 (Simulator)' },
    { label: 'Operating System', val: Platform.OS === 'web' ? 'Web Sandbox' : `${Platform.OS === 'android' ? 'Android 15' : 'iOS 17'}` },
    { label: 'Screen Resolution', val: `${Math.round(width)} × ${Math.round(height)} px` },
    { label: 'Pixel Scale / Density', val: `${scale}x (${Math.round(scale * 160)} dpi)` },
    { label: 'Timezone ID', val: Intl?.DateTimeFormat()?.resolvedOptions()?.timeZone || 'Asia/Kolkata' },
    { label: 'Language Locale', val: 'en-IN' },
  ];

  const buildParams = [
    { label: 'App Semantic Version', val: '1.0.0' },
    { label: 'Build Number', val: '104' },
    { label: 'Commit SHA', val: 'a93d21f (Stable v1.0.0 Release)' },
    { label: 'Active Build Env', val: 'Development' },
    { label: 'API Base url', val: 'https://staging.koikoi.in' },
    { label: 'React Native Engine', val: 'v0.81.5' },
    { label: 'Expo SDK Package', val: 'v54.0.0' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }}>
      <View style={[styles.header, { borderBottomColor: t.border }]}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowLeft size={22} color={t.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: t.text, fontFamily: F.heading }]}>Device & Build Info</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Device Info */}
        <Text style={[styles.sectionTitle, { color: t.sub }]}>DEVICE DIAGNOSTICS</Text>
        <View style={[styles.card, { backgroundColor: t.card, borderColor: t.border, padding: 16, marginBottom: 20 }]}>
          <View style={{ gap: 12 }}>
            {deviceParams.map(item => (
              <View key={item.label} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 13, color: t.sub, fontWeight: '700' }}>{item.label}</Text>
                <Text style={{ fontSize: 13, color: t.text, fontWeight: '800' }}>{item.val}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Build Info */}
        <Text style={[styles.sectionTitle, { color: t.sub }]}>BUILD SPECIFICATIONS</Text>
        <View style={[styles.card, { backgroundColor: t.card, borderColor: t.border, padding: 16 }]}>
          <View style={{ gap: 12 }}>
            {buildParams.map(item => (
              <View key={item.label} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 13, color: t.sub, fontWeight: '700' }}>{item.label}</Text>
                <Text style={{ fontSize: 12, fontFamily: F.mono, color: t.text, fontWeight: '700' }}>{item.val}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    borderWidth: 1.5,
    borderRadius: 20,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.2,
    marginLeft: 12,
    marginBottom: 8,
  },
});
