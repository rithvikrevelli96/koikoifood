import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Platform,
  Modal,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {
  User,
  Heart,
  MapPin,
  ChevronRight,
  Gift,
  LogOut,
  Sliders,
  Bell,
  LifeBuoy,
  HelpCircle,
  Info,
  Sparkles,
  Users,
  ChefHat,
  Star,
  Edit3,
  Wallet,
  Settings,
  AlertTriangle,
  Check,
  Package,
  ShoppingBag,
  Plus,
  ArrowRight,
  Clock,
  Receipt,
  CreditCard,
  RefreshCw,
  X,
  FileText,
  TrendingUp,
} from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import {
  theme,
  Text,
  Button,
  PageLayout,
  HeroCard,
  Card,
  InfoCard,
  Badge,
} from '../../design-system';
import { BottomTabNav } from '../../core/components/BottomTabNav';

interface OrderItem {
  id: string;
  orderNumber: string;
  date: string;
  items: string;
  status: 'Out for Delivery' | 'Delivered' | 'Preparing' | 'Cancelled';
  amount: number;
  paymentMethod: string;
  subtotal: number;
  gst: number;
  deliveryFee: number;
  discount: number;
}

interface WalletTransaction {
  id: string;
  title: string;
  amount: string;
  date: string;
  status: string;
  type: 'credit' | 'debit';
}

