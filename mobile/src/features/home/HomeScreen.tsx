import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  ImageBackground
} from 'react-native';
import {
  UtensilsCrossed,
  Coffee,
  ChefHat,
  Leaf,
  Flame,
  Wallet,
  Bell,
  Sparkles,
  ChevronRight,
  Bike,
  Check,
  Gift,
  Tag,
  Star,
  LayoutGrid,
  ChevronDown,
  MapPin,
  Search,
  X,
  Video,
  Heart,
  Package
} from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';
import { useAppContext } from '../../app/context';
import { theme, F } from '../../design-system';
import { Text as RNText } from 'react-native';

const B = {
  orange: theme.colors.secondary,
  orangeL: 'rgba(201, 107, 60, 0.08)',
  green: theme.colors.success,
  greenL: 'rgba(75, 93, 58, 0.08)',
  cream: theme.colors.light.surface,
  creamL: theme.colors.light.bg,
};

function Text({ style, ...props }: any) {
  const flatStyle = StyleSheet.flatten(style || {});
  let fontFamily = F.body;
  
  const content = String(props.children || '');
  
  // Rule for Mono numbers (prices, wallet, calories, protein, ratings, OTP, timers, dates)
  const isNumeric = /[₹\d]/.test(content) && (
    /^[₹\d\s★%\-.:\+a-zA-Z\s]+$/.test(content) ||
    content.includes('kcal') ||
    content.includes('protein') ||
    content.includes('Carbs') ||
    content.includes('₹') ||
    content.includes('min') ||
    content.includes('km') ||
    content.includes('left')
  );

  if (flatStyle.fontFamily) {
    fontFamily = flatStyle.fontFamily;
  } else if (flatStyle.fontSize >= 15 && (flatStyle.fontWeight === '900' || flatStyle.fontWeight === '800' || flatStyle.fontWeight === 'bold')) {
    fontFamily = isNumeric ? F.mono : F.heading;
  } else if (isNumeric) {
    fontFamily = F.mono;
  }

  return <RNText style={[{ fontFamily }, style]} {...props} />;
}

import { IMG } from '../../core/constants/meals';
import {
  LeafBranchSvg,
  PremiumSteelDabbaSvg,
  LiveKitchenThumbnailSvg,
  OverlappingAvatars
} from '../../core/components/SvgIcons';
import { BottomTabNav } from '../../core/components/BottomTabNav';

