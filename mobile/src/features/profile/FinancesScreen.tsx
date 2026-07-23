import React from 'react';
import { View, Platform, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { ArrowLeft, Wallet, Gift, Share2, Tag, ChevronRight, FileText, CheckCircle2 } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import {
  theme,
  Text,
  Button,
  PageLayout,
  Card,
  InfoCard,
  HeroCard
} from '../../design-system';
import { BottomTabNav } from '../../core/components/BottomTabNav';

export default function FinancesScreen() {
  const {
    back,
    setToast,
    go,
    t,
    isDark
  } = useAppContext();

  const transactions = [
    { id: '1', title: 'Plan Renewal: Monthly Veg', amount: '-₹1,850', date: '12-07-2026', status: 'Success' },
    { id: '2', title: 'Top-up Wallet credit', amount: '+₹1,000', date: '08-07-2026', status: 'Success' },
    { id: '3', title: 'Single Dabba purchase', amount: '-₹95', date: '04-07-2026', status: 'Success' },
    { id: '4', title: 'Lunch refund: Skipped slot', amount: '+₹65', date: '01-07-2026', status: 'Success' }
  ];

  const coupons = [
    { code: 'FIRSTDABBA', desc: 'Get ₹100 off on your first monthly subscription renewal.' },
    { code: 'HEALTHY20', desc: 'Get 20% off on premium steel dabba insulation packages.' }
  ];

  const invoices = [
    { id: 'INV-2026-003', date: '12 Jul 2026', amount: '₹1,850' },
    { id: 'INV-2026-002', date: '12 Jun 2026', amount: '₹1,850' },
    { id: 'INV-2026-001', date: '12 May 2026', amount: '₹1,850' }
  ];

  const refCode = "KOI50REWARD";

  return (
    <PageLayout style={{ paddingHorizontal: 0 }} background="organic" backgroundVariant="minimal">
      {/* HEADER */}
      <View style={[styles.headerContainer, { borderColor: t.border, backgroundColor: t.card }]}>
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
        <Text style={[styles.headerTitle, { color: t.text }]}>Finances & Loyalty</Text>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* HERO SECTION - WALLET */}
        <View style={styles.sectionContainer}>
          <HeroCard style={{ padding: 24, borderRadius: 24, backgroundColor: t.primary, borderWidth: 0 }}>
            <View style={styles.walletHeaderRow}>
              <View style={styles.walletTitleCol}>
                <Wallet size={20} color="#FFFFFF" />
                <Text style={styles.walletLabel}>Dabba Wallet Balance</Text>
              </View>
              <View style={styles.verifiedChip}>
                <Text style={styles.verifiedText}>✓ SECURED</Text>
              </View>
            </View>
            <Text style={styles.walletValue}>₹1,250</Text>
            <Text style={styles.walletSubText}>Automatically used for renewals & single order checkouts.</Text>
            
            <View style={styles.walletActionRow}>
              <Button
                title="Add Money"
                variant="primary"
                size="medium"
                style={{ flex: 1, backgroundColor: t.secondary, borderColor: t.secondary, height: 46 }}
                onPress={() => setToast('💳 Payment gateway simulation completed.')}
              />
              <Button
                title="Refund to Bank"
                variant="outline"
                size="medium"
                style={{ flex: 1, borderColor: '#FFFFFF', borderWidth: 1.5, height: 46 }}
                onPress={() => setToast('💸 Refund request initiated successfully.')}
              />
            </View>
          </HeroCard>
        </View>

        {/* LOYALTY REWARDS SECTION */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: t.text }]}>Rewards & Streaks</Text>
          <Card style={{ padding: 20, backgroundColor: t.card, borderColor: t.border, borderRadius: 20 }}>
            <View style={styles.rewardsRow}>
              <View>
                <Text style={[styles.pointsLabel, { color: t.sub }]}>Loyalty Balance</Text>
                <Text style={[styles.pointsValue, { color: t.text }]}>1,250 pts</Text>
                <Text style={[styles.pointsSub, { color: t.primary }]}>Gold Tier Member</Text>
              </View>
              <View style={[styles.rewardsIconWrapper, { backgroundColor: t.surface, borderColor: t.border }]}>
                <Gift size={24} color={t.secondary} />
              </View>
            </View>
            
            {/* Milestone tracker */}
            <View style={[styles.milestoneBlock, { backgroundColor: t.surface, borderColor: t.border }]}>
              <Text style={[styles.milestoneText, { color: t.text }]}>⭐ 250 more points to Platinum</Text>
              <View style={[styles.progressBarTrack, { backgroundColor: t.border }]}>
                <View style={[styles.progressBarFill, { width: '83%', backgroundColor: t.accent }]} />
              </View>
            </View>

            <Button
              title="Redeem points for Wallet Credit"
              variant="outline"
              size="medium"
              onPress={() => setToast('🎉 Redeemed 100 points! ₹100 added to wallet.')}
            />
          </Card>
        </View>

        {/* REFERRAL REWARDS SECTION */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: t.text }]}>Refer & Earn</Text>
          <InfoCard style={{ padding: 18, borderRadius: 20, backgroundColor: t.card, borderColor: t.border }}>
            <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center', marginBottom: 12 }}>
              <Share2 size={22} color={t.primary} />
              <Text style={[styles.referTitle, { color: t.text }]}>Share the Goodness</Text>
            </View>
            <Text style={[styles.referDesc, { color: t.sub }]}>
              Both you and your referred friend get <Text style={{ color: t.secondary, fontWeight: 'bold' }}>50 rewards coins</Text> (₹50 value) instantly when they complete their first monthly checkout!
            </Text>
            <View style={[styles.codeContainer, { backgroundColor: t.surface, borderColor: t.border }]}>
              <Text style={[styles.codeLabel, { color: t.sub }]}>YOUR UNIQUE CODE</Text>
              <Text style={[styles.codeText, { color: t.primary }]}>{refCode}</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 12, marginTop: 12 }}>
              <Button
                title="Copy Code"
                variant="outline"
                size="small"
                style={{ flex: 1 }}
                onPress={() => {
                  setToast(`📋 Referral code copied!`);
                }}
              />
              <Button
                title="Share Link"
                variant="primary"
                size="small"
                style={{ flex: 1, backgroundColor: t.primary, borderColor: t.primary }}
                onPress={() => {
                  setToast('🔗 Share sheet simulation loaded.');
                }}
              />
            </View>
          </InfoCard>
        </View>

        {/* TRANSACTIONS SECTION */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: t.text }]}>Transaction History</Text>
          <Card style={{ padding: 0, overflow: 'hidden', borderWidth: 1, borderColor: t.border, backgroundColor: t.card }}>
            {transactions.map((tx, idx) => (
              <View
                key={tx.id}
                style={[
                  styles.transactionItem,
                  { backgroundColor: t.card, borderBottomColor: t.border },
                  idx === transactions.length - 1 ? { borderBottomWidth: 0 } : undefined
                ]}
              >
                <View style={{ flex: 1.8 }}>
                  <Text style={[styles.txTitle, { color: t.text }]}>{tx.title}</Text>
                  <Text style={[styles.txMeta, { color: t.sub }]}>{tx.date} · {tx.status}</Text>
                </View>
                <View style={{ flex: 1.2, alignItems: 'flex-end' }}>
                  <Text style={[
                    styles.txAmount,
                    { color: tx.amount.startsWith('+') ? t.primary : t.secondary }
                  ]}>
                    {tx.amount}
                  </Text>
                </View>
              </View>
            ))}
          </Card>
        </View>

        {/* COUPONS SECTION */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: t.text }]}>Available Coupons</Text>
          <View style={{ gap: 12 }}>
            {coupons.map((coupon, idx) => (
              <Card key={idx} style={{ padding: 16, borderRadius: 20, backgroundColor: t.card, borderColor: t.border }}>
                <View style={styles.couponHeader}>
                  <View style={[styles.couponBadge, { borderColor: t.secondary, backgroundColor: isDark ? 'rgba(215,132,86,0.15)' : 'rgba(201,107,60,0.08)' }]}>
                    <Tag size={12} color={t.secondary} style={{ marginRight: 4 }} />
                    <Text style={[styles.couponBadgeText, { color: t.secondary }]}>{coupon.code}</Text>
                  </View>
                  <TouchableOpacity onPress={() => setToast(`🎉 Coupon ${coupon.code} applied!`)}>
                    <Text style={[styles.couponCopyText, { color: t.primary }]}>APPLY COUPON</Text>
                  </TouchableOpacity>
                </View>
                <Text style={[styles.couponDesc, { color: t.sub }]}>{coupon.desc}</Text>
              </Card>
            ))}
          </View>
        </View>

        {/* INVOICES SECTION */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: t.text }]}>Billing Invoices</Text>
          <Card style={{ padding: 0, overflow: 'hidden', borderWidth: 1, borderColor: t.border, backgroundColor: t.card }}>
            {invoices.map((inv, idx) => (
              <TouchableOpacity
                key={inv.id}
                onPress={() => setToast(`📥 Downloading ${inv.id}...`)}
                style={[
                  styles.invoiceItem,
                  { backgroundColor: t.card, borderBottomColor: t.border },
                  idx === invoices.length - 1 ? { borderBottomWidth: 0 } : undefined
                ]}
              >
                <View style={styles.invoiceLeft}>
                  <FileText size={18} color={t.primary} />
                  <View>
                    <Text style={[styles.invoiceId, { color: t.text }]}>{inv.id}</Text>
                    <Text style={[styles.invoiceDate, { color: t.sub }]}>{inv.date}</Text>
                  </View>
                </View>
                <View style={styles.invoiceRight}>
                  <Text style={[styles.invoiceAmount, { color: t.text }]}>{inv.amount}</Text>
                  <ChevronRight size={16} color={t.sub} />
                </View>
              </TouchableOpacity>
            ))}
          </Card>
        </View>

      </ScrollView>

      {/* Bottom Navigation */}
      <BottomTabNav active="profile" />
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: theme.spacing.screenHorizontal,
    paddingTop: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  headerTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 18,
    color: '#4B5D3A',
    fontWeight: '700',
    marginLeft: 16,
    textTransform: 'uppercase',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  heroSection: {
    paddingHorizontal: theme.spacing.screenHorizontal,
    marginTop: theme.spacing.screenVertical,
  },
  walletHeroCard: {
    padding: 24,
    borderRadius: 24,
    backgroundColor: '#4B5D3A',
    borderWidth: 0,
  },
  walletHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  walletTitleCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  walletLabel: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12,
    color: '#FCFAF6',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  verifiedChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  verifiedText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 9,
    color: '#FFFFFF',
    fontWeight: '900',
  },
  walletValue: {
    fontFamily: theme.typography.monoFamily,
    fontSize: 34,
    color: '#FFFFFF',
    fontWeight: '900',
    marginTop: 10,
  },
  walletSubText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12,
    color: '#F4EFE6',
    marginTop: 6,
    opacity: 0.9,
    lineHeight: 16,
  },
  walletActionRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  walletBtnPrimary: {
    flex: 1,
    backgroundColor: '#C96B3C',
    borderColor: '#C96B3C',
    height: 46,
  },
  walletBtnOutline: {
    flex: 1,
    borderColor: '#FCFAF6',
    borderWidth: 1.5,
    height: 46,
  },
  sectionContainer: {
    paddingHorizontal: theme.spacing.screenHorizontal,
    marginTop: 16,
  },
  sectionTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 15,
    color: '#1F1F1F',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  rewardsCard: {
    padding: 20,
    backgroundColor: '#F4EFE6',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  rewardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointsLabel: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12.5,
    color: '#8A857B',
    fontWeight: '600',
  },
  pointsValue: {
    fontFamily: theme.typography.monoFamily,
    fontSize: 26,
    color: '#1F1F1F',
    fontWeight: '800',
    marginTop: 2,
  },
  pointsSub: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12,
    color: '#4B5D3A',
    fontWeight: '700',
    marginTop: 2,
  },
  rewardsIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FCFAF6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  milestoneBlock: {
    marginTop: 16,
    marginBottom: 16,
    backgroundColor: '#FCFAF6',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  milestoneText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 11.5,
    color: '#1F1F1F',
    fontWeight: '700',
  },
  progressBarTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E8E2D8',
    marginTop: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  referCard: {
    padding: 18,
    borderRadius: 20,
    backgroundColor: '#F4EFE6',
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  referTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 15,
    color: '#1F1F1F',
    fontWeight: '700',
  },
  referDesc: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12.5,
    color: '#8A857B',
    lineHeight: 17,
  },
  codeContainer: {
    backgroundColor: '#FCFAF6',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E2D8',
    padding: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  codeLabel: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 10,
    color: '#8A857B',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  codeText: {
    fontFamily: theme.typography.monoFamily,
    fontSize: 18,
    color: '#4B5D3A',
    fontWeight: '900',
    marginTop: 2,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E2D8',
    backgroundColor: '#F4EFE6',
  },
  txTitle: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 13.5,
    color: '#1F1F1F',
    fontWeight: '700',
  },
  txMeta: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 11.5,
    color: '#8A857B',
    marginTop: 2,
  },
  txAmount: {
    fontFamily: theme.typography.monoFamily,
    fontSize: 14,
    fontWeight: '800',
  },
  couponCard: {
    padding: 16,
    borderRadius: 20,
    backgroundColor: '#F4EFE6',
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  couponHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  couponBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(201, 107, 60, 0.08)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#C96B3C',
  },
  couponBadgeText: {
    fontFamily: theme.typography.monoFamily,
    fontSize: 12,
    color: '#C96B3C',
    fontWeight: '800',
  },
  couponCopyText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12,
    color: '#4B5D3A',
    fontWeight: '800',
  },
  couponDesc: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12,
    color: '#8A857B',
    lineHeight: 16,
  },
  invoiceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E2D8',
    backgroundColor: '#F4EFE6',
  },
  invoiceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  invoiceId: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 13.5,
    color: '#1F1F1F',
    fontWeight: '700',
  },
  invoiceDate: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 11.5,
    color: '#8A857B',
    marginTop: 2,
  },
  invoiceRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  invoiceAmount: {
    fontFamily: theme.typography.monoFamily,
    fontSize: 13,
    color: '#1F1F1F',
    fontWeight: '700',
  },
});
