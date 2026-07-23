import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
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
  const { switchTab, isDark, t } = useAppContext();

  const tabs = [
    { id: 'home', s: 'home' as Screen, I: HomeIcon, label: 'Home' },
    { id: 'meals', s: 'meals' as Screen, I: UtensilsCrossed, label: 'Meals' },
    { id: 'plans', s: 'plans' as Screen, I: Calendar, label: 'Plans' },
    { id: 'kitchen', s: 'kitchen' as Screen, I: ChefHat, label: 'Kitchen' },
    { id: 'profile', s: 'profile' as Screen, I: User, label: 'Profile' },
  ];

  const activeOrange = t.secondary; // #C96B3C matching reference image

  return (
    <View
      style={[
        styles.floatingTabBar,
        {
          backgroundColor: t.card,
          borderColor: t.border,
          shadowColor: isDark ? '#000000' : '#1F1F1F',
        }
      ]}
    >
      {tabs.map(tab => {
        const isActive = active === tab.id;
        const iconColor = isActive ? activeOrange : t.sub;
        const pillBg = isActive
          ? (isDark ? 'rgba(215, 132, 86, 0.18)' : '#FFF3EB')
          : 'transparent';

        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tabBtn}
            onPress={() => switchTab(tab.id)}
            activeOpacity={0.75}
            accessible={true}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={`${tab.label} tab`}
            accessibilityHint={`Navigates to ${tab.label} screen`}
          >
            <View style={[styles.activePillBox, { backgroundColor: pillBg }]}>
              <tab.I
                size={20}
                color={iconColor}
                strokeWidth={isActive ? 2.2 : 1.8}
              />
              <Text
                style={[
                  styles.tabLabel,
                  {
                    color: iconColor,
                    fontWeight: isActive ? '800' : '600',
                  }
                ]}
              >
                {tab.label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  floatingTabBar: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 24 : 14,
    left: 16,
    right: 16,
    height: 64,
    borderRadius: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 6,
    borderWidth: 1,
    elevation: 10,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    zIndex: 1000,
  },
  tabBtn: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activePillBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 18,
    gap: 3,
  },
  tabLabel: {
    fontFamily: F.body,
    fontSize: 10.5,
    letterSpacing: 0.1,
  },
});
