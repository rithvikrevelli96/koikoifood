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
  Share,
  PanResponder
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Path, Rect, Ellipse, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import {
  Home as HomeIcon,
  LayoutGrid,
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
  X,
  Search,
  Contact
} from 'lucide-react-native';
import FluidAnimationsDemo from './FluidAnimationsDemo';
import * as Location from 'expo-location';
import * as Contacts from 'expo-contacts';
import * as ImagePicker from 'expo-image-picker';

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
  | 'meal_detail' | 'subscribe_flow' | 'tour_booking'
  | 'notifications' | 'tracking' | 'offers' | 'rewards'
  | 'appearance' | 'support' | 'addresses' | 'payments'
  | 'personal' | 'refer' | 'plans' | 'health_info'
  | 'animation_demo';

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
  // Monday
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
    day: 'Monday',
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
    day: 'Monday',
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
  // Tuesday
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
    day: 'Tuesday',
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
    day: 'Tuesday',
    ingredients: {
      oil: 'Fortune Rice Bran Oil',
      rice: 'Sona Masoori',
      veg: ['Onions', 'Tomatoes', 'Capsicum', 'Ginger-Garlic Paste', 'Coriander'],
      spices: ['Everest Garam Masala', 'MDH Kasuri Methi', 'Turmeric Powder', 'Chilli Powder', 'Cumin Seeds']
    },
    reviews: [
      { id: 501, user: 'Vikas J.', rating: 4, comment: 'Superb high protein meal after my gym session.', date: '1 week ago', verified: true, avatar: 'VJ', helpful: 10 }
    ]
  },
  // Wednesday
  {
    id: 5,
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
    day: 'Wednesday',
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
    id: 6,
    name: 'Butter Chicken + Garlic Naan',
    img: IMG.chicken,
    when: 'dinner',
    type: 'non-veg',
    categories: ['Dinner', 'Chef Specials', 'High Protein', 'North Indian'],
    cal: 620,
    protein: 36,
    carbs: 70,
    fat: 22,
    fiber: 3,
    serving: '450g',
    price: '₹249',
    rating: 4.9,
    reviewsCount: 204,
    time: '7:30 PM',
    desc: 'Tandoori grilled chicken pieces simmered in a smooth, creamy tomato gravy with butter and fresh cream, served with handmade garlic naan.',
    chef: 'Chef Sanjay Kapoor',
    isHealthy: false,
    isAvailableToday: true,
    day: 'Wednesday',
    ingredients: {
      oil: 'Refined Oil',
      veg: ['Tomatoes', 'Garlic', 'Cashew Paste'],
      spices: ['Tandoori Masala', 'Garam Masala'],
      dairy: ['Butter', 'Cream'],
      meat: 'Chicken'
    },
    reviews: []
  },
  // Thursday
  {
    id: 7,
    name: 'Veg Pulao + Mix Veg Raita',
    img: IMG.rice,
    when: 'lunch',
    type: 'veg',
    categories: ['Lunch', 'Healthy', 'South Indian'],
    cal: 340,
    protein: 11,
    carbs: 54,
    fat: 8,
    fiber: 6,
    serving: '400g',
    price: '₹149',
    rating: 4.4,
    reviewsCount: 65,
    time: '12:30 PM',
    desc: 'Fragrant basmati rice cooked with fresh seasonal vegetables, mint, and mild spices, served with a refreshing cucumber-carrot curd raita.',
    chef: 'Chef Amrita Sen',
    isHealthy: true,
    isAvailableToday: true,
    day: 'Thursday',
    ingredients: {
      oil: 'Sunflower Oil',
      rice: 'Basmati Rice',
      veg: ['Carrots', 'Beans', 'Peas', 'Mint'],
      spices: ['Biryani Spices'],
      dairy: ['Curd']
    },
    reviews: []
  },
  {
    id: 8,
    name: 'Hyderabadi Chicken Biryani',
    img: IMG.thali,
    when: 'dinner',
    type: 'non-veg',
    categories: ['Dinner', 'Chef Specials', 'High Protein'],
    cal: 680,
    protein: 42,
    carbs: 85,
    fat: 18,
    fiber: 4,
    serving: '500g',
    price: '₹269',
    rating: 4.9,
    reviewsCount: 312,
    time: '7:30 PM',
    desc: 'Layers of long-grain basmati rice and juicy marinated chicken cooked on Dum in sealed pots with saffron, mint, and brown onions.',
    chef: 'Chef Venkatesh Gowda',
    isHealthy: false,
    isAvailableToday: true,
    day: 'Thursday',
    ingredients: {
      oil: 'Ghee',
      rice: 'Basmati Rice',
      veg: ['Mint', 'Onions', 'Coriander'],
      spices: ['Biryani Masala'],
      meat: 'Fresh Halal Chicken'
    },
    reviews: []
  },
  // Friday
  {
    id: 9,
    name: 'Rajma Masala + Basmati Rice',
    img: IMG.dal,
    when: 'lunch',
    type: 'veg',
    categories: ['Lunch', 'Healthy', 'North Indian'],
    cal: 410,
    protein: 15,
    carbs: 62,
    fat: 10,
    fiber: 8,
    serving: '440g',
    price: '₹149',
    rating: 4.7,
    reviewsCount: 106,
    time: '12:30 PM',
    desc: 'Red kidney beans slow cooked in a thick onion-tomato gravy with ginger-garlic paste and fresh coriander, served with steamed white rice.',
    chef: 'Chef Sanjay Kapoor',
    isHealthy: true,
    isAvailableToday: true,
    day: 'Friday',
    ingredients: {
      oil: 'Mustard Oil',
      rice: 'Basmati Rice',
      veg: ['Onions', 'Tomatoes', 'Ginger-Garlic'],
      spices: ['Turmeric', 'Coriander', 'Jeera']
    },
    reviews: []
  },
  {
    id: 10,
    name: 'Egg Curry + Soft Phulka',
    img: IMG.curry,
    when: 'dinner',
    type: 'egg',
    categories: ['Dinner', 'High Protein', 'South Indian'],
    cal: 430,
    protein: 20,
    carbs: 48,
    fat: 12,
    fiber: 5,
    serving: '410g',
    price: '₹159',
    rating: 4.5,
    reviewsCount: 74,
    time: '7:30 PM',
    desc: 'Boiled eggs cooked in a flavorful coconut-tomato curry base, served along with three freshly blown hot handmade wheat phulkas.',
    chef: 'Chef Venkatesh Gowda',
    isHealthy: true,
    isAvailableToday: true,
    day: 'Friday',
    ingredients: {
      oil: 'Sunflower Oil',
      veg: ['Tomatoes', 'Curry Leaves', 'Onions'],
      spices: ['Chilli Powder', 'Turmeric'],
      flour: 'Whole Wheat Flour'
    },
    reviews: []
  },
  // Saturday
  {
    id: 11,
    name: 'Kadhai Paneer + Butter Naan',
    img: IMG.paneer,
    when: 'lunch',
    type: 'veg',
    categories: ['Lunch', 'North Indian', 'Chef Specials'],
    cal: 480,
    protein: 19,
    carbs: 55,
    fat: 18,
    fiber: 4,
    serving: '430g',
    price: '₹199',
    rating: 4.8,
    reviewsCount: 135,
    time: '12:30 PM',
    desc: 'Paneer cubes tossed with bell peppers and freshly ground kadhai masala spices in an onion-tomato wok gravy, served with soft naan.',
    chef: 'Chef Sanjay Kapoor',
    isHealthy: true,
    isAvailableToday: true,
    day: 'Saturday',
    ingredients: {
      oil: 'Sunflower Oil',
      veg: ['Capsicum', 'Onions', 'Tomatoes'],
      spices: ['Kadhai Masala'],
      dairy: ['Paneer', 'Butter']
    },
    reviews: []
  },
  {
    id: 12,
    name: 'Chicken Masala + Chapati',
    img: IMG.chicken,
    when: 'dinner',
    type: 'non-veg',
    categories: ['Dinner', 'High Protein', 'Andhra'],
    cal: 510,
    protein: 32,
    carbs: 50,
    fat: 12,
    fiber: 4,
    serving: '420g',
    price: '₹209',
    rating: 4.6,
    reviewsCount: 84,
    time: '7:30 PM',
    desc: 'Dhaba style thick chicken curry cooked with dry roasted spices and whole peppercorns, served with three thin soft chapatis.',
    chef: 'Chef Venkatesh Gowda',
    isHealthy: true,
    isAvailableToday: true,
    day: 'Saturday',
    ingredients: {
      oil: 'Groundnut Oil',
      veg: ['Ginger', 'Onions', 'Garlic'],
      spices: ['Dhaba Garam Masala'],
      meat: 'Chicken'
    },
    reviews: []
  },
  // Sunday
  {
    id: 13,
    name: 'Sambar Rice + Veg Poriyal',
    img: IMG.rice,
    when: 'lunch',
    type: 'veg',
    categories: ['Lunch', 'South Indian', 'Healthy'],
    cal: 310,
    protein: 8,
    carbs: 58,
    fat: 6,
    fiber: 8,
    serving: '400g',
    price: '₹139',
    rating: 4.7,
    reviewsCount: 119,
    time: '12:30 PM',
    desc: 'Hot aromatic sambar mashed with rice and served with a side of dry-sautéed cabbage and carrot poriyal topped with fresh coconut.',
    chef: 'Chef Amrita Sen',
    isHealthy: true,
    isAvailableToday: true,
    day: 'Sunday',
    ingredients: {
      oil: 'Coconut Oil',
      rice: 'Sona Masoori',
      veg: ['Cabbage', 'Carrot', 'Pumpkin'],
      spices: ['Sambar Powder', 'Asafoetida', 'Mustard']
    },
    reviews: []
  },
  {
    id: 14,
    name: 'Mutton Curry + Steamed Rice',
    img: IMG.curry,
    when: 'dinner',
    type: 'non-veg',
    categories: ['Dinner', 'High Protein', 'Chef Specials'],
    cal: 610,
    protein: 38,
    carbs: 60,
    fat: 20,
    fiber: 3,
    serving: '450g',
    price: '₹299',
    rating: 4.9,
    reviewsCount: 156,
    time: '7:30 PM',
    desc: 'Tender premium mutton pieces slow braised in a spiced gravy with onions, yoghurt, and rich spices, served with soft basmati rice.',
    chef: 'Chef Sanjay Kapoor',
    isHealthy: false,
    isAvailableToday: true,
    day: 'Sunday',
    ingredients: {
      oil: 'Mustard Oil',
      rice: 'Basmati Rice',
      veg: ['Garlic', 'Ginger', 'Onions'],
      spices: ['Mutton Masala'],
      meat: 'Fresh Halal Mutton'
    },
    reviews: []
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

const MOCK_MAP_LOCATIONS = [
  { id: 1, name: 'Jubilee Hills Road', house: 'Plot 42', landmark: 'Near Metro Station', pincode: '500033', label: 'Jubilee Hills, Hyderabad', x: 25, y: 35 },
  { id: 2, name: 'Indiranagar 100ft Road', house: 'Villa 15', landmark: 'Opposite Metro Pillar 114', pincode: '560038', label: 'Indiranagar, Bengaluru', x: 75, y: 30 },
  { id: 3, name: 'Gachibowli High Street', house: 'Flat 304, Cyber Heights', landmark: 'Beside DLF IT Park', pincode: '500032', label: 'Gachibowli, Hyderabad', x: 30, y: 70 },
  { id: 4, name: 'HSR 27th Main', house: 'Suite 101, Prestige Court', landmark: 'Behind Shell Fuel Station', pincode: '560102', label: 'HSR Layout, Bengaluru', x: 70, y: 75 },
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
    addressLabel: 'Home',
    dob: '',
    gender: 'Male',
    houseNo: '',
    street: '',
    landmark: '',
    pincode: '',
    activityLevel: 'Lightly Active',
    healthGoal: 'Healthy Lifestyle',
    spiceLevel: 'Medium',
    favCuisines: ['South Indian', 'North Indian'] as string[],
    allergies: 'None'
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

  // Lifted UI State (to keep nested render functions completely stateless & hook-free)
  const [selectedFilter, setSelectedFilter] = useState('Both');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedCam, setSelectedCam] = useState(1);

  // Location Map States
  const [showLocationPermission, setShowLocationPermission] = useState(false);
  const [showMapSelection, setShowMapSelection] = useState(false);
  const [selectedMapPinIdx, setSelectedMapPinIdx] = useState(0);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('monthly');
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

  // Pinterest style Menu Carousel Animations and Tabs
  const [activeMealIndex, setActiveMealIndex] = useState(0);
  const [menuActiveTab, setMenuActiveTab] = useState<'recipes' | 'customize'>('recipes');
  // New Location Screen State
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

  // New Health Setup States
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

  const plateScale = useRef(new Animated.Value(1)).current;
  const plateRotate = useRef(new Animated.Value(0)).current;
  const plateFade = useRef(new Animated.Value(1)).current;
  const touchStartRef = useRef(0);
  const touchStartRefY = useRef(0);

  // Derived filtered meals for boundaries
  const currentFilteredMeals = useMemo(() => {
    return MEALS.filter(m => {
      let matchesType = true;
      if (selectedFilter === 'Veg') matchesType = m.type === 'veg';
      else if (selectedFilter === 'Non-Veg') matchesType = m.type === 'non-veg' || m.type === 'egg';

      let matchesCat = true;
      if (selectedCategory !== 'All Menu' && selectedCategory !== 'All Categories') {
        matchesCat = m.categories.includes(selectedCategory);
      }

      return matchesType && matchesCat;
    });
  }, [selectedFilter, selectedCategory]);

  // Adjust active index when filters change
  useEffect(() => {
    if (activeMealIndex >= currentFilteredMeals.length) {
      setActiveMealIndex(0);
    }
  }, [selectedFilter, selectedCategory, currentFilteredMeals.length]);

  // Animate active plate on change
  useEffect(() => {
    plateScale.setValue(0.5);
    plateRotate.setValue(-0.8);
    plateFade.setValue(0.3);

    Animated.parallel([
      Animated.spring(plateScale, {
        toValue: 1,
        friction: 6,
        tension: 30,
        useNativeDriver: true
      }),
      Animated.spring(plateRotate, {
        toValue: 0,
        friction: 7,
        tension: 25,
        useNativeDriver: true
      }),
      Animated.timing(plateFade, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true
      })
    ]).start();
  }, [activeMealIndex]);

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

  // Detect location automatically when moving to Setup 2
  useEffect(() => {
    if (currentScreen === 'setup2') {
      detectCurrentLocation(true);
    }
  }, [currentScreen]);

  const handlePickContact = async () => {
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status !== 'granted') {
        setToast("Contacts permission denied. Please enable it in settings.");
        return;
      }

      if (Platform.OS !== 'web' && typeof Contacts.presentContactPickerAsync === 'function') {
        const contact = await Contacts.presentContactPickerAsync();
        if (contact) {
          setReceiverDetailsName(contact.name || '');
          if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
            setReceiverDetailsPhone(contact.phoneNumbers[0].number || '');
          }
          setToast("Contact selected!");
          return;
        }
      }

      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
      });

      if (data && data.length > 0) {
        setDeviceContacts(data);
      } else {
        setDeviceContacts([
          { id: '1', name: 'Rithvik Revelli', phoneNumbers: [{ number: '+91 7075420121' }] },
          { id: '2', name: 'Amrita Sen', phoneNumbers: [{ number: '+91 9876543210' }] },
          { id: '3', name: 'Nani', phoneNumbers: [{ number: '+91 8185998010' }] },
          { id: '4', name: 'Srinivas Reddy', phoneNumbers: [{ number: '+91 9988776655' }] }
        ]);
      }
      setShowContactsModal(true);
    } catch (error) {
      console.warn("Contact pick failed, showing mocks", error);
      setDeviceContacts([
        { id: '1', name: 'Rithvik Revelli', phoneNumbers: [{ number: '+91 7075420121' }] },
        { id: '2', name: 'Amrita Sen', phoneNumbers: [{ number: '+91 9876543210' }] },
        { id: '3', name: 'Nani', phoneNumbers: [{ number: '+91 8185998010' }] },
        { id: '4', name: 'Srinivas Reddy', phoneNumbers: [{ number: '+91 9988776655' }] }
      ]);
      setShowContactsModal(true);
    }
  };

  const handlePickImage = () => {
    setShowPhotoPicker(true);
  };

  const handleTakePhoto = async () => {
    setShowPhotoPicker(false);
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        setToast("Camera permission is required to take photos.");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setDoorImageUri(result.assets[0].uri);
        setToast("Image captured successfully!");
      }
    } catch (error) {
      console.warn("Failed to launch camera", error);
      setToast("Failed to open camera");
    }
  };

  const handleChooseFromLibrary = async () => {
    setShowPhotoPicker(false);
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        setToast("Gallery permission is required to choose photos.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setDoorImageUri(result.assets[0].uri);
        setToast("Image selected successfully!");
      }
    } catch (error) {
      console.warn("Failed to launch gallery", error);
      setToast("Failed to open gallery");
    }
  };

  const calculateSleepHours = (bed: string, wake: string) => {
    try {
      const [bedH, bedM] = bed.split(':').map(Number);
      const [wakeH, wakeM] = wake.split(':').map(Number);
      if (isNaN(bedH) || isNaN(bedM) || isNaN(wakeH) || isNaN(wakeM)) return "8 hours";
      
      let diffMins = (wakeH * 60 + wakeM) - (bedH * 60 + bedM);
      if (diffMins < 0) {
        diffMins += 24 * 60; // sleep went past midnight
      }
      const hrs = Math.floor(diffMins / 60);
      const mins = diffMins % 60;
      return mins > 0 ? `${hrs}h ${mins}m` : `${hrs} hours`;
    } catch {
      return "8 hours";
    }
  };

  function LocationAccuracyDialog() {
    if (!showLocationDialog) return null;
    return (
      <Modal transparent visible={showLocationDialog} animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
          <View style={{ width: '100%', maxWidth: 320, backgroundColor: t.card, borderRadius: 28, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.25, shadowRadius: 15, elevation: 10, borderWidth: 1, borderColor: t.border }}>
            <View style={{ width: 54, height: 54, borderRadius: 27, backgroundColor: B.orangeL, justifyContent: 'center', alignItems: 'center', marginBottom: 14, alignSelf: 'center' }}>
              <MapPin size={24} color={B.orange} />
            </View>
            <Text style={{ fontSize: 16, fontWeight: '800', color: t.text, textAlign: 'center', marginBottom: 12 }}>
              Enable Location Accuracy
            </Text>
            <Text style={{ fontSize: 13, color: t.sub, textAlign: 'center', marginBottom: 20, lineHeight: 18 }}>
              This app needs location accuracy turned on to position the map pin at your exact delivery spot.
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 12 }}>
              <TouchableOpacity 
                onPress={() => setShowLocationDialog(false)} 
                style={{ paddingVertical: 10, paddingHorizontal: 16, borderRadius: 20, borderWidth: 1, borderColor: t.border }}
              >
                <Text style={{ fontSize: 13, fontWeight: '800', color: t.text }}>No, thanks</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={() => {
                  setShowLocationDialog(false);
                  detectCurrentLocation();
                }} 
                style={{ paddingVertical: 10, paddingHorizontal: 16, borderRadius: 20, backgroundColor: B.orange }}
              >
                <Text style={{ fontSize: 13, fontWeight: '800', color: '#FFFFFF' }}>Enable</Text>
              </TouchableOpacity>
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
              <TouchableOpacity 
                onPress={() => setShowSearchModal(false)} 
                style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: t.surface, borderWidth: 1.5, borderColor: t.border, justifyContent: 'center', alignItems: 'center' }}
              >
                <ArrowLeft size={16} color={t.text} />
              </TouchableOpacity>
              <Text style={{ fontSize: 16, fontWeight: '900', color: t.text }}>Search Location</Text>
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
                  <MapPin size={20} color={B.orange} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 14, fontWeight: '700', color: t.text }}>{item.name}</Text>
                    <Text style={{ fontSize: 12, color: t.muted, marginTop: 2 }}>{item.desc}</Text>
                  </View>
                  <Text style={{ fontSize: 11, fontWeight: 'bold', color: t.muted }}>{item.dist}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <View style={{ alignItems: 'center', marginTop: 40 }}>
                  <Text style={{ color: t.muted }}>No matching locations found</Text>
                </View>
              }
            />
          </SafeAreaView>
        </View>
      </Modal>
    );
  }

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
  
  const cardFloat1 = useRef(new Animated.Value(0)).current;
  const cardFloat2 = useRef(new Animated.Value(0)).current;
  const cardFloat3 = useRef(new Animated.Value(0)).current;

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
      
      cardFloat1.setValue(0);
      cardFloat2.setValue(0);
      cardFloat3.setValue(0);

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

      // Trigger continuous float animation loops
      const floatLoop = Animated.loop(
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
      );
      floatLoop.start();

      const loop1 = Animated.loop(
        Animated.sequence([
          Animated.timing(cardFloat1, { toValue: 1, duration: 2200, useNativeDriver: true }),
          Animated.timing(cardFloat1, { toValue: 0, duration: 2200, useNativeDriver: true }),
        ])
      );
      const loop2 = Animated.loop(
        Animated.sequence([
          Animated.timing(cardFloat2, { toValue: 1, duration: 2600, useNativeDriver: true }),
          Animated.timing(cardFloat2, { toValue: 0, duration: 2600, useNativeDriver: true }),
        ])
      );
      const loop3 = Animated.loop(
        Animated.sequence([
          Animated.timing(cardFloat3, { toValue: 1, duration: 2400, useNativeDriver: true }),
          Animated.timing(cardFloat3, { toValue: 0, duration: 2400, useNativeDriver: true }),
        ])
      );

      loop1.start();
      loop2.start();
      loop3.start();

      // Autoplay timer: auto-advance every 4.5 seconds
      let nextScreen: Screen = 'ob1';
      if (currentScreen === 'ob1') nextScreen = 'ob2';
      else if (currentScreen === 'ob2') nextScreen = 'ob3';
      else nextScreen = 'ob1';

      const timer = setTimeout(() => {
        go(nextScreen);
      }, 4500);

      return () => {
        clearTimeout(timer);
        floatLoop.stop();
        loop1.stop();
        loop2.stop();
        loop3.stop();
      };
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
      <Svg width={250} height={250} viewBox="0 0 100 100">
        {/* Soft circular background glow */}
        <Circle cx={50} cy={50} r={41} fill="#FFF4EA" opacity={0.9} />
        
        {/* Outer decorative sketch rings */}
        <Circle cx={50} cy={50} r={45} fill="none" stroke="#FD5F20" strokeWidth={0.5} strokeDasharray="3 3" opacity={0.6} />
        <Circle cx={50} cy={50} r={43} fill="none" stroke="#312019" strokeWidth={0.3} opacity={0.3} />

        {/* Legs */}
        <Rect x={45} y={66} width={4} height={12} rx={1} fill="#5C4535" stroke="#312019" strokeWidth={1.2} />
        <Rect x={51} y={66} width={4} height={12} rx={1} fill="#5C4535" stroke="#312019" strokeWidth={1.2} />
        
        {/* Torso/Shirt */}
        <Path
          d="M 38 48 C 38 48, 50 44, 62 48 L 60 66 C 60 68, 40 68, 40 66 Z"
          fill="#FD6E20"
          stroke="#312019"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />

        {/* Neck */}
        <Rect x={47} y={43} width={6} height={6} fill="#E8C39E" stroke="#312019" strokeWidth={1.2} />

        {/* Head */}
        <Circle cx={50} cy={35} r={10} fill="#E8C39E" stroke="#312019" strokeWidth={1.5} />
        
        {/* Hair sketch */}
        <Path
          d="M 39 33 C 39 23, 61 23, 61 33 C 58 29, 42 29, 39 33 Z"
          fill="#423026"
          stroke="#312019"
          strokeWidth={1.5}
        />

        {/* Eyes & Smile */}
        <Circle cx={47} cy={34} r={1} fill="#312019" />
        <Circle cx={53} cy={34} r={1} fill="#312019" />
        <Path d="M 48 38 C 49 39.5, 51 39.5, 52 38" stroke="#312019" strokeWidth={1.2} strokeLinecap="round" fill="none" />

        {/* Left Arm holding Tiffin */}
        <Path d="M 40 48 L 30 48 L 30 54" fill="none" stroke="#E8C39E" strokeWidth={4.5} strokeLinecap="round" />
        <Path d="M 40 48 L 30 48 L 30 54" fill="none" stroke="#312019" strokeWidth={1.2} strokeLinecap="round" />
        
        {/* Sketched Tiffin stack */}
        <Rect x={24} y={54} width={12} height={10} rx={2} fill="#B0B0B0" stroke="#312019" strokeWidth={1.2} />
        <Path d="M 24 59 L 36 59" stroke="#312019" strokeWidth={1} />
        {/* Tiffin handle */}
        <Path d="M 26 54 C 26 48, 34 48, 34 54" fill="none" stroke="#312019" strokeWidth={1} />
        {/* Tiffin Steam */}
        <Path d="M 28 46 Q 29 44, 28 42" fill="none" stroke="#FD5F20" strokeWidth={0.8} />
        <Path d="M 32 46 Q 33 44, 32 42" fill="none" stroke="#FD5F20" strokeWidth={0.8} />

        {/* Right Arm holding Delivery Bag */}
        <Path d="M 60 48 L 70 48 L 70 54" fill="none" stroke="#E8C39E" strokeWidth={4.5} strokeLinecap="round" />
        <Path d="M 60 48 L 70 48 L 70 54" fill="none" stroke="#312019" strokeWidth={1.2} strokeLinecap="round" />
        
        {/* Sketched Delivery Bag */}
        <Path d="M 65 54 L 75 54 L 73 66 L 67 66 Z" fill="#E2A25B" stroke="#312019" strokeWidth={1.2} strokeLinejoin="round" />
        <Path d="M 67 54 C 67 50, 73 50, 73 54" fill="none" stroke="#312019" strokeWidth={1} />

      </Svg>
    );
  }

  function DabbasIllustrationSvg() {
    return (
      <Svg width={250} height={250} viewBox="0 0 100 100">
        {/* Soft circular background glow */}
        <Circle cx={50} cy={50} r={41} fill="#FFF4EA" opacity={0.9} />
        
        {/* Outer decorative sketch rings */}
        <Circle cx={50} cy={50} r={45} fill="none" stroke="#FD5F20" strokeWidth={0.5} strokeDasharray="3 3" opacity={0.6} />
        <Circle cx={50} cy={50} r={43} fill="none" stroke="#312019" strokeWidth={0.3} opacity={0.3} />

        {/* Steam sketch */}
        <Path d="M 44 20 Q 46 16, 44 12" fill="none" stroke="#FD6E20" strokeWidth={1} strokeLinecap="round" />
        <Path d="M 50 18 Q 52 14, 50 10" fill="none" stroke="#FD6E20" strokeWidth={1} strokeLinecap="round" />
        <Path d="M 56 20 Q 58 16, 56 12" fill="none" stroke="#FD6E20" strokeWidth={1} strokeLinecap="round" />

        {/* Stacked Dabbas */}
        {/* Bottom Dabba */}
        <Rect x={26} y={64} width={48} height={14} rx={3} fill="#BDC3C7" stroke="#312019" strokeWidth={1.5} />
        <Path d="M 26 67 L 74 67" stroke="#312019" strokeWidth={1} />
        
        {/* Middle Dabba */}
        <Rect x={28} y={49} width={44} height={13} rx={3} fill="#DCDCDC" stroke="#312019" strokeWidth={1.5} />
        <Path d="M 28 52 L 72 52" stroke="#312019" strokeWidth={1} />

        {/* Top Dabba */}
        <Rect x={30} y={34} width={40} height={13} rx={3} fill="#BDC3C7" stroke="#312019" strokeWidth={1.5} />
        <Path d="M 30 37 L 70 37" stroke="#312019" strokeWidth={1} />
        <Ellipse cx={50} cy={40} rx={4} ry={2} fill="#FD5F20" />

        {/* Carrier Frame */}
        <Path
          d="M 50 20 L 50 34"
          fill="none"
          stroke="#312019"
          strokeWidth={1.5}
        />
        <Path
          d="M 28 34 L 28 78 C 28 80, 72 80, 72 78 L 72 34"
          fill="none"
          stroke="#312019"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
        <Path
          d="M 40 34 C 40 25, 60 25, 60 34"
          fill="none"
          stroke="#312019"
          strokeWidth={1.8}
          strokeLinecap="round"
        />
      </Svg>
    );
  }

  function FamilyIllustrationSvg() {
    return (
      <Svg width={250} height={250} viewBox="0 0 100 100">
        {/* Soft circular background glow */}
        <Circle cx={50} cy={50} r={41} fill="#FFF4EA" opacity={0.9} />
        
        {/* Outer decorative sketch rings */}
        <Circle cx={50} cy={50} r={45} fill="none" stroke="#FD5F20" strokeWidth={0.5} strokeDasharray="3 3" opacity={0.6} />
        <Circle cx={50} cy={50} r={43} fill="none" stroke="#312019" strokeWidth={0.3} opacity={0.3} />

        {/* Dad sketch (left) */}
        <Circle cx={34} cy={38} r={8} fill="#E8C39E" stroke="#312019" strokeWidth={1.5} />
        <Path d="M 26 34 C 26 28, 42 28, 42 34 Z" fill="#423026" stroke="#312019" strokeWidth={1.5} />
        <Circle cx={31} cy={37} r={0.8} fill="#312019" />
        <Circle cx={37} cy={37} r={0.8} fill="#312019" />
        <Path d="M 32 41 C 33 42, 35 42, 36 41" stroke="#312019" strokeWidth={1} strokeLinecap="round" fill="none" />
        <Path d="M 22 56 C 22 47, 46 47, 46 56 Z" fill="#3A75C4" stroke="#312019" strokeWidth={1.5} />

        {/* Mom sketch (right) */}
        <Circle cx={66} cy={38} r={8} fill="#E8C39E" stroke="#312019" strokeWidth={1.5} />
        <Path d="M 58 34 C 58 24, 74 24, 74 34 Z" fill="#5C4535" stroke="#312019" strokeWidth={1.5} />
        <Circle cx={63} cy={37} r={0.8} fill="#312019" />
        <Circle cx={69} cy={37} r={0.8} fill="#312019" />
        <Path d="M 64 41 C 65 42, 67 42, 68 41" stroke="#312019" strokeWidth={1} strokeLinecap="round" fill="none" />
        <Path d="M 54 56 C 54 47, 78 47, 78 56 Z" fill="#E65893" stroke="#312019" strokeWidth={1.5} />

        {/* Child sketch (center) */}
        <Circle cx={50} cy={44} r={6} fill="#E8C39E" stroke="#312019" strokeWidth={1.5} />
        <Path d="M 44 41 C 44 36, 56 36, 56 41 Z" fill="#FD852C" stroke="#312019" strokeWidth={1.5} />
        <Circle cx={48} cy={43} r={0.7} fill="#312019" />
        <Circle cx={52} cy={43} r={0.7} fill="#312019" />
        <Path d="M 49 46.5 C 49.5 47, 50.5 47, 51 46.5" stroke="#312019" strokeWidth={1} strokeLinecap="round" fill="none" />
        <Path d="M 41 58 C 41 52, 59 52, 59 58 Z" fill="#52B36D" stroke="#312019" strokeWidth={1.5} />

        {/* Wooden table sketch */}
        <Rect x={12} y={56} width={76} height={6} rx={2} fill="#E2A25B" stroke="#312019" strokeWidth={1.5} />
        {/* Legs */}
        <Rect x={20} y={62} width={5} height={14} fill="#C68E5B" stroke="#312019" strokeWidth={1.2} />
        <Rect x={75} y={62} width={5} height={14} fill="#C68E5B" stroke="#312019" strokeWidth={1.2} />

        {/* Plate / Cup sketch on table */}
        <Path d="M 44 56 C 44 54, 56 54, 56 56 Z" fill="#FFFFFF" stroke="#312019" strokeWidth={1.2} />
      </Svg>
    );
  }

  function RenderSplash() {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFFDF9', alignItems: 'center', justifyContent: 'center' }}>
        <LinearGradient
          colors={['#FED6B3', '#FFFDF9', '#FFF1E5']}
          locations={[0, 0.45, 1.0]}
          style={{ width: '100%', height: '100%', flex: 1, alignItems: 'center' }}
        >
          <View style={{ width: '100%', maxWidth: 450, height: '100%', flex: 1, paddingTop: Platform.OS === 'ios' ? 60 : 40, justifyContent: 'space-between', position: 'relative' }}>
            
            {/* ─── BACKGROUND LINE ART SKETCHES ─── */}
            
            {/* Top-right delicate flower line art sketch */}
            <View style={{ position: 'absolute', top: 40, right: -10, opacity: 0.08 }} pointerEvents="none">
              <Svg width={160} height={160} viewBox="0 0 100 100" fill="none" stroke="#FD5F20" strokeWidth={0.8}>
                <Circle cx={50} cy={50} r={6} />
                <Path d="M 50 44 C 40 25, 60 25, 50 44 Z" />
                <Path d="M 50 56 C 40 75, 60 75, 50 56 Z" />
                <Path d="M 44 50 C 25 40, 25 60, 44 50 Z" />
                <Path d="M 56 50 C 75 40, 75 60, 56 50 Z" />
                <Path d="M 45 45 C 30 30, 45 15, 45 45 Z" />
                <Path d="M 55 55 C 70 70, 55 85, 55 55 Z" />
                <Path d="M 55 45 C 70 30, 85 45, 55 45 Z" />
                <Path d="M 45 55 C 30 70, 15 55, 45 55 Z" />
              </Svg>
            </View>

            {/* Middle-left leaf outline sketch */}
            <View style={{ position: 'absolute', top: 260, left: -20, opacity: 0.05, transform: [{ rotate: '45deg' }] }} pointerEvents="none">
              <Svg width={130} height={130} viewBox="0 0 100 100" fill="none" stroke="#FD5F20" strokeWidth={0.8}>
                <Path d="M 10 90 Q 50 50, 90 10" />
                <Path d="M 50 50 Q 75 25, 90 40" />
                <Path d="M 30 70 Q 50 55, 60 65" />
                <Path d="M 10 90 C 25 70, 40 75, 50 50 C 65 30, 70 25, 90 10" />
              </Svg>
            </View>

            {/* ─── ATMOSPHERIC LUSH FOLIAGE & FLOATING ELEMENTS ─── */}
            
            {/* Top-left high-fidelity lush leaf branch */}
            <View style={{ position: 'absolute', top: 0, left: -20, opacity: 0.85 }} pointerEvents="none">
              <Svg width={160} height={200} viewBox="0 0 100 100" fill="none">
                {/* Curved branch stem */}
                <Path
                  d="M 0 -10 C 15 15, 30 30, 45 50"
                  stroke="#607D3B"
                  strokeWidth={3}
                  strokeLinecap="round"
                />
                {/* Lush stacked leaves with organic green gradients */}
                <Path d="M 5 8 C 15 2, 22 8, 18 18 C 10 18, 6 12, 5 8 Z" fill="#5A8833" />
                <Path d="M 5 8 Q 12 11 18 18" stroke="#37551D" strokeWidth={0.8} />

                <Path d="M 12 22 C 26 18, 28 26, 21 34 C 13 32, 10 27, 12 22 Z" fill="#7CA54E" />
                <Path d="M 12 22 Q 18 26 21 34" stroke="#4C682E" strokeWidth={0.8} />

                <Path d="M 24 15 C 33 8, 38 15, 34 24 C 27 24, 23 20, 24 15 Z" fill="#66943C" />
                <Path d="M 24 15 Q 29 18 34 24" stroke="#3D5B23" strokeWidth={0.8} />

                <Path d="M 30 34 C 44 32, 45 40, 37 47 C 29 45, 27 40, 30 34 Z" fill="#88B856" />
                <Path d="M 30 34 Q 34 39 37 47" stroke="#547732" strokeWidth={0.8} />

                <Path d="M 40 46 C 50 48, 48 56, 40 60 C 35 56, 36 51, 40 46 Z" fill="#75A449" />
                <Path d="M 40 46 Q 41 52 40 60" stroke="#46662B" strokeWidth={0.8} />

                {/* Additional overlay leaves */}
                <Path d="M 1 18 C -3 10, 5 8, 8 13 C 5 16, 2 19, 1 18 Z" fill="#4B7229" />
                <Path d="M 16 35 C 22 28, 28 32, 25 38 C 19 40, 16 38, 16 35 Z" fill="#8BB95C" />
                <Path d="M 28 48 C 34 42, 38 45, 36 51 C 30 53, 28 51, 28 48 Z" fill="#5A8833" />
              </Svg>
            </View>

            {/* Scattered Floating leaf (Top right near logo, with soft drop-shadow) */}
            <View style={{ 
              position: 'absolute', 
              top: 220, 
              right: 35, 
              opacity: 0.7, 
              transform: [{ rotate: '45deg' }],
              shadowColor: '#000',
              shadowOffset: { width: 1, height: 2 },
              shadowOpacity: 0.12,
              shadowRadius: 3,
              elevation: 2
            }} pointerEvents="none">
              <Svg width={18} height={18} viewBox="0 0 20 20" fill="none">
                <Path d="M2 18 C6 10, 14 12, 18 2 C10 10, 10 14, 2 18 Z" fill="#7FA457" />
              </Svg>
            </View>

            {/* Scattered Floating leaf (Middle left near food, with soft drop-shadow) */}
            <View style={{ 
              position: 'absolute', 
              top: 280, 
              left: 15, 
              opacity: 0.65, 
              transform: [{ rotate: '-45deg' }],
              shadowColor: '#000',
              shadowOffset: { width: 1, height: 2 },
              shadowOpacity: 0.12,
              shadowRadius: 3,
              elevation: 2
            }} pointerEvents="none">
              <Svg width={19} height={19} viewBox="0 0 20 20" fill="none">
                <Path d="M2 18 C6 10, 14 12, 18 2 C10 10, 10 14, 2 18 Z" fill="#6A8E49" />
              </Svg>
            </View>

            {/* Scattered Floating leaf (Bottom left) */}
            <View style={{ position: 'absolute', top: 490, left: 35, opacity: 0.6, transform: [{ rotate: '120deg' }] }} pointerEvents="none">
              <Svg width={22} height={22} viewBox="0 0 20 20" fill="none">
                <Path d="M2 18 C6 10, 14 12, 18 2 C10 10, 10 14, 2 18 Z" fill="#7FA457" />
              </Svg>
            </View>

            {/* Floating spice coriander seeds (with 3D drop-shadow effects) */}
            <View style={{ 
              position: 'absolute', 
              top: 220, 
              left: 30, 
              opacity: 0.75,
              shadowColor: '#000',
              shadowOffset: { width: 1, height: 1.5 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 1
            }} pointerEvents="none">
              <Svg width={8} height={8} viewBox="0 0 10 10">
                <Ellipse cx={5} cy={5} rx={3} ry={4} fill="#C69E7C" transform="rotate(30 5 5)" />
              </Svg>
            </View>
            <View style={{ 
              position: 'absolute', 
              top: 380, 
              left: 50, 
              opacity: 0.8,
              shadowColor: '#000',
              shadowOffset: { width: 1, height: 1.5 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 1
            }} pointerEvents="none">
              <Svg width={9} height={9} viewBox="0 0 10 10">
                <Ellipse cx={5} cy={5} rx={3.5} ry={4.5} fill="#B08661" transform="rotate(-40 5 5)" />
              </Svg>
            </View>
            <View style={{ 
              position: 'absolute', 
              top: 420, 
              right: 180, 
              opacity: 0.8,
              shadowColor: '#000',
              shadowOffset: { width: 1, height: 1.5 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 1
            }} pointerEvents="none">
              <Svg width={7} height={7} viewBox="0 0 10 10">
                <Ellipse cx={5} cy={5} rx={2.8} ry={3.8} fill="#C69E7C" transform="rotate(15 5 5)" />
              </Svg>
            </View>

            {/* ─── HEADER (Logo & Brand Title) ─── */}
            <Animated.View style={{ 
              alignItems: 'center', 
              marginTop: 20,
              paddingHorizontal: 24,
              opacity: splashFade,
              transform: [
                { scale: splashScale },
                { translateY: splashTranslateY }
              ]
            }}>
              {/* Orange Squircle Logo matching the mockup precisely */}
              <View style={{
                width: 90,
                height: 90,
                borderRadius: 28,
                backgroundColor: '#FD5F20',
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#FD5F20',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.3,
                shadowRadius: 14,
                elevation: 6,
                marginBottom: 16
              }}>
                {/* White Stacked Dabba Icon with thicker outline strokes */}
                <Svg width={54} height={54} viewBox="0 0 100 100" fill="none">
                  {/* Top handle */}
                  <Path
                    d="M 32 32 C 32 15, 68 15, 68 32"
                    stroke="#FFFFFF"
                    strokeWidth={6.5}
                    strokeLinecap="round"
                  />
                  {/* Outer Frame carrier sides */}
                  <Path
                    d="M 28 32 L 28 78 C 28 82, 32 84, 36 84 L 64 84 C 68 84, 72 82, 72 78 L 72 32"
                    stroke="#FFFFFF"
                    strokeWidth={6.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* 3 Stacked boxes inside */}
                  <Rect x={34} y={35} width={32} height={12} rx={4} fill="#FFFFFF" />
                  <Rect x={34} y={50} width={32} height={12} rx={4} fill="#FFFFFF" />
                  <Rect x={34} y={65} width={32} height={12} rx={4} fill="#FFFFFF" />
                  
                  {/* Central carrying strap */}
                  <Path
                    d="M 50 32 L 50 82"
                    stroke="#FD5F20"
                    strokeWidth={4.5}
                  />
                  
                  {/* Tiny heart on top right */}
                  <Path
                    d="M 80 22 C 80 22, 77.5 20, 77.5 18.5 C 77.5 17.3, 78.5 16.6, 79.4 16.6 C 79.8 16.6, 80 17, 80 17 C 80 17, 80.2 16.6, 80.6 16.6 C 81.5 16.6, 82.5 17.3, 82.5 18.5 C 82.5 22, 80 22, 80 22 Z"
                    fill="#FFFFFF"
                  />
                </Svg>
              </View>

              {/* KOI KOI Title text */}
              <Text style={{ fontSize: 14, fontWeight: '900', color: '#FD5F20', letterSpacing: 6, marginBottom: 2 }}>
                KOI KOI
              </Text>
              
              {/* DABBA main title */}
              <Text style={{ fontSize: 54, fontWeight: '900', color: '#312019', letterSpacing: 1 }}>
                DABBA
              </Text>

              {/* Divider Ornament with Heart */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
                <View style={{ width: 22, height: 1.2, backgroundColor: '#FD5F20', opacity: 0.4 }} />
                <Heart size={11} color="#FD5F20" fill="#FD5F20" style={{ marginHorizontal: 10 }} />
                <View style={{ width: 22, height: 1.2, backgroundColor: '#FD5F20', opacity: 0.4 }} />
              </View>

              {/* Tagline */}
              <Text style={{ fontSize: 16.5, color: '#5A4A41', fontWeight: '600', textAlign: 'center' }}>
                Home-Style Meals.
              </Text>
              <Text style={{ fontSize: 16.5, color: '#FD5F20', fontWeight: '700', textAlign: 'center', marginTop: 1 }}>
                Delivered Daily.
              </Text>
            </Animated.View>

            {/* ─── CENTERPIECE IMAGE CARD FRAME (with overlapping leaves) ─── */}
            <Animated.View style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 12,
              opacity: splashFade,
              transform: [{ scale: splashScale }],
              width: '100%',
              paddingHorizontal: 24,
              position: 'relative',
            }}>
              {/* Card Container Frame */}
              <View style={{
                width: '100%',
                height: 290,
                borderRadius: 24,
                backgroundColor: '#FFFFFF',
                borderWidth: 2,
                borderColor: '#FFFFFF',
                overflow: 'hidden',
                shadowColor: '#7A6455',
                shadowOffset: { width: 0, height: 12 },
                shadowOpacity: 0.16,
                shadowRadius: 16,
                elevation: 8,
              }}>
                <Image
                  source={require('./assets/splash_food.png')}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="cover"
                />
              </View>

              {/* Overlapping Leaf SVGs to give a premium 3D layered look */}
              
              {/* Top-right leaf branch overlapping the card border */}
              <View style={{ position: 'absolute', top: -14, right: 12, zIndex: 10 }} pointerEvents="none">
                <Svg width={46} height={46} viewBox="0 0 24 24" fill="none">
                  {/* Stem */}
                  <Path d="M2 22 C10 18, 15 15, 20 6" stroke="#607D3B" strokeWidth={1.8} strokeLinecap="round" />
                  {/* Top leaf */}
                  <Path
                    d="M20 6 C22 2, 17 2, 13 6 C13 6, 17 8, 20 6 Z"
                    fill="#7CA54E"
                  />
                  <Path d="M13 6 Q16.5 6 20 6" stroke="#3D522B" strokeWidth={0.5} />
                  {/* Side leaf */}
                  <Path
                    d="M11 12 C14 9, 12 6, 8 9 C8 9, 9 12, 11 12 Z"
                    fill="#5A8833"
                  />
                </Svg>
              </View>

              {/* Bottom-left leaf overlapping the card border */}
              <View style={{ position: 'absolute', bottom: -12, left: 14, zIndex: 10, transform: [{ rotate: '-80deg' }] }} pointerEvents="none">
                <Svg width={38} height={38} viewBox="0 0 24 24" fill="none">
                  {/* Stem */}
                  <Path d="M22 2 C14 6, 9 9, 4 18" stroke="#607D3B" strokeWidth={1.8} strokeLinecap="round" />
                  {/* Tip leaf */}
                  <Path
                    d="M4 18 C2 22, 7 22, 11 18 C11 18, 7 16, 4 18 Z"
                    fill="#88B856"
                  />
                  <Path d="M11 18 Q7.5 18 4 18" stroke="#546E3A" strokeWidth={0.5} />
                  {/* Side leaf */}
                  <Path
                    d="M13 12 C10 15, 12 18, 16 15 C16 15, 15 12, 13 12 Z"
                    fill="#75A449"
                  />
                </Svg>
              </View>
            </Animated.View>

            {/* ─── BOTTOM HIGHLIGHTS (4 Pillars) ─── */}
            <Animated.View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              paddingHorizontal: 24,
              marginBottom: 110, // Leave space for footer wave
              opacity: splashFade,
            }}>
              {/* Homemade with Love */}
              <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: '#FFFFFF',
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#A05020',
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 4,
                  borderWidth: 1,
                  borderColor: '#FFEFE5'
                }}>
                  {/* Filled orange organic leaf pointing up-left */}
                  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M21 3 C11.5 3, 5.5 9, 3 17 C4.5 19.5, 9.5 21, 14.5 18 C18.5 15, 20.5 8, 21 3 Z"
                      fill="#FD5F20"
                    />
                    <Path
                      d="M3 17 C7.5 14, 14.5 10, 21 3"
                      stroke="#FFFFFF"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                    />
                  </Svg>
                </View>
                <Text style={{ fontSize: 9.5, fontWeight: '700', color: '#4A3C34', textAlign: 'center', lineHeight: 13, marginTop: 8 }}>
                  {"Homemade\nwith Love"}
                </Text>
              </View>

              {/* Fresh & Hygienic */}
              <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: '#FFFFFF',
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#A05020',
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 4,
                  borderWidth: 1,
                  borderColor: '#FFEFE5'
                }}>
                  {/* Symmetrical 4-leaf flower/clover sprout SVG */}
                  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
                    <Circle cx={12} cy={8} r={3.5} fill="#FD5F20" />
                    <Circle cx={12} cy={16} r={3.5} fill="#FD5F20" />
                    <Circle cx={8} cy={12} r={3.5} fill="#FD5F20" />
                    <Circle cx={16} cy={12} r={3.5} fill="#FD5F20" />
                    <Circle cx={12} cy={12} r={1.5} fill="#FFFFFF" />
                  </Svg>
                </View>
                <Text style={{ fontSize: 9.5, fontWeight: '700', color: '#4A3C34', textAlign: 'center', lineHeight: 13, marginTop: 8 }}>
                  {"Fresh &\nHygienic"}
                </Text>
              </View>

              {/* Steel Dabbas No Plastic */}
              <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: '#FFFFFF',
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#A05020',
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 4,
                  borderWidth: 1,
                  borderColor: '#FFEFE5'
                }}>
                  {/* Clean stacked 3 tiffin dabbas SVG */}
                  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
                    {/* Top carrying strap handle */}
                    <Path
                      d="M 8 6 C 8 3, 16 3, 16 6"
                      stroke="#FD5F20"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      fill="none"
                    />
                    {/* Stack of 3 containers */}
                    <Rect x={6} y={6} width={12} height={4} rx={1.2} fill="#FD5F20" />
                    <Rect x={6} y={11} width={12} height={4} rx={1.2} fill="#FD5F20" />
                    <Rect x={6} y={16} width={12} height={4} rx={1.2} fill="#FD5F20" />
                    {/* Central carrying strap */}
                    <Path
                      d="M 12 4 L 12 20"
                      stroke="#FD5F20"
                      strokeWidth={1.2}
                      strokeLinecap="round"
                      opacity={0.8}
                    />
                  </Svg>
                </View>
                <Text style={{ fontSize: 9.5, fontWeight: '700', color: '#4A3C34', textAlign: 'center', lineHeight: 13, marginTop: 8 }}>
                  {"Steel Dabbas\nNo Plastic"}
                </Text>
              </View>

              {/* Healthy Everyday */}
              <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: '#FFFFFF',
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#A05020',
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 4,
                  borderWidth: 1,
                  borderColor: '#FFEFE5'
                }}>
                  <Heart size={20} color="#FD5F20" strokeWidth={2.2} />
                </View>
                <Text style={{ fontSize: 9.5, fontWeight: '700', color: '#4A3C34', textAlign: 'center', lineHeight: 13, marginTop: 8 }}>
                  {"Healthy\nEveryday"}
                </Text>
              </View>
            </Animated.View>

            {/* ─── BOTTOM WAVE FOOTER WITH RICH THREE-STOP GRADIENT & LEAF SKETCH ─── */}
            <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 110, overflow: 'hidden' }} pointerEvents="none">
              <Svg width="100%" height={110} viewBox="0 0 400 110" preserveAspectRatio="none">
                <Defs>
                  <SvgLinearGradient id="orangeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <Stop offset="0%" stopColor="#FF852C" />
                    <Stop offset="50%" stopColor="#FD4F1B" />
                    <Stop offset="100%" stopColor="#DE3500" />
                  </SvgLinearGradient>
                </Defs>
                <Path
                  d="M0 55 C 120 85, 280 75, 400 42 L 400 110 L 0 110 Z"
                  fill="url(#orangeGrad)"
                />
              </Svg>
              {/* Elegant white outline leaf branch sketch positioned absolutely */}
              <View style={{ position: 'absolute', bottom: 12, right: 18 }}>
                <Svg width={40} height={40} viewBox="0 0 40 40" fill="none" stroke="rgba(255, 255, 255, 0.45)" strokeWidth={1.5}>
                  {/* Stem */}
                  <Path d="M5 35 Q 20 20, 32 10" />
                  {/* Leaf 1 (top right) */}
                  <Path d="M 32 10 C 35 4, 30 2, 24 8 C 24 14, 28 16, 32 10 Z" />
                  {/* Leaf 2 (middle left) */}
                  <Path d="M 18 22 C 10 24, 8 20, 14 14 C 18 14, 20 18, 18 22 Z" />
                  {/* Leaf 3 (middle right) */}
                  <Path d="M 22 18 C 28 12, 30 14, 26 20 C 22 22, 20 20, 22 18 Z" />
                </Svg>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }


  // 2. Onboarding Screen Shell
  function RenderOnboarding({ step }: { step: number }) {
    let title = '';
    let descComponent: React.ReactNode = null;
    let btnText = '';
    let SvgIllustration = BoyIllustrationSvg;

    if (step === 1) {
      title = "Healthy\nHome-Style Meals";
      descComponent = (
        <Text>
          Freshly prepared lunch and dinner cooked every day — <Text style={{ color: '#FD5F20', fontWeight: '800' }}>delivered warm</Text> to your doorstep.
        </Text>
      );
      btnText = "Get Started";
      SvgIllustration = BoyIllustrationSvg;
    } else if (step === 2) {
      title = "Fresh Food.\nSteel Dabbas.";
      descComponent = (
        <Text>
          Hygienic meals in reusable steel containers. Zero plastic, maximum freshness, right on time every day.
        </Text>
      );
      btnText = "Continue";
      SvgIllustration = DabbasIllustrationSvg;
    } else {
      title = "Subscribe Once.\nEat Every Day.";
      descComponent = (
        <Text>
          Choose your plan and relax. Pause, skip or resume anytime — complete flexibility, zero stress.
        </Text>
      );
      btnText = "Let's Begin";
      SvgIllustration = FamilyIllustrationSvg;
    }

    const handleNext = () => {
      if (step === 1) go('ob2');
      else if (step === 2) go('ob3');
      else go('auth'); // Go to auth screen for login/signup
    };

    const floatY = obFloatAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -12]
    });

    const cardY1 = cardFloat1.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -12]
    });
    const cardY2 = cardFloat2.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -8]
    });
    const cardY3 = cardFloat3.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -14]
    });

    // Floating Cards data for each step (Title + Icon below it)
    let card1Data = { label: '', icon: null as React.ReactNode, top: 0, left: -25 };
    let card2Data = { label: '', icon: null as React.ReactNode, top: 45, right: -25 };
    let card3Data = { label: '', icon: null as React.ReactNode, bottom: -10, left: 10 };

    if (step === 1) {
      card1Data.label = "Daily Rotation";
      card1Data.icon = <Calendar size={18} color="#FD5F20" strokeWidth={2.5} />;
      
      card2Data.label = "Low Salt & Oil";
      card2Data.icon = <Heart size={18} color="#FD5F20" strokeWidth={2.5} />;

      card3Data.label = "Homestyle Cooking";
      card3Data.icon = <ChefHat size={18} color="#FD5F20" strokeWidth={2.5} />;
    } else if (step === 2) {
      card1Data.label = "Food-Grade Steel";
      card1Data.icon = <ShieldCheck size={18} color="#FD5F20" strokeWidth={2.5} />;

      card2Data.label = "Thermal Sanitized";
      card2Data.icon = <Sparkles size={18} color="#FD5F20" strokeWidth={2.5} />;

      card3Data.label = "Zero Plastic";
      card3Data.icon = <Leaf size={18} color="#FD5F20" strokeWidth={2.5} />;
    } else {
      card1Data.label = "Pause Anytime";
      card1Data.icon = <Pause size={18} color="#FD5F20" strokeWidth={2.5} />;

      card2Data.label = "Custom Portions";
      card2Data.icon = <Sparkles size={18} color="#FD5F20" strokeWidth={2.5} />;

      card3Data.label = "No Lock-ins";
      card3Data.icon = <Lock size={18} color="#FD5F20" strokeWidth={2.5} />;
    }

    return (
      <View style={{ flex: 1, backgroundColor: '#FFFDF9', alignItems: 'center', justifyContent: 'center' }}>
        <LinearGradient
          colors={['#FED6B3', '#FFFDF9', '#FFF1E5']}
          locations={[0, 0.45, 1.0]}
          style={{ width: '100%', height: '100%', flex: 1 }}
        >
          {/* ─── ATMOSPHERIC DECORATIONS (Floating Leaves & Spices) ─── */}
          
          {/* Top-left high-fidelity lush leaf branch */}
          <View style={{ position: 'absolute', top: 0, left: -20, opacity: 0.85 }} pointerEvents="none">
            <Svg width={160} height={200} viewBox="0 0 100 100" fill="none">
              <Path
                d="M 0 -10 C 15 15, 30 30, 45 50"
                stroke="#607D3B"
                strokeWidth={3}
                strokeLinecap="round"
              />
              <Path d="M 5 8 C 15 2, 22 8, 18 18 C 10 18, 6 12, 5 8 Z" fill="#5A8833" />
              <Path d="M 5 8 Q 12 11 18 18" stroke="#37551D" strokeWidth={0.8} />
              <Path d="M 12 22 C 26 18, 28 26, 21 34 C 13 32, 10 27, 12 22 Z" fill="#7CA54E" />
              <Path d="M 12 22 Q 18 26 21 34" stroke="#4C682E" strokeWidth={0.8} />
              <Path d="M 24 15 C 33 8, 38 15, 34 24 C 27 24, 23 20, 24 15 Z" fill="#66943C" />
              <Path d="M 24 15 Q 29 18 34 24" stroke="#3D5B23" strokeWidth={0.8} />
              <Path d="M 30 34 C 44 32, 45 40, 37 47 C 29 45, 27 40, 30 34 Z" fill="#88B856" />
              <Path d="M 30 34 Q 34 39 37 47" stroke="#547732" strokeWidth={0.8} />
              <Path d="M 40 46 C 50 48, 48 56, 40 60 C 35 56, 36 51, 40 46 Z" fill="#75A449" />
              <Path d="M 40 46 Q 41 52 40 60" stroke="#46662B" strokeWidth={0.8} />
              <Path d="M 1 18 C -3 10, 5 8, 8 13 C 5 16, 2 19, 1 18 Z" fill="#4B7229" />
              <Path d="M 16 35 C 22 28, 28 32, 25 38 C 19 40, 16 38, 16 35 Z" fill="#8BB95C" />
              <Path d="M 28 48 C 34 42, 38 45, 36 51 C 30 53, 28 51, 28 48 Z" fill="#5A8833" />
            </Svg>
          </View>

          {/* Top-right flower sketch */}
          <View style={{ position: 'absolute', top: 40, right: -10, opacity: 0.08 }} pointerEvents="none">
            <Svg width={160} height={160} viewBox="0 0 100 100" fill="none" stroke="#FD5F20" strokeWidth={0.8}>
              <Circle cx={50} cy={50} r={6} />
              <Path d="M 50 44 C 40 25, 60 25, 50 44 Z" />
              <Path d="M 50 56 C 40 75, 60 75, 50 56 Z" />
              <Path d="M 44 50 C 25 40, 25 60, 44 50 Z" />
              <Path d="M 56 50 C 75 40, 75 60, 56 50 Z" />
              <Path d="M 45 45 C 30 30, 45 15, 45 45 Z" />
              <Path d="M 55 55 C 70 70, 55 85, 55 55 Z" />
              <Path d="M 55 45 C 70 30, 85 45, 55 45 Z" />
              <Path d="M 45 55 C 30 70, 15 55, 45 55 Z" />
            </Svg>
          </View>

          {/* Floating leaves and seeds with shadows */}
          <View style={{ 
            position: 'absolute', 
            top: 220, 
            right: 35, 
            opacity: 0.65, 
            transform: [{ rotate: '45deg' }],
            shadowColor: '#000',
            shadowOffset: { width: 1, height: 2 },
            shadowOpacity: 0.12,
            shadowRadius: 3,
            elevation: 2
          }} pointerEvents="none">
            <Svg width={18} height={18} viewBox="0 0 20 20" fill="none">
              <Path d="M2 18 C6 10, 14 12, 18 2 C10 10, 10 14, 2 18 Z" fill="#7FA457" />
            </Svg>
          </View>

          <View style={{ 
            position: 'absolute', 
            top: 400, 
            right: 55, 
            opacity: 0.55, 
            transform: [{ rotate: '-30deg' }],
            shadowColor: '#000',
            shadowOffset: { width: 1, height: 2 },
            shadowOpacity: 0.12,
            shadowRadius: 3,
            elevation: 2
          }} pointerEvents="none">
            <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
              <Path d="M2 18 C6 10, 14 12, 18 2 C10 10, 10 14, 2 18 Z" fill="#6A8E49" />
            </Svg>
          </View>

          <View style={{ 
            position: 'absolute', 
            top: 220, 
            left: 30, 
            opacity: 0.75,
            shadowColor: '#000',
            shadowOffset: { width: 1, height: 1.5 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 1
          }} pointerEvents="none">
            <Svg width={8} height={8} viewBox="0 0 10 10">
              <Ellipse cx={5} cy={5} rx={3} ry={4} fill="#C69E7C" transform="rotate(30 5 5)" />
            </Svg>
          </View>

          {/* Subtle sketched rolling pin outline on the middle-left */}
          <View style={{ position: 'absolute', top: '35%', left: 12, opacity: 0.08 }} pointerEvents="none">
            <Svg width={40} height={120} viewBox="0 0 20 60" fill="none" stroke="#FD5F20" strokeWidth={1}>
              {/* Rolling pin sketch */}
              <Path d="M10 2 L10 10 M8 10 L12 10 L12 50 L8 50 Z M10 50 L10 58" />
            </Svg>
          </View>

          {/* Subtle sketched cooking pot outline on the middle-right */}
          <View style={{ position: 'absolute', top: '30%', right: 12, opacity: 0.08 }} pointerEvents="none">
            <Svg width={65} height={65} viewBox="0 0 40 40" fill="none" stroke="#FD5F20" strokeWidth={1}>
              {/* Pot sketch */}
              <Path d="M 6 18 L 34 18 L 32 32 C 32 34, 8 34, 8 32 Z" />
              <Path d="M 4 18 C 4 18, 20 12, 36 18" />
              <Path d="M 20 12 L 20 9" />
              <Circle cx={20} cy={8} r={1.5} />
              <Path d="M 4 22 L 2 22 C 1 22, 1 20, 2 20 L 4 20" />
              <Path d="M 36 22 L 38 22 C 39 22, 39 20, 38 20 L 36 20" />
            </Svg>
          </View>

          <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, paddingHorizontal: 24, justifyContent: 'space-between', paddingTop: 10, paddingBottom: 105, position: 'relative' }}>
              
              {/* Top Row: Skip button aligned to top-right */}
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '100%' }}>
                <TouchableOpacity onPress={() => go('home')} style={{ paddingHorizontal: 4, paddingVertical: 4 }}>
                  <Text style={{ fontSize: 16, fontWeight: '700', color: '#FD5F20' }}>Skip</Text>
                </TouchableOpacity>
              </View>

              {/* Middle Section: Centered Sketched Illustration with float loop animation and absolute highlight cards */}
              <Animated.View style={{ 
                flex: 1.5,
                justifyContent: 'center', 
                alignItems: 'center', 
                opacity: obFade,
                transform: [
                  { translateY: floatY },
                  { scale: obScale }
                ],
                marginVertical: 20,
                position: 'relative',
                width: 280,
                height: 280,
                alignSelf: 'center',
              }}>
                <SvgIllustration />

                {/* Floating Card 1 */}
                <Animated.View style={{
                  position: 'absolute',
                  top: card1Data.top,
                  left: card1Data.left,
                  backgroundColor: '#FFFFFF',
                  borderWidth: 1.5,
                  borderColor: '#FFEEDB',
                  borderRadius: 16,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  alignItems: 'center',
                  gap: 6,
                  shadowColor: '#A05020',
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: 0.08,
                  shadowRadius: 8,
                  elevation: 4,
                  transform: [{ translateY: cardY1 }],
                }}>
                  <Text style={{ fontSize: 10, fontWeight: '900', color: '#13352C', letterSpacing: 0.2 }}>{card1Data.label}</Text>
                  {card1Data.icon}
                </Animated.View>

                {/* Floating Card 2 */}
                <Animated.View style={{
                  position: 'absolute',
                  top: card2Data.top,
                  right: card2Data.right,
                  backgroundColor: '#FFFFFF',
                  borderWidth: 1.5,
                  borderColor: '#FFEEDB',
                  borderRadius: 16,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  alignItems: 'center',
                  gap: 6,
                  shadowColor: '#A05020',
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: 0.08,
                  shadowRadius: 8,
                  elevation: 4,
                  transform: [{ translateY: cardY2 }],
                }}>
                  <Text style={{ fontSize: 10, fontWeight: '900', color: '#13352C', letterSpacing: 0.2 }}>{card2Data.label}</Text>
                  {card2Data.icon}
                </Animated.View>

                {/* Floating Card 3 */}
                <Animated.View style={{
                  position: 'absolute',
                  bottom: card3Data.bottom,
                  left: card3Data.left,
                  backgroundColor: '#FFFFFF',
                  borderWidth: 1.5,
                  borderColor: '#FFEEDB',
                  borderRadius: 16,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  alignItems: 'center',
                  gap: 6,
                  shadowColor: '#A05020',
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: 0.08,
                  shadowRadius: 8,
                  elevation: 4,
                  transform: [{ translateY: cardY3 }],
                }}>
                  <Text style={{ fontSize: 10, fontWeight: '900', color: '#13352C', letterSpacing: 0.2 }}>{card3Data.label}</Text>
                  {card3Data.icon}
                </Animated.View>
              </Animated.View>

              {/* Tagline details - Left Aligned, Premium Serif Title, Dark Green/Slate color */}
              <View style={{ width: '100%', alignItems: 'flex-start', paddingHorizontal: 4, marginVertical: 15, gap: 12 }}>
                {/* Indicator Dots - Left Aligned */}
                <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center', marginBottom: 4 }}>
                  {[1, 2, 3].map(i => {
                    const isActive = i === step;
                    return (
                      <View
                        key={i}
                        style={{
                          width: isActive ? 24 : 8,
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: isActive ? '#0C3327' : '#D0DCD8',
                        }}
                      />
                    );
                  })}
                </View>

                {/* Title */}
                <Animated.Text style={{ 
                  fontSize: Platform.OS === 'ios' ? 38 : 35, 
                  fontWeight: '900', 
                  fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
                  color: '#13352C', 
                  lineHeight: Platform.OS === 'ios' ? 44 : 41,
                  opacity: obTitleFade,
                  transform: [{ translateY: obTitleSlideY }],
                  textAlign: 'left',
                }}>
                  {title}
                </Animated.Text>
                
                {/* Description */}
                <Animated.Text style={{ 
                  fontSize: 16, 
                  color: '#5A6A64', 
                  lineHeight: 24,
                  fontWeight: '500',
                  opacity: obDescFade,
                  transform: [{ translateY: obDescSlideY }],
                  textAlign: 'left',
                  marginTop: 2,
                }}>
                  {descComponent}
                </Animated.Text>
              </View>

              {/* Constant Bottom Layer (Primary Action Button only) */}
              <View style={{ gap: 12, marginTop: 10, zIndex: 20 }}>
                {/* Primary Action Button - Premium orange solid button with soft shadow */}
                <TouchableOpacity 
                  style={[styles.authBtn, {
                    backgroundColor: '#DF7E2C',
                    shadowColor: '#DF7E2C',
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.25,
                    shadowRadius: 10,
                    elevation: 5,
                    height: 56,
                    borderRadius: 28,
                  }]} 
                  onPress={handleNext}
                >
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6 }}>
                    <Text style={[styles.obBtnText, { fontSize: 16.5, fontWeight: '800' }]}>
                      {btnText}{step === 1 ? '   →' : ''}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

            </View>
          </SafeAreaView>

          {/* ─── BOTTOM WAVE FOOTER WITH RICH THREE-STOP GRADIENT & LEAF SKETCH ─── */}
          <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, overflow: 'hidden' }} pointerEvents="none">
            <Svg width="100%" height={120} viewBox="0 0 400 120" preserveAspectRatio="none">
              <Defs>
                <SvgLinearGradient id="orangeGradOnboarding" x1="0%" y1="0%" x2="0%" y2="100%">
                  <Stop offset="0%" stopColor="#FF852C" />
                  <Stop offset="50%" stopColor="#FD4F1B" />
                  <Stop offset="100%" stopColor="#DE3500" />
                </SvgLinearGradient>
              </Defs>
              <Path
                d="M0 60 C 120 90, 280 80, 400 45 L 400 120 L 0 120 Z"
                fill="url(#orangeGradOnboarding)"
              />
            </Svg>
            {/* Elegant white outline leaf branch sketch positioned absolutely */}
            <View style={{ position: 'absolute', bottom: 12, right: 18 }}>
              <Svg width={40} height={40} viewBox="0 0 40 40" fill="none" stroke="rgba(255, 255, 255, 0.45)" strokeWidth={1.5}>
                {/* Stem */}
                <Path d="M5 35 Q 20 20, 32 10" />
                {/* Leaf 1 (top right) */}
                <Path d="M 32 10 C 35 4, 30 2, 24 8 C 24 14, 28 16, 32 10 Z" />
                {/* Leaf 2 (middle left) */}
                <Path d="M 18 22 C 10 24, 8 20, 14 14 C 18 14, 20 18, 18 22 Z" />
                {/* Leaf 3 (middle right) */}
                <Path d="M 22 18 C 28 12, 30 14, 26 20 C 22 22, 20 20, 22 18 Z" />
              </Svg>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }

  function GoogleLogoSvg() {
    return (
      <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
        <Path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <Path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <Path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.08-.26-.14-.54-.14-.83z"
          fill="#FBBC05"
        />
        <Path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          fill="#EA4335"
        />
      </Svg>
    );
  }

  function AppleLogoSvg() {
    return (
      <Svg width={24} height={24} viewBox="0 0 24 24" fill="#000000">
        <Path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.69-1.12 1.84-.98 2.94.1.08.21.12.28.12.9 0 2.03-.65 2.53-1.45" />
      </Svg>
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
        const REGISTERED_NUMBERS = ['9876543210', '9999999999', '9000000000', '8888888888'];
        if (REGISTERED_NUMBERS.includes(mobileNumber)) {
          // Setup pre-registered profile
          setUser(prev => ({
            ...prev,
            phone: '+91 ' + mobileNumber,
            name: 'Bhargav',
            email: 'bhargav@koikoi.in',
            address: 'Plot 42, Jubilee Hills',
            height: '178',
            weight: '74',
            goal: 'Healthy Living',
          }));
          go('home');
        } else {
          // Setup brand new profile, starting registration flow
          setUser(prev => ({ 
            ...prev, 
            phone: '+91 ' + mobileNumber,
            name: '',
            email: '',
            address: '',
            height: '',
            weight: '',
          }));
          go('setup1');
        }
      } else {
        setToast('Incorrect OTP. Try 123456');
      }
    };

    return (
      <View style={{ flex: 1, backgroundColor: '#FFFDF9', alignItems: 'center', justifyContent: 'center' }}>
        <LinearGradient
          colors={['#FED6B3', '#FFFDF9', '#FFF1E5']}
          locations={[0, 0.45, 1.0]}
          style={{ width: '100%', height: '100%', flex: 1 }}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, paddingHorizontal: 24, justifyContent: 'center' }}>
              
              {/* Optional Demo Top Header */}
              <View style={{
                position: 'absolute',
                top: Platform.OS === 'ios' ? 50 : 20,
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderWidth: 1.5,
                borderColor: '#FFEEDB',
                borderRadius: 20,
                paddingHorizontal: 16,
                paddingVertical: 10,
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                shadowColor: '#A05020',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.05,
                shadowRadius: 6,
                elevation: 3,
                zIndex: 100
              }}>
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#DF7E2C' }} />
                <Text style={{ fontSize: 11, fontWeight: '900', color: '#13352C', letterSpacing: 0.5 }}>
                  DEMO SIMULATOR & TESTING SUITE
                </Text>
              </View>

              <Animated.View style={{ 
                width: '100%',
                opacity: authFade,
                transform: [{ translateY: authSlideY }]
              }}>
                {!otpSent ? (
                  <View style={{ alignItems: 'center' }}>
                    {/* Top Package Icon Squircle */}
                    <View style={{
                      width: 64,
                      height: 64,
                      borderRadius: 22,
                      backgroundColor: '#DF7E2C',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: 16,
                      shadowColor: '#DF7E2C',
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.2,
                      shadowRadius: 8,
                    }}>
                      <Package size={32} color="#FFFFFF" />
                    </View>

                    {/* Titles */}
                    <Text style={{ fontSize: 24, fontWeight: '900', color: '#13352C', textAlign: 'center', lineHeight: 28 }}>
                      Welcome to <Text style={{ color: '#DF7E2C' }}>KOI KOI{'\n'}DABBA</Text>
                    </Text>
                    <Text style={{ fontSize: 13, color: '#5A6A64', marginTop: 8, textAlign: 'center', lineHeight: 18 }}>
                      Taste the comfort of pure home-cooked goodness
                    </Text>

                    {/* Mobile Number Input Block */}
                    <View style={{ width: '100%', marginTop: 24, alignItems: 'flex-start' }}>
                      <Text style={{ fontSize: 10, fontWeight: '900', color: '#DF7E2C', letterSpacing: 1.2, marginBottom: 8 }}>
                        MOBILE NUMBER
                      </Text>
                      
                      <View style={{
                        flexDirection: 'row',
                        height: 56,
                        borderRadius: 18,
                        borderWidth: 1.5,
                        borderColor: '#FFEEDB',
                        backgroundColor: '#FFFFFF',
                        alignItems: 'center',
                        paddingHorizontal: 16,
                        width: '100%'
                      }}>
                        <Text style={{ fontSize: 14, fontWeight: '900', color: '#13352C' }}>IN  +91</Text>
                        <View style={{ width: 1, height: 24, backgroundColor: '#FFEEDB', marginHorizontal: 12 }} />
                        <TextInput
                          style={{ flex: 1, fontSize: 15, fontWeight: '700', color: '#13352C', height: '100%' }}
                          placeholder="Enter 10-digit number"
                          placeholderTextColor="#A0B0AA"
                          keyboardType="numeric"
                          maxLength={10}
                          value={mobileNumber}
                          onChangeText={val => setMobileNumber(val.replace(/[^0-9]/g, ''))}
                        />
                      </View>
                    </View>

                    {/* Continue Button */}
                    <TouchableOpacity 
                      style={{
                        width: '100%',
                        height: 56,
                        borderRadius: 28,
                        marginTop: 20,
                        overflow: 'hidden',
                        shadowColor: '#DF7E2C',
                        shadowOffset: { width: 0, height: 6 },
                        shadowOpacity: 0.25,
                        shadowRadius: 10,
                        elevation: 5,
                      }} 
                      onPress={handleSendOtp}
                    >
                      <LinearGradient colors={['#FF852C', '#FD4F1B']} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6 }}>
                        <Text style={{ color: '#FFFFFF', fontSize: 16.5, fontWeight: '800' }}>Continue</Text>
                        <ChevronRight size={18} color="#FFFFFF" strokeWidth={2.5} />
                      </LinearGradient>
                    </TouchableOpacity>

                    {/* OR divider */}
                    <Text style={{ textAlign: 'center', fontSize: 10, fontWeight: '900', color: '#90A09A', marginVertical: 20, letterSpacing: 1.5 }}>
                      OR
                    </Text>

                    {/* Social Row */}
                    <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 16, width: '100%', marginTop: 8 }}>
                      <TouchableOpacity style={{
                        width: 76,
                        height: 76,
                        borderRadius: 22,
                        borderWidth: 1.5,
                        borderColor: '#FFEEDB',
                        backgroundColor: '#FFFFFF',
                        justifyContent: 'center',
                        alignItems: 'center',
                        shadowColor: '#A05020',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.08,
                        shadowRadius: 8,
                        elevation: 2
                      }}>
                        <GoogleLogoSvg />
                      </TouchableOpacity>
                      <TouchableOpacity style={{
                        width: 76,
                        height: 76,
                        borderRadius: 22,
                        borderWidth: 1.5,
                        borderColor: '#FFEEDB',
                        backgroundColor: '#FFFFFF',
                        justifyContent: 'center',
                        alignItems: 'center',
                        shadowColor: '#A05020',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.08,
                        shadowRadius: 8,
                        elevation: 2
                      }}>
                        <AppleLogoSvg />
                      </TouchableOpacity>
                    </View>

                    {/* Under text */}
                    <Text style={{ fontSize: 10, color: '#7A8A83', marginTop: 24, textAlign: 'center', lineHeight: 14 }}>
                      By continuing, you agree to our{'\n'}
                      <Text style={{ textDecorationLine: 'underline', color: '#DF7E2C' }}>Terms of Service</Text> & <Text style={{ textDecorationLine: 'underline', color: '#DF7E2C' }}>Privacy Policy</Text>
                    </Text>
                  </View>
                ) : (
                  <View>
                    <TouchableOpacity onPress={() => setOtpSent(false)} style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 16 }}>
                      <ArrowLeft size={16} color="#13352C" />
                      <Text style={{ fontSize: 13, color: '#5A6A64', fontWeight: '600' }}>Change Number</Text>
                    </TouchableOpacity>

                    <Text style={{ fontSize: 24, fontWeight: '900', color: '#13352C' }}>OTP Verification</Text>
                    <Text style={{ fontSize: 13, color: '#5A6A64', marginTop: 8 }}>
                      We sent a 6-digit code to <Text style={{ color: '#DF7E2C', fontWeight: 'bold' }}>+91 {mobileNumber}</Text>
                    </Text>

                    <TextInput
                      style={{ height: 56, borderRadius: 18, borderWidth: 1.5, borderColor: '#FFEEDB', backgroundColor: '#FFFFFF', fontSize: 18, fontWeight: 'bold', color: '#13352C', textAlign: 'center', marginTop: 24, letterSpacing: 4 }}
                      placeholder="6-Digit Code"
                      placeholderTextColor="#A0B0AA"
                      keyboardType="numeric"
                      maxLength={6}
                      value={otpCode}
                      onChangeText={val => setOtpCode(val.replace(/[^0-9]/g, ''))}
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                      {otpCountdown > 0 ? (
                        <Text style={{ fontSize: 11, color: '#5A6A64' }}>
                          Resend code in <Text style={{ color: '#DF7E2C', fontWeight: 'bold' }}>{otpCountdown}s</Text>
                        </Text>
                      ) : (
                        <TouchableOpacity onPress={() => setOtpCountdown(30)}>
                          <Text style={{ fontSize: 11, color: '#DF7E2C', fontWeight: 'bold' }}>Resend Code</Text>
                        </TouchableOpacity>
                      )}
                      <Text style={{ fontSize: 9, color: '#90A09A', fontWeight: 'bold' }}>DEMO CODE: 123456</Text>
                    </View>

                    <TouchableOpacity 
                      style={{
                        width: '100%',
                        height: 56,
                        borderRadius: 28,
                        marginTop: 20,
                        overflow: 'hidden',
                        shadowColor: '#DF7E2C',
                        shadowOffset: { width: 0, height: 6 },
                        shadowOpacity: 0.25,
                        shadowRadius: 10,
                        elevation: 5,
                      }} 
                      onPress={handleVerifyOtp}
                    >
                      <LinearGradient colors={['#FF852C', '#FD4F1B']} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6 }}>
                        <ShieldCheck size={16} color="#FFFFFF" />
                        <Text style={{ color: '#FFFFFF', fontSize: 16.5, fontWeight: '800' }}>Verify & Login</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                )}
              </Animated.View>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </View>
    );
  }

  // 4. Setup 1: Profile Details (Step 1 of 3)
  function RenderSetup1() {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFFDF9', alignItems: 'center', justifyContent: 'center' }}>
        <LinearGradient
          colors={['#FED6B3', '#FFFDF9', '#FFF1E5']}
          locations={[0, 0.45, 1.0]}
          style={{ width: '100%', height: '100%', flex: 1 }}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, paddingHorizontal: 24 }}>
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 24 }}>
                  {/* Top Progress bar and Back row */}
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <TouchableOpacity onPress={back} style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFFFFF', borderWidth: 1.5, borderColor: '#FFEEDB', justifyContent: 'center', alignItems: 'center' }}>
                      <ArrowLeft size={16} color="#13352C" />
                    </TouchableOpacity>
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text style={{ fontSize: 10, fontWeight: '900', color: '#DF7E2C', letterSpacing: 0.5 }}>STEP 1 OF 3</Text>
                      <Text style={{ fontSize: 10, color: '#5A6A64', fontWeight: 'bold', marginTop: 1 }}>33% Complete</Text>
                    </View>
                  </View>

                  {/* Progress Line */}
                  <View style={{ width: '100%', height: 6, backgroundColor: '#FFEEDB', borderRadius: 3, overflow: 'hidden', marginBottom: 20 }}>
                    <View style={{ width: '33%', height: '100%', backgroundColor: '#DF7E2C', borderRadius: 3 }} />
                  </View>

                  {/* Title & Subtitle */}
                  <Text style={{ fontSize: 24, fontWeight: '900', color: '#13352C' }}>Create Your Profile</Text>
                  <Text style={{ fontSize: 13, color: '#5A6A64', marginTop: 4, lineHeight: 18 }}>
                    Help us personalize your Koi Koi dabba experience.
                  </Text>

                  {/* Profile Photo Picker */}
                  <View style={{ alignItems: 'center', marginVertical: 16 }}>
                    <TouchableOpacity 
                      style={{
                        width: 90,
                        height: 90,
                        borderRadius: 45,
                        backgroundColor: '#FFF1E5',
                        borderWidth: 2,
                        borderColor: '#FFEEDB',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        shadowColor: '#A05020',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.1,
                        shadowRadius: 8,
                        elevation: 3
                      }}
                      onPress={() => {
                        const avatars = ['👩‍🍳', '👨‍🍳', '🥗', '🍲', '🥑', '🥦', '🥕', '🍎', '🥘'];
                        const curIdx = avatars.indexOf(user.avatar);
                        const nextIdx = (curIdx + 1) % avatars.length;
                        setUser(prev => ({ ...prev, avatar: avatars[nextIdx] }));
                        setToast('Profile Photo updated!');
                      }}
                    >
                      <Text style={{ fontSize: 44 }}>{user.avatar}</Text>
                      <View style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        backgroundColor: '#DF7E2C',
                        width: 28,
                        height: 28,
                        borderRadius: 14,
                        borderWidth: 2,
                        borderColor: '#FFFFFF',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                        <Camera size={14} color="#FFFFFF" />
                      </View>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 11, color: '#7A8A83', marginTop: 8, fontWeight: '700', letterSpacing: 0.5 }}>
                      TAP TO CHANGE PHOTO
                    </Text>
                  </View>

                  {/* Inputs */}
                  <View style={{ gap: 16 }}>
                    <View>
                      <Text style={{ fontSize: 10, fontWeight: '900', color: '#DF7E2C', letterSpacing: 1.2, marginBottom: 8 }}>FULL NAME</Text>
                      <TextInput
                        style={{ height: 56, borderRadius: 18, borderWidth: 1.5, borderColor: '#FFEEDB', backgroundColor: '#FFFFFF', paddingHorizontal: 16, fontSize: 14, color: '#13352C', fontWeight: '600' }}
                        value={user.name}
                        onChangeText={val => setUser(prev => ({ ...prev, name: val.replace(/[^a-zA-Z\s]/g, '') }))}
                        placeholder="Bhargav"
                        placeholderTextColor="#A0B0AA"
                      />
                    </View>

                    <View>
                      <Text style={{ fontSize: 10, fontWeight: '900', color: '#DF7E2C', letterSpacing: 1.2, marginBottom: 8 }}>MOBILE NUMBER (READ ONLY)</Text>
                      <View style={{
                        flexDirection: 'row',
                        height: 56,
                        borderRadius: 18,
                        borderWidth: 1.5,
                        borderColor: '#FFEEDB',
                        backgroundColor: '#F5F6F5',
                        alignItems: 'center',
                        paddingHorizontal: 16,
                      }}>
                        <TextInput
                          style={{ flex: 1, fontSize: 14, color: '#7A8A83', fontWeight: '600', height: '100%' }}
                          value={user.phone}
                          editable={false}
                        />
                        <Lock size={16} color="#A0B0AA" />
                      </View>
                    </View>

                    <View>
                      <Text style={{ fontSize: 10, fontWeight: '900', color: '#DF7E2C', letterSpacing: 1.2, marginBottom: 8 }}>EMAIL ADDRESS</Text>
                      <TextInput
                        style={{ height: 56, borderRadius: 18, borderWidth: 1.5, borderColor: '#FFEEDB', backgroundColor: '#FFFFFF', paddingHorizontal: 16, fontSize: 14, color: '#13352C', fontWeight: '600' }}
                        value={user.email}
                        onChangeText={val => setUser(prev => ({ ...prev, email: val.replace(/[^a-zA-Z0-9@._+-]/g, '') }))}
                        placeholder="bhargav@koikoi.in"
                        placeholderTextColor="#A0B0AA"
                        keyboardType="email-address"
                      />
                    </View>

                    <View>
                      <Text style={{ fontSize: 10, fontWeight: '900', color: '#DF7E2C', letterSpacing: 1.2, marginBottom: 8 }}>DATE OF BIRTH</Text>
                      <View style={{
                        flexDirection: 'row',
                        height: 56,
                        borderRadius: 18,
                        borderWidth: 1.5,
                        borderColor: '#FFEEDB',
                        backgroundColor: '#FFFFFF',
                        alignItems: 'center',
                        paddingHorizontal: 16,
                      }}>
                        <TextInput
                          style={{ flex: 1, fontSize: 14, color: '#13352C', fontWeight: '600', height: '100%' }}
                          value={user.dob}
                          onChangeText={val => {
                            const cleaned = val.replace(/[^0-9]/g, '');
                            let formatted = '';
                            if (cleaned.length > 0) formatted += cleaned.slice(0, 2);
                            if (cleaned.length > 2) formatted += '/' + cleaned.slice(2, 4);
                            if (cleaned.length > 4) formatted += '/' + cleaned.slice(4, 8);
                            setUser(prev => ({ ...prev, dob: formatted }));
                          }}
                          placeholder="e.g. 15/08/1996"
                          placeholderTextColor="#A0B0AA"
                          maxLength={10}
                          keyboardType="numeric"
                        />
                        <Calendar size={18} color="#DF7E2C" />
                      </View>
                    </View>

                    <View>
                      <Text style={{ fontSize: 10, fontWeight: '900', color: '#DF7E2C', letterSpacing: 1.2, marginBottom: 8 }}>GENDER</Text>
                      <View style={{ flexDirection: 'row', gap: 10 }}>
                        {['Male', 'Female', 'Other'].map(g => {
                          const isSelected = user.gender === g;
                          return (
                            <TouchableOpacity
                              key={g}
                              style={{
                                flex: 1,
                                height: 48,
                                borderRadius: 14,
                                borderWidth: 1.5,
                                borderColor: isSelected ? '#DF7E2C' : '#FFEEDB',
                                backgroundColor: isSelected ? '#FFF4EC' : '#FFFFFF',
                                justifyContent: 'center',
                                alignItems: 'center'
                              }}
                              onPress={() => setUser(prev => ({ ...prev, gender: g }))}
                            >
                              <Text style={{ fontSize: 13, fontWeight: '800', color: isSelected ? '#DF7E2C' : '#13352C' }}>
                                {g}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </View>
                  </View>

                  {/* Continue Button */}
                  <TouchableOpacity 
                    style={{
                      width: '100%',
                      height: 56,
                      borderRadius: 28,
                      marginTop: 28,
                      overflow: 'hidden',
                      shadowColor: '#DF7E2C',
                      shadowOffset: { width: 0, height: 6 },
                      shadowOpacity: 0.25,
                      shadowRadius: 10,
                      elevation: 5,
                    }} 
                    onPress={() => {
                      if (!user.name.trim() || !user.email.trim() || !user.dob.trim()) {
                        setToast('Please enter all profile details');
                        return;
                      }
                      const emailRegex = /\S+@\S+\.\S+/;
                      if (!emailRegex.test(user.email.trim())) {
                        setToast('Please enter a valid email address.');
                        return;
                      }
                      if (user.dob.trim().length < 10) {
                        setToast('Please enter date of birth in DD/MM/YYYY format');
                        return;
                      }
                      go('setup2');
                    }}
                  >
                    <LinearGradient colors={['#FF852C', '#FD4F1B']} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6 }}>
                      <Text style={{ color: '#FFFFFF', fontSize: 16.5, fontWeight: '800' }}>Continue</Text>
                      <ChevronRight size={18} color="#FFFFFF" strokeWidth={2.5} />
                    </LinearGradient>
                  </TouchableOpacity>
                </ScrollView>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </View>
    );
  }

  // 5. Setup 2: Address Details (Step 2 of 3)
  function RenderSetup2() {
    const isMaisammaguda = selectedAddress.includes("Maisammaguda");

    // Contacts Modal Component
    const renderContactsModal = () => {
      const filteredContacts = deviceContacts.filter(c => 
        c.name?.toLowerCase().includes(contactsSearchQuery.toLowerCase())
      );

      return (
        <Modal visible={showContactsModal} transparent animationType="slide">
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
            <View style={{ height: '70%', backgroundColor: t.surface, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 20 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <Text style={{ fontSize: 18, fontWeight: '800', color: t.text }}>Select Contact</Text>
                <TouchableOpacity onPress={() => setShowContactsModal(false)} style={{ padding: 4 }}>
                  <X size={24} color={t.text} />
                </TouchableOpacity>
              </View>

              <TextInput
                style={{
                  height: 48,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: t.border,
                  backgroundColor: t.input,
                  color: t.text,
                  paddingHorizontal: 16,
                  marginBottom: 16
                }}
                value={contactsSearchQuery}
                onChangeText={setContactsSearchQuery}
                placeholder="Search contacts..."
                placeholderTextColor={t.muted}
              />

              <FlatList
                data={filteredContacts}
                keyExtractor={(item, index) => item.id || index.toString()}
                renderItem={({ item }) => {
                  const phone = item.phoneNumbers && item.phoneNumbers[0]?.number || 'No number';
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setReceiverDetailsName(item.name || '');
                        setReceiverDetailsPhone(phone);
                        setShowContactsModal(false);
                        setToast("Selected: " + item.name);
                      }}
                      style={{
                        paddingVertical: 14,
                        borderBottomWidth: 1,
                        borderBottomColor: t.border,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <View>
                        <Text style={{ fontSize: 15, fontWeight: '700', color: t.text }}>{item.name}</Text>
                        <Text style={{ fontSize: 13, color: t.muted, marginTop: 2 }}>{phone}</Text>
                      </View>
                      <ChevronRight size={18} color={t.muted} />
                    </TouchableOpacity>
                  );
                }}
                ListEmptyComponent={
                  <View style={{ alignItems: 'center', marginTop: 40 }}>
                    <Text style={{ color: t.muted }}>No contacts found</Text>
                  </View>
                }
              />
            </View>
          </View>
        </Modal>
      );
    };

    // Photo Picker Choice Dialog
    const renderPhotoPickerModal = () => {
      if (!showPhotoPicker) return null;
      return (
        <Modal transparent visible={showPhotoPicker} animationType="fade">
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
            <View style={{ width: '100%', maxWidth: 300, backgroundColor: t.card, borderRadius: 24, padding: 20, borderWidth: 1, borderColor: t.border }}>
              <Text style={{ fontSize: 16, fontWeight: '800', color: t.text, textAlign: 'center', marginBottom: 20 }}>Upload Door/Building Image</Text>
              
              <TouchableOpacity
                onPress={handleTakePhoto}
                style={{
                  height: 48,
                  borderRadius: 12,
                  backgroundColor: B.orange,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 12
                }}
              >
                <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 }}>Take Photo (Camera)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleChooseFromLibrary}
                style={{
                  height: 48,
                  borderRadius: 12,
                  borderWidth: 1.5,
                  borderColor: B.orange,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 16
                }}
              >
                <Text style={{ color: B.orange, fontWeight: 'bold', fontSize: 14 }}>Choose from Gallery</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setShowPhotoPicker(false)}
                style={{
                  alignSelf: 'center',
                  padding: 8
                }}
              >
                <Text style={{ color: t.muted, fontWeight: '700', fontSize: 13 }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      );
    };

    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: t.bg, paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 0 }]}>
        <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={t.bg} />
        
        {/* Header Row: Back button & Search Bar side-by-side as shown in image */}
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 12, gap: 10 }}>
          <TouchableOpacity onPress={back} style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
            <ArrowLeft size={24} color={t.text} />
          </TouchableOpacity>

          {/* Search Input Button */}
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => setShowSearchModal(true)} 
            style={{ 
              flex: 1,
              flexDirection: 'row', 
              alignItems: 'center', 
              backgroundColor: t.input, 
              borderRadius: 16, 
              paddingHorizontal: 16, 
              height: 50, 
              borderWidth: 1.5,
              borderColor: t.border
            }}
          >
            <Search size={18} color={t.muted} />
            <Text style={{ color: t.muted, marginLeft: 10, fontSize: 14 }}>Search for area, street name...</Text>
          </TouchableOpacity>
        </View>

        {/* Immersive Interactive Map Canvas */}
        <View 
          {...panResponder.panHandlers}
          style={{ flex: 1, backgroundColor: isDark ? '#1C1F22' : '#F0F4F8', position: 'relative', overflow: 'hidden', marginTop: 12 }}
        >
          {/* Custom Stylized Map Vectors that translate on drag */}
          <View style={{ 
            position: 'absolute', 
            width: 1000, 
            height: 1000, 
            left: -300, 
            top: -300,
            transform: [{ translateX: mapTranslateX }, { translateY: mapTranslateY }] 
          }}>
            <Svg width="100%" height="100%" style={{ opacity: isDark ? 0.15 : 0.4 }}>
              {/* Grid streets */}
              <Path d="M 0 100 L 1000 300 M 100 0 L 300 1000 M 0 700 L 1000 400 M 500 0 L 500 1000 M 200 100 L 800 900 M 800 100 L 200 900" stroke={isDark ? "#FFFFFF" : "#475467"} strokeWidth={4} />
              <Rect x={140} y={250} width={180} height={120} rx={16} fill={isDark ? "#2E7D32" : "#81C784"} opacity={0.6} />
              <Rect x={600} y={450} width={150} height={200} rx={16} fill={isDark ? "#1565C0" : "#64B5F6"} opacity={0.6} />
              <Ellipse cx={500} cy={200} rx={90} ry={60} fill={isDark ? "#C62828" : "#E57373"} opacity={0.5} />
            </Svg>

            {/* Map Landmarks that move with streets */}
            <View style={{ position: 'absolute', top: 220, left: 160, opacity: 0.6 }}>
              <Text style={{ fontSize: 11, color: t.text, fontWeight: 'bold' }}>St.Peter's High School</Text>
            </View>
            <View style={{ position: 'absolute', top: 480, right: 280, opacity: 0.6 }}>
              <Text style={{ fontSize: 11, color: t.text, fontWeight: 'bold' }}>Devashrey Hostel - Zeus</Text>
            </View>
            <View style={{ position: 'absolute', top: 620, left: 240, opacity: 0.6 }}>
              <Text style={{ fontSize: 11, color: t.text, fontWeight: 'bold' }}>Ajith boys hostel</Text>
            </View>
            <View style={{ position: 'absolute', top: 380, right: 350, opacity: 0.6 }}>
              <Text style={{ fontSize: 11, color: t.text, fontWeight: 'bold' }}>Tower 3 lobby entry</Text>
            </View>
          </View>

          {/* Centered Map Pin (Stays static, but bounces on drag) */}
          <View style={{ position: 'absolute', left: '50%', top: '45%', marginLeft: -18, marginTop: -36, alignItems: 'center', zIndex: 10 }}>
            {/* Pin Tooltip */}
            <View style={{
              backgroundColor: '#FFFFFF',
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#E4E7EC',
              position: 'absolute',
              bottom: 45,
              width: 230,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 6,
              elevation: 5
            }}>
              <Text style={{ fontSize: 11, color: '#101828', fontWeight: '800', textAlign: 'center' }}>Move pin to your exact delivery location</Text>
              <View style={{ width: 0, height: 0, borderLeftWidth: 6, borderRightWidth: 6, borderTopWidth: 6, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: '#FFFFFF', position: 'absolute', bottom: -6 }} />
            </View>

            <Animated.View style={{
              transform: [
                { translateY: isDraggingMap ? -12 : 0 },
                { scale: isDraggingMap ? 1.15 : 1.0 }
              ]
            }}>
              <MapPin size={38} color="#F04438" />
            </Animated.View>
            <View style={{ 
              width: 10, 
              height: 10, 
              borderRadius: 5, 
              backgroundColor: 'rgba(0,0,0,0.25)', 
              transform: [{ scaleX: isDraggingMap ? 0.6 : 2 }], 
              marginTop: -2,
              opacity: isDraggingMap ? 0.4 : 1
            }} />
          </View>

          {/* Use Current Location Floating Button */}
          <TouchableOpacity 
            onPress={() => {
              setMapTranslateX(0);
              setMapTranslateY(0);
              setMapOffsetList({ x: 0, y: 0 });
              detectCurrentLocation();
            }}
            style={{ 
              position: 'absolute', 
              bottom: 16, 
              alignSelf: 'center', 
              flexDirection: 'row', 
              alignItems: 'center', 
              backgroundColor: t.card, 
              borderWidth: 1.5, 
              borderColor: t.border, 
              borderRadius: 20, 
              paddingHorizontal: 16, 
              paddingVertical: 10,
              gap: 8,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3
            }}
          >
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#F04438" strokeWidth={2.5}>
              <Circle cx={12} cy={12} r={8} />
              <Circle cx={12} cy={12} r={3} />
              <Path d="M12 2 L12 6 M12 18 L12 22 M2 12 L6 12 M18 12 L22 12" />
            </Svg>
            <Text style={{ fontSize: 13, fontWeight: '800', color: '#F04438' }}>Use current location</Text>
          </TouchableOpacity>
        </View>

        {/* Scrollable Bottom Delivery Details Sheet */}
        <View style={{ maxHeight: '55%', backgroundColor: t.surface, borderTopLeftRadius: 28, borderTopRightRadius: 28, borderWidth: 1, borderTopColor: t.border }}>
          <ScrollView contentContainerStyle={{ padding: 20 }} showsVerticalScrollIndicator={false}>
            <Text style={{ fontSize: 13, fontWeight: '900', color: t.sub, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>Delivery details</Text>

            {/* Selected Address Row */}
            <TouchableOpacity onPress={() => setShowSearchModal(true)} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(240, 68, 56, 0.1)', justifyContent: 'center', alignItems: 'center' }}>
                <MapPin size={18} color="#F04438" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: '800', color: t.text, lineHeight: 20 }}>
                  {selectedAddress.split(',')[0]}
                </Text>
                <Text style={{ fontSize: 12, color: t.muted, marginTop: 2 }} numberOfLines={1}>
                  {selectedAddress}
                </Text>
              </View>
              <ChevronRight size={16} color={t.muted} />
            </TouchableOpacity>

            {/* Warning / Allow Location alert box */}
            {!locationPermissionEnabled ? (
              <TouchableOpacity 
                onPress={() => setShowLocationDialog(true)}
                style={{
                  backgroundColor: isDark ? 'rgba(234, 179, 8, 0.05)' : '#FFFBEB',
                  borderWidth: 1,
                  borderColor: isDark ? 'rgba(234, 179, 8, 0.25)' : '#FDE68A',
                  borderRadius: 16,
                  padding: 14,
                  marginBottom: 16
                }}
              >
                <Text style={{ fontSize: 12, fontWeight: '700', color: '#EAB308' }}>
                  Enable location access to get your delivery address
                </Text>
                <Text style={{ fontSize: 12, fontWeight: '900', color: '#F04438', marginTop: 4 }}>
                  Allow location access ‣
                </Text>
              </TouchableOpacity>
            ) : isMaisammaguda ? (
              <View style={{
                backgroundColor: isDark ? 'rgba(234, 179, 8, 0.05)' : '#FFFBEB',
                borderWidth: 1,
                borderColor: isDark ? 'rgba(234, 179, 8, 0.25)' : '#FDE68A',
                borderRadius: 16,
                padding: 14,
                marginBottom: 16
              }}>
                <Text style={{ fontSize: 12, fontWeight: '700', color: '#EAB308', lineHeight: 18 }}>
                  The selected restaurant is not available for delivery at your location.
                </Text>
              </View>
            ) : null}

            {/* Address Details input field */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 11, fontWeight: '900', color: t.sub, letterSpacing: 0.5, marginBottom: 8 }}>ADDRESS DETAILS*</Text>
              <TextInput
                style={{ height: 50, borderRadius: 14, borderWidth: 1, borderColor: t.border, backgroundColor: t.input, paddingHorizontal: 16, fontSize: 14, color: t.text, fontWeight: '600' }}
                value={addressDetails}
                onChangeText={setAddressDetails}
                placeholder="E.g. Floor, House no."
                placeholderTextColor={t.muted}
              />
            </View>

            {/* Receiver details */}
            <View style={{ borderTopWidth: 1, borderTopColor: t.border, paddingTop: 16, marginBottom: 16 }}>
              <Text style={{ fontSize: 11, fontWeight: '900', color: t.sub, letterSpacing: 0.5, marginBottom: 14 }}>RECEIVER DETAILS FOR THIS ADDRESS</Text>
              
              {/* Receiver's Name Card with label inside and contacts book icon */}
              <View style={{
                borderWidth: 1,
                borderColor: t.border,
                borderRadius: 14,
                height: 56,
                position: 'relative',
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                backgroundColor: t.input,
                marginBottom: 16
              }}>
                <Text style={{
                  position: 'absolute',
                  top: -8,
                  left: 12,
                  fontSize: 11,
                  fontWeight: 'bold',
                  color: t.sub,
                  backgroundColor: t.surface,
                  paddingHorizontal: 6,
                  zIndex: 1
                }}>Receiver's Name</Text>
                
                <TextInput
                  style={{ flex: 1, height: '100%', color: t.text, fontSize: 14, fontWeight: '600' }}
                  value={receiverDetailsName}
                  onChangeText={setReceiverDetailsName}
                  placeholder="Enter name"
                  placeholderTextColor={t.muted}
                />

                {receiverDetailsName ? (
                  <TouchableOpacity onPress={() => setReceiverDetailsName("")} style={{ padding: 4 }}>
                    <X size={16} color={t.muted} />
                  </TouchableOpacity>
                ) : null}

                <View style={{ width: 1, height: 20, backgroundColor: t.border, marginHorizontal: 12 }} />

                <TouchableOpacity onPress={handlePickContact} style={{ padding: 4 }}>
                  <Contact size={20} color={B.orange} />
                </TouchableOpacity>
              </View>

              {/* Receiver's Phone Card with label inside */}
              <View style={{
                borderWidth: 1,
                borderColor: t.border,
                borderRadius: 14,
                height: 56,
                position: 'relative',
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                backgroundColor: t.input,
                marginBottom: 12
              }}>
                <Text style={{
                  position: 'absolute',
                  top: -8,
                  left: 12,
                  fontSize: 11,
                  fontWeight: 'bold',
                  color: t.sub,
                  backgroundColor: t.surface,
                  paddingHorizontal: 6,
                  zIndex: 1
                }}>Receiver's Phone</Text>
                
                <TextInput
                  style={{ flex: 1, height: '100%', color: t.text, fontSize: 14, fontWeight: '600' }}
                  value={receiverDetailsPhone}
                  onChangeText={setReceiverDetailsPhone}
                  placeholder="Enter phone number"
                  placeholderTextColor={t.muted}
                  keyboardType="phone-pad"
                />

                {receiverDetailsPhone ? (
                  <TouchableOpacity onPress={() => setReceiverDetailsPhone("")} style={{ padding: 4 }}>
                    <X size={16} color={t.muted} />
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>

            {/* Save address as */}
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 11, fontWeight: '900', color: t.sub, letterSpacing: 0.5, marginBottom: 10 }}>SAVE ADDRESS AS</Text>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                {/* Home */}
                <TouchableOpacity 
                  onPress={() => setAddressLabel('Home')}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    borderRadius: 20,
                    borderWidth: 1.5,
                    borderColor: addressLabel === 'Home' ? B.orange : t.border,
                    backgroundColor: addressLabel === 'Home' ? (isDark ? 'rgba(233, 106, 46, 0.1)' : 'rgba(233, 106, 46, 0.05)') : t.input,
                    gap: 6
                  }}
                >
                  <HomeIcon size={16} color={addressLabel === 'Home' ? B.orange : t.muted} />
                  <Text style={{ fontSize: 13, fontWeight: 'bold', color: addressLabel === 'Home' ? B.orange : t.text }}>Home</Text>
                </TouchableOpacity>

                {/* Work */}
                <TouchableOpacity 
                  onPress={() => setAddressLabel('Work')}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    borderRadius: 20,
                    borderWidth: 1.5,
                    borderColor: addressLabel === 'Work' ? B.orange : t.border,
                    backgroundColor: addressLabel === 'Work' ? (isDark ? 'rgba(233, 106, 46, 0.1)' : 'rgba(233, 106, 46, 0.05)') : t.input,
                    gap: 6
                  }}
                >
                  <Building2 size={16} color={addressLabel === 'Work' ? B.orange : t.muted} />
                  <Text style={{ fontSize: 13, fontWeight: 'bold', color: addressLabel === 'Work' ? B.orange : t.text }}>Work</Text>
                </TouchableOpacity>

                {/* Other */}
                <TouchableOpacity 
                  onPress={() => setAddressLabel('Other')}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    borderRadius: 20,
                    borderWidth: 1.5,
                    borderColor: addressLabel === 'Other' ? B.orange : t.border,
                    backgroundColor: addressLabel === 'Other' ? (isDark ? 'rgba(233, 106, 46, 0.1)' : 'rgba(233, 106, 46, 0.05)') : t.input,
                    gap: 6
                  }}
                >
                  <MapPin size={16} color={addressLabel === 'Other' ? B.orange : t.muted} />
                  <Text style={{ fontSize: 13, fontWeight: 'bold', color: addressLabel === 'Other' ? B.orange : t.text }}>Other</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Door/building image (optional) section */}
            <View style={{ marginBottom: 24 }}>
              <Text style={{ fontSize: 11, fontWeight: '900', color: t.sub, letterSpacing: 0.5, marginBottom: 8 }}>DOOR/BUILDING IMAGE (OPTIONAL)</Text>
              
              {doorImageUri ? (
                <View style={{ height: 120, borderRadius: 14, overflow: 'hidden', borderWidth: 1.5, borderColor: t.border, position: 'relative' }}>
                  <Image source={{ uri: doorImageUri }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                  <TouchableOpacity 
                    onPress={() => setDoorImageUri(null)}
                    style={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      backgroundColor: 'rgba(0,0,0,0.6)',
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <X size={14} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity 
                  onPress={handlePickImage}
                  style={{
                    borderWidth: 1.5,
                    borderStyle: 'dashed',
                    borderColor: B.orange,
                    borderRadius: 14,
                    height: 52,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: 8,
                    backgroundColor: t.input
                  }}
                >
                  <Camera size={18} color={B.orange} />
                  <Text style={{ fontSize: 13, fontWeight: 'bold', color: B.orange }}>Add an image</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Confirm details and continue */}
            <TouchableOpacity
              style={{
                height: 52,
                borderRadius: 26,
                overflow: 'hidden',
                backgroundColor: B.orange,
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onPress={() => {
                if (isMaisammaguda) {
                  setToast("Sorry, we do not deliver to Maisammaguda yet. Please pick another area.");
                  return;
                }
                if (!addressDetails.trim()) {
                  setToast("Please enter address details (house/floor number)");
                  return;
                }
                if (!receiverDetailsName.trim()) {
                  setToast("Please enter receiver's name");
                  return;
                }
                if (!receiverDetailsPhone.trim()) {
                  setToast("Please enter receiver's phone number");
                  return;
                }
                
                // Save details to user and address list
                const fullAddressString = addressDetails + ", " + selectedAddress;
                const newAddr = {
                  id: Date.now().toString(),
                  label: addressLabel,
                  address: fullAddressString,
                  name: receiverDetailsName,
                  phone: receiverDetailsPhone,
                  image: doorImageUri || undefined
                };

                setAddressesList(prev => [newAddr, ...prev]);
                setUser(prev => ({
                  ...prev,
                  houseNo: addressDetails,
                  street: selectedAddress.split(',')[0],
                  address: fullAddressString,
                  addressLabel: addressLabel
                }));

                setToast("Address saved successfully!");
                go('setup3');
              }}
            >
              <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '800' }}>Save address</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {renderContactsModal()}
        {renderPhotoPickerModal()}
      </SafeAreaView>
    );
  }
function RenderSetup3() {
    const w = parseFloat(user.weight) || 74;
    const h = (parseFloat(user.height) || 178) / 100;
    const bmiVal = Math.round((w / (h * h)) * 10) / 10;

    let bmiStatus = 'Normal Weight';
    let bmiColor = '#2E7D32'; 
    let bmiBg = isDark ? 'rgba(46, 125, 50, 0.1)' : 'rgba(46, 125, 50, 0.05)'; 
    let bmiBorder = isDark ? 'rgba(46, 125, 50, 0.3)' : 'rgba(46, 125, 50, 0.15)';
    
    if (bmiVal < 18.5) {
      bmiStatus = 'Underweight';
      bmiColor = '#F59E0B'; 
      bmiBg = isDark ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.05)';
      bmiBorder = isDark ? 'rgba(245, 158, 11, 0.3)' : 'rgba(245, 158, 11, 0.15)';
    } else if (bmiVal >= 25 && bmiVal < 30) {
      bmiStatus = 'Overweight';
      bmiColor = '#EF4444'; 
      bmiBg = isDark ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.05)';
      bmiBorder = isDark ? 'rgba(239, 68, 68, 0.3)' : 'rgba(239, 68, 68, 0.15)';
    } else if (bmiVal >= 30) {
      bmiStatus = 'Obese';
      bmiColor = '#B91C1C'; 
      bmiBg = isDark ? 'rgba(185, 28, 28, 0.1)' : 'rgba(185, 28, 28, 0.05)';
      bmiBorder = isDark ? 'rgba(185, 28, 28, 0.3)' : 'rgba(185, 28, 28, 0.15)';
    }

    const progressPct = 75 + (setup3SubPage - 1) * 6.25; 
    const displayedPercent = Math.round(75 + (setup3SubPage - 1) * 8.33); 
    
    const handleSetup3Back = () => {
      if (setup3SubPage > 1) {
        setSetup3SubPage(setup3SubPage - 1);
      } else {
        back();
      }
    };

    const handleSetup3Next = () => {
      if (setup3SubPage === 1) {
        if (!user.height.trim() || !user.weight.trim() || !goalWeight.trim()) {
          setToast("Please fill in height, weight, and goal weight.");
          return;
        }
        setSetup3SubPage(2);
      } else if (setup3SubPage === 2) {
        setSetup3SubPage(3);
      } else if (setup3SubPage === 3) {
        setSetup3SubPage(4);
      } else {
        // Complete onboarding
        setUser(prev => ({
          ...prev,
          height: user.height,
          weight: user.weight,
          goalWeight: goalWeight,
          activityLevel: user.activityLevel,
          workoutFrequency: workoutFrequency,
          workoutTypes: workoutTypes,
          healthGoal: primaryGoal,
          goalSpeed: goalSpeed,
          motivation: motivation,
          foodPref: user.foodPref,
          allergies: allergiesList.length > 0 ? allergiesList.join(', ') : 'None',
          healthConditions: healthConditions,
          foodDislikes: foodDislikes,
          waterIntakeGoal: waterIntakeGoal === 'Custom' ? customWaterIntake + ' L' : waterIntakeGoal,
          bedtime: bedtime,
          wakeupTime: wakeupTime,
          sleepHours: calculateSleepHours(bedtime, wakeupTime),
          smartNotifications: smartNotifications,
          connectedHealthApps: connectedHealthApps
        }));
        setToast("Profile onboarding completed successfully!");
        go('home');
      }
    };

    const toggleWorkoutType = (type: string) => {
      setWorkoutTypes(prev => 
        prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
      );
    };

    const toggleAllergy = (allergy: string) => {
      setAllergiesList(prev => 
        prev.includes(allergy) ? prev.filter(a => a !== allergy) : [...prev, allergy]
      );
    };

    const toggleCondition = (cond: string) => {
      if (cond === 'None') {
        setHealthConditions(['None']);
        return;
      }
      setHealthConditions(prev => {
        const filtered = prev.filter(x => x !== 'None');
        return filtered.includes(cond) ? filtered.filter(x => x !== cond) : [...filtered, cond];
      });
    };

    const toggleDislike = (dislike: string) => {
      setFoodDislikes(prev => 
        prev.includes(dislike) ? prev.filter(d => d !== dislike) : [...prev, dislike]
      );
    };

    const toggleHealthApp = (app: string) => {
      setConnectedHealthApps(prev => 
        prev.includes(app) ? prev.filter(a => a !== app) : [...prev, app]
      );
    };

    // Sub-Page 1 Render
    const renderPage1 = () => (
      <View style={{ gap: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: '900', color: t.text }}>Page 1 — Body & Fitness Profile</Text>
        <Text style={{ fontSize: 13, color: t.sub, lineHeight: 18 }}>Understand your physical measurements and daily activity.</Text>
        
        {/* Physical Measurements inputs */}
        <Text style={{ fontSize: 11, fontWeight: '900', color: '#DF7E2C', letterSpacing: 1.2 }}>PHYSICAL MEASUREMENTS</Text>
        
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', color: t.sub, marginBottom: 6 }}>HEIGHT (CM)</Text>
            <TextInput
              style={{ height: 50, borderRadius: 14, borderWidth: 1.5, borderColor: t.border, backgroundColor: t.input, paddingHorizontal: 16, fontSize: 14, color: t.text, fontWeight: '600' }}
              value={user.height}
              onChangeText={val => setUser(prev => ({ ...prev, height: val }))}
              placeholder="178"
              placeholderTextColor={t.muted}
              keyboardType="numeric"
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', color: t.sub, marginBottom: 6 }}>WEIGHT (KG)</Text>
            <TextInput
              style={{ height: 50, borderRadius: 14, borderWidth: 1.5, borderColor: t.border, backgroundColor: t.input, paddingHorizontal: 16, fontSize: 14, color: t.text, fontWeight: '600' }}
              value={user.weight}
              onChangeText={val => setUser(prev => ({ ...prev, weight: val }))}
              placeholder="74"
              placeholderTextColor={t.muted}
              keyboardType="numeric"
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', color: t.sub, marginBottom: 6 }}>GOAL WEIGHT (KG)</Text>
            <TextInput
              style={{ height: 50, borderRadius: 14, borderWidth: 1.5, borderColor: t.border, backgroundColor: t.input, paddingHorizontal: 16, fontSize: 14, color: t.text, fontWeight: '600' }}
              value={goalWeight}
              onChangeText={setGoalWeight}
              placeholder="70"
              placeholderTextColor={t.muted}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Calculated BMI */}
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: bmiBg, borderWidth: 1.5, borderColor: bmiBorder, borderRadius: 18, padding: 14, gap: 16 }}>
          <ProgressRing pct={70} size={60} strokeW={5} color={bmiColor} label={String(bmiVal)} theme={t} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 13, fontWeight: 'bold', color: bmiColor }}>{bmiStatus} (BMI: {bmiVal})</Text>
            <Text style={{ fontSize: 11, color: t.sub, marginTop: 2 }}>Your recommended daily calorie intake dynamically adapts to this target.</Text>
          </View>
        </View>

        {/* Activity Level Selector */}
        <View>
          <Text style={{ fontSize: 11, fontWeight: '900', color: '#DF7E2C', letterSpacing: 1.2, marginBottom: 10 }}>DAILY ACTIVITY LEVEL</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active', 'Athlete'].map(level => {
              const isSel = user.activityLevel === level;
              return (
                <TouchableOpacity
                  key={level}
                  onPress={() => setUser(prev => ({ ...prev, activityLevel: level }))}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 12,
                    borderWidth: 1.5,
                    borderColor: isSel ? B.orange : t.border,
                    backgroundColor: isSel ? (isDark ? 'rgba(233, 106, 46, 0.15)' : '#FFF4EC') : t.input
                  }}
                >
                  <Text style={{ fontSize: 11, fontWeight: '800', color: isSel ? B.orange : t.text }}>{level}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Workout Frequency */}
        <View>
          <Text style={{ fontSize: 11, fontWeight: '900', color: '#DF7E2C', letterSpacing: 1.2, marginBottom: 10 }}>WORKOUT FREQUENCY</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {['Never', '1–2 days/week', '3–4 days/week', '5–6 days/week', 'Daily'].map(freq => {
              const isSel = workoutFrequency === freq;
              return (
                <TouchableOpacity
                  key={freq}
                  onPress={() => setWorkoutFrequency(freq)}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 12,
                    borderWidth: 1.5,
                    borderColor: isSel ? B.orange : t.border,
                    backgroundColor: isSel ? (isDark ? 'rgba(233, 106, 46, 0.15)' : '#FFF4EC') : t.input
                  }}
                >
                  <Text style={{ fontSize: 11, fontWeight: '800', color: isSel ? B.orange : t.text }}>{freq}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Workout Type */}
        <View>
          <Text style={{ fontSize: 11, fontWeight: '900', color: '#DF7E2C', letterSpacing: 1.2, marginBottom: 10 }}>WORKOUT TYPE (MULTI-SELECT)</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {['Walking', 'Running', 'Gym', 'Yoga', 'Cycling', 'Swimming', 'Home Workout', 'Strength Training', 'Sports', 'Other'].map(type => {
              const isSel = workoutTypes.includes(type);
              return (
                <TouchableOpacity
                  key={type}
                  onPress={() => toggleWorkoutType(type)}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 12,
                    borderWidth: 1.5,
                    borderColor: isSel ? B.orange : t.border,
                    backgroundColor: isSel ? (isDark ? 'rgba(233, 106, 46, 0.15)' : '#FFF4EC') : t.input
                  }}
                >
                  <Text style={{ fontSize: 11, fontWeight: '800', color: isSel ? B.orange : t.text }}>{type}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    );

    // Sub-Page 2 Render
    const renderPage2 = () => {
      const showSpeed = primaryGoal === 'Lose Weight' || primaryGoal === 'Gain Weight';
      return (
        <View style={{ gap: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: '900', color: t.text }}>Page 2 — Health Goals</Text>
          <Text style={{ fontSize: 13, color: t.sub, lineHeight: 18 }}>Select your primary targets and motivations.</Text>

          {/* Primary Goal */}
          <View>
            <Text style={{ fontSize: 11, fontWeight: '900', color: '#DF7E2C', letterSpacing: 1.2, marginBottom: 10 }}>PRIMARY FITNESS GOAL</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {['Lose Weight', 'Gain Weight', 'Build Muscle', 'Maintain Weight', 'Eat Healthy', 'Improve Energy', 'Improve Fitness'].map(goal => {
                const isSel = primaryGoal === goal;
                return (
                  <TouchableOpacity
                    key={goal}
                    onPress={() => setPrimaryGoal(goal)}
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 12,
                      borderWidth: 1.5,
                      borderColor: isSel ? B.orange : t.border,
                      backgroundColor: isSel ? (isDark ? 'rgba(233, 106, 46, 0.15)' : '#FFF4EC') : t.input
                    }}
                  >
                    <Text style={{ fontSize: 11, fontWeight: '800', color: isSel ? B.orange : t.text }}>{goal}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Goal Speed (Conditional) */}
          {showSpeed ? (
            <View>
              <Text style={{ fontSize: 11, fontWeight: '900', color: '#DF7E2C', letterSpacing: 1.2, marginBottom: 10 }}>GOAL SPEED (WEIGHT CHANGE / WEEK)</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {['Slow (0.25 kg/week)', 'Moderate (0.5 kg/week)', 'Fast (0.75 kg/week)', 'Extreme (1 kg/week)'].map(speed => {
                  const isSel = goalSpeed === speed || (speed.includes(goalSpeed) && goalSpeed.length > 0);
                  return (
                    <TouchableOpacity
                      key={speed}
                      onPress={() => setGoalSpeed(speed)}
                      style={{
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        borderRadius: 12,
                        borderWidth: 1.5,
                        borderColor: isSel ? B.orange : t.border,
                        backgroundColor: isSel ? (isDark ? 'rgba(233, 106, 46, 0.15)' : '#FFF4EC') : t.input
                      }}
                    >
                      <Text style={{ fontSize: 11, fontWeight: '800', color: isSel ? B.orange : t.text }}>{speed}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ) : null}

          {/* Motivation */}
          <View>
            <Text style={{ fontSize: 11, fontWeight: '900', color: '#DF7E2C', letterSpacing: 1.2, marginBottom: 10 }}>WHAT MOTIVATES YOU?</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {[
                'Live a Healthier Lifestyle',
                "Doctor's Recommendation",
                'Build Muscle',
                'Weight Loss',
                'Better Energy',
                'Improve Sports Performance',
                'Wedding/Event',
                'Other'
              ].map(mote => {
                const isSel = motivation === mote;
                return (
                  <TouchableOpacity
                    key={mote}
                    onPress={() => setMotivation(mote)}
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 12,
                      borderWidth: 1.5,
                      borderColor: isSel ? B.orange : t.border,
                      backgroundColor: isSel ? (isDark ? 'rgba(233, 106, 46, 0.15)' : '#FFF4EC') : t.input
                    }}
                  >
                    <Text style={{ fontSize: 11, fontWeight: '800', color: isSel ? B.orange : t.text }}>{mote}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      );
    };

    // Sub-Page 3 Render
    const renderPage3 = () => (
      <View style={{ gap: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: '900', color: t.text }}>Page 3 — Food & Health Preferences</Text>
        <Text style={{ fontSize: 13, color: t.sub, lineHeight: 18 }}>Personalize your meals and list safety/allergen rules.</Text>

        {/* Dietary Preference */}
        <View>
          <Text style={{ fontSize: 11, fontWeight: '900', color: '#DF7E2C', letterSpacing: 1.2, marginBottom: 10 }}>DIETARY PREFERENCE</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {['Vegetarian', 'Non-Vegetarian', 'Eggetarian', 'Vegan'].map(pref => {
              const isSel = user.foodPref === pref || (pref === 'Vegetarian' && user.foodPref === 'Veg') || (pref === 'Non-Vegetarian' && user.foodPref === 'Non-Veg');
              return (
                <TouchableOpacity
                  key={pref}
                  onPress={() => setUser(prev => ({ ...prev, foodPref: pref }))}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 12,
                    borderWidth: 1.5,
                    borderColor: isSel ? B.orange : t.border,
                    backgroundColor: isSel ? (isDark ? 'rgba(233, 106, 46, 0.15)' : '#FFF4EC') : t.input
                  }}
                >
                  <Text style={{ fontSize: 11, fontWeight: '800', color: isSel ? B.orange : t.text }}>{pref}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Food Allergies */}
        <View>
          <Text style={{ fontSize: 11, fontWeight: '900', color: '#DF7E2C', letterSpacing: 1.2, marginBottom: 10 }}>FOOD ALLERGIES (MULTI-SELECT)</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {['Dairy', 'Eggs', 'Peanuts', 'Tree Nuts', 'Gluten', 'Soy', 'Seafood', 'Shellfish', 'Sesame', 'Other'].map(allergy => {
              const isSel = allergiesList.includes(allergy);
              return (
                <TouchableOpacity
                  key={allergy}
                  onPress={() => toggleAllergy(allergy)}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 12,
                    borderWidth: 1.5,
                    borderColor: isSel ? B.orange : t.border,
                    backgroundColor: isSel ? (isDark ? 'rgba(233, 106, 46, 0.15)' : '#FFF4EC') : t.input
                  }}
                >
                  <Text style={{ fontSize: 11, fontWeight: '800', color: isSel ? B.orange : t.text }}>{allergy}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Health Conditions */}
        <View>
          <Text style={{ fontSize: 11, fontWeight: '900', color: '#DF7E2C', letterSpacing: 1.2, marginBottom: 10 }}>HEALTH CONDITIONS (OPTIONAL / MULTI-SELECT)</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {['Diabetes', 'High Blood Pressure', 'Thyroid', 'PCOS', 'High Cholesterol', 'Kidney Disease', 'Fatty Liver', 'Heart Disease', 'None'].map(cond => {
              const isSel = healthConditions.includes(cond);
              return (
                <TouchableOpacity
                  key={cond}
                  onPress={() => toggleCondition(cond)}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 12,
                    borderWidth: 1.5,
                    borderColor: isSel ? B.orange : t.border,
                    backgroundColor: isSel ? (isDark ? 'rgba(233, 106, 46, 0.15)' : '#FFF4EC') : t.input
                  }}
                >
                  <Text style={{ fontSize: 11, fontWeight: '800', color: isSel ? B.orange : t.text }}>{cond}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Food Dislikes */}
        <View>
          <Text style={{ fontSize: 11, fontWeight: '900', color: '#DF7E2C', letterSpacing: 1.2, marginBottom: 10 }}>FOOD DISLIKES (MULTI-SELECT)</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {['Onion', 'Garlic', 'Mushroom', 'Paneer', 'Fish', 'Chicken', 'Spicy Food', 'Bitter Foods', 'Other'].map(dislike => {
              const isSel = foodDislikes.includes(dislike);
              return (
                <TouchableOpacity
                  key={dislike}
                  onPress={() => toggleDislike(dislike)}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 12,
                    borderWidth: 1.5,
                    borderColor: isSel ? B.orange : t.border,
                    backgroundColor: isSel ? (isDark ? 'rgba(233, 106, 46, 0.15)' : '#FFF4EC') : t.input
                  }}
                >
                  <Text style={{ fontSize: 11, fontWeight: '800', color: isSel ? B.orange : t.text }}>{dislike}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    );

    // Sub-Page 4 Render
    const renderPage4 = () => {
      const showCustomWater = waterIntakeGoal === 'Custom';
      const sleepHoursText = calculateSleepHours(bedtime, wakeupTime);
      return (
        <View style={{ gap: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: '900', color: t.text }}>Page 4 — Healthy Lifestyle</Text>
          <Text style={{ fontSize: 13, color: t.sub, lineHeight: 18 }}>Habit configuration and tracking integrations.</Text>

          {/* Daily Water Intake Goal */}
          <View>
            <Text style={{ fontSize: 11, fontWeight: '900', color: '#DF7E2C', letterSpacing: 1.2, marginBottom: 10 }}>DAILY WATER INTAKE GOAL</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: showCustomWater ? 10 : 0 }}>
              {['2 L', '2.5 L', '3 L', 'Custom'].map(goal => {
                const isSel = waterIntakeGoal === goal;
                return (
                  <TouchableOpacity
                    key={goal}
                    onPress={() => setWaterIntakeGoal(goal)}
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 12,
                      borderWidth: 1.5,
                      borderColor: isSel ? B.orange : t.border,
                      backgroundColor: isSel ? (isDark ? 'rgba(233, 106, 46, 0.15)' : '#FFF4EC') : t.input
                    }}
                  >
                    <Text style={{ fontSize: 11, fontWeight: '800', color: isSel ? B.orange : t.text }}>{goal}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {showCustomWater ? (
              <TextInput
                style={{ height: 50, borderRadius: 14, borderWidth: 1.5, borderColor: t.border, backgroundColor: t.input, paddingHorizontal: 16, fontSize: 14, color: t.text, fontWeight: '600' }}
                value={customWaterIntake}
                onChangeText={setCustomWaterIntake}
                placeholder="E.g. 3.5"
                placeholderTextColor={t.muted}
                keyboardType="numeric"
              />
            ) : null}
          </View>

          {/* Sleep Schedule */}
          <View>
            <Text style={{ fontSize: 11, fontWeight: '900', color: '#DF7E2C', letterSpacing: 1.2, marginBottom: 10 }}>SLEEP SCHEDULE</Text>
            <View style={{ flexDirection: 'row', gap: 12, marginBottom: 12 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 10, fontWeight: 'bold', color: t.sub, marginBottom: 6 }}>BEDTIME</Text>
                <TextInput
                  style={{ height: 50, borderRadius: 14, borderWidth: 1.5, borderColor: t.border, backgroundColor: t.input, paddingHorizontal: 16, fontSize: 14, color: t.text, fontWeight: '600' }}
                  value={bedtime}
                  onChangeText={setBedtime}
                  placeholder="22:00"
                  placeholderTextColor={t.muted}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 10, fontWeight: 'bold', color: t.sub, marginBottom: 6 }}>WAKE-UP TIME</Text>
                <TextInput
                  style={{ height: 50, borderRadius: 14, borderWidth: 1.5, borderColor: t.border, backgroundColor: t.input, paddingHorizontal: 16, fontSize: 14, color: t.text, fontWeight: '600' }}
                  value={wakeupTime}
                  onChangeText={setWakeupTime}
                  placeholder="06:00"
                  placeholderTextColor={t.muted}
                />
              </View>
            </View>

            {/* Calculated Average Sleep Hours */}
            <View style={{ backgroundColor: isDark ? 'rgba(233,106,46,0.1)' : '#FFF4EC', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: t.border, alignItems: 'center' }}>
              <Text style={{ fontSize: 12, color: t.text, fontWeight: '700' }}>
                Auto-calculated Average Sleep: <Text style={{ color: B.orange, fontWeight: '900' }}>{sleepHoursText}</Text>
              </Text>
            </View>
          </View>

          {/* Smart Notifications */}
          <View>
            <Text style={{ fontSize: 11, fontWeight: '900', color: '#DF7E2C', letterSpacing: 1.2, marginBottom: 10 }}>SMART NOTIFICATIONS (REMINDERS)</Text>
            <View style={{ gap: 8 }}>
              {[
                { key: 'meal', label: 'Meal Reminder' },
                { key: 'water', label: 'Water Reminder' },
                { key: 'workout', label: 'Workout Reminder' },
                { key: 'sleep', label: 'Sleep Reminder' },
                { key: 'orderUpdates', label: 'Order & Delivery Updates (default enabled)' }
              ].map(item => {
                const isVal = (smartNotifications as any)[item.key];
                return (
                  <TouchableOpacity
                    key={item.key}
                    onPress={() => setSmartNotifications(prev => ({ ...prev, [item.key]: !isVal }))}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: 14,
                      borderRadius: 14,
                      borderWidth: 1.5,
                      borderColor: isVal ? B.orange : t.border,
                      backgroundColor: isVal ? (isDark ? 'rgba(233, 106, 46, 0.1)' : 'rgba(233, 106, 46, 0.05)') : t.input
                    }}
                  >
                    <Text style={{ fontSize: 13, fontWeight: 'bold', color: t.text }}>{item.label}</Text>
                    <View style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      borderWidth: 2,
                      borderColor: isVal ? B.orange : t.muted,
                      backgroundColor: isVal ? B.orange : 'transparent',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      {isVal ? <Check size={12} color="#FFFFFF" strokeWidth={3} /> : null}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Connect Health Apps */}
          <View>
            <Text style={{ fontSize: 11, fontWeight: '900', color: '#DF7E2C', letterSpacing: 1.2, marginBottom: 10 }}>CONNECT HEALTH APPS (OPTIONAL)</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {['Apple Health', 'Google Fit', 'Fitbit', 'Garmin', 'Samsung Health'].map(app => {
                const isSel = connectedHealthApps.includes(app);
                return (
                  <TouchableOpacity
                    key={app}
                    onPress={() => toggleHealthApp(app)}
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 12,
                      borderWidth: 1.5,
                      borderColor: isSel ? B.orange : t.border,
                      backgroundColor: isSel ? (isDark ? 'rgba(233, 106, 46, 0.15)' : '#FFF4EC') : t.input
                    }}
                  >
                    <Text style={{ fontSize: 11, fontWeight: '800', color: isSel ? B.orange : t.text }}>{app}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      );
    };

    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: t.bg }]}>
        <View style={{ flex: 1, paddingHorizontal: 24 }}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 24 }}>
            {/* Top Progress bar and Back row */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <TouchableOpacity onPress={handleSetup3Back} style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: t.surface, borderWidth: 1.5, borderColor: t.border, justifyContent: 'center', alignItems: 'center' }}>
                <ArrowLeft size={16} color={t.text} />
              </TouchableOpacity>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ fontSize: 10, fontWeight: '900', color: B.orange, letterSpacing: 0.5 }}>STEP 3 OF 3</Text>
                <Text style={{ fontSize: 10, color: t.muted, fontWeight: 'bold', marginTop: 1 }}>Page {setup3SubPage} of 4 ({displayedPercent}% Complete)</Text>
              </View>
            </View>

            {/* Progress Line */}
            <View style={{ width: '100%', height: 6, backgroundColor: t.border, borderRadius: 3, overflow: 'hidden', marginBottom: 20 }}>
              <View style={{ width: `${progressPct}%`, height: '100%', backgroundColor: B.orange, borderRadius: 3 }} />
            </View>

            {/* Sub-page switch renderer */}
            {setup3SubPage === 1 && renderPage1()}
            {setup3SubPage === 2 && renderPage2()}
            {setup3SubPage === 3 && renderPage3()}
            {setup3SubPage === 4 && renderPage4()}

            {/* Submit / Next Button */}
            <TouchableOpacity 
              style={{
                width: '100%',
                height: 56,
                borderRadius: 28,
                marginTop: 28,
                overflow: 'hidden',
                shadowColor: B.orange,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.2,
                shadowRadius: 10,
                elevation: 5,
                marginBottom: 16
              }} 
              onPress={handleSetup3Next}
            >
              <LinearGradient colors={['#FF852C', '#FD4F1B']} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6 }}>
                <Text style={{ color: '#FFFFFF', fontSize: 16.5, fontWeight: '800' }}>
                  {setup3SubPage === 4 ? 'Complete Onboarding ✓' : 'Continue'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }function RenderHome() {
    if (!subscribed) {
      return RenderNewUserHome();
    }

    const categories = [
      { name: 'All Meals', icon: UtensilsCrossed },
      { name: 'South Indian', icon: Coffee },
      { name: 'North Indian', icon: ChefHat },
      { name: 'Healthy', icon: Leaf },
      { name: 'Snacks', icon: Flame }
    ];

    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: 'transparent' }]}>
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
              {/* Card Header & Content Wrapper */}
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

                {/* Hot packaging box image */}
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1599889958709-e609f2c47798?w=200' }} 
                  style={{ width: 64, height: 64, borderRadius: 14, borderWidth: 1, borderColor: t.border }} 
                />
              </View>

              {/* Delivery Subtext */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12, gap: 6 }}>
                <Bike size={14} color={B.orange} />
                <Text style={{ fontSize: 12, color: t.sub, fontWeight: '600' }}>
                  Arjun is <Text style={{ color: t.text, fontWeight: 'bold' }}>2.4 km away</Text> · Delivery in <Text style={{ color: B.orange, fontWeight: 'bold' }}>12 min</Text>
                </Text>
              </View>

              {/* Stepper tracking progress bar */}
              <View style={{ marginTop: 20 }}>
                {/* Visual line track */}
                <View style={{ position: 'absolute', top: 8, left: 15, right: 15, height: 3, backgroundColor: t.border, zIndex: 0 }}>
                  <View style={{ width: '50%', height: '100%', backgroundColor: B.orange }} />
                </View>

                {/* Nodes row */}
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
            {/* Monthly Dabba Plan card */}
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

            {/* Wallet Balance Card */}
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
            {/* Live Kitchen */}
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

            {/* Invite Friends */}
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

              {/* Tomorrow's dish image preview */}
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

          {/* 8. Recommended for Bhargav */}
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

  function RenderNewUserHome() {
    const categories = [
      { id: 'All Menu', label: 'All Menu', icon: LayoutGrid, color: B.orange, bg: `${B.orange}10` },
      { id: 'Veg', label: 'Veg', icon: Leaf, color: B.green, bg: `${B.green}10` },
      { id: 'Non-Veg', label: 'Non-Veg', icon: Flame, color: '#EF4444', bg: '#FEE2E2' },
      { id: 'Both', label: 'Both', icon: UtensilsCrossed, color: '#F59E0B', bg: '#FEF3C7' },
      { id: 'Lunch', label: 'Lunch', icon: Sun, color: '#10B981', bg: '#D1FAE5' },
      { id: 'Dinner', label: 'Dinner', icon: Moon, color: '#6366F1', bg: '#E0E7FF' },
    ];

    const getShortAddress = (addr: string) => {
      const parts = addr.split(',');
      if (parts.length >= 2) {
        return `${parts[0].trim()}, ${parts[1].trim()}`;
      }
      return addr;
    };

    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: 'transparent' }]}>
        <ScrollView contentContainerStyle={{ paddingBottom: 110 }} showsVerticalScrollIndicator={false}>
          
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

              {/* Delivery Location Selector */}
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

            {/* Header Right Wallet & Notification buttons */}
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

          {/* Hero Card: Today's Menu */}
          <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
            <View
              style={{
                backgroundColor: isDark ? 'rgba(233, 106, 46, 0.12)' : '#FFF6EE',
                borderRadius: 28,
                borderWidth: 1,
                borderColor: isDark ? 'rgba(233, 106, 46, 0.2)' : '#FFEAD9',
                padding: 20,
                shadowColor: B.orange,
                shadowOffset: { width: 0, height: 12 },
                shadowOpacity: 0.04,
                shadowRadius: 20,
                elevation: 3,
                overflow: 'hidden'
              }}
            >
              {/* Layout: Content on Left, Round image overlapping slightly on Right */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flex: 1, paddingRight: 10 }}>
                  <Text style={{ fontSize: 11, fontWeight: '900', color: B.orange, letterSpacing: 1.5, textTransform: 'uppercase' }}>
                    TODAY • MONDAY
                  </Text>
                  <Text style={{ fontSize: 22, fontWeight: '900', color: t.text, marginTop: 4 }}>
                    Today's Menu
                  </Text>
                  <Text style={{ fontSize: 12, color: t.sub, marginTop: 4, fontWeight: '500' }}>
                    Freshly cooked. Delivered with care.
                  </Text>
                </View>

                {/* Overlapping circle food image */}
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
                    source={{ uri: IMG.curry }}
                    style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                  />
                </View>
              </View>

              {/* Filter chips inside Hero Card */}
              <View style={{ flexDirection: 'row', gap: 8, marginTop: 18 }}>
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
            </View>
          </View>

          {/* Today's Meals Section */}
          <View style={{ marginTop: 24 }}>
            <Text style={{ fontSize: 18, fontWeight: '900', color: t.text, paddingHorizontal: 16, marginBottom: 12 }}>
              Today's Meals
            </Text>

            {/* Tabs for Lunch & Dinner */}
            <View style={{ flexDirection: 'row', paddingHorizontal: 16, gap: 12, marginBottom: 16 }}>
              {[
                { id: 'lunch', label: 'Lunch', sub: '12:00 PM – 2:30 PM', icon: Sun },
                { id: 'dinner', label: 'Dinner', sub: '7:00 PM – 9:30 PM', icon: Moon }
              ].map((tab) => {
                const isActive = newUserHomeMealTab === tab.id;
                return (
                  <TouchableOpacity
                    key={tab.id}
                    onPress={() => setNewUserHomeMealTab(tab.id as 'lunch' | 'dinner')}
                    style={{
                      flex: 1,
                      backgroundColor: isActive ? B.orangeL : t.card,
                      borderRadius: 18,
                      borderWidth: 1.5,
                      borderColor: isActive ? B.orange : t.border,
                      padding: 12,
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                      shadowColor: isActive ? B.orange : '#000',
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: isActive ? 0.04 : 0.01,
                      shadowRadius: 8,
                      elevation: isActive ? 1 : 0
                    }}
                  >
                    <tab.icon size={18} color={isActive ? B.orange : t.muted} />
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 14, fontWeight: '900', color: isActive ? B.orange : t.text }}>
                        {tab.label}
                      </Text>
                      <Text style={{ fontSize: 9.5, fontWeight: '600', color: isActive ? B.orange : t.sub, marginTop: 1 }}>
                        {tab.sub}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Side-by-side Veg & Non-Veg details */}
            <View style={{ flexDirection: 'row', paddingHorizontal: 16, gap: 12 }}>
              {/* Veg Card */}
              <View
                style={{
                  flex: 1,
                  backgroundColor: isDark ? 'rgba(59, 167, 106, 0.08)' : B.greenL,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: isDark ? 'rgba(59, 167, 106, 0.2)' : '#D6ECD9',
                  padding: 14,
                  justifyContent: 'space-between'
                }}
              >
                <View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                    <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: B.green }} />
                    <Text style={{ fontSize: 11, fontWeight: '900', color: B.green, letterSpacing: 0.5 }}>VEG</Text>
                  </View>
                  
                  {newUserHomeMealTab === 'lunch' ? (
                    <View style={{ gap: 6 }}>
                      {['Dal Tadka', 'Steamed Rice', 'Mix Veg Sabzi', 'Roti'].map((item, index) => (
                        <Text key={index} style={{ fontSize: 12, fontWeight: '700', color: t.text }}>• {item}</Text>
                      ))}
                    </View>
                  ) : (
                    <View style={{ gap: 6 }}>
                      {['Paneer Curry', 'Jeera Rice', 'Cucumber Raita'].map((item, index) => (
                        <Text key={index} style={{ fontSize: 12, fontWeight: '700', color: t.text }}>• {item}</Text>
                      ))}
                    </View>
                  )}
                </View>

                {/* Soup Bowl vector graphic at bottom right */}
                <View style={{ alignSelf: 'flex-end', marginTop: 12, opacity: 0.7 }}>
                  <Svg width={36} height={36} viewBox="0 0 24 24" fill="none" stroke={B.green} strokeWidth={1.5}>
                    <Path d="M2 12h20M12 2v3M9 3v2M15 3v2" strokeLinecap="round" />
                    <Path d="M4 12c0 4.4 3.6 8 8 8s8-3.6 8-8H4z" fill={`${B.green}10`} strokeLinecap="round" strokeLinejoin="round" />
                  </Svg>
                </View>
              </View>

              {/* Non-Veg Card */}
              <View
                style={{
                  flex: 1,
                  backgroundColor: isDark ? 'rgba(239, 68, 68, 0.08)' : '#FFF0EE',
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: isDark ? 'rgba(239, 68, 68, 0.2)' : '#FDD6D0',
                  padding: 14,
                  justifyContent: 'space-between'
                }}
              >
                <View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                    <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#EF4444' }} />
                    <Text style={{ fontSize: 11, fontWeight: '900', color: '#EF4444', letterSpacing: 0.5 }}>NON-VEG</Text>
                  </View>

                  {newUserHomeMealTab === 'lunch' ? (
                    <View style={{ gap: 6 }}>
                      {['Andhra Chicken Curry', 'Steamed Rice', 'Salad', 'Roti'].map((item, index) => (
                        <Text key={index} style={{ fontSize: 12, fontWeight: '700', color: t.text }}>• {item}</Text>
                      ))}
                    </View>
                  ) : (
                    <View style={{ gap: 6 }}>
                      {['Chicken Fry', 'Chapati', 'Onion Salad'].map((item, index) => (
                        <Text key={index} style={{ fontSize: 12, fontWeight: '700', color: t.text }}>• {item}</Text>
                      ))}
                    </View>
                  )}
                </View>

                {/* Chicken leg vector graphic at bottom right */}
                <View style={{ alignSelf: 'flex-end', marginTop: 12, opacity: 0.7 }}>
                  <Svg width={36} height={36} viewBox="0 0 24 24" fill="none" stroke={B.orange} strokeWidth={1.5}>
                    <Path d="M15 3c-2.8 0-5 2.2-5 5v1.2c0 .3-.1.6-.3.8L5.3 14.4c-.6.6-.6 1.5 0 2.1l1.1 1.1c.6.6 1.5.6 2.1 0l4.4-4.4c.2-.2.5-.3.8-.3H15c2.8 0 5-2.2 5-5s-2.2-5-5-5z" fill={`${B.orange}10`} strokeLinecap="round" strokeLinejoin="round" />
                    <Path d="M4 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" strokeLinecap="round" strokeLinejoin="round" />
                    <Path d="M8 20a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z" strokeLinecap="round" strokeLinejoin="round" />
                  </Svg>
                </View>
              </View>
            </View>

            {/* Explore Today's Menu Button */}
            <View style={{ paddingHorizontal: 16, marginTop: 14 }}>
              <TouchableOpacity
                onPress={() => go('meals')}
                style={{
                  height: 48,
                  borderRadius: 24,
                  borderWidth: 1.5,
                  borderColor: B.orange,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'transparent'
                }}
              >
                <Text style={{ color: B.orange, fontSize: 14, fontWeight: '900' }}>
                  Explore Today's Menu →
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Category Section */}
          <View style={{ marginTop: 28 }}>
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
                    borderWidth: 1,
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
                  <View style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: cat.bg, justifyContent: 'center', alignItems: 'center' }}>
                    <cat.icon size={14} color={cat.color} />
                  </View>
                  <Text style={{ fontSize: 13, fontWeight: '800', color: t.text }}>{cat.label}</Text>
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
              {/* Steel Lunchbox Image */}
              <View style={{ width: 100, height: 90, marginRight: 12 }}>
                <Image
                  source={require('./assets/premium_steel_dabba.png')}
                  style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                />
              </View>

              {/* Banner Text + CTA */}
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '900', color: t.text }}>
                  Start Your Dabba Journey
                </Text>
                <Text style={{ fontSize: 10.5, color: t.sub, marginTop: 4, fontWeight: '600', lineHeight: 15 }}>
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
                    marginTop: 12,
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
                { id: 2, name: 'Paneer Butter Masala', rating: '4.8', price: '₹149', type: 'veg', img: IMG.paneer },
                { id: 3, name: 'Chicken Curry Thali', rating: '4.7', price: '₹169', type: 'non-veg', img: IMG.chicken },
                { id: 7, name: 'Veg Pulao', rating: '4.6', price: '₹129', type: 'veg', img: IMG.rice },
                { id: 1, name: 'Dal Tadka + Rice', rating: '4.8', price: '₹119', type: 'veg', img: IMG.dal }
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
                  {/* Dish Image */}
                  <View style={{ width: '100%', height: 95 }}>
                    <Image source={{ uri: dish.img }} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
                    {/* Badge Overlay */}
                    <View style={{ position: 'absolute', top: 6, right: 6, backgroundColor: dish.type === 'veg' ? B.green : '#EF4444', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 }}>
                      <Text style={{ fontSize: 8, fontWeight: '900', color: '#FFFFFF', letterSpacing: 0.5 }}>
                        {dish.type.toUpperCase()}
                      </Text>
                    </View>
                  </View>

                  {/* Info */}
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

            <View style={{ gap: 10 }}>
              {[
                { title: '🏠 Home-Cooked with Love', desc: 'Fresh meals prepared daily.' },
                { title: '🥗 Fresh & Hygienic', desc: 'Premium ingredients.' },
                { title: '🚚 Delivered Fresh', desc: 'Hot meals delivered on time.' }
              ].map((card, idx) => (
                <View
                  key={idx}
                  style={{
                    backgroundColor: t.card,
                    borderWidth: 1,
                    borderColor: t.border,
                    borderRadius: 18,
                    padding: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.01,
                    shadowRadius: 4,
                    elevation: 1
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 14, fontWeight: '900', color: t.text }}>{card.title}</Text>
                    <Text style={{ fontSize: 11, color: t.sub, marginTop: 2, fontWeight: '500' }}>{card.desc}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

        </ScrollView>

        {/* Floating Bottom Navigation */}
        <BottomTabNav active="home" />
      </SafeAreaView>
    );
  }

  // 8. Meals Screen (Daily Menu & Customized Setup)
  function RenderMeals() {
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    // Filter logic
    const filteredMeals = mealsList.filter(m => {
      // 1. Filter by top pill type
      let matchesType = true;
      if (selectedFilter === 'Veg') matchesType = m.type === 'veg';
      else if (selectedFilter === 'Non-Veg') matchesType = m.type === 'non-veg' || m.type === 'egg';

      // 2. Filter by left sidebar day
      let matchesDay = true;
      if (selectedCategory !== 'All Categories' && selectedCategory !== 'All Menu') {
        matchesDay = m.day === selectedCategory;
      }

      return matchesType && matchesDay;
    });

    const handleSelectDay = (day: string) => {
      setSelectedCategory(day);
      setActiveMealIndex(0);
    };

    const handleSelectFilter = (f: string) => {
      setSelectedFilter(f);
      setActiveMealIndex(0);
    };

    const lunchMeals = filteredMeals.filter(m => m.when === 'lunch');
    const dinnerMeals = filteredMeals.filter(m => m.when === 'dinner');

    const renderMealCard = (item: Meal) => {
      const typeColor = item.type === 'veg' ? '#2E7D32' : item.type === 'non-veg' ? '#D32F2F' : '#F59E0B';
      const typeBg = item.type === 'veg' ? '#EAF7EE' : item.type === 'non-veg' ? '#FFEBEE' : '#FEF3C7';
      return (
        <View 
          key={item.id}
          style={{
            backgroundColor: t.card,
            borderRadius: 20,
            borderWidth: 1.5,
            borderColor: t.border,
            marginBottom: 16,
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.05,
            shadowRadius: 10,
            elevation: 3
          }}
        >
          {/* Meal Image with absolute tags */}
          <View style={{ height: 160, position: 'relative', width: '100%' }}>
            <Image source={{ uri: item.img }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
            
            {/* Top-Left Type Badge */}
            <View style={{
              position: 'absolute',
              top: 10,
              left: 10,
              backgroundColor: typeBg,
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 6,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4
            }}>
              <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: typeColor }} />
              <Text style={{ fontSize: 9, fontWeight: '900', color: typeColor, textTransform: 'uppercase' }}>
                {item.type}
              </Text>
            </View>

            {/* Bottom-Left Day Badge */}
            <View style={{
              position: 'absolute',
              bottom: 10,
              left: 10,
              backgroundColor: 'rgba(0,0,0,0.6)',
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 6
            }}>
              <Text style={{ fontSize: 9, fontWeight: '900', color: '#FFFFFF', textTransform: 'uppercase' }}>
                {item.day} {item.when}
              </Text>
            </View>

            {/* Bottom-Right Rating */}
            <View style={{
              position: 'absolute',
              bottom: 10,
              right: 10,
              backgroundColor: 'rgba(0,0,0,0.6)',
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 6,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4
            }}>
              <Text style={{ fontSize: 9, fontWeight: '900', color: '#F59E0B' }}>★</Text>
              <Text style={{ fontSize: 9, fontWeight: '900', color: '#FFFFFF' }}>{item.rating}</Text>
            </View>
          </View>

          {/* Content Details */}
          <View style={{ padding: 14 }}>
            <Text style={{ fontSize: 15, fontWeight: '900', color: t.text }}>{item.name}</Text>
            <Text style={{ fontSize: 11.5, color: t.muted, marginTop: 4, lineHeight: 16 }} numberOfLines={2}>
              {item.desc}
            </Text>

            {/* Macro Nutrition Row */}
            <View style={{
              flexDirection: 'row',
              backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : '#FFFDF9',
              borderWidth: 1,
              borderColor: t.border,
              borderRadius: 12,
              paddingVertical: 8,
              paddingHorizontal: 10,
              marginTop: 12,
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <View style={{ alignItems: 'center', flex: 1 }}>
                <Text style={{ fontSize: 12, fontWeight: '900', color: '#DF7E2C' }}>{item.cal}</Text>
                <Text style={{ fontSize: 8, fontWeight: 'bold', color: t.muted, marginTop: 2 }}>KCAL</Text>
              </View>
              <View style={{ width: 1, height: 20, backgroundColor: t.border }} />
              <View style={{ alignItems: 'center', flex: 1 }}>
                <Text style={{ fontSize: 12, fontWeight: '900', color: '#3B82F6' }}>{item.protein}g</Text>
                <Text style={{ fontSize: 8, fontWeight: 'bold', color: t.muted, marginTop: 2 }}>PROT</Text>
              </View>
              <View style={{ width: 1, height: 20, backgroundColor: t.border }} />
              <View style={{ alignItems: 'center', flex: 1 }}>
                <Text style={{ fontSize: 12, fontWeight: '900', color: '#10B981' }}>{item.carbs}g</Text>
                <Text style={{ fontSize: 8, fontWeight: 'bold', color: t.muted, marginTop: 2 }}>CARB</Text>
              </View>
              <View style={{ width: 1, height: 20, backgroundColor: t.border }} />
              <View style={{ alignItems: 'center', flex: 1 }}>
                <Text style={{ fontSize: 12, fontWeight: '900', color: '#EF4444' }}>{item.fat}g</Text>
                <Text style={{ fontSize: 8, fontWeight: 'bold', color: t.muted, marginTop: 2 }}>FAT</Text>
              </View>
            </View>

            {/* Footer Price & Buttons */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 }}>
              <Text style={{ fontSize: 16, fontWeight: '900', color: B.orange }}>{item.price}</Text>
              
              <TouchableOpacity
                onPress={() => {
                  setSelectedMealId(item.id);
                  go('meal_detail');
                }}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 14,
                  backgroundColor: B.orange
                }}
              >
                <Text style={{ fontSize: 11, fontWeight: '900', color: '#FFFFFF' }}>DETAILS</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    };

    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: t.bg, paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 0 }]}>
        <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={t.bg} />

        {/* Top Header Bar */}
        <View style={{ paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: t.border, backgroundColor: t.surface }}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: '900', color: t.text, letterSpacing: -0.5 }}>Daily Menu</Text>
            <Text style={{ fontSize: 11, color: t.muted, marginTop: 2 }}>Subscribe or order single dabbas</Text>
          </View>
          <TouchableOpacity onPress={() => go('notifications')} style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: t.card, borderWidth: 1, borderColor: t.border, justifyContent: 'center', alignItems: 'center' }}>
            <Bell size={16} color={t.text} />
          </TouchableOpacity>
        </View>

        {/* Top Type Filter Pills Row (Both, Veg, Non-Veg) */}
        <View style={{ 
          flexDirection: 'row', 
          paddingVertical: 12, 
          paddingHorizontal: 16, 
          gap: 10, 
          justifyContent: 'center', 
          backgroundColor: t.surface,
          borderBottomWidth: 1,
          borderBottomColor: t.border
        }}>
          {/* BOTH Pill */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 22,
              borderWidth: 1.5,
              borderColor: selectedFilter === 'Both' ? t.text : t.border,
              backgroundColor: selectedFilter === 'Both' ? (isDark ? '#333' : '#F5F5F5') : t.card,
              height: 40
            }}
            onPress={() => handleSelectFilter('Both')}
          >
            <Text style={{ fontSize: 11, fontWeight: '900', color: t.text }}>BOTH</Text>
          </TouchableOpacity>

          {/* VEG Pill */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 14,
              paddingVertical: 8,
              borderRadius: 22,
              borderWidth: 1.5,
              borderColor: selectedFilter === 'Veg' ? '#2E7D32' : t.border,
              backgroundColor: selectedFilter === 'Veg' ? (isDark ? 'rgba(46, 125, 50, 0.15)' : '#EAF7EE') : t.card,
              gap: 6,
              height: 40
            }}
            onPress={() => handleSelectFilter('Veg')}
          >
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#2E7D32' }} />
            <Text style={{ fontSize: 11, fontWeight: '900', color: selectedFilter === 'Veg' ? '#2E7D32' : t.text }}>VEG</Text>
          </TouchableOpacity>

          {/* NON-VEG Pill */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 14,
              paddingVertical: 8,
              borderRadius: 22,
              borderWidth: 1.5,
              borderColor: selectedFilter === 'Non-Veg' ? '#D32F2F' : t.border,
              backgroundColor: selectedFilter === 'Non-Veg' ? (isDark ? 'rgba(211, 47, 47, 0.15)' : '#FFEBEE') : t.card,
              gap: 6,
              height: 40
            }}
            onPress={() => handleSelectFilter('Non-Veg')}
          >
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#D32F2F' }} />
            <Text style={{ fontSize: 11, fontWeight: '900', color: selectedFilter === 'Non-Veg' ? '#D32F2F' : t.text }}>NON-VEG</Text>
          </TouchableOpacity>
        </View>

        {/* Main Split Screen Area */}
        <View style={{ flex: 1, flexDirection: 'row' }}>
          {/* Left Vertical Sidebar */}
          <View style={{ 
            width: 100, 
            borderRightWidth: 1, 
            borderRightColor: t.border, 
            backgroundColor: t.surface,
            paddingVertical: 10 
          }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>
              {/* All Menu */}
              <TouchableOpacity
                onPress={() => handleSelectDay('All Menu')}
                style={{
                  paddingVertical: 14,
                  paddingHorizontal: 12,
                  marginVertical: 4,
                  borderLeftWidth: 3,
                  borderLeftColor: (selectedCategory === 'All Menu' || selectedCategory === 'All Categories') ? B.orange : 'transparent',
                  backgroundColor: (selectedCategory === 'All Menu' || selectedCategory === 'All Categories') ? (isDark ? 'rgba(233, 106, 46, 0.1)' : '#FFF4EC') : 'transparent'
                }}
              >
                <Text style={{ 
                  fontSize: 12, 
                  fontWeight: (selectedCategory === 'All Menu' || selectedCategory === 'All Categories') ? '900' : '600', 
                  color: (selectedCategory === 'All Menu' || selectedCategory === 'All Categories') ? B.orange : t.text 
                }}>
                  All Menu
                </Text>
              </TouchableOpacity>

              {/* Weekdays */}
              {weekdays.map(day => {
                const isSelected = selectedCategory === day;
                return (
                  <TouchableOpacity
                    key={day}
                    onPress={() => handleSelectDay(day)}
                    style={{
                      paddingVertical: 14,
                      paddingHorizontal: 12,
                      marginVertical: 4,
                      borderLeftWidth: 3,
                      borderLeftColor: isSelected ? B.orange : 'transparent',
                      backgroundColor: isSelected ? (isDark ? 'rgba(233, 106, 46, 0.1)' : '#FFF4EC') : 'transparent'
                    }}
                  >
                    <Text style={{ 
                      fontSize: 12, 
                      fontWeight: isSelected ? '900' : '600', 
                      color: isSelected ? B.orange : t.sub 
                    }}>
                      {day}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Right Vertical Meals List */}
          <View style={{ flex: 1, backgroundColor: t.bg }}>
            <ScrollView contentContainerStyle={{ padding: 12, paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
              {/* Lunch Section */}
              {lunchMeals.length > 0 && (
                <View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8, gap: 8 }}>
                    <Sun size={14} color="#DF7E2C" />
                    <Text style={{ fontSize: 11, fontWeight: '900', color: '#DF7E2C', letterSpacing: 1.2 }}>LUNCH MENU</Text>
                  </View>
                  {lunchMeals.map(item => renderMealCard(item))}
                </View>
              )}

              {/* Dinner Section */}
              {dinnerMeals.length > 0 && (
                <View style={{ marginTop: lunchMeals.length > 0 ? 16 : 0 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8, gap: 8 }}>
                    <Moon size={14} color="#6366F1" />
                    <Text style={{ fontSize: 11, fontWeight: '900', color: '#6366F1', letterSpacing: 1.2 }}>DINNER MENU</Text>
                  </View>
                  {dinnerMeals.map(item => renderMealCard(item))}
                </View>
              )}

              {filteredMeals.length === 0 && (
                <View style={{ alignItems: 'center', marginTop: 60, paddingHorizontal: 20 }}>
                  <Text style={{ color: t.muted, fontSize: 14, fontWeight: '700', textAlign: 'center' }}>
                    No meals found for this selection
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>

        <BottomTabNav active="meals" />
      </SafeAreaView>
    );
  }
  // 9. Kitchen Screen (Live Webcast & Sourcing Documentary)
  function RenderKitchen() {
    const spaces = [
      { name: 'Vegetables Prepping', desc: 'Triple-washing in ozone water to remove pesticide residues.', icon: '🥗', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300' },
      { name: 'Stone-Ground Spices', desc: 'Slow cold-grinding to protect essential volatile oils.', icon: '🌶️', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300' },
      { name: 'Traditional Slow Cooking', desc: 'Gentle clay-pot heating maintaining glycemic properties.', icon: '🍲', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=300' },
      { name: 'Zero-Contamination Packaging', desc: 'Automated sealing in medical-grade stainless steel dabbas.', icon: '🍱', image: 'https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?w=300' }
    ];

    const standardLogs = [
      { label: 'Air filtration units checked', val: 'Every 4 hours' },
      { label: 'Floor & counters ozone sanitization', val: 'Hourly' },
      { label: 'Staff temperature & wellness audit', val: 'Every shift' },
      { label: 'Stainless-steel steam cleaning', val: 'Post-operation daily' }
    ];

    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: 'transparent' }]}>
        <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={{ paddingHorizontal: 20, paddingTop: 16 }}>
            <Text style={{ fontSize: 13, fontWeight: '900', color: B.orange, textTransform: 'uppercase', letterSpacing: 1.2 }}>Our Premium Kitchen</Text>
            <Text style={{ fontSize: 26, fontWeight: '900', color: t.text, marginTop: 4 }}>The Heart of KOI KOI</Text>
            <Text style={{ fontSize: 12.5, color: t.sub, marginTop: 8, lineHeight: 18 }}>
              Experience complete culinary honesty. Track live preparation, review our hygiene certificates, and book a physical tour of our smart kitchen.
            </Text>
          </View>

          {/* 1. Kitchen Live Broadcast Card */}
          <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
            <TouchableOpacity 
              activeOpacity={0.9}
              style={{
                backgroundColor: t.card,
                borderRadius: 24,
                borderWidth: 1.5,
                borderColor: t.border,
                overflow: 'hidden',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.02,
                shadowRadius: 10,
                elevation: 2
              }}
              onPress={() => setToast("Connecting to Live Smart Kitchen Cams... Broadcast loaded.")}
            >
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600' }} 
                style={{ width: '100%', height: 160 }} 
              />
              <View style={{
                position: 'absolute',
                top: 12,
                left: 12,
                backgroundColor: '#EF4444',
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 10,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4
              }}>
                <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#FFFFFF' }} />
                <Text style={{ fontSize: 9, fontWeight: '900', color: '#FFFFFF', letterSpacing: 0.5 }}>LIVE BROADCAST</Text>
              </View>

              <View style={{ padding: 16 }}>
                <Text style={{ fontSize: 15, fontWeight: '900', color: t.text }}>Kitchen Live Broadcast</Text>
                <Text style={{ fontSize: 11.5, color: t.sub, marginTop: 4 }}>Tap here to review real-time raw feed from prep & packaging slots.</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12, gap: 4 }}>
                  <Text style={{ fontSize: 11, fontWeight: '800', color: B.orange }}>Access Live Stream →</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* 2. Vedic Cooking Documentary */}
          <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
            <TouchableOpacity 
              activeOpacity={0.9}
              style={{
                backgroundColor: t.card,
                borderRadius: 24,
                borderWidth: 1.5,
                borderColor: t.border,
                overflow: 'hidden',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.02,
                shadowRadius: 10,
                elevation: 2
              }}
              onPress={() => setToast("Playing Vedic Cooking Documentary...")}
            >
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=600' }} 
                style={{ width: '100%', height: 140 }} 
              />
              <View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.2)'
              }}>
                <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.9)', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8 }}>
                  <Play size={20} color={B.orange} fill={B.orange} style={{ marginLeft: 3 }} />
                </View>
              </View>

              <View style={{ padding: 16 }}>
                <Text style={{ fontSize: 11, fontWeight: '900', color: B.orange, textTransform: 'uppercase', letterSpacing: 0.5 }}>Documentary</Text>
                <Text style={{ fontSize: 15, fontWeight: '900', color: t.text, marginTop: 2 }}>Vedic Cooking Documentary</Text>
                <Text style={{ fontSize: 11.5, color: t.sub, marginTop: 4 }}>Video Tour · Sourcing, Spices & Packing · 3 min</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* 3. Physical Cooking Spaces Gallery */}
          <View style={{ paddingHorizontal: 20, marginTop: 28 }}>
            <Text style={{ fontSize: 13, fontWeight: '900', color: t.text, textTransform: 'uppercase', letterSpacing: 0.5 }}>Kitchen Image Gallery</Text>
            <Text style={{ fontSize: 15, fontWeight: '900', color: t.text, marginTop: 4 }}>Physical Cooking Spaces</Text>
            <Text style={{ fontSize: 12, color: t.sub, marginTop: 4 }}>
              Click on any of our smart stations to open high-resolution walkthroughs and explanations.
            </Text>

            <View style={{ gap: 12, marginTop: 16 }}>
              {spaces.map((space, idx) => (
                <TouchableOpacity
                  key={idx}
                  activeOpacity={0.85}
                  style={{
                    backgroundColor: t.card,
                    borderRadius: 20,
                    borderWidth: 1.5,
                    borderColor: t.border,
                    overflow: 'hidden',
                    flexDirection: 'row',
                    height: 100
                  }}
                  onPress={() => setToast(`Opening ${space.name} station details...`)}
                >
                  <Image source={{ uri: space.image }} style={{ width: 100, height: '100%' }} />
                  <View style={{ flex: 1, padding: 12, justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                      <Text style={{ fontSize: 14 }}>{space.icon}</Text>
                      <Text style={{ fontSize: 14, fontWeight: '900', color: t.text }} numberOfLines={1}>{space.name}</Text>
                    </View>
                    <Text style={{ fontSize: 11, color: t.sub, marginTop: 4 }} numberOfLines={2}>{space.desc}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* 4. Meet Our Chefs */}
          <View style={{ paddingHorizontal: 20, marginTop: 28 }}>
            <Text style={{ fontSize: 13, fontWeight: '900', color: t.text, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 14 }}>Meet Our Chefs</Text>
            
            <View style={{ gap: 16 }}>
              {/* Amrita Reddy */}
              <View style={{ backgroundColor: t.card, borderRadius: 24, padding: 18, borderWidth: 1.5, borderColor: t.border }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: B.orangeL, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 24 }}>👩‍🍳</Text>
                  </View>
                  <View style={{ marginLeft: 14 }}>
                    <Text style={{ fontSize: 16, fontWeight: '900', color: t.text }}>Amrita Reddy</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2, gap: 6 }}>
                      <Text style={{ fontSize: 10, fontWeight: '900', color: B.orange }}>12+ Years EXP</Text>
                      <Text style={{ fontSize: 10, color: t.muted }}>·</Text>
                      <Text style={{ fontSize: 10.5, fontWeight: 'bold', color: t.sub }}>Head Chef & Flavor Lead</Text>
                    </View>
                  </View>
                </View>
                <View style={{ height: 1, backgroundColor: t.border, marginVertical: 12 }} />
                <Text style={{ fontSize: 11, fontWeight: '900', color: t.muted, textTransform: 'uppercase', letterSpacing: 0.5 }}>Specialization</Text>
                <Text style={{ fontSize: 13, fontWeight: '800', color: t.text, marginTop: 2 }}>Traditional Andhra & Deccani Heritage Cuisine</Text>
                <Text style={{ fontSize: 12, color: t.sub, fontStyle: 'italic', marginTop: 8, lineHeight: 16 }}>
                  "Believes slow, gentle heating preserves natural grains sweetness without needing artificial taste-enhancers."
                </Text>
              </View>

              {/* Harish Rao */}
              <View style={{ backgroundColor: t.card, borderRadius: 24, padding: 18, borderWidth: 1.5, borderColor: t.border }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: '#EAF7EE', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 24 }}>👨‍🍳</Text>
                  </View>
                  <View style={{ marginLeft: 14 }}>
                    <Text style={{ fontSize: 16, fontWeight: '900', color: t.text }}>Harish Rao</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2, gap: 6 }}>
                      <Text style={{ fontSize: 10, fontWeight: '900', color: '#2E7D32' }}>8+ Years EXP</Text>
                      <Text style={{ fontSize: 10, color: t.muted }}>·</Text>
                      <Text style={{ fontSize: 10.5, fontWeight: 'bold', color: t.sub }}>Vedic Sourcing & Prep Lead</Text>
                    </View>
                  </View>
                </View>
                <View style={{ height: 1, backgroundColor: t.border, marginVertical: 12 }} />
                <Text style={{ fontSize: 11, fontWeight: '900', color: t.muted, textTransform: 'uppercase', letterSpacing: 0.5 }}>Specialization</Text>
                <Text style={{ fontSize: 13, fontWeight: '800', color: t.text, marginTop: 2 }}>Macrobiotic & Grain Sprouting Specialist</Text>
                <Text style={{ fontSize: 12, color: t.sub, fontStyle: 'italic', marginTop: 8, lineHeight: 16 }}>
                  "Focuses entirely on sourcing single-polished rice and unrefined cold-pressed oils from local organic farms."
                </Text>
              </View>
            </View>
          </View>

          {/* 5. Strict Kitchen Standards */}
          <View style={{ paddingHorizontal: 20, marginTop: 28 }}>
            <Text style={{ fontSize: 13, fontWeight: '900', color: t.text, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>Strict Kitchen Standards</Text>
            
            {/* Hygiene Logs Card */}
            <View style={{ backgroundColor: t.card, borderRadius: 24, borderWidth: 1.5, borderColor: t.border, padding: 18 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <Text style={{ fontSize: 14, fontWeight: '900', color: t.text }}>Hygiene & Cleaning Log</Text>
                <View style={{ backgroundColor: B.green, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>
                  <Text style={{ fontSize: 9, fontWeight: '900', color: '#FFFFFF' }}>A+ GRADE</Text>
                </View>
              </View>

              <View style={{ gap: 10 }}>
                {standardLogs.map((log, idx) => (
                  <View key={idx} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: t.sub }}>{log.label}</Text>
                    <Text style={{ fontSize: 12, fontWeight: '900', color: t.text }}>{log.val}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Government License Card */}
            <View style={{ backgroundColor: t.card, borderRadius: 24, borderWidth: 1.5, borderColor: t.border, padding: 18, marginTop: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#EFF6FF', justifyContent: 'center', alignItems: 'center' }}>
                  <Award size={18} color="#3B82F6" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: '900', color: t.text }}>FSSAI Validated Certificate</Text>
                  <Text style={{ fontSize: 11, fontWeight: 'bold', color: B.orange, marginTop: 2 }}>License No: 10024010004561</Text>
                </View>
              </View>
              <Text style={{ fontSize: 11, color: t.sub, marginTop: 10, lineHeight: 15 }}>
                Under Government Food Safety Standard Act, valid & audited monthly.
              </Text>
            </View>
          </View>

          {/* 6. Open Invitation Tour Booking */}
          <View style={{ paddingHorizontal: 20, marginTop: 28, marginBottom: 20 }}>
            <View style={{ backgroundColor: t.card, borderRadius: 24, borderWidth: 1.5, borderColor: t.border, padding: 20 }}>
              <Text style={{ fontSize: 11, fontWeight: '900', color: B.orange, textTransform: 'uppercase', letterSpacing: 0.5 }}>Open Invitation Tour</Text>
              <Text style={{ fontSize: 18, fontWeight: '900', color: t.text, marginTop: 4 }}>Book a Kitchen Visit</Text>
              <Text style={{ fontSize: 12, color: t.sub, marginTop: 6, lineHeight: 17 }}>
                We maintain nothing behind closed doors. Savor the experience of physical workspace inspection. Book a free 15-minute slot below.
              </Text>

              <TouchableOpacity
                style={{
                  height: 48,
                  borderRadius: 24,
                  overflow: 'hidden',
                  marginTop: 16,
                  shadowColor: B.orange,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.15,
                  shadowRadius: 8,
                  elevation: 2
                }}
                onPress={() => go('tour_booking')}
              >
                <LinearGradient colors={['#FF852C', '#FD4F1B']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '900' }}>Request Tour Booking →</Text>
                </LinearGradient>
              </TouchableOpacity>
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

    const firstLetter = (user.name || 'Bhargav').charAt(0).toUpperCase();

    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: 'transparent' }]}>
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
                {/* Veg/Non-Veg Toggle Selector */}
                <View style={{ flexDirection: 'row', backgroundColor: t.surface, borderRadius: 12, padding: 3, borderWidth: 1, borderColor: t.border }}>
                  {['Veg', 'Non-Veg'].map(opt => {
                    const isSelected = user.foodPref === opt;
                    return (
                      <TouchableOpacity
                        key={opt}
                        onPress={() => {
                          setUser(prev => ({ ...prev, foodPref: opt }));
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
        </ScrollView>

        <BottomTabNav active="profile" />
      </SafeAreaView>
    );
  }

  // 11. Meal Detail Screen
  function RenderMealDetail() {
    const meal = mealsList.find(m => m.id === selectedMealId) || mealsList[0];

    const ingredientsTable = [
      { category: 'Cooking Base Oil', item: meal.ingredients.oil, quantity: '12 ml' },
      meal.ingredients.rice ? { category: 'Primary Grain (Rice)', item: meal.ingredients.rice, quantity: '180g cooked' } : null,
      meal.ingredients.flour ? { category: 'Primary Grain (Wheat)', item: meal.ingredients.flour, quantity: '3 Rotis (120g)' } : null,
      meal.ingredients.dal ? { category: 'Lentils / Grains', item: meal.ingredients.dal, quantity: '120g portion' } : null,
      meal.ingredients.meat ? { category: 'Protein (Halal Meat)', item: meal.ingredients.meat, quantity: '150g portion' } : null,
      meal.ingredients.dairy ? { category: 'Dairy / Cream', item: meal.ingredients.dairy.join(', '), quantity: '40g portion' } : null,
      { category: 'Fresh Vegetables', item: meal.ingredients.veg.join(', '), quantity: '150g fresh' },
      { category: 'Sourced Masala Spices', item: meal.ingredients.spices.join(', '), quantity: '8g authentic' },
    ].filter(Boolean) as { category: string; item: string; quantity: string }[];

    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: t.bg, paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 0 }]}>
        <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={t.bg} />
        
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

            {/* Ingredients table with quantities */}
            <Text style={[styles.sectionSubTitle, { color: t.text, marginTop: 24, marginBottom: 12 }]}>Ingredients Used & Quantity</Text>
            <View style={{ borderRadius: 16, overflow: 'hidden', borderWidth: 1.5, borderColor: t.border, backgroundColor: t.card }}>
              {/* Header row */}
              <View style={{ flexDirection: 'row', backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : '#F5F5F5', paddingVertical: 12, paddingHorizontal: 16, borderBottomWidth: 1.5, borderBottomColor: t.border }}>
                <Text style={{ flex: 1.2, fontSize: 11, fontWeight: '900', color: t.text, textTransform: 'uppercase', letterSpacing: 0.5 }}>Ingredient</Text>
                <Text style={{ flex: 2, fontSize: 11, fontWeight: '900', color: t.text, textTransform: 'uppercase', letterSpacing: 0.5, paddingHorizontal: 8 }}>Details</Text>
                <Text style={{ flex: 1, fontSize: 11, fontWeight: '900', color: t.text, textTransform: 'uppercase', letterSpacing: 0.5, textAlign: 'right' }}>Serving Qty</Text>
              </View>

              {/* Data rows */}
              {ingredientsTable.map((ing, idx) => (
                <View 
                  key={idx} 
                  style={{ 
                    flexDirection: 'row', 
                    paddingVertical: 14, 
                    paddingHorizontal: 16, 
                    borderBottomWidth: idx < ingredientsTable.length - 1 ? 1 : 0, 
                    borderBottomColor: t.border,
                    alignItems: 'center'
                  }}
                >
                  <Text style={{ flex: 1.2, fontSize: 12, fontWeight: '800', color: t.text }}>{ing.category}</Text>
                  <Text style={{ flex: 2, fontSize: 12, color: t.sub, paddingHorizontal: 8 }} numberOfLines={2}>{ing.item}</Text>
                  <Text style={{ flex: 1, fontSize: 12, fontWeight: '900', color: B.orange, textAlign: 'right' }}>{ing.quantity}</Text>
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
          <View style={{ gap: 12 }}>
            {addressesList.map((addr) => (
              <View 
                key={addr.id}
                style={[
                  styles.addressCard, 
                  { 
                    backgroundColor: t.card, 
                    borderColor: t.border,
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    gap: 10,
                    padding: 16
                  }
                ]}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <MapPin size={18} color={B.orange} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: t.text }}>{addr.label} Address</Text>
                    <Text style={{ fontSize: 12, color: t.muted, marginTop: 2 }}>{addr.address}</Text>
                  </View>
                </View>

                {/* Receiver Info */}
                <View style={{ borderTopWidth: 1, borderTopColor: t.border, paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ fontSize: 12, color: t.sub }}>Receiver: <Text style={{ fontWeight: 'bold', color: t.text }}>{addr.name}</Text></Text>
                  <Text style={{ fontSize: 12, color: t.sub }}>Phone: <Text style={{ fontWeight: 'bold', color: t.text }}>{addr.phone}</Text></Text>
                </View>

                {/* Building/Door image preview if exists */}
                {addr.image ? (
                  <View style={{ height: 80, borderRadius: 10, overflow: 'hidden', marginTop: 4 }}>
                    <Image source={{ uri: addr.image }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                  </View>
                ) : null}
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
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
            
            <TouchableOpacity 
              style={{
                height: 40,
                width: '100%',
                borderRadius: 20,
                overflow: 'hidden',
                marginTop: 14,
                shadowColor: B.orange,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 8,
                elevation: 2
              }}
              onPress={() => {
                setToast("Successfully added ₹500.00 to your wallet!");
              }}
            >
              <LinearGradient colors={['#FF852C', '#FD4F1B']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 6 }}>
                <Plus size={14} color="#FFFFFF" strokeWidth={3} />
                <Text style={{ color: '#FFFFFF', fontSize: 12.5, fontWeight: '900' }}>Add ₹500.00</Text>
              </LinearGradient>
            </TouchableOpacity>
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
          <View style={[styles.supportForm, { backgroundColor: t.card, borderColor: t.border, padding: 20 }]}>
            
            {/* Profile Photo selector */}
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              <TouchableOpacity 
                style={{
                  width: 84,
                  height: 84,
                  borderRadius: 42,
                  backgroundColor: '#FFF1E5',
                  borderWidth: 2,
                  borderColor: '#FFEEDB',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  shadowColor: '#A05020',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.05,
                  shadowRadius: 6,
                  elevation: 2
                }}
                onPress={() => {
                  const avatars = ['👩‍🍳', '👨‍🍳', '🥗', '🍲', '🥑', '🥦', '🥕', '🍎', '🥘'];
                  const curIdx = avatars.indexOf(user.avatar);
                  const nextIdx = (curIdx + 1) % avatars.length;
                  setUser(prev => ({ ...prev, avatar: avatars[nextIdx] }));
                  setToast('Profile Photo updated!');
                }}
              >
                <Text style={{ fontSize: 40 }}>{user.avatar}</Text>
                <View style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  backgroundColor: '#DF7E2C',
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  borderWidth: 2,
                  borderColor: '#FFFFFF',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Camera size={12} color="#FFFFFF" />
                </View>
              </TouchableOpacity>
            </View>

            {/* Inputs */}
            <View style={{ gap: 14 }}>
              <View>
                <Text style={[styles.setupLabel, { color: t.text, marginBottom: 6 }]}>Full Name</Text>
                <TextInput
                  style={[styles.setupInput, { color: t.text, backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : '#FFFFFF', borderColor: t.border, borderWidth: 1 }]}
                  value={user.name}
                  onChangeText={val => setUser(prev => ({ ...prev, name: val }))}
                />
              </View>

              <View>
                <Text style={[styles.setupLabel, { color: t.text, marginBottom: 6 }]}>Mobile Number (Read Only)</Text>
                <View style={{
                  flexDirection: 'row',
                  height: 56,
                  borderRadius: 18,
                  borderWidth: 1,
                  borderColor: t.border,
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : '#F5F6F5',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                }}>
                  <TextInput
                    style={{ flex: 1, fontSize: 14, color: t.muted, fontWeight: '600', height: '100%' }}
                    value={user.phone}
                    editable={false}
                  />
                  <Lock size={16} color={t.muted} />
                </View>
              </View>

              <View>
                <Text style={[styles.setupLabel, { color: t.text, marginBottom: 6 }]}>Email Address</Text>
                <TextInput
                  style={[styles.setupInput, { color: t.text, backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : '#FFFFFF', borderColor: t.border, borderWidth: 1 }]}
                  value={user.email}
                  onChangeText={val => setUser(prev => ({ ...prev, email: val }))}
                  keyboardType="email-address"
                />
              </View>

              <View>
                <Text style={[styles.setupLabel, { color: t.text, marginBottom: 6 }]}>Date of Birth</Text>
                <View style={{
                  flexDirection: 'row',
                  height: 56,
                  borderRadius: 18,
                  borderWidth: 1,
                  borderColor: t.border,
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : '#FFFFFF',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                }}>
                  <TextInput
                    style={{ flex: 1, fontSize: 14, color: t.text, fontWeight: '600', height: '100%' }}
                    value={user.dob}
                    onChangeText={val => setUser(prev => ({ ...prev, dob: val }))}
                    placeholder="DD/MM/YYYY"
                    placeholderTextColor={t.muted}
                    maxLength={10}
                  />
                  <Calendar size={18} color="#DF7E2C" />
                </View>
              </View>

              <View>
                <Text style={[styles.setupLabel, { color: t.text, marginBottom: 6 }]}>Gender</Text>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  {['Male', 'Female', 'Other'].map(g => {
                    const isSelected = user.gender === g;
                    return (
                      <TouchableOpacity
                        key={g}
                        style={{
                          flex: 1,
                          height: 44,
                          borderRadius: 12,
                          borderWidth: 1.5,
                          borderColor: isSelected ? '#DF7E2C' : t.border,
                          backgroundColor: isSelected ? (isDark ? '#4A2A10' : '#FFF4EC') : (isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF'),
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                        onPress={() => setUser(prev => ({ ...prev, gender: g }))}
                      >
                        <Text style={{ fontSize: 12, fontWeight: '800', color: isSelected ? '#DF7E2C' : t.text }}>
                          {g}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </View>

            <TouchableOpacity style={[styles.authBtn, { marginTop: 24 }]} onPress={() => { setToast('Details Updated!'); back(); }}>
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
    const currentPlanName = "Monthly Subscription";
    const currentPlanDetails = "Day 3 of 30 · Next: Tomorrow, 12:30 PM";
    const selectedPlan = PLANS.find(p => p.id === selectedPlanId) || PLANS[2];

    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: 'transparent' }]}>
        {/* Top Header Bar */}
        <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: t.border, backgroundColor: t.surface }}>
          <TouchableOpacity onPress={back} style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: t.card, borderWidth: 1, borderColor: t.border, justifyContent: 'center', alignItems: 'center' }}>
            <ArrowLeft size={16} color={t.text} />
          </TouchableOpacity>
          <Text style={{ fontSize: 16, fontWeight: '900', color: t.text, marginLeft: 16, letterSpacing: 0.5 }}>MY SUBSCRIPTION</Text>
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: selectedPlanId !== 'monthly' ? 220 : 110 }} showsVerticalScrollIndicator={false}>
          {/* Active subscription card section */}
          <View style={{ paddingHorizontal: 20, paddingTop: 16 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 13, fontWeight: '900', color: t.text, textTransform: 'uppercase', letterSpacing: 0.5 }}>Current Plan</Text>
              <View style={{ backgroundColor: paused ? '#F59E0B' : B.green, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>
                <Text style={{ fontSize: 9, fontWeight: '900', color: '#FFFFFF' }}>{paused ? 'PAUSED' : 'ACTIVE'}</Text>
              </View>
            </View>
            <Text style={{ fontSize: 12, color: t.sub, marginTop: 4, marginBottom: 12 }}>
              Tap your current active subscription to manage, pause, or reschedule.
            </Text>

            <TouchableOpacity 
              activeOpacity={0.85}
              onPress={() => setShowManageOptions(!showManageOptions)}
              style={{
                backgroundColor: t.card,
                borderRadius: 24,
                borderWidth: 1.5,
                borderColor: t.border,
                padding: 18,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.02,
                shadowRadius: 10,
                elevation: 2
              }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                  <Text style={{ fontSize: 16, fontWeight: '900', color: t.text }}>{currentPlanName}</Text>
                  <Text style={{ fontSize: 12, color: t.sub, marginTop: 4 }}>{currentPlanDetails}</Text>
                </View>
                <ChevronRight size={18} color={t.muted} style={{ transform: [{ rotate: showManageOptions ? '90deg' : '0deg' }] }} />
              </View>

              {/* Progress bar inside active card */}
              <View style={[styles.progressBarBG, { backgroundColor: t.surface, marginTop: 14 }]}>
                <View style={[styles.progressBarFill, { backgroundColor: B.orange, width: '90%' }]} />
              </View>
            </TouchableOpacity>
          </View>

          {/* Manage Options collapsible panel */}
          {showManageOptions && (
            <View style={{ paddingHorizontal: 20, marginTop: 12, gap: 10 }}>
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
                    <Text style={{ fontSize: 13, fontWeight: 'bold', color: t.text }}>
                      {paused ? 'Resume Deliveries' : 'Pause Plan'}
                    </Text>
                    <Text style={{ fontSize: 10.5, color: t.sub, marginTop: 1 }}>
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
                    <Text style={{ fontSize: 13, fontWeight: 'bold', color: t.text }}>Skip Tomorrow</Text>
                    <Text style={{ fontSize: 10.5, color: t.sub, marginTop: 1 }}>Skip next dabba, credit back cash</Text>
                  </View>
                </View>
                <ChevronRight size={16} color={t.muted} />
              </TouchableOpacity>
            </View>
          )}

          {/* Select Other Plans Title */}
          <View style={{ paddingHorizontal: 20, marginTop: 24, marginBottom: 12 }}>
            <Text style={{ fontSize: 14, fontWeight: '900', color: t.text, textTransform: 'uppercase', letterSpacing: 0.5 }}>Select Other Plans</Text>
          </View>

          {/* List of other plans */}
          <View style={{ paddingHorizontal: 20, gap: 12 }}>
            {PLANS.map(p => {
              const isSelected = selectedPlanId === p.id;
              return (
                <TouchableOpacity
                  key={p.id}
                  activeOpacity={0.85}
                  style={{
                    backgroundColor: t.card,
                    borderRadius: 24,
                    borderWidth: 2,
                    borderColor: isSelected ? B.orange : t.border,
                    padding: 16,
                    position: 'relative',
                    overflow: 'hidden',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: isSelected ? 0.04 : 0.01,
                    shadowRadius: 10,
                    elevation: 2
                  }}
                  onPress={() => setSelectedPlanId(p.id)}
                >
                  {/* Badge */}
                  {p.badge ? (
                    <View style={{
                      position: 'absolute',
                      top: 0,
                      right: 16,
                      backgroundColor: p.color,
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10
                    }}>
                      <Text style={{ fontSize: 8.5, fontWeight: '900', color: '#FFFFFF', letterSpacing: 0.5 }}>{p.badge}</Text>
                    </View>
                  ) : null}

                  {/* Plan Main Info */}
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <View style={{ flex: 1, marginRight: 8 }}>
                      <Text style={{ fontSize: 16, fontWeight: '900', color: t.text }}>{p.name}</Text>
                      <Text style={{ fontSize: 11, color: t.sub, marginTop: 4 }}>{p.sub}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text style={{ fontSize: 18, fontWeight: '900', color: isSelected ? B.orange : t.text }}>{p.price}</Text>
                      <Text style={{ fontSize: 9.5, color: t.muted, marginTop: 2 }}>{p.unit}</Text>
                    </View>
                  </View>

                  <View style={{ height: 1, backgroundColor: t.border, marginVertical: 12 }} />

                  {/* Perks Grid */}
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, rowGap: 8 }}>
                    {p.perks.map((perk, i) => (
                      <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 4, width: '45%' }}>
                        <Check size={12} color={B.green} strokeWidth={2.5} />
                        <Text style={{ fontSize: 10.5, color: t.sub }} numberOfLines={1}>{perk}</Text>
                      </View>
                    ))}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {/* Bottom Sticky Action Button */}
        {selectedPlanId !== 'monthly' && (
          <View style={{
            position: 'absolute',
            bottom: Platform.OS === 'ios' ? 90 : 80,
            left: 0,
            right: 0,
            backgroundColor: t.surface,
            borderTopWidth: 1.5,
            borderTopColor: t.border,
            paddingHorizontal: 20,
            paddingTop: 12,
            paddingBottom: Platform.OS === 'ios' ? 28 : 16,
            zIndex: 10
          }}>
            <TouchableOpacity
              style={{
                height: 54,
                borderRadius: 27,
                overflow: 'hidden',
                shadowColor: B.orange,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.2,
                shadowRadius: 10,
                elevation: 4
              }}
              onPress={() => {
                go('subscribe_flow');
              }}
            >
              <LinearGradient colors={['#FF852C', '#FD4F1B']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '900' }}>
                  Change to {selectedPlan.name} tier · {selectedPlan.price}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        <BottomTabNav active="plans" />
      </SafeAreaView>
    );
  }

  // 24. Subscribe Checkout Screen
  function RenderSubscribeFlow() {
    const selectedPlan = PLANS.find(p => p.id === selectedPlanId) || PLANS[2];
    const planRateNum = getNumericPrice(selectedPlan.price);
    const depositNum = 299;
    const discountNum = 100;
    const totalDueNum = planRateNum + depositNum - discountNum;

    const toggleCustomPref = (pref: string) => {
      setCheckoutCustomPrefs(prev => 
        prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
      );
    };

    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: 'transparent' }]}>
        {/* Top Header Bar */}
        <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: t.border, backgroundColor: t.surface }}>
          <TouchableOpacity onPress={back} style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: t.card, borderWidth: 1, borderColor: t.border, justifyContent: 'center', alignItems: 'center' }}>
            <ArrowLeft size={16} color={t.text} />
          </TouchableOpacity>
          <Text style={{ fontSize: 16, fontWeight: '900', color: t.text, marginLeft: 16, letterSpacing: 0.5 }}>SUBSCRIBE CHECKOUT</Text>
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 220 }} showsVerticalScrollIndicator={false}>
          {/* Plan Header Card */}
          <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
            <View style={{ backgroundColor: t.card, borderRadius: 24, padding: 20, borderWidth: 1.5, borderColor: t.border }}>
              <Text style={{ fontSize: 11, fontWeight: '900', color: B.orange, textTransform: 'uppercase', letterSpacing: 1 }}>Selected Plan</Text>
              <Text style={{ fontSize: 20, fontWeight: '900', color: t.text, marginTop: 4 }}>{selectedPlan.name} Subscription</Text>
              <Text style={{ fontSize: 12.5, color: t.sub, marginTop: 2 }}>{selectedPlan.sub}</Text>
            </View>
          </View>

          {/* 1. Meal Preference */}
          <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
            <Text style={{ fontSize: 14, fontWeight: '900', color: t.text, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>Meal Preference</Text>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              {['Veg', 'Non-Veg'].map(pref => {
                const isSelected = checkoutMealPref === pref;
                return (
                  <TouchableOpacity
                    key={pref}
                    activeOpacity={0.8}
                    style={{
                      flex: 1,
                      height: 50,
                      borderRadius: 16,
                      borderWidth: 2,
                      borderColor: isSelected ? B.orange : t.border,
                      backgroundColor: isSelected ? B.orangeL : t.card,
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                      gap: 6
                    }}
                    onPress={() => setCheckoutMealPref(pref as 'Veg' | 'Non-Veg')}
                  >
                    <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: pref === 'Veg' ? B.green : '#EF4444' }} />
                    <Text style={{ fontSize: 14, fontWeight: '800', color: isSelected ? B.orange : t.text }}>{pref}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* 2. Dabba Frequency */}
          <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
            <Text style={{ fontSize: 14, fontWeight: '900', color: t.text, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>Dabba Frequency</Text>
            <View style={{ gap: 10 }}>
              {[
                { id: 'lunch', label: '☀️ Lunch Only' },
                { id: 'dinner', label: '🌙 Dinner Only' },
                { id: 'both', label: '☀️🌙 Lunch + Dinner' }
              ].map(freq => {
                const isSelected = checkoutFreq === freq.id;
                return (
                  <TouchableOpacity
                    key={freq.id}
                    activeOpacity={0.8}
                    style={{
                      height: 52,
                      borderRadius: 16,
                      borderWidth: 2,
                      borderColor: isSelected ? B.orange : t.border,
                      backgroundColor: isSelected ? B.orangeL : t.card,
                      paddingHorizontal: 16,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                    onPress={() => setCheckoutFreq(freq.id as any)}
                  >
                    <Text style={{ fontSize: 14, fontWeight: '800', color: isSelected ? B.orange : t.text }}>{freq.label}</Text>
                    <View style={{
                      width: 18,
                      height: 18,
                      borderRadius: 9,
                      borderWidth: 2,
                      borderColor: isSelected ? B.orange : t.muted,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      {isSelected && <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: B.orange }} />}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* 3. Custom Preferences */}
          <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
            <Text style={{ fontSize: 14, fontWeight: '900', color: t.text, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>Custom Preferences</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {['Mild Spicy', 'Medium Spicy', 'Low Carb', 'High Protein', 'No Dairy'].map(pref => {
                const isSelected = checkoutCustomPrefs.includes(pref);
                return (
                  <TouchableOpacity
                    key={pref}
                    activeOpacity={0.8}
                    style={{
                      paddingHorizontal: 16,
                      paddingVertical: 10,
                      borderRadius: 16,
                      borderWidth: 1.5,
                      borderColor: isSelected ? B.orange : t.border,
                      backgroundColor: isSelected ? B.orangeL : t.card,
                    }}
                    onPress={() => toggleCustomPref(pref)}
                  >
                    <Text style={{ fontSize: 12, fontWeight: '800', color: isSelected ? B.orange : t.text }}>{pref}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* 4. Delivery Start Date */}
          <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
            <Text style={{ fontSize: 14, fontWeight: '900', color: t.text, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>Delivery Start Date</Text>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              {/* Tomorrow */}
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  flex: 1,
                  padding: 14,
                  borderRadius: 16,
                  borderWidth: 2,
                  borderColor: checkoutStartDate === 'tomorrow' ? B.orange : t.border,
                  backgroundColor: checkoutStartDate === 'tomorrow' ? B.orangeL : t.card,
                }}
                onPress={() => setCheckoutStartDate('tomorrow')}
              >
                <Text style={{ fontSize: 14, fontWeight: '900', color: checkoutStartDate === 'tomorrow' ? B.orange : t.text }}>Tomorrow</Text>
                <Text style={{ fontSize: 11, color: t.sub, marginTop: 2 }}>Starts at 12:30 PM</Text>
              </TouchableOpacity>

              {/* Custom Date */}
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  flex: 1,
                  padding: 14,
                  borderRadius: 16,
                  borderWidth: 2,
                  borderColor: checkoutStartDate === 'custom' ? B.orange : t.border,
                  backgroundColor: checkoutStartDate === 'custom' ? B.orangeL : t.card,
                }}
                onPress={() => setCheckoutStartDate('custom')}
              >
                <Text style={{ fontSize: 14, fontWeight: '900', color: checkoutStartDate === 'custom' ? B.orange : t.text }}>Custom Date</Text>
                <Text style={{ fontSize: 11, color: t.sub, marginTop: 2 }}>Select calendar slot</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 5. Pricing Details Card */}
          <View style={{ paddingHorizontal: 20, marginTop: 28 }}>
            <View style={{ backgroundColor: t.card, borderRadius: 24, borderWidth: 1.5, borderColor: t.border, padding: 18 }}>
              {/* Plan Rate */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: t.sub }}>Plan Rate ({selectedPlan.name})</Text>
                <Text style={{ fontSize: 14, fontWeight: '900', color: t.text }}>{selectedPlan.price}</Text>
              </View>

              {/* Deposit */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: t.sub }}>Steel Dabba Deposit (Refundable)</Text>
                <Text style={{ fontSize: 14, fontWeight: '900', color: t.text }}>₹299</Text>
              </View>

              {/* Discount */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: t.sub }}>Monsoon Discount</Text>
                <Text style={{ fontSize: 14, fontWeight: '900', color: B.green }}>−₹100</Text>
              </View>

              <View style={{ height: 1, backgroundColor: t.border, marginVertical: 14 }} />

              {/* Total Due */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 15, fontWeight: '900', color: t.text }}>Total Due</Text>
                <Text style={{ fontSize: 20, fontWeight: '900', color: B.orange }}>₹{totalDueNum.toLocaleString('en-IN')}</Text>
              </View>
            </View>
          </View>

          {/* Pay & Activate Subscription button at the bottom of scroll content */}
          <View style={{
            paddingHorizontal: 20,
            paddingTop: 24,
            paddingBottom: 40,
            marginTop: 20
          }}>
            <TouchableOpacity
              style={{
                height: 54,
                borderRadius: 27,
                overflow: 'hidden',
                shadowColor: B.orange,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.2,
                shadowRadius: 10,
                elevation: 4
              }}
              onPress={() => {
                setSubscribed(true);
                setToast(`${selectedPlan.name} Subscription Activated Successfully!`);
                go('home');
              }}
            >
              <LinearGradient colors={['#FF852C', '#FD4F1B']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: '900' }}>Pay & Activate Subscription</Text>
              </LinearGradient>
            </TouchableOpacity>
            <Text style={{ fontSize: 9.5, color: t.muted, textAlign: 'center', marginTop: 8 }}>
              Security SSL Encrypted · Refund of Deposit is instant on cancellation
            </Text>
          </View>
        </ScrollView>

        <BottomTabNav active="plans" />
      </SafeAreaView>
    );
  }

  // 25. Request Tour Scheduling Screen
  function RenderTourBooking() {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: 'transparent' }]}>
        {/* Top Header Bar */}
        <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: t.border, backgroundColor: t.surface }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={back} style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: t.card, borderWidth: 1, borderColor: t.border, justifyContent: 'center', alignItems: 'center' }}>
              <ArrowLeft size={16} color={t.text} />
            </TouchableOpacity>
            <Text style={{ fontSize: 16, fontWeight: '900', color: t.text, marginLeft: 16, letterSpacing: 0.5 }}>Request Tour Scheduling</Text>
          </View>
          <TouchableOpacity onPress={back}>
            <Text style={{ fontSize: 13, fontWeight: 'bold', color: B.orange }}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
          {/* Preferred Date */}
          <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
            <Text style={{ fontSize: 14, fontWeight: '900', color: t.text, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>Preferred Date</Text>
            <View style={{
              height: 56,
              borderRadius: 18,
              borderWidth: 1.5,
              borderColor: t.border,
              backgroundColor: t.card,
              paddingHorizontal: 16,
              justifyContent: 'center'
            }}>
              <TextInput
                style={{ fontSize: 14.5, color: t.text, fontWeight: '600' }}
                value={tourDate}
                onChangeText={setTourDate}
                placeholder="dd-mm-yyyy"
                placeholderTextColor={t.muted}
              />
            </View>
          </View>

          {/* Preferred Time Slot */}
          <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
            <Text style={{ fontSize: 14, fontWeight: '900', color: t.text, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>Preferred Time Slot</Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              {['10:00 AM', '11:30 AM', '4:00 PM'].map(slot => {
                const isSelected = tourTimeSlot === slot;
                return (
                  <TouchableOpacity
                    key={slot}
                    activeOpacity={0.8}
                    style={{
                      flex: 1,
                      height: 50,
                      borderRadius: 16,
                      borderWidth: 2,
                      borderColor: isSelected ? B.orange : t.border,
                      backgroundColor: isSelected ? B.orangeL : t.card,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                    onPress={() => setTourTimeSlot(slot)}
                  >
                    <Text style={{ fontSize: 13.5, fontWeight: '800', color: isSelected ? B.orange : t.text }}>{slot}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Number of Visitors */}
          <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
            <Text style={{ fontSize: 14, fontWeight: '900', color: t.text, textTransform: 'uppercase', letterSpacing: 0.5 }}>Number of Visitors</Text>
            <Text style={{ fontSize: 11, color: t.sub, marginTop: 2, marginBottom: 12 }}>(Max 4 per tour)</Text>
            
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
              {/* Minus */}
              <TouchableOpacity
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: t.card,
                  borderWidth: 1.5,
                  borderColor: t.border,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                onPress={() => setTourVisitors(prev => Math.max(1, prev - 1))}
              >
                <Text style={{ fontSize: 20, fontWeight: '900', color: t.text }}>-</Text>
              </TouchableOpacity>

              <Text style={{ fontSize: 18, fontWeight: '900', color: t.text, minWidth: 24, textAlign: 'center' }}>{tourVisitors}</Text>

              {/* Plus */}
              <TouchableOpacity
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: t.card,
                  borderWidth: 1.5,
                  borderColor: t.border,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                onPress={() => setTourVisitors(prev => Math.min(4, prev + 1))}
              >
                <Text style={{ fontSize: 20, fontWeight: '900', color: t.text }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Visitor Contact Name */}
          <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
            <Text style={{ fontSize: 14, fontWeight: '900', color: t.text, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>Visitor Contact Name</Text>
            <View style={{
              height: 56,
              borderRadius: 18,
              borderWidth: 1.5,
              borderColor: t.border,
              backgroundColor: t.card,
              paddingHorizontal: 16,
              justifyContent: 'center'
            }}>
              <TextInput
                style={{ fontSize: 14.5, color: t.text, fontWeight: '600' }}
                value={tourContactName}
                onChangeText={setTourContactName}
                placeholder="Enter Full Name"
                placeholderTextColor={t.muted}
              />
            </View>
          </View>

          {/* Contact Number */}
          <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
            <Text style={{ fontSize: 14, fontWeight: '900', color: t.text, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>Contact Number</Text>
            <View style={{
              height: 56,
              borderRadius: 18,
              borderWidth: 1.5,
              borderColor: t.border,
              backgroundColor: t.card,
              paddingHorizontal: 16,
              justifyContent: 'center'
            }}>
              <TextInput
                style={{ fontSize: 14.5, color: t.text, fontWeight: '600' }}
                value={tourContactPhone}
                onChangeText={setTourContactPhone}
                placeholder="+91 98765 43210"
                placeholderTextColor={t.muted}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Confirm Tour Request Button */}
          <View style={{ paddingHorizontal: 20, marginTop: 32 }}>
            <TouchableOpacity
              style={{
                height: 54,
                borderRadius: 27,
                overflow: 'hidden',
                shadowColor: B.orange,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.2,
                shadowRadius: 10,
                elevation: 4
              }}
              onPress={() => {
                if (!tourContactName.trim()) {
                  setToast("Please enter a contact name");
                  return;
                }
                setToast("Tour Request Confirmed successfully!");
                back();
              }}
            >
              <LinearGradient colors={['#FF852C', '#FD4F1B']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: '900' }}>Confirm Tour Request</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <BottomTabNav active="kitchen" />
      </SafeAreaView>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

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
          case 'subscribe_flow':
            return RenderSubscribeFlow();
          case 'tour_booking':
            return RenderTourBooking();
          case 'animation_demo':
            return <FluidAnimationsDemo onBack={back} />;
          default:
            return RenderHome();
        }
      })()}
      </View>

      {/* Location Search selector modal */}
      {SelectLocationSearchModal()}
      {/* Location Accuracy Permission Dialog modal */}
      {LocationAccuracyDialog()}

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
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 0,
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
