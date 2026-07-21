import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
  Home as HomeIcon,
  UtensilsCrossed,
  Calendar,
  ChefHat,
  User,
} from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import { theme, F } from '../../design-system';
import { Screen } from '../constants/types';

interface BottomTabNavProps {
  active: string;
}

export function BottomTabNav({ active }: BottomTabNavProps) {
  const { switchTab, isDark } = useAppContext();

  const tabs = [
    { id: 'home', s: 'home' as Screen, I: HomeIcon, label: 'Home' },
    { id: 'meals', s: 'meals' as Screen, I: UtensilsCrossed, label: 'Meals' },
    { id: 'plans', s: 'plans' as Screen, I: Calendar, label: 'Plans' },
    { id: 'kitchen', s: 'kitchen' as Screen, I: ChefHat, label: 'Kitchen' },
    { id: 'profile', s: 'profile' as Screen, I: User, label: 'Profile' },
  ];

  const tabBg = isDark ? theme.colors.dark.surface : '#F4EFE6';
  const tabBorder = isDark ? theme.colors.dark.border : '#E8E2D8';

  return (
    <View style={[styles.bottomTabContainer, { backgroundColor: tabBg, borderColor: tabBorder, borderWidth: 1 }]}>
      {tabs.map(tab => {
        const isActive = active === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tabBtn}
            onPress={() => switchTab(tab.id)}
            activeOpacity={0.85}
            accessible={true}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={`${tab.label} tab`}
            accessibilityHint={`Navigates to ${tab.label} screen`}
          >
            <View style={[
              styles.iconWrapper,
              isActive && { backgroundColor: isDark ? 'rgba(75, 93, 58, 0.25)' : 'rgba(75, 93, 58, 0.08)' }
            ]}>
              <tab.I size={20} color={isActive ? (isDark ? '#7FA457' : '#4B5D3A') : (isDark ? '#A09B90' : '#8A857B')} strokeWidth={isActive ? 2 : 2} />
            </View>
            <Text style={[
              styles.tabLabel,
              { color: isActive ? (isDark ? '#7FA457' : '#4B5D3A') : (isDark ? '#A09B90' : '#8A857B'), fontWeight: isActive ? '700' : '500' }
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomTabContainer: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    height: 64,
    borderRadius: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    borderWidth: 1,
    shadowColor: '#1F1F1F',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 18,
    elevation: 4,
    zIndex: 100,
  },
  tabBtn: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  iconWrapper: {
    width: 44,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  tabLabel: {
    fontFamily: F.body,
    fontSize: 10,
    letterSpacing: 0.2,
  },
});
