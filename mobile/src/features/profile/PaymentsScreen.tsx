import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { ArrowLeft, Wallet, Plus } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import { theme, F, Button } from '../../design-system';
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
    content.includes('km') ||
    content.includes('.') ||
    content.includes(',')
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

export default function PaymentsScreen() {
  const {
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
        <Text style={[styles.headerTitle, { color: t.text }]}>Wallet & Payments</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Balance card */}
        <View style={[styles.loyaltyProgressBox, { backgroundColor: t.card, borderColor: t.border }]}>
          <Wallet size={36} color={B.orange} />
          <Text style={{ fontSize: 24, fontWeight: '900', color: t.text, marginTop: 10 }}>₹1,250.00</Text>
          <Text style={{ fontSize: 12, color: t.muted }}>Available Wallet Balance</Text>
          
          <View style={{ width: '100%', marginTop: 14 }}>
            <Button
              title="Add ₹500.00"
              onPress={() => {
                setToast("Successfully added ₹500.00 to your wallet!");
              }}
              style={{ height: 40, borderRadius: 20 }}
            />
          </View>
        </View>

        {/* Transaction logs */}
        <Text style={[styles.sectionSubTitle, { color: t.text, marginTop: 24, marginBottom: 12 }]}>Wallet Statement Logs</Text>
        <View style={{ borderRadius: 16, overflow: 'hidden', borderWidth: 1.5, borderColor: t.border, backgroundColor: t.card }}>
          {[
            { title: 'Monsoon Referral Promo Credit', amt: '+₹100.00', date: 'Jul 10, 2026', col: B.green },
            { title: 'Subscribed Monthly Dabba Tier', amt: '−₹3,999.00', date: 'Jul 08, 2026', col: '#EF4444' },
            { title: 'Money Added via Card UPI', amt: '+₹4,000.00', date: 'Jul 08, 2026', col: B.green }
          ].map((tx, i) => (
            <View key={i} style={[styles.ingRow, i > 0 && { borderTopWidth: 1, borderTopColor: t.border }]}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: t.text }} numberOfLines={1}>{tx.title}</Text>
                <Text style={{ fontSize: 10, color: t.muted, marginTop: 2 }}>{tx.date}</Text>
              </View>
              <Text style={{ fontSize: 13, fontWeight: '900', color: tx.col }}>{tx.amt}</Text>
            </View>
          ))}
        </View>
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
  loyaltyProgressBox: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
  },
  sectionSubTitle: {
    fontSize: 14,
    fontWeight: '900',
  },
  ingRow: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
});
