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
  ArrowRight,
  ShieldCheck,
  ChefHat,
  Truck,
  HeartPulse,
  Clock,
  Sparkles,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Star,
  Gift,
  Camera,
  ShoppingBag,
  UserCheck,
  Calendar,
  Utensils,
  Award,
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

export function NewUserHomeScreen() {
  const { user, go, switchTab } = useAppContext();

  // State for FAQ accordion expansion
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const whyUsPoints = [
    { title: 'Homemade Everyday', desc: 'Authentic regional recipes prepared fresh daily', icon: Sprout, color: '#4B5D3A' },
    { title: 'Hygienic Kitchen', desc: 'FSSAI certified ISO 22000 smart kitchen facility', icon: ShieldCheck, color: '#C96B3C' },
    { title: 'Delivered in Steel Dabbas', desc: 'Eco-insulated 100% food-grade stainless steel', icon: Truck, color: '#4B5D3A' },
    { title: 'Fresh Ingredients', desc: 'Direct farm-sourced cold-pressed oils & spices', icon: Sparkles, color: '#D9B65A' },
    { title: 'Nutrition Focused', desc: 'Macro balanced calories, protein & fiber breakdown', icon: HeartPulse, color: '#C96B3C' },
    { title: 'Pause Anytime', desc: 'Instant online pauses with wallet credit back', icon: Clock, color: '#4B5D3A' },
  ];

  const howItWorksSteps = [
    { num: '01', title: 'Choose Plan', desc: 'Daily, Weekly or Monthly' },
    { num: '02', title: 'Customize Meals', desc: 'Veg or Non-Veg preference' },
    { num: '03', title: 'We Cook Fresh', desc: 'Stone-ground spices & low oil' },
    { num: '04', title: 'Delivered Daily', desc: 'Hot in insulated steel dabbas' },
    { num: '05', title: 'Enjoy Healthy Living', desc: 'Pure home-cooked goodness' },
  ];

  const testimonials = [
    {
      name: 'Ananya Rao',
      role: 'Software Engineer',
      rating: 5,
      comment: 'Home food finally delivered right. Clean steel dabbas everyday and zero oiliness. Feels just like mom’s cooking!',
    },
    {
      name: 'Vikram Sharma',
      role: 'Product Designer',
      rating: 5,
      comment: 'Best subscription I have ever used. Healthy, timely and delicious. The live kitchen cameras gave me total confidence.',
    },
    {
      name: 'Rajesh K.',
      role: 'Bank Manager',
      rating: 5,
      comment: 'Food quality is amazing. Authentic stone-ground spices without preservatives. Pausing when I travel is super effortless.',
    },
  ];

  const faqs = [
    {
      q: 'Can I pause or skip meals anytime?',
      a: 'Yes! You can pause or resume single meals or multiple days anytime before 10:00 PM for the next day. Paused meal credits are automatically saved in your Dabba Wallet.',
    },
    {
      q: 'How are meals delivered?',
      a: 'Meals are packed hot in insulated 100% stainless steel dabbas and delivered straight to your doorstep or office desk by our dedicated delivery executive.',
    },
    {
      q: 'What is the food hygiene process?',
      a: 'Our smart kitchens follow strict FSSAI hygiene guidelines. We use 100% cold-pressed oils, unpolished dals, organic vegetables, and zero chemical preservatives.',
    },
    {
      q: 'How does billing and wallet work?',
      a: 'Subscriptions auto-renew seamlessly via your Dabba Wallet. You can top up your wallet or issue refunds back to your bank account anytime with 1-click.',
    },
  ];

  return (
    <PageLayout style={{ paddingHorizontal: 0 }} background="organic" backgroundVariant="minimal">
      
      {/* 1. WELCOME HERO SECTION */}
      <View style={styles.headerBar}>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text style={styles.greetingText}>Good Morning,</Text>
            <Text style={styles.waveEmoji}>👋</Text>
          </View>
          <Text style={styles.userNameText}>{user.name || 'Rithvik'}</Text>
          <Text style={styles.subTitleText}>Welcome to KOI KOI DABBA</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => go('notifications')}
          style={styles.iconCircleBtn}
        >
          <Bell size={20} color="#1F1F1F" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* HERO CARD */}
        <View style={styles.sectionContainer}>
          <Card style={styles.welcomeHeroCard}>
            <Text style={styles.heroBadge}>HOMEMADE • HYGIENIC • ORGANIC</Text>
            <Text style={styles.heroHeadingText}>
              Fresh home-cooked meals,{"\n"}made just for you.
            </Text>
            <Text style={styles.heroDescText}>
              Purely authentic regional recipes cooked with cold-pressed oils, stone-ground spices, and zero preservatives.
            </Text>

            <View style={styles.heroFoodImageWrapper}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800' }}
                style={styles.heroFoodImage}
              />
            </View>

            <View style={styles.heroCtaRow}>
              <TouchableOpacity
                activeOpacity={0.88}
                onPress={() => switchTab('plans')}
                style={styles.primaryCtaBtn}
              >
                <Text style={styles.primaryCtaBtnText}>Choose Your Plan</Text>
                <ArrowRight size={16} color="#FFFFFF" />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.88}
                onPress={() => switchTab('meals')}
                style={styles.secondaryCtaBtn}
              >
                <Text style={styles.secondaryCtaBtnText}>Explore Menu</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>

        {/* 2. WHY KOI KOI? */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Why KOI KOI?</Text>
          <View style={styles.whyGridContainer}>
            {whyUsPoints.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <View key={idx} style={styles.whyGridCard}>
                  <View style={[styles.whyIconCircle, { backgroundColor: 'rgba(75, 93, 58, 0.1)' }]}>
                    <IconComp size={20} color={item.color} />
                  </View>
                  <Text style={styles.whyCardTitle}>{item.title}</Text>
                  <Text style={styles.whyCardDesc}>{item.desc}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* 3. HOW IT WORKS */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>How It Works</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
            {howItWorksSteps.map((step, idx) => (
              <Card key={idx} style={styles.stepCard}>
                <Text style={styles.stepNum}>{step.num}</Text>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDesc}>{step.desc}</Text>
              </Card>
            ))}
          </ScrollView>
        </View>

        {/* 4. TODAY'S SAMPLE MENU */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Today's Sample Menu</Text>
            <TouchableOpacity onPress={() => switchTab('meals')} style={styles.linkBtn}>
              <Text style={styles.linkBtnText}>View Full Menu</Text>
              <ChevronRight size={14} color="#4B5D3A" />
            </TouchableOpacity>
          </View>

          <View style={{ gap: 12 }}>
            {/* Sample Veg */}
            <Card style={styles.sampleMealCard}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500' }} style={styles.sampleMealImg} />
              <View style={{ flex: 1, paddingLeft: 12 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <View style={{ paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, backgroundColor: '#4B5D3A' }}>
                    <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 9, color: '#FFFFFF', fontWeight: '800' }}>VEG</Text>
                  </View>
                  <Text style={{ fontFamily: theme.typography.headingFamily, fontSize: 15, color: '#1F1F1F', fontWeight: '800' }}>Andhra Veg Thali</Text>
                </View>
                <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 11.5, color: '#8A857B', marginTop: 3 }} numberOfLines={2}>
                  Seasonal vegetables, stone-ground dal & brown rice.
                </Text>
                <Text style={{ fontFamily: theme.typography.monoFamily, fontSize: 12, color: '#C96B3C', fontWeight: '800', marginTop: 6 }}>
                  620 kcal • 24g Protein
                </Text>
              </View>
            </Card>

            {/* Sample Non-Veg */}
            <Card style={styles.sampleMealCard}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500' }} style={styles.sampleMealImg} />
              <View style={{ flex: 1, paddingLeft: 12 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <View style={{ paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, backgroundColor: '#C96B3C' }}>
                    <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 9, color: '#FFFFFF', fontWeight: '800' }}>NON-VEG</Text>
                  </View>
                  <Text style={{ fontFamily: theme.typography.headingFamily, fontSize: 15, color: '#1F1F1F', fontWeight: '800' }}>Heritage Chicken Thali</Text>
                </View>
                <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 11.5, color: '#8A857B', marginTop: 3 }} numberOfLines={2}>
                  Slow braised dhaba style chicken curry with 3 chapatis.
                </Text>
                <Text style={{ fontFamily: theme.typography.monoFamily, fontSize: 12, color: '#4B5D3A', fontWeight: '800', marginTop: 6 }}>
                  680 kcal • 38g Protein
                </Text>
              </View>
            </Card>
          </View>
        </View>

        {/* 5. SUBSCRIPTION PLANS PREVIEW */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Subscription Plans</Text>
            <TouchableOpacity onPress={() => switchTab('plans')} style={styles.linkBtn}>
              <Text style={styles.linkBtnText}>View All Plans</Text>
              <ChevronRight size={14} color="#4B5D3A" />
            </TouchableOpacity>
          </View>

          <View style={styles.plansPreviewGrid}>
            {[
              { title: 'Daily', price: '₹180', tag: 'Flexible' },
              { title: 'Weekly', price: '₹1,099', tag: 'Popular' },
              { title: 'Monthly', price: '₹3,999', tag: 'Best Value' },
              { title: 'Family', price: '₹6,999', tag: '2 People' },
              { title: 'Student', price: '₹2,499', tag: 'Campus' },
              { title: 'Corporate', price: '₹8,999', tag: 'Desk' },
            ].map((p, idx) => (
              <TouchableOpacity
                key={idx}
                activeOpacity={0.88}
                onPress={() => switchTab('plans')}
                style={styles.planPreviewCard}
              >
                <Text style={styles.planPreviewTag}>{p.tag}</Text>
                <Text style={styles.planPreviewTitle}>{p.title}</Text>
                <Text style={styles.planPreviewPrice}>{p.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 6. KITCHEN TRANSPARENCY */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Kitchen Transparency</Text>
          <Card style={{ padding: 16, backgroundColor: '#F4EFE6', borderRadius: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#E8F3E6', justifyContent: 'center', alignItems: 'center' }}>
                <Camera size={20} color="#4B5D3A" />
              </View>
              <View>
                <Text style={{ fontFamily: theme.typography.headingFamily, fontSize: 15, color: '#1F1F1F', fontWeight: '800' }}>Live Kitchen Cameras</Text>
                <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 11.5, color: '#8A857B' }}>Watch your food cooked live anytime</Text>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.88}
              onPress={() => switchTab('kitchen')}
              style={styles.exploreKitchenBtn}
            >
              <Text style={styles.exploreKitchenBtnText}>Explore Live Kitchen</Text>
              <ArrowRight size={14} color="#FFFFFF" />
            </TouchableOpacity>
          </Card>
        </View>

        {/* 7. CUSTOMER REVIEWS */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Loved by 10,000+ Members</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
            {testimonials.map((t, idx) => (
              <Card key={idx} style={styles.reviewCard}>
                <View style={{ flexDirection: 'row', gap: 2, marginBottom: 8 }}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={14} color="#D9B65A" fill="#D9B65A" />
                  ))}
                </View>
                <Text style={styles.reviewComment}>"{t.comment}"</Text>
                <Text style={styles.reviewName}>{t.name}</Text>
                <Text style={styles.reviewRole}>{t.role}</Text>
              </Card>
            ))}
          </ScrollView>
        </View>

        {/* 8. WHY PEOPLE LOVE KOI KOI (ANIMATED STATISTICS) */}
        <View style={styles.sectionContainer}>
          <Card style={styles.statsContainer}>
            <View style={styles.statsGrid}>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>10,000+</Text>
                <Text style={styles.statLabel}>Meals Delivered</Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.statNumber}>98%</Text>
                <Text style={styles.statLabel}>Customer Rating</Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.statNumber}>100%</Text>
                <Text style={styles.statLabel}>Fresh Ingredients</Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.statNumber}>0%</Text>
                <Text style={styles.statLabel}>Preservatives</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* 9. FREQUENTLY ASKED QUESTIONS */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          <View style={{ gap: 10 }}>
            {faqs.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <TouchableOpacity
                  key={idx}
                  activeOpacity={0.9}
                  onPress={() => toggleFaq(idx)}
                  style={styles.faqCard}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.faqQuestion}>{faq.q}</Text>
                    {isOpen ? <ChevronUp size={16} color="#8A857B" /> : <ChevronDown size={16} color="#8A857B" />}
                  </View>
                  {isOpen && (
                    <Text style={styles.faqAnswer}>{faq.a}</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* 10. REFER FRIENDS BANNER */}
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => go('refer')}
            style={styles.referBanner}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 }}>
              <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(201, 107, 60, 0.12)', justifyContent: 'center', alignItems: 'center' }}>
                <Gift size={22} color="#C96B3C" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: theme.typography.headingFamily, fontSize: 15, color: '#1F1F1F', fontWeight: '800' }}>Invite Friends & Earn</Text>
                <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 12, color: '#8A857B', marginTop: 1 }}>
                  Get <Text style={{ fontFamily: theme.typography.monoFamily, color: '#C96B3C', fontWeight: '800' }}>₹250</Text> Wallet Credit for every friend.
                </Text>
              </View>
            </View>

            <View style={{ paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, backgroundColor: '#C96B3C' }}>
              <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 11.5, color: '#FFFFFF', fontWeight: '800' }}>Refer Now</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* 11. BOTTOM CONVERSION CTA BANNER */}
        <View style={styles.sectionContainer}>
          <Card style={styles.bottomCtaBanner}>
            <Text style={styles.bottomCtaSub}>READY TO EAT HEALTHIER?</Text>
            <Text style={styles.bottomCtaTitle}>Choose Your First Plan Today</Text>
            <Text style={styles.bottomCtaDesc}>
              Join 10,000+ members enjoying pure home-cooked meals delivered in warm insulated steel dabbas.
            </Text>

            <TouchableOpacity
              activeOpacity={0.88}
              onPress={() => switchTab('plans')}
              style={styles.subscribeNowBtn}
            >
              <Text style={styles.subscribeNowBtnText}>Subscribe Now</Text>
              <ArrowRight size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </Card>
        </View>

      </ScrollView>

      {/* BOTTOM NAVIGATION */}
      <BottomTabNav active="home" />

    </PageLayout>
  );
}

