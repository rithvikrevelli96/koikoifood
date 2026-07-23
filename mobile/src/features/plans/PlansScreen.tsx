import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { ArrowLeft, ChevronRight, Check } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import {
  theme,
  Text,
  Button,
  PageLayout,
  PlanCard,
  HeroCard,
  Card,
  BottomSheet
} from '../../design-system';
import { PLANS } from '../../core/constants/meals';
import { BottomTabNav } from '../../core/components/BottomTabNav';

export default function PlansScreen() {
  const {
    selectedPlanId,
    setSelectedPlanId,
    paused,
    setPaused,
    subscribed,
    setSubscribed,
    showManageOptions,
    setShowManageOptions,
    setToast,
    back,
    go,
    switchTab,
    t,
    isDark,
  } = useAppContext();

  const [expandedPlanId, setExpandedPlanId] = useState<string | null>(null);
  const [planCategory, setPlanCategory] = useState<'all' | 'individual' | 'specialty'>('all');

  const currentPlanId = 'monthly';
  const currentPlanName = "Monthly Subscription";
  const currentPlanDetails = "Day 3 of 30";
  const nextDeliveryTime = "Tomorrow • 12:30 PM";

  const selectedPlan = PLANS.find(p => p.id === selectedPlanId);
  const isCurrentSelected = selectedPlanId === currentPlanId;

  const handleSelectPlan = (planId: string) => {
    setSelectedPlanId(planId);
    if (expandedPlanId === planId) {
      setExpandedPlanId(null);
    } else {
      setExpandedPlanId(planId);
    }
  };

  const handleUpgradePress = () => {
    if (!selectedPlan) return;
    if (subscribed && isCurrentSelected) {
      setShowManageOptions(true);
    } else {
      setToast(`🎉 Redirecting to checkout for ${selectedPlan.name}...`);
      go('subscribe_flow');
    }
  };

  const benefits = [
    { title: 'Pure Home-Cooked Quality', desc: 'Meals prepared in home-style smart kitchens with zero preservatives.' },
    { title: 'Delivered in Stainless Steel', desc: 'Eco-safe, warm, insulated steel dabbas delivered daily.' },
    { title: 'Complete Pausing Flexibility', desc: 'Pause or skip deliveries online before the cutoff timers.' },
  ];

  // Filter plans based on selected segment
  const displayedPlans = PLANS.filter(p => {
    if (planCategory === 'individual') return ['daily', 'weekly', 'monthly'].includes(p.id);
    if (planCategory === 'specialty') return ['family', 'student', 'corporate'].includes(p.id);
    return true;
  });

  return (
    <PageLayout style={{ paddingHorizontal: 0 }} background="organic" backgroundVariant="minimal">

      {/* HEADER */}
      <View style={[styles.headerContainer, { backgroundColor: t.bg }]}>
        <TouchableOpacity onPress={back} style={[styles.backBtn, { backgroundColor: t.surface, borderColor: t.border }]} activeOpacity={0.7}>
          <ArrowLeft size={20} color={t.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: t.text }]}>Subscription Plans</Text>
      </View>

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* NON-SUBSCRIBED HEADER */}
        {!subscribed && (
          <View style={styles.messageContainer}>
            <Text style={[styles.messageTitle, { color: t.text }]}>Choose Your Plan</Text>
            <Text style={[styles.messageText, { color: t.sub }]}>
              You don't have an active subscription yet.{"\n"}Choose a plan to get started.
            </Text>
          </View>
        )}

        {/* CURRENT PLAN (Only show if subscribed) */}
        {subscribed && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionLabel}>Current Plan</Text>
              <View style={styles.activeStatusChip}>
                <Text style={styles.activeStatusText}>🟢 ACTIVE</Text>
              </View>
            </View>

            <HeroCard style={styles.currentPlanHero}>
              <Text style={styles.currentPlanLabel}>MONTHLY VEG DABBA</Text>
              <Text style={styles.currentPlanNameText}>{currentPlanName}</Text>
              <Text style={styles.currentPlanDurationText}>{currentPlanDetails}</Text>

              <View style={styles.nextDeliveryRow}>
                <Text style={styles.nextDeliveryLabel}>Next Delivery</Text>
                <Text style={styles.nextDeliveryValue}>{nextDeliveryTime}</Text>
              </View>

              <Button
                title="Manage Plan"
                variant="outline"
                size="medium"
                style={styles.managePlanBtn}
                onPress={() => setShowManageOptions(true)}
              />
            </HeroCard>
          </View>
        )}

        {/* SUBSCRIPTION TIMELINE (Only show if subscribed) */}
        {subscribed && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionLabel}>Subscription Timeline</Text>
            <View style={styles.timelineCard}>
              <View style={styles.timelineRow}>
                <Text style={styles.timelineLabel}>Remaining Days</Text>
                <Text style={styles.timelineVal}>27 Days Left</Text>
              </View>
              <View style={styles.timelineTrack}>
                <View style={[styles.timelineFill, { width: '10%' }]} />
              </View>
              <Text style={styles.timelineProgressText}>3 of 30 days completed</Text>
            </View>
          </View>
        )}

        {/* BENEFITS */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionLabel, { color: t.sub }]}>Subscription Benefits</Text>
          <View style={[styles.benefitsContainer, { backgroundColor: t.card, borderColor: t.border }]}>
            {benefits.map((b, idx) => (
              <View key={idx} style={[styles.benefitRow, { borderBottomColor: t.border }]}>
                <View style={[styles.benefitCheckCircle, { backgroundColor: isDark ? 'rgba(122, 147, 104, 0.2)' : 'rgba(75, 93, 58, 0.08)' }]}>
                  <Check size={12} color={t.primary} strokeWidth={3} />
                </View>
                <View style={styles.benefitTextCol}>
                  <Text style={[styles.benefitTitle, { color: t.text }]}>{b.title}</Text>
                  <Text style={[styles.benefitDesc, { color: t.sub }]}>{b.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* AVAILABLE PLANS CATALOG */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionLabel}>{subscribed ? "Other Available Plans" : "Subscription Catalog"}</Text>
          
          {/* Segmented Category Filter Pills */}
          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 14 }}>
            {[
              { id: 'all', label: 'All Plans' },
              { id: 'individual', label: 'Individual' },
              { id: 'specialty', label: 'Specialty & Office' },
            ].map(tab => {
              const isActive = planCategory === tab.id;
              return (
                <TouchableOpacity
                  key={tab.id}
                  activeOpacity={0.8}
                  onPress={() => setPlanCategory(tab.id as any)}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 14,
                    backgroundColor: isActive ? '#4B5D3A' : '#F4EFE6',
                    borderWidth: 1,
                    borderColor: isActive ? '#4B5D3A' : '#E8E2D8',
                  }}
                >
                  <Text style={{
                    fontFamily: theme.typography.bodyFamily,
                    fontSize: 11.5,
                    color: isActive ? '#FFFFFF' : '#1F1F1F',
                    fontWeight: isActive ? '700' : '600',
                  }}>
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.plansListContainer}>
            {displayedPlans.map((plan) => {
              const isSelected = selectedPlanId === plan.id;
              const isCurrent = subscribed && plan.id === currentPlanId;
              const isExpanded = expandedPlanId === plan.id;

              return (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  selected={isSelected}
                  expanded={isExpanded}
                  onPress={() => handleSelectPlan(plan.id)}
                  isCurrent={isCurrent}
                />
              );
            })}
          </View>
        </View>

        {/* BILLING & RENEWAL (subscribed only) */}
        {subscribed && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionLabel}>Billing & Renewal</Text>
            <View style={styles.infoCard}>
              <View style={styles.billingRow}>
                <Text style={styles.billingLabel}>Next Renewal</Text>
                <Text style={styles.billingValue}>12 Aug 2026</Text>
              </View>
              <View style={styles.cardDivider} />
              <View style={styles.billingRow}>
                <Text style={styles.billingLabel}>Payment Method</Text>
                <Text style={styles.billingValue}>•••• 4821</Text>
              </View>
              <View style={styles.cardDivider} />
              <View style={styles.billingRow}>
                <Text style={styles.billingLabel}>Auto Renewal</Text>
                <Text style={[styles.billingValue, { color: '#4B5D3A', fontWeight: '700' }] as any}>Enabled</Text>
              </View>
              <View style={styles.cardDivider} />
              <TouchableOpacity
                style={styles.billingInvoiceRow}
                onPress={() => go('finances')}
                activeOpacity={0.7}
              >
                <Text style={styles.billingInvoiceText}>View Invoices & Billing History</Text>
                <ChevronRight size={14} color="#8A857B" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* SUBSCRIPTION HISTORY (subscribed only) */}
        {subscribed && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionLabel}>Subscription History</Text>
            <View style={styles.infoCard}>
              <View style={styles.historyRow}>
                <View>
                  <Text style={styles.historyPlanTitle}>Monthly Veg</Text>
                  <Text style={styles.historyDuration}>Jan – Mar</Text>
                </View>
                <Text style={styles.historyStatusText}>Completed</Text>
              </View>
              <View style={styles.cardDivider} />
              <View style={styles.historyRow}>
                <View>
                  <Text style={styles.historyPlanTitle}>Weekly Veg</Text>
                  <Text style={styles.historyDuration}>Apr – May</Text>
                </View>
                <Text style={styles.historyStatusText}>Completed</Text>
              </View>
              <View style={styles.cardDivider} />
              <View style={styles.historyRow}>
                <View>
                  <Text style={styles.historyPlanTitle}>Family Plan</Text>
                  <Text style={styles.historyDuration}>Current</Text>
                </View>
                <Text style={[styles.historyStatusText, { color: '#4B5D3A', fontWeight: '700' }] as any}>Active</Text>
              </View>
            </View>
          </View>
        )}

      </ScrollView>

      {/* BOTTOM SELECTED PLAN CHECKOUT BAR */}
      {selectedPlan && (
        <View style={[styles.bottomCtaContainer, { backgroundColor: t.card, borderColor: t.border }]}>
          <View style={styles.bottomCtaInfo}>
            <Text style={[styles.ctaPlanLabel, { color: t.sub }]}>Selected Plan</Text>
            <Text style={[styles.ctaPlanValue, { color: t.text }]}>{selectedPlan.name} · {selectedPlan.price}</Text>
          </View>
          <TouchableOpacity
            style={[styles.ctaButton, { backgroundColor: t.primary }]}
            onPress={handleUpgradePress}
            activeOpacity={0.85}
          >
            <Text style={styles.ctaButtonText}>
              {(subscribed && isCurrentSelected) ? "Manage Plan" : "Subscribe Now"}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Bottom Navigation */}
      <BottomTabNav active="plans" />

      {/* Manage Subscription Bottom Sheet */}
      <BottomSheet
        visible={showManageOptions}
        onClose={() => setShowManageOptions(false)}
        height={260}
      >
        <View style={styles.bottomSheetContent}>
          <Text style={styles.sheetTitle}>Manage Subscription</Text>
          <Button
            title={paused ? "Resume Subscription" : "Pause Subscription"}
            variant={paused ? "primary" : "outline"}
            size="medium"
            onPress={() => {
              setPaused(!paused);
              setShowManageOptions(false);
              setToast(paused ? '🟢 Subscription Resumed' : '🟡 Subscription Paused');
            }}
          />
          <Button
            title="Reschedule Next Delivery"
            variant="outline"
            size="medium"
            style={{ marginTop: 12 }}
            onPress={() => {
              setShowManageOptions(false);
              switchTab('home');
            }}
          />
        </View>
      </BottomSheet>
    </PageLayout>
  );
}

