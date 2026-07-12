import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  Dimensions,
  FlatList,
  Modal,
  Animated,
  useColorScheme,
  Platform,
  Share
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import {
  Home as HomeIcon,
  UtensilsCrossed,
  Package,
  Wallet,
  User,
  Bell,
  ChevronRight,
  ArrowLeft,
  Sun,
  Moon,
  Star,
  Pause,
  Play,
  SkipForward,
  Gift,
  Tag,
  CreditCard,
  Check,
  Eye,
  EyeOff,
  Phone,
  Mail,
  ShieldCheck,
  RefreshCw,
  Truck,
  MapPin,
  Plus,
  LogOut,
  Info,
  HelpCircle,
  Shield,
  Award,
  Heart,
  MessageCircle,
  PhoneCall,
  FileText,
  Edit,
  Copy,
  CheckCircle2,
  RotateCcw,
  Calendar,
  Zap,
  AlertCircle,
  Share2,
  ChevronDown,
  Building2,
  Bike,
  Sparkles,
  TrendingUp,
  Settings,
  Navigation,
  Leaf,
  Coffee,
  Flame,
  ChefHat,
  Camera,
  Video,
  Clock,
  Lock,
  Thermometer,
  BadgeCheck,
  Users,
  X
} from 'lucide-react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ─── Design Tokens ─────────────────────────────────────────────────────────

interface T {
  bg: string;
  surface: string;
  card: string;
  text: string;
  sub: string;
  muted: string;
  border: string;
  nav: string;
  input: string;
}

const LIGHT: T = {
  bg: '#FFF8F2',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  text: '#1B1B1B',
  sub: '#7A7A7A',
  muted: '#A8A099',
  border: '#F0E8E1',
  nav: 'rgba(255, 248, 242, 0.94)',
  input: '#FFFFFF',
};

const DARK: T = {
  bg: '#120E0B',
  surface: '#1E1814',
  card: '#1E1814',
  text: '#FCEFE5',
  sub: '#B2A296',
  muted: '#7A6D63',
  border: '#2E241E',
  nav: 'rgba(18, 14, 11, 0.94)',
  input: '#1E1814',
};

const B = {
  orange: '#E96A2E',
  orangeL: '#FFF4EC',
  orangeM: '#FFE6D3',
  green: '#3BA76A',
  greenL: '#EAF6EE',
  cream: '#FFF8F2',
  secondary: '#F4B36A',
  accent: '#FF8F4D',
};

type AppTheme = 'light' | 'dark' | 'system';
type Screen =
  | 'splash' | 'ob1' | 'ob2' | 'ob3' | 'auth'
  | 'setup1' | 'setup2' | 'setup3'
  | 'home' | 'meals' | 'kitchen' | 'profile'
  | 'meal_detail' | 'subscribe_flow'
  | 'notifications' | 'tracking' | 'offers' | 'rewards'
  | 'appearance' | 'support' | 'addresses' | 'payments'
  | 'personal' | 'refer' | 'plans' | 'health_info';

// ─── Food Images (Unsplash High-Quality) ───────────────────────────────────

const IMG = {
  dal: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=800&h=500&fit=crop&auto=format',
  paneer: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=500&fit=crop&auto=format',
  curry: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&h=500&fit=crop&auto=format',
  thali: 'https://images.unsplash.com/photo-1680993032090-1ef7ea9b51e5?w=800&h=500&fit=crop&auto=format',
  soup: 'https://images.unsplash.com/photo-1559561723-c3f4195835db?w=800&h=500&fit=crop&auto=format',
  rice: 'https://images.unsplash.com/photo-1743674453123-93356ade2891?w=800&h=500&fit=crop&auto=format',
  chicken: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&h=500&fit=crop&auto=format',
  fish: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&h=500&fit=crop&auto=format',
  idli: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&h=500&fit=crop&auto=format',
  salad: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=500&fit=crop&auto=format',
};

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  avatar: string;
  helpful: number;
}

interface MealIngredients {
  oil: string;
  rice?: string;
  veg: string[];
  spices: string[];
  dairy?: string[];
  flour?: string;
  dal?: string;
  meat?: string;
}

interface Meal {
  id: number;
  name: string;
  img: string;
  when: 'lunch' | 'dinner';
  type: 'veg' | 'non-veg' | 'egg';
  categories: string[];
  cal: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  serving: string;
  price: string;
  rating: number;
  reviewsCount: number;
  time: string;
  desc: string;
  chef: string;
  isHealthy: boolean;
  isAvailableToday: boolean;
  day: string;
  ingredients: MealIngredients;
  reviews: Review[];
}

const CATEGORIES = [
  'Lunch',
  'Dinner',
  'High Protein',
  'Healthy',
  'Kids',
  'Senior Meals',
  'Andhra',
  'North Indian',
  'South Indian',
  'Chef Specials'
];

const MEALS: Meal[] = [
  {
    id: 1,
    name: 'Dal Tadka + Steamed Rice',
    img: IMG.dal,
    when: 'lunch',
    type: 'veg',
    categories: ['Lunch', 'Healthy', 'North Indian', 'Senior Meals'],
    cal: 380,
    protein: 14,
    carbs: 58,
    fat: 9,
    fiber: 6,
    serving: '420g',
    price: '₹149',
    rating: 4.8,
    reviewsCount: 124,
    time: '12:30 PM',
    desc: 'Creamy yellow lentils tempered with cumin, garlic, pure cow ghee, and dry chillies, served with fluffy white basmati rice.',
    chef: 'Chef Amrita Sen',
    isHealthy: true,
    isAvailableToday: true,
    day: 'Today',
    ingredients: {
      oil: 'Cold Pressed Groundnut Oil',
      rice: 'Sona Masoori',
      veg: ['Fresh Local Onions', 'Vine Tomatoes', 'Green Chillies', 'Garlic', 'Ginger', 'Fresh Coriander'],
      spices: ['Everest Turmeric', 'MDH Chilli Powder', 'Coriander Powder', 'Tata Salt', 'Cumin Seeds', 'Mustard Seeds'],
      dairy: ['Nandini Cow Ghee'],
      dal: 'Unpolished Yellow Moong & Toor Dal'
    },
    reviews: [
      { id: 101, user: 'Priya K.', rating: 5, comment: 'Exactly like home! The dal was perfectly spiced, not heavy at all.', date: '2 days ago', verified: true, avatar: 'PK', helpful: 14 },
      { id: 102, user: 'Rohit M.', rating: 4, comment: 'Fresh and healthy. Delivery was spot on time.', date: '4 days ago', verified: true, avatar: 'RM', helpful: 9 },
      { id: 103, user: 'Suresh Rao', rating: 5, comment: 'Very soft and easy to digest. Great for seniors.', date: '1 week ago', verified: true, avatar: 'SR', helpful: 21 }
    ]
  },
  {
    id: 2,
    name: 'Paneer Butter Masala + Roti',
    img: IMG.paneer,
    when: 'dinner',
    type: 'veg',
    categories: ['Dinner', 'Chef Specials', 'North Indian'],
    cal: 420,
    protein: 18,
    carbs: 45,
    fat: 16,
    fiber: 5,
    serving: '400g',
    price: '₹189',
    rating: 4.9,
    reviewsCount: 148,
    time: '7:30 PM',
    desc: 'Fresh soft cottage cheese cubes cooked in a rich, sweet-tangy tomato-butter gravy, finished with 2 handmade soft whole-wheat rotis.',
    chef: 'Chef Sanjay Kapoor',
    isHealthy: true,
    isAvailableToday: true,
    day: 'Today',
    ingredients: {
      oil: 'Cold Pressed Sunflower Oil',
      veg: ['Ripe Tomatoes', 'Cashew Nuts', 'Kasuri Methi', 'Green Cardamom', 'Onion Paste'],
      spices: ['MDH Garam Masala', 'Kashmiri Lal Mirch', 'Aachi Turmeric', 'Salt'],
      dairy: ['Milky Mist Paneer', 'Amul Butter', 'Amul Fresh Cream'],
      flour: 'Aashirvaad Fortified Wheat Flour'
    },
    reviews: [
      { id: 201, user: 'Bhargav S.', rating: 5, comment: 'Cottage cheese is super soft! Highly recommended.', date: 'Today', verified: true, avatar: 'BS', helpful: 18 },
      { id: 202, user: 'Neha Sharma', rating: 5, comment: 'Very premium taste. Not oily or greasy like restaurants.', date: '3 days ago', verified: true, avatar: 'NS', helpful: 7 }
    ]
  },
  {
    id: 3,
    name: 'Andhra Chicken Curry + Bagara Rice',
    img: IMG.chicken,
    when: 'lunch',
    type: 'non-veg',
    categories: ['Lunch', 'Andhra', 'High Protein', 'Chef Specials'],
    cal: 560,
    protein: 34,
    carbs: 65,
    fat: 14,
    fiber: 4,
    serving: '450g',
    price: '₹229',
    rating: 4.7,
    reviewsCount: 92,
    time: '12:30 PM',
    desc: 'Fiery, robust Andhra-style chicken curry cooked with roasted spices, Guntur red chillies, and fresh coconut, served alongside fragrant Bagara rice.',
    chef: 'Chef Venkatesh Gowda',
    isHealthy: false,
    isAvailableToday: true,
    day: 'Tomorrow',
    ingredients: {
      oil: 'Freedom Refined Sunflower Oil',
      rice: 'Premium Basmati Rice',
      veg: ['Local Red Onions', 'Vine Tomatoes', 'Mint Leaves', 'Coriander', 'Green Chillies'],
      spices: ['Aachi Andhra Chicken Masala', 'Guntur Red Chilli Powder', 'Eastern Turmeric', 'Tata Salt'],
      dairy: ['Heritage Thick Curd'],
      meat: 'Fresh Halal Chicken'
    },
    reviews: [
      { id: 301, user: 'Kiran Dev', rating: 5, comment: 'Perfect Guntur spice kick! The rice matches the chicken beautifully.', date: 'Yesterday', verified: true, avatar: 'KD', helpful: 32 },
      { id: 302, user: 'Anil Kumar', rating: 4, comment: 'Extremely flavorful. Proper South Indian experience.', date: '5 days ago', verified: true, avatar: 'AK', helpful: 11 }
    ]
  },
  {
    id: 4,
    name: 'Kerala Avial + Red Rice',
    img: IMG.salad,
    when: 'lunch',
    type: 'veg',
    categories: ['Lunch', 'South Indian', 'Healthy', 'Senior Meals'],
    cal: 320,
    protein: 9,
    carbs: 52,
    fat: 8,
    fiber: 9,
    serving: '380g',
    price: '₹159',
    rating: 4.6,
    reviewsCount: 54,
    time: '12:30 PM',
    desc: 'A nutrient-dense traditional mix of drumstick, raw banana, carrot, and pumpkin simmered in a light coconut-yogurt paste.',
    chef: 'Chef Amrita Sen',
    isHealthy: true,
    isAvailableToday: true,
    day: 'Tomorrow',
    ingredients: {
      oil: 'Cold Pressed Coconut Oil',
      rice: 'Kerala Basmati Rice',
      veg: ['Elephant Yam', 'Drumstick', 'Carrots', 'Raw Banana', 'Pumpkin', 'Curry Leaves'],
      spices: ['Freshly Ground Cumin', 'Green Chillies', 'Turmeric Powder', 'Salt'],
      dairy: ['Milky Mist Curd']
    },
    reviews: [
      { id: 401, user: 'Suresh P.', rating: 5, comment: 'Very authentic. The red rice is very nutritious.', date: '4 days ago', verified: true, avatar: 'SP', helpful: 5 }
    ]
  },
  {
    id: 5,
    name: 'Double Egg Masala + Jeera Rice',
    img: IMG.curry,
    when: 'dinner',
    type: 'egg',
    categories: ['Dinner', 'High Protein', 'North Indian', 'Andhra'],
    cal: 440,
    protein: 22,
    carbs: 55,
    fat: 12,
    fiber: 4,
    serving: '420g',
    price: '₹169',
    rating: 4.5,
    reviewsCount: 88,
    time: '7:30 PM',
    desc: 'Two organic farm eggs boiled and gently sautéed in a spiced onion-tomato pan gravy with roasted cumin seeds and fresh cilantro.',
    chef: 'Chef Sanjay Kapoor',
    isHealthy: true,
    isAvailableToday: true,
    day: 'Tomorrow',
    ingredients: {
      oil: 'Fortune Rice Bran Oil',
      rice: 'Sona Masoori',
      veg: ['Onions', 'Tomatoes', 'Capsicum', 'Ginger-Garlic Paste', 'Coriander'],
      spices: ['Everest Garam Masala', 'MDH Kasuri Methi', 'Turmeric Powder', 'Chilli Powder', 'Cumin Seeds']
    },
    reviews: [
      { id: 501, user: 'Vikas J.', rating: 4, comment: 'Superb high protein meal after my gym session.', date: '1 week ago', verified: true, avatar: 'VJ', helpful: 10 }
    ]
  }
];

const PLANS = [
  { id: 'daily', name: 'Daily', badge: '', price: '₹180', unit: '/day', sub: 'Pay as you go · No commitment', color: '#4A4A4A', perks: ['1 meal slot', 'Any cuisine', 'Cancel anytime'] },
  { id: 'weekly', name: 'Weekly', badge: 'POPULAR', price: '₹1,099', unit: '/week', sub: '₹157/day · Save 13%', color: B.orange, perks: ['Lunch + Dinner', '14 meals', '1 skip per week'] },
  { id: 'monthly', name: 'Monthly', badge: 'BEST VALUE', price: '₹3,999', unit: '/month', sub: '₹133/day · Save 26%', color: '#6366F1', perks: ['Lunch + Dinner', '60 meals', 'Pause anytime', 'Priority support'] },
  { id: 'family', name: 'Family', badge: '', price: '₹6,999', unit: '/month', sub: 'For 2 people · ₹3,500/person', color: '#EC4899', perks: ['2 dabba sets', 'All meals included', 'Custom preferences'] },
  { id: 'student', name: 'Student', badge: '', price: '₹2,499', unit: '/month', sub: 'Valid student ID required', color: '#0EA5E9', perks: ['Lunch only', '25 meals', 'Student pricing'] },
  { id: 'corporate', name: 'Corporate', badge: '', price: '₹8,999', unit: '/month', sub: 'For 5+ employees', color: '#8B5CF6', perks: ['Bulk pricing', 'Office delivery', 'Invoice & GST'] },
];