export default function HomeScreen() {
  const {
    subscribed,
    user,
    go,
    t,
    isDark,
    searchQuery,
    setSearchQuery,
    selectedFilter,
    setSelectedFilter,
    setSelectedMealId,
    setToast,
    setShowSearchModal,
    selectedAddress
  } = useAppContext();

  if (!subscribed) {
    return <NewUserHomeScreen />;
  }

  const categories = [
    { name: 'All Meals', icon: UtensilsCrossed },
    { name: 'South Indian', icon: Coffee },
    { name: 'North Indian', icon: ChefHat },
    { name: 'Healthy', icon: Leaf },
    { name: 'Snacks', icon: Flame }
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.light.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 110 }} showsVerticalScrollIndicator={false}>
        
        {/* Header Row & Greetings */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: 16, paddingTop: 16 }}>
          <View>
            <TouchableOpacity
              onPress={() => go('profile')}
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: B.orangeL,
                borderWidth: 2,
                borderColor: B.orange,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: B.orange,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 8,
                elevation: 3
              }}
            >
              <Text style={{ fontSize: 24 }}>{user.avatar || '👩‍🍳'}</Text>
            </TouchableOpacity>
            <View style={{ marginTop: 12 }}>
              <Text style={{ fontSize: 13, color: t.sub, fontWeight: '600', letterSpacing: 0.5 }}>Good Morning,</Text>
              <Text style={{ fontSize: 26, fontWeight: '900', color: t.text, marginTop: 2 }}>{user.name || 'Bhargav'} 👋</Text>
            </View>
          </View>
          
          <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
            <TouchableOpacity
              style={{ paddingHorizontal: 12, height: 44, borderRadius: 22, backgroundColor: t.card, borderWidth: 1, borderColor: t.border, flexDirection: 'row', alignItems: 'center', gap: 6 }}
              onPress={() => go('payments')}
            >
              <Wallet size={16} color={B.orange} />
              <Text style={{ fontSize: 13, fontWeight: '900', color: t.text }}>₹1,250</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: t.card, borderWidth: 1, borderColor: t.border, justifyContent: 'center', alignItems: 'center' }}
              onPress={() => go('notifications')}
            >
              <Bell size={20} color={t.text} />
              <View style={{ position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: 4, backgroundColor: '#EF4444' }} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Fluid Animations Demo Link */}
        <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
          <TouchableOpacity
            onPress={() => go('animation_demo')}
            style={{
              backgroundColor: B.orange,
              borderRadius: 20,
              paddingVertical: 12,
              paddingHorizontal: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              shadowColor: B.orange,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 8,
              elevation: 3
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Sparkles size={16} color="#FFFFFF" />
              <View>
                <Text style={{ color: '#FFFFFF', fontSize: 13, fontWeight: '800' }}>Fluid Animations Demo</Text>
                <Text style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: 10, marginTop: 1 }}>3D Carousel, Bottom Sheet, Shared List, Particle Arc</Text>
              </View>
            </View>
            <ChevronRight size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* 1. Live Tracking Card */}
        <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
          <TouchableOpacity onPress={() => go('tracking')} style={{
            backgroundColor: t.card,
            borderRadius: 24,
            borderWidth: 1.5,
            borderColor: B.orangeL,
            padding: 16,
            shadowColor: '#A05020',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.05,
            shadowRadius: 16,
            elevation: 4
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                  <View style={{ backgroundColor: '#FEE2E2', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>
                    <Text style={{ fontSize: 9, fontWeight: '900', color: '#EF4444', letterSpacing: 0.5 }}>LIVE TRACKING</Text>
                  </View>
                  <View style={{ backgroundColor: '#EAF7EE', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>
                    <Text style={{ fontSize: 9, fontWeight: '900', color: '#2E7D32', letterSpacing: 0.5 }}>VEG</Text>
                  </View>
                </View>
                <Text style={{ fontSize: 18, fontWeight: '900', color: t.text }}>Dal Tadka + Steamed Rice</Text>
                <Text style={{ fontSize: 11, fontWeight: 'bold', color: t.sub, marginTop: 2 }}>☀️ Lunch Slot · 12:30 PM</Text>
              </View>

              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1599889958709-e609f2c47798?w=200' }} 
                style={{ width: 64, height: 64, borderRadius: 14, borderWidth: 1, borderColor: t.border }} 
              />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12, gap: 6 }}>
              <Bike size={14} color={B.orange} />
              <Text style={{ fontSize: 12, color: t.sub, fontWeight: '600' }}>
                Arjun is <Text style={{ color: t.text, fontWeight: 'bold' }}>2.4 km away</Text> · Delivery in <Text style={{ color: B.orange, fontWeight: 'bold' }}>12 min</Text>
              </Text>
            </View>

            <View style={{ marginTop: 20 }}>
              <View style={{ position: 'absolute', top: 8, left: 15, right: 15, height: 3, backgroundColor: t.border, zIndex: 0 }}>
                <View style={{ width: '50%', height: '100%', backgroundColor: B.orange }} />
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', zIndex: 1 }}>
                {[
                  { label: 'Prepared', status: 'done' },
                  { label: 'On the Way', status: 'active' },
                  { label: 'Delivered', status: 'pending' }
                ].map((step, idx) => {
                  const isDone = step.status === 'done';
                  const isActive = step.status === 'active';
                  return (
                    <View key={idx} style={{ alignItems: 'center', flex: 1 }}>
                      <View style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        backgroundColor: isDone ? B.orange : (isActive ? '#FFFFFF' : t.card),
                        borderWidth: 2,
                        borderColor: isDone || isActive ? B.orange : t.border,
                        justifyContent: 'center',
                        alignItems: 'center',
                        shadowColor: isDone || isActive ? B.orange : '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4
                      }}>
                        {isDone && <Check size={10} color="#FFFFFF" strokeWidth={3} />}
                        {isActive && <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: B.orange }} />}
                      </View>
                      <Text style={{
                        fontSize: 10,
                        fontWeight: '800',
                        color: isDone || isActive ? t.text : t.muted,
                        marginTop: 6
                      }}>
                        {step.label}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* 2 & 3. Active Monthly Dabba + My Wallet (Side-by-Side) */}
        <View style={{ flexDirection: 'row', gap: 12, paddingHorizontal: 16, marginTop: 16 }}>
          <View style={{
            flex: 1,
            backgroundColor: t.card,
            borderRadius: 24,
            borderWidth: 1,
            borderColor: t.border,
            overflow: 'hidden'
          }}>
            <ImageBackground
              source={{ uri: 'https://images.unsplash.com/photo-1599889958709-e609f2c47798?w=300' }}
              style={{ flex: 1, padding: 16, minHeight: 140, justifyContent: 'space-between' }}
              imageStyle={{ opacity: 0.15, borderRadius: 24 }}
            >
              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <View style={{ backgroundColor: '#FFF4EC', paddingHorizontal: 6, paddingVertical: 3, borderRadius: 6 }}>
                    <Text style={{ fontSize: 8.5, fontWeight: '900', color: B.orange }}>ACTIVE</Text>
                  </View>
                  <View style={{ backgroundColor: '#FEF3C7', paddingHorizontal: 6, paddingVertical: 3, borderRadius: 6 }}>
                    <Text style={{ fontSize: 8.5, fontWeight: '900', color: '#D97706' }}>GOLD</Text>
                  </View>
                </View>
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: t.sub }}>Monthly Dabba</Text>
                <Text style={{ fontSize: 16, fontWeight: '900', color: t.text, marginTop: 2 }}>Day 3 of 30 left</Text>
              </View>
              <TouchableOpacity onPress={() => go('plans')} style={{ marginTop: 12 }}>
                <Text style={{ fontSize: 11, fontWeight: '800', color: B.orange }}>Manage plan →</Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>

            <View style={{
              flex: 1,
              backgroundColor: t.card,
              borderRadius: 24,
              borderWidth: 1,
              borderColor: t.border,
              overflow: 'hidden'
            }}>
              <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=300' }}
                style={{ flex: 1, padding: 16, minHeight: 140, justifyContent: 'space-between' }}
                imageStyle={{ opacity: 0.08, borderRadius: 24 }}
              >
                <View>
                  <View style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: B.orangeL, justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>
                    <Wallet size={16} color={B.orange} />
                  </View>
                  <Text style={{ fontSize: 13, fontWeight: 'bold', color: t.sub }}>My Wallet Balance</Text>
                  <Text style={{ fontSize: 18, fontWeight: '900', color: t.text, marginTop: 2 }}>₹1,250.00 cash</Text>
                </View>
                <TouchableOpacity onPress={() => go('payments')} style={{ marginTop: 12 }}>
                  <Text style={{ fontSize: 11, fontWeight: '800', color: B.orange }}>View statement →</Text>
                </TouchableOpacity>
              </ImageBackground>
            </View>
          </View>

          {/* 4 & 5. Live Kitchen + Referrals (Side-by-Side) */}
          <View style={{ flexDirection: 'row', gap: 12, paddingHorizontal: 16, marginTop: 12 }}>
            <View style={{
              flex: 1,
              backgroundColor: '#1E1814',
              borderRadius: 24,
              borderWidth: 1,
              borderColor: t.border,
              overflow: 'hidden'
            }}>
              <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=300' }}
                style={{ flex: 1, minHeight: 145 }}
                imageStyle={{ borderRadius: 24 }}
              >
                <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.48)', padding: 16, justifyContent: 'space-between' }}>
                  <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <View style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: 'rgba(255, 255, 255, 0.2)', justifyContent: 'center', alignItems: 'center' }}>
                        <Video size={16} color="#FFFFFF" />
                      </View>
                      <View style={{ backgroundColor: '#EF4444', paddingHorizontal: 6, paddingVertical: 3, borderRadius: 6 }}>
                        <Text style={{ fontSize: 8.5, fontWeight: '900', color: '#FFFFFF' }}>LIVE</Text>
                      </View>
                    </View>
                    <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#FFFFFF' }}>Watch Live Kitchen</Text>
                    <Text style={{ fontSize: 11, color: '#E0D0C5', marginTop: 2 }}>A+ Certified Hygiene</Text>
                  </View>
                  <TouchableOpacity onPress={() => go('kitchen')} style={{ marginTop: 12 }}>
                    <Text style={{ fontSize: 11, fontWeight: '800', color: '#FF9E66' }}>Meet the Chef →</Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>

            <View style={{
              flex: 1,
              backgroundColor: '#1E1814',
              borderRadius: 24,
              borderWidth: 1,
              borderColor: t.border,
              overflow: 'hidden'
            }}>
              <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1530062848155-8a3a0ad05165?w=300' }}
                style={{ flex: 1, minHeight: 145 }}
                imageStyle={{ borderRadius: 24 }}
              >
                <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.48)', padding: 16, justifyContent: 'space-between' }}>
                  <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <View style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: 'rgba(255, 255, 255, 0.2)', justifyContent: 'center', alignItems: 'center' }}>
                        <Gift size={16} color="#FFFFFF" />
                      </View>
                      <View style={{ backgroundColor: '#FF852C', paddingHorizontal: 6, paddingVertical: 3, borderRadius: 6 }}>
                        <Text style={{ fontSize: 8.5, fontWeight: '900', color: '#FFFFFF' }}>🎁 FREE</Text>
                      </View>
                    </View>
                    <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#FFFFFF' }}>Invite Friends</Text>
                    <Text style={{ fontSize: 11, color: '#E0D0C5', marginTop: 2 }}>Get ₹100 / referral</Text>
                  </View>
                  <TouchableOpacity onPress={() => go('refer')} style={{ marginTop: 12 }}>
                    <Text style={{ fontSize: 11, fontWeight: '800', color: '#FF9E66' }}>Get coupon code →</Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>
          </View>

        {/* 6. Up Next Tomorrow */}
        <View style={{ paddingHorizontal: 16, marginTop: 24 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: '900', color: t.text }}>Up Next tomorrow</Text>
            <TouchableOpacity onPress={() => go('meals')}>
              <Text style={{ fontSize: 13, fontWeight: 'bold', color: B.orange }}>Full Menu →</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => go('meals')} style={{
            backgroundColor: t.card,
            borderRadius: 24,
            borderWidth: 1,
            borderColor: t.border,
            padding: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <View style={{ flex: 1, marginRight: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <View style={{ backgroundColor: B.orangeL, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>
                  <Text style={{ fontSize: 9, fontWeight: '900', color: B.orange, letterSpacing: 0.5 }}>TOMORROW LUNCH</Text>
                </View>
                <Text style={{ fontSize: 11, fontWeight: 'bold', color: t.sub, marginLeft: 8 }}>12:30 PM</Text>
              </View>
              <Text style={{ fontSize: 16, fontWeight: '900', color: t.text }}>Andhra Chicken + Bagara Rice</Text>
              <Text style={{ fontSize: 11, color: t.sub, marginTop: 4 }}>560 kcal · 34g protein</Text>
            </View>

            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=200' }} 
              style={{ width: 72, height: 72, borderRadius: 16, borderWidth: 1, borderColor: t.border }}
            />
          </TouchableOpacity>
        </View>

        {/* 7. Active Wallet Coupons */}
        <View style={{ marginTop: 24 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginBottom: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: '900', color: t.text }}>Active Wallet Coupons</Text>
            <TouchableOpacity onPress={() => setToast('All Coupons Loaded')}>
              <Text style={{ fontSize: 13, fontWeight: 'bold', color: B.orange }}>View all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}>
            {[
              { code: 'WELCOME50', desc: '₹50 off next billing' },
              { code: 'SAVE20', desc: '20% off monthly tier' },
              { code: 'REFER100', desc: 'Earn cash in wallet' }
            ].map((cp, idx) => (
              <TouchableOpacity
                key={idx}
                style={{
                  backgroundColor: t.card,
                  borderWidth: 1.5,
                  borderColor: B.orangeL,
                  borderRadius: 16,
                  padding: 12,
                  width: 170,
                  borderStyle: 'dashed'
                }}
                onPress={() => setToast(`${cp.code} Coupon Active!`)}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <Tag size={12} color={B.orange} />
                  <Text style={{ fontSize: 12, fontWeight: '900', color: B.orange }}>{cp.code}</Text>
                </View>
                <Text style={{ fontSize: 11, color: t.text, fontWeight: '600' }}>{cp.desc}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* 8. Recommended for user */}
        <View style={{ paddingHorizontal: 16, marginTop: 24 }}>
          <Text style={{ fontSize: 18, fontWeight: '900', color: t.text, marginBottom: 12 }}>
            Recommended for {user.name || 'Bhargav'}
          </Text>

          <View style={{ gap: 12 }}>
            {[
              { name: 'Dal Tadka + Steamed Rice', cal: '380 kcal', prot: '14g protein', pref: 'VEG', img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400' },
              { name: 'Paneer Butter Masala + Roti', cal: '420 kcal', prot: '18g protein', pref: 'VEG', img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400' }
            ].map((item, idx) => (
              <View
                key={idx}
                style={{
                  flexDirection: 'row',
                  backgroundColor: t.card,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: t.border,
                  padding: 10,
                  alignItems: 'center'
                }}
              >
                <Image source={{ uri: item.img }} style={{ width: 70, height: 70, borderRadius: 12 }} />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: t.text }}>{item.name}</Text>
                    <View style={{ backgroundColor: '#EAF7EE', paddingHorizontal: 4, paddingVertical: 2, borderRadius: 4 }}>
                      <Text style={{ fontSize: 8, fontWeight: '900', color: '#2E7D32' }}>{item.pref}</Text>
                    </View>
                  </View>
                  <Text style={{ fontSize: 11, color: t.sub, marginTop: 4 }}>{item.cal} · {item.prot}</Text>
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: B.orange,
                    borderRadius: 10,
                    paddingHorizontal: 12,
                    paddingVertical: 6
                  }}
                  onPress={() => setToast('Added to Cart!')}
                >
                  <Text style={{ fontSize: 11, fontWeight: '900', color: '#FFFFFF' }}>+ Add</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>

      <BottomTabNav active="home" />
    </SafeAreaView>
  );
}

function NewUserHomeScreen() {
  const {
    user,
    go,
    t,
    isDark,
    searchQuery,
    setSearchQuery,
    selectedFilter,
    setSelectedFilter,
    setSelectedMealId,
    setToast,
    setShowSearchModal,
    selectedAddress
  } = useAppContext();

  const categories = [
    { id: 'All Menu', label: 'All Menu', icon: LayoutGrid, color: B.orange, bg: `${B.orange}10` },
    { id: 'Healthy', label: 'Healthy', icon: Heart, color: B.green, bg: `${B.green}10` },
    { id: 'Chef Special', label: 'Chef Special', icon: ChefHat, color: B.orange, bg: `${B.orange}10` },
    { id: 'Top Rated', label: 'Top Rated', icon: Star, color: '#F59E0B', bg: '#FEF3C7' },
    { id: 'Thalis', label: 'Thalis', icon: UtensilsCrossed, color: '#6366F1', bg: '#E0E7FF' },
  ];

  const getShortAddress = (addr: string) => {
    const parts = addr.split(',');
    if (parts.length >= 2) {
      return `${parts[0].trim()}, ${parts[1].trim()}`;
    }
    return addr;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.light.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 110 }} showsVerticalScrollIndicator={false}>
        
        <LeafBranchSvg />
        
        {/* Header Row */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: 16, paddingTop: 16 }}>
          <View style={{ flex: 1, marginRight: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <TouchableOpacity
                onPress={() => go('profile')}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: B.orangeL,
                  borderWidth: 1.5,
                  borderColor: B.orange,
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: B.orange,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.1,
                  shadowRadius: 6,
                  elevation: 2
                }}
              >
                <Text style={{ fontSize: 22 }}>{user.avatar || '👩‍🍳'}</Text>
              </TouchableOpacity>
              <View>
                <Text style={{ fontSize: 12, color: t.sub, fontWeight: '600' }}>Good Morning,</Text>
                <Text style={{ fontSize: 20, fontWeight: '900', color: t.text, marginTop: 1 }}>{user.name || 'Bhargav'} 👋</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => setShowSearchModal(true)}
              style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, alignSelf: 'flex-start', paddingVertical: 4 }}
            >
              <MapPin size={13} color={B.orange} style={{ marginRight: 4 }} />
              <Text style={{ fontSize: 12, fontWeight: '700', color: t.text }}>
                {getShortAddress(selectedAddress)}
              </Text>
              <ChevronDown size={14} color={t.muted} style={{ marginLeft: 3 }} />
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
            <TouchableOpacity
              style={{
                paddingHorizontal: 12,
                height: 40,
                borderRadius: 20,
                backgroundColor: t.card,
                borderWidth: 1,
                borderColor: t.border,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.03,
                shadowRadius: 4,
                elevation: 1
              }}
              onPress={() => go('payments')}
            >
              <Wallet size={15} color={B.orange} />
              <Text style={{ fontSize: 13, fontWeight: '900', color: t.text }}>₹0</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: t.card,
                borderWidth: 1,
                borderColor: t.border,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.03,
                shadowRadius: 4,
                elevation: 1
              }}
              onPress={() => go('notifications')}
            >
              <Bell size={18} color={t.text} />
              <View style={{ position: 'absolute', top: 10, right: 10, width: 7, height: 7, borderRadius: 3.5, backgroundColor: '#EF4444' }} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar / Filter Icon Row */}
        <View style={{ flexDirection: 'row', paddingHorizontal: 16, marginTop: 16, gap: 10, alignItems: 'center' }}>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: t.input,
            borderRadius: 16,
            paddingHorizontal: 12,
            height: 46,
            borderWidth: 1.5,
            borderColor: t.border
          }}>
            <Search size={18} color={t.muted} style={{ marginRight: 8 }} />
            <TextInput
              style={{ flex: 1, fontSize: 13.5, color: t.text, height: '100%' }}
              placeholder="Search meals, cuisines, ingredients..."
              placeholderTextColor={t.muted}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery ? (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <X size={18} color={t.muted} />
              </TouchableOpacity>
            ) : null}
          </View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              paddingHorizontal: 14,
              height: 46,
              borderRadius: 14,
              backgroundColor: t.card,
              borderWidth: 1.5,
              borderColor: t.border,
              alignItems: 'center',
              gap: 6,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.02,
              shadowRadius: 4,
              elevation: 1
            }}
            onPress={() => go('meals')}
          >
            <Svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={B.orange} strokeWidth={2.5}>
              <Path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
            <Text style={{ fontSize: 12.5, fontWeight: '700', color: t.text }}>Filter</Text>
          </TouchableOpacity>
        </View>

        {/* Hero Card: Today's Menu */}
        <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
          <View
            style={{
              backgroundColor: isDark ? 'rgba(233, 106, 46, 0.12)' : '#FFF6EE',
              borderRadius: 28,
              borderWidth: 1,
              borderColor: isDark ? 'rgba(233, 106, 46, 0.2)' : '#FFEAD9',
              padding: 16,
              shadowColor: B.orange,
              shadowOffset: { width: 0, height: 12 },
              shadowOpacity: 0.04,
              shadowRadius: 20,
              elevation: 3,
              overflow: 'hidden'
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 4 }}>
              <View style={{ flex: 1, paddingRight: 10 }}>
                <Text style={{ fontSize: 11, fontWeight: '900', color: B.orange, letterSpacing: 1.5, textTransform: 'uppercase' }}>
                  TODAY • MONDAY
                </Text>
                
                <Text style={{ fontSize: 22, fontWeight: '900', color: t.text, marginTop: 4 }}>
                  Today's Fresh Menu
                </Text>

                <Text style={{ fontSize: 12, color: t.sub, marginTop: 6, fontWeight: '600' }}>
                  Freshly cooked. Delivered with care.
                </Text>
              </View>

              <View style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                overflow: 'hidden',
                borderWidth: 3,
                borderColor: '#FFFFFF',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.15,
                shadowRadius: 10,
                elevation: 5
              }}>
                <Image
                  source={{ uri: IMG.thali }}
                  style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                />
              </View>
            </View>

            <View style={{ flexDirection: 'row', gap: 8, marginTop: 16, paddingHorizontal: 4 }}>
              {[
                { label: 'Veg 🌱', value: 'Veg' },
                { label: 'Non-Veg 🍗', value: 'Non-Veg' },
                { label: 'Both 🍱', value: 'Both' }
              ].map((chip) => {
                const isActive = selectedFilter === chip.value;
                return (
                  <TouchableOpacity
                    key={chip.value}
                    onPress={() => setSelectedFilter(chip.value)}
                    style={{
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      borderRadius: 14,
                      backgroundColor: isActive ? B.orange : t.card,
                      borderWidth: 1,
                      borderColor: isActive ? B.orange : t.border,
                      shadowColor: isActive ? B.orange : '#000',
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: isActive ? 0.2 : 0.02,
                      shadowRadius: 6,
                      elevation: isActive ? 2 : 1
                    }}
                  >
                    <Text style={{
                      fontSize: 12,
                      fontWeight: '800',
                      color: isActive ? '#FFFFFF' : t.text
                    }}>
                      {chip.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 24,
              borderWidth: 1,
              borderColor: '#FFEAD9',
              padding: 16,
              marginTop: 16
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <Text style={{ fontSize: 11, fontWeight: '900', color: B.orange, letterSpacing: 0.5 }}>LUNCH</Text>
                <Text style={{ fontSize: 10, color: t.sub, fontWeight: '600' }}>12:00 PM – 2:30 PM</Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginBottom: 12 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 11, fontWeight: '900', color: B.green, marginBottom: 6 }}>VEG 🌿</Text>
                  {['Dal Tadka', 'Steamed Rice', 'Mix Veg Sabzi', 'Roti'].map((item, idx) => (
                    <Text key={idx} style={{ fontSize: 11, color: '#312019', fontWeight: '700', lineHeight: 16 }}>• {item}</Text>
                  ))}
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 11, fontWeight: '900', color: '#EF4444', marginBottom: 6 }}>NON-VEG 🍗</Text>
                  {['Andhra Chicken Curry', 'Steamed Rice', 'Salad', 'Roti'].map((item, idx) => (
                    <Text key={idx} style={{ fontSize: 11, color: '#312019', fontWeight: '700', lineHeight: 16 }}>• {item}</Text>
                  ))}
                </View>
              </View>

              <View style={{ height: 1.5, backgroundColor: '#FFEAD9', marginVertical: 12 }} />

              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <Text style={{ fontSize: 11, fontWeight: '900', color: B.orange, letterSpacing: 0.5 }}>DINNER</Text>
                <Text style={{ fontSize: 10, color: t.sub, fontWeight: '600' }}>7:00 PM – 9:30 PM</Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 12 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 11, fontWeight: '900', color: B.green, marginBottom: 6 }}>VEG 🌿</Text>
                  {['Paneer Butter Masala', 'Jeera Rice', 'Cucumber Raita'].map((item, idx) => (
                    <Text key={idx} style={{ fontSize: 11, color: '#312019', fontWeight: '700', lineHeight: 16 }}>• {item}</Text>
                  ))}
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 11, fontWeight: '900', color: '#EF4444', marginBottom: 6 }}>NON-VEG 🍗</Text>
                  {['Chicken Fry', 'Chapati', 'Onion Salad'].map((item, idx) => (
                    <Text key={idx} style={{ fontSize: 11, color: '#312019', fontWeight: '700', lineHeight: 16 }}>• {item}</Text>
                  ))}
                </View>
              </View>

              <TouchableOpacity
                onPress={() => go('meals')}
                style={{
                  height: 40,
                  borderRadius: 20,
                  borderWidth: 1.5,
                  borderColor: B.orange,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                  marginTop: 18
                }}
              >
                <Text style={{ color: B.orange, fontSize: 12, fontWeight: '900' }}>
                  View Full Today's Menu →
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Category Section */}
        <View style={{ marginTop: 24 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 10 }}
          >
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                onPress={() => {
                  if (cat.id === 'Veg' || cat.id === 'Non-Veg' || cat.id === 'Both') {
                    setSelectedFilter(cat.id);
                  }
                  go('meals');
                }}
                style={{
                  backgroundColor: t.card,
                  borderWidth: 1.5,
                  borderColor: t.border,
                  borderRadius: 16,
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.01,
                  shadowRadius: 4,
                  elevation: 1
                }}
              >
                <View style={{ width: 26, height: 26, borderRadius: 8, backgroundColor: cat.bg, justifyContent: 'center', alignItems: 'center' }}>
                  <cat.icon size={13} color={cat.color} />
                </View>
                <Text style={{ fontSize: 12.5, fontWeight: '800', color: t.text }}>{cat.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Subscription Banner */}
        <View style={{ paddingHorizontal: 16, marginTop: 28 }}>
          <View
            style={{
              backgroundColor: t.card,
              borderRadius: 28,
              borderWidth: 1,
              borderColor: t.border,
              padding: 20,
              shadowColor: B.orange,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.04,
              shadowRadius: 16,
              elevation: 3,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              overflow: 'hidden'
            }}
          >
            <View style={{ width: 90, height: 90, marginRight: 10, justifyContent: 'center', alignItems: 'center' }}>
              <PremiumSteelDabbaSvg />
            </View>

            <View style={{ flex: 1, marginRight: 4 }}>
              <Text style={{ fontSize: 15, color: t.text, fontWeight: '600' }}>
                Start Your <Text style={{ color: B.orange, fontWeight: '900' }}>Dabba Journey</Text>
              </Text>
              <Text style={{ fontSize: 10.5, color: t.sub, marginTop: 4, fontWeight: '600', lineHeight: 14 }}>
                Choose a subscription plan and enjoy fresh home-cooked meals every day.
              </Text>
              <TouchableOpacity
                onPress={() => go('plans')}
                style={{
                  backgroundColor: B.orange,
                  borderRadius: 14,
                  paddingHorizontal: 14,
                  paddingVertical: 7,
                  alignSelf: 'flex-start',
                  marginTop: 10,
                  shadowColor: B.orange,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.15,
                  shadowRadius: 6,
                  elevation: 2
                }}
              >
                <Text style={{ color: '#FFFFFF', fontSize: 11, fontWeight: '900' }}>
                  View Plans →
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{
              borderWidth: 1.5,
              borderColor: B.green,
              borderStyle: 'dashed',
              borderRadius: 14,
              paddingHorizontal: 8,
              paddingVertical: 10,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(59, 167, 106, 0.05)',
              marginLeft: 10
            }}>
              <Text style={{ fontSize: 7.5, color: B.green, fontWeight: '800', textAlign: 'center' }}>Meals start from</Text>
              <Text style={{ fontSize: 18, fontWeight: '900', color: B.green, marginTop: 2 }}>₹99</Text>
              <Text style={{ fontSize: 8.5, color: B.green, fontWeight: '800', marginTop: 1 }}>per day</Text>
            </View>
          </View>
        </View>

        {/* Popular Dishes */}
        <View style={{ marginTop: 28 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginBottom: 12 }}>
            <Text style={{ fontSize: 18, fontWeight: '900', color: t.text }}>
              Popular Dishes
            </Text>
            <TouchableOpacity onPress={() => go('meals')}>
              <Text style={{ fontSize: 12, fontWeight: '800', color: B.orange }}>View all →</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 14 }}
          >
            {[
              { id: 2, name: 'Paneer Butter Masala', rating: '4.8 (120)', price: '₹149', type: 'veg', img: IMG.paneer },
              { id: 3, name: 'Chicken Curry Thali', rating: '4.7 (98)', price: '₹169', type: 'non-veg', img: IMG.chicken },
              { id: 7, name: 'Veg Pulao', rating: '4.6 (86)', price: '₹129', type: 'veg', img: IMG.rice },
              { id: 1, name: 'Dal Tadka + Rice', rating: '4.8 (140)', price: '₹119', type: 'veg', img: IMG.dal }
            ].map((dish) => (
              <TouchableOpacity
                key={dish.id}
                onPress={() => {
                  setSelectedMealId(dish.id);
                  go('meal_detail');
                }}
                style={{
                  width: 140,
                  backgroundColor: t.card,
                  borderWidth: 1,
                  borderColor: t.border,
                  borderRadius: 20,
                  overflow: 'hidden',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 0.02,
                  shadowRadius: 6,
                  elevation: 1
                }}
              >
                <View style={{ width: '100%', height: 95 }}>
                  <Image source={{ uri: dish.img }} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
                  <View style={{ position: 'absolute', top: 6, left: 6, backgroundColor: dish.type === 'veg' ? B.green : '#EF4444', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 }}>
                    <Text style={{ fontSize: 8, fontWeight: '900', color: '#FFFFFF', letterSpacing: 0.5 }}>
                      {dish.type.toUpperCase()}
                    </Text>
                  </View>
                  
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      top: 6,
                      right: 6,
                      width: 26,
                      height: 26,
                      borderRadius: 13,
                      backgroundColor: '#FFFFFF',
                      justifyContent: 'center',
                      alignItems: 'center',
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 4,
                      elevation: 2
                    }}
                    onPress={() => setToast("Added to Favorites!")}
                  >
                    <Heart size={12} color="#EF4444" fill="#EF4444" />
                  </TouchableOpacity>
                </View>

                <View style={{ padding: 10 }}>
                  <Text numberOfLines={1} style={{ fontSize: 12, fontWeight: '900', color: t.text }}>
                    {dish.name}
                  </Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
                    <Text style={{ fontSize: 10.5, fontWeight: '800', color: t.sub }}>⭐ {dish.rating}</Text>
                    <Text style={{ fontSize: 11, fontWeight: '900', color: t.text }}>{dish.price}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Why Choose Koi Koi Dabba */}
        <View style={{ marginTop: 28, paddingHorizontal: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: '900', color: t.text, marginBottom: 12 }}>
            Why Choose Koi Koi Dabba
          </Text>

          <View style={{
            flexDirection: 'row',
            backgroundColor: t.card,
            borderWidth: 1,
            borderColor: t.border,
            borderRadius: 20,
            paddingVertical: 14,
            paddingHorizontal: 8,
            justifyContent: 'space-between',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.01,
            shadowRadius: 4,
            elevation: 1
          }}>
            {[
              { title: 'Steel Dabbas', desc: 'Safe & hygienic', icon: Package },
              { title: 'Fresh Ingredients', desc: 'Carefully selected', icon: Leaf },
              { title: 'Expert Chefs', desc: 'Experienced cooks', icon: ChefHat },
              { title: 'On-time Delivery', desc: 'Hot & fresh meals', icon: Bike }
            ].map((item, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <View style={{ width: 1, height: 32, backgroundColor: t.border }} />}
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <View style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: B.orangeL,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 6
                  }}>
                    <item.icon size={15} color={B.orange} />
                  </View>
                  <Text style={{ fontSize: 8.5, fontWeight: '900', color: t.text, textAlign: 'center' }} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={{ fontSize: 7, color: t.sub, fontWeight: '600', textAlign: 'center', marginTop: 1 }} numberOfLines={1}>
                    {item.desc}
                  </Text>
                </View>
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Live Kitchen & Trusted Families (Side-by-Side) */}
        <View style={{ flexDirection: 'row', paddingHorizontal: 16, gap: 12, marginTop: 24 }}>
          {/* Live Kitchen Card */}
          <View style={{
            flex: 1,
            backgroundColor: t.card,
            borderWidth: 1,
            borderColor: t.border,
            borderRadius: 24,
            padding: 14,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.01,
            shadowRadius: 8,
            elevation: 1,
            justifyContent: 'space-between'
          }}>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Text style={{ fontSize: 14, fontWeight: '900', color: t.text }}>Live Kitchen</Text>
                <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#3BA76A', marginLeft: 6 }} />
              </View>
              
              <View style={{ marginVertical: 6, alignSelf: 'center' }}>
                <LiveKitchenThumbnailSvg />
              </View>
              
              <Text style={{ fontSize: 10.5, color: t.sub, fontWeight: '600', lineHeight: 14, marginTop: 6 }}>
                Watch our chefs prepare today's meals live.
              </Text>
            </View>
            
            <TouchableOpacity onPress={() => go('kitchen')} style={{ marginTop: 8 }}>
              <Text style={{ fontSize: 11, fontWeight: '900', color: B.orange }}>Watch Now →</Text>
            </TouchableOpacity>
          </View>

          {/* Trusted Families Card */}
          <View style={{
            flex: 1,
            backgroundColor: t.card,
            borderWidth: 1,
            borderColor: t.border,
            borderRadius: 24,
            padding: 14,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.01,
            shadowRadius: 8,
            elevation: 1,
            justifyContent: 'space-between'
          }}>
            <View>
              <Text style={{ fontSize: 13, fontWeight: '900', color: t.text, marginBottom: 8 }}>
                Trusted by 4,200+ Families
              </Text>
              
              <View style={{ marginVertical: 4 }}>
                <OverlappingAvatars />
              </View>
              
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 8 }}>
                <View style={{ flexDirection: 'row' }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={11} color="#F59E0B" fill="#F59E0B" />
                  ))}
                </View>
                <Text style={{ fontSize: 11, fontWeight: '900', color: t.text }}>4.8</Text>
              </View>
            </View>
            
            <Text style={{ fontSize: 9.5, color: t.sub, fontWeight: '600', marginTop: 8 }}>
              Based on 1,250+ reviews
            </Text>
          </View>
        </View>

      </ScrollView>
      
      <BottomTabNav active="home" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
