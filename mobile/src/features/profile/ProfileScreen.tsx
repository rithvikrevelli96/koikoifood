import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar
} from 'react-native';
import {
  User,
  Heart,
  MapPin,
  ChevronRight,
  Award,
  Wallet,
  Gift,
  Tag,
  Share2,
  Sun,
  Bell,
  HelpCircle,
  Info,
  ShieldCheck,
  LogOut
} from 'lucide-react-native';
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
  const isNumeric = /[₹\d]/.test(content) && (
    /^[₹\d\s★%\-.:\+a-zA-Z\s]+$/.test(content) ||
    content.includes('kcal') ||
    content.includes('protein') ||
    content.includes('Carbs') ||
    content.includes('₹') ||
    content.includes('min') ||
    content.includes('km') ||
    content.includes('pts')
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
import { Screen } from '../../core/constants/types';
import { BottomTabNav } from '../../core/components/BottomTabNav';

export default function ProfileScreen() {
  const {
    user,
    setUser,
    currentScreen,
    setCurrentScreen,
    setToast,
    go,
    t
  } = useAppContext();

  const handleLogout = () => {
    setToast('Logged Out');
    setCurrentScreen('auth');
  };

  const [versionTaps, setVersionTaps] = React.useState(0);
  const handleVersionTap = () => {
    if (!__DEV__) return;
    if (versionTaps >= 6) {
      setVersionTaps(0);
      setToast("🛠️ Developer Sandbox Activated!");
      go('dev_panel');
    } else {
      setVersionTaps(prev => prev + 1);
    }
  };

  const firstLetter = (user.name || 'Bhargav').charAt(0).toUpperCase();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.light.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 110 }} showsVerticalScrollIndicator={false}>
        {/* User profile details header */}
        <View style={{ paddingHorizontal: 20, paddingTop: 20, alignItems: 'center' }}>
          <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: B.orange, justifyContent: 'center', alignItems: 'center', shadowColor: B.orange, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.2, shadowRadius: 10, elevation: 4 }}>
            <Text style={{ fontSize: 32, fontWeight: '900', color: '#FFFFFF' }}>{firstLetter}</Text>
          </View>
          <Text style={{ fontSize: 20, fontWeight: '900', color: t.text, marginTop: 12 }}>{user.name || 'Bhargav'}</Text>
          <Text style={{ fontSize: 13, color: t.sub, marginTop: 2 }}>{user.phone || '+91 98765 43210'}</Text>
          <Text style={{ fontSize: 13, color: t.sub, marginTop: 2 }}>{user.email || 'bhargav.s@gmail.com'}</Text>

          {/* Active Plan Box */}
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 20, backgroundColor: t.card, borderWidth: 1.5, borderColor: t.border, marginTop: 20, width: '100%', justifyContent: 'space-between' }}>
            <View>
              <Text style={{ fontSize: 11, fontWeight: '900', color: t.muted, textTransform: 'uppercase', letterSpacing: 0.5 }}>Active Plan</Text>
              <Text style={{ fontSize: 15, fontWeight: '900', color: t.text, marginTop: 2 }}>Monthly Veg Plan</Text>
            </View>
            <View style={{ backgroundColor: B.orangeL, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 }}>
              <Text style={{ fontSize: 11, fontWeight: '900', color: B.orange }}>1,250 pts · Gold</Text>
            </View>
          </View>
        </View>

        {/* Account & Identity Section */}
        <View style={{ marginTop: 16 }}>
          <Text style={{ fontSize: 10, fontWeight: '900', color: t.sub, letterSpacing: 1.5, marginLeft: 24, marginBottom: 8 }}>ACCOUNT & IDENTITY</Text>
          <View style={{ marginHorizontal: 16, borderRadius: 24, borderWidth: 1.5, borderColor: t.border, backgroundColor: t.card, overflow: 'hidden' }}>
            {[
              { title: 'Personal Details', sub: 'Name, email, phone number & gender', icon: User, screen: 'personal' },
              { title: 'Health Info', sub: 'Nutrition goals, calories, allergies', icon: Heart, screen: 'health_info' },
              { title: 'Saved Addresses', sub: 'Home, work & delivery instructions', icon: MapPin, screen: 'addresses' }
            ].map((item, idx) => (
              <TouchableOpacity
                key={idx}
                style={[{ flexDirection: 'row', alignItems: 'center', padding: 16 }, idx > 0 && { borderTopWidth: 1.5, borderTopColor: t.border }]}
                onPress={() => go(item.screen as Screen)}
              >
                <View style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: B.orangeL, justifyContent: 'center', alignItems: 'center' }}>
                  <item.icon size={16} color={B.orange} />
                </View>
                <View style={{ flex: 1, marginLeft: 14 }}>
                  <Text style={{ fontSize: 14, fontWeight: 'bold', color: t.text }}>{item.title}</Text>
                  <Text style={{ fontSize: 11, color: t.sub, marginTop: 2 }}>{item.sub}</Text>
                </View>
                <ChevronRight size={16} color={t.sub} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Preferences Section */}
        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 10, fontWeight: '900', color: t.sub, letterSpacing: 1.5, marginLeft: 24, marginBottom: 8 }}>PREFERENCES</Text>
          <View style={{ marginHorizontal: 16, borderRadius: 24, borderWidth: 1.5, borderColor: t.border, backgroundColor: t.card, padding: 16 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: t.text }}>Meal Preference</Text>
                <Text style={{ fontSize: 11, color: t.sub, marginTop: 2 }}>{user.foodPref} Preference</Text>
              </View>
              <View style={{ flexDirection: 'row', backgroundColor: t.surface, borderRadius: 12, padding: 3, borderWidth: 1, borderColor: t.border }}>
                {['Veg', 'Non-Veg'].map(opt => {
                  const isSelected = user.foodPref === opt;
                  return (
                    <TouchableOpacity
                      key={opt}
                      onPress={() => {
                        setUser((prev: any) => ({ ...prev, foodPref: opt }));
                        setToast(`Preference updated to: ${opt}`);
                      }}
                      style={{
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 8,
                        backgroundColor: isSelected ? B.orange : 'transparent'
                      }}
                    >
                      <Text style={{ fontSize: 10.5, fontWeight: '900', color: isSelected ? '#FFFFFF' : t.text }}>{opt}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        </View>

        {/* Subscription & Finances Section */}
        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 10, fontWeight: '900', color: t.sub, letterSpacing: 1.5, marginLeft: 24, marginBottom: 8 }}>SUBSCRIPTION & FINANCES</Text>
          <View style={{ marginHorizontal: 16, borderRadius: 24, borderWidth: 1.5, borderColor: t.border, backgroundColor: t.card, overflow: 'hidden' }}>
            {[
              { title: 'Subscription Status', sub: 'Monthly Veg Plan · Active', icon: Award, screen: 'plans' },
              { title: 'Wallet Balance', sub: '₹1,250.00 · View statements & add money', icon: Wallet, screen: 'payments' },
              { title: 'Rewards & Points', sub: '1,250 pts · Gold Tier perks', icon: Gift, screen: 'rewards' },
              { title: 'Offers & Coupons', sub: 'Explore dynamic coupons & offers', icon: Tag, screen: 'offers' },
              { title: 'Referral Program', sub: 'Earn ₹100 per friend', icon: Share2, screen: 'refer' }
            ].map((item, idx) => (
              <TouchableOpacity
                key={idx}
                style={[{ flexDirection: 'row', alignItems: 'center', padding: 16 }, idx > 0 && { borderTopWidth: 1.5, borderTopColor: t.border }]}
                onPress={() => go(item.screen as Screen)}
              >
                <View style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: B.orangeL, justifyContent: 'center', alignItems: 'center' }}>
                  <item.icon size={16} color={B.orange} />
                </View>
                <View style={{ flex: 1, marginLeft: 14 }}>
                  <Text style={{ fontSize: 14, fontWeight: 'bold', color: t.text }}>{item.title}</Text>
                  <Text style={{ fontSize: 11, color: t.sub, marginTop: 2 }}>{item.sub}</Text>
                </View>
                <ChevronRight size={16} color={t.sub} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* App Settings Section */}
        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 10, fontWeight: '900', color: t.sub, letterSpacing: 1.5, marginLeft: 24, marginBottom: 8 }}>APP SETTINGS</Text>
          <View style={{ marginHorizontal: 16, borderRadius: 24, borderWidth: 1.5, borderColor: t.border, backgroundColor: t.card, overflow: 'hidden' }}>
            {[
              { title: 'Appearance & Theme', sub: 'Light, Dark & System default', icon: Sun, screen: 'appearance' },
              { title: 'Notifications', sub: 'Updates, alerts & promo preferences', icon: Bell, screen: 'notifications' }
            ].map((item, idx) => (
              <TouchableOpacity
                key={idx}
                style={[{ flexDirection: 'row', alignItems: 'center', padding: 16 }, idx > 0 && { borderTopWidth: 1.5, borderTopColor: t.border }]}
                onPress={() => go(item.screen as Screen)}
              >
                <View style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: B.orangeL, justifyContent: 'center', alignItems: 'center' }}>
                  <item.icon size={16} color={B.orange} />
                </View>
                <View style={{ flex: 1, marginLeft: 14 }}>
                  <Text style={{ fontSize: 14, fontWeight: 'bold', color: t.text }}>{item.title}</Text>
                  <Text style={{ fontSize: 11, color: t.sub, marginTop: 2 }}>{item.sub}</Text>
                </View>
                <ChevronRight size={16} color={t.sub} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Help & Support Section */}
        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 10, fontWeight: '900', color: t.sub, letterSpacing: 1.5, marginLeft: 24, marginBottom: 8 }}>HELP & SUPPORT</Text>
          <View style={{ marginHorizontal: 16, borderRadius: 24, borderWidth: 1.5, borderColor: t.border, backgroundColor: t.card, overflow: 'hidden' }}>
            {[
              { title: 'Support Centre', sub: 'Live chat, phone call & tickets', icon: HelpCircle, screen: 'support' },
              { title: 'Frequently Asked Questions', sub: 'Solve issues instantly', icon: Info, action: () => setToast("Opening FAQs Support Centre...") },
              { title: 'About KOI KOI', sub: 'v4.0.0 · Active', icon: ShieldCheck, action: () => setToast("KOI KOI App version v4.0.0 is active & running.") }
            ].map((item, idx) => (
              <TouchableOpacity
                key={idx}
                style={[{ flexDirection: 'row', alignItems: 'center', padding: 16 }, idx > 0 && { borderTopWidth: 1.5, borderTopColor: t.border }]}
                onPress={() => item.action ? item.action() : go(item.screen as Screen)}
              >
                <View style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: B.orangeL, justifyContent: 'center', alignItems: 'center' }}>
                  <item.icon size={16} color={B.orange} />
                </View>
                <View style={{ flex: 1, marginLeft: 14 }}>
                  <Text style={{ fontSize: 14, fontWeight: 'bold', color: t.text }}>{item.title}</Text>
                  <Text style={{ fontSize: 11, color: t.sub, marginTop: 2 }}>{item.sub}</Text>
                </View>
                <ChevronRight size={16} color={t.sub} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 32, paddingVertical: 12 }} onPress={handleLogout}>
          <LogOut size={16} color="#EF4444" style={{ marginRight: 6 }} />
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#EF4444' }}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          activeOpacity={__DEV__ ? 0.8 : 1}
          disabled={!__DEV__}
          onPress={handleVersionTap}
          style={{ alignItems: 'center', marginTop: 24, marginBottom: 40 }}
        >
          <Text style={{ fontSize: 11, color: t.muted, fontWeight: '600', letterSpacing: 0.5 }}>
            v1.0.0-dev (Stable)
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomTabNav active="profile" />
    </SafeAreaView>
  );
}
