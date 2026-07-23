import React from 'react';
import { View, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { ArrowLeft, Tag, Check } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import {
  theme,
  Text,
  Button,
  PageLayout,
  Card
} from '../../design-system';

export default function OffersScreen() {
  const {
    back,
    setToast,
    t,
    isDark,
  } = useAppContext();

  const coupons = [
    { code: 'FIRSTDABBA', desc: 'Get ₹100 off on your first monthly subscription renewal.', status: 'Active' },
    { code: 'HEALTHY20', desc: 'Get 20% off on premium steel dabba insulation packages.', status: 'Active' },
    { code: 'REFERCOIN', desc: 'Get 50 rewards coins on successful referrals.', status: 'Active' }
  ];

  return (
    <PageLayout style={{ paddingHorizontal: 0 }} background="organic" backgroundVariant="clean">
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
        <Text variant="title" color="primary" style={{ marginLeft: 16 }}>OFFERS & COUPONS</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 20, paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
        
        <View style={{ marginBottom: theme.spacing.lg }}>
          <Text variant="title" color="primary">Available Coupons</Text>
          <Text variant="caption" color="sub" style={{ marginTop: 4 }}>
            Apply these codes during checkout to avail of discounts.
          </Text>
        </View>

        {coupons.length === 0 ? (
          <View style={{ alignItems: 'center', paddingVertical: 40 }}>
            <Tag size={40} color={t.muted} />
            <Text variant="body" color="sub" style={{ fontWeight: '700', marginTop: 16, textAlign: 'center' }}>No active offers</Text>
            <Text variant="caption" color="muted" style={{ marginTop: 6, textAlign: 'center' }}>Check back soon for new discounts!</Text>
          </View>
        ) : (
          <View style={{ gap: 16 }}>
            {coupons.map((coupon, idx) => (
              <Card key={idx} style={{ padding: 16 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <View style={{ backgroundColor: isDark ? 'rgba(201,107,60,0.18)' : 'rgba(201, 107, 60, 0.08)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, borderWidth: 1, borderStyle: 'dashed', borderColor: t.secondary }}>
                    <Text variant="mono" color="secondary" style={{ fontWeight: '900', fontSize: 13 }}>{coupon.code}</Text>
                  </View>
                  <View style={{ backgroundColor: isDark ? 'rgba(75,93,58,0.2)' : 'rgba(75, 93, 58, 0.08)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>
                    <Text variant="label" color="primary" style={{ fontWeight: '900', fontSize: 9 }}>{coupon.status.toUpperCase()}</Text>
                  </View>
                </View>
                
                <Text variant="caption" color="sub" style={{ lineHeight: 16 }}>{coupon.desc}</Text>
                
                <Button
                  title="Copy Code"
                  variant="outline"
                  size="small"
                  style={{ marginTop: 12, height: 32 }}
                  onPress={() => {
                    setToast(`📋 Code ${coupon.code} copied!`);
                  }}
                />
              </Card>
            ))}
          </View>
        )}
      </ScrollView>
    </PageLayout>
  );
}
