import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, useWindowDimensions } from 'react-native';
import { ArrowLeft, Check, ShieldAlert } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import { B, F, theme, Button, Checkbox, Card } from '../../design-system';

interface AccessibilityScreenProps {
  onBack: () => void;
}

export default function AccessibilityScreen({ onBack }: AccessibilityScreenProps) {
  const { setToast, t } = useAppContext();
  const [dynamicSize, setDynamicSize] = useState(14);
  const [highContrast, setHighContrast] = useState(false);

  const a11yPrinciples = [
    { title: 'Minimum Touch Targets', desc: 'Interactive elements must maintain a minimum bounding box of 48 x 48dp to ensure easy tapping on mobile viewports.', checked: true },
    { title: 'Screen Reader Descriptions', desc: 'Apply accessibilityLabel, accessibilityRole, and accessibilityState variables to let screen reader users navigate layouts.', checked: true },
    { title: 'Semantic Contrast Ratio', desc: 'Enforce contrast ratios between text and backgrounds (minimum 4.5:1 for normal body text, 3:1 for headings).', checked: true },
    { title: 'Dynamic Font Sizes Support', desc: 'Allow user-selected OS font settings to scale text views dynamically without clipping layout constraints.', checked: true },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }}>
      <View style={[styles.header, { borderBottomColor: t.border }]}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowLeft size={22} color={t.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: t.text, fontFamily: F.heading }]}>Accessibility QA Bench</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* a11y Principles Checklist */}
        <Text style={[styles.sectionTitle, { color: t.sub }]}>ACCESSIBILITY STANDARDS</Text>
        <View style={{ gap: 12, marginBottom: 20 }}>
          {a11yPrinciples.map(item => (
            <Card key={item.title} style={{ padding: 14, flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
              <View style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: '#E1F5FE', justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
                <Check size={14} color="#0288D1" strokeWidth={3} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: F.heading, fontSize: 13, fontWeight: '700', color: t.text }}>{item.title}</Text>
                <Text style={{ fontFamily: F.body, fontSize: 11, color: t.sub, marginTop: 4, lineHeight: 16 }}>{item.desc}</Text>
              </View>
            </Card>
          ))}
        </View>

        {/* Bounding Box Visualizer */}
        <Text style={[styles.sectionTitle, { color: t.sub }]}>TOUCH TARGET VISUALIZER (48 x 48dp GRID)</Text>
        <View style={[styles.card, { backgroundColor: t.card, borderColor: t.border, padding: 16 }]}>
          <Text style={{ fontSize: 11, color: t.sub, lineHeight: 16, marginBottom: 16 }}>
            Tap the button to overlay the touch target grid bounding box. This highlights tap target overlap spacing!
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 16 }}>
            {/* Visual touch grids */}
            <View style={{ position: 'relative' }}>
              <TouchableOpacity
                onPress={() => setToast('Valid tap!')}
                style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: B.orange, justifyContent: 'center', alignItems: 'center' }}
                accessible={true}
                accessibilityLabel="Compact action button target"
              >
                <Check size={18} color="#FFFFFF" strokeWidth={3} />
              </TouchableOpacity>
              <View style={styles.gridOverlay} pointerEvents="none" />
              <Text style={{ fontSize: 9, color: t.sub, fontWeight: '700', alignSelf: 'center', marginTop: 6 }}>48 x 48dp</Text>
            </View>

            <View style={{ position: 'relative' }}>
              <TouchableOpacity
                onPress={() => setToast('Warning tap!')}
                style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#EF4444', justifyContent: 'center', alignItems: 'center', margin: 8 }}
                accessible={true}
                accessibilityLabel="Under-sized target alert"
              >
                <ShieldAlert size={14} color="#FFFFFF" />
              </TouchableOpacity>
              <View style={[styles.gridOverlay, { borderColor: '#EF4444' }]} pointerEvents="none" />
              <Text style={{ fontSize: 9, color: theme.colors.error, fontWeight: '800', alignSelf: 'center', marginTop: 14 }}>Invalid Spacing</Text>
            </View>
          </View>
        </View>

        {/* Dynamic Type Previewer */}
        <Text style={[styles.sectionTitle, { color: t.sub, marginTop: 24 }]}>DYNAMIC TYPE PREVIEWER</Text>
        <View style={[styles.card, { backgroundColor: t.card, borderColor: t.border, padding: 16 }]}>
          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
            {[12, 14, 16, 20, 24, 28].map(size => (
              <TouchableOpacity
                key={size}
                onPress={() => setDynamicSize(size)}
                style={[styles.sizeBtn, dynamicSize === size && styles.sizeBtnActive]}
              >
                <Text style={[styles.sizeText, dynamicSize === size && styles.sizeTextActive]}>{size}pt</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ padding: 12, backgroundColor: t.input, borderRadius: 12 }}>
            <Text style={{ fontSize: dynamicSize, fontFamily: F.body, color: t.text, lineHeight: dynamicSize + 6 }}>
              This paragraph dynamically resizes to test text scaling layouts. Ensure text content fits without pushing container elements or clipping layouts.
            </Text>
          </View>
        </View>

        {/* High Contrast Preview */}
        <Text style={[styles.sectionTitle, { color: t.sub, marginTop: 24 }]}>HIGH CONTRAST MODE TEST</Text>
        <View style={[styles.card, { backgroundColor: t.card, borderColor: t.border, padding: 16, gap: 12 }]}>
          <Checkbox label="Simulate High Contrast Mode" checked={highContrast} onPress={() => setHighContrast(!highContrast)} />
          
          <View style={{
            padding: 12,
            borderRadius: 12,
            backgroundColor: highContrast ? '#000000' : t.input,
            borderWidth: highContrast ? 2.5 : 1,
            borderColor: highContrast ? '#FFFFFF' : t.border,
            alignItems: 'center'
          }}>
            <Text style={{
              fontSize: 13,
              fontWeight: '800',
              color: highContrast ? '#FFFF00' : t.text,
              fontFamily: F.heading
            }}>
              {highContrast ? 'HIGH CONTRAST ACTIVE (WCAG AAA)' : 'Normal Contrast Ratio'}
            </Text>
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
  gridOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: '#0288D1',
    borderStyle: 'dashed',
    borderRadius: 4,
  },
  sizeBtn: {
    flex: 1,
    height: 38,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  sizeBtnActive: {
    borderColor: B.orange,
    backgroundColor: B.orangeL,
  },
  sizeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  sizeTextActive: {
    color: B.orange,
  },
});
