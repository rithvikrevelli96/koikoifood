import React from 'react';
import {
  StyleSheet,
  View,
  Modal,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Search, X, MapPin, Sparkles } from 'lucide-react-native';
import AppProvider from './src/app/AppProvider';
import { useAppContext } from './src/app/context';
import { theme, F, Text, Button } from './src/design-system';

const B = {
  orange: theme.colors.secondary,
  orangeL: 'rgba(201, 107, 60, 0.08)',
  green: theme.colors.success,
  greenL: 'rgba(75, 93, 58, 0.08)',
  cream: theme.colors.light.surface,
  creamL: theme.colors.light.bg,
  secondary: theme.colors.accent,
};
import FluidAnimationsDemo from './FluidAnimationsDemo';

// Feature Screen Imports
import SplashScreen from './src/features/splash/SplashScreen';
import OnboardingScreen from './src/features/onboarding/OnboardingScreen';
import AuthScreen from './src/features/auth/AuthScreen';
import SetupScreen from './src/features/setup/SetupScreen';
import HomeScreen from './src/features/home/HomeScreen';
import MealsScreen from './src/features/meals/MealsScreen';
import MealDetailScreen from './src/features/meals/MealDetailScreen';
import KitchenScreen from './src/features/kitchen/KitchenScreen';
import TourBookingScreen from './src/features/kitchen/TourBookingScreen';
import ProfileScreen from './src/features/profile/ProfileScreen';
import PersonalScreen from './src/features/profile/PersonalScreen';
import HealthInfoScreen from './src/features/profile/HealthInfoScreen';
import AddressesScreen from './src/features/profile/AddressesScreen';
import PaymentsScreen from './src/features/profile/PaymentsScreen';
import RewardsScreen from './src/features/profile/RewardsScreen';
import OffersScreen from './src/features/profile/OffersScreen';
import AppearanceScreen from './src/features/profile/AppearanceScreen';
import SupportScreen from './src/features/profile/SupportScreen';
import ReferScreen from './src/features/profile/ReferScreen';
import PlansScreen from './src/features/plans/PlansScreen';
import SubscribeFlowScreen from './src/features/plans/SubscribeFlowScreen';
import MealPreferencesScreen from './src/features/profile/MealPreferencesScreen';
import FinancesScreen from './src/features/profile/FinancesScreen';
import FamilyScreen from './src/features/profile/FamilyScreen';
import SettingsScreen from './src/features/profile/SettingsScreen';
import AboutScreen from './src/features/profile/AboutScreen';
import TrackingScreen from './src/features/tracking/TrackingScreen';
import NotificationsScreen from './src/features/notifications/NotificationsScreen';
import { DeveloperNavigator } from './src/developer';

