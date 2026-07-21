import React, { useState } from 'react';
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
  ChevronRight,
  ArrowRight,
  Utensils,
  Calendar,
  ChefHat,
  Wallet,
  ShieldCheck,
  Camera,
  ShoppingBag,
  UserCheck,
  Crown,
  Flame,
  Activity,
  CheckCircle2,
  Gift,
  Share2,
  Clock,
  Droplet,
  Sparkles,
} from 'lucide-react-native';
import { useAppContext } from '../../../app/context';
import {
  theme,
  Text,
  PageLayout,
  Card,
  Button,
} from '../../../design-system';
import { BottomTabNav } from '../../../core/components/BottomTabNav';

export function SubscribedHomeScreen() {
  const { user, go, setToast, switchTab, paused, setPaused } = useAppContext();

  // Upcoming deliveries mock data
  const upcomingDeliveries = [
    { id: '1', day: 'Tomorrow', title: 'High Protein Veg Bowl', slot: 'Lunch • 1:00 PM', type: 'veg' },
    { id: '2', day: 'Saturday', title: 'Andhra Chicken Curry', slot: 'Dinner • 8:00 PM', type: 'non-veg' },
  ];

  // Subscriber Benefits items
  const benefits = [
    { title: 'Unlimited Pause', desc: 'Pause or resume deliveries anytime before cutoff' },
    { title: 'Flexible Delivery', desc: 'Change delivery slot or address easily' },
    { title: 'Fresh Everyday', desc: '100% freshly cooked zero preservatives' },
    { title: 'Kitchen Transparency', desc: '24/7 live camera & ingredient audits' },
    { title: 'Nutrition Tracking', desc: 'Calorie, protein & fiber breakdown' },
    { title: 'Priority Support', desc: 'Direct WhatsApp hotline with kitchen desk' },
  ];

  return (
    <PageLayout style={{ paddingHorizontal: 0 }} background="organic" backgroundVariant="minimal">
      
      {/* 1. TOP HEADER */}
      <View style={styles.headerBar}>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text style={styles.greetingText}>Good Morning,</Text>
            <Text style={styles.waveEmoji}>👋</Text>
          </View>
          <Text style={styles.userNameText}>{user.name || 'Rithvik'}</Text>
          <Text style={styles.planSubheadText}>Premium Protein Plan</Text>
        </View>

        <View style={styles.headerActionsRow}>
          {/* Notification Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => go('notifications')}
            style={styles.iconCircleBtn}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Notifications"
          >
            <Bell size={20} color="#1F1F1F" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>

          {/* Profile Avatar Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => switchTab('profile')}
            style={styles.avatarCircleBtn}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Profile"
          >
            <Sprout size={20} color="#4B5D3A" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* 2. TODAY'S MEAL HERO */}
        <View style={styles.sectionContainer}>
          <Card style={styles.heroMealCard}>
            <View style={styles.heroSplitRow}>
              {/* Left Side */}
              <View style={styles.heroLeftCol}>
                <View style={styles.todaysMealBadge}>
                  <Sprout size={13} color="#4B5D3A" />
                  <Text style={styles.todaysMealBadgeText}>TODAY'S MEAL</Text>
                </View>

                <Text style={styles.heroMealTitle}>Andhra Veg Thali</Text>
                <Text style={styles.heroMealDesc}>
                  Seasonal vegetables, stone-ground dal & heritage brown rice.
                </Text>

                <View style={styles.dottedDivider} />

                <Text style={styles.heroStatsText}>
                  620 kcal <Text style={{ color: '#8A857B' }}>•</Text> 24g Protein
                </Text>

                <TouchableOpacity
                  activeOpacity={0.88}
                  onPress={() => switchTab('meals')}
                  style={styles.heroCtaPill}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="View Today's Menu"
                >
                  <Text style={styles.heroCtaPillText}>View Today's Menu</Text>
                  <ArrowRight size={16} color="#FFFFFF" style={{ marginLeft: 6 }} />
                </TouchableOpacity>
              </View>

              {/* Right Side Image */}
              <View style={styles.heroRightCol}>
                <View style={styles.freshTodayBadge}>
                  <Text style={styles.freshTodayPlus}>✦</Text>
                  <View>
                    <Text style={styles.freshTodayText}>FRESH</Text>
                    <Text style={styles.freshTodayText}>TODAY</Text>
                  </View>
                </View>

                <View style={styles.heroImageContainer}>
                  <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600' }}
                    style={styles.heroFoodImage}
                  />
                </View>
              </View>
            </View>
          </Card>
        </View>

        {/* 3. DELIVERY STATUS */}
        <View style={styles.sectionContainer}>
          <Card style={styles.deliveryCard}>
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={() => go('tracking')}
              style={styles.deliveryLeftCol}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Delivery Tracking"
            >
              <View style={styles.truckIconCircle}>
                <Truck size={20} color="#FFFFFF" />
              </View>
              <View>
                <Text style={styles.deliverySubLabel}>Delivery Today</Text>
                <Text style={styles.deliveryMainText}>
                  Arriving by <Text style={styles.deliveryTimeText}>12:45 PM</Text>
                </Text>
              </View>
            </TouchableOpacity>

            <View style={styles.deliveryVerticalDivider} />

            <TouchableOpacity
              activeOpacity={0.88}
              onPress={() => switchTab('kitchen')}
              style={styles.deliveryRightCol}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Live Kitchen"
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.kitchenTitleText}>Live Kitchen</Text>
                <Text style={styles.kitchenSubText}>See what's cooking right now</Text>
              </View>
              <View style={styles.chevronCircle}>
                <ChevronRight size={16} color="#1F1F1F" />
              </View>
            </TouchableOpacity>
          </Card>
        </View>

        {/* 4. QUICK ACTIONS */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsRow}>
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={() => switchTab('meals')}
              style={styles.actionCard}
            >
              <View style={[styles.actionIconCircle, { backgroundColor: '#4B5D3A' }]}>
                <Utensils size={22} color="#FFFFFF" />
              </View>
              <Text style={styles.actionCardTitle}>Meals</Text>
              <Text style={styles.actionCardSub}>Today's menu</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.88}
              onPress={() => switchTab('plans')}
              style={styles.actionCard}
            >
              <View style={[styles.actionIconCircle, { backgroundColor: '#C96B3C' }]}>
                <Calendar size={22} color="#FFFFFF" />
              </View>
              <Text style={styles.actionCardTitle}>Plan</Text>
              <Text style={styles.actionCardSub}>My subscription</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.88}
              onPress={() => switchTab('kitchen')}
              style={styles.actionCard}
            >
              <View style={[styles.actionIconCircle, { backgroundColor: '#D9B65A' }]}>
                <ChefHat size={22} color="#1F1F1F" />
              </View>
              <Text style={styles.actionCardTitle}>Kitchen</Text>
              <Text style={styles.actionCardSub}>Live & transparent</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.88}
              onPress={() => go('finances')}
              style={styles.actionCard}
            >
              <View style={[styles.actionIconCircle, { backgroundColor: '#3A4B2D' }]}>
                <Wallet size={22} color="#FFFFFF" />
              </View>
              <Text style={styles.actionCardTitle}>Wallet</Text>
              <Text style={styles.actionCardSub}>Balance & history</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 5. TODAY'S NUTRITION SUMMARY */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Today's Nutrition</Text>
          <Card style={{ padding: 18, backgroundColor: '#F4EFE6', borderRadius: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ fontFamily: theme.typography.monoFamily, fontSize: 22, color: '#C96B3C', fontWeight: '800' }}>620</Text>
                  <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 11, color: '#8A857B' }}>kcal</Text>
                </View>
                <View style={{ width: 1, height: 28, backgroundColor: '#E8E2D8' }} />
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ fontFamily: theme.typography.monoFamily, fontSize: 22, color: '#4B5D3A', fontWeight: '800' }}>24g</Text>
                  <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 11, color: '#8A857B' }}>Protein</Text>
                </View>
                <View style={{ width: 1, height: 28, backgroundColor: '#E8E2D8' }} />
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ fontFamily: theme.typography.monoFamily, fontSize: 22, color: '#1F1F1F', fontWeight: '800' }}>12g</Text>
                  <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 11, color: '#8A857B' }}>Fiber</Text>
                </View>
              </View>

              <View style={{ gap: 4, alignItems: 'flex-end' }}>
                <View style={{ paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, backgroundColor: '#FCFAF6', borderWidth: 1, borderColor: '#E8E2D8' }}>
                  <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 10, color: '#4B5D3A', fontWeight: '700' }}>🌿 Low Oil</Text>
                </View>
                <View style={{ paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, backgroundColor: 'rgba(201, 107, 60, 0.08)' }}>
                  <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 10, color: '#C96B3C', fontWeight: '700' }}>✨ Fresh Today</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => go('health_info')}
              style={{
                backgroundColor: '#FCFAF6',
                borderWidth: 1,
                borderColor: '#E8E2D8',
                paddingVertical: 10,
                borderRadius: 12,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 6
              }}
            >
              <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 12.5, color: '#4B5D3A', fontWeight: '700' }}>View Detailed Nutrition Breakdown</Text>
              <ArrowRight size={14} color="#4B5D3A" />
            </TouchableOpacity>
          </Card>
        </View>

        {/* 6. MEAL JOURNEY TIMELINE */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Today's Journey</Text>
          <Card style={{ padding: 18, backgroundColor: '#F4EFE6', borderRadius: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              
              {/* Step 1: Prepared */}
              <View style={{ alignItems: 'center', flex: 1 }}>
                <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: '#4B5D3A', justifyContent: 'center', alignItems: 'center' }}>
                  <CheckCircle2 size={16} color="#FFFFFF" />
                </View>
                <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 11, color: '#1F1F1F', fontWeight: '700', marginTop: 6 }}>Prepared</Text>
                <Text style={{ fontFamily: theme.typography.monoFamily, fontSize: 10, color: '#8A857B', marginTop: 2 }}>10:30 AM</Text>
              </View>

              <View style={{ width: 24, height: 2, backgroundColor: '#4B5D3A', marginBottom: 20 }} />

              {/* Step 2: Packed */}
              <View style={{ alignItems: 'center', flex: 1 }}>
                <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: '#4B5D3A', justifyContent: 'center', alignItems: 'center' }}>
                  <CheckCircle2 size={16} color="#FFFFFF" />
                </View>
                <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 11, color: '#1F1F1F', fontWeight: '700', marginTop: 6 }}>Packed</Text>
                <Text style={{ fontFamily: theme.typography.monoFamily, fontSize: 10, color: '#8A857B', marginTop: 2 }}>11:15 AM</Text>
              </View>

              <View style={{ width: 24, height: 2, backgroundColor: '#C96B3C', marginBottom: 20 }} />

              {/* Step 3: Out for Delivery (ACTIVE) */}
              <View style={{ alignItems: 'center', flex: 1 }}>
                <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: '#C96B3C', justifyContent: 'center', alignItems: 'center' }}>
                  <Truck size={15} color="#FFFFFF" />
                </View>
                <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 11, color: '#C96B3C', fontWeight: '800', marginTop: 6 }}>On The Way</Text>
                <Text style={{ fontFamily: theme.typography.monoFamily, fontSize: 10, color: '#C96B3C', fontWeight: '700', marginTop: 2 }}>Arjun Dev</Text>
              </View>

              <View style={{ width: 24, height: 2, backgroundColor: '#E8E2D8', marginBottom: 20 }} />

              {/* Step 4: Delivered */}
              <View style={{ alignItems: 'center', flex: 1 }}>
                <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: '#FCFAF6', borderWidth: 1, borderColor: '#E8E2D8', justifyContent: 'center', alignItems: 'center' }}>
                  <Clock size={14} color="#8A857B" />
                </View>
                <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 11, color: '#8A857B', marginTop: 6 }}>Delivered</Text>
                <Text style={{ fontFamily: theme.typography.monoFamily, fontSize: 10, color: '#8A857B', marginTop: 2 }}>~12:45 PM</Text>
              </View>

            </View>
          </Card>
        </View>

        {/* 7. UPCOMING DELIVERIES */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Upcoming</Text>
            <TouchableOpacity onPress={() => switchTab('meals')} style={styles.viewAllLink}>
              <Text style={styles.viewAllText}>View Weekly Menu</Text>
              <ChevronRight size={14} color="#4B5D3A" />
            </TouchableOpacity>
          </View>

          <View style={{ gap: 10 }}>
            {upcomingDeliveries.map((item) => (
              <Card key={item.id} style={{ padding: 14, backgroundColor: '#F4EFE6', borderRadius: 16 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <View style={{ paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, backgroundColor: '#4B5D3A' }}>
                      <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 10, color: '#FFFFFF', fontWeight: '800' }}>{item.day}</Text>
                    </View>
                    <View>
                      <Text style={{ fontFamily: theme.typography.headingFamily, fontSize: 14, color: '#1F1F1F', fontWeight: '700' }}>{item.title}</Text>
                      <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 11.5, color: '#8A857B', marginTop: 1 }}>{item.slot}</Text>
                    </View>
                  </View>
                  <ChevronRight size={16} color="#8A857B" />
                </View>
              </Card>
            ))}
          </View>
        </View>

        {/* 8. KITCHEN TODAY */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Kitchen Today</Text>
          <Card style={{ padding: 18, backgroundColor: '#F4EFE6', borderRadius: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#4B5D3A' }} />
                <Text style={{ fontFamily: theme.typography.monoFamily, fontSize: 13, color: '#4B5D3A', fontWeight: '800' }}>32 meals cooking now</Text>
              </View>
              <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 11.5, color: '#8A857B' }}>Chef Ravi · Started 8:30 AM</Text>
            </View>

            <View style={{ height: 1, backgroundColor: '#E8E2D8', marginBottom: 12 }} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginBottom: 14 }}>
              <View style={{ flex: 1, backgroundColor: '#FCFAF6', padding: 10, borderRadius: 12, borderWidth: 1, borderColor: '#E8E2D8' }}>
                <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 10, color: '#8A857B', fontWeight: '700' }}>TODAY'S OIL</Text>
                <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 12, color: '#1F1F1F', fontWeight: '700', marginTop: 2 }}>Cold-Pressed Groundnut</Text>
              </View>
              <View style={{ flex: 1, backgroundColor: '#FCFAF6', padding: 10, borderRadius: 12, borderWidth: 1, borderColor: '#E8E2D8' }}>
                <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 10, color: '#8A857B', fontWeight: '700' }}>SPICE BLEND</Text>
                <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 12, color: '#1F1F1F', fontWeight: '700', marginTop: 2 }}>Deccani Stone-Ground</Text>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => switchTab('kitchen')}
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 }}
            >
              <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 12.5, color: '#4B5D3A', fontWeight: '800' }}>View Live Kitchen Stream</Text>
              <ArrowRight size={14} color="#4B5D3A" />
            </TouchableOpacity>
          </Card>
        </View>

        {/* 9. DAILY WELLNESS */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Today's Wellness</Text>
          <Card style={{ padding: 18, backgroundColor: '#F4EFE6', borderRadius: 20 }}>
            {/* Protein Goal */}
            <View style={{ marginBottom: 14 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 12, color: '#1F1F1F', fontWeight: '700' }}>Protein Goal</Text>
                <Text style={{ fontFamily: theme.typography.monoFamily, fontSize: 12, color: '#4B5D3A', fontWeight: '800' }}>82% (100g / 120g)</Text>
              </View>
              <View style={{ height: 6, borderRadius: 3, backgroundColor: '#E8E2D8', overflow: 'hidden' }}>
                <View style={{ width: '82%', height: '100%', backgroundColor: '#4B5D3A', borderRadius: 3 }} />
              </View>
            </View>

            {/* Water Goal */}
            <View style={{ marginBottom: 14 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 12, color: '#1F1F1F', fontWeight: '700' }}>Water Goal</Text>
                <Text style={{ fontFamily: theme.typography.monoFamily, fontSize: 12, color: '#0EA5E9', fontWeight: '800' }}>6 / 8 Glasses</Text>
              </View>
              <View style={{ height: 6, borderRadius: 3, backgroundColor: '#E8E2D8', overflow: 'hidden' }}>
                <View style={{ width: '75%', height: '100%', backgroundColor: '#0EA5E9', borderRadius: 3 }} />
              </View>
            </View>

            {/* Calories */}
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 12, color: '#1F1F1F', fontWeight: '700' }}>Calories</Text>
                <Text style={{ fontFamily: theme.typography.monoFamily, fontSize: 12, color: '#C96B3C', fontWeight: '800' }}>620 / 2,100 kcal</Text>
              </View>
              <View style={{ height: 6, borderRadius: 3, backgroundColor: '#E8E2D8', overflow: 'hidden' }}>
                <View style={{ width: '30%', height: '100%', backgroundColor: '#C96B3C', borderRadius: 3 }} />
              </View>
            </View>
          </Card>
        </View>

        {/* 10. MEMBERSHIP BENEFITS */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Your Membership Includes</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
            {benefits.map((b, idx) => (
              <View key={idx} style={{ width: '48%', backgroundColor: '#F4EFE6', padding: 12, borderRadius: 16, borderWidth: 1, borderColor: '#E8E2D8' }}>
                <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: 'rgba(75, 93, 58, 0.1)', justifyContent: 'center', alignItems: 'center', marginBottom: 6 }}>
                  <CheckCircle2 size={14} color="#4B5D3A" />
                </View>
                <Text style={{ fontFamily: theme.typography.headingFamily, fontSize: 13, color: '#1F1F1F', fontWeight: '700' }}>{b.title}</Text>
                <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 10.5, color: '#8A857B', marginTop: 2, lineHeight: 14 }}>{b.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 11. KITCHEN TRANSPARENCY GRID */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Kitchen Transparency</Text>
          <View style={styles.transparencyGrid}>
            <TouchableOpacity activeOpacity={0.88} onPress={() => switchTab('kitchen')} style={styles.transparencyBtn}>
              <View style={[styles.transparencyIconWrap, { backgroundColor: '#E8F3E6' }]}>
                <Camera size={18} color="#4B5D3A" />
              </View>
              <Text style={styles.transparencyBtnText} numberOfLines={1}>Live Cameras</Text>
              <ChevronRight size={14} color="#8A857B" />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.88} onPress={() => switchTab('kitchen')} style={styles.transparencyBtn}>
              <View style={[styles.transparencyIconWrap, { backgroundColor: '#FBE8E0' }]}>
                <ShoppingBag size={18} color="#C96B3C" />
              </View>
              <Text style={styles.transparencyBtnText} numberOfLines={1}>Today's Ingredients</Text>
              <ChevronRight size={14} color="#8A857B" />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.88} onPress={() => switchTab('kitchen')} style={styles.transparencyBtn}>
              <View style={[styles.transparencyIconWrap, { backgroundColor: '#E8F3E6' }]}>
                <UserCheck size={18} color="#4B5D3A" />
              </View>
              <Text style={styles.transparencyBtnText} numberOfLines={1}>Meet Our Chefs</Text>
              <ChevronRight size={14} color="#8A857B" />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.88} onPress={() => go('tour_booking')} style={styles.transparencyBtn}>
              <View style={[styles.transparencyIconWrap, { backgroundColor: '#F7F0D8' }]}>
                <Calendar size={18} color="#D9B65A" />
              </View>
              <Text style={styles.transparencyBtnText} numberOfLines={1}>Book Kitchen Visit</Text>
              <ChevronRight size={14} color="#8A857B" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 12. REWARDS (KOI POINTS) */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>KOI Points</Text>
          <Card style={{ padding: 18, backgroundColor: '#F4EFE6', borderRadius: 20, borderWidth: 1, borderColor: '#E8E2D8' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#D9B65A', justifyContent: 'center', alignItems: 'center' }}>
                  <Crown size={20} color="#FFFFFF" />
                </View>
                <View>
                  <Text style={{ fontFamily: theme.typography.monoFamily, fontSize: 20, color: '#1F1F1F', fontWeight: '900' }}>1,240 pts</Text>
                  <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 11.5, color: '#8A857B' }}>Earn 80 more points to unlock Free Delivery.</Text>
                </View>
              </View>
              <ChevronRight size={16} color="#8A857B" />
            </View>
          </Card>
        </View>

        {/* 13. REFER & EARN BANNER */}
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => go('refer')}
            style={{
              backgroundColor: '#F4EFE6',
              borderRadius: 20,
              padding: 16,
              borderWidth: 1,
              borderColor: '#C96B3C',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 }}>
              <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(201, 107, 60, 0.12)', justifyContent: 'center', alignItems: 'center' }}>
                <Gift size={22} color="#C96B3C" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: theme.typography.headingFamily, fontSize: 15, color: '#1F1F1F', fontWeight: '800' }}>Invite Friends & Family</Text>
                <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 12, color: '#8A857B', marginTop: 1 }}>
                  Get <Text style={{ fontFamily: theme.typography.monoFamily, color: '#C96B3C', fontWeight: '800' }}>₹250</Text> Wallet Credit for every referral.
                </Text>
              </View>
            </View>

            <View style={{ paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, backgroundColor: '#C96B3C' }}>
              <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 11.5, color: '#FFFFFF', fontWeight: '800' }}>Refer Now</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* 14. SUBSCRIPTION CARD */}
        <View style={styles.sectionContainer}>
          <Card style={styles.subCard}>
            <View style={styles.subRow}>
              <View style={{ flex: 1 }}>
                <View style={styles.subCrownRow}>
                  <View style={styles.crownCircle}>
                    <Crown size={16} color="#D9B65A" />
                  </View>
                  <Text style={styles.subLabelText}>Your Subscription</Text>
                </View>

                <Text style={styles.subTitleText}>Premium Protein Plan</Text>
                <Text style={styles.subDaysText}>14 Days Remaining</Text>
              </View>

              <View style={styles.subButtonsCol}>
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => {
                    setPaused(!paused);
                    setToast(paused ? '🟢 Subscription Resumed' : '🟡 Subscription Paused');
                  }}
                  style={styles.pauseBtnPill}
                >
                  <Text style={styles.pauseBtnText}>{paused ? 'Resume' : 'Pause'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => switchTab('plans')}
                  style={styles.upgradeBtnPill}
                >
                  <Text style={styles.upgradeBtnText}>Upgrade</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        </View>

      </ScrollView>

      {/* 15. BOTTOM NAVIGATION */}
      <BottomTabNav active="home" />

    </PageLayout>
  );
}

