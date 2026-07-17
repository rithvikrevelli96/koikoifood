import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { ArrowLeft, Sun, Moon, Settings, Check } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import { AppTheme } from '../../core/constants/types';
import { theme, F } from '../../design-system';
import { Text as RNText } from 'react-native';

const B = {
  orange: theme.colors.secondary,
  orangeL: 'rgba(201, 107, 60, 0.08)',
  green: theme.colors.success,
  greenL: 'rgba(75, 93, 58, 0.08)',
  cream: theme.colors.light.surface,
  creamL: theme.colors.light.bg,
};

function Text({ style, ...props }: any) {
  const flatStyle = StyleSheet.flatten(style || {});
  let fontFamily = F.body;
  const content = String(props.children || '');
  const isNumeric = /[₹\d]/.test(content) && (
    /^[₹\d\s★%\-.:\+a-zA-Z\s]+$/.test(content) ||
    content.includes('kcal') ||
    content.includes('protein') ||
    content.includes('Carbs') ||
    content.includes('₹') ||
    content.includes('min') ||
    content.includes('km')
  );

  if (flatStyle.fontFamily) {
    fontFamily = flatStyle.fontFamily;
  } else if (flatStyle.fontSize >= 15 && (flatStyle.fontWeight === '900' || flatStyle.fontWeight === '800' || flatStyle.fontWeight === 'bold')) {
    fontFamily = isNumeric ? F.mono : F.heading;
  } else if (isNumeric) {
    fontFamily = F.mono;
  }
  return <RNText style={[{ fontFamily }, style]} {...props} />;
}

export default function AppearanceScreen() {
  const {
    themeMode,
    setThemeMode,
    back,
    setToast,
    t
  } = useAppContext();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }}>
      <View style={[styles.headerBar, { borderBottomColor: t.border }]}>
        <TouchableOpacity onPress={back} style={[styles.backIconCircle, { backgroundColor: t.surface }]}>
          <ArrowLeft size={16} color={t.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: t.text }]}>Appearance</Text>
      </View>
      <View style={{ padding: 16, gap: 12 }}>
        {[
          { id: 'light', label: 'Light Mode', icon: Sun },
          { id: 'dark', label: 'Dark Mode', icon: Moon },
          { id: 'system', label: 'Follow System Theme', icon: Settings }
        ].map(opt => {
          const active = themeMode === opt.id;
          return (
            <TouchableOpacity
              key={opt.id}
              style={[
                styles.optionTile,
                { backgroundColor: t.card, borderColor: t.border },
                active && { borderColor: B.orange, borderWidth: 1 }
              ]}
              onPress={() => {
                setThemeMode(opt.id as AppTheme);
                setToast(`Appearance changed to ${opt.label}`);
              }}
            >
              <opt.icon size={18} color={active ? B.orange : t.text} />
              <Text style={[styles.optionLabel, { color: t.text, marginLeft: 12 }, active && { color: B.orange, fontWeight: 'bold' }]}>
                {opt.label}
              </Text>
              {active && <Check size={16} color={B.orange} style={{ marginLeft: 'auto' }} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  backIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '900',
    marginLeft: 12,
  },
  optionTile: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
  },
  optionLabel: {
    fontSize: 14,
  },
});