// ─── UI Helpers ─────────────────────────────────────────────────────────────

function PulsingDot({ color, size = 8 }: { color: string; size?: number }) {
  const pulseAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 0.4, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        opacity: pulseAnim,
      }}
    />
  );
}

function VegPill({ veg }: { veg: boolean }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: veg ? '#E8F5E9' : '#FFEBEE',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: veg ? '#A5D6A7' : '#FFCDD2',
      }}
    >
      <View
        style={{
          width: 7,
          height: 7,
          borderRadius: 3.5,
          backgroundColor: veg ? '#2E7D32' : '#C62828',
          marginRight: 4,
        }}
      />
      <Text
        style={{
          fontSize: 8,
          fontWeight: '900',
          color: veg ? '#2E7D32' : '#C62828',
        }}
      >
        {veg ? 'VEG' : 'NON-VEG'}
      </Text>
    </View>
  );
}

function ProgressRing({ pct, size = 64, strokeW = 4, color = B.orange, label, sub, theme }: { pct: number; size?: number; strokeW?: number; color?: string; label: string; sub?: string; theme: T }) {
  const r = (size - strokeW * 2) / 2;
  const circ = 2 * Math.PI * r;
  const strokeDashoffset = circ - (pct / 100) * circ;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={{ position: 'absolute', transform: [{ rotate: '-90deg' }] }}>
        {/* Background Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={theme.border}
          strokeWidth={strokeW}
          fill="transparent"
        />
        {/* Progress Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={strokeW}
          strokeDasharray={`${circ} ${circ}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
        />
      </Svg>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: size * 0.22, fontWeight: '900', color: color, lineHeight: size * 0.26 }}>{label}</Text>
        {sub && <Text style={{ fontSize: size * 0.12, color: theme.muted, marginTop: 1 }}>{sub}</Text>}
      </View>
    </View>
  );
}

// ─── Main Application Component ─────────────────────────────────────────────

export default function App() {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<AppTheme>('system');
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [screenStack, setScreenStack] = useState<Screen[]>(['splash']);
  const [toast, setToast] = useState<string | null>(null);

  // App State
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: '👩‍🍳',
    foodPref: 'Veg',
    height: '',
    weight: '',
    goal: 'Healthy Living',
    address: '',
    addressLabel: 'Home'
  });
  const [subscribed, setSubscribed] = useState(true);
  const [paused, setPaused] = useState(false);
  const [selectedMealId, setSelectedMealId] = useState<number>(1);
  const [mealsList, setMealsList] = useState<Meal[]>(MEALS);

  // Auth/Login State
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(30);

  // Lifted UI State (to keep nested render functions completely stateless & hook-free)
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedCam, setSelectedCam] = useState(1);

  const calorieCalc = useMemo(() => {
    const w = parseFloat(user.weight) || 70;
    const h = parseFloat(user.height) || 170;
    let target = Math.round(10 * w + 6.25 * h - 5 * 25 + 5); // Mock Mifflin-St Jeor
    if (user.goal === 'Weight Loss') target -= 400;
    else if (user.goal === 'Muscle Gain') target += 350;
    return target;
  }, [user.weight, user.height, user.goal]);

  // Active theme calculation
  const isDark = useMemo(() => {
    if (themeMode === 'system') return systemColorScheme === 'dark';
    return themeMode === 'dark';
  }, [themeMode, systemColorScheme]);

  const t = isDark ? DARK : LIGHT;

  // Custom Navigation
  const go = (s: Screen) => {
    setScreenStack(prev => [...prev, s]);
    setCurrentScreen(s);
  };

  const back = () => {
    if (screenStack.length > 1) {
      const nextStack = [...screenStack];
      nextStack.pop();
      setScreenStack(nextStack);
      setCurrentScreen(nextStack[nextStack.length - 1]);
    }
  };

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Countdown timer for OTP
  useEffect(() => {
    if (otpSent && otpCountdown > 0) {
      const interval = setInterval(() => setOtpCountdown(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [otpSent, otpCountdown]);

  // Animation Values for Splash, Onboarding & Auth
  const splashFade = useRef(new Animated.Value(0)).current;
  const splashScale = useRef(new Animated.Value(0.6)).current;
  const splashTranslateY = useRef(new Animated.Value(30)).current;

  const obFade = useRef(new Animated.Value(0)).current;
  const obSlideY = useRef(new Animated.Value(40)).current;
  const obScale = useRef(new Animated.Value(0.8)).current;

  // Individual onboarding element animations
  const obIllusScale = useRef(new Animated.Value(0.5)).current;
  const obTitleSlideY = useRef(new Animated.Value(20)).current;
  const obTitleFade = useRef(new Animated.Value(0)).current;
  const obDescSlideY = useRef(new Animated.Value(20)).current;
  const obDescFade = useRef(new Animated.Value(0)).current;
  const obChipsFade = useRef(new Animated.Value(0)).current;
  const obBtnSlideY = useRef(new Animated.Value(20)).current;
  const obBtnFade = useRef(new Animated.Value(0)).current;
  const obFloatAnim = useRef(new Animated.Value(0)).current;

  const authFade = useRef(new Animated.Value(0)).current;
  const authSlideY = useRef(new Animated.Value(45)).current;

  // Splash Screen auto-transition & Animations
  useEffect(() => {
    if (currentScreen === 'splash') {
      splashFade.setValue(0);
      splashScale.setValue(0.6);
      splashTranslateY.setValue(30);

      Animated.parallel([
        Animated.timing(splashFade, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.spring(splashScale, {
          toValue: 1,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(splashTranslateY, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => go('ob1'), 2500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  // Onboarding Screen Animations on step/screen transition
  useEffect(() => {
    if (currentScreen === 'ob1' || currentScreen === 'ob2' || currentScreen === 'ob3') {
      obFade.setValue(0);
      obSlideY.setValue(40);
      obScale.setValue(0.8);

      obIllusScale.setValue(0.5);
      obTitleSlideY.setValue(20);
      obTitleFade.setValue(0);
      obDescSlideY.setValue(20);
      obDescFade.setValue(0);
      obChipsFade.setValue(0);
      obBtnSlideY.setValue(20);
      obBtnFade.setValue(0);
      obFloatAnim.setValue(0);

      Animated.parallel([
        Animated.timing(obFade, {
          toValue: 1,
          duration: 450,
          useNativeDriver: true,
        }),
        Animated.spring(obSlideY, {
          toValue: 0,
          friction: 7,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.spring(obScale, {
          toValue: 1,
          friction: 7,
          tension: 40,
          useNativeDriver: true,
        }),

        Animated.sequence([
          Animated.delay(100),
          Animated.spring(obIllusScale, {
            toValue: 1,
            friction: 5,
            tension: 45,
            useNativeDriver: true,
          }),
        ]),

        Animated.sequence([
          Animated.delay(200),
          Animated.parallel([
            Animated.timing(obTitleFade, { toValue: 1, duration: 300, useNativeDriver: true }),
            Animated.timing(obTitleSlideY, { toValue: 0, duration: 300, useNativeDriver: true }),
          ]),
        ]),

        Animated.sequence([
          Animated.delay(300),
          Animated.parallel([
            Animated.timing(obDescFade, { toValue: 1, duration: 300, useNativeDriver: true }),
            Animated.timing(obDescSlideY, { toValue: 0, duration: 300, useNativeDriver: true }),
          ]),
        ]),

        Animated.sequence([
          Animated.delay(400),
          Animated.timing(obChipsFade, { toValue: 1, duration: 350, useNativeDriver: true }),
        ]),

        Animated.sequence([
          Animated.delay(500),
          Animated.parallel([
            Animated.timing(obBtnFade, { toValue: 1, duration: 300, useNativeDriver: true }),
            Animated.timing(obBtnSlideY, { toValue: 0, duration: 300, useNativeDriver: true }),
          ]),
        ]),
      ]).start();

      // Trigger continuous float animation loop
      Animated.loop(
        Animated.sequence([
          Animated.timing(obFloatAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(obFloatAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Autoplay timer: auto-advance every 4.5 seconds
      let nextScreen: Screen = 'ob1';
      if (currentScreen === 'ob1') nextScreen = 'ob2';
      else if (currentScreen === 'ob2') nextScreen = 'ob3';
      else nextScreen = 'ob1';

      const timer = setTimeout(() => {
        go(nextScreen);
      }, 4500);

      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  // Auth Screen Animations
  useEffect(() => {
    if (currentScreen === 'auth') {
      authFade.setValue(0);
      authSlideY.setValue(45);

      Animated.parallel([
        Animated.timing(authFade, {
          toValue: 1,
          duration: 650,
          useNativeDriver: true,
        }),
        Animated.spring(authSlideY, {
          toValue: 0,
          friction: 7,
          tension: 35,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [currentScreen, otpSent]);

  // Bottom Tab Navigation Component
  function BottomTabNav({ active }: { active: string }) {
    const tabs = [
      { id: 'home', s: 'home' as Screen, I: HomeIcon, label: 'Home' },
      { id: 'meals', s: 'meals' as Screen, I: UtensilsCrossed, label: 'Meals' },
      { id: 'plans', s: 'plans' as Screen, I: Calendar, label: 'Plans' },
      { id: 'kitchen', s: 'kitchen' as Screen, I: ChefHat, label: 'Kitchen' },
      { id: 'profile', s: 'profile' as Screen, I: User, label: 'Profile' },
    ];

    return (
      <View style={[styles.bottomTabContainer, { backgroundColor: t.nav, borderTopColor: t.border }]}>
        {tabs.map(tab => {
          const isActive = active === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tabBtn, isActive && { backgroundColor: B.orangeL }]}
              onPress={() => go(tab.s)}
            >
              <tab.I size={18} color={isActive ? B.orange : t.muted} />
              <Text style={[styles.tabLabel, { color: isActive ? B.orange : t.muted }]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  // ─── SCREENS ───

  // ─── CUSTOM SVG ILLUSTRATIONS ───
  function SplashLogoSvg() {
    return (
      <Svg width={90} height={90} viewBox="0 0 100 100">
        {/* Cute Handle */}
        <Path
          d="M35 30 C35 15, 65 15, 65 30"
          fill="none"
          stroke="#E96A2E"
          strokeWidth={6}
          strokeLinecap="round"
        />
        {/* Main Dabba / Lunchbox body */}
        <Rect x={25} y={30} width={50} height={48} rx={14} fill="#E96A2E" />
        {/* Accent clasp */}
        <Path
          d="M25 45 L75 45"
          stroke="#FFF8F2"
          strokeWidth={3}
        />
        {/* Heart logo in center */}
        <Path
          d="M50 63 C50 63, 40 55, 40 48.5 C40 43.5, 44 41, 47.5 41 C49.5 41, 50 43, 50 43 C50 43, 50.5 41, 52.5 41 C56 41, 60 43.5, 60 48.5 C60 55, 50 63, 50 63 Z"
          fill="#FFF8F2"
        />
      </Svg>
    );
  }

  function BoyIllustrationSvg() {
    return (
      <Svg width={120} height={120} viewBox="0 0 100 100">
        <Circle cx={50} cy={35} r={14} fill="#E5C298" />
        <Path d="M36 32 C36 20, 64 20, 64 32 C64 32, 50 24, 36 32 Z" fill="#4A3728" />
        <Path d="M47 40 Q50 43 53 40" fill="none" stroke="#4A3728" strokeWidth={2} strokeLinecap="round" />
        <Circle cx={45} cy={34} r={2} fill="#4A3728" />
        <Circle cx={55} cy={34} r={2} fill="#4A3728" />
        <Path d="M35 55 L65 55 L60 85 L40 85 Z" fill="#E67E22" />
        <Path d="M35 55 L22 60 L18 68" fill="none" stroke="#E5C298" strokeWidth={5} strokeLinecap="round" />
        <Rect x={10} y={66} width={14} height={12} rx={2} fill="#BDC3C7" />
        <Path d="M12 66 L12 60 L22 60" fill="none" stroke="#7F8C8D" strokeWidth={2} />
        <Path d="M14 55 Q16 57 14 59" fill="none" stroke="#BDC3C7" strokeWidth={1} />
        <Path d="M65 55 L78 60 L82 70" fill="none" stroke="#E5C298" strokeWidth={5} strokeLinecap="round" />
        <Rect x={76} y={70} width={12} height={15} rx={2} fill="#D35400" />
        <Path d="M78 70 L78 65 L86 65 L86 70" fill="none" stroke="#A04000" strokeWidth={2} />
        <Rect x={42} y={85} width={6} height={12} rx={2} fill="#2C3E50" />
        <Rect x={52} y={85} width={6} height={12} rx={2} fill="#2C3E50" />
      </Svg>
    );
  }

  function DabbasIllustrationSvg() {
    return (
      <Svg width={120} height={120} viewBox="0 0 100 100">
        <Rect x={28} y={62} width={44} height={16} rx={3} fill="#95A5A6" />
        <Rect x={28} y={62} width={44} height={3} fill="#BDC3C7" />
        
        <Rect x={30} y={47} width={40} height={14} rx={3} fill="#BDC3C7" />
        <Rect x={30} y={47} width={40} height={3} fill="#ECF0F1" />
        
        <Rect x={32} y={32} width={36} height={14} rx={3} fill="#95A5A6" />
        <Rect x={32} y={32} width={36} height={3} fill="#BDC3C7" />
        
        <Path
          d="M50 20 L50 26 M30 32 L30 76 M70 32 L70 76 M30 76 L70 76"
          fill="none"
          stroke="#7F8C8D"
          strokeWidth={3}
          strokeLinecap="round"
        />
        <Path
          d="M42 32 C42 27, 58 27, 58 32"
          fill="none"
          stroke="#7F8C8D"
          strokeWidth={3.5}
          strokeLinecap="round"
        />
        <Circle cx={42} cy={22} r={2} fill="#E67E22" />
        <Circle cx={50} cy={20} r={2} fill="#2ECC71" />
        <Circle cx={58} cy={22} r={2} fill="#F1C40F" />
      </Svg>
    );
  }

  function FamilyIllustrationSvg() {
    return (
      <Svg width={120} height={120} viewBox="0 0 100 100">
        <Circle cx={34} cy={38} r={9} fill="#E5C298" />
        <Path d="M26 34 C26 28, 42 28, 42 34 Z" fill="#1A1A1A" />
        <Circle cx={31} cy={37} r={1} fill="#1A1A1A" />
        <Circle cx={37} cy={37} r={1} fill="#1A1A1A" />
        <Path d="M32 42 Q34 44 36 42" fill="none" stroke="#1A1A1A" strokeWidth={1} />
        <Path d="M22 55 C22 47, 46 47, 46 55 Z" fill="#2980B9" />

        <Circle cx={66} cy={38} r={9} fill="#E5C298" />
        <Path d="M58 34 C58 24, 74 24, 74 34 Z" fill="#4A3728" />
        <Path d="M57 36 L57 46 M75 36 L75 46" fill="none" stroke="#4A3728" strokeWidth={3} strokeLinecap="round" />
        <Circle cx={63} cy={37} r={1} fill="#1A1A1A" />
        <Circle cx={69} cy={37} r={1} fill="#1A1A1A" />
        <Path d="M64 42 Q66 44 68 42" fill="none" stroke="#1A1A1A" strokeWidth={1} />
        <Path d="M54 55 C54 47, 78 47, 78 55 Z" fill="#E91E63" />

        <Circle cx={50} cy={44} r={7} fill="#E5C298" />
        <Path d="M44 41 C44 35, 56 35, 56 41 Z" fill="#D35400" />
        <Circle cx={48} cy={43} r={1} fill="#1A1A1A" />
        <Circle cx={52} cy={43} r={1} fill="#1A1A1A" />
        <Path d="M49 47 Q50 48 51 47" fill="none" stroke="#1A1A1A" strokeWidth={1} />
        <Path d="M40 58 C40 52, 60 52, 60 58 Z" fill="#2ECC71" />

        <Rect x={15} y={55} width={70} height={5} rx={2.5} fill="#D35400" />
        <Rect x={22} y={60} width={5} height={12} fill="#A04000" />
        <Rect x={73} y={60} width={5} height={12} fill="#A04000" />
      </Svg>
    );
  }

  // 1. Splash Screen
  function RenderSplash() {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: 'transparent' }]}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 }}>
          <Animated.View style={{ 
            alignItems: 'center', 
            opacity: splashFade,
            transform: [
              { scale: splashScale },
              { translateY: splashTranslateY }
            ]
          }}>
            <SplashLogoSvg />
            <Text style={{ fontSize: 38, fontWeight: '900', color: t.text, marginTop: 16, letterSpacing: -0.5 }}>
              KOI KOI <Text style={{ color: B.orange }}>DABBA</Text>
            </Text>
            <Text style={{ fontSize: 14, color: B.orange, fontStyle: 'italic', marginTop: 6, fontWeight: '600' }}>
              Home-cooked meals, made with love.
            </Text>
          </Animated.View>
        </View>
      </SafeAreaView>
    );
  }


  // 2. Onboarding Screen Shell
  function RenderOnboarding({ step }: { step: number }) {
    let title = '';
    let desc = '';
    let btnText = '';
    let SvgIllustration = BoyIllustrationSvg;
    let chips: string[] = [];
    let topHeader = '';
    let sender = '';
    let message = '';

    if (step === 1) {
      topHeader = "Mom's Cooking Is Calling!";
      title = "Healthy Home-Style Meals";
      desc = "Cooked fresh daily and delivered warm. Low salt, low oil, pure home comfort.";
      btnText = "Get Started";
      SvgIllustration = BoyIllustrationSvg;
      chips = ["🍲 Daily Rotation", "👩‍🍳 Homestyle Recipes", "🧂 Low Salt & Oil"];
      sender = "Mom 👩‍🍳";
      message = "Beta, I packed your favorite Dabba today! Cooked with fresh ingredients and very little oil. Enjoy it warm! ❤️";
    } else if (step === 2) {
      topHeader = "Hygienic & Safe!";
      title = "Steel Dabbas, Zero Plastic";
      desc = "Reusable food-grade steel containers, thermally washed and sealed with love.";
      btnText = "Continue";
      SvgIllustration = DabbasIllustrationSvg;
      chips = ["🩺 Food-Grade Steel", "♻️ Eco-Friendly", "🧼 Thermal Sanitized"];
      sender = "Wellness Coach 🩺";
      message = "Your food is packed in sanitized stainless steel dabbas. Zero plastic contact, zero toxins. Good for you & the earth! 🌿";
    } else {
      topHeader = "Flexible & Stress-Free!";
      title = "Subscribe Once. Eat Every Day.";
      desc = "Set your schedule. Pause, skip, or resume with a single tap whenever you travel.";
      btnText = "Let's Begin";
      SvgIllustration = FamilyIllustrationSvg;
      chips = ["⏸️ Pause / Skip Anytime", "📅 Custom Portions", "🚫 No Lock-ins"];
      sender = "Office Bestie 💼";
      message = "Oh, you don't need to order lunch everyday? So jealous of your auto-pilot Koi Koi subscription! ⏸️";
    }

    const handleNext = () => {
      if (step === 1) go('ob2');
      else if (step === 2) go('ob3');
      else go('home'); // Go directly to home - no login friction
    };

    const floatY = obFloatAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -12]
    });

    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: t.bg }]}>
        <View style={{ flex: 1, paddingHorizontal: 24, justifyContent: 'space-between', paddingVertical: 20 }}>
          
          {/* Top Title Layer */}
          <View style={{ alignItems: 'center', marginTop: 10 }}>
            <Animated.Text style={{ 
              fontSize: 28, 
              fontWeight: '900', 
              color: B.orange, 
              textAlign: 'center', 
              lineHeight: 34,
              opacity: obTitleFade,
              transform: [{ translateY: obTitleSlideY }]
            }}>
              {topHeader}
            </Animated.Text>
          </View>

          <Animated.View style={{ 
            flex: 1, 
            justifyContent: 'center', 
            alignItems: 'center', 
            opacity: obFade,
            transform: [
              { translateY: obSlideY },
              { scale: obScale }
            ]
          }}>
            {/* 3D Overlapping Phone Mockup + Food Illustration Frame */}
            <View style={{ 
              width: 270, 
              height: 200, 
              borderRadius: 30, 
              borderWidth: 2, 
              borderColor: t.border, 
              padding: 14, 
              backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
              position: 'relative',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginBottom: 60, // Space for the sticking-out illustration
            }}>
              {/* Message Push Notification Bubble */}
              <View style={{
                width: '100%',
                backgroundColor: t.card,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: t.border,
                padding: 12,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
              }}>
                {/* Header: App Info */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <View style={{ width: 18, height: 18, borderRadius: 5, backgroundColor: B.orange, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: 9, color: '#FFF' }}>💬</Text>
                    </View>
                    <Text style={{ fontSize: 10, fontWeight: '900', color: t.sub, letterSpacing: 0.5 }}>MESSAGES</Text>
                  </View>
                  <Text style={{ fontSize: 9, color: t.sub }}>now</Text>
                </View>

                {/* Sender & Body text */}
                <Text style={{ fontSize: 12, fontWeight: '900', color: t.text, marginBottom: 2 }}>{sender}</Text>
                <Text style={{ fontSize: 10, color: t.sub, lineHeight: 14 }}>{message}</Text>
              </View>

              {/* Overlapping Floating Illustration */}
              <Animated.View style={{ 
                position: 'absolute',
                bottom: -45, 
                width: 120, 
                height: 120, 
                borderRadius: 60, 
                backgroundColor: step === 1 ? '#FFEEDB' : step === 2 ? '#E8F5E9' : '#FFF9C4', 
                borderWidth: 2, 
                borderColor: step === 1 ? '#FFD0A1' : step === 2 ? '#A5D6A7' : '#FFF59D', 
                justifyContent: 'center', 
                alignItems: 'center', 
                shadowColor: '#000', 
                shadowOffset: { width: 0, height: 8 }, 
                shadowOpacity: 0.1, 
                shadowRadius: 10, 
                elevation: 5,
                transform: [
                  { scale: obIllusScale },
                  { translateY: floatY }
                ]
              }}>
                <SvgIllustration />
              </Animated.View>
            </View>

            {/* Tagline details */}
            <View style={{ alignItems: 'center', paddingHorizontal: 10, gap: 4 }}>
              <Animated.Text style={{ 
                fontSize: 18, 
                fontWeight: '800', 
                color: t.text, 
                textAlign: 'center', 
                lineHeight: 24,
                opacity: obTitleFade,
                transform: [{ translateY: obTitleSlideY }]
              }}>
                {title}
              </Animated.Text>
              
              <Animated.Text style={{ 
                fontSize: 12, 
                color: t.sub, 
                textAlign: 'center', 
                lineHeight: 16,
                opacity: obDescFade,
                transform: [{ translateY: obDescSlideY }]
              }}>
                {desc}
              </Animated.Text>
            </View>
          </Animated.View>

          {/* Constant Bottom Layer (Indicator dots & Buttons) */}
          <View style={{ gap: 12, marginTop: 16 }}>
            {/* Indicator Dots */}
            <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'center', marginVertical: 4 }}>
              {[1, 2, 3].map(i => {
                const isActive = i === step;
                return (
                  <View
                    key={i}
                    style={{
                      width: isActive ? 24 : 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: isActive ? B.orange : t.border
                    }}
                  />
                );
              })}
            </View>

            {/* Primary Action Button */}
            <TouchableOpacity style={styles.authBtn} onPress={handleNext}>
              <LinearGradient colors={[B.orange, B.secondary]} style={styles.obBtnGradient}>
                <Text style={styles.obBtnText}>{btnText}</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Secondary Option: Skip & Browse */}
            <TouchableOpacity onPress={() => go('home')} style={{ paddingVertical: 4 }}>
              <Text style={{ fontSize: 13, fontWeight: '700', color: B.orange, textAlign: 'center', textDecorationLine: 'underline' }}>Just Browse</Text>
            </TouchableOpacity>
          </View>

        </View>
      </SafeAreaView>
    );
  }

  // 3. Auth/Login Screen
  function RenderAuth() {
    const handleSendOtp = () => {
      if (mobileNumber.length === 10) {
        setOtpSent(true);
        setOtpCountdown(30);
      } else {
        setToast('Enter a valid 10-digit mobile number');
      }
    };

    const handleVerifyOtp = () => {
      if (otpCode === '123456' || otpCode.length === 6) {
        setToast('Verification Successful!');
        go('setup1');
      } else {
        setToast('Incorrect OTP. Try 123456');
      }
    };

    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: 'transparent' }]}>
        <View style={{ flex: 1, paddingHorizontal: 24, justifyContent: 'center' }}>
          <Animated.View style={{ 
            backgroundColor: t.card, 
            borderRadius: 28, 
            borderWidth: 1, 
            borderColor: t.border, 
            padding: 24, 
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 12 }, 
            shadowOpacity: 0.04, 
            shadowRadius: 20, 
            elevation: 4,
            opacity: authFade,
            transform: [
              { translateY: authSlideY }
            ]
          }}>
            {!otpSent ? (
              <View>
                <Text style={{ fontSize: 24, fontWeight: '900', color: t.text, lineHeight: 30 }}>Welcome to{'\n'}Koi Koi Dabba</Text>
                <Text style={{ fontSize: 13, color: t.sub, marginTop: 8, lineHeight: 18 }}>Enter your phone number to proceed with verification</Text>

                <View style={{ flexDirection: 'row', height: 56, borderRadius: 18, borderWidth: 1, borderColor: t.border, backgroundColor: t.input, alignItems: 'center', paddingHorizontal: 16, marginTop: 24 }}>
                  <Text style={{ fontSize: 15, fontWeight: 'bold', color: t.text, marginRight: 10 }}>+91</Text>
                  <TextInput
                    style={{ flex: 1, fontSize: 15, fontWeight: 'bold', color: t.text, height: '100%' }}
                    placeholder="Mobile Number"
                    placeholderTextColor={t.muted}
                    keyboardType="numeric"
                    maxLength={10}
                    value={mobileNumber}
                    onChangeText={setMobileNumber}
                  />
                </View>

                <TouchableOpacity style={[styles.authBtn, { marginTop: 20 }]} onPress={handleSendOtp}>
                  <LinearGradient colors={[B.orange, B.secondary]} style={styles.obBtnGradient}>
                    <Text style={styles.obBtnText}>Send OTP Code</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <Text style={{ textAlign: 'center', fontSize: 10, fontWeight: '900', color: t.muted, marginVertical: 20, letterSpacing: 1.5 }}>OR CONTINUE WITH</Text>

                <View style={{ flexDirection: 'row', gap: 12 }}>
                  <TouchableOpacity style={{ flex: 1, height: 48, borderRadius: 14, borderWidth: 1, borderColor: t.border, backgroundColor: t.card, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 14, color: t.text, fontWeight: 'bold' }}>Google</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ flex: 1, height: 48, borderRadius: 14, borderWidth: 1, borderColor: t.border, backgroundColor: t.card, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 14, color: t.text, fontWeight: 'bold' }}>Apple</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View>
                <TouchableOpacity onPress={() => setOtpSent(false)} style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 16 }}>
                  <ArrowLeft size={16} color={t.text} />
                  <Text style={{ fontSize: 13, color: t.sub, fontWeight: '600' }}>Change Number</Text>
                </TouchableOpacity>

                <Text style={{ fontSize: 24, fontWeight: '900', color: t.text }}>OTP Verification</Text>
                <Text style={{ fontSize: 13, color: t.sub, marginTop: 8 }}>
                  We sent a 6-digit code to <Text style={{ color: B.orange, fontWeight: 'bold' }}>+91 {mobileNumber}</Text>
                </Text>

                <TextInput
                  style={{ height: 56, borderRadius: 18, borderWidth: 1, borderColor: t.border, backgroundColor: t.input, fontSize: 18, fontWeight: 'bold', color: t.text, textAlign: 'center', marginTop: 24, letterSpacing: 4 }}
                  placeholder="6-Digit Code"
                  placeholderTextColor={t.muted}
                  keyboardType="numeric"
                  maxLength={6}
                  value={otpCode}
                  onChangeText={setOtpCode}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                  {otpCountdown > 0 ? (
                    <Text style={{ fontSize: 11, color: t.sub }}>
                      Resend code in <Text style={{ color: B.orange, fontWeight: 'bold' }}>{otpCountdown}s</Text>
                    </Text>
                  ) : (
                    <TouchableOpacity onPress={() => setOtpCountdown(30)}>
                      <Text style={{ fontSize: 11, color: B.orange, fontWeight: 'bold' }}>Resend Code</Text>
                    </TouchableOpacity>
                  )}
                  <Text style={{ fontSize: 9, color: t.muted, fontWeight: 'bold' }}>DEMO CODE: 123456</Text>
                </View>

                <TouchableOpacity style={[styles.authBtn, { marginTop: 20 }]} onPress={handleVerifyOtp}>
                  <LinearGradient colors={[B.orange, B.secondary]} style={styles.obBtnGradient}>
                    <ShieldCheck size={16} color="#FFFFFF" style={{ marginRight: 8 }} />
                    <Text style={styles.obBtnText}>Verify & Login</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}
          </Animated.View>
        </View>
      </SafeAreaView>
    );
  }

  // 4. Setup 1: Profile Details
  function RenderSetup1() {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: 'transparent' }]}>
        <View style={{ flex: 1, paddingHorizontal: 24, justifyContent: 'center' }}>
          <View style={{ backgroundColor: t.card, borderRadius: 28, borderWidth: 1, borderColor: t.border, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.04, shadowRadius: 20, elevation: 4 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={{ fontSize: 10, fontWeight: '900', color: B.orange, letterSpacing: 1.5 }}>STEP 1 OF 3</Text>
              <Text style={{ fontSize: 24, fontWeight: '900', color: t.text, marginTop: 4 }}>Personal Profile</Text>
              <Text style={{ fontSize: 13, color: t.sub, marginTop: 4 }}>Let us know a little more about yourself.</Text>

              <View style={{ gap: 16, marginTop: 20 }}>
                <View>
                  <Text style={{ fontSize: 12, fontWeight: 'bold', color: t.text, marginBottom: 6 }}>Full Name</Text>
                  <TextInput
                    style={{ height: 56, borderRadius: 18, borderWidth: 1, borderColor: t.border, backgroundColor: t.input, paddingHorizontal: 16, fontSize: 14, color: t.text, fontWeight: '600' }}
                    value={user.name}
                    onChangeText={val => setUser(prev => ({ ...prev, name: val }))}
                    placeholder="e.g. Bhargav"
                    placeholderTextColor={t.muted}
                  />
                </View>

                <View>
                  <Text style={{ fontSize: 12, fontWeight: 'bold', color: t.text, marginBottom: 6 }}>Email Address</Text>
                  <TextInput
                    style={{ height: 56, borderRadius: 18, borderWidth: 1, borderColor: t.border, backgroundColor: t.input, paddingHorizontal: 16, fontSize: 14, color: t.text, fontWeight: '600' }}
                    value={user.email}
                    onChangeText={val => setUser(prev => ({ ...prev, email: val }))}
                    placeholder="e.g. bhargav@koikoi.in"
                    placeholderTextColor={t.muted}
                  />
                </View>

                <View>
                  <Text style={{ fontSize: 12, fontWeight: 'bold', color: t.text, marginBottom: 6 }}>Dietary Preference</Text>
                  <View style={{ flexDirection: 'row', gap: 10 }}>
                    {['Veg', 'Non-Veg', 'Egg'].map(pref => {
                      const isSelected = user.foodPref === pref;
                      return (
                        <TouchableOpacity
                          key={pref}
                          style={{
                            flex: 1,
                            height: 48,
                            borderRadius: 14,
                            borderWidth: 1,
                            borderColor: isSelected ? B.orange : t.border,
                            backgroundColor: isSelected ? B.orangeL : t.card,
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                          onPress={() => setUser(prev => ({ ...prev, foodPref: pref }))}
                        >
                          <Text style={{ fontSize: 13, fontWeight: 'bold', color: isSelected ? B.orange : t.text }}>
                            {pref}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              </View>

              <TouchableOpacity style={[styles.authBtn, { marginTop: 24 }]} onPress={() => go('setup2')}>
                <LinearGradient colors={[B.orange, B.secondary]} style={styles.obBtnGradient}>
                  <Text style={styles.obBtnText}>Continue</Text>
                </LinearGradient>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // 5. Setup 2: Address Details
  function RenderSetup2() {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: 'transparent' }]}>
        <View style={{ flex: 1, paddingHorizontal: 24, justifyContent: 'center' }}>
          <View style={{ backgroundColor: t.card, borderRadius: 28, borderWidth: 1, borderColor: t.border, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.04, shadowRadius: 20, elevation: 4 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <TouchableOpacity onPress={back} style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                <ArrowLeft size={16} color={t.text} />
                <Text style={{ fontSize: 13, color: t.sub, fontWeight: '600' }}>Back</Text>
              </TouchableOpacity>

              <Text style={{ fontSize: 10, fontWeight: '900', color: B.orange, letterSpacing: 1.5 }}>STEP 2 OF 3</Text>
              <Text style={{ fontSize: 24, fontWeight: '900', color: t.text, marginTop: 4 }}>Delivery Location</Text>
              <Text style={{ fontSize: 13, color: t.sub, marginTop: 4 }}>Specify where we should drop off your daily dabbas.</Text>

              <View style={{ gap: 16, marginTop: 20 }}>
                <View>
                  <Text style={{ fontSize: 12, fontWeight: 'bold', color: t.text, marginBottom: 6 }}>Delivery Address</Text>
                  <TextInput
                    style={{ height: 80, borderRadius: 18, borderWidth: 1, borderColor: t.border, backgroundColor: t.input, paddingHorizontal: 16, paddingTop: 12, fontSize: 14, color: t.text, fontWeight: '600', textAlignVertical: 'top' }}
                    value={user.address}
                    onChangeText={val => setUser(prev => ({ ...prev, address: val }))}
                    placeholder="e.g. Villas 45, Green Glen Layout, Bellandur, Bengaluru"
                    placeholderTextColor={t.muted}
                    multiline
                    numberOfLines={3}
                  />
                </View>

                <View>
                  <Text style={{ fontSize: 12, fontWeight: 'bold', color: t.text, marginBottom: 6 }}>Address Type</Text>
                  <View style={{ flexDirection: 'row', gap: 10 }}>
                    {['Home', 'Work', 'Other'].map(label => {
                      const isSelected = user.addressLabel === label;
                      return (
                        <TouchableOpacity
                          key={label}
                          style={{
                            flex: 1,
                            height: 48,
                            borderRadius: 14,
                            borderWidth: 1,
                            borderColor: isSelected ? B.orange : t.border,
                            backgroundColor: isSelected ? B.orangeL : t.card,
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                          onPress={() => setUser(prev => ({ ...prev, addressLabel: label }))}
                        >
                          <Text style={{ fontSize: 13, fontWeight: 'bold', color: isSelected ? B.orange : t.text }}>
                            {label}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              </View>

              <TouchableOpacity style={[styles.authBtn, { marginTop: 24 }]} onPress={() => go('setup3')}>
                <LinearGradient colors={[B.orange, B.secondary]} style={styles.obBtnGradient}>
                  <Text style={styles.obBtnText}>Continue</Text>
                </LinearGradient>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // 6. Setup 3: Health Details
  function RenderSetup3() {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: 'transparent' }]}>
        <View style={{ flex: 1, paddingHorizontal: 24, justifyContent: 'center' }}>
          <View style={{ backgroundColor: t.card, borderRadius: 28, borderWidth: 1, borderColor: t.border, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.04, shadowRadius: 20, elevation: 4 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <TouchableOpacity onPress={back} style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                <ArrowLeft size={16} color={t.text} />
                <Text style={{ fontSize: 13, color: t.sub, fontWeight: '600' }}>Back</Text>
              </TouchableOpacity>

              <Text style={{ fontSize: 10, fontWeight: '900', color: B.orange, letterSpacing: 1.5 }}>STEP 3 OF 3</Text>
              <Text style={{ fontSize: 24, fontWeight: '900', color: t.text, marginTop: 4 }}>Health Profile</Text>
              <Text style={{ fontSize: 13, color: t.sub, marginTop: 4 }}>Personalize your nutrition logs & meal portions.</Text>

              <View style={{ gap: 16, marginTop: 20 }}>
                <View style={{ flexDirection: 'row', gap: 12 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: t.text, marginBottom: 6 }}>Height (cm)</Text>
                    <TextInput
                      style={{ height: 56, borderRadius: 18, borderWidth: 1, borderColor: t.border, backgroundColor: t.input, paddingHorizontal: 16, fontSize: 14, color: t.text, fontWeight: '600' }}
                      value={user.height}
                      onChangeText={val => setUser(prev => ({ ...prev, height: val }))}
                      placeholder="e.g. 175"
                      placeholderTextColor={t.muted}
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: t.text, marginBottom: 6 }}>Weight (kg)</Text>
                    <TextInput
                      style={{ height: 56, borderRadius: 18, borderWidth: 1, borderColor: t.border, backgroundColor: t.input, paddingHorizontal: 16, fontSize: 14, color: t.text, fontWeight: '600' }}
                      value={user.weight}
                      onChangeText={val => setUser(prev => ({ ...prev, weight: val }))}
                      placeholder="e.g. 72"
                      placeholderTextColor={t.muted}
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                <View>
                  <Text style={{ fontSize: 12, fontWeight: 'bold', color: t.text, marginBottom: 6 }}>Fitness Goal</Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                    {['Weight Loss', 'Muscle Gain', 'Healthy Living', 'Senior Diet'].map(goal => {
                      const isSelected = user.goal === goal;
                      return (
                        <TouchableOpacity
                          key={goal}
                          style={{
                            paddingHorizontal: 12,
                            paddingVertical: 8,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: isSelected ? B.orange : t.border,
                            backgroundColor: isSelected ? B.orangeL : t.card
                          }}
                          onPress={() => setUser(prev => ({ ...prev, goal: goal }))}
                        >
                          <Text style={{ fontSize: 12, fontWeight: 'bold', color: isSelected ? B.orange : t.text }}>
                            {goal}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                {/* Calculated Target Card */}
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: B.orangeL, padding: 14, borderRadius: 18, borderWidth: 1, borderColor: B.orangeM }}>
                  <Flame size={20} color={B.orange} />
                  <View style={{ marginLeft: 12 }}>
                    <Text style={{ fontSize: 9, color: B.orange, fontWeight: '900', letterSpacing: 0.5 }}>RECOMMENDED NUTRITION</Text>
                    <Text style={{ fontSize: 16, fontWeight: '900', color: t.text, marginTop: 2 }}>{calorieCalc} kcal / day</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.authBtn, { marginTop: 24 }]}
                onPress={() => {
                  setToast('Profile Complete! Welcome aboard.');
                  go('home');
                }}
              >
                <LinearGradient colors={[B.orange, B.secondary]} style={styles.obBtnGradient}>
                  <Text style={styles.obBtnText}>Submit & Enter</Text>
                </LinearGradient>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // 7. Home Screen (Dashboard)
  function RenderHome() {
    const specialMeal = mealsList.find(m => m.id === 3) || mealsList[0];

    const categories = [
      { name: 'All Meals', icon: UtensilsCrossed },
      { name: 'South Indian', icon: Coffee },
      { name: 'North Indian', icon: ChefHat },
      { name: 'Healthy', icon: Leaf },
      { name: 'Snacks', icon: Flame }
    ];

    const kitchens = [
      { name: "Priya's Kitchen", rating: "4.9", meals: "2.5k+ meals served", img: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400' },
      { name: "Amma's Kitchen", rating: "4.8", meals: "1.8k+ meals served", img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400' },
      { name: "Sai Home Foods", rating: "4.7", meals: "1.2k+ meals served", img: 'https://images.unsplash.com/photo-1560624052-449f5ddf0c31?w=400' }
    ];

    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: 'transparent' }]}>
        <ScrollView contentContainerStyle={{ paddingBottom: 110 }} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => go('profile')}
                style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: B.orange, justifyContent: 'center', alignItems: 'center', shadowColor: B.orange, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 }}
              >
                <Text style={{ fontSize: 18 }}>{user.avatar || '👩‍🍳'}</Text>
              </TouchableOpacity>
              <View style={{ marginLeft: 12 }}>
                <Text style={{ fontSize: 13, color: t.sub, fontWeight: '500' }}>Hello {user.name || 'Rithvik'} 👋</Text>
              </View>
            </View>
            <TouchableOpacity
              style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: t.card, borderWidth: 1, borderColor: t.border, justifyContent: 'center', alignItems: 'center' }}
              onPress={() => go('notifications')}
            >
              <Bell size={20} color={t.text} />
              <View style={{ position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: 4, backgroundColor: '#EF4444' }} />
            </TouchableOpacity>
          </View>

          {/* Headline */}
          <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
            <Text style={{ fontSize: 32, fontWeight: '900', color: t.text, lineHeight: 40, letterSpacing: -0.5 }}>
              What would you{'\n'}like to <Text style={{ color: B.orange }}>eat today?</Text>
            </Text>
          </View>

          {/* Search bar */}
          <View style={{ flexDirection: 'row', paddingHorizontal: 16, marginTop: 16, gap: 12 }}>
            <View style={{ flex: 1, height: 54, borderRadius: 18, backgroundColor: t.card, borderWidth: 1, borderColor: t.border, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }}>
              <HomeIcon size={18} color={t.muted} style={{ marginRight: 10 }} />
              <TextInput
                placeholder="Search for meals, cuisines..."
                placeholderTextColor={t.muted}
                style={{ flex: 1, fontSize: 14, color: t.text, fontWeight: '500' }}
              />
            </View>
            <TouchableOpacity
              style={{ width: 54, height: 54, borderRadius: 18, backgroundColor: t.card, borderWidth: 1, borderColor: t.border, justifyContent: 'center', alignItems: 'center' }}
              onPress={() => setToast('Filters Opened!')}
            >
              <Settings size={20} color={t.text} />
            </TouchableOpacity>
          </View>

          {/* Categories */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, marginTop: 20, gap: 12 }}>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.name;
              return (
                <TouchableOpacity
                  key={cat.name}
                  onPress={() => setSelectedCategory(cat.name)}
                  style={{ alignItems: 'center', gap: 6 }}
                >
                  <View
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 30,
                      backgroundColor: isActive ? B.orange : t.card,
                      borderWidth: 1,
                      borderColor: isActive ? B.orange : t.border,
                      justifyContent: 'center',
                      alignItems: 'center',
                      shadowColor: isActive ? B.orange : '#000',
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: isActive ? 0.2 : 0.03,
                      shadowRadius: 8,
                      elevation: 2
                    }}
                  >
                    <cat.icon size={20} color={isActive ? '#FFFFFF' : t.text} />
                  </View>
                  <Text style={{ fontSize: 11, fontWeight: 'bold', color: isActive ? B.orange : t.sub }}>{cat.name}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Today's Special */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginTop: 24 }}>
            <Text style={{ fontSize: 18, fontWeight: '900', color: t.text }}>Today's Special</Text>
            <TouchableOpacity onPress={() => go('meals')}>
              <Text style={{ fontSize: 12, fontWeight: 'bold', color: B.orange }}>See all</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{
              marginHorizontal: 16,
              marginTop: 12,
              backgroundColor: t.card,
              borderRadius: 24,
              borderWidth: 1,
              borderColor: t.border,
              padding: 12,
              flexDirection: 'row',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.04,
              shadowRadius: 16,
              elevation: 3
            }}
            onPress={() => {
              setSelectedMealId(specialMeal.id);
              go('meal_detail');
            }}
          >
            <View style={{ width: 120, height: 120, borderRadius: 16, overflow: 'hidden' }}>
              <Image source={{ uri: specialMeal.img }} style={{ width: '100%', height: '100%' }} />
              <View style={{ position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                <Star size={10} color="#F59E0B" />
                <Text style={{ fontSize: 9, fontWeight: 'bold', color: '#FFFFFF' }}>{specialMeal.rating}</Text>
              </View>
            </View>

            <View style={{ flex: 1, marginLeft: 16, justifyContent: 'space-between', paddingVertical: 4 }}>
              <View>
                <Text style={{ fontSize: 15, fontWeight: '900', color: t.text }}>{specialMeal.name}</Text>
                <Text style={{ fontSize: 11, color: t.sub, marginTop: 4, lineHeight: 15 }} numberOfLines={2}>
                  {specialMeal.desc}
                </Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: '900', color: B.orange }}>{specialMeal.price || '₹129'}</Text>
                <TouchableOpacity
                  style={{
                    borderRadius: 12,
                    overflow: 'hidden',
                  }}
                  onPress={() => {
                    setToast('Added to Cart!');
                  }}
                >
                  <LinearGradient colors={[B.orange, B.secondary]} style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
                    <Text style={{ fontSize: 11, fontWeight: '900', color: '#FFFFFF' }}>+ Add</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>

          {/* Top Rated Kitchens */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginTop: 24 }}>
            <Text style={{ fontSize: 18, fontWeight: '900', color: t.text }}>Top Rated Kitchens</Text>
            <TouchableOpacity onPress={() => go('kitchen')}>
              <Text style={{ fontSize: 12, fontWeight: 'bold', color: B.orange }}>See all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, marginTop: 12, gap: 12 }}>
            {kitchens.map((k, i) => (
              <TouchableOpacity
                key={i}
                style={{
                  width: 140,
                  backgroundColor: t.card,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: t.border,
                  padding: 8,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: 0.03,
                  shadowRadius: 12,
                  elevation: 2
                }}
                onPress={() => go('kitchen')}
              >
                <Image source={{ uri: k.img }} style={{ width: '100%', height: 90, borderRadius: 14 }} />
                <Text style={{ fontSize: 12, fontWeight: 'bold', color: t.text, marginTop: 8 }} numberOfLines={1}>
                  {k.name}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 2 }}>
                  <Star size={10} color="#F59E0B" />
                  <Text style={{ fontSize: 10, fontWeight: 'bold', color: t.text }}>{k.rating}</Text>
                  <Text style={{ fontSize: 9, color: t.muted }}>({k.meals})</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </ScrollView>

        <BottomTabNav active="home" />
      </SafeAreaView>
    );
  }

  // 8. Meals Screen (Daily Menu)
  function RenderMeals() {
    const filteredMeals = mealsList.filter(m => {
      let matchesType = true;
      if (selectedFilter === 'Veg') matchesType = m.type === 'veg';
      else if (selectedFilter === 'Non-Veg') matchesType = m.type === 'non-veg';
      else if (selectedFilter === 'Egg') matchesType = m.type === 'egg';

      let matchesCat = true;
      if (selectedCategory !== 'All Menu' && selectedCategory !== 'All Categories') {
        matchesCat = m.categories.includes(selectedCategory);
      }

      return matchesType && matchesCat;
    });

    const categoryList = ['All Menu', 'Chef Special', 'Healthy Diet', 'Traditional thali', 'Quick Bites'];

    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: 'transparent' }]}>
        {/* Header */}
        <View style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12 }}>
          <Text style={{ fontSize: 28, fontWeight: '900', color: t.text, letterSpacing: -0.5 }}>Daily Menu</Text>
          <Text style={{ fontSize: 12, color: t.sub, marginTop: 2 }}>Curated home-cooked recipes, made fresh daily.</Text>
        </View>

        {/* Veg/Non-Veg Filter Row */}
        <View style={{ flexDirection: 'row', paddingHorizontal: 16, marginTop: 12, gap: 8 }}>
          {['All', 'Veg', 'Non-Veg', 'Egg'].map(f => {
            const isSelected = selectedFilter === f;
            return (
              <TouchableOpacity
                key={f}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: isSelected ? B.orange : t.border,
                  backgroundColor: isSelected ? B.orangeL : t.card
                }}
                onPress={() => setSelectedFilter(f)}
              >
                <Text style={{ fontSize: 12, fontWeight: 'bold', color: isSelected ? B.orange : t.text }}>
                  {f}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Categories Horizontal Scroll */}
        <View style={{ marginTop: 12 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}>
            {categoryList.map(cat => {
              const isSelected = selectedCategory === cat || (cat === 'All Menu' && selectedCategory === 'All Categories');
              return (
                <TouchableOpacity
                  key={cat}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: isSelected ? B.orange : t.border,
                    backgroundColor: isSelected ? B.orange : t.card
                  }}
                  onPress={() => setSelectedCategory(cat === 'All Menu' ? 'All Categories' : cat)}
                >
                  <Text style={{ fontSize: 12, fontWeight: 'bold', color: isSelected ? '#FFFFFF' : t.sub }}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Meals Grid */}
        <FlatList
          data={filteredMeals}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ padding: 16, paddingBottom: 110, gap: 16 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                backgroundColor: t.card,
                borderRadius: 24,
                borderWidth: 1,
                borderColor: t.border,
                overflow: 'hidden',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.02,
                shadowRadius: 12,
                elevation: 2
              }}
              onPress={() => {
                setSelectedMealId(item.id);
                go('meal_detail');
              }}
            >
              <View style={{ height: 160, width: '100%', position: 'relative' }}>
                <Image source={{ uri: item.img }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                <View style={{ position: 'absolute', top: 12, left: 12, flexDirection: 'row', gap: 6 }}>
                  <VegPill veg={item.type === 'veg'} />
                </View>
                <View style={{ position: 'absolute', top: 12, right: 12, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Star size={12} color="#F59E0B" />
                  <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#FFFFFF' }}>{item.rating}</Text>
                </View>
              </View>

              <View style={{ padding: 16 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <View style={{ flex: 1, marginRight: 8 }}>
                    <Text style={{ fontSize: 16, fontWeight: '900', color: t.text }}>{item.name}</Text>
                    <Text style={{ fontSize: 12, color: t.sub, marginTop: 4 }} numberOfLines={1}>{item.desc}</Text>
                  </View>
                  <Text style={{ fontSize: 18, fontWeight: '900', color: B.orange }}>{item.price}</Text>
                </View>

                {/* Nutrition Stats Row */}
                <View style={{ flexDirection: 'row', backgroundColor: t.input, borderRadius: 14, padding: 10, marginTop: 12, justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 11, fontWeight: 'bold', color: t.text }}>{item.cal} kcal</Text>
                    <Text style={{ fontSize: 9, color: t.muted, marginTop: 2 }}>Calories</Text>
                  </View>
                  <View style={{ width: 1, height: 16, backgroundColor: t.border }} />
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 11, fontWeight: 'bold', color: t.text }}>{item.protein}g</Text>
                    <Text style={{ fontSize: 9, color: t.muted, marginTop: 2 }}>Protein</Text>
                  </View>
                  <View style={{ width: 1, height: 16, backgroundColor: t.border }} />
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 11, fontWeight: 'bold', color: t.text }}>{item.carbs}g</Text>
                    <Text style={{ fontSize: 9, color: t.muted, marginTop: 2 }}>Carbs</Text>
                  </View>
                  <View style={{ width: 1, height: 16, backgroundColor: t.border }} />
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 11, fontWeight: 'bold', color: t.text }}>{item.fat}g</Text>
                    <Text style={{ fontSize: 9, color: t.muted, marginTop: 2 }}>Fats</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => (
            <View style={{ paddingVertical: 40, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 14, color: t.text, fontWeight: 'bold' }}>No Dabbas Found</Text>
              <Text style={{ fontSize: 12, color: t.muted, marginTop: 4 }}>Try clearing filters</Text>
            </View>
          )}
        />

        <BottomTabNav active="meals" />
      </SafeAreaView>
    );
  }

  // 9. Kitchen Screen (Live Webcast)
  function RenderKitchen() {
    const commentsList = [
      { name: 'Priya', msg: 'Countertops are sparking clean! 👍' },
      { name: 'Rahul', msg: 'The paneer looks incredibly fresh today.' },
      { name: 'Aparna', msg: 'Love seeing the steel containers being packed.' },
      { name: 'Sanjay', msg: 'Hygiene levels are top notch!' }
    ];

    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: 'transparent' }]}>
        <ScrollView contentContainerStyle={{ paddingBottom: 110 }} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16 }}>
            <View>
              <Text style={{ fontSize: 28, fontWeight: '900', color: t.text, letterSpacing: -0.5 }}>Live Webcast</Text>
              <Text style={{ fontSize: 12, color: t.sub, marginTop: 2 }}>Real-time transparency of our kitchens.</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: B.green, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 14, gap: 4 }}>
              <BadgeCheck size={14} color="#FFFFFF" />
              <Text style={{ fontSize: 9, fontWeight: '900', color: '#FFFFFF' }}>A+ CERTIFIED</Text>
            </View>
          </View>

          {/* Webcast Screen Box */}
          <View style={{ marginHorizontal: 16, marginTop: 20, height: 210, borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: t.border, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.05, shadowRadius: 16, elevation: 4 }}>
            <Image source={{ uri: 'https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?w=600' }} style={{ width: '100%', height: '100%' }} />
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, padding: 16, justifyContent: 'space-between', backgroundColor: 'rgba(0,0,0,0.35)' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#EF4444', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, gap: 4 }}>
                <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#FFFFFF' }} />
                <Text style={{ fontSize: 9, fontWeight: '900', color: '#FFFFFF' }}>CAM {selectedCam} - LIVE</Text>
              </View>
              <Text style={{ fontSize: 11, color: '#FFFFFF', fontWeight: 'bold' }}>11:34 AM · Cook Station 04</Text>
            </View>
          </View>

          {/* Camera Selection */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 8, marginTop: 12 }}>
            {[1, 2, 3, 4].map(cam => {
              const isSelected = selectedCam === cam;
              return (
                <TouchableOpacity
                  key={cam}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 14,
                    paddingVertical: 8,
                    borderRadius: 14,
                    borderWidth: 1,
                    borderColor: isSelected ? B.orange : t.border,
                    backgroundColor: isSelected ? B.orangeL : t.card,
                    gap: 6
                  }}
                  onPress={() => setSelectedCam(cam)}
                >
                  <Video size={14} color={isSelected ? B.orange : t.text} />
                  <Text style={{ fontSize: 11, fontWeight: 'bold', color: isSelected ? B.orange : t.text }}>
                    Cam {cam}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Cooking Details */}
          <View style={{ paddingHorizontal: 16, marginTop: 24 }}>
            <Text style={{ fontSize: 16, fontWeight: '900', color: t.text, marginBottom: 10 }}>Chef in Charge</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 24, borderWidth: 1, borderColor: t.border, backgroundColor: t.card }}>
              <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: B.orangeL, justifyContent: 'center', alignItems: 'center' }}>
                <ChefHat size={22} color={B.orange} />
              </View>
              <View style={{ marginLeft: 14 }}>
                <Text style={{ fontSize: 14, fontWeight: '900', color: t.text }}>Chef Sanjay Kapoor</Text>
                <Text style={{ fontSize: 11, color: t.sub, marginTop: 2 }}>Preparing North Indian Dinner Menu</Text>
              </View>
            </View>
          </View>

          {/* Live Chat Audit */}
          <View style={{ paddingHorizontal: 16, marginTop: 24 }}>
            <Text style={{ fontSize: 16, fontWeight: '900', color: t.text, marginBottom: 10 }}>Live Audit Comments</Text>
            <View style={{ padding: 16, borderRadius: 24, borderWidth: 1, borderColor: t.border, backgroundColor: t.card, gap: 10 }}>
              {commentsList.map((c, i) => (
                <View key={i} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 12, fontWeight: 'bold', color: B.orange }}>{c.name}:</Text>
                  <Text style={{ fontSize: 12, color: t.text, marginLeft: 6 }}>{c.msg}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        <BottomTabNav active="kitchen" />
      </SafeAreaView>
    );
  }

  // 10. Profile Screen
  function RenderProfile() {
    const handleLogout = () => {
      setToast('Logged Out');
      setCurrentScreen('auth');
    };

    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: 'transparent' }]}>
        <ScrollView contentContainerStyle={{ paddingBottom: 110 }} showsVerticalScrollIndicator={false}>
          {/* User profile details */}
          <View style={{ alignItems: 'center', paddingVertical: 24 }}>
            <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: B.orange, justifyContent: 'center', alignItems: 'center', shadowColor: B.orange, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.2, shadowRadius: 10, elevation: 4 }}>
              <Text style={{ fontSize: 36 }}>{user.avatar}</Text>
            </View>
            <Text style={{ fontSize: 20, fontWeight: '900', color: t.text, marginTop: 12 }}>{user.name}</Text>
            <Text style={{ fontSize: 13, color: t.sub, marginTop: 2 }}>{user.email}</Text>

            {/* Loyalty tier info */}
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 16, backgroundColor: t.card, borderWidth: 1, borderColor: t.border, marginTop: 16 }}>
              <Award size={20} color={B.orange} />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 12, fontWeight: 'bold', color: t.text }}>Gold Tier Member</Text>
                <Text style={{ fontSize: 10, color: t.sub }}>Unlock ₹0 delivery on student tiers</Text>
              </View>
            </View>
          </View>

          {/* Settings Group */}
          <View style={{ marginTop: 8 }}>
            <Text style={{ fontSize: 10, fontWeight: '900', color: t.sub, letterSpacing: 1.5, marginLeft: 24, marginBottom: 8 }}>ACCOUNT SETTINGS</Text>
            <View style={{ marginHorizontal: 16, borderRadius: 24, borderWidth: 1, borderColor: t.border, backgroundColor: t.card, overflow: 'hidden' }}>
              {[
                { title: 'Personal Information', sub: 'Edit name, email & preferences', icon: User, screen: 'personal' },
                { title: 'Health Metrics Profile', sub: 'Calorie targets & fitness goals', icon: Heart, screen: 'health_info' },
                { title: 'Delivery Addresses', sub: 'Manage saved locations', icon: MapPin, screen: 'addresses' },
                { title: 'Payments & Balance Statements', sub: 'Add wallet money & see logs', icon: Wallet, screen: 'payments' },
                { title: 'Theme & Appearance', sub: 'Switch light & dark modes', icon: Sun, screen: 'appearance' }
              ].map((item, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[{ flexDirection: 'row', alignItems: 'center', padding: 16 }, idx > 0 && { borderTopWidth: 1, borderTopColor: t.border }]}
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

            <Text style={{ fontSize: 10, fontWeight: '900', color: t.sub, letterSpacing: 1.5, marginLeft: 24, marginTop: 24, marginBottom: 8 }}>PROMOTIONS & HELP</Text>
            <View style={{ marginHorizontal: 16, borderRadius: 24, borderWidth: 1, borderColor: t.border, backgroundColor: t.card, overflow: 'hidden' }}>
              {[
                { title: 'Refer & Earn Coupon', sub: 'Invite friends, earn ₹100 cash', icon: Gift, screen: 'refer' },
                { title: 'Help & Support Chat', sub: 'Reach out to live operations support', icon: HelpCircle, screen: 'support' }
              ].map((item, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[{ flexDirection: 'row', alignItems: 'center', padding: 16 }, idx > 0 && { borderTopWidth: 1, borderTopColor: t.border }]}
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

            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 24, paddingVertical: 12 }} onPress={handleLogout}>
              <LogOut size={16} color="#EF4444" style={{ marginRight: 6 }} />
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#EF4444' }}>Log Out Account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <BottomTabNav active="profile" />
      </SafeAreaView>
    );
  }

  // 11. Meal Detail Screen
  function RenderMealDetail() {
    const meal = mealsList.find(m => m.id === selectedMealId) || mealsList[0];

    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: t.bg }]}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={back} style={[styles.backIconCircle, { backgroundColor: t.surface }]}>
            <ArrowLeft size={16} color={t.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: t.text }]}>Meal Details</Text>
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
          <Image source={{ uri: meal.img }} style={styles.detailImg} />

          <View style={{ padding: 16 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <VegPill veg={meal.type === 'veg'} />
              <View style={styles.mealCardRating}>
                <Star size={10} color="#F59E0B" />
                <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#F59E0B', marginLeft: 2 }}>{meal.rating}</Text>
              </View>
            </View>

            <Text style={[styles.detailMealName, { color: t.text }]}>{meal.name}</Text>
            <Text style={{ fontSize: 12, color: t.muted, marginTop: 4 }}>Chef: {meal.chef}</Text>
            <Text style={[styles.detailMealDesc, { color: t.sub }]}>{meal.desc}</Text>

            {/* Nutrition Progress Rings */}
            <Text style={[styles.sectionSubTitle, { color: t.text, marginTop: 24, marginBottom: 12 }]}>Macros Breakdowns</Text>
            <View style={styles.macroRow}>
              <ProgressRing pct={(meal.cal / 1000) * 100} label={`${meal.cal}`} sub="Kcal" color={B.orange} theme={t} />
              <ProgressRing pct={(meal.protein / 60) * 100} label={`${meal.protein}g`} sub="Protein" color="#6366F1" theme={t} />
              <ProgressRing pct={(meal.carbs / 100) * 100} label={`${meal.carbs}g`} sub="Carbs" color="#22C55E" theme={t} />
              <ProgressRing pct={(meal.fat / 40) * 100} label={`${meal.fat}g`} sub="Fat" color="#EC4899" theme={t} />
            </View>

            {/* Ingredients table */}
            <Text style={[styles.sectionSubTitle, { color: t.text, marginTop: 24, marginBottom: 8 }]}>Ingredients Sourced</Text>
            <View style={[styles.ingredientsBox, { backgroundColor: t.card, borderColor: t.border }]}>
              {[
                { k: 'Base Oil', v: meal.ingredients.oil },
                { k: 'Veg Used', v: meal.ingredients.veg.join(', ') },
                { k: 'Masala Spices', v: meal.ingredients.spices.join(', ') },
                { k: 'Dairy Component', v: meal.ingredients.dairy?.join(', ') || 'None' }
              ].map((ing, i) => (
                <View key={i} style={[styles.ingRow, i > 0 && { borderTopWidth: 1, borderTopColor: t.border }]}>
                  <Text style={[styles.ingKey, { color: t.muted }]}>{ing.k}</Text>
                  <Text style={[styles.ingVal, { color: t.text }]}>{ing.v}</Text>
                </View>
              ))}
            </View>

            {/* Reviews */}
            <Text style={[styles.sectionSubTitle, { color: t.text, marginTop: 24, marginBottom: 8 }]}>Customer Reviews</Text>
            <View style={{ gap: 10 }}>
              {meal.reviews.map(r => (
                <View key={r.id} style={[styles.reviewCard, { backgroundColor: t.card, borderColor: t.border }]}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: t.text }}>{r.user}</Text>
                    <Text style={{ fontSize: 10, color: t.muted }}>{r.date}</Text>
                  </View>
                  <Text style={{ fontSize: 12, color: t.sub, marginTop: 4 }}>{r.comment}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // 12. Live Delivery Tracking Screen
  function RenderTracking() {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: t.bg }]}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={back} style={[styles.backIconCircle, { backgroundColor: t.surface }]}>
            <ArrowLeft size={16} color={t.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: t.text }]}>Live Tracking</Text>
        </View>

        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {/* Simulated Map Visual */}
          <View style={[styles.mapMock, { backgroundColor: t.surface }]}>
            <MapPin size={48} color={B.orange} />
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: t.text, marginTop: 8 }}>Villas 45, Green Glen Layout</Text>
            <Text style={{ fontSize: 10, color: t.muted }}>Arjun is 2.4 km away from your villa</Text>
          </View>

          {/* Delivery Agent Card */}
          <View style={[styles.agentCard, { backgroundColor: t.card, borderColor: t.border }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.agentAvatar}>
                <Text style={{ fontSize: 16 }}>🚴</Text>
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 14, fontWeight: '900', color: t.text }}>Arjun Dev</Text>
                <Text style={{ fontSize: 11, color: t.muted }}>Delivery Executive · 4.9 Rating</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.agentCallBtn}>
              <PhoneCall size={14} color="#FFFFFF" />
              <Text style={{ fontSize: 11, color: '#FFFFFF', fontWeight: 'bold', marginLeft: 6 }}>Call Arjun</Text>
            </TouchableOpacity>
          </View>

          {/* Delivery Steps logs */}
          <Text style={[styles.sectionSubTitle, { color: t.text, marginTop: 24, marginBottom: 12 }]}>Delivery Status Timeline</Text>
          <View style={styles.timelineBlock}>
            {[
              { t: 'Order Received', desc: '11:00 AM · Kitchen acknowledged slot', done: true },
              { t: 'Food Preparation Complete', desc: '11:20 AM · Chef packed in insulated steel box', done: true },
              { t: 'Dispatched from Hub', desc: '11:25 AM · Handed over to Arjun', done: true },
              { t: 'Arrived at Gate', desc: 'Awaiting arrival at security gate', active: true }
            ].map((step, i) => (
              <View key={i} style={styles.timelineRow}>
                <View style={styles.timelineIndicatorColumn}>
                  <View style={[styles.timelineNodeLarge, { backgroundColor: step.done ? B.green : step.active ? B.orange : t.surface }]}>
                    {step.done && <Check size={10} color="#FFFFFF" strokeWidth={3} />}
                  </View>
                  {i < 3 && <View style={[styles.timelineConnector, { backgroundColor: step.done ? B.green : t.border }]} />}
                </View>
                <View style={{ flex: 1, marginLeft: 12, paddingBottom: 24 }}>
                  <Text style={{ fontSize: 13, fontWeight: 'bold', color: step.done || step.active ? t.text : t.muted }}>{step.t}</Text>
                  <Text style={{ fontSize: 11, color: t.muted, marginTop: 2 }}>{step.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // 13. Notifications Screen
  function RenderNotifications() {
    const list = [
      { id: 1, title: 'Lunch Dispatched 🍱', msg: 'Your healthy Lunch box has left the Bellandur kitchen hub.', time: '10 min ago' },
      { id: 2, title: 'Subscribed Successfully! 🎉', msg: 'Welcome to Koi Koi. Your 30-day billing is now live.', time: 'Yesterday' }
    ];

    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: t.bg }]}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={back} style={[styles.backIconCircle, { backgroundColor: t.surface }]}>
            <ArrowLeft size={16} color={t.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: t.text }]}>Notifications</Text>
        </View>
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {list.map(n => (
            <View key={n.id} style={[styles.notiCard, { backgroundColor: t.card, borderColor: t.border }]}>
              <Text style={{ fontSize: 13, fontWeight: 'bold', color: t.text }}>{n.title}</Text>
              <Text style={{ fontSize: 11, color: t.sub, marginTop: 4 }}>{n.msg}</Text>
              <Text style={{ fontSize: 9, color: t.muted, marginTop: 6 }}>{n.time}</Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // 14. Offers/Coupons Screen
  function RenderOffers() {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: t.bg }]}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={back} style={[styles.backIconCircle, { backgroundColor: t.surface }]}>
            <ArrowLeft size={16} color={t.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: t.text }]}>Wallet Coupons</Text>
        </View>
        <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
          {[
            { code: 'WELCOME50', discount: '₹50 CASHBACK', desc: 'Valid on subscription tier activations' },
            { code: 'SAVE20', discount: '20% DISCOUNT', desc: 'Save 20% on weekly lunch/dinner dabbas' },
            { code: 'REFER100', discount: '₹100 CREDITS', desc: 'Get ₹100 instantly for every new signup' }
          ].map(c => (
            <View key={c.code} style={[styles.couponTile, { backgroundColor: t.card, borderColor: t.border }]}>
              <Tag size={20} color={B.orange} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={{ fontSize: 15, fontWeight: '900', color: B.orange }}>{c.code}</Text>
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: t.text, marginTop: 2 }}>{c.discount}</Text>
                <Text style={{ fontSize: 11, color: t.muted, marginTop: 2 }}>{c.desc}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // 15. Rewards Screen
  function RenderRewards() {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: t.bg }]}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={back} style={[styles.backIconCircle, { backgroundColor: t.surface }]}>
            <ArrowLeft size={16} color={t.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: t.text }]}>Loyalty Rewards</Text>
        </View>
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <View style={[styles.loyaltyProgressBox, { backgroundColor: t.card, borderColor: t.border }]}>
            <Award size={36} color={B.orange} />
            <Text style={{ fontSize: 18, fontWeight: '900', color: t.text, marginTop: 10 }}>Gold Tier Achieved</Text>
            <Text style={{ fontSize: 12, color: t.muted, marginTop: 4 }}>You have earned 1,250 Coins</Text>
            <View style={[styles.progressBarBG, { backgroundColor: t.surface, marginTop: 12 }]}>
              <View style={[styles.progressBarFill, { backgroundColor: B.orange, width: '80%' }]} />
            </View>
            <Text style={{ fontSize: 10, color: t.muted, marginTop: 6 }}>150 coins left to Platinum level</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // 16. Appearance Screen
  function RenderAppearance() {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: t.bg }]}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={back} style={[styles.backIconCircle, { backgroundColor: t.surface }]}>
            <ArrowLeft size={16} color={t.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: t.text }]}>Appearance</Text>
        </View>
        <View style={{ padding: 16, gap: 12 }}>
          {[
            { id: 'light', label: 'Light Mode', icon: Sun },
            { id: 'dark', label: 'Dark Mode', icon: Moon },
            { id: 'system', label: 'Follow System Theme', icon: Settings }
          ].map(opt => {
            const active = themeMode === opt.id;
            return (
              <TouchableOpacity
                key={opt.id}
                style={[
                  styles.optionTile,
                  { backgroundColor: t.card, borderColor: t.border },
                  active && { borderColor: B.orange, borderWidth: 1 }
                ]}
                onPress={() => {
                  setThemeMode(opt.id as AppTheme);
                  setToast(`Appearance changed to ${opt.label}`);
                }}
              >
                <opt.icon size={18} color={active ? B.orange : t.text} />
                <Text style={[styles.optionLabel, { color: t.text, marginLeft: 12 }, active && { color: B.orange, fontWeight: 'bold' }]}>
                  {opt.label}
                </Text>
                {active && <Check size={16} color={B.orange} style={{ marginLeft: 'auto' }} />}
              </TouchableOpacity>
            );
          })}
        </View>
      </SafeAreaView>
    );
  }

  // 17. Support Screen
  function RenderSupport() {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: t.bg }]}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={back} style={[styles.backIconCircle, { backgroundColor: t.surface }]}>
            <ArrowLeft size={16} color={t.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: t.text }]}>Support Helpdesk</Text>
        </View>
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <Text style={[styles.sectionSubTitle, { color: t.text, marginBottom: 12 }]}>Submit Support Ticket</Text>

          <View style={[styles.supportForm, { backgroundColor: t.card, borderColor: t.border }]}>
            <Text style={{ fontSize: 11, color: t.muted, fontWeight: 'bold' }}>Describe Issue</Text>
            <TextInput
              style={[styles.setupInput, { color: t.text, backgroundColor: t.input, height: 100, textAlignVertical: 'top', paddingTop: 10, marginTop: 6 }]}
              placeholder="Tell us what is wrong..."
              placeholderTextColor={t.muted}
              multiline
            />
            <TouchableOpacity style={[styles.authBtn, { marginTop: 12 }]} onPress={() => { setToast('Support Ticket Submitted!'); back(); }}>
              <LinearGradient colors={[B.orange, B.secondary]} style={styles.obBtnGradient}>
                <Text style={styles.obBtnText}>Submit Ticket</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // 18. Addresses Screen
  function RenderAddresses() {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: t.bg }]}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={back} style={[styles.backIconCircle, { backgroundColor: t.surface }]}>
            <ArrowLeft size={16} color={t.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: t.text }]}>My Addresses</Text>
        </View>
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <View style={[styles.addressCard, { backgroundColor: t.card, borderColor: t.border }]}>
            <MapPin size={18} color={B.orange} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: t.text }}>{user.addressLabel} Address</Text>
              <Text style={{ fontSize: 12, color: t.muted, marginTop: 2 }}>{user.address}</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // 19. Payments Screen
  function RenderPayments() {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: t.bg }]}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={back} style={[styles.backIconCircle, { backgroundColor: t.surface }]}>
            <ArrowLeft size={16} color={t.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: t.text }]}>Wallet & Payments</Text>
        </View>
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {/* Balance card */}
          <View style={[styles.loyaltyProgressBox, { backgroundColor: t.card, borderColor: t.border }]}>
            <Wallet size={36} color={B.orange} />
            <Text style={{ fontSize: 24, fontWeight: '900', color: t.text, marginTop: 10 }}>₹1,250.00</Text>
            <Text style={{ fontSize: 12, color: t.muted }}>Available Wallet Balance</Text>
          </View>

          {/* Transaction logs */}
          <Text style={[styles.sectionSubTitle, { color: t.text, marginTop: 24, marginBottom: 12 }]}>Wallet Statement Logs</Text>
          <View style={[styles.ingredientsBox, { backgroundColor: t.card, borderColor: t.border }]}>
            {[
              { title: 'Monsoon Referral Promo Credit', amt: '+₹100.00', date: 'Jul 10, 2026', col: B.green },
              { title: 'Subscribed Monthly Dabba Tier', amt: '−₹3,999.00', date: 'Jul 08, 2026', col: '#EF4444' },
              { title: 'Money Added via Card UPI', amt: '+₹4,000.00', date: 'Jul 08, 2026', col: B.green }
            ].map((tx, i) => (
              <View key={i} style={[styles.ingRow, i > 0 && { borderTopWidth: 1, borderTopColor: t.border }]}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 13, fontWeight: 'bold', color: t.text }} numberOfLines={1}>{tx.title}</Text>
                  <Text style={{ fontSize: 10, color: t.muted, marginTop: 2 }}>{tx.date}</Text>
                </View>
                <Text style={{ fontSize: 13, fontWeight: '900', color: tx.col }}>{tx.amt}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // 20. Personal Screen
  function RenderPersonal() {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: t.bg }]}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={back} style={[styles.backIconCircle, { backgroundColor: t.surface }]}>
            <ArrowLeft size={16} color={t.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: t.text }]}>Personal Details</Text>
        </View>
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <View style={[styles.supportForm, { backgroundColor: t.card, borderColor: t.border }]}>
            <Text style={[styles.setupLabel, { color: t.text }]}>Full Name</Text>
            <TextInput
              style={[styles.setupInput, { color: t.text, backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : '#FFFFFF', borderColor: t.border, borderWidth: 1 }]}
              value={user.name}
              onChangeText={val => setUser(prev => ({ ...prev, name: val }))}
            />

            <Text style={[styles.setupLabel, { color: t.text, marginTop: 12 }]}>Email Address</Text>
            <TextInput
              style={[styles.setupInput, { color: t.text, backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : '#FFFFFF', borderColor: t.border, borderWidth: 1 }]}
              value={user.email}
              onChangeText={val => setUser(prev => ({ ...prev, email: val }))}
            />

            <Text style={[styles.setupLabel, { color: t.text, marginTop: 12 }]}>Mobile Number</Text>
            <TextInput
              style={[styles.setupInput, { color: t.text, backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : '#FFFFFF', borderColor: t.border, borderWidth: 1 }]}
              value={user.phone}
              onChangeText={val => setUser(prev => ({ ...prev, phone: val }))}
              keyboardType="phone-pad"
            />

            <TouchableOpacity style={[styles.authBtn, { marginTop: 16 }]} onPress={() => { setToast('Details Updated!'); back(); }}>
              <LinearGradient colors={[B.orange, B.secondary]} style={styles.obBtnGradient}>
                <Text style={styles.obBtnText}>Save Changes</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // 21. Health Info Screen
  function RenderHealthInfo() {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: t.bg }]}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={back} style={[styles.backIconCircle, { backgroundColor: t.surface }]}>
            <ArrowLeft size={16} color={t.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: t.text }]}>Health Profile</Text>
        </View>
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <View style={[styles.supportForm, { backgroundColor: t.card, borderColor: t.border }]}>
            <Text style={[styles.setupLabel, { color: t.text }]}>Height (cm)</Text>
            <TextInput
              style={[styles.setupInput, { color: t.text, backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : '#FFFFFF', borderColor: t.border, borderWidth: 1 }]}
              value={user.height}
              onChangeText={val => setUser(prev => ({ ...prev, height: val }))}
              keyboardType="numeric"
            />

            <Text style={[styles.setupLabel, { color: t.text, marginTop: 12 }]}>Weight (kg)</Text>
            <TextInput
              style={[styles.setupInput, { color: t.text, backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : '#FFFFFF', borderColor: t.border, borderWidth: 1 }]}
              value={user.weight}
              onChangeText={val => setUser(prev => ({ ...prev, weight: val }))}
              keyboardType="numeric"
            />

            <Text style={[styles.setupLabel, { color: t.text, marginTop: 12 }]}>Current Goal</Text>
            <View style={styles.chipRow}>
              {['Weight Loss', 'Muscle Gain', 'Healthy Living', 'Senior Diet'].map(goal => {
                const active = user.goal === goal;
                return (
                  <TouchableOpacity
                    key={goal}
                    style={[
                      styles.chip,
                      { backgroundColor: active ? B.orange + '15' : (isDark ? 'rgba(255, 255, 255, 0.02)' : '#FFFFFF'), borderColor: active ? B.orange : t.border, borderWidth: 1 }
                    ]}
                    onPress={() => setUser(prev => ({ ...prev, goal: goal }))}
                  >
                    <Text style={{ fontSize: 12, color: active ? B.orange : t.text, fontWeight: active ? 'bold' : 'normal' }}>{goal}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity style={[styles.authBtn, { marginTop: 16 }]} onPress={() => { setToast('Health Goals Updated!'); back(); }}>
              <LinearGradient colors={[B.orange, B.secondary]} style={styles.obBtnGradient}>
                <Text style={styles.obBtnText}>Save Profile</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // 22. Refer Screen
  function RenderRefer() {
    const handleShare = async () => {
      try {
        await Share.share({
          message: 'Get ₹100 wallet cashback on your first Koi Koi home-style steel dabba with my referral code KOIKOI100! Download now.',
        });
      } catch (error) {
        setToast('Sharing Failed');
      }
    };

    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: t.bg }]}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={back} style={[styles.backIconCircle, { backgroundColor: t.surface }]}>
            <ArrowLeft size={16} color={t.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: t.text }]}>Refer & Earn</Text>
        </View>
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <View style={[styles.loyaltyProgressBox, { backgroundColor: t.card, borderColor: t.border }]}>
            <Gift size={36} color={B.orange} />
            <Text style={{ fontSize: 18, fontWeight: '900', color: t.text, marginTop: 10 }}>Invite Your Friends</Text>
            <Text style={{ fontSize: 12, color: t.muted, textAlign: 'center', marginTop: 4 }}>
              Get ₹100 wallet cashback immediately when they start a monthly tier plan.
            </Text>

            <View style={[styles.shareCodeBox, { backgroundColor: t.surface }]}>
              <Text style={{ fontSize: 16, fontWeight: '900', color: t.text, letterSpacing: 1.5 }}>KOIKOI100</Text>
            </View>

            <TouchableOpacity style={[styles.authBtn, { width: '100%', marginTop: 12 }]} onPress={handleShare}>
              <LinearGradient colors={[B.orange, B.secondary]} style={styles.obBtnGradient}>
                <Share2 size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
                <Text style={styles.obBtnText}>Share Code</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // 23. Manage Plans Screen
  function RenderPlans() {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: t.bg }]}>
        <ScrollView contentContainerStyle={{ paddingBottom: 110 }}>
          <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
            <Text style={[styles.setupTitle, { color: t.text }]}>Active Subscription</Text>
            <Text style={{ fontSize: 12, color: t.muted }}>Pause, resume, skip or change your plan details below.</Text>
          </View>

          {/* Current plan banner */}
          <View style={[styles.subscriptionDetailsCard, { backgroundColor: t.card, borderColor: t.border }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 16, fontWeight: '900', color: t.text }}>Monthly Subscription</Text>
              <Text style={[styles.statusBadge, { backgroundColor: paused ? '#F59E0B' : B.green }]}>
                {paused ? 'PAUSED' : 'ACTIVE'}
              </Text>
            </View>
            <Text style={{ fontSize: 12, color: t.muted, marginTop: 4 }}>Remains: 27 days left in billing cycle</Text>

            <View style={[styles.progressBarBG, { backgroundColor: t.surface, marginTop: 12 }]}>
              <View style={[styles.progressBarFill, { backgroundColor: B.orange, width: '90%' }]} />
            </View>
          </View>

          {/* Settings block */}
          <View style={{ paddingHorizontal: 16, gap: 12, marginTop: 16 }}>
            {/* Pause Resume button */}
            <TouchableOpacity
              style={[styles.managePlanBtn, { backgroundColor: t.card, borderColor: t.border }]}
              onPress={() => {
                setPaused(!paused);
                setToast(paused ? 'Deliveries Resumed!' : 'Deliveries Paused Successfully');
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={[styles.settingsRowIcon, { backgroundColor: paused ? B.greenL : B.orangeL }]}>
                  {paused ? <Play size={16} color={B.green} /> : <Pause size={16} color={B.orange} />}
                </View>
                <View style={{ marginLeft: 12 }}>
                  <Text style={{ fontSize: 14, fontWeight: 'bold', color: t.text }}>
                    {paused ? 'Resume Deliveries' : 'Pause Plan'}
                  </Text>
                  <Text style={{ fontSize: 11, color: t.muted }}>
                    {paused ? 'Unpause to receive food' : 'Temporarily pause deliveries'}
                  </Text>
                </View>
              </View>
              <ChevronRight size={16} color={t.muted} />
            </TouchableOpacity>

            {/* Skip tomorrow */}
            <TouchableOpacity
              style={[styles.managePlanBtn, { backgroundColor: t.card, borderColor: t.border }]}
              onPress={() => {
                setToast("Tomorrow's delivery skipped! Day credited back.");
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={[styles.settingsRowIcon, { backgroundColor: '#EFF6FF' }]}>
                  <SkipForward size={16} color="#3B82F6" />
                </View>
                <View style={{ marginLeft: 12 }}>
                  <Text style={{ fontSize: 14, fontWeight: 'bold', color: t.text }}>Skip Tomorrow</Text>
                  <Text style={{ fontSize: 11, color: t.muted }}>Skip next dabba, credit back cash</Text>
                </View>
              </View>
              <ChevronRight size={16} color={t.muted} />
            </TouchableOpacity>

            {/* Catalog list */}
            <Text style={[styles.sectionSubTitle, { color: t.text, marginTop: 24, marginBottom: 8 }]}>Explore Other Tiers</Text>
            {PLANS.map(p => (
              <View key={p.id} style={[styles.tierCard, { backgroundColor: t.card, borderColor: t.border }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ fontSize: 15, fontWeight: 'bold', color: t.text }}>{p.name} Plan</Text>
                  <Text style={{ fontSize: 15, fontWeight: '900', color: p.color }}>{p.price}</Text>
                </View>
                <Text style={{ fontSize: 11, color: t.muted, marginTop: 2 }}>{p.sub}</Text>
                <TouchableOpacity
                  style={[styles.tierCardBtn, { borderColor: p.color }]}
                  onPress={() => {
                    setToast(`Switched to ${p.name} Plan!`);
                  }}
                >
                  <Text style={{ fontSize: 10, fontWeight: 'bold', color: p.color }}>Activate Plan</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>

        <BottomTabNav active="plans" />
      </SafeAreaView>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      {/* Decorative Warm Organic Background Shapes */}
      <View style={{ position: 'absolute', top: -100, right: -100, width: 350, height: 350, borderRadius: 175, backgroundColor: isDark ? 'rgba(233, 106, 46, 0.08)' : 'rgba(244, 179, 106, 0.25)', zIndex: 0 }} />
      <View style={{ position: 'absolute', bottom: -50, left: -100, width: 300, height: 300, borderRadius: 150, backgroundColor: isDark ? 'rgba(244, 179, 106, 0.06)' : 'rgba(233, 106, 46, 0.18)', zIndex: 0 }} />

      {/* Main Screen Renderer */}
      <View style={{ flex: 1, zIndex: 1 }}>
        {(() => {
        switch (currentScreen) {
          case 'splash':
            return RenderSplash();
          case 'ob1':
            return RenderOnboarding({ step: 1 });
          case 'ob2':
            return RenderOnboarding({ step: 2 });
          case 'ob3':
            return RenderOnboarding({ step: 3 });
          case 'auth':
            return RenderAuth();
          case 'setup1':
            return RenderSetup1();
          case 'setup2':
            return RenderSetup2();
          case 'setup3':
            return RenderSetup3();
          case 'home':
            return RenderHome();
          case 'meals':
            return RenderMeals();
          case 'kitchen':
            return RenderKitchen();
          case 'profile':
            return RenderProfile();
          case 'meal_detail':
            return RenderMealDetail();
          case 'tracking':
            return RenderTracking();
          case 'notifications':
            return RenderNotifications();
          case 'offers':
            return RenderOffers();
          case 'rewards':
            return RenderRewards();
          case 'appearance':
            return RenderAppearance();
          case 'support':
            return RenderSupport();
          case 'addresses':
            return RenderAddresses();
          case 'payments':
            return RenderPayments();
          case 'personal':
            return RenderPersonal();
          case 'health_info':
            return RenderHealthInfo();
          case 'refer':
            return RenderRefer();
          case 'plans':
            return RenderPlans();
          default:
            return RenderHome();
        }
      })()}
      </View>

      {/* Floating Action Toast Alert */}
      {toast && (
        <View style={styles.toastContainer}>
          <LinearGradient colors={[B.orange, B.secondary]} style={styles.toastGradient}>
            <Sparkles size={14} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.toastText}>{toast}</Text>
          </LinearGradient>
        </View>
      )}
    </View>
  );
}

// ─── Stylesheet Layouts ─────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
  },
  headerBar: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.06)',
  },
  backIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '900',
    marginLeft: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.04)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  // Splash Screen
  splashRoot: {
    flex: 1,
  },
  splashBgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  splashOverlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 20, 15, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  glassContainer: {
    width: '88%',
    maxWidth: 360,
    paddingVertical: 45,
    paddingHorizontal: 20,
    borderRadius: 40,
    backgroundColor: 'rgba(18, 30, 24, 0.75)',
    borderColor: 'rgba(255, 255, 255, 0.18)',
    borderWidth: 1.5,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 10,
  },
  splashKoiKoi: {
    color: '#E67E22',
    letterSpacing: 4,
    fontSize: 14,
    fontWeight: '900',
    marginTop: 20,
  },
  splashDabba: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginTop: 4,
    marginBottom: 8,
  },
  splashSubtitle: {
    color: '#D8DFD9',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 35,
    lineHeight: 18,
  },
  splashDotRow: {
    flexDirection: 'row',
    gap: 8,
  },
  splashDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E67E22',
    opacity: 0.4,
  },

  // Onboarding
  obRoot: {
    flex: 1,
  },
  obBgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  obOverlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 20, 15, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  obGlassCard: {
    width: '90%',
    maxWidth: 380,
    height: '82%',
    maxHeight: 660,
    padding: 24,
    borderRadius: 40,
    backgroundColor: 'rgba(18, 30, 24, 0.75)',
    borderColor: 'rgba(255, 255, 255, 0.18)',
    borderWidth: 1.5,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 10,
  },
  obSkipBtn: {
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderColor: 'rgba(255, 255, 255, 0.18)',
    borderWidth: 1,
    marginBottom: 10,
  },
  obSkipBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 1,
  },
  obIllusOuterCircle: {
    width: 174,
    height: 174,
    borderRadius: 87,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 24,
    marginTop: 10,
  },
  obIllusCircle: {
    width: 146,
    height: 146,
    borderRadius: 73,
    backgroundColor: '#FAF5EE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  obIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 20,
  },
  obIndicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  obIndicatorDash: {
    width: 24,
    height: 6,
    borderRadius: 3,
  },
  obTitleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'left',
    lineHeight: 34,
  },
  obDescText: {
    fontSize: 14,
    color: '#D8DFD9',
    lineHeight: 20,
    fontWeight: '500',
    textAlign: 'left',
    marginBottom: 20,
  },
  obMainBtn: {
    width: '100%',
    height: 52,
    borderRadius: 26,
    backgroundColor: '#E67E22',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
  },
  obMainBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  obBtnGradient: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  obBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  // Auth/Login
  authContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  authTitle: {
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 34,
    marginBottom: 8,
  },
  authSubtitle: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 32,
  },
  authInputContainer: {
    height: 54,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  phonePrefix: {
    fontSize: 15,
    fontWeight: '900',
    marginRight: 10,
  },
  phoneInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: 'bold',
    height: '100%',
    width: '100%',
  },
  authBtn: {
    height: 52,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 4,
  },
  authOr: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '900',
    color: '#999999',
    marginVertical: 24,
    letterSpacing: 1.5,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
  },
  socialBtn: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  authBackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  authBackText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  otpInput: {
    height: 54,
    width: '100%',
    borderRadius: 16,
    borderWidth: 2,
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 6,
  },
  otpHelperRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },

  // Setup Pages
  setupContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  setupStep: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  setupTitle: {
    fontSize: 26,
    fontWeight: '900',
    marginBottom: 6,
  },
  setupSubtitle: {
    fontSize: 13,
    marginBottom: 32,
  },
  setupForm: {
    marginBottom: 32,
  },
  setupLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  setupInput: {
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  chip: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipText: {
    fontSize: 12,
  },
  calCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
  },
  setupBtn: {
    height: 52,
    borderRadius: 16,
    overflow: 'hidden',
  },

  // Home Page
  homeHeader: {
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 10,
  },
  homeAvatarBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badgeDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '900',
  },

  // Today delivery hero card
  heroCard: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  heroImage: {
    width: '100%',
    height: 200,
  },
  heroGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    padding: 16,
    justifyContent: 'space-between',
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  liveTrackingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  liveTrackingText: {
    fontSize: 8,
    fontWeight: '900',
    color: '#2E7D32',
  },
  heroBottomContent: {
    gap: 4,
  },
  heroTimeSlot: {
    fontSize: 9,
    fontWeight: '900',
    color: '#FFFFFF',
    opacity: 0.85,
    letterSpacing: 1,
  },
  heroMealName: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  heroAgentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  heroAgentText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 6,
  },
  progressTimeline: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  timelineItem: {
    flex: 1,
    alignItems: 'center',
  },
  timelineNode: {
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  timelineText: {
    fontSize: 9,
    fontWeight: '900',
  },

  // Dashboard status cards
  quickCard: {
    borderRadius: 20,
    borderWidth: 1.5,
    padding: 14,
    height: 124,
    shadowColor: '#E67E22',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 1,
  },
  quickCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '100%',
  },
  quickCardIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickCardBadge: {
    fontSize: 8,
    fontWeight: '900',
    color: '#FFFFFF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  quickCardTitle: {
    fontSize: 14,
    fontWeight: '900',
    marginTop: 6,
  },
  quickCardImg: {
    width: 90,
    height: '100%',
    borderRadius: 12,
    resizeMode: 'cover',
  },

  // Up next meal card
  nextMealCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    borderWidth: 1,
    padding: 10,
  },
  nextMealImg: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },

  // Wallet coupons
  couponCard: {
    width: 156,
    padding: 12,
    borderRadius: 18,
    gap: 4,
  },
  couponCode: {
    fontSize: 13,
    fontWeight: '900',
  },
  couponDesc: {
    fontSize: 9,
    fontWeight: 'bold',
    opacity: 0.8,
  },

  // Recommended meals
  recommendCard: {
    width: 140,
    borderRadius: 18,
    borderWidth: 1,
    overflow: 'hidden',
  },
  recommendImg: {
    width: '100%',
    height: 90,
  },
  recommendTitle: {
    fontSize: 12,
    fontWeight: '900',
  },

  // Meals screen Daily menu
  mealsHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  mealsTitle: {
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 12,
  },
  typeFilterBar: {
    flexDirection: 'row',
    gap: 6,
  },
  typeFilterBtn: {
    flex: 1,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeFilterText: {
    fontSize: 11,
    fontWeight: '900',
  },
  sidebar: {
    width: '28%',
    borderRightWidth: 1,
  },
  sidebarBtn: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.03)',
  },
  sidebarText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  mealCard: {
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 14,
    overflow: 'hidden',
  },
  mealCardImg: {
    width: '100%',
    height: 110,
  },
  mealCardBadgeRow: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mealCardRating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFDF0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FEF3C7',
  },
  mealCardName: {
    fontSize: 13,
    fontWeight: '900',
  },
  mealCardDesc: {
    fontSize: 10,
    marginTop: 2,
  },
  mealsNutritionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 8,
  },
  mealCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.04)',
  },
  mealCardBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  mealCardBtnText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },

  // Kitchen Screen Live webcast
  kitchenHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  kitchenTitle: {
    fontSize: 22,
    fontWeight: '900',
  },
  hygieneBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: B.green,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  hygieneText: {
    fontSize: 8,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  webcastBox: {
    marginHorizontal: 16,
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
  },
  webcastImage: {
    width: '100%',
    height: '100%',
  },
  webcastOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 12,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  webcastLiveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EF4444',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  webcastLiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
    marginRight: 4,
  },
  webcastLiveText: {
    fontSize: 8,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  webcastTime: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  camSelectionRow: {
    paddingHorizontal: 16,
    gap: 8,
    marginTop: 10,
  },
  camBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
  },
  camBtnText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  chefCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
  },
  chatBox: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    gap: 8,
  },
  chatMessage: {
    flexDirection: 'row',
  },

  // Profile Screen
  profileUserCard: {
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '900',
  },
  loyaltyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 14,
    marginTop: 12,
  },
  groupTitle: {
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginLeft: 20,
    marginBottom: 6,
  },
  settingsGroup: {
    marginHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  settingsRowIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    paddingVertical: 12,
  },

  // Meal Detail Page
  detailImg: {
    width: '100%',
    height: 220,
  },
  detailMealName: {
    fontSize: 22,
    fontWeight: '900',
    marginTop: 10,
  },
  detailMealDesc: {
    fontSize: 13,
    lineHeight: 18,
    marginTop: 8,
    opacity: 0.8,
  },
  sectionSubTitle: {
    fontSize: 14,
    fontWeight: '900',
  },
  macroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ingredientsBox: {
    borderRadius: 18,
    borderWidth: 1,
    overflow: 'hidden',
  },
  ingRow: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  ingKey: {
    width: '30%',
    fontSize: 11,
    fontWeight: 'bold',
  },
  ingVal: {
    flex: 1,
    fontSize: 11,
    fontWeight: 'bold',
  },
  reviewCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 10,
  },

  // Live tracking page
  mapMock: {
    height: 180,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  agentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 18,
    borderWidth: 1,
  },
  agentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FEF6EC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  agentCallBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: B.green,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  timelineBlock: {
    marginLeft: 10,
  },
  timelineRow: {
    flexDirection: 'row',
  },
  timelineIndicatorColumn: {
    alignItems: 'center',
  },
  timelineNodeLarge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  timelineConnector: {
    width: 2,
    flex: 1,
    marginVertical: -2,
    zIndex: 1,
  },

  // Notification logs
  notiCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    marginBottom: 10,
  },

  // Coupon logs
  couponTile: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
  },

  // Loyalty rewards
  loyaltyProgressBox: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
  },
  progressBarBG: {
    height: 8,
    width: '100%',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },

  // Theme option list
  optionTile: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
  },
  optionLabel: {
    fontSize: 14,
  },

  // Support form fields
  supportForm: {
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
  },

  // Saved addresses list
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
  },

  // Refer banner elements
  shareCodeBox: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },

  // Subscription plan detail settings
  subscriptionDetailsCard: {
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    marginTop: 12,
  },
  statusBadge: {
    fontSize: 9,
    fontWeight: '900',
    color: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  managePlanBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
  },
  tierCard: {
    padding: 14,
    borderRadius: 18,
    borderWidth: 1.5,
  },
  tierCardBtn: {
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 6,
    marginTop: 10,
  },

  // Global floating bottom tabnav styling
  bottomTabContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 24 : 16,
    left: 16,
    right: 16,
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 32,
    borderWidth: 1,
    shadowColor: '#E96A2E',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
    paddingHorizontal: 8,
  },
  tabBtn: {
    flex: 1,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    marginHorizontal: 2,
  },
  tabLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    marginTop: 1,
  },

  // Toast alert styling
  toastContainer: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    zIndex: 999,
  },
  toastGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  toastText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
