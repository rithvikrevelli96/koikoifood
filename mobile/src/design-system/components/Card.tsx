import React from 'react';
import { StyleSheet, View, ViewStyle, StyleProp, useWindowDimensions, TouchableOpacity } from 'react-native';
import { Package, Check, ChevronDown, ChevronUp, Clock, RefreshCw, AlertCircle, Lock, HelpCircle, Leaf, Calendar, Crown } from 'lucide-react-native';
import { theme } from '../theme';
import { Text } from './Text';

import { useAppContext } from '../../app/context';

export type CardSize = 'sm' | 'md' | 'lg' | 'hero' | 'xl';

export interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  size?: CardSize;
}

function useDynamicCardTheme() {
  let isDark = false;
  try {
    const context = useAppContext();
    if (context) isDark = context.isDark;
  } catch (e) {}

  return {
    bg: isDark ? theme.colors.dark.surface : theme.colors.light.surface,
    border: isDark ? theme.colors.dark.border : theme.colors.light.border,
  };
}

export function Card({ children, style, size }: CardProps) {
  const { width } = useWindowDimensions();
  const minHeight = theme.getCardMinHeight(size, width >= 600);
  const themeColors = useDynamicCardTheme();

  return (
    <View style={[styles.card, { backgroundColor: themeColors.bg, borderColor: themeColors.border }, minHeight ? { minHeight } : undefined, style]}>
      {children}
    </View>
  );
}

export function HeroCard({ children, style, size = 'hero' }: CardProps) {
  const { width } = useWindowDimensions();
  const minHeight = theme.getCardMinHeight(size, width >= 600);
  const themeColors = useDynamicCardTheme();

  return (
    <View style={[styles.heroCard, { backgroundColor: themeColors.bg, borderColor: themeColors.border }, minHeight ? { minHeight } : undefined, style]}>
      {children}
    </View>
  );
}

export function InfoCard({ children, style, size }: CardProps) {
  const { width } = useWindowDimensions();
  const minHeight = theme.getCardMinHeight(size, width >= 600);
  const themeColors = useDynamicCardTheme();

  return (
    <View style={[styles.infoCard, { backgroundColor: themeColors.bg, borderColor: themeColors.border }, minHeight ? { minHeight } : undefined, style]}>
      {children}
    </View>
  );
}

export function MealCard({ children, style, size = 'hero' }: CardProps) {
  const { width } = useWindowDimensions();
  const minHeight = theme.getCardMinHeight(size, width >= 600);
  const themeColors = useDynamicCardTheme();

  return (
    <View style={[styles.card, styles.mealCard, { backgroundColor: themeColors.bg, borderColor: themeColors.border }, minHeight ? { minHeight } : undefined, style]}>
      {children}
    </View>
  );
}

export function StatisticCard({ children, style, size = 'sm' }: CardProps) {
  const { width } = useWindowDimensions();
  const minHeight = theme.getCardMinHeight(size, width >= 600);
  const themeColors = useDynamicCardTheme();

  return (
    <View style={[styles.card, styles.statisticCard, { backgroundColor: themeColors.bg, borderColor: themeColors.border }, minHeight ? { minHeight } : undefined, style]}>
      {children}
    </View>
  );
}

export function ProfileCard({ children, style, size = 'md' }: CardProps) {
  const { width } = useWindowDimensions();
  const minHeight = theme.getCardMinHeight(size, width >= 600);
  const themeColors = useDynamicCardTheme();

  return (
    <View style={[styles.card, styles.profileCard, { backgroundColor: themeColors.bg, borderColor: themeColors.border }, minHeight ? { minHeight } : undefined, style]}>
      {children}
    </View>
  );
}

export interface PlanCardProps {
  plan: {
    id: string;
    name: string;
    badge: string;
    price: string;
    sub: string;
    perks: string[];
    color?: string;
    unit?: string;
  };
  selected: boolean;
  expanded: boolean;
  onPress: () => void;
  isCurrent?: boolean;
  style?: StyleProp<ViewStyle>;
}

const PLAN_THEMES: Record<string, { bg: string; accent: string }> = {
  daily:     { bg: '#1F1F1F', accent: '#4B5D3A' },
  weekly:    { bg: '#1F1F1F', accent: '#4B5D3A' },
  monthly:   { bg: '#1F1F1F', accent: '#4B5D3A' },
  family:    { bg: '#1F1F1F', accent: '#4B5D3A' },
  student:   { bg: '#1F1F1F', accent: '#4B5D3A' },
  corporate: { bg: '#1F1F1F', accent: '#4B5D3A' },
};