const styles = StyleSheet.create({
  // Top Header
  headerBar: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FCFAF6',
  },
  greetingText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 14,
    color: '#8A857B',
    fontWeight: '600',
  },
  waveEmoji: {
    fontSize: 14,
  },
  userNameText: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 26,
    color: '#1F1F1F',
    fontWeight: '800',
    marginTop: 1,
    letterSpacing: -0.4,
  },
  planSubheadText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12.5,
    color: '#8A857B',
    marginTop: 1,
  },
  headerActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconCircleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F4EFE6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E2D8',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 11,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C96B3C',
  },
  avatarCircleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F4EFE6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },

  // Main Scroll & Sections
  scrollContent: {
    paddingBottom: 110,
  },
  sectionContainer: {
    paddingHorizontal: 16,
    marginTop: 18,
  },
  sectionTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 18,
    color: '#1F1F1F',
    fontWeight: '800',
    marginBottom: 10,
    letterSpacing: -0.3,
  },

  // Hero Meal Card
  heroMealCard: {
    backgroundColor: '#F4EFE6',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E8E2D8',
    padding: 20,
  },
  heroSplitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroLeftCol: {
    flex: 1,
    paddingRight: 12,
  },
  todaysMealBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FCFAF6',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#E8E2D8',
    marginBottom: 10,
  },
  todaysMealBadgeText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 10,
    color: '#4B5D3A',
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  heroMealTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 22,
    color: '#1F1F1F',
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  heroMealDesc: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12.5,
    color: '#8A857B',
    marginTop: 4,
    lineHeight: 17,
  },
  dottedDivider: {
    height: 1,
    borderWidth: 1,
    borderColor: '#E8E2D8',
    borderStyle: 'dashed',
    marginVertical: 12,
  },
  heroStatsText: {
    fontFamily: theme.typography.monoFamily,
    fontSize: 13,
    color: '#1F1F1F',
    fontWeight: '700',
    marginBottom: 14,
  },
  heroCtaPill: {
    backgroundColor: '#4B5D3A',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  heroCtaPillText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12.5,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  heroRightCol: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  freshTodayBadge: {
    position: 'absolute',
    top: -6,
    right: -4,
    zIndex: 10,
    backgroundColor: '#D9B65A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  freshTodayPlus: {
    color: '#1F1F1F',
    fontSize: 10,
  },
  freshTodayText: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 8.5,
    color: '#1F1F1F',
    fontWeight: '800',
    lineHeight: 10,
  },
  heroImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#FCFAF6',
  },
  heroFoodImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  // Delivery Card
  deliveryCard: {
    backgroundColor: '#F4EFE6',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E8E2D8',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryLeftCol: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  truckIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#C96B3C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliverySubLabel: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 11,
    color: '#C96B3C',
    fontWeight: '700',
  },
  deliveryMainText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 13,
    color: '#1F1F1F',
    fontWeight: '700',
    marginTop: 1,
  },
  deliveryTimeText: {
    fontFamily: theme.typography.monoFamily,
    color: '#C96B3C',
    fontWeight: '800',
  },
  deliveryVerticalDivider: {
    width: 1,
    height: 34,
    backgroundColor: '#E8E2D8',
    marginHorizontal: 12,
  },
  deliveryRightCol: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  kitchenTitleText: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 14,
    color: '#1F1F1F',
    fontWeight: '800',
  },
  kitchenSubText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 10.5,
    color: '#8A857B',
    marginTop: 1,
  },
  chevronCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FCFAF6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },

  // Quick Actions
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#F4EFE6',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E8E2D8',
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  actionIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionCardTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 13.5,
    color: '#1F1F1F',
    fontWeight: '800',
  },
  actionCardSub: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 10,
    color: '#8A857B',
    marginTop: 2,
    textAlign: 'center',
  },

  // Upcoming Header
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  viewAllLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  viewAllText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12,
    color: '#4B5D3A',
    fontWeight: '700',
  },

  // Kitchen Transparency
  transparencyGrid: {
    gap: 10,
  },
  transparencyBtn: {
    backgroundColor: '#F4EFE6',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8E2D8',
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  transparencyIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  transparencyBtnText: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 13.5,
    color: '#1F1F1F',
    fontWeight: '700',
    flex: 1,
  },

  // Subscription Card
  subCard: {
    backgroundColor: '#F4EFE6',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E8E2D8',
    padding: 18,
  },
  subRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subCrownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  crownCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FCFAF6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  subLabelText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 11,
    color: '#8A857B',
    fontWeight: '700',
  },
  subTitleText: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 16,
    color: '#1F1F1F',
    fontWeight: '800',
  },
  subDaysText: {
    fontFamily: theme.typography.monoFamily,
    fontSize: 12,
    color: '#4B5D3A',
    fontWeight: '800',
    marginTop: 3,
  },
  subButtonsCol: {
    gap: 8,
  },
  pauseBtnPill: {
    backgroundColor: '#FCFAF6',
    borderWidth: 1,
    borderColor: '#E8E2D8',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 14,
    alignItems: 'center',
  },
  pauseBtnText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12,
    color: '#1F1F1F',
    fontWeight: '700',
  },
  upgradeBtnPill: {
    backgroundColor: '#4B5D3A',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 14,
    alignItems: 'center',
  },
  upgradeBtnText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
