import React from 'react';
import { View, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { ArrowLeft, Share2 } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import {
  theme,
  Text,
  Button,
  PageLayout,
  Card
} from '../../design-system';

export default function ReferScreen() {
  const {
    back,
    setToast,
  } = useAppContext();

  const refCode = "KOI50REWARD";

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
        <Text variant="title" color="primary" style={{ marginLeft: 16 }}>REFER & EARN</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 20, paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
        
        <View style={{ marginBottom: theme.spacing.lg }}>
          <Text variant="title" color="primary">Share the Goodness</Text>
          <Text variant="caption" color="sub" style={{ marginTop: 4, lineHeight: 18 }}>
            Invite friends to taste the comfort of pure home-cooked meal subscription plans.
          </Text>
        </View>

        <Card style={{ alignItems: 'center', padding: 24, gap: theme.spacing.md }}>
          <Share2 size={36} color={theme.colors.secondary} />
          
          <View style={{ alignItems: 'center' }}>
            <Text variant="body" color="text" style={{ fontWeight: '800', textAlign: 'center' }}>Referral Bonus Rewards</Text>
            <Text variant="caption" color="sub" style={{ textAlign: 'center', marginTop: 4, lineHeight: 16 }}>
              Both you and your referred friend get <Text variant="caption" color="secondary" style={{ fontWeight: 'bold' }}>50 rewards coins</Text> (₹50 value) instantly when they complete their first monthly checkout!
            </Text>
          </View>

          <View style={{
            backgroundColor: theme.colors.light.surface,
            borderRadius: 16,
            borderWidth: 1.5,
            borderColor: theme.colors.light.border,
            paddingVertical: 12,
            paddingHorizontal: 20,
            width: '100%',
            alignItems: 'center',
            marginVertical: 12,
          }}>
            <Text variant="label" color="muted" style={{ fontWeight: '700', letterSpacing: 0.5, marginBottom: 4 }}>YOUR UNIQUE CODE</Text>
            <Text variant="mono" color="primary" style={{ fontSize: 20, fontWeight: '900' }}>{refCode}</Text>
          </View>

          <View style={{ flexDirection: 'row', gap: theme.spacing.md, width: '100%' }}>
            <Button
              title="Copy Code"
              variant="outline"
              size="medium"
              style={{ flex: 1 }}
              onPress={() => {
                setToast(`📋 Referral code copied!`);
              }}
            />
            <Button
              title="Share Link"
              variant="primary"
              size="medium"
              style={{ flex: 1 }}
              onPress={() => {
                setToast('🔗 Share sheet simulation loaded.');
              }}
            />
          </View>
        </Card>
      </ScrollView>
    </PageLayout>
  );
}
