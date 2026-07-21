import React from 'react';
import { View, Platform, ScrollView } from 'react-native';
import { ArrowLeft, Gift } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import {
  theme,
  Text,
  Button,
  PageLayout,
  Card,
  StatisticCard
} from '../../design-system';

export default function RewardsScreen() {
  const {
    back,
    setToast,
  } = useAppContext();

  const rewardsHistory = [
    { id: '1', title: 'Earned: Referral signup bonus', pts: '+50 pts', date: '12-07-2026' },
    { id: '2', title: 'Earned: 10 daily meals streak bonus', pts: '+30 pts', date: '09-07-2026' },
    { id: '3', title: 'Redeemed: ₹100 renewal coupon', pts: '-100 pts', date: '04-07-2026' },
    { id: '4', title: 'Earned: Weekly sanitization feedback', pts: '+15 pts', date: '01-07-2026' }
  ];

  return (
    <PageLayout style={{ paddingHorizontal: 0 }}>
      {/* Top Header Bar */}
      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: theme.colors.light.border, backgroundColor: theme.colors.light.surface }}>
        <Button
          onlyIcon
          variant="ghost"
          size="medium"
          onPress={back}
          iconLeft={<ArrowLeft size={16} color={theme.colors.light.text} />}
          style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: theme.colors.light.surface }}
        />
        <Text variant="title" color="primary" style={{ marginLeft: 16 }}>KOI KOI REWARDS</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 20, paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
        
        {/* Points balance */}
        <StatisticCard style={{ alignItems: 'flex-start', padding: 20, marginBottom: 24 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'stretch', marginBottom: 6 }}>
            <Text variant="caption" color="sub" style={{ fontWeight: 'bold' }}>LOYALTY REWARDS BALANCE</Text>
            <Gift size={18} color={theme.colors.secondary} />
          </View>
          <Text variant="display" color="text" style={{ fontSize: 32, fontWeight: '900' }}>320 pts</Text>
          <Text variant="caption" color="sub" style={{ marginTop: 2, marginBottom: 16 }}>Every 100 points can be redeemed for ₹100 direct wallet credit.</Text>
          
          <Button
            title="Redeem 100 points (₹100)"
            variant="primary"
            size="medium"
            onPress={() => setToast('🎉 Redeemed 100 points! ₹100 added to wallet.')}
          />
        </StatisticCard>

        {/* History log list */}
        <Text variant="label" color="text" style={{ fontWeight: '900', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>Points History Log</Text>
        
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          {rewardsHistory.map((item, idx) => (
            <View
              key={item.id}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 16,
                borderBottomWidth: idx === rewardsHistory.length - 1 ? 0 : 1,
                borderBottomColor: theme.colors.light.border,
                backgroundColor: theme.colors.light.surface
              }}
            >
              <View style={{ flex: 1.8 }}>
                <Text variant="body" color="text" style={{ fontWeight: '700' }}>{item.title}</Text>
                <Text variant="caption" color="sub" style={{ marginTop: 2 }}>{item.date}</Text>
              </View>
              <View style={{ flex: 1.2, alignItems: 'flex-end' }}>
                <Text variant="mono" color={item.pts.startsWith('+') ? 'primary' : 'secondary'} style={{ fontWeight: '800' }}>
                  {item.pts}
                </Text>
              </View>
            </View>
          ))}
        </Card>
      </ScrollView>
    </PageLayout>
  );
}
