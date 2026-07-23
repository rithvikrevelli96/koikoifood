import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {
  Bell,
  Sprout,
  ArrowRight,
  ShieldCheck,
  ChefHat,
  Truck,
  Sparkles,
  Star,
  Clock,
  Video,
  Calendar,
  Flame,
  CheckCircle2,
  ChevronRight,
  PauseCircle,
  Leaf,
} from 'lucide-react-native';
import { useAppContext } from '../../../app/context';
import {
  theme,
  Text,
  PageLayout,
  Card,
  HeroCard,
  Button,
} from '../../../design-system';
import { BottomTabNav } from '../../../core/components/BottomTabNav';

export function NewUserHomeScreen() {
  const { user, go, switchTab, setToast, t, isDark } = useAppContext();

  const todayMeals = [
    {
      id: '1',
      title: 'Andhra Veg Special Thali',
      category: 'Veg',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500',
      calories: '620 kcal',
      protein: '24g Protein',
      prepTime: '25 mins prep',
    },
    {
      id: '2',
      title: 'Guntur Chicken Curry Thali',
      category: 'Non-Veg',
      image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=500',
      calories: '710 kcal',
      protein: '38g Protein',
      prepTime: '30 mins prep',
    },
  ];

  return (
    <PageLayout style={{ paddingHorizontal: 0 }} background="organic" backgroundVariant="minimal">
      
      {/* 1. GREETING & HEADER */}
      <View style={[styles.headerBar, { backgroundColor: t.bg }]}>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text style={[styles.greetingText, { color: t.sub }]}>Good Morning 👋</Text>
          </View>
          <Text style={[styles.userNameText, { color: t.text }]}>{user.name || 'Sophia Williams'}</Text>
          <Text style={[styles.mottoText, { color: t.primary }]}>Healthy food. Healthy life.</Text>
        </View>

        <View style={styles.headerActionsRow}>
          {/* Notification Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => go('notifications')}
            style={[styles.iconCircleBtn, { backgroundColor: t.surface, borderColor: t.border }]}
            accessibilityLabel="Notifications"
            accessibilityRole="button"
          >
            <Bell size={18} color={t.text} />
            <View style={styles.notificationDot} />
          </TouchableOpacity>

          {/* Profile Avatar Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => switchTab('profile')}
            style={[styles.avatarCircleBtn, { backgroundColor: isDark ? 'rgba(122,147,104,0.2)' : 'rgba(75,93,58,0.1)' }]}
            accessibilityLabel="Profile"
            accessibilityRole="button"
          >
            <Sprout size={18} color={t.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* 2. PREMIUM HERO CARD */}
        <View style={styles.sectionContainer}>
          <HeroCard style={[styles.heroCard, { backgroundColor: t.card, borderColor: t.border }]}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800' }}
              style={styles.heroCoverImage}
              resizeMode="cover"
            />
            
            <View style={styles.heroOverlayContent}>
              <View style={[styles.organicBadgePill, { backgroundColor: isDark ? 'rgba(122,147,104,0.3)' : 'rgba(75,93,58,0.12)', borderColor: t.border }]}>
                <Leaf size={12} color={t.primary} />
                <Text style={{ fontSize: 10, fontWeight: '800', color: t.primary, letterSpacing: 0.5 }}>
                  HOMEMADE • FRESH • ORGANIC
                </Text>
              </View>

              <Text style={[styles.heroTitle, { color: t.text }]}>
                Fresh Home-Cooked Meals, Made With Love.
              </Text>

              <Text style={[styles.heroDesc, { color: t.sub }]}>
                Healthy homemade meals cooked fresh every day using premium ingredients and delivered in reusable steel dabbas.
              </Text>

              <View style={styles.heroCtaRow}>
                <TouchableOpacity
                  activeOpacity={0.88}
                  onPress={() => go('plans')}
                  style={[styles.primaryCtaBtn, { backgroundColor: t.primary }]}
                >
                  <Text style={styles.primaryCtaText}>Choose Your Plan</Text>
                  <ArrowRight size={14} color="#FFFFFF" style={{ marginLeft: 6 }} />
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => switchTab('meals')}
                  style={[styles.secondaryCtaBtn, { backgroundColor: t.surface, borderColor: t.border }]}
                >
                  <Text style={[styles.secondaryCtaText, { color: t.text }]}>Explore Menu</Text>
                </TouchableOpacity>
              </View>

              {/* Trust Indicator */}
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 14 }}>
                <Star size={14} color={t.accent} fill={t.accent} />
                <Text style={{ fontSize: 12, fontWeight: '800', color: t.text }}>
                  10,000+ <Text style={{ color: t.sub, fontWeight: '600' }}>Happy Members</Text>
                </Text>
              </View>
            </View>
          </HeroCard>
        </View>

        {/* 3. QUICK STATS BAR */}
        <View style={styles.sectionContainer}>
          <Card style={[styles.statsCard, { backgroundColor: t.card, borderColor: t.border }]}>
            <View style={styles.statCol}>
              <Text style={[styles.statValue, { color: t.primary }]}>10K+</Text>
              <Text style={[styles.statLabel, { color: t.sub }]}>Meals Delivered</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: t.border }]} />
            <View style={styles.statCol}>
              <Text style={[styles.statValue, { color: t.secondary }]}>98%</Text>
              <Text style={[styles.statLabel, { color: t.sub }]}>Satisfaction</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: t.border }]} />
            <View style={styles.statCol}>
              <Text style={[styles.statValue, { color: t.primary }]}>100%</Text>
              <Text style={[styles.statLabel, { color: t.sub }]}>Fresh Ingredients</Text>
            </View>
          </Card>
        </View>

        {/* 4. TODAY'S MENU (ONLY 2 PREMIUM CARDS) */}
        <View style={styles.sectionContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <Text style={[styles.sectionTitle, { color: t.text }]}>Today's Menu</Text>
            <TouchableOpacity onPress={() => switchTab('meals')}>
              <Text style={{ fontSize: 12, fontWeight: '800', color: t.secondary }}>View Full Menu ‣</Text>
            </TouchableOpacity>
          </View>

          <View style={{ gap: 14 }}>
            {todayMeals.map(meal => (
              <Card key={meal.id} style={[styles.todayMealCard, { backgroundColor: t.card, borderColor: t.border }]}>
                <Image source={{ uri: meal.image }} style={styles.mealCardImage} resizeMode="cover" />
                <View style={{ flex: 1, paddingLeft: 14 }}>
                  <View style={[styles.categoryBadge, { backgroundColor: meal.category === 'Veg' ? (isDark ? 'rgba(122,147,104,0.2)' : 'rgba(75,93,58,0.1)') : (isDark ? 'rgba(215,132,86,0.2)' : 'rgba(201,107,60,0.1)') }]}>
                    <Text style={{ fontSize: 10, fontWeight: '800', color: meal.category === 'Veg' ? t.primary : t.secondary }}>
                      {meal.category.toUpperCase()}
                    </Text>
                  </View>

                  <Text style={[styles.mealCardTitle, { color: t.text }]} numberOfLines={1}>
                    {meal.title}
                  </Text>

                  <Text style={[styles.mealCardMeta, { color: t.sub }]}>
                    {meal.calories} • {meal.protein} • {meal.prepTime}
                  </Text>

                  <TouchableOpacity
                    onPress={() => switchTab('meals')}
                    style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}
                  >
                    <Text style={{ fontSize: 12, fontWeight: '800', color: t.primary }}>View Details →</Text>
                  </TouchableOpacity>
                </View>
              </Card>
            ))}
          </View>
        </View>

        {/* 5. WHY KOI KOI (GLASS CARD WITH 4 FEATURES) */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: t.text }]}>Why KOI KOI DABBA</Text>
          <Card style={[styles.whyUsCard, { backgroundColor: t.card, borderColor: t.border }]}>
            <View style={styles.whyUsGrid}>
              {/* Feature 1 */}
              <View style={styles.whyUsItem}>
                <View style={[styles.whyUsIconCircle, { backgroundColor: isDark ? 'rgba(122,147,104,0.2)' : 'rgba(75,93,58,0.08)' }]}>
                  <Leaf size={18} color={t.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.whyUsTitle, { color: t.text }]}>Fresh Every Day</Text>
                  <Text style={[styles.whyUsDesc, { color: t.sub }]}>Organic farm-fresh ingredients daily.</Text>
                </View>
              </View>

              {/* Feature 2 */}
              <View style={styles.whyUsItem}>
                <View style={[styles.whyUsIconCircle, { backgroundColor: isDark ? 'rgba(122,147,104,0.2)' : 'rgba(75,93,58,0.08)' }]}>
                  <ShieldCheck size={18} color={t.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.whyUsTitle, { color: t.text }]}>Hygienic Kitchen</Text>
                  <Text style={[styles.whyUsDesc, { color: t.sub }]}>FSSAI & ISO 22000 certified facility.</Text>
                </View>
              </View>

              {/* Feature 3 */}
              <View style={styles.whyUsItem}>
                <View style={[styles.whyUsIconCircle, { backgroundColor: isDark ? 'rgba(201,107,60,0.2)' : 'rgba(201,107,60,0.08)' }]}>
                  <Truck size={18} color={t.secondary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.whyUsTitle, { color: t.text }]}>Steel Dabba</Text>
                  <Text style={[styles.whyUsDesc, { color: t.sub }]}>100% food-grade stainless steel.</Text>
                </View>
              </View>

              {/* Feature 4 */}
              <View style={styles.whyUsItem}>
                <View style={[styles.whyUsIconCircle, { backgroundColor: isDark ? 'rgba(201,107,60,0.2)' : 'rgba(201,107,60,0.08)' }]}>
                  <PauseCircle size={18} color={t.secondary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.whyUsTitle, { color: t.text }]}>Pause Anytime</Text>
                  <Text style={[styles.whyUsDesc, { color: t.sub }]}>Online pauses with wallet credits.</Text>
                </View>
              </View>
            </View>
          </Card>
        </View>

        {/* 6. KITCHEN TRANSPARENCY */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: t.text }]}>Kitchen Transparency</Text>
          <Card style={[styles.kitchenHeroCard, { backgroundColor: t.card, borderColor: t.border }]}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800' }}
              style={styles.kitchenImage}
              resizeMode="cover"
            />
            <View style={{ padding: 16 }}>
              <Text style={[styles.kitchenHeadline, { color: t.text }]}>
                Watch Your Meals Being Prepared
              </Text>
              <Text style={[styles.kitchenDesc, { color: t.sub }]}>
                Know exactly where your food comes from with 24/7 live camera feeds & temperature logs.
              </Text>

              <View style={styles.kitchenCtaRow}>
                <TouchableOpacity
                  activeOpacity={0.88}
                  onPress={() => go('tour_booking')}
                  style={[styles.visitKitchenBtn, { backgroundColor: t.surface, borderColor: t.border }]}
                >
                  <Text style={[styles.visitKitchenText, { color: t.text }]}>Visit Kitchen</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.88}
                  onPress={() => switchTab('kitchen')}
                  style={[styles.liveKitchenBtn, { backgroundColor: t.secondary }]}
                >
                  <Video size={14} color="#FFFFFF" style={{ marginRight: 4 }} />
                  <Text style={styles.liveKitchenText}>Live Kitchen</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        </View>

        {/* 7. BOTTOM PREMIUM CTA BANNER */}
        <View style={styles.sectionContainer}>
          <View style={[styles.bottomBannerCard, { backgroundColor: t.primary }]}>
            <Text style={styles.bottomBannerTitle}>Ready to Eat Better?</Text>
            <Text style={styles.bottomBannerDesc}>
              Join 10,000+ members enjoying healthy home-cooked meals every day.
            </Text>

            <TouchableOpacity
              activeOpacity={0.88}
              onPress={() => go('plans')}
              style={[styles.subscribeNowBtn, { backgroundColor: t.accent }]}
            >
              <Text style={styles.subscribeNowText}>Subscribe Now</Text>
              <ArrowRight size={14} color="#1F1F1F" style={{ marginLeft: 6 }} />
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>

      {/* Floating Bottom Navigation */}
      <BottomTabNav active="home" />
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.screenHorizontal,
    paddingTop: 16,
    paddingBottom: 10,
  },
  greetingText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12,
    fontWeight: '600',
  },
  userNameText: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 18,
    fontWeight: '800',
    marginTop: 1,
  },
  mottoText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 11,
    fontWeight: '700',
    marginTop: 1,
  },
  headerActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconCircleBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#C96B3C',
  },
  avatarCircleBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  sectionContainer: {
    paddingHorizontal: theme.spacing.screenHorizontal,
    marginTop: 16,
  },
  sectionTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 15,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  heroCard: {
    borderRadius: 24,
    borderWidth: 1,
    overflow: 'hidden',
  },
  heroCoverImage: {
    width: '100%',
    height: 180,
  },
  heroOverlayContent: {
    padding: 18,
  },
  organicBadgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    gap: 4,
    marginBottom: 8,
  },
  heroTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 26,
  },
  heroDesc: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12.5,
    lineHeight: 18,
    marginTop: 6,
  },
  heroCtaRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  primaryCtaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
  },
  primaryCtaText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  secondaryCtaBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
  },
  secondaryCtaText: {
    fontSize: 12,
    fontWeight: '700',
  },
  statsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
  },
  statCol: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontFamily: theme.typography.monoFamily,
    fontSize: 20,
    fontWeight: '900',
  },
  statLabel: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 10.5,
    fontWeight: '700',
    marginTop: 2,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 28,
  },
  todayMealCard: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
  },
  mealCardImage: {
    width: 84,
    height: 84,
    borderRadius: 14,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 4,
  },
  mealCardTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 14,
    fontWeight: '800',
  },
  mealCardMeta: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 11,
    marginTop: 2,
  },
  whyUsCard: {
    padding: 16,
    borderRadius: 24,
    borderWidth: 1,
  },
  whyUsGrid: {
    gap: 14,
  },
  whyUsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  whyUsIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whyUsTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 13.5,
    fontWeight: '800',
  },
  whyUsDesc: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 11.5,
    marginTop: 1,
  },
  kitchenHeroCard: {
    borderRadius: 24,
    borderWidth: 1,
    overflow: 'hidden',
  },
  kitchenImage: {
    width: '100%',
    height: 160,
  },
  kitchenHeadline: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 16,
    fontWeight: '800',
  },
  kitchenDesc: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 4,
  },
  kitchenCtaRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  visitKitchenBtn: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  visitKitchenText: {
    fontSize: 12,
    fontWeight: '700',
  },
  liveKitchenBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: 12,
  },
  liveKitchenText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  bottomBannerCard: {
    padding: 24,
    borderRadius: 24,
    alignItems: 'center',
    textAlign: 'center',
  },
  bottomBannerTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  bottomBannerDesc: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 13,
    color: '#FCFAF6',
    opacity: 0.9,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },
  subscribeNowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
    marginTop: 16,
  },
  subscribeNowText: {
    color: '#1F1F1F',
    fontSize: 13,
    fontWeight: '900',
  },
});
