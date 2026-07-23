import React from 'react';
import { View, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { ArrowLeft, Wallet, Check, ChevronRight } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import {
  theme,
  Text,
  Button,
  PageLayout,
  Card,
  StatisticCard
} from '../../design-system';

export default function PaymentsScreen() {
  const {
    back,
    setToast,
    t,
  } = useAppContext();

  const transactions = [
    { id: '1', title: 'Plan Renewal: Monthly Veg', amount: '-₹1,850', date: '12-07-2026', status: 'Success' },
    { id: '2', title: 'Top-up Wallet credit', amount: '+₹1,000', date: '08-07-2026', status: 'Success' },
    { id: '3', title: 'Single Dabba purchase', amount: '-₹95', date: '04-07-2026', status: 'Success' },
    { id: '4', title: 'Lunch refund: Skipped slot', amount: '+₹65', date: '01-07-2026', status: 'Success' }
  ];

  return (
    <PageLayout style={{ paddingHorizontal: 0 }}>
      {/* Top Header Bar */}
      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: t.border, backgroundColor: t.card }}>
        <Button
          onlyIcon
          variant="ghost"
          size="medium"
          onPress={back}
          iconLeft={<ArrowLeft size={16} color={t.text} />}
          style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: t.surface }}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        />
        <Text variant="title" color="primary" style={{ marginLeft: 16 }}>PAYMENTS & WALLET</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 20, paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
        
        {/* Wallet balance */}
        <StatisticCard style={{ alignItems: 'flex-start', padding: 20, marginBottom: 24 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'stretch', marginBottom: 6 }}>
            <Text variant="caption" color="sub" style={{ fontWeight: 'bold' }}>DABBA WALLET BALANCE</Text>
            <Wallet size={18} color={theme.colors.secondary} />
          </View>
          <Text variant="display" color="text" style={{ fontSize: 32, fontWeight: '900' }}>₹1,250</Text>
          <Text variant="caption" color="sub" style={{ marginTop: 2, marginBottom: 16 }}>This amount is automatically used for renewals & single order checkouts.</Text>
          
          <View style={{ flexDirection: 'row', gap: 12, width: '100%' }}>
            <Button
              title="Add Money"
              variant="primary"
              size="medium"
              style={{ flex: 1 }}
              onPress={() => setToast('💳 Payment gateway simulation completed.')}
            />
            <Button
              title="Refund to Bank"
              variant="outline"
              size="medium"
              style={{ flex: 1 }}
              onPress={() => setToast('💸 Refund request initiated successfully.')}
            />
          </View>
        </StatisticCard>

        {/* Transactions log list */}
        <Text variant="label" color="text" style={{ fontWeight: '900', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>Transaction History</Text>
        
        {transactions.length === 0 ? (
          <View style={{ alignItems: 'center', paddingVertical: 40 }}>
            <Text variant="body" color="sub" style={{ fontWeight: '700', marginTop: 16, textAlign: 'center' }}>No transactions yet</Text>
            <Text variant="caption" color="muted" style={{ marginTop: 6, textAlign: 'center' }}>Transactions will appear here after your first order.</Text>
          </View>
        ) : (
          <Card style={{ padding: 0, overflow: 'hidden' }}>
            {transactions.map((tx, idx) => (
              <View
                key={tx.id}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 16,
                  borderBottomWidth: idx === transactions.length - 1 ? 0 : 1,
                  borderBottomColor: t.border,
                  backgroundColor: t.card,
                }}
              >
                <View style={{ flex: 1.8 }}>
                  <Text variant="body" color="text" style={{ fontWeight: '700' }}>{tx.title}</Text>
                  <Text variant="caption" color="sub" style={{ marginTop: 2 }}>{tx.date} · {tx.status}</Text>
                </View>
                <View style={{ flex: 1.2, alignItems: 'flex-end' }}>
                  <Text variant="mono" color={tx.amount.startsWith('+') ? 'primary' : 'secondary'} style={{ fontWeight: '800' }}>
                    {tx.amount}
                  </Text>
                </View>
              </View>
            ))}
          </Card>
        )}
      </ScrollView>
    </PageLayout>
  );
}
