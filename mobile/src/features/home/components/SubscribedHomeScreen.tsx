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
  Truck,
  ArrowRight,
  ChefHat,
  Wallet,
  Sparkles,
  Gift,
  CheckCircle2,
  MapPin,
  Clock,
  Ticket,
  ChevronRight
} from 'lucide-react-native';
import { useAppContext } from '../../../app/context';
import { useWallet } from '../../../core/context/WalletContext';
import {
  theme,
  Text,
  PageLayout,
  Card,
  HeroCard,
  InfoCard
} from '../../../design-system';
import { BottomTabNav } from '../../../core/components/BottomTabNav';

export function SubscribedHomeScreen() {
  const { user, go, switchTab, t, isDark } = useAppContext();
  const { walletBalance } = useWallet();

  const recommendedMeals = [
    { id: 1, name: 'Dal Tadka + Steamed Rice', type: 'VEG', cal: '380 kcal', prot: '14g protein', img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500' },
    { id: 2, name: 'Paneer Butter Masala + Roti', type: 'VEG', cal: '420 kcal', prot: '18g protein', img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500' },
    { id: 3, name: 'Andhra Chicken + Bagara Rice', type: 'NON-VEG', cal: '560 kcal', prot: '34g protein', img: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=500' },
    { id: 4, name: 'Kerala Avial + Red Rice', type: 'VEG', cal: '320 kcal', prot: '9g protein', img: 'https://images.unsplash.com/photo-1543826173-70651703c5a4?w=500' },
  ];

  const coupons = [
    { code: 'WELCOME50', desc: '₹50 off next billing' },
    { code: 'SAVE20', desc: '20% off monthly tier' },
    { code: 'REFER100', desc: 'Earn cash in wallet' },
  ];

  return (
    <PageLayout style={{ paddingHorizontal: 0 }} background="organic" backgroundVariant="minimal">
      
      {/* 1. TOP HEADER BAR */}
      <View style={[styles.headerBar, { backgroundColor: t.bg }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* Brand Logo Element */}
          <View style={{ 
            width: 36, height: 36, borderRadius: 18, 
            backgroundColor: t.primary, justifyContent: 'center', alignItems: 'center',
            marginRight: 10, shadowColor: t.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5
          }}>
            <Text style={{ fontSize: 18 }}>🍱</Text>
          </View>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Text style={[styles.greetingText, { color: t.sub }]}>Good Morning,</Text>
              <Text style={styles.waveEmoji}>👋</Text>
            </View>
            <Text style={[styles.userNameText, { color: t.text }]}>{user.name || 'Bhargav'}</Text>
          </View>
        </View>

        <View style={styles.headerActionsRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => go('notifications')}
            style={[styles.iconCircleBtn, { backgroundColor: t.surface, borderColor: t.border }]}
          >
            <Bell size={18} color={t.text} />
            <View style={styles.notificationDot} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => switchTab('profile')}
            style={[styles.avatarCircleBtn, { backgroundColor: isDark ? 'rgba(122,147,104,0.2)' : 'rgba(75,93,58,0.1)' }]}
          >
            <Sprout size={18} color={t.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* 2. LIVE TRACKING HERO CARD */}
        <View style={styles.sectionContainer}>
          <HeroCard style={[styles.heroCard, { backgroundColor: t.card, borderColor: t.border }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <View style={{ flex: 1, paddingRight: 12 }}>
                <View style={{ flexDirection: 'row', gap: 6, marginBottom: 8 }}>
                  <View style={[styles.badge, { backgroundColor: t.primary }]}>
                    <Text style={{ fontSize: 10, fontWeight: '800', color: '#FFF' }}>LIVE TRACKING</Text>
                  </View>
                  <View style={[styles.badge, { backgroundColor: '#43936C' }]}>
                    <Text style={{ fontSize: 10, fontWeight: '800', color: '#FFF' }}>VEG</Text>
                  </View>
                </View>
                
                <Text style={[styles.heroMealTitle, { color: t.text }]}>Dal Tadka + Steamed Rice</Text>
                
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6, gap: 4 }}>
                  <Text style={{ fontSize: 13 }}>☀️</Text>
                  <Text style={{ fontSize: 12, fontWeight: '700', color: t.secondary }}>Lunch Slot · 12:30 PM</Text>
                </View>
              </View>
              <Image source={{ uri: recommendedMeals[0].img }} style={styles.heroImage} resizeMode="cover" />
            </View>

            <View style={[styles.trackingInfoBox, { backgroundColor: t.surface, borderColor: t.border }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                <Truck size={16} color={t.secondary} style={{ marginRight: 8 }} />
                <Text style={{ fontSize: 12, fontWeight: '800', color: t.text }}>Arjun is 2.4 km away · Delivery in 12 min</Text>
              </View>
              
              {/* Progress Tracker UI */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
                <View style={{ alignItems: 'center' }}>
                  <CheckCircle2 size={16} color={theme.colors.success} />
                  <Text style={{ fontSize: 10, fontWeight: '700', color: t.text, marginTop: 4 }}>Prepared</Text>
                </View>
                <View style={[styles.progressLine, { backgroundColor: theme.colors.success }]} />
                
                <View style={{ alignItems: 'center' }}>
                  <View style={[styles.pulseCircle, { backgroundColor: t.secondary }]}>
                    <MapPin size={10} color="#FFF" />
                  </View>
                  <Text style={{ fontSize: 10, fontWeight: '800', color: t.secondary, marginTop: 4 }}>On the Way</Text>
                </View>
                <View style={[styles.progressLine, { backgroundColor: t.border }]} />
                
                <View style={{ alignItems: 'center' }}>
                  <View style={[styles.emptyCircle, { borderColor: t.sub }]} />
                  <Text style={{ fontSize: 10, fontWeight: '600', color: t.sub, marginTop: 4 }}>Delivered</Text>
                </View>
              </View>
            </View>
          </HeroCard>
        </View>

        {/* 3. ACCOUNT DASHBOARD GRID (2x2) */}
        <View style={styles.sectionContainer}>
          <View style={styles.gridContainer}>
            
            {/* Subscription */}
            <Card style={[styles.gridCard, { backgroundColor: t.card, borderColor: t.border }]}>
              <View style={[styles.miniBadge, { backgroundColor: 'rgba(75,93,58,0.1)' }]}>
                <Text style={{ fontSize: 9, fontWeight: '900', color: t.primary }}>ACTIVE</Text>
              </View>
              <Text style={{ fontSize: 15, fontWeight: '900', color: t.text, marginTop: 8 }}>Monthly Dabba</Text>
              <Text style={{ fontSize: 11, color: t.sub, marginTop: 2, marginBottom: 12 }}>Day 3 of 30 left</Text>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 12, fontWeight: '800', color: t.primary }}>Manage plan</Text>
                <ArrowRight size={14} color={t.primary} style={{ marginLeft: 4 }} />
              </TouchableOpacity>
            </Card>

            {/* Wallet */}
            <Card style={[styles.gridCard, { backgroundColor: t.card, borderColor: t.border }]} onPress={() => go('finances')}>
              <View style={[styles.miniBadge, { backgroundColor: 'rgba(217,182,90,0.2)' }]}>
                <Text style={{ fontSize: 9, fontWeight: '900', color: '#B5861F' }}>GOLD</Text>
              </View>
              <Text style={{ fontSize: 11, color: t.sub, marginTop: 8 }}>My Wallet Balance</Text>
              <Text style={{ fontSize: 17, fontWeight: '900', color: t.text, marginTop: 2, marginBottom: 10 }}>₹1,250.00 <Text style={{ fontSize: 11, fontWeight: '600', color: t.sub }}>cash</Text></Text>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 12, fontWeight: '800', color: t.secondary }}>View statement</Text>
                <ArrowRight size={14} color={t.secondary} style={{ marginLeft: 4 }} />
              </TouchableOpacity>
            </Card>

            {/* Live Kitchen */}
            <Card style={[styles.gridCard, { backgroundColor: t.card, borderColor: t.border }]} onPress={() => switchTab('kitchen')}>
              <View style={[styles.miniBadge, { backgroundColor: 'rgba(201,107,60,0.1)' }]}>
                <Text style={{ fontSize: 9, fontWeight: '900', color: t.secondary }}>LIVE</Text>
              </View>
              <Text style={{ fontSize: 15, fontWeight: '900', color: t.text, marginTop: 8 }}>Watch Live Kitchen</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4, marginBottom: 10 }}>
                <Sparkles size={12} color={t.primary} />
                <Text style={{ fontSize: 11, fontWeight: '700', color: t.primary, marginLeft: 4 }}>A+ Certified Hygiene</Text>
              </View>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 12, fontWeight: '800', color: t.secondary }}>Meet the Chef</Text>
                <ArrowRight size={14} color={t.secondary} style={{ marginLeft: 4 }} />
              </TouchableOpacity>
            </Card>

            {/* Refer & Earn */}
            <Card style={[styles.gridCard, { backgroundColor: t.card, borderColor: t.border }]} onPress={() => go('refer')}>
              <View style={[styles.miniBadge, { backgroundColor: 'rgba(122,147,104,0.15)' }]}>
                <Text style={{ fontSize: 9, fontWeight: '900', color: t.primary }}>🎁 FREE</Text>
              </View>
              <Text style={{ fontSize: 15, fontWeight: '900', color: t.text, marginTop: 8 }}>Invite Friends</Text>
              <Text style={{ fontSize: 11, fontWeight: '700', color: t.text, marginTop: 2, marginBottom: 12 }}>Get ₹100 / referral</Text>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 12, fontWeight: '800', color: t.primary }}>Get coupon code</Text>
                <ArrowRight size={14} color={t.primary} style={{ marginLeft: 4 }} />
              </TouchableOpacity>
            </Card>

          </View>
        </View>

        {/* 4. UP NEXT TOMORROW */}
        <View style={styles.sectionContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <Text style={[styles.sectionTitle, { color: t.text }]}>Up Next tomorrow</Text>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 11, fontWeight: '800', color: t.secondary }}>Full Menu</Text>
              <ChevronRight size={14} color={t.secondary} />
            </TouchableOpacity>
          </View>
          
          <InfoCard style={{ padding: 14, backgroundColor: t.surface, borderColor: t.border }}>
            <Text style={{ fontSize: 10, fontWeight: '900', color: t.primary, letterSpacing: 0.5, marginBottom: 4 }}>TOMORROW LUNCH</Text>
            <Text style={{ fontSize: 15, fontWeight: '900', color: t.text }}>Andhra Chicken + Bagara Rice</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
              <Clock size={12} color={t.sub} />
              <Text style={{ fontSize: 12, fontWeight: '700', color: t.sub, marginLeft: 4 }}>12:30 PM · 560 kcal · 34g protein</Text>
            </View>
          </InfoCard>
        </View>

        {/* 5. ACTIVE WALLET COUPONS */}
        <View style={styles.sectionContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <Text style={[styles.sectionTitle, { color: t.text }]}>Active Wallet Coupons</Text>
            <TouchableOpacity>
              <Text style={{ fontSize: 11, fontWeight: '800', color: t.secondary }}>View all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
            {coupons.map((c, i) => (
              <View key={i} style={[styles.couponCard, { backgroundColor: t.card, borderColor: t.border }]}>
                <View style={[styles.couponIconWrap, { backgroundColor: isDark ? 'rgba(217,182,90,0.1)' : '#FEF8E7' }]}>
                  <Ticket size={16} color="#B5861F" />
                </View>
                <View>
                  <Text style={{ fontSize: 13, fontWeight: '900', color: t.text }}>{c.code}</Text>
                  <Text style={{ fontSize: 10, color: t.sub, marginTop: 2 }}>{c.desc}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* 6. RECOMMENDED MEALS FEED */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: t.text, marginBottom: 12 }]}>Recommended for {user.name || 'Bhargav'}</Text>
          
          {recommendedMeals.map(meal => (
            <Card key={meal.id} style={[styles.feedCard, { backgroundColor: t.card, borderColor: t.border }]}>
              <Image source={{ uri: meal.img }} style={styles.feedImage} resizeMode="cover" />
              <View style={styles.feedContent}>
                <View style={[styles.badge, { backgroundColor: meal.type === 'VEG' ? '#43936C' : '#D9381E', alignSelf: 'flex-start', marginBottom: 6 }]}>
                  <Text style={{ fontSize: 9, fontWeight: '900', color: '#FFF' }}>{meal.type}</Text>
                </View>
                <Text style={{ fontSize: 15, fontWeight: '800', color: t.text, marginBottom: 6 }}>{meal.name}</Text>
                <Text style={{ fontSize: 12, fontWeight: '600', color: t.sub }}>{meal.cal} · {meal.prot}</Text>
              </View>
            </Card>
          ))}
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
  waveEmoji: {
    fontSize: 12,
  },
  userNameText: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 18,
    fontWeight: '800',
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
    marginTop: 18,
  },
  sectionTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.2,
  },
  heroCard: {
    padding: 16,
    borderRadius: 24,
    borderWidth: 1,
    shadowColor: theme.colors.light.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  heroMealTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 22,
  },
  heroImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
  },
  trackingInfoBox: {
    marginTop: 16,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
  },
  progressLine: {
    flex: 1,
    height: 2,
    marginHorizontal: 8,
    marginTop: -16,
  },
  pulseCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.light.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  emptyCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    marginTop: 3,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  gridCard: {
    width: '48%',
    padding: 14,
    borderRadius: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  miniBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  couponCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingRight: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  couponIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  feedCard: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 12,
  },
  feedImage: {
    width: 90,
    height: 90,
    borderRadius: 14,
    marginRight: 14,
  },
  feedContent: {
    flex: 1,
    justifyContent: 'center',
  },
});
