import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { ArrowLeft, Tag } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
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

export default function OffersScreen() {
  const {
    back,
    t
  } = useAppContext();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }}>
      <View style={[styles.headerBar, { borderBottomColor: t.border }]}>
        <TouchableOpacity onPress={back} style={[styles.backIconCircle, { backgroundColor: t.surface }]}>
          <ArrowLeft size={16} color={t.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: t.text }]}>Wallet Coupons</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        {[
          { code: 'WELCOME50', discount: '₹50 CASHBACK', desc: 'Valid on subscription tier activations' },
          { code: 'SAVE20', discount: '20% DISCOUNT', desc: 'Save 20% on weekly lunch/dinner dabbas' },
          { code: 'REFER100', discount: '₹100 CREDITS', desc: 'Get ₹100 instantly for every new signup' }
        ].map(c => (
          <View key={c.code} style={[styles.couponTile, { backgroundColor: t.card, borderColor: t.border }]}>
            <Tag size={20} color={B.orange} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={{ fontSize: 15, fontWeight: '900', color: B.orange }}>{c.code}</Text>
              <Text style={{ fontSize: 13, fontWeight: 'bold', color: t.text, marginTop: 2 }}>{c.discount}</Text>
              <Text style={{ fontSize: 11, color: t.muted, marginTop: 2 }}>{c.desc}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
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
  couponTile: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
  },
});