export function PlanCard({ plan, selected, expanded, onPress, isCurrent = false, style }: PlanCardProps) {
  const isBestValue = plan.badge === 'BEST VALUE';
  const isPopular = plan.badge === 'POPULAR' || plan.badge === 'MOST POPULAR';

  return (
    <View style={{ marginBottom: 10 }}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.92}
        style={[
          {
            backgroundColor: '#F4EFE6',
            borderRadius: 20,
            borderWidth: selected ? 2 : 1,
            borderColor: selected ? '#4B5D3A' : '#E8E2D8',
            overflow: 'hidden',
            shadowColor: '#1F1F1F',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.04,
            shadowRadius: 10,
            elevation: 2,
          },
          style,
        ] as any}
      >
        {/* ── Content Container ── */}
        <View style={{ paddingVertical: 14, paddingHorizontal: 16 }}>

          {/* Top Row: Title + Badge */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flex: 1, paddingRight: 8 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text style={{ fontFamily: theme.typography.headingFamily, fontSize: 16, color: '#1F1F1F', fontWeight: '800' }}>{plan.name}</Text>
                {selected && (
                  <View style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: '#4B5D3A', justifyContent: 'center', alignItems: 'center' }}>
                    <Check size={10} color="#FFFFFF" strokeWidth={3} />
                  </View>
                )}
              </View>
              <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 11, color: '#8A857B', marginTop: 1 }}>{plan.sub}</Text>
            </View>

            {isBestValue ? (
              <View style={{ paddingHorizontal: 9, paddingVertical: 4, borderRadius: 8, backgroundColor: '#C96B3C' }}>
                <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 9.5, color: '#FFFFFF', fontWeight: '800', letterSpacing: 0.4 }}>BEST VALUE</Text>
              </View>
            ) : isPopular ? (
              <View style={{ paddingHorizontal: 9, paddingVertical: 4, borderRadius: 8, backgroundColor: '#D9B65A' }}>
                <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 9.5, color: '#1F1F1F', fontWeight: '800', letterSpacing: 0.4 }}>POPULAR</Text>
              </View>
            ) : (
              plan.id === 'daily' ? (
                <View style={{ paddingHorizontal: 9, paddingVertical: 4, borderRadius: 8, backgroundColor: '#FCFAF6', borderWidth: 1, borderColor: '#E8E2D8' }}>
                  <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 9.5, color: '#4B5D3A', fontWeight: '800', letterSpacing: 0.4 }}>FLEXIBLE</Text>
                </View>
              ) : null
            )}
          </View>

          {/* Price Block */}
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4, marginTop: 8, marginBottom: 10 }}>
            <Text style={{ fontFamily: theme.typography.monoFamily, fontSize: 22, color: '#C96B3C', fontWeight: '800' }}>{plan.price}</Text>
            <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 12, color: '#8A857B', marginLeft: 2 }}>{plan.unit || ''}</Text>
          </View>

          {/* Divider */}
          <View style={{ height: 1, backgroundColor: '#E8E2D8' }} />

          {/* Horizontal Perks Row */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
            {plan.perks.slice(0, 3).map((perk, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && (
                  <View style={{ width: 1, height: 12, backgroundColor: '#E8E2D8' }} />
                )}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, flex: 1, justifyContent: 'center' }}>
                  <View style={{ width: 13, height: 13, borderRadius: 6.5, backgroundColor: 'rgba(75, 93, 58, 0.08)', justifyContent: 'center', alignItems: 'center' }}>
                    <Check size={8} color="#4B5D3A" strokeWidth={3} />
                  </View>
                  <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 11, color: '#1F1F1F', fontWeight: '600' }} numberOfLines={1}>{perk}</Text>
                </View>
              </React.Fragment>
            ))}
          </View>

          {/* Expand toggle */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10, gap: 4 }}>
            <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 10.5, color: '#8A857B', fontWeight: '700' }}>
              {expanded ? 'Hide Details' : 'View Details'}
            </Text>
            {expanded
              ? <ChevronUp size={12} color="#8A857B" />
              : <ChevronDown size={12} color="#8A857B" />
            }
          </View>
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={planStyles.expandPanel}>
          <Text style={planStyles.panelTitle}>Plan Details & Policy</Text>

          <View style={planStyles.panelRow}>
            <Check size={12} color={theme.colors.primary} style={{ marginTop: 2 }} />
            <Text style={planStyles.panelText}><Text style={planStyles.panelBold}>Meals Included: </Text>{plan.perks.join(', ')} delivered in insulated steel dabbas.</Text>
          </View>

          <View style={planStyles.panelRow}>
            <Clock size={12} color={theme.colors.primary} style={{ marginTop: 2 }} />
            <Text style={planStyles.panelText}><Text style={planStyles.panelBold}>Delivery Time: </Text>Lunch by 1:30 PM, Dinner by 8:30 PM.</Text>
          </View>

          <View style={planStyles.panelRow}>
            <RefreshCw size={12} color={theme.colors.primary} style={{ marginTop: 2 }} />
            <Text style={planStyles.panelText}><Text style={planStyles.panelBold}>Pause Policy: </Text>Pause anytime before 10 PM for next day.</Text>
          </View>

          <View style={planStyles.panelRow}>
            <HelpCircle size={12} color={theme.colors.primary} style={{ marginTop: 2 }} />
            <Text style={planStyles.panelText}><Text style={planStyles.panelBold}>Skip Policy: </Text>Reschedule single meals easily in calendar.</Text>
          </View>

          <View style={planStyles.panelRow}>
            <AlertCircle size={12} color={theme.colors.primary} style={{ marginTop: 2 }} />
            <Text style={planStyles.panelText}><Text style={planStyles.panelBold}>Renewal: </Text>Auto-renews using wallet balance.</Text>
          </View>

          <View style={planStyles.panelRow}>
            <Lock size={12} color={theme.colors.primary} style={{ marginTop: 2 }} />
            <Text style={planStyles.panelText}><Text style={planStyles.panelBold}>Cancel: </Text>Cancel anytime. Refund credited to wallet.</Text>
          </View>
        </View>
      )}
    </View>
  );
}

