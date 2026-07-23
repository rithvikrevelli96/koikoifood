import React, { useState } from 'react';
import { View, Platform, TouchableOpacity, ScrollView, StyleSheet, Switch } from 'react-native';
import { ArrowLeft, Sun, Moon, ToggleLeft, Globe, Sliders, Bell, HelpCircle } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import {
  theme,
  Text,
  Button,
  PageLayout,
  Card,
  InfoCard
} from '../../design-system';
import { BottomTabNav } from '../../core/components/BottomTabNav';

export default function SettingsScreen() {
  const {
    themeMode,
    setThemeMode,
    isDark,
    back,
    setToast,
    smartNotifications,
    setSmartNotifications,
    t,
  } = useAppContext();

  // Local measurement units state
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'ft'>('cm');

  const handleSelectTheme = (mode: 'light' | 'dark' | 'system') => {
    setThemeMode(mode);
    setToast(`☀️ Visual Theme updated to ${mode}`);
  };

  const toggleNotification = (key: string) => {
    setSmartNotifications((prev: any) => ({
      ...prev,
      [key]: !prev[key]
    }));
    setToast('🔔 Notification settings updated!');
  };

  return (
    <PageLayout style={{ paddingHorizontal: 0 }} background="organic" backgroundVariant="minimal">
      {/* HEADER */}
      <View style={[styles.headerContainer, { backgroundColor: t.surface, borderColor: t.border }]}>
        <Button
          onlyIcon
          variant="ghost"
          size="medium"
          onPress={back}
          iconLeft={<ArrowLeft size={16} color={t.text} />}
          style={[styles.backBtn, { backgroundColor: t.surface }] as any}
        />
        <Text style={[styles.headerTitle, { color: t.primary }]}>Settings</Text>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* HERO SECTION */}
        <View style={styles.heroSection}>
          <Text style={[styles.heroSubTitle, { color: t.secondary }]}>PREFERENCES</Text>
          <Text style={[styles.heroMainTitle, { color: t.text }]}>Control Visuals & Units</Text>
          <Text style={[styles.heroDesc, { color: t.sub }]}>
            Customize the theme interface appearance, weight measurement scales, and order notifications.
          </Text>
        </View>

        {/* Appearance Settings */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: t.text }]}>App Appearance</Text>
          <InfoCard style={[styles.cardWrapper, { backgroundColor: t.card, borderColor: t.border }]}>
            <Text style={[styles.cardLabel, { color: t.sub }]}>Choose Theme</Text>
            <View style={styles.themeRow}>
              {[
                { key: 'light', label: 'Light ☀️' },
                { key: 'dark', label: 'Dark 🌙' },
                { key: 'system', label: 'System ⚙️' }
              ].map((item) => {
                const isSelected = themeMode === item.key;
                return (
                  <TouchableOpacity
                    key={item.key}
                    onPress={() => handleSelectTheme(item.key as any)}
                    style={[
                      styles.themeChip,
                      { backgroundColor: isSelected ? t.primary : t.elevated, borderColor: isSelected ? t.primary : t.border }
                    ]}
                  >
                    <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 12.5, color: isSelected ? '#FFFFFF' : t.text, fontWeight: '700' }}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </InfoCard>
        </View>

        {/* Units Configuration */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: t.text }]}>Measurement Units</Text>
          <InfoCard style={[styles.cardWrapper, { backgroundColor: t.card, borderColor: t.border }]}>
            <View style={styles.preferenceRow}>
              <View style={styles.prefTextCol}>
                <Text style={[styles.prefLabel, { color: t.text }]}>Weight Scale</Text>
                <Text style={[styles.prefDesc, { color: t.sub }]}>Select weight units in profile</Text>
              </View>
              <View style={[styles.toggleGroup, { backgroundColor: t.elevated, borderColor: t.border }]}>
                <TouchableOpacity
                  onPress={() => setWeightUnit('kg')}
                  style={[styles.toggleBtn, weightUnit === 'kg' && { backgroundColor: t.primary }]}
                >
                  <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 11.5, color: weightUnit === 'kg' ? '#FFFFFF' : t.text, fontWeight: '700' }}>KG</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setWeightUnit('lbs')}
                  style={[styles.toggleBtn, weightUnit === 'lbs' && { backgroundColor: t.primary }]}
                >
                  <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 11.5, color: weightUnit === 'lbs' ? '#FFFFFF' : t.text, fontWeight: '700' }}>LBS</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={[styles.divider, { backgroundColor: t.divider }]} />

            <View style={styles.preferenceRow}>
              <View style={styles.prefTextCol}>
                <Text style={[styles.prefLabel, { color: t.text }]}>Height Units</Text>
                <Text style={[styles.prefDesc, { color: t.sub }]}>Select height units in profile</Text>
              </View>
              <View style={[styles.toggleGroup, { backgroundColor: t.elevated, borderColor: t.border }]}>
                <TouchableOpacity
                  onPress={() => setHeightUnit('cm')}
                  style={[styles.toggleBtn, heightUnit === 'cm' && { backgroundColor: t.primary }]}
                >
                  <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 11.5, color: heightUnit === 'cm' ? '#FFFFFF' : t.text, fontWeight: '700' }}>CM</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setHeightUnit('ft')}
                  style={[styles.toggleBtn, heightUnit === 'ft' && { backgroundColor: t.primary }]}
                >
                  <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 11.5, color: heightUnit === 'ft' ? '#FFFFFF' : t.text, fontWeight: '700' }}>FT</Text>
                </TouchableOpacity>
              </View>
            </View>
          </InfoCard>
        </View>

        {/* Notification Settings */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: t.text }]}>Smart Alerts & Notifications</Text>
          <InfoCard style={[styles.cardWrapper, { backgroundColor: t.card, borderColor: t.border }]}>
            {[
              { key: 'orderUpdates', label: 'Delivery Updates', desc: 'Realtime live tracking notifications' },
              { key: 'meal', label: 'Meal Reminders', desc: 'Alerts to configure skipped lunches/dinners' },
              { key: 'water', label: 'Water Logging Alerts', desc: 'Hydration checks based on sleep goals' },
              { key: 'workout', label: 'Workout Schedules', desc: 'Reminders based on fitness plan goals' }
            ].map((item, idx) => {
              const val = smartNotifications ? smartNotifications[item.key] : false;
              return (
                <View key={item.key}>
                  {idx > 0 && <View style={[styles.divider, { backgroundColor: t.divider }]} />}
                  <View style={styles.preferenceRow}>
                    <View style={styles.prefTextCol}>
                      <Text style={[styles.prefLabel, { color: t.text }]}>{item.label}</Text>
                      <Text style={[styles.prefDesc, { color: t.sub }]}>{item.desc}</Text>
                    </View>
                    <Switch
                      value={val}
                      onValueChange={() => toggleNotification(item.key)}
                      trackColor={{ false: t.border, true: t.primary }}
                      thumbColor={val ? '#FFFFFF' : t.sub}
                    />
                  </View>
                </View>
              );
            })}
          </InfoCard>
        </View>


      </ScrollView>

      {/* Bottom Navigation */}
      <BottomTabNav active="profile" />
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: theme.spacing.screenHorizontal,
    paddingTop: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  headerTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 16,
    textTransform: 'uppercase',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  heroSection: {
    paddingHorizontal: theme.spacing.screenHorizontal,
    marginTop: theme.spacing.screenVertical,
    marginBottom: 10,
  },
  heroSubTitle: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  heroMainTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 26,
    fontWeight: '800',
    marginTop: 4,
  },
  heroDesc: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 13.5,
    lineHeight: 19,
    marginTop: 8,
  },
  sectionContainer: {
    paddingHorizontal: theme.spacing.screenHorizontal,
    marginTop: 16,
  },
  sectionTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 15,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  cardWrapper: {
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  cardLabel: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 13.5,
    fontWeight: '700',
    marginBottom: 12,
  },
  themeRow: {
    flexDirection: 'row',
    gap: 10,
  },
  themeChip: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  themeChipActive: {},
  themeChipText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12.5,
    fontWeight: '700',
  },
  themeChipTextActive: {
    color: '#FFFFFF',
  },
  preferenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  prefTextCol: {
    flex: 1,
    paddingRight: 10,
  },
  prefLabel: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 14,
    fontWeight: '700',
  },
  prefDesc: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 11.5,
    marginTop: 2,
  },
  toggleGroup: {
    flexDirection: 'row',
    borderRadius: 10,
    padding: 3,
    borderWidth: 1,
  },
  toggleBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  toggleBtnActive: {},
  toggleBtnText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 11.5,
    fontWeight: '700',
  },
  toggleBtnTextActive: {
    color: '#FFFFFF',
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
});
