import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, Clipboard } from 'react-native';
import { ArrowLeft, Copy, Check } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import { B, F, theme } from '../../design-system';

interface TokensScreenProps {
  onBack: () => void;
}

export default function TokensScreen({ onBack }: TokensScreenProps) {
  const { setToast, t } = useAppContext();
  const [copied, setCopied] = React.useState(false);

  const colorsList = [
    { name: 'Primary (Brand Green)', value: theme.colors.primary, desc: 'Headers & primary emphasis' },
    { name: 'Secondary (Terracotta Orange)', value: theme.colors.secondary, desc: 'Buttons, selectors & accents' },
    { name: 'Background (Soft Cream)', value: theme.colors.light.bg, desc: 'Main viewport screen backgrounds' },
    { name: 'Surface (Warm Sand)', value: theme.colors.light.surface, desc: 'Secondary blocks & contact modals' },
    { name: 'Card (Light Eggshell)', value: theme.colors.light.card, desc: 'Base components & selector buttons' },
    { name: 'Text (Charcoal Black)', value: theme.colors.light.text, desc: 'Heading & primary font coloring' },
    { name: 'Sub (Soft Grey)', value: theme.colors.light.sub, desc: 'Descriptions & secondary headings' },
    { name: 'Muted (Grey Accent)', value: theme.colors.light.muted, desc: 'Disabled indicators & borders' },
    { name: 'Border (Cream Accent)', value: theme.colors.light.border, desc: 'Divider lines & container frames' },
    { name: 'Success (Emerald Green)', value: theme.colors.success, desc: 'Valid checkmarks & goals achieved' },
    { name: 'Error (Crimson Red)', value: theme.colors.error, desc: 'Incorrect forms & failure alerts' },
  ];

  const spacingList = [
    { name: 'xs (Extra Small)', value: theme.spacing.xs, size: 4 },
    { name: 'sm (Small)', value: theme.spacing.sm, size: 8 },
    { name: 'md (Medium)', value: theme.spacing.md, size: 12 },
    { name: 'lg (Large)', value: theme.spacing.lg, size: 16 },
    { name: 'xl (Extra Large)', value: theme.spacing.xl, size: 24 },
    { name: 'xxl (Double Extra Large)', value: theme.spacing.xxl, size: 32 },
  ];

  const radiusList = [
    { name: 'control (Base buttons & inputs)', value: theme.radius.control, size: 12 },
    { name: 'card (Cards & chips)', value: theme.radius.card, size: 16 },
    { name: 'dialog (Overlay confirmation dialogs)', value: theme.radius.dialog, size: 24 },
    { name: 'sheet (Drawer sheets)', value: theme.radius.sheet, size: 28 },
    { name: 'max (Capsules & badges)', value: theme.radius.max, size: 9999 },
  ];

  const handleCopyTokens = () => {
    const tokensJson = JSON.stringify(theme, null, 2);
    Clipboard.setString(tokensJson);
    setCopied(true);
    setToast('📋 Design Tokens copied to Clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyValue = (val: string) => {
    Clipboard.setString(val);
    setToast(`Copied: ${val}`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }}>
      <View style={[styles.header, { borderBottomColor: t.border }]}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowLeft size={22} color={t.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: t.text, fontFamily: F.heading }]}>Design Tokens Inspector</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Token Exporter Banner */}
        <View style={[styles.card, { backgroundColor: B.orangeL, borderColor: B.orange }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flex: 1, marginRight: 12 }}>
              <Text style={{ fontFamily: F.heading, fontSize: 15, fontWeight: '700', color: B.orange }}>Export System Tokens</Text>
              <Text style={{ fontFamily: F.body, fontSize: 11, color: B.orange, marginTop: 2 }}>
                Copy the complete JSON tokens layout mapping to sync with Figma & style compiler tools.
              </Text>
            </View>
            <TouchableOpacity onPress={handleCopyTokens} style={[styles.copyBannerBtn, { backgroundColor: B.orange }]}>
              {copied ? <Check size={16} color="#FFFFFF" /> : <Copy size={16} color="#FFFFFF" />}
              <Text style={{ color: '#FFFFFF', fontSize: 11, fontWeight: '800' }}>{copied ? 'Copied' : 'Copy JSON'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Color Palette section */}
        <Text style={[styles.sectionTitle, { color: t.sub }]}>COLOR PALETTES</Text>
        <View style={[styles.listContainer, { borderColor: t.border, backgroundColor: t.card }]}>
          {colorsList.map((color, idx) => (
            <TouchableOpacity
              key={color.name}
              onPress={() => handleCopyValue(color.value)}
              activeOpacity={0.7}
              style={[styles.listItem, idx > 0 && { borderTopWidth: 1, borderTopColor: t.border }]}
            >
              <View style={[styles.colorBadge, { backgroundColor: color.value, borderColor: t.border }]} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.tokenName, { color: t.text }]}>{color.name}</Text>
                <Text style={[styles.tokenDesc, { color: t.sub }]}>{color.desc}</Text>
              </View>
              <View style={styles.tokenValueContainer}>
                <Text style={[styles.tokenValueText, { color: t.text }]}>{color.value}</Text>
                <Copy size={12} color={t.muted} style={{ marginLeft: 4 }} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Spacing Scale Section */}
        <Text style={[styles.sectionTitle, { color: t.sub, marginTop: 24 }]}>SPACING GRID (8-POINT SCALE)</Text>
        <View style={[styles.listContainer, { borderColor: t.border, backgroundColor: t.card }]}>
          {spacingList.map((space, idx) => (
            <TouchableOpacity
              key={space.name}
              onPress={() => handleCopyValue(String(space.size))}
              activeOpacity={0.7}
              style={[styles.listItem, idx > 0 && { borderTopWidth: 1, borderTopColor: t.border }]}
            >
              <View style={styles.spacingIndicatorContainer}>
                <View style={[styles.spacingBar, { width: space.size, backgroundColor: B.orange }]} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.tokenName, { color: t.text }]}>{space.name}</Text>
              </View>
              <View style={styles.tokenValueContainer}>
                <Text style={[styles.tokenValueText, { color: t.text }]}>{space.size}px</Text>
                <Copy size={12} color={t.muted} style={{ marginLeft: 4 }} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Radius Standards Section */}
        <Text style={[styles.sectionTitle, { color: t.sub, marginTop: 24 }]}>BORDER RADIUS STANDARDS</Text>
        <View style={[styles.listContainer, { borderColor: t.border, backgroundColor: t.card }]}>
          {radiusList.map((radius, idx) => (
            <TouchableOpacity
              key={radius.name}
              onPress={() => handleCopyValue(String(radius.size))}
              activeOpacity={0.7}
              style={[styles.listItem, idx > 0 && { borderTopWidth: 1, borderTopColor: t.border }]}
            >
              <View style={[styles.radiusBadge, { borderRadius: radius.size === 9999 ? 18 : radius.size, borderColor: t.text, backgroundColor: t.input }]} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.tokenName, { color: t.text }]}>{radius.name}</Text>
              </View>
              <View style={styles.tokenValueContainer}>
                <Text style={[styles.tokenValueText, { color: t.text }]}>
                  {radius.size === 9999 ? 'capsule (max)' : `${radius.size}px`}
                </Text>
                <Copy size={12} color={t.muted} style={{ marginLeft: 4 }} />
              </View>
            </TouchableOpacity>
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
    marginBottom: 20,
  },
  copyBannerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
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
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  colorBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 14,
  },
  spacingIndicatorContainer: {
    width: 48,
    alignItems: 'flex-start',
    marginRight: 14,
  },
  spacingBar: {
    height: 12,
    borderRadius: 4,
  },
  radiusBadge: {
    width: 28,
    height: 28,
    borderWidth: 1.5,
    marginRight: 14,
  },
  tokenName: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  tokenDesc: {
    fontSize: 10.5,
    marginTop: 2,
  },
  tokenValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  tokenValueText: {
    fontFamily: F.mono,
    fontSize: 11,
    fontWeight: '700',
  },
});
