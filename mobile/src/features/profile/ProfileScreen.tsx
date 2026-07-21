import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Platform,
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
  Edit3
} from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import {
  theme,
  Text,
  PageLayout,
  HeroCard
} from '../../design-system';
import { BottomTabNav } from '../../core/components/BottomTabNav';

export default function ProfileScreen() {
  const {
    user,
    resetNavigation,
    setToast,
    go,
    isDark
  } = useAppContext();

  // Active user profile values with default fallback requested in prompt
  const userName = user.name || 'Bhargav';
  const userPhone = user.phone || '+91 98765 43210';
  const userEmail = user.email || 'bhargav.s@gmail.com';

  const [vegPreference, setVegPreference] = useState<'veg' | 'non-veg'>('veg');
  const [versionTaps, setVersionTaps] = useState(0);

  // Smooth Entrance Animations
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

  const dividerColor = isDark ? '#38342E' : '#E8E2D8';

  return (
    <PageLayout style={{ paddingHorizontal: 0 }} background="organic" backgroundVariant="clean">
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          
          {/* 1. HERO PROFILE CARD (SPECIFIC CONTENT HERO ONLY) */}
          <View style={styles.heroContainer}>
            <HeroCard style={styles.heroCard}>
              <View style={styles.heroHeaderRow}>
                {/* Avatar with initial B */}
                <View style={styles.avatarWrapper}>
                  <View style={styles.avatarCircle}>
                    <Text style={styles.avatarInitial}>{userName.charAt(0).toUpperCase()}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.editAvatarBadge}
                    onPress={() => go('personal')}
                    activeOpacity={0.8}
                    accessibilityRole="button"
                    accessibilityLabel="Edit Profile Details"
                  >
                    <Edit3 size={11} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>

                {/* Profile Details */}
                <View style={styles.profileDetails}>
                  <Text variant="headingM" color="primary" style={{ fontWeight: '800' }}>{userName}</Text>
                  <Text variant="mono" color="primary" style={{ fontSize: 13, fontWeight: '700', marginTop: 1 }}>{userPhone}</Text>
                  <Text variant="caption" color="sub" style={{ marginTop: 1 }}>{userEmail}</Text>

                  {/* Status Badges */}
                  <View style={styles.badgeRow}>
                    <View style={styles.activePlanBadge}>
                      <View style={styles.pulseDot} />
                      <Text style={styles.activePlanText}>Active Plan</Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => go('rewards')}
                      style={styles.tierBadge}
                      activeOpacity={0.8}
                    >
                      <Star size={11} color="#D9B65A" fill="#D9B65A" />
                      <Text style={styles.tierBadgeText}>1,250 pts · Gold</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </HeroCard>
          </View>

          {/* 2. ACCOUNT & IDENTITY (CLEAN NO-CARD SECTION) */}
          <View style={styles.sectionWrapper}>
            <Text variant="label" color="sub" style={styles.sectionHeader}>Account & Identity</Text>
            <View style={styles.groupContainer}>
              {/* Personal Details */}
              <TouchableOpacity onPress={() => go('personal')} style={styles.cleanRowItem} activeOpacity={0.7}>
                <View style={[styles.iconBox, { backgroundColor: 'rgba(75, 93, 58, 0.08)' }]}>
                  <User size={18} color={isDark ? '#7FA457' : '#4B5D3A'} />
                </View>
                <View style={styles.rowContent}>
                  <Text variant="body" color="text" style={{ fontWeight: '700' }}>Personal Details</Text>
                  <Text variant="caption" color="sub" style={{ marginTop: 2 }}>Name, email, phone number & gender</Text>
                </View>
                <ChevronRight size={18} color={isDark ? '#A09B90' : '#8A857B'} />
              </TouchableOpacity>

              <View style={[styles.cleanDivider, { backgroundColor: dividerColor }]} />

              {/* Health Info */}
              <TouchableOpacity onPress={() => go('health_info')} style={styles.cleanRowItem} activeOpacity={0.7}>
                <View style={[styles.iconBox, { backgroundColor: 'rgba(201, 107, 60, 0.08)' }]}>
                  <Heart size={18} color="#C96B3C" />
                </View>
                <View style={styles.rowContent}>
                  <Text variant="body" color="text" style={{ fontWeight: '700' }}>Health Info</Text>
                  <Text variant="caption" color="sub" style={{ marginTop: 2 }}>Nutrition goals, calories, allergies</Text>
                </View>
                <ChevronRight size={18} color={isDark ? '#A09B90' : '#8A857B'} />
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

          {/* 3. PREFERENCES (CLEAN NO-CARD SECTION) */}
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

              {/* Interactive Quick Veg Preference Switcher */}
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

          {/* 4. SUBSCRIPTION & FINANCES (CLEAN NO-CARD SECTION) */}
          <View style={styles.sectionWrapper}>
            <Text variant="label" color="sub" style={styles.sectionHeader}>Subscription & Finances</Text>
            <View style={styles.groupContainer}>
              {/* Subscription Status */}
              <TouchableOpacity onPress={() => go('plans')} style={styles.cleanRowItem} activeOpacity={0.7}>
                <View style={[styles.iconBox, { backgroundColor: 'rgba(75, 93, 58, 0.08)' }]}>
                  <ChefHat size={18} color={isDark ? '#7FA457' : '#4B5D3A'} />
                </View>
                <View style={styles.rowContent}>
                  <Text variant="body" color="text" style={{ fontWeight: '700' }}>Subscription Status</Text>
                  <Text variant="caption" color="sub" style={{ marginTop: 2 }}>Monthly Veg Plan · Active</Text>
                </View>
                <ChevronRight size={18} color={isDark ? '#A09B90' : '#8A857B'} />
              </TouchableOpacity>

              <View style={[styles.cleanDivider, { backgroundColor: dividerColor }]} />

              {/* Rewards & Points */}
              <TouchableOpacity onPress={() => go('rewards')} style={styles.cleanRowItem} activeOpacity={0.7}>
                <View style={[styles.iconBox, { backgroundColor: 'rgba(217, 182, 90, 0.08)' }]}>
                  <Gift size={18} color="#D9B65A" />
                </View>
                <View style={styles.rowContent}>
                  <Text variant="body" color="text" style={{ fontWeight: '700' }}>Rewards & Points</Text>
                  <Text variant="caption" color="sub" style={{ marginTop: 2 }}>1,250 pts · Gold Tier perks</Text>
                </View>
                <ChevronRight size={18} color={isDark ? '#A09B90' : '#8A857B'} />
              </TouchableOpacity>

              <View style={[styles.cleanDivider, { backgroundColor: dividerColor }]} />

              {/* Offers & Coupons */}
              <TouchableOpacity onPress={() => go('offers')} style={styles.cleanRowItem} activeOpacity={0.7}>
                <View style={[styles.iconBox, { backgroundColor: 'rgba(201, 107, 60, 0.08)' }]}>
                  <Sparkles size={18} color="#C96B3C" />
                </View>
                <View style={styles.rowContent}>
                  <Text variant="body" color="text" style={{ fontWeight: '700' }}>Offers & Coupons</Text>
                  <Text variant="caption" color="sub" style={{ marginTop: 2 }}>Save on renewals & ad-hoc dabbas</Text>
                </View>
                <ChevronRight size={18} color={isDark ? '#A09B90' : '#8A857B'} />
              </TouchableOpacity>

              <View style={[styles.cleanDivider, { backgroundColor: dividerColor }]} />

              {/* Referral Program */}
              <TouchableOpacity onPress={() => go('refer')} style={styles.cleanRowItem} activeOpacity={0.7}>
                <View style={[styles.iconBox, { backgroundColor: 'rgba(75, 93, 58, 0.08)' }]}>
                  <Users size={18} color={isDark ? '#7FA457' : '#4B5D3A'} />
                </View>
                <View style={styles.rowContent}>
                  <Text variant="body" color="text" style={{ fontWeight: '700' }}>Referral Program</Text>
                  <Text variant="caption" color="sub" style={{ marginTop: 2 }}>Earn ₹100 per friend</Text>
                </View>
                <ChevronRight size={18} color={isDark ? '#A09B90' : '#8A857B'} />
              </TouchableOpacity>
            </View>
          </View>

          {/* 5. APP SETTINGS (CLEAN NO-CARD SECTION) */}
          <View style={styles.sectionWrapper}>
            <Text variant="label" color="sub" style={styles.sectionHeader}>App Settings</Text>
            <View style={styles.groupContainer}>
              {/* Appearance & Theme */}
              <TouchableOpacity onPress={() => go('appearance')} style={styles.cleanRowItem} activeOpacity={0.7}>
                <View style={[styles.iconBox, { backgroundColor: 'rgba(75, 93, 58, 0.08)' }]}>
                  <Sliders size={18} color={isDark ? '#7FA457' : '#4B5D3A'} />
                </View>
                <View style={styles.rowContent}>
                  <Text variant="body" color="text" style={{ fontWeight: '700' }}>Appearance & Theme</Text>
                  <Text variant="caption" color="sub" style={{ marginTop: 2 }}>Light, Dark & System default</Text>
                </View>
                <ChevronRight size={18} color={isDark ? '#A09B90' : '#8A857B'} />
              </TouchableOpacity>

              <View style={[styles.cleanDivider, { backgroundColor: dividerColor }]} />

              {/* Notifications */}
              <TouchableOpacity onPress={() => go('notifications')} style={styles.cleanRowItem} activeOpacity={0.7}>
                <View style={[styles.iconBox, { backgroundColor: 'rgba(201, 107, 60, 0.08)' }]}>
                  <Bell size={18} color="#C96B3C" />
                </View>
                <View style={styles.rowContent}>
                  <Text variant="body" color="text" style={{ fontWeight: '700' }}>Notifications</Text>
                  <Text variant="caption" color="sub" style={{ marginTop: 2 }}>Updates, alerts & promo preferences</Text>
                </View>
                <ChevronRight size={18} color={isDark ? '#A09B90' : '#8A857B'} />
              </TouchableOpacity>
            </View>
          </View>

          {/* 6. HELP & SUPPORT (CLEAN NO-CARD SECTION) */}
          <View style={styles.sectionWrapper}>
            <Text variant="label" color="sub" style={styles.sectionHeader}>Help & Support</Text>
            <View style={styles.groupContainer}>
              {/* Support Centre */}
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

              {/* Frequently Asked Questions */}
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

              {/* About KOI KOI */}
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

          {/* 7. LOGOUT & VERSION FOOTER */}
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
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 110,
    paddingTop: theme.spacing.md,
  },
  heroContainer: {
    paddingHorizontal: theme.spacing.screenHorizontal,
    marginBottom: theme.spacing.lg,
  },
  heroCard: {
    padding: theme.spacing.lg,
  },
  heroHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatarCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#4B5D3A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2.5,
    borderColor: '#D9B65A',
  },
  avatarInitial: {
    fontFamily: theme.typography.monoFamily,
    fontSize: 28,
    fontWeight: '800',
    color: '#FCFAF6',
  },
  editAvatarBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#C96B3C',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FCFAF6',
  },
  profileDetails: {
    flex: 1,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
    flexWrap: 'wrap',
  },
  activePlanBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(75, 93, 58, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    gap: 5,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4B5D3A',
  },
  activePlanText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 11,
    fontWeight: '700',
    color: '#4B5D3A',
  },
  tierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(217, 182, 90, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(217, 182, 90, 0.3)',
  },
  tierBadgeText: {
    fontFamily: theme.typography.monoFamily,
    fontSize: 11,
    fontWeight: '700',
    color: '#1F1F1F',
  },
  sectionWrapper: {
    paddingHorizontal: theme.spacing.screenHorizontal,
    marginBottom: theme.spacing.lg,
  },
  sectionHeader: {
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 6,
    marginLeft: 2,
    fontWeight: '800',
  },
  groupContainer: {
    width: '100%',
  },
  cleanRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    gap: 14,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowContent: {
    flex: 1,
  },
  cleanDivider: {
    height: 1,
    marginLeft: 52,
    marginRight: 4,
    opacity: 0.7,
  },
  prefToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 4,
    gap: 12,
  },
  toggleSegment: {
    flexDirection: 'row',
    borderRadius: 14,
    padding: 3,
    borderWidth: 1,
    gap: 2,
  },
  toggleChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 11,
    gap: 4,
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
  },
  toggleChipText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 11.5,
    fontWeight: '700',
    color: '#1F1F1F',
  },
  toggleChipTextActive: {
    color: '#FFFFFF',
  },
  logoutWrapper: {
    paddingHorizontal: theme.spacing.screenHorizontal,
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.md,
    alignItems: 'center',
    gap: 12,
  },
  logoutBtn: {
    flexDirection: 'row',
    width: '100%',
    borderColor: '#C96B3C',
    borderWidth: 1.5,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(201, 107, 60, 0.04)',
  },
  logoutBtnText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 14.5,
    color: '#C96B3C',
    fontWeight: '800',
  },
});
