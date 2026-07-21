import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ArrowLeft, Check, Sun, Moon, Smartphone, Sparkles } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import { AppTheme } from '../../core/constants/types';
import { storage } from '../../core/utils/storage';
import {
  theme,
  Text,
  Button,
  PageLayout,
  Card,
  InfoCard
} from '../../design-system';

export default function AppearanceScreen() {
  const {
    isDark,
    themeMode,
    setThemeMode,
    back,
    setToast,
  } = useAppContext();

  const themesList: {
    key: AppTheme;
    label: string;
    desc: string;
    icon: typeof Sun;
    iconBg: string;
    iconColor: string;
  }[] = [
    {
      key: 'light',
      label: 'Warm Light Theme',
      desc: 'Relaxing sand & cream surfaces with forest-green accents.',
      icon: Sun,
      iconBg: 'rgba(201, 107, 60, 0.12)',
      iconColor: '#C96B3C',
    },
    {
      key: 'dark',
      label: 'Warm Dark Theme',
      desc: 'Comfortable dark charcoal tones for high legibility at night.',
      icon: Moon,
      iconBg: 'rgba(217, 182, 90, 0.15)',
      iconColor: '#D9B65A',
    },
    {
      key: 'system',
      label: 'System Default',
      desc: 'Automatically matches your device OS theme preference.',
      icon: Smartphone,
      iconBg: 'rgba(75, 93, 58, 0.12)',
      iconColor: '#4B5D3A',
    },
  ];

  const handleSelectTheme = async (mode: AppTheme) => {
    setThemeMode(mode);
    try {
      await storage.setItem('koikoi_theme_mode', mode);
    } catch (e) {
      console.warn('Failed to save theme mode:', e);
    }

    if (mode === 'light') {
      setToast('☀️ Light theme enabled!');
    } else if (mode === 'dark') {
      setToast('🌙 Dark theme enabled!');
    } else {
      setToast('📱 System default theme enabled!');
    }
  };

  const headerBg = isDark ? theme.colors.dark.surface : theme.colors.light.surface;
  const headerBorder = isDark ? theme.colors.dark.border : theme.colors.light.border;

  return (
    <PageLayout style={{ paddingHorizontal: 0 }}>
      {/* Top Header Bar */}
      <View style={[styles.headerBar, { backgroundColor: headerBg, borderColor: headerBorder }]}>
        <Button
          onlyIcon
          variant="ghost"
          size="medium"
          onPress={back}
          iconLeft={<ArrowLeft size={16} color={isDark ? theme.colors.dark.text : theme.colors.light.text} />}
          style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: headerBg }}
          accessibilityLabel="Go back"
        />
        <Text variant="title" color="primary" style={{ marginLeft: 14 }}>
          APPEARANCE & THEMES
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginBottom: theme.spacing.lg }}>
          <Text variant="title" color="primary">Theme Settings</Text>
          <Text variant="caption" color="sub" style={{ marginTop: 4 }}>
            Choose how Koi Koi Dabba looks to match your preference.
          </Text>
        </View>

        {/* 3 Theme Options */}
        <View style={{ gap: 14 }}>
          {themesList.map((item) => {
            const IconComponent = item.icon;
            const isActive = themeMode === item.key;

            return (
              <TouchableOpacity
                key={item.key}
                onPress={() => handleSelectTheme(item.key)}
                activeOpacity={0.88}
                style={[
                  styles.themeCard,
                  {
                    backgroundColor: isDark ? theme.colors.dark.surface : theme.colors.light.surface,
                    borderColor: isActive ? theme.colors.secondary : (isDark ? theme.colors.dark.border : theme.colors.light.border),
                    borderWidth: isActive ? 2 : 1,
                  }
                ]}
                accessibilityRole="radio"
                accessibilityState={{ checked: isActive }}
                accessibilityLabel={`${item.label}, ${isActive ? 'selected' : 'not selected'}`}
              >
                <View style={styles.cardInnerRow}>
                  <View style={[styles.iconWrapper, { backgroundColor: item.iconBg }]}>
                    <IconComponent size={18} color={item.iconColor} />
                  </View>

                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                      <Text variant="body" color="text" style={{ fontWeight: '800' }}>
                        {item.label}
                      </Text>
                      {isActive && (
                        <View style={styles.activePill}>
                          <Text style={styles.activePillText}>Active</Text>
                        </View>
                      )}
                    </View>
                    <Text variant="caption" color="sub" style={{ marginTop: 3, lineHeight: 16 }}>
                      {item.desc}
                    </Text>
                  </View>

                  <View style={[
                    styles.radioCircle,
                    {
                      borderColor: isActive ? theme.colors.secondary : (isDark ? '#555045' : theme.colors.light.muted),
                      backgroundColor: isActive ? theme.colors.secondary : 'transparent',
                    }
                  ]}>
                    {isActive && <Check size={13} color="#FFFFFF" strokeWidth={3} />}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Live Theme Preview Card */}
        <View style={{ marginTop: theme.spacing.xxl }}>
          <Text variant="label" color="sub" style={{ textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8, fontWeight: '800' }}>
            Live Theme Preview
          </Text>
          <InfoCard style={{ gap: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Sparkles size={16} color={theme.colors.secondary} />
                <Text variant="title" color="primary">Active Mode: {isDark ? 'Dark Theme' : 'Light Theme'}</Text>
              </View>
              <Text variant="mono" color="secondary" style={{ fontWeight: '800', fontSize: 12 }}>
                {themeMode.toUpperCase()}
              </Text>
            </View>
            <Text variant="caption" color="sub" style={{ lineHeight: 18 }}>
              This preview shows real-time colors of cards, typography, and background tokens dynamically adapting to your choice.
            </Text>
          </InfoCard>
        </View>

      </ScrollView>
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 80,
  },
  themeCard: {
    borderRadius: 20,
    padding: 16,
  },
  cardInnerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  iconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activePill: {
    backgroundColor: 'rgba(75, 93, 58, 0.15)',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
  },
  activePillText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 10,
    fontWeight: '800',
    color: '#4B5D3A',
  },
});