function AppContent() {
  const {
    currentScreen,
    back,
    t,
    isDark,
    toast,
    showLocationDialog,
    setShowLocationDialog,
    detectCurrentLocation,
    showSearchModal,
    setShowSearchModal,
    searchQuery,
    setSearchQuery,
    setSelectedAddress,
    setMapTranslateX,
    setMapTranslateY,
    setMapOffsetList,
    setToast
  } = useAppContext();

  React.useEffect(() => {
    if (Platform.OS === 'web') {
      try {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode(`
          @import url('https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&display=swap');
        `));
        document.head.appendChild(style);
      } catch (err) {
        console.warn('Could not inject web fonts:', err);
      }
    }
  }, []);

  function LocationAccuracyDialog() {
    if (!showLocationDialog) return null;
    return (
      <Modal transparent visible={showLocationDialog} animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
          <View style={{ width: '100%', maxWidth: 320, backgroundColor: t.card, borderRadius: 28, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.25, shadowRadius: 15, elevation: 10, borderWidth: 1, borderColor: t.border }}>
            <View style={{ width: 54, height: 54, borderRadius: 27, backgroundColor: B.orangeL, justifyContent: 'center', alignItems: 'center', marginBottom: 14, alignSelf: 'center' }}>
              <MapPin size={24} color={B.orange} />
            </View>
            <Text variant="title" color="primary" style={{ textAlign: 'center', marginBottom: 12 }}>
              Enable Location Accuracy
            </Text>
            <Text variant="caption" color="sub" style={{ textAlign: 'center', marginBottom: 20, lineHeight: 18 }}>
              This app needs location accuracy turned on to position the map pin at your exact delivery spot.
            </Text>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Button
                title="No, thanks"
                variant="outline"
                size="medium"
                style={{ flex: 1 }}
                onPress={() => setShowLocationDialog(false)}
              />
              <Button
                title="Enable"
                variant="primary"
                size="medium"
                style={{ flex: 1 }}
                onPress={() => {
                  setShowLocationDialog(false);
                  detectCurrentLocation();
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  function SelectLocationSearchModal() {
    if (!showSearchModal) return null;

    const LOCATIONS = [
      { name: "Bollaram Industrial Area", desc: "Hyderabad, Telangana, India", dist: "1.2 km" },
      { name: "Industrial Development Area Bollaram", desc: "Bollaram, Telangana, India", dist: "1.3 km" },
      { name: "Bollaram", desc: "Telangana, India", dist: "2.5 km" },
      { name: "Bollaram Municipality", desc: "Bollaram Village, Industrial Development Area...", dist: "1.1 km" },
      { name: "Bollaram Road", desc: "Industrial Area, Krishnaja Hills, Nizampet, Hyderabad", dist: "3.2 km" },
      { name: "Urbanrise On Cloud 33", desc: "Bachupally, Hyderabad, Telangana, India", dist: "0.8 km" },
      { name: "Maisammaguda", desc: "Dulapally, Hyderabad, Telangana, India", dist: "4.5 km" }
    ];

    const filtered = LOCATIONS.filter(l => 
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      l.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <Modal visible={showSearchModal} transparent animationType="slide">
        <View style={{ flex: 1, backgroundColor: t.bg }}>
          <SafeAreaView style={{ flex: 1 }}>
            {/* Header */}
            <View style={{
              height: 56,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              borderBottomWidth: 1,
              borderBottomColor: t.border,
              backgroundColor: t.card,
              gap: 12
            }}>
              <Button
                onlyIcon
                variant="ghost"
                size="medium"
                onPress={() => setShowSearchModal(false)}
                iconLeft={<ArrowLeft size={16} color={t.text} />}
                style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: t.surface }}
              />
              <Text variant="title" color="primary">Search Location</Text>
            </View>

            {/* Search Input Box */}
            <View style={{ padding: 16 }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: t.input,
                borderRadius: 16,
                paddingHorizontal: 16,
                height: 50,
                borderWidth: 1.5,
                borderColor: t.border
              }}>
                <Search size={18} color={t.muted} />
                <TextInput
                  style={{ flex: 1, fontSize: 14, color: t.text, marginLeft: 10, height: '100%' }}
                  placeholder="Search for area, street name..."
                  placeholderTextColor={t.muted}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  autoFocus
                />
                {searchQuery ? (
                  <TouchableOpacity onPress={() => setSearchQuery("")}>
                    <X size={18} color={t.muted} />
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>

            {/* Results List */}
            <FlatList
              data={filtered}
              keyExtractor={(item) => item.name}
              contentContainerStyle={{ paddingHorizontal: 16 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedAddress(item.name + ", " + item.desc);
                    const hash = item.name.length;
                    setMapTranslateX((hash % 5) * 50 - 100);
                    setMapTranslateY((hash % 3) * 50 - 50);
                    setMapOffsetList({ x: (hash % 5) * 50 - 100, y: (hash % 3) * 50 - 50 });
                    setShowSearchModal(false);
                    setToast("Location updated!");
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 14,
                    borderBottomWidth: 1,
                    borderBottomColor: t.border,
                    gap: 14
                  }}
                >
                  <MapPin size={20} color={theme.colors.secondary} />
                  <View style={{ flex: 1 }}>
                    <Text variant="body" color="text" style={{ fontWeight: '700' }}>{item.name}</Text>
                    <Text variant="caption" color="sub" style={{ marginTop: 2 }}>{item.desc}</Text>
                  </View>
                  <Text variant="caption" color="muted" style={{ fontWeight: 'bold' }}>{item.dist}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <View style={{ alignItems: 'center', marginTop: 40 }}>
                  <Text variant="body" color="muted">No matching locations found</Text>
                </View>
              }
            />
          </SafeAreaView>
        </View>
      </Modal>
    );
  }

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'ob1':
      case 'ob2':
      case 'ob3':
        return <OnboardingScreen />;
      case 'auth':
        return <AuthScreen />;
      case 'setup1':
      case 'setup2':
      case 'setup3':
        return <SetupScreen />;
      case 'home':
        return <HomeScreen />;
      case 'meals':
        return <MealsScreen />;
      case 'meal_detail':
        return <MealDetailScreen />;
      case 'kitchen':
        return <KitchenScreen />;
      case 'tour_booking':
        return <TourBookingScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'personal':
        return <PersonalScreen />;
      case 'health_info':
        return <HealthInfoScreen />;
      case 'addresses':
        return <AddressesScreen />;
      case 'payments':
        return <PaymentsScreen />;
      case 'rewards':
        return <RewardsScreen />;
      case 'offers':
        return <OffersScreen />;
      case 'appearance':
        return <AppearanceScreen />;
      case 'support':
        return <SupportScreen />;
      case 'refer':
        return <ReferScreen />;
      case 'plans':
        return <PlansScreen />;
      case 'subscribe_flow':
        return <SubscribeFlowScreen />;
      case 'meal_pref':
        return <MealPreferencesScreen />;
      case 'finances':
        return <FinancesScreen />;
      case 'family':
        return <FamilyScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'about':
        return <AboutScreen />;
      case 'tracking':
        return <TrackingScreen />;
      case 'notifications':
        return <NotificationsScreen />;
      case 'dev_panel':
        if (__DEV__) {
          return <DeveloperNavigator />;
        }
        return <HomeScreen />;
      case 'animation_demo':
        return <FluidAnimationsDemo onBack={back} />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

      {/* Decorative Warm Organic Brand Colors Background Shapes */}
      <View style={{ position: 'absolute', top: -100, right: -100, width: 350, height: 350, borderRadius: 175, backgroundColor: isDark ? 'rgba(75, 93, 58, 0.04)' : 'rgba(75, 93, 58, 0.06)', zIndex: 0 }} />
      <View style={{ position: 'absolute', bottom: -50, left: -100, width: 300, height: 300, borderRadius: 150, backgroundColor: isDark ? 'rgba(201, 107, 60, 0.04)' : 'rgba(201, 107, 60, 0.06)', zIndex: 0 }} />

      {/* Main Screen Renderer */}
      <View style={{ 
        flex: 1, 
        zIndex: 1,
        paddingTop: currentScreen !== 'splash' && Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 0
      }}>
        {renderActiveScreen()}
      </View>

      {/* Modals & Dialogs */}
      {SelectLocationSearchModal()}
      {LocationAccuracyDialog()}

      {/* Floating Action Toast Alert */}
      {toast && (
        <View style={styles.toastContainer}>
          <LinearGradient colors={[B.orange, B.secondary]} style={styles.toastGradient}>
            <Sparkles size={14} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text variant="caption" color="inverse" style={styles.toastText}>{toast}</Text>
          </LinearGradient>
        </View>
      )}
    </View>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 95 : 85,
    left: 24,
    right: 24,
    borderRadius: 20,
    overflow: 'hidden',
    zIndex: 9999,
    shadowColor: B.orange,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5
  },
  toastGradient: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  toastText: {
    color: '#FFFFFF',
    fontWeight: '900',
    textAlign: 'center'
  }
});