/* ─────────── STYLES ─────────── */
const styles = StyleSheet.create({
  /* ── Header ── */
  headerContainer: {
    paddingHorizontal: theme.spacing.screenHorizontal,
    paddingTop: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#E8E2D8',
    backgroundColor: '#F4EFE6',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 18,
    color: '#4B5D3A',
    fontWeight: '700',
    marginLeft: 12,
    textTransform: 'uppercase',
  },

  /* ── Scroll ── */
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 140,
  },

  /* ── Message / Empty State ── */
  messageContainer: {
    paddingHorizontal: theme.spacing.screenHorizontal,
    marginTop: 16,
    alignItems: 'center',
  },
  messageTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 22,
    color: '#1F1F1F',
    fontWeight: '800',
    textAlign: 'center',
  },
  messageText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 13.5,
    color: '#8A857B',
    textAlign: 'center',
    lineHeight: 19,
    marginTop: 6,
  },

  /* ── Sections ── */
  sectionContainer: {
    paddingHorizontal: theme.spacing.screenHorizontal,
    marginTop: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionLabel: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 14,
    color: '#1F1F1F',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },

  /* ── Current Plan Hero ── */
  currentPlanHero: {
    borderColor: '#4B5D3A',
    borderWidth: 1.5,
    backgroundColor: '#FCFAF6',
    padding: 20,
  },
  currentPlanLabel: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 10.5,
    color: '#8A857B',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  activeStatusChip: {
    backgroundColor: 'rgba(75, 93, 58, 0.08)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  activeStatusText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 10,
    color: '#4B5D3A',
    fontWeight: '800',
  },
  currentPlanNameText: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 22,
    color: '#1F1F1F',
    fontWeight: '700',
    marginTop: 8,
  },
  currentPlanDurationText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 13.5,
    color: '#8A857B',
    marginTop: 2,
  },
  nextDeliveryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    backgroundColor: '#F4EFE6',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  nextDeliveryLabel: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12,
    color: '#8A857B',
  },
  nextDeliveryValue: {
    fontFamily: theme.typography.monoFamily,
    fontSize: 12,
    color: '#1F1F1F',
    fontWeight: '700',
  },
  managePlanBtn: {
    marginTop: 16,
    borderColor: '#4B5D3A',
    height: 48,
  },

  /* ── Timeline ── */
  timelineCard: {
    padding: 16,
    backgroundColor: '#F4EFE6',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  timelineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timelineLabel: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 13,
    color: '#8A857B',
  },
  timelineVal: {
    fontFamily: theme.typography.monoFamily,
    fontSize: 13,
    color: '#1F1F1F',
    fontWeight: '700',
  },
  timelineTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E8E2D8',
    marginTop: 10,
    overflow: 'hidden',
  },
  timelineFill: {
    height: '100%',
    backgroundColor: '#4B5D3A',
    borderRadius: 4,
  },
  timelineProgressText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 11,
    color: '#8A857B',
    marginTop: 6,
    textAlign: 'center',
  },

  /* ── Benefits (compact — no minHeight cards) ── */
  benefitsContainer: {
    backgroundColor: '#F4EFE6',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E8E2D8',
    overflow: 'hidden',
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E2D8',
    gap: 12,
  },
  benefitCheckCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(75, 93, 58, 0.10)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
  },
  benefitTextCol: {
    flex: 1,
  },
  benefitTitle: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 13.5,
    color: '#1F1F1F',
    fontWeight: '700',
  },
  benefitDesc: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12,
    color: '#8A857B',
    lineHeight: 16,
    marginTop: 2,
  },

  /* ── Plans Catalog ── */
  plansListContainer: {
    gap: theme.spacing.cardGap,
    marginTop: 4,
  },

  /* ── Shared Info Card (no minHeight) ── */
  infoCard: {
    backgroundColor: '#F4EFE6',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E8E2D8',
    padding: 16,
  },

  /* ── Billing ── */
  billingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  billingLabel: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 13,
    color: '#8A857B',
  },
  billingValue: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 13,
    color: '#1F1F1F',
    fontWeight: '600',
  },
  billingInvoiceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  billingInvoiceText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 13,
    color: '#C96B3C',
    fontWeight: '700',
  },

  /* ── History ── */
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyPlanTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 14,
    color: '#1F1F1F',
    fontWeight: '700',
  },
  historyDuration: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 11,
    color: '#8A857B',
    marginTop: 2,
  },
  historyStatusText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12,
    color: '#8A857B',
    fontWeight: '600',
  },

  /* ── Shared ── */
  cardDivider: {
    height: 1,
    backgroundColor: '#E8E2D8',
    marginVertical: 10,
  },

  /* ── Bottom CTA Bar ── */
  bottomCtaContainer: {
    position: 'absolute',
    bottom: 84,
    left: 0,
    right: 0,
    backgroundColor: '#FCFAF6',
    borderTopWidth: 1,
    borderColor: '#E8E2D8',
    paddingHorizontal: theme.spacing.screenHorizontal,
    paddingVertical: 12,
    zIndex: 99,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  bottomCtaInfo: {
    flex: 1,
  },
  ctaPlanLabel: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 11,
    color: '#8A857B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  ctaPlanValue: {
    fontFamily: theme.typography.monoFamily,
    fontSize: 14.5,
    color: '#1F1F1F',
    fontWeight: '800',
    marginTop: 2,
  },
  ctaButton: {
    backgroundColor: '#4B5D3A',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctaButtonText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 13.5,
    color: '#FFFFFF',
    fontWeight: '700',
  },

  /* ── Bottom Sheet ── */
  bottomSheetContent: {
    gap: 12,
  },
  sheetTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 18,
    color: '#1F1F1F',
    fontWeight: '700',
    marginBottom: 10,
  },
});
