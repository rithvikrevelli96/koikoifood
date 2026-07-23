import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useColorScheme, Animated, PanResponder } from 'react-native';
import * as Location from 'expo-location';
import { AppContext } from './context';
import { Screen, Meal, AppTheme } from '../core/constants/types';
import { MEALS } from '../core/constants/meals';
import { theme } from '../design-system/theme';

const LIGHT = theme.colors.light;
const DARK = theme.colors.dark;
import { storage } from '../core/utils/storage';
import { WalletProvider } from '../core/context/WalletContext';
import { SubscriptionProvider } from '../core/context/SubscriptionContext';

interface AppProviderProps {
  children: React.ReactNode;
}

export default function AppProvider({ children }: AppProviderProps) {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<AppTheme>('system');
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [screenStack, setScreenStack] = useState<Screen[]>(['splash']);
  const [toast, setToast] = useState<string | null>(null);

  // Load saved state on mount
  useEffect(() => {
    async function loadSavedState() {
      try {
        const savedTheme = await storage.getItem('koikoi_theme_mode');
        if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system') {
          setThemeMode(savedTheme as AppTheme);
        }

        const savedScreen = await storage.getItem('koikoi_onboarding_screen');
        const savedUser = await storage.getItem('koikoi_onboarding_user');
        const savedSubscribed = await storage.getItem('koikoi_onboarding_subscribed');
        const savedAddress = await storage.getItem('koikoi_onboarding_address');
        const savedAddressesList = await storage.getItem('koikoi_onboarding_addresses_list');
        const savedSetup3SubPage = await storage.getItem('koikoi_onboarding_setup3_subpage');

        if (savedScreen) {
          const resumeScreens: Screen[] = ['auth', 'setup1', 'setup2', 'setup3'];
          if (resumeScreens.includes(savedScreen as Screen)) {
            setCurrentScreen(savedScreen as Screen);
            setScreenStack(['splash', savedScreen as Screen]);
          }
        }
        if (savedUser) {
          setUser(prev => ({ ...prev, ...JSON.parse(savedUser) }));
        }
        if (savedSubscribed) {
          setSubscribed(savedSubscribed === 'true');
        }
        if (savedAddress) {
          setSelectedAddress(savedAddress);
        }
        if (savedAddressesList) {
          setAddressesList(JSON.parse(savedAddressesList));
        }
        if (savedSetup3SubPage) {
          setSetup3SubPage(parseInt(savedSetup3SubPage, 10) || 1);
        }
      } catch (err) {
        console.warn('Failed to load saved state:', err);
      }
    }
    loadSavedState();
  }, []);

  // Save theme mode when updated
  useEffect(() => {
    async function saveTheme() {
      try {
        await storage.setItem('koikoi_theme_mode', themeMode);
      } catch (err) {
        console.warn('Failed to save theme mode:', err);
      }
    }
    saveTheme();
  }, [themeMode]);


  // App State with Demo Profile Defaults
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: '👩‍🍳',
    foodPref: 'Veg',
    height: '',
    weight: '',
    goalWeight: '',
    goal: 'Healthy Living',
    address: '',
    addressLabel: 'Home',
    dob: '',
    gender: 'Female',
    houseNo: '',
    street: '',
    landmark: '',
    pincode: '',
    activityLevel: 'Lightly Active',
    healthGoal: 'Healthy Lifestyle',
    spiceLevel: 'Medium',
    favCuisines: ['South Indian', 'North Indian'] as string[],
    allergies: 'None',
    profileCompleted: false,
    locationCompleted: false,
    healthCompleted: false,
  });
  const [subscribed, setSubscribed] = useState(false);
  const [newUserHomeMealTab, setNewUserHomeMealTab] = useState<'lunch' | 'dinner'>('lunch');
  const [paused, setPaused] = useState(false);
  const [selectedMealId, setSelectedMealId] = useState<number>(1);
  const [mealsList, setMealsList] = useState<Meal[]>(MEALS);

  // Auth/Login State
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(30);

  // Lifted UI State
  const [selectedFilter, setSelectedFilter] = useState('Both');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedCam, setSelectedCam] = useState(1);

  // Location Map States
  const [showLocationPermission, setShowLocationPermission] = useState(false);
  const [showMapSelection, setShowMapSelection] = useState(false);
  const [selectedMapPinIdx, setSelectedMapPinIdx] = useState(0);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('');
  const [showManageOptions, setShowManageOptions] = useState<boolean>(false);
  const [checkoutMealPref, setCheckoutMealPref] = useState<'Veg' | 'Non-Veg'>('Veg');
  const [checkoutFreq, setCheckoutFreq] = useState<'lunch' | 'dinner' | 'both'>('both');
  const [checkoutCustomPrefs, setCheckoutCustomPrefs] = useState<string[]>(['Medium Spicy']);
  const [checkoutStartDate, setCheckoutStartDate] = useState<'tomorrow' | 'custom'>('tomorrow');
  const [tourDate, setTourDate] = useState('15-07-2026');
  const [tourTimeSlot, setTourTimeSlot] = useState('11:30 AM');
  const [tourVisitors, setTourVisitors] = useState(1);
  const [tourContactName, setTourContactName] = useState('');
  const [tourContactPhone, setTourContactPhone] = useState('');

  const getNumericPrice = (priceStr: string) => {
    return parseInt(priceStr.replace(/[^0-9]/g, ''), 10) || 0;
  };

  const [activeMealIndex, setActiveMealIndex] = useState(0);
  const [menuActiveTab, setMenuActiveTab] = useState<'recipes' | 'customize'>('recipes');
  
  const [selectedAddress, setSelectedAddress] = useState("Madhapur, Hyderabad, Telangana, India");
  const [addressDetails, setAddressDetails] = useState("");
  const [locationPermissionEnabled, setLocationPermissionEnabled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [receiverDetailsName, setReceiverDetailsName] = useState("");
  const [receiverDetailsPhone, setReceiverDetailsPhone] = useState("");
  const [showPhotoPicker, setShowPhotoPicker] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showLocationDialog, setShowLocationDialog] = useState(false);
  
  const [addressesList, setAddressesList] = useState<{ id: string; label: string; address: string; name: string; phone: string; image?: string; }[]>([
    { id: '1', label: 'Home', address: 'Bollaram Industrial Area, Hyderabad, Telangana, India', name: 'Rithvik', phone: '+91 7075420121' }
  ]);
  const [addressLabel, setAddressLabel] = useState<'Home' | 'Work' | 'Other'>('Home');
  const [doorImageUri, setDoorImageUri] = useState<string | null>(null);
  const [mapTranslateX, setMapTranslateX] = useState(0);
  const [mapTranslateY, setMapTranslateY] = useState(0);
  const [mapOffsetList, setMapOffsetList] = useState({ x: 0, y: 0 });
  const [isDraggingMap, setIsDraggingMap] = useState(false);
  const [showContactsModal, setShowContactsModal] = useState(false);
  const [deviceContacts, setDeviceContacts] = useState<any[]>([]);
  const [contactsSearchQuery, setContactsSearchQuery] = useState("");

  // Health Setup States
  const [setup3SubPage, setSetup3SubPage] = useState(1);
  const [goalWeight, setGoalWeight] = useState("");
  const [workoutFrequency, setWorkoutFrequency] = useState("Never");
  const [workoutTypes, setWorkoutTypes] = useState<string[]>([]);
  const [primaryGoal, setPrimaryGoal] = useState("Eat Healthy");
  const [goalSpeed, setGoalSpeed] = useState("0.5 kg/week");
  const [motivation, setMotivation] = useState("Live a Healthier Lifestyle");
  const [allergiesList, setAllergiesList] = useState<string[]>([]);
  const [healthConditions, setHealthConditions] = useState<string[]>([]);
  const [foodDislikes, setFoodDislikes] = useState<string[]>([]);
  const [waterIntakeGoal, setWaterIntakeGoal] = useState("2 L");
  const [customWaterIntake, setCustomWaterIntake] = useState("");
  const [bedtime, setBedtime] = useState("22:00");
  const [wakeupTime, setWakeupTime] = useState("06:00");
  const [smartNotifications, setSmartNotifications] = useState({
    meal: false,
    water: false,
    workout: false,
    sleep: false,
    orderUpdates: true
  });
  const [connectedHealthApps, setConnectedHealthApps] = useState<string[]>([]);

  const panResponder = useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      setIsDraggingMap(true);
    },
    onPanResponderMove: (evt, gestureState) => {
      setMapTranslateX(mapOffsetList.x + gestureState.dx);
      setMapTranslateY(mapOffsetList.y + gestureState.dy);
    },
    onPanResponderRelease: (evt, gestureState) => {
      setIsDraggingMap(false);
      const nextX = mapOffsetList.x + gestureState.dx;
      const nextY = mapOffsetList.y + gestureState.dy;
      setMapOffsetList({ x: nextX, y: nextY });

      const totalDist = Math.sqrt(gestureState.dx * gestureState.dx + gestureState.dy * gestureState.dy);
      if (totalDist > 10) {
        const mockAddresses = [
          "Bollaram Industrial Area, Hyderabad, Telangana, India",
          "Bachupally Road, Bachupally, Hyderabad, Telangana, India",
          "Urbanrise On Cloud 33, Bachupally, Hyderabad, Telangana, India",
          "St. Peter's School Lane, Bachupally, Hyderabad, Telangana, India",
          "Devashrey Hostel Road, Bachupally, Hyderabad, Telangana, India",
          "Mallampet Road, Bollaram, Hyderabad, Telangana, India"
        ];
        const index = Math.abs(Math.floor(nextX + nextY)) % mockAddresses.length;
        setSelectedAddress(mockAddresses[index]);
        setToast("Pin location updated!");
      }
    }
  }), [mapOffsetList]);

  // Animations refs
  const obFade = useRef(new Animated.Value(0)).current;
  const obSlideY = useRef(new Animated.Value(40)).current;
  const obScale = useRef(new Animated.Value(0.8)).current;
  const obIllusScale = useRef(new Animated.Value(0.5)).current;
  const obTitleSlideY = useRef(new Animated.Value(20)).current;
  const obTitleFade = useRef(new Animated.Value(0)).current;
  const obDescSlideY = useRef(new Animated.Value(20)).current;
  const obDescFade = useRef(new Animated.Value(0)).current;
  const obChipsFade = useRef(new Animated.Value(0)).current;
  const obBtnSlideY = useRef(new Animated.Value(20)).current;
  const obBtnFade = useRef(new Animated.Value(0)).current;
  const obFloatAnim = useRef(new Animated.Value(0)).current;
  const cardFloat1 = useRef(new Animated.Value(0)).current;
  const cardFloat2 = useRef(new Animated.Value(0)).current;
  const cardFloat3 = useRef(new Animated.Value(0)).current;
  const splashFade = useRef(new Animated.Value(0)).current;
  const splashScale = useRef(new Animated.Value(0.6)).current;
  const splashTranslateY = useRef(new Animated.Value(30)).current;
  
  const authFade = useRef(new Animated.Value(0)).current;
  const authSlideY = useRef(new Animated.Value(45)).current;

  const plateScale = useRef(new Animated.Value(1)).current;
  const plateRotate = useRef(new Animated.Value(0)).current;
  const plateFade = useRef(new Animated.Value(1)).current;

  // Active theme calculation
  const isDark = useMemo(() => {
    if (themeMode === 'system') return systemColorScheme === 'dark';
    return themeMode === 'dark';
  }, [themeMode, systemColorScheme]);

  const t = isDark ? DARK : LIGHT;

  // Per-tab navigation stacks
  const TAB_ROOTS: string[] = ['home', 'meals', 'plans', 'kitchen', 'profile'];
  const DEFAULT_TAB_STACKS: Record<string, Screen[]> = {
    home: ['home'],
    meals: ['meals'],
    plans: ['plans'],
    kitchen: ['kitchen'],
    profile: ['profile'],
  };

  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [tabStacks, setTabStacks] = useState<Record<string, Screen[]>>({ ...DEFAULT_TAB_STACKS });

  // Switch to a different tab (used by BottomTabNav)
  const switchTab = (tabId: string) => {
    if (tabId === activeTab) {
      // Tapping the current tab pops to root (standard iOS/Android behavior)
      setTabStacks(prev => ({ ...prev, [tabId]: [tabId as Screen] }));
      setCurrentScreen(tabId as Screen);
    } else {
      setActiveTab(tabId);
      const stack = tabStacks[tabId] || [tabId as Screen];
      setCurrentScreen(stack[stack.length - 1]);
    }
  };

  // Full navigation reset (for logout)
  const resetNavigation = (screen: Screen) => {
    setActiveTab(null);
    setScreenStack([screen]);
    setTabStacks({ ...DEFAULT_TAB_STACKS });
    setCurrentScreen(screen);
  };

  // Push a screen onto the navigation stack
  const go = (s: Screen) => {
    if (activeTab === null) {
      // Onboarding/pre-auth mode
      if (TAB_ROOTS.includes(s)) {
        // Entering the main tabbed app
        setActiveTab(s);
        setCurrentScreen(s);
      } else {
        setScreenStack(prev => [...prev, s]);
        setCurrentScreen(s);
      }
    } else {
      // Main app — push onto the active tab's stack
      setTabStacks(prev => ({
        ...prev,
        [activeTab]: [...(prev[activeTab] || [activeTab as Screen]), s],
      }));
      setCurrentScreen(s);
    }
  };

  // Pop the current screen from the navigation stack
  const back = () => {
    if (activeTab === null) {
      // Onboarding/pre-auth mode
      if (screenStack.length > 1) {
        const nextStack = [...screenStack];
        nextStack.pop();
        setScreenStack(nextStack);
        setCurrentScreen(nextStack[nextStack.length - 1]);
      }
    } else {
      // Main app — pop from the active tab's stack
      const currentStack = tabStacks[activeTab] || [activeTab as Screen];
      if (currentStack.length > 1) {
        const newStack = currentStack.slice(0, -1);
        setTabStacks(prev => ({
          ...prev,
          [activeTab]: newStack,
        }));
        setCurrentScreen(newStack[newStack.length - 1]);
      }
      // At tab root — do nothing (standard native behavior)
    }
  };

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Save onboarding state changes
  useEffect(() => {
    async function saveState() {
      try {
        const persistScreens = ['auth', 'setup1', 'setup2', 'setup3', 'plans', 'subscribe_flow'];
        if (persistScreens.includes(currentScreen)) {
          await storage.setItem('koikoi_onboarding_screen', currentScreen);
          await storage.setItem('koikoi_onboarding_user', JSON.stringify(user));
          await storage.setItem('koikoi_onboarding_subscribed', String(subscribed));
          await storage.setItem('koikoi_onboarding_address', selectedAddress);
          await storage.setItem('koikoi_onboarding_addresses_list', JSON.stringify(addressesList));
          await storage.setItem('koikoi_onboarding_setup3_subpage', String(setup3SubPage));
        } else if (currentScreen === 'home') {
          await storage.removeItem('koikoi_onboarding_screen');
          await storage.removeItem('koikoi_onboarding_setup3_subpage');
        }
      } catch (err) {
        console.warn('Failed to save onboarding state:', err);
      }
    }
    saveState();
  }, [currentScreen, user, subscribed, selectedAddress, addressesList, setup3SubPage]);

  const detectCurrentLocation = async (silent = false) => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        if (!silent) {
          setToast("Location permission denied. Please enable it in settings.");
        }
        return;
      }
      setLocationPermissionEnabled(true);
      
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      
      const response = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });

      if (response && response.length > 0) {
        const item = response[0];
        const formattedAddress = [
          item.name || item.street,
          item.district || item.subregion,
          item.city,
          item.region,
          item.postalCode,
          item.country
        ].filter(Boolean).join(', ');
        
        if (formattedAddress.trim()) {
          setSelectedAddress(formattedAddress);
          if (!silent) setToast("Location detected automatically!");
          return;
        }
      }
      
      setSelectedAddress("Bollaram Industrial Area, Hyderabad, Telangana, India");
      if (!silent) setToast("Location detected!");
    } catch (error) {
      console.warn("Location detection failed, using fallback:", error);
      setLocationPermissionEnabled(true);
      setSelectedAddress("Bollaram Industrial Area, Hyderabad, Telangana, India");
      if (!silent) setToast("Location detected!");
    }
  };

  const calorieCalc = useMemo(() => {
    const w = parseFloat(user.weight) || 70;
    const h = parseFloat(user.height) || 170;
    let target = Math.round(10 * w + 6.25 * h - 5 * 25 + 5);
    if (user.goal === 'Weight Loss') target -= 400;
    else if (user.goal === 'Muscle Gain') target += 350;
    
    // Calculate macro balance macros (e.g. protein 30%, carbs 45%, fat 25%)
    const protein = Math.round((target * 0.30) / 4);
    const carbs = Math.round((target * 0.45) / 4);
    const fat = Math.round((target * 0.25) / 9);
    const fiber = Math.round(target / 100 * 1.4); // 14g per 1000 kcal

    return { target, protein, carbs, fat, fiber };
  }, [user.weight, user.height, user.goal]);

  return (
    <AppContext.Provider
      value={{
        themeMode,
        setThemeMode,
        currentScreen,
        setCurrentScreen,
        screenStack,
        setScreenStack,
        go,
        back,
        activeTab,
        switchTab,
        resetNavigation,
        isDark,
        t,
        toast,
        setToast,
        user,
        setUser,
        subscribed,
        setSubscribed,
        newUserHomeMealTab,
        setNewUserHomeMealTab,
        paused,
        setPaused,
        selectedMealId,
        setSelectedMealId,
        mealsList,
        setMealsList,
        mobileNumber,
        setMobileNumber,
        otpCode,
        setOtpCode,
        otpSent,
        setOtpSent,
        otpCountdown,
        setOtpCountdown,
        selectedFilter,
        setSelectedFilter,
        selectedCategory,
        setSelectedCategory,
        selectedCam,
        setSelectedCam,
        showLocationPermission,
        setShowLocationPermission,
        showMapSelection,
        setShowMapSelection,
        selectedMapPinIdx,
        setSelectedMapPinIdx,
        selectedPlanId,
        setSelectedPlanId,
        showManageOptions,
        setShowManageOptions,
        checkoutMealPref,
        setCheckoutMealPref,
        checkoutFreq,
        setCheckoutFreq,
        checkoutCustomPrefs,
        setCheckoutCustomPrefs,
        checkoutStartDate,
        setCheckoutStartDate,
        tourDate,
        setTourDate,
        tourTimeSlot,
        setTourTimeSlot,
        tourVisitors,
        setTourVisitors,
        tourContactName,
        setTourContactName,
        tourContactPhone,
        setTourContactPhone,
        selectedAddress,
        setSelectedAddress,
        addressDetails,
        setAddressDetails,
        locationPermissionEnabled,
        setLocationPermissionEnabled,
        searchQuery,
        setSearchQuery,
        receiverDetailsName,
        setReceiverDetailsName,
        receiverDetailsPhone,
        setReceiverDetailsPhone,
        showPhotoPicker,
        setShowPhotoPicker,
        showSearchModal,
        setShowSearchModal,
        showLocationDialog,
        setShowLocationDialog,
        addressesList,
        setAddressesList,
        addressLabel,
        setAddressLabel,
        doorImageUri,
        setDoorImageUri,
        mapTranslateX,
        setMapTranslateX,
        mapTranslateY,
        setMapTranslateY,
        mapOffsetList,
        setMapOffsetList,
        isDraggingMap,
        setIsDraggingMap,
        showContactsModal,
        setShowContactsModal,
        deviceContacts,
        setDeviceContacts,
        contactsSearchQuery,
        setContactsSearchQuery,
        setup3SubPage,
        setSetup3SubPage,
        goalWeight,
        setGoalWeight,
        workoutFrequency,
        setWorkoutFrequency,
        workoutTypes,
        setWorkoutTypes,
        primaryGoal,
        setPrimaryGoal,
        goalSpeed,
        setGoalSpeed,
        motivation,
        setMotivation,
        allergiesList,
        setAllergiesList,
        healthConditions,
        setHealthConditions,
        foodDislikes,
        setFoodDislikes,
        waterIntakeGoal,
        setWaterIntakeGoal,
        customWaterIntake,
        setCustomWaterIntake,
        bedtime,
        setBedtime,
        wakeupTime,
        setWakeupTime,
        smartNotifications,
        setSmartNotifications,
        connectedHealthApps,
        setConnectedHealthApps,
        
        obFade,
        obSlideY,
        obScale,
        obIllusScale,
        obTitleSlideY,
        obTitleFade,
        obDescSlideY,
        obDescFade,
        obChipsFade,
        obBtnSlideY,
        obBtnFade,
        obFloatAnim,
        cardFloat1,
        cardFloat2,
        cardFloat3,
        splashFade,
        splashScale,
        splashTranslateY,
        authFade,
        authSlideY,
        
        detectCurrentLocation,
        getNumericPrice,
        panResponder,
        activeMealIndex,
        setActiveMealIndex,
        menuActiveTab,
        setMenuActiveTab,
        plateScale,
        plateRotate,
        plateFade,
        calorieCalc
      }}
    >
      <WalletProvider>
        <SubscriptionProvider>
          {children}
        </SubscriptionProvider>
      </WalletProvider>
    </AppContext.Provider>
  );
}
