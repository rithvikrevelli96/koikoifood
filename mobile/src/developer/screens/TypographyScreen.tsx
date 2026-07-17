import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import { B, F, theme } from '../../design-system';

interface TypographyScreenProps {
  onBack: () => void;
}

export default function TypographyScreen({ onBack }: TypographyScreenProps) {
  const { t } = useAppContext();

  const fontFamilies = [
    { name: 'General Sans (Headings)', value: F.heading, desc: 'Used for Screen Titles, Card Headers, and Section Names. Weight: 600 - 700.' },
    { name: 'Inter (Body)', value: F.body, desc: 'Used for descriptions, buttons, labels, and helper text. Weight: 400 - 500.' },
    { name: 'IBM Plex Mono (Numbers)', value: F.mono, desc: 'Used ONLY for prices, calories, macronutrients, dates, counts, ratings, and timers. Weight: 400 - 600.' },
  ];

  const typographyScales = [
    { title: 'Heading XL', font: F.heading, size: 28, weight: '800', lh: 34, ls: -0.5 },
    { title: 'Heading L', font: F.heading, size: 22, weight: '700', lh: 28, ls: 0 },
    { title: 'Heading M', font: F.heading, size: 18, weight: '600', lh: 24, ls: 0.1 },
    { title: 'Body L', font: F.body, size: 16, weight: '500', lh: 22, ls: 0.2 },
    { title: 'Body M', font: F.body, size: 14, weight: '400', lh: 20, ls: 0.25 },
    { title: 'Body S', font: F.body, size: 12, weight: '400', lh: 16, ls: 0.3 },
  ];

  const monoSamples = [
    { label: 'Mock Price', text: '₹149' },
    { label: 'Calories Count', text: '560 kcal' },
    { label: 'Macronutrients', text: '34g Protein' },
    { label: 'Calendar Day', text: 'Day 12' },
    { label: 'Rating Stars', text: '4.9 ★' },
    { label: 'One-Time Passcode', text: 'OTP 458392' },
  ];

  const translations = [
    { key: 'Meal Title', en: 'Homemade Dal Tadka with Steamed Rice', te: 'స్టీమ్డ్ రైస్‌తో ఇంట్లో తయారుచేసిన పప్పు తాలింపు', hi: 'उबले हुए चावल के साथ घर का बना दाल तड़का' },
    { key: 'CTA Button', en: 'Proceed to Checkout & Pay', te: 'చెక్అవుట్ & చెల్లింపునకు కొనసాగండి', hi: 'चेकआउट और भुगतान के लिए आगे बढ़ें' },
    { key: 'Warning Message', en: 'Deliveries might be delayed due to heavy rain.', te: 'భారీ వర్షాల కారణంగా డెలివరీలు ఆలస్యం కావచ్చు.', hi: 'भारी बारिश के कारण डिलीवरी में देरी हो सकती है।' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }}>
      <View style={[styles.header, { borderBottomColor: t.border }]}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowLeft size={22} color={t.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: t.text, fontFamily: F.heading }]}>Typography & Localization</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Font Families */}
        <Text style={[styles.sectionTitle, { color: t.sub }]}>FONT FAMILIES</Text>
        <View style={{ gap: 12, marginBottom: 20 }}>
          {fontFamilies.map(font => (
            <View key={font.name} style={[styles.card, { backgroundColor: t.card, borderColor: t.border }]}>
              <Text style={{ fontSize: 13, fontWeight: '800', color: B.orange, letterSpacing: 0.5 }}>{font.name}</Text>
              <Text style={{ fontFamily: font.value, fontSize: 16, color: t.text, marginVertical: 8 }}>
                The quick brown fox jumps over the lazy dog.
              </Text>
              <Text style={{ fontSize: 11, color: t.sub, lineHeight: 15 }}>{font.desc}</Text>
            </View>
          ))}
        </View>

        {/* Typography Scale Presets */}
        <Text style={[styles.sectionTitle, { color: t.sub }]}>TYPOGRAPHY PRESET SCALES</Text>
        <View style={[styles.listContainer, { borderColor: t.border, backgroundColor: t.card }]}>
          {typographyScales.map((scale, idx) => (
            <View key={scale.title} style={[styles.listItem, idx > 0 && { borderTopWidth: 1, borderTopColor: t.border }]}>
              <View style={{ flex: 1, marginRight: 16 }}>
                <Text style={{ fontSize: 10, color: t.sub, fontWeight: '700', letterSpacing: 0.5, marginBottom: 4 }}>
                  {scale.title} (family: {scale.font.split(',')[0]} / {scale.size}px)
                </Text>
                <Text
                  style={{
                    fontFamily: scale.font,
                    fontSize: scale.size,
                    color: t.text,
                    lineHeight: scale.lh,
                    letterSpacing: scale.ls,
                  }}
                >
                  Koi Koi Premium Dabba
                </Text>
              </View>
              <View style={styles.metricsContainer}>
                <Text style={styles.metricText}>LH: {scale.lh}px</Text>
                <Text style={styles.metricText}>LS: {scale.ls}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Monospace Preview */}
        <Text style={[styles.sectionTitle, { color: t.sub, marginTop: 24 }]}>IBM PLEX MONO (METRICS & NUMBERS)</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
          {monoSamples.map(sample => (
            <View key={sample.label} style={[styles.monoBadge, { backgroundColor: t.card, borderColor: t.border, width: '48%' }]}>
              <Text style={{ fontSize: 10, color: t.sub, fontWeight: '700', marginBottom: 4 }}>{sample.label}</Text>
              <Text style={{ fontFamily: F.mono, fontSize: 15, fontWeight: '700', color: t.text }}>{sample.text}</Text>
            </View>
          ))}
        </View>

        {/* Localization & Translation Test */}
        <Text style={[styles.sectionTitle, { color: t.sub, marginTop: 12 }]}>LOCALIZATION OVERFLOW BENCH</Text>
        <View style={{ gap: 12 }}>
          {translations.map(item => (
            <View key={item.key} style={[styles.card, { backgroundColor: t.card, borderColor: t.border }]}>
              <Text style={{ fontSize: 10, color: B.orange, fontWeight: '800', letterSpacing: 0.5, marginBottom: 8 }}>{item.key.toUpperCase()}</Text>
              <Text style={{ fontFamily: F.body, fontSize: 13, color: t.text, fontWeight: '500' }}>
                🇺🇸 English: {item.en}
              </Text>
              <Text style={{ fontFamily: F.body, fontSize: 13, color: t.text, fontWeight: '500', marginTop: 6 }}>
                🇮🇳 Telugu: {item.te}
              </Text>
              <Text style={{ fontFamily: F.body, fontSize: 13, color: t.text, fontWeight: '500', marginTop: 6 }}>
                🇮🇳 Hindi: {item.hi}
              </Text>
            </View>
          ))}
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
    padding: 16,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.2,
    marginLeft: 12,
    marginBottom: 8,
  },
  listContainer: {
    borderWidth: 1.5,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  metricsContainer: {
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.03)',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  metricText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#8A857B',
  },
  monoBadge: {
    borderWidth: 1.5,
    borderRadius: 16,
    padding: 12,
  },
});