const styles = StyleSheet.create({
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
  subTitleText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12.5,
    color: '#8A857B',
    marginTop: 1,
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
  },
  scrollContent: {
    paddingBottom: 110,
  },
  sectionContainer: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  sectionTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 18,
    color: '#1F1F1F',
    fontWeight: '800',
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  linkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  linkBtnText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12,
    color: '#4B5D3A',
    fontWeight: '700',
  },

  // Welcome Hero Card
  welcomeHeroCard: {
    backgroundColor: '#F4EFE6',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E8E2D8',
    padding: 20,
  },
  heroBadge: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 10,
    color: '#4B5D3A',
    fontWeight: '800',
    letterSpacing: 0.6,
    marginBottom: 6,
  },
  heroHeadingText: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 24,
    color: '#1F1F1F',
    fontWeight: '800',
    lineHeight: 30,
  },
  heroDescText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12.5,
    color: '#8A857B',
    marginTop: 6,
    lineHeight: 18,
  },
  heroFoodImageWrapper: {
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: 16,
  },
  heroFoodImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroCtaRow: {
    flexDirection: 'row',
    gap: 10,
  },
  primaryCtaBtn: {
    flex: 1,
    backgroundColor: '#4B5D3A',
    paddingVertical: 12,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  primaryCtaBtnText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  secondaryCtaBtn: {
    flex: 1,
    backgroundColor: '#FCFAF6',
    borderWidth: 1,
    borderColor: '#E8E2D8',
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryCtaBtnText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 13,
    color: '#1F1F1F',
    fontWeight: '700',
  },

  // Why KOI KOI Grid
  whyGridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  whyGridCard: {
    width: '48%',
    backgroundColor: '#F4EFE6',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E8E2D8',
    padding: 14,
  },
  whyIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  whyCardTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 13.5,
    color: '#1F1F1F',
    fontWeight: '800',
  },
  whyCardDesc: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 10.5,
    color: '#8A857B',
    marginTop: 3,
    lineHeight: 14,
  },

  // Step Cards
  stepCard: {
    width: 140,
    backgroundColor: '#F4EFE6',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  stepNum: {
    fontFamily: theme.typography.monoFamily,
    fontSize: 18,
    color: '#4B5D3A',
    fontWeight: '900',
  },
  stepTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 13,
    color: '#1F1F1F',
    fontWeight: '800',
    marginTop: 6,
  },
  stepDesc: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 10.5,
    color: '#8A857B',
    marginTop: 2,
  },

  // Sample Meals
  sampleMealCard: {
    padding: 12,
    backgroundColor: '#F4EFE6',
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sampleMealImg: {
    width: 80,
    height: 80,
    borderRadius: 14,
  },

  // Plans Preview Grid
  plansPreviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  planPreviewCard: {
    width: '31%',
    backgroundColor: '#F4EFE6',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8E2D8',
    padding: 12,
    alignItems: 'center',
  },
  planPreviewTag: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 9,
    color: '#4B5D3A',
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  planPreviewTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 13,
    color: '#1F1F1F',
    fontWeight: '800',
    marginTop: 4,
  },
  planPreviewPrice: {
    fontFamily: theme.typography.monoFamily,
    fontSize: 14,
    color: '#C96B3C',
    fontWeight: '800',
    marginTop: 2,
  },

  // Explore Kitchen Button
  exploreKitchenBtn: {
    backgroundColor: '#4B5D3A',
    paddingVertical: 12,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  exploreKitchenBtnText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12.5,
    color: '#FFFFFF',
    fontWeight: '700',
  },

  // Testimonial Cards
  reviewCard: {
    width: 240,
    backgroundColor: '#F4EFE6',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  reviewComment: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12,
    color: '#1F1F1F',
    lineHeight: 17,
  },
  reviewName: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 12.5,
    color: '#1F1F1F',
    fontWeight: '800',
    marginTop: 10,
  },
  reviewRole: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 10.5,
    color: '#8A857B',
  },

  // Animated Statistics
  statsContainer: {
    padding: 18,
    backgroundColor: '#F4EFE6',
    borderRadius: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statBox: {
    width: '46%',
    backgroundColor: '#FCFAF6',
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  statNumber: {
    fontFamily: theme.typography.monoFamily,
    fontSize: 22,
    color: '#4B5D3A',
    fontWeight: '900',
  },
  statLabel: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 10.5,
    color: '#8A857B',
    marginTop: 2,
    textAlign: 'center',
  },

  // FAQs
  faqCard: {
    backgroundColor: '#F4EFE6',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8E2D8',
    padding: 14,
  },
  faqQuestion: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 13.5,
    color: '#1F1F1F',
    fontWeight: '700',
    flex: 1,
    paddingRight: 8,
  },
  faqAnswer: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 11.5,
    color: '#8A857B',
    marginTop: 8,
    lineHeight: 16,
  },

  // Refer Banner
  referBanner: {
    backgroundColor: '#F4EFE6',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#C96B3C',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Bottom Conversion CTA Banner
  bottomCtaBanner: {
    backgroundColor: '#F4EFE6',
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#4B5D3A',
    padding: 22,
    alignItems: 'center',
    textAlign: 'center',
  },
  bottomCtaSub: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 10.5,
    color: '#C96B3C',
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  bottomCtaTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 22,
    color: '#1F1F1F',
    fontWeight: '800',
    marginTop: 4,
    textAlign: 'center',
  },
  bottomCtaDesc: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12,
    color: '#8A857B',
    marginTop: 6,
    textAlign: 'center',
    lineHeight: 17,
  },
  subscribeNowBtn: {
    backgroundColor: '#4B5D3A',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
  },
  subscribeNowBtnText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '800',
  },
});