/* ── Plan Card Styles ── */
const planStyles = StyleSheet.create({
  card: {
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    position: 'relative',
  },
  cardSelected: {
    borderWidth: 2,
    borderColor: '#D9B65A',
  },
  // Gradient simulation layers
  glowOverlay: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    opacity: 0.12,
  },
  contentZ: {
    position: 'relative',
    zIndex: 2,
    padding: 18,
  },
  // Top row
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 9,
    color: '#FFFFFF',
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  currentBadge: {
    backgroundColor: '#4B5D3A',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  currentBadgeText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 9,
    color: '#FFFFFF',
    fontWeight: '800',
  },
  selectedDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#D9B65A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationContainer: {
    position: 'absolute',
    right: -15,
    bottom: -15,
    opacity: 0.16,
    zIndex: 1,
  },
  // Name
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  planName: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  planSub: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 11.5,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 2,
  },
  // Price
  priceBlock: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginBottom: 12,
    paddingLeft: 54,
  },
  priceValue: {
    fontFamily: theme.typography.monoFamily,
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: '800',
  },
  priceUnit: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
    fontWeight: '600',
  },
  // Divider
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginBottom: 12,
  },
  // Perks
  perksRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  perkChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  perkText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 10.5,
    color: 'rgba(255,255,255,0.7)',
  },
  // Expand
  expandRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
    gap: 4,
  },
  expandText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 11,
    color: 'rgba(255,255,255,0.45)',
    fontWeight: '700',
  },
  // Expanded Panel
  expandPanel: {
    marginTop: 8,
    backgroundColor: '#FCFAF6',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E8E2D8',
    gap: 10,
  },
  panelTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 13,
    color: '#1F1F1F',
    fontWeight: '700',
    marginBottom: 4,
  },
  panelRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  panelText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 11.5,
    color: '#8A857B',
    flex: 1,
    lineHeight: 15,
  },
  panelBold: {
    color: '#1F1F1F',
    fontWeight: '700',
  },
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F4EFE6',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E8E2D8',
    shadowColor: '#1F1F1F',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 18,
    elevation: 2,
    padding: 24,
  },
  heroCard: {
    backgroundColor: '#F4EFE6',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E8E2D8',
    shadowColor: '#1F1F1F',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
    padding: 28,
  },
  infoCard: {
    backgroundColor: '#F4EFE6',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E8E2D8',
    shadowColor: 'transparent',
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    padding: 24,
  },
  mealCard: {
    padding: theme.spacing.xl,
  },
  statisticCard: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  profileCard: {
    paddingVertical: 18,
    paddingHorizontal: 24,
  },
});

