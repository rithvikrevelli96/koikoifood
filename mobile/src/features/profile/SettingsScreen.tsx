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
    setSmartNotifications
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
      <View style={styles.headerContainer}>
        <Button
          onlyIcon
          variant="ghost"
          size="medium"
          onPress={back}
          iconLeft={<ArrowLeft size={16} color={theme.colors.light.text} />}
          style={styles.backBtn}
        />
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* HERO SECTION */}
        <View style={styles.heroSection}>
          <Text style={styles.heroSubTitle}>PREFERENCES</Text>
          <Text style={styles.heroMainTitle}>Control Visuals & Units</Text>
          <Text style={styles.heroDesc}>
            Customize the theme interface appearance, weight measurement scales, and order notifications.
          </Text>
        </View>

        {/* Appearance Settings */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>App Appearance</Text>
          <InfoCard style={styles.cardWrapper}>
            <Text style={styles.cardLabel}>Choose Theme</Text>
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
                    style={[styles.themeChip, isSelected ? styles.themeChipActive : undefined]}
                  >
                    <Text style={[styles.themeChipText, isSelected ? styles.themeChipTextActive : undefined] as any}>
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
          <Text style={styles.sectionTitle}>Measurement Units</Text>
          <InfoCard style={styles.cardWrapper}>
            <View style={styles.preferenceRow}>
              <View style={styles.prefTextCol}>
                <Text style={styles.prefLabel}>Weight Scale</Text>
                <Text style={styles.prefDesc}>Select weight units in profile</Text>
              </View>
              <View style={styles.toggleGroup}>
                <TouchableOpacity
                  onPress={() => setWeightUnit('kg')}
                  style={[styles.toggleBtn, weightUnit === 'kg' ? styles.toggleBtnActive : undefined]}
                >
                  <Text style={[styles.toggleBtnText, weightUnit === 'kg' ? styles.toggleBtnTextActive : undefined] as any}>KG</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setWeightUnit('lbs')}
                  style={[styles.toggleBtn, weightUnit === 'lbs' ? styles.toggleBtnActive : undefined]}
                >
                  <Text style={[styles.toggleBtnText, weightUnit === 'lbs' ? styles.toggleBtnTextActive : undefined] as any}>LBS</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.preferenceRow}>
              <View style={styles.prefTextCol}>
                <Text style={styles.prefLabel}>Height Units</Text>
                <Text style={styles.prefDesc}>Select height units in profile</Text>
              </View>
              <View style={styles.toggleGroup}>
                <TouchableOpacity
                  onPress={() => setHeightUnit('cm')}
                  style={[styles.toggleBtn, heightUnit === 'cm' ? styles.toggleBtnActive : undefined]}
                >
                  <Text style={[styles.toggleBtnText, heightUnit === 'cm' ? styles.toggleBtnTextActive : undefined] as any}>CM</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setHeightUnit('ft')}
                  style={[styles.toggleBtn, heightUnit === 'ft' ? styles.toggleBtnActive : undefined]}
                >
                  <Text style={[styles.toggleBtnText, heightUnit === 'ft' ? styles.toggleBtnTextActive : undefined] as any}>FT</Text>
                </TouchableOpacity>
              </View>
            </View>
          </InfoCard>
        </View>

        {/* Notification Settings */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Smart Alerts & Notifications</Text>
          <InfoCard style={styles.cardWrapper}>
            {[
              { key: 'orderUpdates', label: 'Delivery Updates', desc: 'Realtime live tracking notifications' },
              { key: 'meal', label: 'Meal Reminders', desc: 'Alerts to configure skipped lunches/dinners' },
              { key: 'water', label: 'Water Logging Alerts', desc: 'Hydration checks based on sleep goals' },
              { key: 'workout', label: 'Workout Schedules', desc: 'Reminders based on fitness plan goals' }
            ].map((item, idx) => {
              const val = smartNotifications ? smartNotifications[item.key] : false;
              return (
                <View key={item.key}>
                  {idx > 0 && <View style={styles.divider} />}
                  <View style={styles.preferenceRow}>
                    <View style={styles.prefTextCol}>
                      <Text style={styles.prefLabel}>{item.label}</Text>
                      <Text style={styles.prefDesc}>{item.desc}</Text>
                    </View>
                    <Switch
                      value={val}
                      onValueChange={() => toggleNotification(item.key)}
                      trackColor={{ false: '#E8E2D8', true: '#4B5D3A' }}
                      thumbColor="#FCFAF6"
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
    borderColor: theme.colors.light.border,
    backgroundColor: theme.colors.light.surface,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.light.surface,
  },
  headerTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 18,
    color: '#4B5D3A',
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
    color: '#C96B3C',
    fontWeight: '800',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  heroMainTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 26,
    color: '#1F1F1F',
    fontWeight: '800',
    marginTop: 4,
  },
  heroDesc: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 13.5,
    color: '#8A857B',
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
    color: '#1F1F1F',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  cardWrapper: {
    padding: 16,
    borderRadius: 20,
    backgroundColor: '#F4EFE6',
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  cardLabel: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 13.5,
    color: '#8A857B',
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
    borderColor: '#E8E2D8',
    backgroundColor: '#FCFAF6',
    alignItems: 'center',
  },
  themeChipActive: {
    backgroundColor: '#4B5D3A',
    borderColor: '#4B5D3A',
  },
  themeChipText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12.5,
    color: '#1F1F1F',
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
    color: '#1F1F1F',
    fontWeight: '700',
  },
  prefDesc: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 11.5,
    color: '#8A857B',
    marginTop: 2,
  },
  toggleGroup: {
    flexDirection: 'row',
    backgroundColor: '#FCFAF6',
    borderRadius: 10,
    padding: 3,
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  toggleBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  toggleBtnActive: {
    backgroundColor: '#4B5D3A',
  },
  toggleBtnText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 11.5,
    color: '#1F1F1F',
    fontWeight: '700',
  },
  toggleBtnTextActive: {
    color: '#FFFFFF',
  },
  divider: {
    height: 1,
    backgroundColor: '#E8E2D8',
    marginVertical: 12,
  },
});
