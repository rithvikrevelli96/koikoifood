import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { ArrowLeft, ChevronRight, Sun, Moon, Laptop, Palette, Type, Layers, RefreshCw, Eye, HardDrive, Wifi, Flag, Terminal, Smartphone, Info, Image, ClipboardCheck } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import { B, F, Button } from '../../design-system';
import { DevScreenType } from '../navigation/DeveloperNavigator';

interface HomeScreenProps {
  navigate: (screen: DevScreenType) => void;
  onClose: () => void;
}

export default function HomeScreen({ navigate, onClose }: HomeScreenProps) {
  const { themeMode, setThemeMode, toast, setToast, t } = useAppContext();

  const devMenuItems = [
    { title: 'Design Tokens', sub: 'Color swatches, Spacing scale & Copy JSON', icon: Palette, screen: 'tokens' as DevScreenType },
    { title: 'Typography & Localization', sub: 'General Sans, Inter, IBM Plex Mono & Multi-lang preview', icon: Type, screen: 'typography' as DevScreenType },
    { title: 'Component Library', sub: 'Live interactive Button & Input sandbox', icon: Layers, screen: 'components' as DevScreenType },
    { title: 'Motion & Durations', sub: 'Animation timeline, Easing playbacks', icon: RefreshCw, screen: 'motion' as DevScreenType },
    { title: 'Accessibility (a11y) QA', sub: 'Touch grids, Contrast validations & labels', icon: Eye, screen: 'accessibility' as DevScreenType },
    { title: 'Storage Key Inspector', sub: 'Live AsyncStorage key-value browser', icon: HardDrive, screen: 'storage' as DevScreenType },
    { title: 'Network Inspector', sub: 'Ping times, Latencies & Endpoint diagnostics', icon: Wifi, screen: 'network' as DevScreenType },
    { title: 'FeatureFlags Controller', sub: 'Owner tags, rollout build numbers', icon: Flag, screen: 'flags' as DevScreenType },
    { title: 'API Playground', sub: 'REST sandbox for Authentication & Meals endpoints', icon: Terminal, screen: 'api_playground' as DevScreenType },
    { title: 'Device Diagnostics', sub: 'Dimensions, dpi, battery details', icon: Smartphone, screen: 'device_info' as DevScreenType },
    { title: 'Build Information', sub: 'Expo SDK, commit SHAs & env parameters', icon: Info, screen: 'build_info' as DevScreenType },
    { title: 'Lucide Icon Gallery', sub: 'Approved searchable icon database', icon: Image, screen: 'icon_gallery' as DevScreenType },
    { title: 'Changelog & QA checklist', sub: 'Component status matrix & pre-merge checks', icon: ClipboardCheck, screen: 'changelog' as DevScreenType },
  ];

  const handleLanguageSelect = (lang: string) => {
    setToast(`Language changed to ${lang} (Mocked)`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }}>
      <View style={[styles.header, { borderBottomColor: t.border }]}>
        <TouchableOpacity onPress={onClose} style={styles.backButton}>
          <ArrowLeft size={22} color={t.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: t.text, fontFamily: F.heading }]}>Developer Mode Panel</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Theme Mode Switcher */}
        <View style={[styles.card, { backgroundColor: t.card, borderColor: t.border }]}>
          <Text style={[styles.sectionTitle, { color: t.text }]}>THEME CONTROLLER</Text>
          <View style={styles.themeRow}>
            {[
              { mode: 'light' as const, label: 'Light', icon: Sun },
              { mode: 'dark' as const, label: 'Dark', icon: Moon },
              { mode: 'system' as const, label: 'System', icon: Laptop },
            ].map(item => {
              const active = themeMode === item.mode;
              return (
                <TouchableOpacity
                  key={item.mode}
                  onPress={() => setThemeMode(item.mode)}
                  style={[
                    styles.themeButton,
                    { borderColor: active ? B.orange : t.border, backgroundColor: active ? B.orangeL : t.input }
                  ]}
                >
                  <item.icon size={16} color={active ? B.orange : t.text} />
                  <Text style={[styles.themeLabel, { color: active ? B.orange : t.text, fontWeight: active ? '700' : '500' }]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Localization Switcher */}
        <View style={[styles.card, { backgroundColor: t.card, borderColor: t.border }]}>
          <Text style={[styles.sectionTitle, { color: t.text }]}>LOCALIZATION PREVIEW</Text>
          <View style={styles.themeRow}>
            {[
              { code: 'en', label: 'English' },
              { code: 'te', label: 'తెలుగు' },
              { code: 'hi', label: 'हिन्दी' },
            ].map(item => (
              <TouchableOpacity
                key={item.code}
                onPress={() => handleLanguageSelect(item.label)}
                style={[
                  styles.themeButton,
                  { borderColor: t.border, backgroundColor: t.input }
                ]}
              >
                <Text style={[styles.themeLabel, { color: t.text }]}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Menu Items */}
        <Text style={[styles.listTitle, { color: t.sub }]}>DIAGNOSTICS & CATALOUGES</Text>
        <View style={[styles.menuList, { borderColor: t.border, backgroundColor: t.card }]}>
          {devMenuItems.map((item, idx) => (
            <TouchableOpacity
              key={item.screen}
              onPress={() => navigate(item.screen)}
              style={[
                styles.menuItem,
                idx > 0 && { borderTopWidth: 1, borderTopColor: t.border }
              ]}
            >
              <View style={[styles.iconContainer, { backgroundColor: B.orangeL }]}>
                <item.icon size={18} color={B.orange} />
              </View>
              <View style={styles.menuText}>
                <Text style={[styles.menuTitle, { color: t.text }]}>{item.title}</Text>
                <Text style={[styles.menuSub, { color: t.sub }]}>{item.sub}</Text>
              </View>
              <ChevronRight size={16} color={t.muted} />
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
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.2,
    marginBottom: 12,
  },
  themeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  themeButton: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    borderWidth: 1.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  themeLabel: {
    fontSize: 12,
  },
  listTitle: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.2,
    marginLeft: 12,
    marginBottom: 8,
  },
  menuList: {
    borderWidth: 1.5,
    borderRadius: 24,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  menuSub: {
    fontSize: 11,
    marginTop: 2,
  },
});