export default function ProfileScreen() {
  const {
    user,
    setUser,
    resetNavigation,
    setToast,
    go,
    isDark,
    t,
  } = useAppContext();

  // Active user profile values with default fallback
  const userName = user.name || 'Sophia Williams';
  const userPhone = user.phone || '+91 98765 43210';
  const userEmail = user.email || 'sophia@gmail.com';

  const [vegPreference, setVegPreference] = useState<'veg' | 'non-veg'>('veg');
  const [versionTaps, setVersionTaps] = useState(0);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Dynamic Wallet State
  const [walletBalance, setWalletBalance] = useState<number>(1250);
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState<string>('500');
  const [selectedPaymentMode, setSelectedPaymentMode] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [isProcessingTopUp, setIsProcessingTopUp] = useState(false);

  // Dynamic Orders State & Modals
  const [showOrdersModal, setShowOrdersModal] = useState(false);
  const [orderFilterTab, setOrderFilterTab] = useState<'all' | 'active' | 'delivered'>('all');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<OrderItem | null>(null);

  const [ordersList, setOrdersList] = useState<OrderItem[]>([
    {
      id: 'ord_1',
      orderNumber: '#KKD-9482',
      date: 'Today, 11:30 AM',
      items: 'Special North Indian Dabba (Paneer Butter Masala, 4 Phulkas, Dal Tadka, Rice, Gulab Jamun)',
      status: 'Out for Delivery',
      amount: 185,
      paymentMethod: 'Dabba Wallet',
      subtotal: 170,
      gst: 15,
      deliveryFee: 0,
      discount: 0,
    },
    {
      id: 'ord_2',
      orderNumber: '#KKD-9421',
      date: '20-07-2026, 1:15 PM',
      items: 'South Indian Mini Meals (Sambar, Rasam, Curd Rice, Poriyal, Appalam)',
      status: 'Delivered',
      amount: 145,
      paymentMethod: 'UPI / PhonePe',
      subtotal: 135,
      gst: 10,
      deliveryFee: 0,
      discount: 0,
    },
    {
      id: 'ord_3',
      orderNumber: '#KKD-9380',
      date: '19-07-2026, 7:45 PM',
      items: 'Executive Veg Thali (3 Rotis, Jeera Rice, Paneer Kadhai, Mix Veg, Kheer)',
      status: 'Delivered',
      amount: 220,
      paymentMethod: 'Dabba Wallet',
      subtotal: 210,
      gst: 15,
      deliveryFee: 0,
      discount: 5,
    },
  ]);

  const [transactionsList, setTransactionsList] = useState<WalletTransaction[]>([
    { id: '1', title: 'Top-up Wallet Credit', amount: '+₹500', date: 'Today', status: 'Success', type: 'credit' },
    { id: '2', title: 'Order #KKD-9482: North Indian Dabba', amount: '-₹185', date: 'Today', status: 'Success', type: 'debit' },
    { id: '3', title: 'Plan Renewal: Monthly Veg', amount: '-₹1,850', date: '12-07-2026', status: 'Success', type: 'debit' },
    { id: '4', title: 'Top-up Wallet Credit', amount: '+₹1,000', date: '08-07-2026', status: 'Success', type: 'credit' },
    { id: '5', title: 'Lunch refund: Skipped slot', amount: '+₹65', date: '01-07-2026', status: 'Success', type: 'credit' },
  ]);

  // Entrance Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 380,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        tension: 45,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleVegToggle = (pref: 'veg' | 'non-veg') => {
    setVegPreference(pref);
    setToast(`Preference updated to ${pref === 'veg' ? 'Pure Veg 🟢' : 'Non-Veg 🔴'}`);
  };

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutConfirm(false);
    setToast('Logged out successfully');
    resetNavigation('auth');
  };

  const handleVersionTap = () => {
    if (versionTaps >= 5) {
      setVersionTaps(0);
      setToast('🛠️ Developer Sandbox Activated!');
      go('dev_panel');
    } else {
      setVersionTaps(prev => prev + 1);
    }
  };

  // Wallet Top-Up Handler
  const handleTopUpConfirm = () => {
    const numAmt = parseInt(topUpAmount, 10);
    if (isNaN(numAmt) || numAmt < 100) {
      setToast('⚠️ Minimum top-up amount is ₹100');
      return;
    }
    if (numAmt > 10000) {
      setToast('⚠️ Maximum top-up limit is ₹10,000');
      return;
    }

    setIsProcessingTopUp(true);
    setTimeout(() => {
      setIsProcessingTopUp(false);
      setWalletBalance(prev => prev + numAmt);
      const newTx: WalletTransaction = {
        id: Date.now().toString(),
        title: `Top-up Wallet via ${selectedPaymentMode.toUpperCase()}`,
        amount: `+₹${numAmt.toLocaleString('en-IN')}`,
        date: 'Just now',
        status: 'Success',
        type: 'credit',
      };
      setTransactionsList(prev => [newTx, ...prev]);
      setShowTopUpModal(false);
      setToast(`🎉 ₹${numAmt.toLocaleString('en-IN')} added to Dabba Wallet! Balance: ₹${(walletBalance + numAmt).toLocaleString('en-IN')}`);
    }, 600);
  };

  // Reorder Handler
  const handleReorder = (order: OrderItem) => {
    const newOrder: OrderItem = {
      id: `ord_${Date.now()}`,
      orderNumber: `#KKD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: 'Just now',
      items: order.items,
      status: 'Preparing',
      amount: order.amount,
      paymentMethod: 'Dabba Wallet',
      subtotal: order.subtotal,
      gst: order.gst,
      deliveryFee: order.deliveryFee,
      discount: order.discount,
    };
    setOrdersList(prev => [newOrder, ...prev]);
    setToast(`🍱 Reordered ${order.orderNumber}! Preparing your meal.`);
  };

  const filteredOrders = ordersList.filter(o => {
    if (orderFilterTab === 'active') return o.status === 'Out for Delivery' || o.status === 'Preparing';
    if (orderFilterTab === 'delivered') return o.status === 'Delivered';
    return true;
  });

  const dividerColor = t.divider;
  const activeOrder = ordersList.find(o => o.status === 'Out for Delivery' || o.status === 'Preparing');

  return (
    <PageLayout style={{ paddingHorizontal: 0 }} background="organic" backgroundVariant="clean">
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          
          {/* 1. TOP PROFILE HEADER (Clean centered avatar layout matching design) */}
          <View style={styles.heroContainer}>
            <HeroCard style={{ ...styles.heroCard, backgroundColor: t.card, borderColor: t.border }}>
              <View style={styles.profileHeaderCenter}>
                {/* Round Avatar Container with Verified Checkmark Badge */}
                <View style={styles.avatarWrapper}>
                  <View style={[styles.avatarCircle, { backgroundColor: isDark ? 'rgba(75,93,58,0.25)' : 'rgba(244,239,230,0.9)', borderColor: t.border }]}>
                    <Text style={{ fontSize: 44, lineHeight: Platform.OS === 'ios' ? 54 : 48 }}>
                      {user.avatar || '👩‍🍳'}
                    </Text>
                  </View>

                  {/* Verified Checkmark Badge at Bottom Right of Avatar */}
                  <View style={[styles.verifiedBadge, { backgroundColor: t.secondary }]}>
                    <Check size={12} color="#FFFFFF" strokeWidth={3.5} />
                  </View>

                  {/* Edit Profile Touch Badge */}
                  <TouchableOpacity
                    style={[styles.editBadgeButton, { backgroundColor: t.primary }]}
                    onPress={() => go('personal')}
                    activeOpacity={0.85}
                    accessibilityRole="button"
                    accessibilityLabel="Edit Profile Details"
                  >
                    <Edit3 size={11} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>

                {/* User Name & Email */}
                <Text variant="headingM" color="text" style={{ fontWeight: '800', marginTop: 12, textAlign: 'center' }}>
                  {userName}
                </Text>
                <Text variant="caption" color="sub" style={{ marginTop: 2, textAlign: 'center' }}>
                  {userEmail}
                </Text>
                <Text variant="mono" color="primary" style={{ fontSize: 12, fontWeight: '700', marginTop: 2, textAlign: 'center' }}>
                  {userPhone}
                </Text>

                {/* Tier & Plan Pill Badges */}
                <View style={styles.badgeRow}>
                  <View style={[styles.activePlanBadge, { backgroundColor: isDark ? 'rgba(122, 147, 104, 0.2)' : 'rgba(75, 93, 58, 0.08)' }]}>
                    <View style={[styles.pulseDot, { backgroundColor: t.primary }]} />
                    <Text style={[styles.activePlanText, { color: t.primary }]}>Active Member</Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => go('rewards')}
                    style={[styles.tierBadge, { backgroundColor: isDark ? 'rgba(224, 194, 106, 0.15)' : 'rgba(217, 182, 90, 0.12)', borderColor: isDark ? 'rgba(224, 194, 106, 0.3)' : 'rgba(217, 182, 90, 0.3)' }]}
                    activeOpacity={0.8}
                  >
                    <Star size={11} color={t.accent} fill={t.accent} />
                    <Text style={[styles.tierBadgeText, { color: t.accent }]}>1,250 pts · Gold</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </HeroCard>
          </View>

          {/* 2. DABBA WALLET FEATURE HUB (Quick Access Hub) */}
          <View style={styles.hubSectionWrapper}>
            <Text variant="label" color="sub" style={styles.sectionHeader}>Quick Access Hub</Text>

            <View style={{ paddingHorizontal: theme.spacing.screenHorizontal }}>
              {/* Dabba Wallet Hero Card */}
              <TouchableOpacity
                style={[styles.hubCard, { backgroundColor: t.card, borderColor: t.border }]}
                onPress={() => setShowTopUpModal(true)}
                activeOpacity={0.85}
              >
                <View style={styles.hubCardHeader}>
                  <View style={[styles.hubIconBox, { backgroundColor: isDark ? 'rgba(201, 107, 60, 0.2)' : 'rgba(201, 107, 60, 0.08)' }]}>
                    <Wallet size={20} color={t.secondary} />
                  </View>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text variant="body" color="text" style={{ fontWeight: '800', fontSize: 16 }}>Dabba Wallet</Text>
                    <Text variant="caption" color="sub" style={{ fontSize: 11, marginTop: 1 }}>Instant checkout & cashback balance</Text>
                  </View>
                  <ChevronRight size={18} color={t.sub} />
                </View>

                <View style={[styles.walletBalanceBox, { backgroundColor: t.surface, borderColor: t.border, padding: 14 }]}>
                  <Text variant="caption" color="sub" style={{ fontSize: 10, fontWeight: '800', letterSpacing: 0.8 }}>
                    CURRENT BALANCE
                  </Text>
                  <Text variant="display" color="text" style={{ fontSize: 26, fontWeight: '900', marginTop: 2 }}>
                    ₹{walletBalance.toLocaleString('en-IN')}
                  </Text>
                </View>

                <View style={styles.hubCardFooterBtns}>
                  <TouchableOpacity
                    style={[styles.hubMiniBtn, { backgroundColor: t.secondary, flex: 1, height: 38 }]}
                    onPress={() => setShowTopUpModal(true)}
                    activeOpacity={0.8}
                  >
                    <Plus size={14} color="#FFFFFF" style={{ marginRight: 6 }} />
                    <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '700' }}>Add Money</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.hubMiniBtnOutline, { borderColor: t.border, height: 38, paddingHorizontal: 16 }]}
                    onPress={() => go('finances')}
                    activeOpacity={0.8}
                  >
                    <Text style={{ color: t.text, fontSize: 12, fontWeight: '700' }}>History</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* 3. ACCOUNT & IDENTITY */}
          <View style={styles.sectionWrapper}>
            <Text variant="label" color="sub" style={styles.sectionHeader}>Account & Identity</Text>
            <View style={styles.groupContainer}>
              {/* My Orders Row Button */}
              <TouchableOpacity onPress={() => setShowOrdersModal(true)} style={styles.cleanRowItem} activeOpacity={0.7} accessibilityRole="button" accessibilityLabel="My Orders">
                <View style={[styles.iconBox, { backgroundColor: isDark ? 'rgba(201, 107, 60, 0.2)' : 'rgba(201, 107, 60, 0.08)' }]}>
                  <ShoppingBag size={18} color={t.secondary} />
                </View>
                <View style={styles.rowContent}>
                  <Text variant="body" color="text" style={{ fontWeight: '700' }}>My Orders</Text>
                  <Text variant="caption" color="sub" style={{ marginTop: 2 }}>Order history, active tracking & invoices ({ordersList.length})</Text>
                </View>
                <ChevronRight size={18} color={t.sub} />
              </TouchableOpacity>

              <View style={[styles.cleanDivider, { backgroundColor: t.divider }]} />

              {/* Personal Details */}
              <TouchableOpacity onPress={() => go('personal')} style={styles.cleanRowItem} activeOpacity={0.7}>
                <View style={[styles.iconBox, { backgroundColor: isDark ? 'rgba(122, 147, 104, 0.2)' : 'rgba(75, 93, 58, 0.08)' }]}>
                  <User size={18} color={t.primary} />
                </View>
                <View style={styles.rowContent}>
                  <Text variant="body" color="text" style={{ fontWeight: '700' }}>Personal Details</Text>
                  <Text variant="caption" color="sub" style={{ marginTop: 2 }}>Name, email, phone number & gender</Text>
                </View>
                <ChevronRight size={18} color={t.sub} />
              </TouchableOpacity>

              <View style={[styles.cleanDivider, { backgroundColor: t.divider }]} />

              {/* Health Info */}
              <TouchableOpacity onPress={() => go('health_info')} style={styles.cleanRowItem} activeOpacity={0.7}>
                <View style={[styles.iconBox, { backgroundColor: isDark ? 'rgba(215, 132, 86, 0.2)' : 'rgba(201, 107, 60, 0.08)' }]}>
                  <Heart size={18} color={t.secondary} />
                </View>
                <View style={styles.rowContent}>
                  <Text variant="body" color="text" style={{ fontWeight: '700' }}>Health Info</Text>
                  <Text variant="caption" color="sub" style={{ marginTop: 2 }}>Nutrition goals, calories, allergies</Text>
                </View>
                <ChevronRight size={18} color={t.sub} />
              </TouchableOpacity>

              <View style={[styles.cleanDivider, { backgroundColor: dividerColor }]} />

              {/* Saved Addresses */}
              <TouchableOpacity onPress={() => go('addresses')} style={styles.cleanRowItem} activeOpacity={0.7}>
                <View style={[styles.iconBox, { backgroundColor: 'rgba(75, 93, 58, 0.08)' }]}>
                  <MapPin size={18} color={isDark ? '#7FA457' : '#4B5D3A'} />
                </View>
                <View style={styles.rowContent}>
                  <Text variant="body" color="text" style={{ fontWeight: '700' }}>Saved Addresses</Text>
                  <Text variant="caption" color="sub" style={{ marginTop: 2 }}>Home, work & delivery instructions</Text>
                </View>
                <ChevronRight size={18} color={isDark ? '#A09B90' : '#8A857B'} />
              </TouchableOpacity>
            </View>
          </View>

          {/* 4. PREFERENCES */}
          <View style={styles.sectionWrapper}>
            <Text variant="label" color="sub" style={styles.sectionHeader}>Preferences</Text>
            <View style={styles.groupContainer}>
              {/* Meal Preference Row */}
              <TouchableOpacity onPress={() => go('meal_pref')} style={styles.cleanRowItem} activeOpacity={0.7}>
                <View style={[styles.iconBox, { backgroundColor: 'rgba(201, 107, 60, 0.08)' }]}>
                  <Sliders size={18} color="#C96B3C" />
                </View>
                <View style={styles.rowContent}>
                  <Text variant="body" color="text" style={{ fontWeight: '700' }}>Meal Preference</Text>
                  <Text variant="caption" color="sub" style={{ marginTop: 2 }}>Veg/Non-Veg, spice level & slot timing</Text>
                </View>
                <ChevronRight size={18} color={isDark ? '#A09B90' : '#8A857B'} />
              </TouchableOpacity>

              <View style={[styles.cleanDivider, { backgroundColor: dividerColor }]} />

              {/* Quick Veg Preference Switcher */}
              <View style={styles.prefToggleContainer}>
                <View style={{ flex: 1 }}>
                  <Text variant="body" color="text" style={{ fontWeight: '700' }}>Veg Preference</Text>
                  <Text variant="caption" color="sub" style={{ marginTop: 2 }}>Quick toggle default meals</Text>
                </View>

                <View style={[styles.toggleSegment, { backgroundColor: isDark ? '#1F1C18' : '#FCFAF6', borderColor: dividerColor }]}>
                  <TouchableOpacity
                    onPress={() => handleVegToggle('veg')}
                    style={[
                      styles.toggleChip,
                      vegPreference === 'veg' && styles.toggleChipVegActive
                    ]}
                    activeOpacity={0.8}
                  >
                    <View style={[
                      styles.dotIndicator,
                      { backgroundColor: vegPreference === 'veg' ? '#FFFFFF' : (isDark ? '#7FA457' : '#4B5D3A') }
                    ]} />
                    <Text style={[
                      styles.toggleChipText,
                      vegPreference === 'veg' && styles.toggleChipTextActive
                    ]}>
                      Veg
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleVegToggle('non-veg')}
                    style={[
                      styles.toggleChip,
                      vegPreference === 'non-veg' && styles.toggleChipNonVegActive
                    ]}
                    activeOpacity={0.8}
                  >
                    <View style={[
                      styles.dotIndicator,
                      { backgroundColor: vegPreference === 'non-veg' ? '#FFFFFF' : '#C96B3C' }
                    ]} />
                    <Text style={[
                      styles.toggleChipText,
                      vegPreference === 'non-veg' && styles.toggleChipTextActive
                    ]}>
                      Non-Veg
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* 5. SUBSCRIPTION & FINANCES */}
          <View style={styles.sectionWrapper}>
            <Text variant="label" color="sub" style={styles.sectionHeader}>Subscription & Finances</Text>
            <View style={styles.groupContainer}>
              {/* Subscription Status */}
              <TouchableOpacity onPress={() => go('plans')} style={styles.cleanRowItem} activeOpacity={0.7} accessibilityRole="button" accessibilityLabel="Subscription Status">
                <View style={[styles.iconBox, { backgroundColor: isDark ? 'rgba(122, 147, 104, 0.2)' : 'rgba(75, 93, 58, 0.08)' }]}>
                  <ChefHat size={18} color={isDark ? '#7FA457' : '#4B5D3A'} />
                </View>
                <View style={styles.rowContent}>
                  <Text variant="body" color="text" style={{ fontWeight: '700' }}>Subscription Status</Text>
                  <Text variant="caption" color="sub" style={{ marginTop: 2 }}>Monthly Veg Plan · Active</Text>
                </View>
                <ChevronRight size={18} color={t.sub} />
              </TouchableOpacity>

              <View style={[styles.cleanDivider, { backgroundColor: dividerColor }]} />

              {/* Wallet & Finances */}
              <TouchableOpacity onPress={() => go('finances')} style={styles.cleanRowItem} activeOpacity={0.7} accessibilityRole="button" accessibilityLabel="Wallet and Finances">
                <View style={[styles.iconBox, { backgroundColor: isDark ? 'rgba(201, 107, 60, 0.2)' : 'rgba(201, 107, 60, 0.08)' }]}>
                  <Wallet size={18} color={t.secondary} />
                </View>
                <View style={styles.rowContent}>
                  <Text variant="body" color="text" style={{ fontWeight: '700' }}>Wallet & Finances</Text>
                  <Text variant="caption" color="sub" style={{ marginTop: 2 }}>₹{walletBalance.toLocaleString('en-IN')} Balance · Transactions</Text>
                </View>
                <ChevronRight size={18} color={t.sub} />
              </TouchableOpacity>

              <View style={[styles.cleanDivider, { backgroundColor: dividerColor }]} />

              {/* Rewards & Points */}
              <TouchableOpacity onPress={() => go('rewards')} style={styles.cleanRowItem} activeOpacity={0.7} accessibilityRole="button" accessibilityLabel="Rewards and Points">
                <View style={[styles.iconBox, { backgroundColor: 'rgba(217, 182, 90, 0.08)' }]}>
                  <Gift size={18} color="#D9B65A" />
                </View>
                <View style={styles.rowContent}>
                  <Text variant="body" color="text" style={{ fontWeight: '700' }}>Rewards & Points</Text>
                  <Text variant="caption" color="sub" style={{ marginTop: 2 }}>1,250 pts · Gold Tier perks</Text>
                </View>
                <ChevronRight size={18} color={t.sub} />
              </TouchableOpacity>

              <View style={[styles.cleanDivider, { backgroundColor: dividerColor }]} />

              {/* Offers & Coupons */}
              <TouchableOpacity onPress={() => go('offers')} style={styles.cleanRowItem} activeOpacity={0.7} accessibilityRole="button" accessibilityLabel="Offers and Coupons">
                <View style={[styles.iconBox, { backgroundColor: isDark ? 'rgba(201, 107, 60, 0.18)' : 'rgba(201, 107, 60, 0.08)' }]}>
                  <Sparkles size={18} color={t.secondary} />
                </View>
                <View style={styles.rowContent}>
                  <Text variant="body" color="text" style={{ fontWeight: '700' }}>Offers & Coupons</Text>
                  <Text variant="caption" color="sub" style={{ marginTop: 2 }}>Save on renewals & ad-hoc dabbas</Text>
                </View>
                <ChevronRight size={18} color={t.sub} />
              </TouchableOpacity>

              <View style={[styles.cleanDivider, { backgroundColor: dividerColor }]} />

              {/* Referral Program */}
              <TouchableOpacity onPress={() => go('refer')} style={styles.cleanRowItem} activeOpacity={0.7} accessibilityRole="button" accessibilityLabel="Referral Program">
                <View style={[styles.iconBox, { backgroundColor: isDark ? 'rgba(122, 147, 104, 0.2)' : 'rgba(75, 93, 58, 0.08)' }]}>
                  <Users size={18} color={isDark ? '#7FA457' : '#4B5D3A'} />
                </View>
                <View style={styles.rowContent}>
                  <Text variant="body" color="text" style={{ fontWeight: '700' }}>Referral Program</Text>
                  <Text variant="caption" color="sub" style={{ marginTop: 2 }}>Earn ₹100 per friend</Text>
                </View>
                <ChevronRight size={18} color={t.sub} />
              </TouchableOpacity>
            </View>
          </View>

          {/* 6. APP SETTINGS */}
          <View style={styles.sectionWrapper}>
            <Text variant="label" color="sub" style={styles.sectionHeader}>App Settings</Text>
            <View style={styles.groupContainer}>
              <TouchableOpacity onPress={() => go('settings')} style={styles.cleanRowItem} activeOpacity={0.7} accessibilityRole="button" accessibilityLabel="App Settings">
                <View style={[styles.iconBox, { backgroundColor: isDark ? 'rgba(122, 147, 104, 0.2)' : 'rgba(75, 93, 58, 0.08)' }]}>
                  <Settings size={18} color={isDark ? '#7FA457' : '#4B5D3A'} />
                </View>
                <View style={styles.rowContent}>
                  <Text variant="body" color="text" style={{ fontWeight: '700' }}>App Settings</Text>
                  <Text variant="caption" color="sub" style={{ marginTop: 2 }}>Units, language & general preferences</Text>
                </View>
                <ChevronRight size={18} color={t.sub} />
              </TouchableOpacity>

              <View style={[styles.cleanDivider, { backgroundColor: dividerColor }]} />

              <TouchableOpacity onPress={() => go('appearance')} style={styles.cleanRowItem} activeOpacity={0.7} accessibilityRole="button" accessibilityLabel="Appearance and Theme">
                <View style={[styles.iconBox, { backgroundColor: isDark ? 'rgba(122, 147, 104, 0.2)' : 'rgba(75, 93, 58, 0.08)' }]}>
                  <Sliders size={18} color={isDark ? '#7FA457' : '#4B5D3A'} />
                </View>
                <View style={styles.rowContent}>
                  <Text variant="body" color="text" style={{ fontWeight: '700' }}>Appearance & Theme</Text>
                  <Text variant="caption" color="sub" style={{ marginTop: 2 }}>Light, Dark & System default</Text>
                </View>
                <ChevronRight size={18} color={t.sub} />
              </TouchableOpacity>

              <View style={[styles.cleanDivider, { backgroundColor: dividerColor }]} />

              <TouchableOpacity onPress={() => go('notifications')} style={styles.cleanRowItem} activeOpacity={0.7} accessibilityRole="button" accessibilityLabel="Notification Settings">
                <View style={[styles.iconBox, { backgroundColor: isDark ? 'rgba(201, 107, 60, 0.18)' : 'rgba(201, 107, 60, 0.08)' }]}>
                  <Bell size={18} color={t.secondary} />
                </View>
                <View style={styles.rowContent}>
                  <Text variant="body" color="text" style={{ fontWeight: '700' }}>Notifications</Text>
                  <Text variant="caption" color="sub" style={{ marginTop: 2 }}>Updates, alerts & promo preferences</Text>
                </View>
                <ChevronRight size={18} color={t.sub} />
              </TouchableOpacity>
            </View>
          </View>

          {/* 7. HELP & SUPPORT */}
          <View style={styles.sectionWrapper}>
            <Text variant="label" color="sub" style={styles.sectionHeader}>Help & Support</Text>
            <View style={styles.groupContainer}>
              <TouchableOpacity onPress={() => go('support')} style={styles.cleanRowItem} activeOpacity={0.7}>
                <View style={[styles.iconBox, { backgroundColor: 'rgba(75, 93, 58, 0.08)' }]}>
                  <LifeBuoy size={18} color={isDark ? '#7FA457' : '#4B5D3A'} />
                </View>
                <View style={styles.rowContent}>
                  <Text variant="body" color="text" style={{ fontWeight: '700' }}>Support Centre</Text>
                  <Text variant="caption" color="sub" style={{ marginTop: 2 }}>Live chat, phone call & tickets</Text>
                </View>
                <ChevronRight size={18} color={isDark ? '#A09B90' : '#8A857B'} />
              </TouchableOpacity>

              <View style={[styles.cleanDivider, { backgroundColor: dividerColor }]} />

              <TouchableOpacity onPress={() => go('support')} style={styles.cleanRowItem} activeOpacity={0.7}>
                <View style={[styles.iconBox, { backgroundColor: 'rgba(201, 107, 60, 0.08)' }]}>
                  <HelpCircle size={18} color="#C96B3C" />
                </View>
                <View style={styles.rowContent}>
                  <Text variant="body" color="text" style={{ fontWeight: '700' }}>Frequently Asked Questions</Text>
                  <Text variant="caption" color="sub" style={{ marginTop: 2 }}>Instant answers to common questions</Text>
                </View>
                <ChevronRight size={18} color={isDark ? '#A09B90' : '#8A857B'} />
              </TouchableOpacity>

              <View style={[styles.cleanDivider, { backgroundColor: dividerColor }]} />

              <TouchableOpacity onPress={() => go('about')} style={styles.cleanRowItem} activeOpacity={0.7}>
                <View style={[styles.iconBox, { backgroundColor: 'rgba(138, 133, 123, 0.1)' }]}>
                  <Info size={18} color="#8A857B" />
                </View>
                <View style={styles.rowContent}>
                  <Text variant="body" color="text" style={{ fontWeight: '700' }}>About KOI KOI</Text>
                  <Text variant="caption" color="sub" style={{ marginTop: 2 }}>v4.0.0 · Active</Text>
                </View>
                <ChevronRight size={18} color={isDark ? '#A09B90' : '#8A857B'} />
              </TouchableOpacity>
            </View>
          </View>

          {/* 8. LOGOUT & VERSION FOOTER */}
          <View style={styles.logoutWrapper}>
            <TouchableOpacity
              onPress={handleLogout}
              style={styles.logoutBtn}
              activeOpacity={0.85}
              accessibilityRole="button"
              accessibilityLabel="Logout"
            >
              <LogOut size={18} color="#C96B3C" style={{ marginRight: 8 }} />
              <Text style={styles.logoutBtnText}>Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleVersionTap} activeOpacity={0.8}>
              <Text variant="mono" color="sub" style={{ fontSize: 11, marginTop: 4 }}>KOI KOI DABBA • v4.0.0</Text>
            </TouchableOpacity>
          </View>

        </Animated.View>
      </ScrollView>
      <BottomTabNav active="profile" />

      {/* ── MODAL A: MY ORDERS PROCESS SHEET ── */}
      <Modal
        visible={showOrdersModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowOrdersModal(false)}
      >
        <View style={styles.sheetOverlay}>
          <View style={[styles.sheetContent, { backgroundColor: t.card, borderColor: t.border }]}>
            {/* Sheet Handle & Header */}
            <View style={styles.sheetHandleBar}>
              <View style={[styles.sheetHandle, { backgroundColor: t.border }]} />
            </View>

            <View style={styles.sheetHeaderRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <ShoppingBag size={20} color={t.primary} style={{ marginRight: 8 }} />
                <Text variant="title" color="text">My Orders ({ordersList.length})</Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowOrdersModal(false)}
                style={[styles.closeIconBtn, { backgroundColor: t.surface }]}
              >
                <X size={18} color={t.text} />
              </TouchableOpacity>
            </View>

            {/* Filter Tabs */}
            <View style={[styles.modalTabRow, { backgroundColor: t.surface, borderColor: t.border }]}>
              <TouchableOpacity
                style={[styles.modalTabChip, orderFilterTab === 'all' && { backgroundColor: t.primary }]}
                onPress={() => setOrderFilterTab('all')}
              >
                <Text style={{ fontSize: 12, fontWeight: '700', color: orderFilterTab === 'all' ? '#FFFFFF' : t.text }}>
                  All ({ordersList.length})
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalTabChip, orderFilterTab === 'active' && { backgroundColor: t.secondary }]}
                onPress={() => setOrderFilterTab('active')}
              >
                <Text style={{ fontSize: 12, fontWeight: '700', color: orderFilterTab === 'active' ? '#FFFFFF' : t.text }}>
                  Active ({ordersList.filter(o => o.status !== 'Delivered').length})
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalTabChip, orderFilterTab === 'delivered' && { backgroundColor: t.primary }]}
                onPress={() => setOrderFilterTab('delivered')}
              >
                <Text style={{ fontSize: 12, fontWeight: '700', color: orderFilterTab === 'delivered' ? '#FFFFFF' : t.text }}>
                  Delivered ({ordersList.filter(o => o.status === 'Delivered').length})
                </Text>
              </TouchableOpacity>
            </View>

            {/* Orders Scroll List */}
            <ScrollView style={{ maxHeight: 420 }} showsVerticalScrollIndicator={false}>
              {filteredOrders.length === 0 ? (
                <View style={{ alignItems: 'center', paddingVertical: 40 }}>
                  <Package size={40} color={t.muted} />
                  <Text variant="body" color="sub" style={{ fontWeight: '700', marginTop: 12 }}>No orders found</Text>
                </View>
              ) : (
                filteredOrders.map(ord => (
                  <View key={ord.id} style={[styles.orderCardItem, { backgroundColor: t.surface, borderColor: t.border }]}>
                    <View style={styles.orderItemHeader}>
                      <View>
                        <Text variant="body" color="text" style={{ fontWeight: '800' }}>{ord.orderNumber}</Text>
                        <Text variant="caption" color="sub" style={{ fontSize: 11, marginTop: 1 }}>{ord.date}</Text>
                      </View>
                      <View style={[
                        styles.orderStatusBadge,
                        { backgroundColor: ord.status === 'Out for Delivery' ? 'rgba(201,107,60,0.15)' : ord.status === 'Preparing' ? 'rgba(217,182,90,0.15)' : 'rgba(75,93,58,0.12)' }
                      ]}>
                        <Text style={{
                          fontSize: 11,
                          fontWeight: '800',
                          color: ord.status === 'Out for Delivery' ? t.secondary : ord.status === 'Preparing' ? t.accent : t.primary
                        }}>
                          {ord.status}
                        </Text>
                      </View>
                    </View>

                    <Text variant="caption" color="text" style={{ lineHeight: 18, marginVertical: 8, fontWeight: '600' }}>
                      {ord.items}
                    </Text>

                    <View style={styles.orderFooterRow}>
                      <Text variant="mono" color="primary" style={{ fontWeight: '900', fontSize: 16 }}>
                        ₹{ord.amount}
                      </Text>

                      <View style={{ flexDirection: 'row', gap: 8 }}>
                        {ord.status === 'Out for Delivery' && (
                          <TouchableOpacity
                            style={[styles.actionChipBtn, { backgroundColor: t.primary }]}
                            onPress={() => {
                              setShowOrdersModal(false);
                              go('tracking');
                            }}
                          >
                            <Text style={{ color: '#FFFFFF', fontSize: 11, fontWeight: '700' }}>Track</Text>
                          </TouchableOpacity>
                        )}
                        <TouchableOpacity
                          style={[styles.actionChipBtnOutline, { borderColor: t.border }]}
                          onPress={() => setSelectedInvoiceOrder(ord)}
                        >
                          <FileText size={12} color={t.text} style={{ marginRight: 4 }} />
                          <Text style={{ color: t.text, fontSize: 11, fontWeight: '700' }}>Invoice</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.actionChipBtnOutline, { borderColor: t.secondary }]}
                          onPress={() => handleReorder(ord)}
                        >
                          <RefreshCw size={11} color={t.secondary} style={{ marginRight: 4 }} />
                          <Text style={{ color: t.secondary, fontSize: 11, fontWeight: '700' }}>Reorder</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* ── MODAL B: INVOICE / RECEIPT DETAIL ── */}
      <Modal
        visible={!!selectedInvoiceOrder}
        animationType="fade"
        transparent
        onRequestClose={() => setSelectedInvoiceOrder(null)}
      >
        {selectedInvoiceOrder && (
          <View style={styles.sheetOverlay}>
            <View style={[styles.invoiceModalBox, { backgroundColor: t.card, borderColor: t.border }]}>
              <View style={styles.sheetHeaderRow}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Receipt size={20} color={t.secondary} style={{ marginRight: 8 }} />
                  <Text variant="title" color="text">Order Receipt</Text>
                </View>
                <TouchableOpacity
                  onPress={() => setSelectedInvoiceOrder(null)}
                  style={[styles.closeIconBtn, { backgroundColor: t.surface }]}
                >
                  <X size={18} color={t.text} />
                </TouchableOpacity>
              </View>

              <View style={[styles.invoiceDetailsContainer, { backgroundColor: t.surface, borderColor: t.border }]}>
                <Text variant="label" color="primary" style={{ fontWeight: '900' }}>{selectedInvoiceOrder.orderNumber}</Text>
                <Text variant="caption" color="sub" style={{ marginTop: 2 }}>Date: {selectedInvoiceOrder.date}</Text>
                <Text variant="caption" color="sub" style={{ marginTop: 1 }}>Paid via: {selectedInvoiceOrder.paymentMethod}</Text>

                <View style={{ height: 1, backgroundColor: t.border, marginVertical: 12 }} />

                <Text variant="body" color="text" style={{ fontWeight: '700', marginBottom: 8 }}>Items</Text>
                <Text variant="caption" color="sub" style={{ lineHeight: 18 }}>{selectedInvoiceOrder.items}</Text>

                <View style={{ height: 1, backgroundColor: t.border, marginVertical: 12 }} />

                <View style={styles.billRow}>
                  <Text variant="caption" color="sub">Subtotal</Text>
                  <Text variant="mono" color="text">₹{selectedInvoiceOrder.subtotal}</Text>
                </View>
                <View style={styles.billRow}>
                  <Text variant="caption" color="sub">GST & Packaging</Text>
                  <Text variant="mono" color="text">₹{selectedInvoiceOrder.gst}</Text>
                </View>
                <View style={styles.billRow}>
                  <Text variant="caption" color="sub">Delivery Fee</Text>
                  <Text variant="mono" color="primary" style={{ fontWeight: '700' }}>FREE</Text>
                </View>

                <View style={{ height: 1, backgroundColor: t.border, marginVertical: 12 }} />

                <View style={styles.billRow}>
                  <Text variant="body" color="text" style={{ fontWeight: '800' }}>Total Paid</Text>
                  <Text variant="mono" color="secondary" style={{ fontWeight: '900', fontSize: 18 }}>
                    ₹{selectedInvoiceOrder.amount}
                  </Text>
                </View>
              </View>

              <Button
                title="Download Receipt (PDF)"
                variant="outline"
                size="medium"
                style={{ marginTop: 16 }}
                onPress={() => {
                  setToast(`📄 Receipt ${selectedInvoiceOrder.orderNumber} downloaded!`);
                  setSelectedInvoiceOrder(null);
                }}
              />
            </View>
          </View>
        )}
      </Modal>

      {/* ── MODAL C: DABBA WALLET TOP-UP PROCESS SHEET ── */}
      <Modal
        visible={showTopUpModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowTopUpModal(false)}
      >
        <View style={styles.sheetOverlay}>
          <View style={[styles.sheetContent, { backgroundColor: t.card, borderColor: t.border }]}>
            <View style={styles.sheetHandleBar}>
              <View style={[styles.sheetHandle, { backgroundColor: t.border }]} />
            </View>

            <View style={styles.sheetHeaderRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Wallet size={20} color={t.secondary} style={{ marginRight: 8 }} />
                <Text variant="title" color="text">Top-up Dabba Wallet</Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowTopUpModal(false)}
                style={[styles.closeIconBtn, { backgroundColor: t.surface }]}
              >
                <X size={18} color={t.text} />
              </TouchableOpacity>
            </View>

            {/* Current Balance Banner */}
            <View style={[styles.topUpBalanceBanner, { backgroundColor: t.surface, borderColor: t.border }]}>
              <Text variant="caption" color="sub" style={{ fontWeight: '700' }}>Current Wallet Balance</Text>
              <Text variant="display" color="text" style={{ fontSize: 26, fontWeight: '900', marginTop: 2 }}>
                ₹{walletBalance.toLocaleString('en-IN')}
              </Text>
            </View>

            {/* Quick Amount Chips */}
            <Text variant="label" color="sub" style={{ marginTop: 16, marginBottom: 8, fontWeight: '800' }}>
              SELECT TOP-UP AMOUNT
            </Text>
            <View style={styles.chipRow}>
              {['200', '500', '1000', '2000'].map(amt => (
                <TouchableOpacity
                  key={amt}
                  style={[
                    styles.amountPresetChip,
                    { backgroundColor: topUpAmount === amt ? t.secondary : t.surface, borderColor: topUpAmount === amt ? t.secondary : t.border }
                  ]}
                  onPress={() => setTopUpAmount(amt)}
                >
                  <Text style={{ fontWeight: '800', fontSize: 13, color: topUpAmount === amt ? '#FFFFFF' : t.text }}>
                    +₹{amt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Custom Amount Input */}
            <Text variant="label" color="sub" style={{ marginTop: 16, marginBottom: 6, fontWeight: '800' }}>
              CUSTOM AMOUNT (₹)
            </Text>
            <View style={[styles.inputBoxRow, { backgroundColor: t.surface, borderColor: t.border }]}>
              <Text variant="title" color="secondary" style={{ marginRight: 6 }}>₹</Text>
              <TextInput
                style={{ flex: 1, fontSize: 18, fontWeight: '800', color: t.text }}
                value={topUpAmount}
                onChangeText={setTopUpAmount}
                keyboardType="numeric"
                placeholder="Enter amount"
                placeholderTextColor={t.muted}
              />
            </View>

            {/* Payment Mode Selector */}
            <Text variant="label" color="sub" style={{ marginTop: 16, marginBottom: 8, fontWeight: '800' }}>
              PAYMENT METHOD
            </Text>
            <View style={{ gap: 8 }}>
              {[
                { id: 'upi', name: 'UPI (GPay / PhonePe / Paytm)', icon: TrendingUp },
                { id: 'card', name: 'Credit / Debit Card', icon: CreditCard },
                { id: 'netbanking', name: 'Net Banking', icon: FileText },
              ].map(pm => {
                const IconComponent = pm.icon;
                const isSelected = selectedPaymentMode === pm.id;
                return (
                  <TouchableOpacity
                    key={pm.id}
                    style={[
                      styles.paymentModeOption,
                      { backgroundColor: isSelected ? (isDark ? 'rgba(201,107,60,0.18)' : 'rgba(201,107,60,0.08)') : t.surface, borderColor: isSelected ? t.secondary : t.border }
                    ]}
                    onPress={() => setSelectedPaymentMode(pm.id as any)}
                  >
                    <IconComponent size={16} color={isSelected ? t.secondary : t.sub} style={{ marginRight: 10 }} />
                    <Text variant="body" color="text" style={{ flex: 1, fontWeight: '700', fontSize: 13 }}>{pm.name}</Text>
                    <View style={[styles.radioCircle, { borderColor: isSelected ? t.secondary : t.border }]}>
                      {isSelected && <View style={[styles.radioInner, { backgroundColor: t.secondary }]} />}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Submit Top-up Action */}
            <Button
              title={isProcessingTopUp ? 'Processing Top-up…' : `Pay & Add ₹${parseInt(topUpAmount || '0', 10).toLocaleString('en-IN')}`}
              variant="primary"
              size="large"
              style={{ marginTop: 24, backgroundColor: t.secondary, borderColor: t.secondary }}
              onPress={handleTopUpConfirm}
              disabled={isProcessingTopUp}
              iconRight={isProcessingTopUp ? <ActivityIndicator size="small" color="#FFFFFF" style={{ marginLeft: 8 }} /> : undefined}
            />
          </View>
        </View>
      </Modal>

      {/* Logout Confirmation Modal */}
      <Modal
        visible={showLogoutConfirm}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLogoutConfirm(false)}
      >
        <View style={styles.logoutModalOverlay}>
          <View style={[styles.logoutModalBox, { backgroundColor: t.card, borderColor: t.border }]}>
            <View style={[styles.logoutModalIcon, { backgroundColor: isDark ? 'rgba(201,107,60,0.18)' : 'rgba(201,107,60,0.08)' }]}>
              <AlertTriangle size={26} color={t.secondary} />
            </View>
            <Text variant="title" color="text" style={{ textAlign: 'center', marginBottom: 8 }}>
              Logout?
            </Text>
            <Text variant="caption" color="sub" style={{ textAlign: 'center', marginBottom: 24, lineHeight: 18 }}>
              You will be signed out of KOI KOI DABBA. Your data will remain saved.
            </Text>
            <View style={styles.logoutModalBtns}>
              <Button
                title="Cancel"
                variant="outline"
                size="medium"
                style={{ flex: 1 }}
                onPress={() => setShowLogoutConfirm(false)}
                accessibilityLabel="Cancel logout"
              />
              <Button
                title="Logout"
                variant="primary"
                size="medium"
                style={{ flex: 1, backgroundColor: t.secondary, borderColor: t.secondary }}
                onPress={handleLogoutConfirm}
                accessibilityLabel="Confirm logout"
              />
            </View>
          </View>
        </View>
      </Modal>

    </PageLayout>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 110,
  },
  heroContainer: {
    paddingHorizontal: theme.spacing.screenHorizontal,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  heroCard: {
    padding: theme.spacing.lg,
  },
  profileHeaderCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  avatarWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  editBadgeButton: {
    position: 'absolute',
    top: 2,
    right: -4,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.md,
  },
  activePlanBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  activePlanText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 11,
    fontWeight: '700',
  },
  tierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    gap: 4,
  },
  tierBadgeText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 11,
    fontWeight: '700',
  },
  
  // Hub section
  hubSectionWrapper: {
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
  },
  sectionHeader: {
    fontFamily: theme.typography.bodyFamily,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    fontSize: 11,
    paddingHorizontal: theme.spacing.screenHorizontal,
    marginBottom: theme.spacing.xs,
  },
  hubGrid: {
    paddingHorizontal: theme.spacing.screenHorizontal,
    gap: 12,
  },
  hubCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
  },
  hubCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  hubIconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hubActiveBanner: {
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  walletBalanceBox: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  hubCardFooterBtns: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  hubMiniBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  hubMiniBtnOutline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
  },

  // Standard Section Styles
  sectionWrapper: {
    marginTop: theme.spacing.md,
  },
  groupContainer: {
    paddingHorizontal: theme.spacing.screenHorizontal,
  },
  cleanRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  rowContent: {
    flex: 1,
  },
  cleanDivider: {
    height: 1,
    width: '100%',
  },
  prefToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  toggleSegment: {
    flexDirection: 'row',
    borderRadius: 14,
    padding: 3,
    borderWidth: 1,
  },
  toggleChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  toggleChipVegActive: {
    backgroundColor: '#4B5D3A',
  },
  toggleChipNonVegActive: {
    backgroundColor: '#C96B3C',
  },
  dotIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },
  toggleChipText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 11,
    fontWeight: '700',
    color: '#8A857B',
  },
  toggleChipTextActive: {
    color: '#FFFFFF',
  },
  logoutWrapper: {
    alignItems: 'center',
    marginTop: theme.spacing.xl,
    paddingHorizontal: theme.spacing.screenHorizontal,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 20,
    backgroundColor: 'rgba(201, 107, 60, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(201, 107, 60, 0.2)',
    width: '100%',
    marginBottom: theme.spacing.md,
  },
  logoutBtnText: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 15,
    fontWeight: '800',
    color: '#C96B3C',
  },

  // Modals & Bottom Sheets
  sheetOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheetContent: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingBottom: 34,
    paddingTop: 12,
  },
  sheetHandleBar: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  sheetHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  closeIconBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTabRow: {
    flexDirection: 'row',
    borderRadius: 14,
    padding: 4,
    borderWidth: 1,
    marginBottom: 16,
  },
  modalTabChip: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  orderCardItem: {
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  orderItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  orderStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  orderFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    paddingTop: 8,
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(0,0,0,0.06)',
  },
  actionChipBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  actionChipBtnOutline: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  topUpBalanceBanner: {
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  chipRow: {
    flexDirection: 'row',
    gap: 8,
  },
  amountPresetChip: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  inputBoxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
  },
  paymentModeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  invoiceModalBox: {
    marginHorizontal: 20,
    marginBottom: 'auto',
    marginTop: 'auto',
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
  },
  invoiceDetailsContainer: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  logoutModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoutModalBox: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 24,
    borderWidth: 1,
    padding: 24,
    alignItems: 'center',
  },
  logoutModalIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoutModalBtns: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
});
