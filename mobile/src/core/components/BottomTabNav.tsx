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
  const { go } = useAppContext();

  const tabs = [
    { id: 'home', s: 'home' as Screen, I: HomeIcon, label: 'Home' },
    { id: 'meals', s: 'meals' as Screen, I: UtensilsCrossed, label: 'Meals' },
    { id: 'plans', s: 'plans' as Screen, I: Calendar, label: 'Plans' },
    { id: 'kitchen', s: 'kitchen' as Screen, I: ChefHat, label: 'Kitchen' },
    { id: 'profile', s: 'profile' as Screen, I: User, label: 'Profile' },
  ];

  return (
    <View style={[styles.bottomTabContainer, { backgroundColor: theme.colors.light.bg, borderColor: theme.colors.light.border }]}>
      {tabs.map(tab => {
        const isActive = active === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tabBtn}
            onPress={() => go(tab.s)}
            activeOpacity={0.85}
          >
            <View style={[
              styles.iconWrapper,
              isActive && { backgroundColor: 'rgba(201, 107, 60, 0.08)' }
            ]}>
              <tab.I size={20} color={isActive ? theme.colors.secondary : '#8A857B'} strokeWidth={isActive ? 2.5 : 2} />
            </View>
            <Text style={[
              styles.tabLabel,
              { color: isActive ? theme.colors.secondary : '#8A857B', fontWeight: isActive ? '800' : '600' }
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
    height: 72,
    borderRadius: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    borderTopWidth: 0,
    ...theme.shadows.dialog,
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
    width: 46,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  tabLabel: {
    fontFamily: F.body,
    fontSize: 10,
    letterSpacing: 0.2,
  },
});
