import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Home, UtensilsCrossed, Package, Wallet, User, Bell,
  ChevronRight, ArrowLeft, Sun, Moon, Star, Pause, Play,
  SkipForward, Gift, Tag, CreditCard, Check, Eye, EyeOff,
  Phone, Mail, ShieldCheck, RefreshCw, Truck, MapPin,
  Plus, LogOut, Info, HelpCircle, Shield, Award, Heart,
  MessageCircle, PhoneCall, FileText, Edit, Copy,
  CheckCircle2, RotateCcw, Monitor, Globe, Calendar,
  Zap, Banknote, AlertCircle, Share2, ChevronDown,
  Building2, Bike, Sparkles, TrendingUp, Settings,
  Navigation, Leaf, Coffee, Flame, Wind, Droplets,
  ChefHat, Camera, Video, Clock,
  Thermometer, BadgeCheck, Users, X,
} from "lucide-react";

// ─── Design Tokens ─────────────────────────────────────────────────────────

interface T {
  bg: string; surface: string; card: string;
  text: string; sub: string; muted: string;
  border: string; nav: string; input: string;
}
const LIGHT: T = {
  bg:"#FAFAF8", surface:"#F2EDE6", card:"#FFFFFF",
  text:"#1A1A1A", sub:"#4A4A4A", muted:"#999999",
  border:"rgba(0,0,0,0.07)", nav:"rgba(250,250,248,0.92)", input:"#F5F0EA",
};
const DARK: T = {
  bg:"#0E0E0E", surface:"#1C1C1C", card:"#1C1C1C",
  text:"#F5F5F5", sub:"#C0C0C0", muted:"#666666",
  border:"rgba(255,255,255,0.08)", nav:"rgba(14,14,14,0.92)", input:"#252525",
};
type AppTheme = "light"|"dark"|"system";
type Screen =
  | "splash"|"ob1"|"ob2"|"ob3"|"auth"
  | "setup1"|"setup2"|"setup3"
  | "home"|"meals"|"kitchen"|"profile"
  | "meal_detail"|"subscribe_flow"
  | "notifications"|"tracking"|"offers"|"rewards"
  | "appearance"|"support"|"addresses"|"payments"
  | "personal"|"refer"|"plans"|"health_info";

const B = {
  orange:"#E67E22", orangeL:"#FEF6EC", orangeM:"#FDEBD0",
  green:"#22C55E", greenL:"#DCFCE7",
  cream:"#FAFAF8",
};

// ─── Food Images ─────────────────────────────────────────────────────────────

const IMG = {
  dal:"https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=800&h=500&fit=crop&auto=format",
  paneer:"https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=500&fit=crop&auto=format",
  curry:"https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&h=500&fit=crop&auto=format",
  thali:"https://images.unsplash.com/photo-1680993032090-1ef7ea9b51e5?w=800&h=500&fit=crop&auto=format",
  soup:"https://images.unsplash.com/photo-1559561723-c3f4195835db?w=800&h=500&fit=crop&auto=format",
  rice:"https://images.unsplash.com/photo-1743674453123-93356ade2891?w=800&h=500&fit=crop&auto=format",
  chicken:"https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&h=500&fit=crop&auto=format",
  fish:"https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&h=500&fit=crop&auto=format",
  idli:"https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&h=500&fit=crop&auto=format",
  salad:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=500&fit=crop&auto=format",
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
  when: "lunch" | "dinner";
  type: "veg" | "non-veg" | "egg";
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
  day: string; // "Today" | "Tomorrow" | "Weekly Menu"
  ingredients: MealIngredients;
  reviews: Review[];
}

const CATEGORIES = [
  "Lunch",
  "Dinner",
  "High Protein",
  "Healthy Meals",
  "Kids Meals",
  "Senior Meals",
  "Andhra",
  "North Indian",
  "South Indian",
  "Chef Specials",
  "Seasonal Specials",
  "Vegetarian",
  "Non-Vegetarian"
];

const MEALS: Meal[] = [
  {
    id: 1,
    name: "Dal Tadka + Steamed Rice",
    img: IMG.dal,
    when: "lunch",
    type: "veg",
    categories: ["Lunch", "Healthy Meals", "Vegetarian", "North Indian", "Senior Meals"],
    cal: 380,
    protein: 14,
    carbs: 58,
    fat: 9,
    fiber: 6,
    serving: "420g",
    price: "₹149",
    rating: 4.8,
    reviewsCount: 124,
    time: "12:30 PM",
    desc: "Creamy yellow lentils tempered with cumin, garlic, pure cow ghee, and dry chillies, served with fluffy white basmati rice.",
    chef: "Chef Amrita Sen",
    isHealthy: true,
    isAvailableToday: true,
    day: "Today",
    ingredients: {
      oil: "Cold Pressed Groundnut Oil",
      rice: "Sona Masoori",
      veg: ["Fresh Local Onions", "Vine Tomatoes", "Green Chillies", "Garlic", "Ginger", "Fresh Coriander"],
      spices: ["Everest Turmeric", "MDH Chilli Powder", "Coriander Powder", "Tata Salt", "Cumin Seeds", "Mustard Seeds"],
      dairy: ["Nandini Cow Ghee"],
      dal: "Unpolished Yellow Moong & Toor Dal"
    },
    reviews: [
      { id: 101, user: "Priya K.", rating: 5, comment: "Exactly like home! The dal was perfectly spiced, not heavy at all.", date: "2 days ago", verified: true, avatar: "PK", helpful: 14 },
      { id: 102, user: "Rohit M.", rating: 4, comment: "Fresh and healthy. Delivery was spot on time.", date: "4 days ago", verified: true, avatar: "RM", helpful: 9 },
      { id: 103, user: "Suresh Rao", rating: 5, comment: "Very soft and easy to digest. Great for seniors.", date: "1 week ago", verified: true, avatar: "SR", helpful: 21 }
    ]
  },
  {
    id: 2,
    name: "Paneer Butter Masala + Roti",
    img: IMG.paneer,
    when: "dinner",
    type: "veg",
    categories: ["Dinner", "Chef Specials", "Vegetarian", "North Indian"],
    cal: 420,
    protein: 18,
    carbs: 45,
    fat: 16,
    fiber: 5,
    serving: "400g",
    price: "₹189",
    rating: 4.9,
    reviewsCount: 148,
    time: "7:30 PM",
    desc: "Fresh soft cottage cheese cubes cooked in a rich, sweet-tangy tomato-butter gravy, paired with 2 handmade soft whole-wheat rotis.",
    chef: "Chef Sanjay Kapoor",
    isHealthy: true,
    isAvailableToday: true,
    day: "Today",
    ingredients: {
      oil: "Cold Pressed Sunflower Oil",
      veg: ["Ripe Tomatoes", "Cashew Nuts", "Kasuri Methi", "Green Cardamom", "Onion Paste"],
      spices: ["MDH Garam Masala", "Kashmiri Lal Mirch", "Aachi Turmeric", "Salt"],
      dairy: ["Milky Mist Paneer", "Amul Butter", "Amul Fresh Cream"],
      flour: "Aashirvaad Fortified Wheat Flour"
    },
    reviews: [
      { id: 201, user: "Bhargav S.", rating: 5, comment: "Cottage cheese is super soft! Highly recommended.", date: "Today", verified: true, avatar: "BS", helpful: 18 },
      { id: 202, user: "Neha Sharma", rating: 5, comment: "Very premium taste. Not oily or greasy like restaurants.", date: "3 days ago", verified: true, avatar: "NS", helpful: 7 }
    ]
  },
  {
    id: 3,
    name: "Andhra Chicken + Bagara Rice",
    img: IMG.chicken,
    when: "lunch",
    type: "non-veg",
    categories: ["Lunch", "Andhra", "Non-Vegetarian", "High Protein", "Chef Specials"],
    cal: 560,
    protein: 34,
    carbs: 65,
    fat: 14,
    fiber: 4,
    serving: "450g",
    price: "₹229",
    rating: 4.7,
    reviewsCount: 92,
    time: "12:30 PM",
    desc: "Fiery, robust Andhra-style chicken curry cooked with roasted spices, Guntur red chillies, and fresh coconut, served alongside fragrant Bagara rice.",
    chef: "Chef Venkatesh Gowda",
    isHealthy: false,
    isAvailableToday: true,
    day: "Tomorrow",
    ingredients: {
      oil: "Freedom Refined Sunflower Oil",
      rice: "Premium Basmati Rice",
      veg: ["Local Red Onions", "Vine Tomatoes", "Mint Leaves", "Coriander", "Green Chillies"],
      spices: ["Aachi Andhra Chicken Masala", "Guntur Red Chilli Powder", "Eastern Turmeric", "Tata Salt"],
      dairy: ["Heritage Thick Curd"],
      meat: "Fresh Halal Chicken"
    },
    reviews: [
      { id: 301, user: "Kiran Dev", rating: 5, comment: "Perfect Guntur spice kick! The rice matches the chicken beautifully.", date: "Yesterday", verified: true, avatar: "KD", helpful: 32 },
      { id: 302, user: "Anil Kumar", rating: 4, comment: "Extremely flavorful. Proper South Indian experience.", date: "5 days ago", verified: true, avatar: "AK", helpful: 11 }
    ]
  },
  {
    id: 4,
    name: "Kerala Avial + Red Rice",
    img: IMG.salad,
    when: "lunch",
    type: "veg",
    categories: ["Lunch", "South Indian", "Healthy Meals", "Vegetarian", "Senior Meals"],
    cal: 320,
    protein: 9,
    carbs: 52,
    fat: 8,
    fiber: 9,
    serving: "380g",
    price: "₹159",
    rating: 4.6,
    reviewsCount: 54,
    time: "12:30 PM",
    desc: "A nutrient-dense traditional mix of drumstick, raw banana, carrot, and pumpkin simmered in a light coconut-yogurt paste.",
    chef: "Chef Amrita Sen",
    isHealthy: true,
    isAvailableToday: true,
    day: "Tomorrow",
    ingredients: {
      oil: "Cold Pressed Coconut Oil",
      rice: "Kerala Basmati Rice",
      veg: ["Elephant Yam", "Drumstick", "Carrots", "Raw Banana", "Pumpkin", "Curry Leaves"],
      spices: ["Freshly Ground Cumin", "Green Chillies", "Turmeric Powder", "Salt"],
      dairy: ["Milky Mist Curd"]
    },
    reviews: [
      { id: 401, user: "Suresh P.", rating: 5, comment: "Very authentic. The red rice is very nutritious.", date: "4 days ago", verified: true, avatar: "SP", helpful: 5 }
    ]
  },
  {
    id: 5,
    name: "Double Egg Masala + Jeera Rice",
    img: IMG.curry,
    when: "dinner",
    type: "egg",
    categories: ["Dinner", "High Protein", "North Indian", "Andhra"],
    cal: 440,
    protein: 22,
    carbs: 55,
    fat: 12,
    fiber: 4,
    serving: "420g",
    price: "₹169",
    rating: 4.5,
    reviewsCount: 88,
    time: "7:30 PM",
    desc: "Two organic farm eggs boiled and gently sautéed in a spiced onion-tomato pan gravy with roasted cumin seeds and fresh cilantro.",
    chef: "Chef Sanjay Kapoor",
    isHealthy: true,
    isAvailableToday: true,
    day: "Tomorrow",
    ingredients: {
      oil: "Fortune Rice Bran Oil",
      rice: "Sona Masoori",
      veg: ["Onions", "Tomatoes", "Capsicum", "Ginger-Garlic Paste", "Coriander"],
      spices: ["Everest Garam Masala", "MDH Kasuri Methi", "Turmeric Powder", "Chilli Powder", "Cumin Seeds"]
    },
    reviews: [
      { id: 501, user: "Vikas J.", rating: 4, comment: "Superb high protein meal after my gym session.", date: "1 week ago", verified: true, avatar: "VJ", helpful: 10 }
    ]
  },
  {
    id: 6,
    name: "Kids Paneer Wrap & Sweet Kheer",
    img: IMG.soup,
    when: "dinner",
    type: "veg",
    categories: ["Dinner", "Kids Meals", "Vegetarian"],
    cal: 390,
    protein: 15,
    carbs: 60,
    fat: 10,
    fiber: 3,
    serving: "350g",
    price: "₹129",
    rating: 4.9,
    reviewsCount: 40,
    time: "7:30 PM",
    desc: "A non-spicy, healthy paneer and vegetable wrap accompanied by a cup of sweet, high-protein kheer sweetened with organic jaggery.",
    chef: "Chef Amrita Sen",
    isHealthy: true,
    isAvailableToday: true,
    day: "Today",
    ingredients: {
      oil: "Fortune Rice Bran Oil",
      veg: ["Sweet Corn", "Grated Carrots", "Bell Peppers", "Green Peas"],
      spices: ["Coriander Powder", "Mild Turmeric", "Salt"],
      dairy: ["Milky Mist Paneer", "Heritage Milk"],
      flour: "Pillsbury Chakki Atta"
    },
    reviews: [
      { id: 601, user: "Ananya S.", rating: 5, comment: "My 6 year old daughter loved the sweet kheer and soft roll! Perfect.", date: "2 days ago", verified: true, avatar: "AS", helpful: 4 }
    ]
  },
  {
    id: 7,
    name: "Grilled Chicken & Quinoa",
    img: IMG.chicken,
    when: "lunch",
    type: "non-veg",
    categories: ["Lunch", "High Protein", "Healthy Meals", "Non-Vegetarian"],
    cal: 480,
    protein: 42,
    carbs: 40,
    fat: 11,
    fiber: 8,
    serving: "410g",
    price: "₹249",
    rating: 4.9,
    reviewsCount: 210,
    time: "12:30 PM",
    desc: "Tender, high-protein grilled chicken breast rubbed with rosemary and thyme, served alongside organic red and white quinoa and sautéed broccoli.",
    chef: "Chef Venkatesh Gowda",
    isHealthy: true,
    isAvailableToday: true,
    day: "Today",
    ingredients: {
      oil: "Fortune Rice Bran Oil",
      veg: ["Broccoli Florets", "Baby Corn", "English Carrots", "Garlic Herb Rub"],
      spices: ["Black Pepper Powder", "Sea Salt", "Oregano", "Thyme", "Rosemary Extract"],
      meat: "Halal Lean Chicken Breast"
    },
    reviews: [
      { id: 701, user: "Varun Gym", rating: 5, comment: "Incredible macro profile! 42g protein, very clean taste.", date: "3 days ago", verified: true, avatar: "VG", helpful: 44 },
      { id: 702, user: "Riya S.", rating: 5, comment: "Very nutritious and filling. Quinoa is cooked perfectly.", date: "Yesterday", verified: true, avatar: "RS", helpful: 15 }
    ]
  },
  {
    id: 8,
    name: "Classic Dal Makhani + Jeera Rice",
    img: IMG.rice,
    when: "dinner",
    type: "veg",
    categories: ["Dinner", "North Indian", "Chef Specials", "Vegetarian"],
    cal: 450,
    protein: 16,
    carbs: 62,
    fat: 14,
    fiber: 7,
    serving: "440g",
    price: "₹179",
    rating: 4.8,
    reviewsCount: 165,
    time: "7:30 PM",
    day: "Tomorrow",
    desc: "Whole black lentils and red kidney beans slow cooked overnight on charcoal, finished with churned butter and fresh cream.",
    chef: "Chef Sanjay Kapoor",
    isHealthy: true,
    isAvailableToday: true,
    ingredients: {
      oil: "Cold Pressed Groundnut Oil",
      rice: "Premium Basmati Rice",
      veg: ["Tomatoes", "Onions", "Ginger-Garlic Paste", "Kasuri Methi"],
      spices: ["MDH Kitchen King", "Kashmiri Lal Mirch", "Turmeric", "Salt"],
      dairy: ["Amul Butter", "Amul Fresh Cream"]
    },
    reviews: [
      { id: 801, user: "Deepak T.", rating: 5, comment: "Best Dal Makhani in town. Super rich yet healthy.", date: "2 days ago", verified: true, avatar: "DT", helpful: 19 }
    ]
  },
  {
    id: 9,
    name: "Ragi Idli with Sambar + Chutney",
    img: IMG.idli,
    when: "lunch",
    type: "veg",
    categories: ["Lunch", "South Indian", "Healthy Meals", "Vegetarian", "Senior Meals"],
    cal: 290,
    protein: 8,
    carbs: 48,
    fat: 6,
    fiber: 8,
    serving: "340g",
    price: "₹109",
    rating: 4.7,
    reviewsCount: 83,
    time: "12:30 PM",
    desc: "Steam-cooked calcium-rich finger millet idlis served with home-style mixed vegetable sambar and tangy fresh coconut chutney.",
    chef: "Chef Venkatesh Gowda",
    isHealthy: true,
    isAvailableToday: true,
    day: "Today",
    ingredients: {
      oil: "Fortune Rice Bran Oil",
      veg: ["Bottle Gourd", "Pumpkin", "Onion Slices", "Curry Leaves", "Coconut Crust"],
      spices: ["Everest Sambar Powder", "Asafoetida", "Mustard Seeds", "Tata Salt"],
      dairy: []
    },
    reviews: [
      { id: 901, user: "Siddharth", rating: 5, comment: "Ragi idlis are so soft! Love the sugar-free coconut chutney too.", date: "Yesterday", verified: true, avatar: "S", helpful: 12 }
    ]
  },
  {
    id: 10,
    name: "Tangy Gongura Mutton Curry",
    img: IMG.thali,
    when: "dinner",
    type: "non-veg",
    categories: ["Dinner", "Andhra", "Non-Vegetarian", "Chef Specials", "High Protein"],
    cal: 620,
    protein: 36,
    carbs: 58,
    fat: 18,
    fiber: 6,
    serving: "480g",
    price: "₹269",
    rating: 4.9,
    reviewsCount: 105,
    time: "7:30 PM",
    desc: "Tender goat meat chunks slow simmered in an authentic spicy, tangy gongura (sorrel leaves) paste, paired with hot steamed ragi ball.",
    chef: "Chef Venkatesh Gowda",
    isHealthy: false,
    isAvailableToday: true,
    day: "Today",
    ingredients: {
      oil: "Cold Pressed Groundnut Oil",
      veg: ["Fresh Gongura Leaves", "Guntur Green Chillies", "Garlic Bulbs", "Red Onions"],
      spices: ["Aachi Meat Masala", "Coriander Seeds", "Cumin", "Turmeric", "Tata Salt"],
      meat: "Fresh Local Halal Mutton"
    },
    reviews: [
      { id: 1001, user: "Venkat R.", rating: 5, comment: "Simply sensational. Tangy, spicy, and the mutton melts in mouth.", date: "4 days ago", verified: true, avatar: "VR", helpful: 26 }
    ]
  },
  {
    id: 11,
    name: "Rainy Day Moong Bhajia + Kadhi",
    img: IMG.curry,
    when: "lunch",
    type: "veg",
    categories: ["Lunch", "Seasonal Specials", "Vegetarian"],
    cal: 370,
    protein: 12,
    carbs: 50,
    fat: 11,
    fiber: 5,
    serving: "360g",
    price: "₹129",
    rating: 4.8,
    reviewsCount: 154,
    time: "12:30 PM",
    desc: "Crispy fried golden yellow lentil dumplings served inside a hot, spiced buttermilk kadhi soup with coriander.",
    chef: "Chef Amrita Sen",
    isHealthy: true,
    isAvailableToday: true,
    day: "Today",
    ingredients: {
      oil: "Fortune Rice Bran Oil",
      veg: ["Fresh Coriander", "Ginger Slices", "Green Chillies", "Onions"],
      spices: ["Aachi Turmeric", "MDH Hing (Asafoetida)", "Cumin Seeds", "Salt"],
      dairy: ["Nandini Curd", "Amul Butter"]
    },
    reviews: [
      { id: 1101, user: "Meera Nair", rating: 5, comment: "Reminds me of my grandmother's cooking on a rainy day!", date: "Today", verified: true, avatar: "MN", helpful: 14 }
    ]
  }
];

const PLANS = [
  { id:"daily", name:"Daily", badge:"", price:"₹180", unit:"/day", sub:"Pay as you go · No commitment", color:"#4A4A4A", perks:["1 meal slot","Any cuisine","Cancel anytime"] },
  { id:"weekly", name:"Weekly", badge:"POPULAR", price:"₹1,099", unit:"/week", sub:"₹157/day · Save 13%", color:B.orange, perks:["Lunch + Dinner","14 meals","1 skip per week"] },
  { id:"monthly", name:"Monthly", badge:"BEST VALUE", price:"₹3,999", unit:"/month", sub:"₹133/day · Save 26%", color:"#6366F1", perks:["Lunch + Dinner","60 meals","Pause anytime","Priority support"] },
  { id:"family", name:"Family", badge:"", price:"₹6,999", unit:"/month", sub:"For 2 people · ₹3,500/person", color:"#EC4899", perks:["2 dabba sets","All meals included","Custom preferences"] },
  { id:"student", name:"Student", badge:"", price:"₹2,499", unit:"/month", sub:"Valid student ID required", color:"#0EA5E9", perks:["Lunch only","25 meals","Student pricing"] },
  { id:"corporate", name:"Corporate", badge:"", price:"₹8,999", unit:"/month", sub:"For 5+ employees", color:"#8B5CF6", perks:["Bulk pricing","Office delivery","Invoice & GST"] },
];

// ─── Animation Primitives ────────────────────────────────────────────────────

function FadeUp({ children, delay=0, className="" }: { children:React.ReactNode; delay?:number; className?:string }) {
  return (
    <motion.div className={className}
      initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }}
      transition={{ duration:0.42, delay, ease:[0.25,0.1,0.25,1] }}>
      {children}
    </motion.div>
  );
}

function FadeIn({ children, delay=0 }: { children:React.ReactNode; delay?:number }) {
  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.35, delay }}>
      {children}
    </motion.div>
  );
}

function FloatIll({ children }: { children:React.ReactNode }) {
  return (
    <motion.div animate={{ y:[-7,7,-7] }} transition={{ duration:3.8, repeat:Infinity, ease:"easeInOut" }}>
      {children}
    </motion.div>
  );
}

function OrgBlob({ x, y, size, color, opacity=0.07, blur=28 }: { x:number|string; y:number|string; size:number; color:string; opacity?:number; blur?:number }) {
  return (
    <div style={{
      position:"absolute", width:size, height:size*0.85,
      left:x, top:y, background:color,
      borderRadius:"63% 37% 54% 46% / 55% 48% 52% 45%",
      opacity, filter:`blur(${blur}px)`, pointerEvents:"none", zIndex:0,
    }} />
  );
}

function ProgressRing({ pct, size=72, strokeW=5, color=B.orange, label, sub }: {
  pct:number; size?:number; strokeW?:number; color?:string; label:string; sub?:string;
}) {
  const r = (size - strokeW * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - Math.min(pct,100)/100);
  return (
    <div style={{ position:"relative", width:size, height:size, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
      <svg width={size} height={size} style={{ position:"absolute", transform:"rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color+"22"} strokeWidth={strokeW} />
        <motion.circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={strokeW}
          strokeLinecap="round" strokeDasharray={circ}
          initial={{ strokeDashoffset:circ }}
          animate={{ strokeDashoffset:offset }}
          transition={{ duration:1.5, ease:[0.34,1.56,0.64,1], delay:0.3 }} />
      </svg>
      <div style={{ textAlign:"center", zIndex:1 }}>
        <p style={{ fontSize:size*0.22, fontWeight:900, color, lineHeight:1.1, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{label}</p>
        {sub && <p style={{ fontSize:size*0.12, color:"#999", marginTop:1 }}>{sub}</p>}
      </div>
    </div>
  );
}

function Shimmer({ w="100%", h=20, br=10, dark=false }: { w?:string|number; h?:number; br?:number; dark?:boolean }) {
  return (
    <div style={{ width:w, height:h, borderRadius:br, overflow:"hidden", background:dark?"#202020":"#EDE8DF", position:"relative" }}>
      <motion.div
        animate={{ x:["-100%","200%"] }}
        transition={{ duration:1.6, repeat:Infinity, ease:"linear", repeatDelay:0.3 }}
        style={{ position:"absolute", top:0, bottom:0, width:"50%", background:`linear-gradient(90deg,transparent,${dark?"rgba(255,255,255,0.07)":"rgba(255,255,255,0.6)"},transparent)` }} />
    </div>
  );
}

function SuccessCheck({ size=80, color=B.green }: { size?:number; color?:string }) {
  const r = size * 0.42; const circ = 2 * Math.PI * r;
  return (
    <motion.div initial={{ scale:0, opacity:0 }} animate={{ scale:1, opacity:1 }}
      transition={{ type:"spring", stiffness:220, damping:18, delay:0.1 }}
      style={{ width:size, height:size, position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <svg width={size} height={size} style={{ position:"absolute", transform:"rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill={color+"15"} />
        <motion.circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={size*0.065}
          strokeLinecap="round" strokeDasharray={circ}
          initial={{ strokeDashoffset:circ }} animate={{ strokeDashoffset:0 }}
          transition={{ duration:0.75, ease:"easeOut", delay:0.25 }} />
      </svg>
      <motion.svg width={size*0.46} height={size*0.34} style={{ position:"absolute" }}
        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.7 }}>
        <motion.path d={`M4 ${size*0.16} L${size*0.17} ${size*0.28} L${size*0.42} ${size*0.04}`}
          fill="none" stroke={color} strokeWidth={size*0.068} strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength:0 }} animate={{ pathLength:1 }}
          transition={{ duration:0.45, ease:"easeOut", delay:0.72 }} />
      </motion.svg>
    </motion.div>
  );
}

function PulsingDot({ color=B.orange, size=10 }: { color?:string; size?:number }) {
  return (
    <div style={{ position:"relative", width:size, height:size, flexShrink:0 }}>
      <motion.div style={{ position:"absolute", inset:-4, borderRadius:"50%", background:color, opacity:0.25 }}
        animate={{ scale:[1,1.8,1] }} transition={{ duration:1.8, repeat:Infinity, ease:"easeInOut" }} />
      <div style={{ width:size, height:size, borderRadius:"50%", background:color }} />
    </div>
  );
}

function SkeletonCard({ t }: { t:T }) {
  return (
    <div className="rounded-[24px] overflow-hidden" style={{ background:t.card }}>
      <Shimmer h={180} br={0} dark={t.card === "#1C1C1C"} />
      <div className="p-4 flex flex-col gap-2.5">
        <Shimmer h={16} br={8} dark={t.card === "#1C1C1C"} />
        <Shimmer h={12} w="70%" br={6} dark={t.card === "#1C1C1C"} />
        <div className="flex gap-3 mt-1">
          <Shimmer h={10} w={70} br={5} dark={t.card === "#1C1C1C"} />
          <Shimmer h={10} w={80} br={5} dark={t.card === "#1C1C1C"} />
          <Shimmer h={10} w={60} br={5} dark={t.card === "#1C1C1C"} />
        </div>
      </div>
    </div>
  );
}

// ─── Seasonal Banner ──────────────────────────────────────────────────────────

function SeasonalBanner({ go, t }: { go:(s:Screen)=>void; t:T }) {
  return (
    <motion.div whileTap={{ scale:0.98 }} onClick={()=>go("offers")}
      className="mx-5 rounded-[24px] overflow-hidden relative cursor-pointer"
      style={{ background:"linear-gradient(135deg,#1A0A00 0%,#5C2200 60%,#8B3A0A 100%)" }}>
      {/* Organic shapes */}
      <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none" }}>
        <div style={{ position:"absolute", width:140, height:120, background:B.orange, borderRadius:"60% 40% 70% 30%/50% 60% 40% 50%", opacity:0.18, top:-30, right:-20, filter:"blur(20px)" }} />
        <div style={{ position:"absolute", width:80, height:70, background:"#FFD700", borderRadius:"50%", opacity:0.1, bottom:-10, left:100, filter:"blur(15px)" }} />
      </div>
      <div className="relative flex items-center justify-between p-4 gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Flame size={13} color="#FCD34D" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white opacity-60">Limited Time</span>
          </div>
          <p className="text-[18px] font-black text-white leading-tight mb-0.5">Monsoon Special 🌧️</p>
          <p className="text-[11px] text-white opacity-65">Hot Khichdi added this week</p>
        </div>
        <div>
          <button className="px-4 py-2.5 rounded-[14px] text-[12px] font-black text-white whitespace-nowrap" style={{ background:B.orange }}>View</button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Shared Atoms ─────────────────────────────────────────────────────────────

const cardTap = { whileTap:{ scale:0.97 }, transition:{ type:"spring", stiffness:400, damping:30 } };
const pageIn = { initial:{ opacity:0, y:16 }, animate:{ opacity:1, y:0 }, exit:{ opacity:0, y:-8 }, transition:{ duration:0.22, ease:[0.25,0.1,0.25,1] } };

function OrangeBtn({ label, onClick, sm, icon, bg }: { label:string; onClick?:()=>void; sm?:boolean; icon?:React.ReactNode; bg?:string }) {
  return (
    <motion.button whileTap={{ scale:0.96 }} onClick={onClick}
      className={`w-full ${sm?"py-3.5 text-sm":"py-[16px] text-[15px]"} rounded-[20px] text-white font-bold flex items-center justify-center gap-2`}
      style={{ background:bg||B.orange, boxShadow:`0 6px 24px ${B.orange}35` }}>
      {icon}{label}
    </motion.button>
  );
}

function GBtn({ label, onClick }: { label:string; onClick?:()=>void }) {
  return (
    <motion.button whileTap={{ scale:0.97 }} onClick={onClick}
      className="w-full py-[15px] rounded-[20px] text-[15px] font-bold border-2"
      style={{ color:B.orange, borderColor:B.orange, background:"transparent" }}>
      {label}
    </motion.button>
  );
}

function Card({ children, t, p="p-4", className="", onClick }: { children:React.ReactNode; t:T; p?:string; className?:string; onClick?:()=>void }) {
  return (
    <motion.div {...(onClick ? cardTap : {})} onClick={onClick}
      className={`rounded-[24px] ${p} ${className} ${onClick?"cursor-pointer":""}`}
      style={{ background:t.card, boxShadow:"0 2px 20px rgba(0,0,0,0.06)" }}>
      {children}
    </motion.div>
  );
}

function BackBar({ title, onBack, t, right }: { title:string; onBack:()=>void; t:T; right?:React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-6 pt-6 pb-4"
      style={{ flexShrink:0, position:"sticky", top:0, zIndex:10, background:t.bg }}>
      <motion.button whileTap={{ scale:0.9 }} onClick={onBack}
        className="w-11 h-11 rounded-full flex items-center justify-center"
        style={{ background:t.surface }}>
        <ArrowLeft size={18} color={t.text} />
      </motion.button>
      <h2 className="text-[17px] font-bold absolute left-1/2 -translate-x-1/2"
        style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", color:t.text }}>{title}</h2>
      <div>{right||<div className="w-11" />}</div>
    </div>
  );
}

function VegPill({ veg }: { veg:boolean }) {
  return (
    <div className="flex items-center gap-1 px-2 py-1 rounded-lg border" style={{ borderColor:veg?B.green:"#EF4444", background:"rgba(255,255,255,0.92)" }}>
      <div className="w-2 h-2 rounded-full" style={{ background:veg?B.green:"#EF4444" }} />
      <span className="text-[9px] font-black" style={{ color:veg?B.green:"#EF4444" }}>{veg?"VEG":"NON-VEG"}</span>
    </div>
  );
}

function Stars({ val, onChange }: { val:number; onChange?:(v:number)=>void }) {
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map(i=>(
        <motion.button key={i} whileTap={{ scale:1.35 }} onClick={()=>onChange?.(i)}>
          <Star size={14} fill={i<=val?B.orange:"none"} color={i<=val?B.orange:"#D1D5DB"} />
        </motion.button>
      ))}
    </div>
  );
}

function MacroChip({ val, label, color }: { val:string; label:string; color:string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-[13px] font-black leading-none" style={{ color }}>{val}</p>
      <p className="text-[9px] font-semibold" style={{ color:"#999" }}>{label}</p>
    </div>
  );
}

// ─── Floating Bottom Nav ─────────────────────────────────────────────────────

function FloatNav({ active, go, t }: { active:string; go:(s:Screen)=>void; t:T }) {
  const tabs = [
    { id:"home", s:"home" as Screen, I:Home, label:"Home" },
    { id:"meals", s:"meals" as Screen, I:UtensilsCrossed, label:"Meals" },
    { id:"plans", s:"plans" as Screen, I:Calendar, label:"Plans" },
    { id:"kitchen", s:"kitchen" as Screen, I:ChefHat, label:"Kitchen" },
    { id:"profile", s:"profile" as Screen, I:User, label:"Profile" },
  ];
  return (
    <div className="absolute bottom-0 left-0 right-0 px-3 pb-2.5 pointer-events-none">
      <motion.div className="rounded-[28px] px-1.5 py-1.5 flex items-center pointer-events-auto"
        initial={{ y:30, opacity:0 }} animate={{ y:0, opacity:1 }}
        transition={{ type:"spring", stiffness:200, damping:22, delay:0.4 }}
        style={{ background:t.nav, backdropFilter:"blur(28px)", WebkitBackdropFilter:"blur(28px)", boxShadow:"0 8px 40px rgba(0,0,0,0.14)" }}>
        {tabs.map(tab => {
          const on = active === tab.id;
          return (
            <motion.button key={tab.id} onClick={()=>go(tab.s)}
              className="flex-1 flex flex-col items-center gap-1 py-1.5 rounded-[16px] min-w-0"
              animate={{ background: on ? B.orangeL : "rgba(0,0,0,0)" }}
              transition={{ duration:0.18 }}>
              <motion.div animate={{ scale: on ? 1.08 : 1 }} transition={{ type:"spring", stiffness:400, damping:28 }}>
                <tab.I size={18} color={on?B.orange:t.muted} />
              </motion.div>
              <span className="text-[8px] font-bold truncate w-full text-center px-0.5" style={{ color:on?B.orange:t.muted }}>{tab.label}</span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}

function WithNav({ tab, children, go, t }: { tab:string; children:React.ReactNode; go:(s:Screen)=>void; t:T }) {
  return (
    <div style={{ flex:1, minHeight:0, position:"relative", display:"flex", flexDirection:"column", background:t.bg }}>
      <div style={{ flex:1, minHeight:0, overflowY:"auto", paddingBottom:108, scrollbarWidth:"none", WebkitOverflowScrolling:"touch" } as any}>
        {children}
      </div>
      <FloatNav active={tab} go={go} t={t} />
    </div>
  );
}

// ─── Rich Illustrations ───────────────────────────────────────────────────────

function IllDelivery() {
  return (
    <svg viewBox="0 0 280 240" fill="none" className="w-full h-full">
      <circle cx="140" cy="120" r="110" fill={B.orangeL} />
      <circle cx="140" cy="120" r="85" fill={B.orangeM} opacity="0.5" />
      {/* Subtle decorative rings */}
      <circle cx="140" cy="120" r="105" stroke={B.orange} strokeWidth="0.5" opacity="0.15" />
      <circle cx="140" cy="120" r="65" stroke={B.orange} strokeWidth="0.5" opacity="0.1" />
      <circle cx="140" cy="76" r="26" fill="#F0C27A" />
      <path d="M115 71 Q120 54 140 50 Q160 54 165 71" fill="#3D1F00" />
      <circle cx="132" cy="73" r="3" fill="#3D1F00" /><circle cx="148" cy="73" r="3" fill="#3D1F00" />
      <path d="M133 83 Q140 89 147 83" stroke="#3D1F00" strokeWidth="2" strokeLinecap="round" fill="none" />
      <rect x="118" y="102" width="44" height="52" rx="14" fill={B.orange} />
      <rect x="122" y="108" width="36" height="8" rx="4" fill="#F5921A" opacity="0.5" />
      <rect x="90" y="104" width="29" height="11" rx="5.5" fill="#F0C27A" />
      <rect x="162" y="104" width="29" height="11" rx="5.5" fill="#F0C27A" />
      <rect x="60" y="108" width="32" height="28" rx="6" fill="#C8C8C8" />
      <rect x="63" y="112" width="26" height="4" rx="2" fill="#DCDCDC" />
      <rect x="63" y="119" width="26" height="4" rx="2" fill="#DCDCDC" />
      <rect x="63" y="126" width="26" height="4" rx="2" fill="#DCDCDC" />
      <rect x="66" y="103" width="18" height="7" rx="3.5" fill="#B0B0B0" />
      <rect x="163" y="104" width="24" height="32" rx="7" fill="#CC6000" />
      <rect x="166" y="108" width="18" height="3" rx="1.5" fill={B.orange} opacity="0.6" />
      <rect x="124" y="154" width="15" height="32" rx="7.5" fill="#374151" />
      <rect x="141" y="154" width="15" height="32" rx="7.5" fill="#374151" />
      <ellipse cx="131" cy="186" rx="13" ry="6" fill="#1F2937" />
      <ellipse cx="148" cy="186" rx="13" ry="6" fill="#1F2937" />
      {/* Steam wisps */}
      <path d="M72 88 Q68 80 72 72" stroke={B.orange} strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M80 98 Q76 90 80 82" stroke={B.orange} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.35" />
      <ellipse cx="140" cy="202" rx="60" ry="9" fill={B.orange} opacity="0.1" />
    </svg>
  );
}

function IllDabba() {
  return (
    <svg viewBox="0 0 280 240" fill="none" className="w-full h-full">
      <circle cx="140" cy="120" r="110" fill={B.orangeL} />
      <circle cx="140" cy="120" r="85" fill={B.orangeM} opacity="0.45" />
      <rect x="60" y="158" width="160" height="38" rx="9" fill="#AAAAAA" />
      <rect x="65" y="162" width="150" height="5" rx="2.5" fill="#C0C0C0" />
      <rect x="82" y="150" width="116" height="11" rx="5.5" fill="#B8B8B8" />
      <rect x="68" y="120" width="144" height="38" rx="9" fill="#C0C0C0" />
      <rect x="73" y="124" width="134" height="5" rx="2.5" fill="#D0D0D0" />
      <rect x="90" y="112" width="100" height="11" rx="5.5" fill="#C8C8C8" />
      <rect x="76" y="80" width="128" height="40" rx="9" fill="#DCDCDC" />
      <ellipse cx="140" cy="95" rx="50" ry="18" fill="#F5E6C8" />
      <circle cx="124" cy="94" r="10" fill="#F4A261" opacity="0.9" />
      <circle cx="140" cy="92" r="12" fill="#E9C46A" opacity="0.9" />
      <circle cx="156" cy="95" r="9" fill="#F4A261" opacity="0.9" />
      <circle cx="148" cy="89" r="4" fill={B.green} opacity="0.85" />
      <rect x="76" y="62" width="128" height="16" rx="6" fill="#E8E8E8" transform="rotate(-5 140 70)" />
      <path d="M116 74 Q113 64 116 55" stroke={B.orange} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.55" />
      <path d="M140 72 Q137 62 140 53" stroke={B.orange} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.45" />
      <path d="M164 74 Q161 64 164 55" stroke={B.orange} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.55" />
      <ellipse cx="140" cy="208" rx="75" ry="9" fill={B.orange} opacity="0.08" />
    </svg>
  );
}

function IllFamily() {
  return (
    <svg viewBox="0 0 280 240" fill="none" className="w-full h-full">
      <circle cx="140" cy="120" r="110" fill={B.orangeL} />
      <circle cx="140" cy="120" r="85" fill={B.orangeM} opacity="0.4" />
      <rect x="44" y="150" width="192" height="13" rx="6.5" fill="#DEB887" />
      <rect x="62" y="163" width="11" height="34" rx="5.5" fill="#C4A265" />
      <rect x="207" y="163" width="11" height="34" rx="5.5" fill="#C4A265" />
      <circle cx="140" cy="146" r="26" fill="#F5E6C8" />
      <circle cx="140" cy="146" r="21" fill="#F4A261" opacity="0.7" />
      <circle cx="130" cy="143" r="5" fill={B.orange} opacity="0.6" />
      <circle cx="145" cy="145" r="6" fill={B.orange} opacity="0.6" />
      <circle cx="76" cy="96" r="21" fill="#F0C27A" />
      <path d="M56 91 Q61 75 76 72 Q91 75 96 91" fill="#1F2937" />
      <circle cx="69" cy="93" r="2.5" fill="#3D1F00" /><circle cx="83" cy="93" r="2.5" fill="#3D1F00" />
      <path d="M70 102 Q76 108 82 102" stroke="#3D1F00" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <rect x="57" y="117" width="37" height="33" rx="11" fill="#1D4ED8" />
      <circle cx="204" cy="96" r="21" fill="#F0C27A" />
      <path d="M184 93 Q189 75 204 72 Q219 75 224 93" fill="#7C3D00" />
      <path d="M184 93 Q181 115 186 130" stroke="#7C3D00" strokeWidth="7.5" strokeLinecap="round" fill="none" />
      <path d="M224 93 Q227 115 222 130" stroke="#7C3D00" strokeWidth="7.5" strokeLinecap="round" fill="none" />
      <circle cx="197" cy="93" r="2.5" fill="#3D1F00" /><circle cx="211" cy="93" r="2.5" fill="#3D1F00" />
      <path d="M198 102 Q204 108 210 102" stroke="#3D1F00" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <rect x="185" y="117" width="37" height="33" rx="11" fill="#EC4899" />
      <circle cx="140" cy="118" r="17" fill="#FBBF24" />
      <path d="M124 113 Q128 100 140 98 Q152 100 156 113" fill="#92400E" />
      <circle cx="134" cy="116" r="2.2" fill="#3D1F00" /><circle cx="146" cy="116" r="2.2" fill="#3D1F00" />
      <path d="M135 124 Q140 128 145 124" stroke="#3D1F00" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <rect x="128" y="135" width="24" height="20" rx="8" fill={B.green} />
      <ellipse cx="140" cy="208" rx="84" ry="9" fill={B.orange} opacity="0.08" />
    </svg>
  );
}

function IllRewards() {
  return (
    <svg viewBox="0 0 200 180" fill="none" className="w-full h-full">
      <circle cx="100" cy="90" r="80" fill="#FEF3C7" />
      <circle cx="100" cy="90" r="58" fill="#FDE68A" opacity="0.5" />
      {/* Trophy */}
      <rect x="78" y="108" width="44" height="10" rx="5" fill="#F59E0B" />
      <rect x="86" y="118" width="28" height="6" rx="3" fill="#D97706" />
      <rect x="82" y="124" width="36" height="8" rx="4" fill="#F59E0B" />
      <path d="M80 60 Q80 108 100 108 Q120 108 120 60 Z" fill="#FCD34D" />
      <path d="M80 60 Q70 60 66 72 Q62 84 76 92 Q80 94 80 84" fill="#FCD34D" />
      <path d="M120 60 Q130 60 134 72 Q138 84 124 92 Q120 94 120 84" fill="#FCD34D" />
      <circle cx="100" cy="82" r="14" fill="#F59E0B" opacity="0.6" />
      <path d="M100 72 L102.5 79 L110 79 L104 83.5 L106.5 91 L100 87 L93.5 91 L96 83.5 L90 79 L97.5 79 Z" fill="#FFFBEB" />
      {/* Stars */}
      <circle cx="48" cy="48" r="6" fill="#FCD34D" opacity="0.8" />
      <circle cx="152" cy="48" r="4" fill="#F59E0B" opacity="0.8" />
      <circle cx="44" cy="140" r="4" fill="#FBBF24" opacity="0.7" />
      <circle cx="156" cy="138" r="5" fill="#FCD34D" opacity="0.7" />
      <ellipse cx="100" cy="175" rx="50" ry="6" fill="#F59E0B" opacity="0.08" />
    </svg>
  );
}

function IllSupport() {
  return (
    <svg viewBox="0 0 200 180" fill="none" className="w-full h-full">
      <circle cx="100" cy="90" r="80" fill="#EFF6FF" />
      <circle cx="100" cy="90" r="58" fill="#DBEAFE" opacity="0.5" />
      {/* Headphones */}
      <path d="M62 90 Q62 55 100 55 Q138 55 138 90" stroke="#3B82F6" strokeWidth="6" fill="none" strokeLinecap="round" />
      <rect x="54" y="88" width="16" height="28" rx="8" fill="#3B82F6" />
      <rect x="130" y="88" width="16" height="28" rx="8" fill="#3B82F6" />
      <rect x="57" y="91" width="10" height="22" rx="5" fill="#60A5FA" />
      <rect x="133" y="91" width="10" height="22" rx="5" fill="#60A5FA" />
      {/* Chat bubble */}
      <rect x="78" y="108" width="44" height="30" rx="10" fill="#3B82F6" />
      <path d="M88 138 L84 148 L96 138" fill="#3B82F6" />
      <div/>
      <circle cx="90" cy="123" r="3" fill="white" /><circle cx="100" cy="123" r="3" fill="white" /><circle cx="110" cy="123" r="3" fill="white" />
      {/* Decorative */}
      <circle cx="50" cy="52" r="5" fill="#BFDBFE" opacity="0.8" />
      <circle cx="152" cy="140" r="6" fill="#93C5FD" opacity="0.7" />
      <ellipse cx="100" cy="175" rx="50" ry="6" fill="#3B82F6" opacity="0.07" />
    </svg>
  );
}

function IllEmpty() {
  return (
    <svg viewBox="0 0 200 180" fill="none" className="w-full h-full">
      <circle cx="100" cy="90" r="75" fill="#F5F0E8" />
      <ellipse cx="100" cy="120" rx="40" ry="30" fill="#EDE8DF" />
      <path d="M72 100 Q72 82 100 82 Q128 82 128 100 L124 120 Q100 130 76 120 Z" fill="#E5E0D8" />
      <ellipse cx="100" cy="100" rx="28" ry="18" fill="#F0EDE8" />
      <path d="M88 90 Q100 85 112 90" stroke="#CCC5BB" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M86 96 Q100 91 114 96" stroke="#CCC5BB" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="100" cy="60" r="12" fill="#E5E0D8" />
      <path d="M94 60 Q100 54 106 60 Q100 66 94 60Z" fill="#CCC5BB" opacity="0.7" />
      <circle cx="56" cy="68" r="5" fill="#EDE8DF" />
      <circle cx="148" cy="72" r="4" fill="#EDE8DF" />
      <ellipse cx="100" cy="168" rx="45" ry="6" fill="#D9D3C8" opacity="0.4" />
    </svg>
  );
}

// ─── Auth Inputs ──────────────────────────────────────────────────────────────

interface AuthInputProps {
  label: string;
  placeholder: string;
  type?: string;
  t: T;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}

function AuthInput({ label, placeholder, type = "text", t, value, onChange, error }: AuthInputProps) {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);
  const isP = type === "password";
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <label className="text-[11px] font-black uppercase tracking-[0.1em]" style={{ color: error ? "#EF4444" : focused ? B.orange : t.muted }}>
          {label}
        </label>
        {error && (
          <motion.span initial={{ opacity: 0, x: 4 }} animate={{ opacity: 1, x: 0 }} className="text-[10px] font-bold text-red-500">
            {error}
          </motion.span>
        )}
      </div>
      <motion.div
        animate={{ borderColor: error ? "#EF4444" : focused ? B.orange : t.border }}
        className="relative rounded-[18px] border-2 transition-colors"
        style={{ borderColor: error ? "#EF4444" : t.border, background: t.input }}
      >
        <input
          type={isP && !show ? "password" : "text"}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full py-4 px-5 rounded-[16px] text-[15px] outline-none bg-transparent"
          style={{ color: t.text, fontFamily: "'Inter',sans-serif" }}
        />
        {isP && (
          <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: t.muted }}>
            {show ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        )}
      </motion.div>
    </div>
  );
}

// ─── SPLASH ───────────────────────────────────────────────────────────────────

function Splash({ go, t }: { go:(s:Screen)=>void; t:T }) {
  useEffect(()=>{ const id=setTimeout(()=>go("ob1"),2800); return()=>clearTimeout(id); },[]);
  const isDark = t.bg === "#0E0E0E";
  const glassBg = isDark ? "rgba(15, 15, 15, 0.35)" : "rgba(255, 255, 255, 0.28)";
  const glassBorder = isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.4)";
  const glassShadow = isDark
    ? "0 24px 60px -15px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.1)"
    : "0 24px 50px -15px rgba(139, 92, 26, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.55)";

  return (
    <div className="flex-1 min-h-0 flex flex-col justify-between relative overflow-hidden" style={{ background: t.bg }}>
      <style>{`
        @keyframes slow-zoom {
          0% { transform: scale(1.05); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1.05); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 25s ease-in-out infinite;
        }
      `}</style>

      {/* Blurred food background with dark vignette overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=1200&auto=format&fit=crop"
          alt="Homemade Meals"
          className="w-full h-full object-cover filter blur-[12px] scale-110 animate-slow-zoom"
          referrerPolicy="no-referrer"
        />
        {/* Dynamic theme overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr transition-all duration-300"
          style={{
            background: isDark
              ? "radial-gradient(circle at top right, rgba(230, 126, 34, 0.15), rgba(14, 14, 14, 0.9) 70%)"
              : "radial-gradient(circle at top right, rgba(255, 159, 67, 0.2), rgba(253, 246, 238, 0.65) 75%)"
          }}
        />
        <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.5)] opacity-60" />
      </div>

      {/* Centered Glassmorphic card */}
      <div className="flex-1 min-h-0 flex flex-col justify-center px-4 py-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 16 }}
          className="w-full max-w-sm mx-auto rounded-[32px] border flex flex-col items-center justify-between px-6 py-10 overflow-hidden"
          style={{
            background: glassBg,
            borderColor: glassBorder,
            boxShadow: glassShadow,
            backdropFilter: "blur(24px) contrast(105%)",
            WebkitBackdropFilter: "blur(24px) contrast(105%)",
            maxHeight: "92%"
          }}
        >
          <div />
          <motion.div initial={{ opacity:0, scale:0.8, y:20 }} animate={{ opacity:1, scale:1, y:0 }}
            transition={{ type:"spring", stiffness:140, damping:20 }}
            className="flex flex-col items-center gap-5">
            <motion.div
              animate={{ boxShadow:[`0 20px 60px ${B.orange}40`,`0 28px 80px ${B.orange}70`,`0 20px 60px ${B.orange}40`] }}
              transition={{ duration:2.5, repeat:Infinity, ease:"easeInOut" }}
              className="w-[88px] h-[88px] rounded-[28px] flex items-center justify-center"
              style={{ background:B.orange }}>
              <Package size={44} color="white" />
            </motion.div>
            <FadeIn delay={0.4}>
              <div className="text-center">
                <p className="text-[11px] font-black tracking-[0.38em] uppercase mb-1" style={{ color:B.orange }}>KOI KOI</p>
                <h1 className="text-[40px] font-black leading-none" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", color: t.text }}>DABBA</h1>
                <p className="text-[13px] font-medium mt-2" style={{ color: t.muted }}>Home-Style Meals. Delivered Daily.</p>
              </div>
            </FadeIn>
          </motion.div>
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.1 }} className="flex gap-1.5 mt-8">
            {[0,1,2].map(i=>(
              <motion.div key={i} animate={{ opacity:[0.3,1,0.3] }} transition={{ duration:1.6, delay:i*0.25, repeat:Infinity }}
                className="w-1.5 h-1.5 rounded-full" style={{ background:B.orange }} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── ONBOARDING ───────────────────────────────────────────────────────────────

function OB({ go, step, Ill, head, body, cta, t }: {
  go:(s:Screen)=>void; step:0|1|2; Ill:React.FC; head:string; body:string; cta:string; t:T;
}) {
  const next:Screen[] = ["ob2","ob3","auth"];
  const isDark = t.bg === "#0E0E0E";
  const glassBg = isDark ? "rgba(15, 15, 15, 0.35)" : "rgba(255, 255, 255, 0.28)";
  const glassBorder = isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.4)";
  const glassShadow = isDark
    ? "0 24px 60px -15px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.1)"
    : "0 24px 50px -15px rgba(139, 92, 26, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.55)";

  return (
    <motion.div {...pageIn} className="flex-1 min-h-0 flex flex-col justify-between relative overflow-hidden" style={{ background: t.bg }}>
      <style>{`
        @keyframes slow-zoom {
          0% { transform: scale(1.05); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1.05); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 25s ease-in-out infinite;
        }
      `}</style>

      {/* Blurred food background with dark vignette overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=1200&auto=format&fit=crop"
          alt="Homemade Meals"
          className="w-full h-full object-cover filter blur-[12px] scale-110 animate-slow-zoom"
          referrerPolicy="no-referrer"
        />
        {/* Dynamic theme overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr transition-all duration-300"
          style={{
            background: isDark
              ? "radial-gradient(circle at top right, rgba(230, 126, 34, 0.15), rgba(14, 14, 14, 0.9) 70%)"
              : "radial-gradient(circle at top right, rgba(255, 159, 67, 0.2), rgba(253, 246, 238, 0.65) 75%)"
          }}
        />
        <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.5)] opacity-60" />
      </div>

      {/* Card Wrapper (Centered vertically) */}
      <div className="flex-1 min-h-0 flex flex-col justify-center px-4 py-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 16 }}
          className="w-full max-w-sm mx-auto rounded-[32px] border flex flex-col overflow-hidden"
          style={{
            background: glassBg,
            borderColor: glassBorder,
            boxShadow: glassShadow,
            backdropFilter: "blur(24px) contrast(105%)",
            WebkitBackdropFilter: "blur(24px) contrast(105%)",
            maxHeight: "92%"
          }}
        >
          {/* Skip button on top right of the card */}
          <div className="flex justify-end px-5 pt-5 relative z-10">
            <button onClick={()=>go("auth")} className="text-[11px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full transition-all"
              style={{
                color: B.orange,
                background: isDark ? "rgba(230, 126, 34, 0.15)" : "rgba(230, 126, 34, 0.08)",
                border: `1px solid ${isDark ? "rgba(230,126,34,0.3)" : "rgba(230,126,34,0.15)"}`
              }}>Skip</button>
          </div>

          {/* Illustration with background shadow */}
          <div className="flex-1 min-h-0 flex items-center justify-center px-10 py-2 relative z-10">
            <div className="w-full max-w-[170px] aspect-square">
              <FloatIll><Ill /></FloatIll>
            </div>
          </div>

          {/* Texts & Actions */}
          <div className="px-6 pb-6 pt-2 relative z-10">
            <FadeIn delay={0.05}>
              <div className="flex gap-1.5 mb-4">
                {[0,1,2].map(i=>(
                  <motion.div key={i} animate={{ width:i===step?24:6, opacity:i===step?1:0.25 }}
                    transition={{ type:"spring", stiffness:300, damping:28 }}
                    className="h-1.5 rounded-full" style={{ background:B.orange }} />
                ))}
              </div>
            </FadeIn>
            <FadeUp delay={0.1}>
              <h1 className="text-[20px] font-black leading-tight mb-2"
                style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", color: t.text }}>{head}</h1>
              <p className="text-[12px] leading-relaxed mb-5 font-medium" style={{ color: t.muted }}>{body}</p>
              <OrangeBtn label={cta} onClick={()=>go(next[step])} />
            </FadeUp>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── AUTH ─────────────────────────────────────────────────────────────────────

interface AuthProps {
  go: (s: Screen) => void;
  t: T;
  setUser: (u: any) => void;
  setSubscribed: (b: boolean) => void;
}

const REGISTERED_PHONES = ["9876543210", "9999988888", "9999977777", "9848022338", "9000000000"];

function Auth({ go, t, setUser, setSubscribed }: AuthProps) {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [otpCountdown, setOtpCountdown] = useState(30);
  const [view, setView] = useState<"step1_mobile" | "step2_otp">("step1_mobile");
  const [simulatedError, setSimulatedError] = useState<"none" | "invalid_phone" | "user_not_found" | "otp_expired" | "wrong_otp" | "network_error" | "server_error">("none");
  const [isSimMenuOpen, setIsSimMenuOpen] = useState(false);

  const isDark = t.bg === "#0E0E0E";
  
  // Custom Glass Styling for both modes
  const glassBg = isDark ? "rgba(15, 15, 15, 0.35)" : "rgba(255, 255, 255, 0.28)";
  const glassBorder = isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.4)";
  const glassShadow = isDark
    ? "0 24px 60px -15px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.1)"
    : "0 24px 50px -15px rgba(139, 92, 26, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.55)";

  useEffect(() => {
    if (view === "step2_otp" && otpCountdown > 0) {
      const id = setTimeout(() => setOtpCountdown(c => c - 1), 1000);
      return () => clearTimeout(id);
    }
  }, [view, otpCountdown]);

  const handleMobileSubmit = () => {
    setValidationError(null);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      // 1. Simulate Network Error
      if (simulatedError === "network_error") {
        setValidationError("⚠️ Network Connection Error. Please verify your connection.");
        return;
      }

      // 2. Simulate Server Error
      if (simulatedError === "server_error") {
        setValidationError("⚠️ Internal Server Error (500). Please try again later.");
        return;
      }

      // 3. Simulate Invalid Mobile Number or clean length validation
      const cleanDigits = mobileNumber.replace(/[^\d]/g, "");
      if (simulatedError === "invalid_phone" || cleanDigits.length !== 10) {
        setValidationError("⚠️ Please enter a valid 10-digit mobile number.");
        return;
      }

      // 4. Simulate User Not Found
      if (simulatedError === "user_not_found") {
        setValidationError("⚠️ User Not Found. No active account associated with this number.");
        return;
      }

      // Intelligent User Flow routing
      const isReturningUser = REGISTERED_PHONES.includes(cleanDigits);

      if (isReturningUser) {
        // Navigate to OTP Verification screen
        setView("step2_otp");
        setOtpCountdown(30);
        setOtpCode("");
      } else {
        // Automatically start onboarding process for new users
        setUser({
          name: "",
          email: "",
          phone: "+91 " + cleanDigits,
          avatar: "🍛",
          dob: "",
          age: "",
          gender: "Male",
          foodPref: "Veg",
        });
        setSubscribed(true);
        go("setup1");
      }
    }, 850);
  };

  const handleOtpVerify = () => {
    setValidationError(null);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      // Simulate OTP Expired
      if (simulatedError === "otp_expired") {
        setValidationError("⚠️ OTP Expired. Please request a new verification code.");
        return;
      }

      // Simulate Wrong OTP
      const cleanOtp = otpCode.trim();
      if (simulatedError === "wrong_otp" || (cleanOtp !== "123456" && cleanOtp.length > 0)) {
        setValidationError("Incorrect OTP. Please enter the correct code (123456).");
        return;
      }

      if (cleanOtp.length !== 6) {
        setValidationError("Please enter the 6-digit verification code.");
        return;
      }

      // Log returning user in with prefilled rich profile details
      setUser({
        name: "Bhargav S.",
        email: "bhargav.s@gmail.com",
        phone: "+91 " + mobileNumber.replace(/[^\d]/g, ""),
        avatar: "B",
        dob: "15 / 08 / 1995",
        age: "31",
        gender: "Male",
        foodPref: "Veg",
        addressMode: "manual" as "detect" | "manual" | null,
        houseNo: "Plot 42, Jubilee Hills",
        society: "Park View Residency",
        street: "Road No 3",
        landmark: "Near KBR Park",
        area: "Jubilee Hills",
        city: "Hyderabad",
        pincode: "500033",
        addressType: "🏠 Home",
        deliveryInstructions: "Leave with security guard inside steel box.",
        height: "178",
        weight: "74",
        activity: 1,
        goal: 4,
        food: 0,
        cuisines: [0, 2],
        allergies: "None",
        spice: 1,
      });
      setSubscribed(true);
      go("home");
    }, 850);
  };

  const handleSocialContinue = (provider: "Google" | "Apple") => {
    setUser({
      name: `${provider} User`,
      email: `${provider.toLowerCase()}user@gmail.com`,
      phone: "+91 99999 88888",
      avatar: provider === "Google" ? "G" : "A",
      dob: "12 / 03 / 1997",
      age: "29",
      gender: "Prefer not to say",
      foodPref: "Veg",
    });
    setSubscribed(true);
    go("home");
  };

  const cleanPhoneInput = (val: string) => {
    const digits = val.replace(/[^\d]/g, "").slice(0, 10);
    setMobileNumber(digits);
    if (validationError) setValidationError(null);
  };

  return (
    <motion.div {...pageIn} className="flex-1 min-h-0 flex flex-col justify-between relative overflow-hidden" style={{ background: t.bg }}>
      <style>{`
        @keyframes slow-zoom {
          0% { transform: scale(1.05); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1.05); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 25s ease-in-out infinite;
        }
      `}</style>

      {/* Blurred food background with dark vignette overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=1200&auto=format&fit=crop"
          alt="Homemade Meals"
          className="w-full h-full object-cover filter blur-[12px] scale-110 animate-slow-zoom"
          referrerPolicy="no-referrer"
        />
        {/* Dynamic theme overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr transition-all duration-300"
          style={{
            background: isDark
              ? "radial-gradient(circle at top right, rgba(230, 126, 34, 0.15), rgba(14, 14, 14, 0.9) 70%)"
              : "radial-gradient(circle at top right, rgba(255, 159, 67, 0.2), rgba(253, 246, 238, 0.65) 75%)"
          }}
        />
        <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.5)] opacity-60" />
      </div>

      {/* Premium Simulator Panel */}
      <div className="mx-4 mt-4 relative z-50">
        <div className="rounded-2xl border transition-all overflow-hidden"
          style={{
            borderColor: isSimMenuOpen ? "rgba(230, 126, 34, 0.4)" : glassBorder,
            background: isDark ? "rgba(20, 20, 20, 0.6)" : "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.03)"
          }}>
          <button
            onClick={() => setIsSimMenuOpen(!isSimMenuOpen)}
            className="w-full flex items-center justify-between px-4 py-2.5 text-[11px] font-black uppercase tracking-wider"
            style={{ color: B.orange }}
          >
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span>Demo Simulator & Testing Suite</span>
            </div>
            <ChevronDown size={14} className={`transform transition-transform duration-200 ${isSimMenuOpen ? "rotate-180" : ""}`} />
          </button>

          {isSimMenuOpen && (
            <div className="p-3 border-t text-[11px]" style={{ borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)" }}>
              <p className="font-bold mb-2 text-gray-500" style={{ color: t.muted }}>Choose verification condition to mock:</p>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: "none", label: "Normal Flow (Intelligent)", desc: "Existing / New user" },
                  { id: "invalid_phone", label: "Invalid Phone Error", desc: "Forced invalid pattern" },
                  { id: "user_not_found", label: "User Not Found", desc: "Force search miss" },
                  { id: "otp_expired", label: "OTP Expired", desc: "Mock code timeout" },
                  { id: "wrong_otp", label: "Wrong OTP", desc: "Code invalid check" },
                  { id: "network_error", label: "Network Error", desc: "Mock disconnect" },
                  { id: "server_error", label: "Server 500 Error", desc: "Mock server failure" },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setSimulatedError(opt.id as any);
                      setValidationError(null);
                    }}
                    className="p-1.5 rounded-lg border text-left transition-all"
                    style={{
                      background: simulatedError === opt.id ? "rgba(230, 126, 34, 0.1)" : isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.5)",
                      borderColor: simulatedError === opt.id ? B.orange : "transparent"
                    }}
                  >
                    <p className="font-black" style={{ color: simulatedError === opt.id ? B.orange : t.text }}>{opt.label}</p>
                    <p className="text-[9px]" style={{ color: t.muted }}>{opt.desc}</p>
                  </button>
                ))}
              </div>
              <div className="mt-2 p-1.5 bg-amber-500/10 rounded-lg text-amber-600 text-[9px] font-medium leading-relaxed">
                💡 <strong>Registered Test Numbers (Triggers OTP Flow):</strong><br />
                9876543210, 9999988888, 9999977777, 9848022338, 9000000000.<br />
                Any other 10-digit number automatically starts the <strong>New User Onboarding</strong> flow.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Card Wrapper (Centered vertically) */}
      <div className="flex-1 min-h-0 flex flex-col justify-center px-4 py-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 16 }}
          className="w-full max-w-sm mx-auto rounded-[32px] border flex flex-col overflow-hidden"
          style={{
            background: glassBg,
            borderColor: glassBorder,
            boxShadow: glassShadow,
            backdropFilter: "blur(24px) contrast(105%)",
            WebkitBackdropFilter: "blur(24px) contrast(105%)",
            maxHeight: "92%"
          }}
        >
          {view === "step1_mobile" ? (
            <div className="px-6 py-6 overflow-y-auto flex-1 flex flex-col justify-between" style={{ scrollbarWidth: "none" }}>
              <div>
                {/* Brand / Logo */}
                <div className="flex flex-col items-center mb-5">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 180, damping: 18 }}
                    className="w-14 h-14 rounded-[20px] flex items-center justify-center mb-3"
                    style={{
                      background: "linear-gradient(135deg, #FF6B6B 0%, #FF9F43 100%)",
                      boxShadow: "0 8px 20px rgba(230, 126, 34, 0.25)"
                    }}
                  >
                    <Package size={28} color="white" />
                  </motion.div>
                  <h1 className="text-[20px] font-black text-center tracking-tight leading-none" style={{ color: t.text }}>
                    Welcome to <span style={{ color: B.orange }}>KOI KOI DABBA</span>
                  </h1>
                  <p className="text-[11px] text-center mt-1.5 font-medium" style={{ color: t.muted }}>
                    Taste the comfort of pure home-cooked goodness
                  </p>
                </div>

                {/* Input Label & Field */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[11px] font-black uppercase tracking-[0.1em]" style={{ color: validationError ? "#EF4444" : B.orange }}>
                      Mobile Number
                    </label>
                    {validationError && (
                      <motion.span initial={{ opacity: 0, x: 4 }} animate={{ opacity: 1, x: 0 }} className="text-[10px] font-bold text-red-500">
                        {validationError}
                      </motion.span>
                    )}
                  </div>

                  <motion.div
                    className="relative rounded-2xl border-2 transition-all flex items-center overflow-hidden px-4 py-0.5"
                    style={{
                      borderColor: validationError ? "#EF4444" : "rgba(230, 126, 34, 0.3)",
                      background: isDark ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.45)"
                    }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex items-center gap-1.5 mr-3 pr-3 border-r" style={{ borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.06)" }}>
                      <span className="text-[15px]">🇮🇳</span>
                      <span className="text-[14px] font-extrabold" style={{ color: t.text }}>+91</span>
                    </div>
                    <input
                      type="tel"
                      pattern="[0-9]*"
                      inputMode="numeric"
                      placeholder="Enter 10-digit number"
                      value={mobileNumber}
                      onChange={e => cleanPhoneInput(e.target.value)}
                      disabled={isSubmitting}
                      className="w-full py-3 rounded-2xl text-[15px] font-bold outline-none bg-transparent"
                      style={{ color: t.text, fontFamily: "'Inter',sans-serif" }}
                    />
                    {mobileNumber.length > 0 && (
                      <button
                        onClick={() => setMobileNumber("")}
                        className="p-1 rounded-full bg-gray-500/10 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </motion.div>
                </div>

                {/* Continue Button */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleMobileSubmit}
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-2xl text-[14px] font-black text-white relative overflow-hidden flex items-center justify-center gap-2 transition-all"
                  style={{
                    background: "linear-gradient(135deg, #FF9F43 0%, #FF6B6B 100%)",
                    boxShadow: "0 8px 24px rgba(255, 107, 107, 0.25)"
                  }}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Continue</span>
                      <ChevronRight size={15} />
                    </>
                  )}
                </motion.button>

                {/* OR Separator */}
                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px" style={{ background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)" }} />
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">OR</span>
                  <div className="flex-1 h-px" style={{ background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)" }} />
                </div>

                {/* Social Logins */}
                <div className="flex flex-col gap-2.5">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSocialContinue("Google")}
                    className="w-full flex items-center justify-between py-3 px-4 rounded-xl text-[12px] font-bold border transition-all"
                    style={{
                      background: isDark ? "rgba(255,255,255,0.05)" : "rgba(255, 255, 255, 0.5)",
                      borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)",
                      color: t.text
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <Globe size={16} color="#4285F4" />
                      <span>Continue with Google</span>
                    </div>
                    <ChevronRight size={12} style={{ color: t.muted }} />
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSocialContinue("Apple")}
                    className="w-full flex items-center justify-between py-3 px-4 rounded-xl text-[12px] font-bold border transition-all"
                    style={{
                      background: isDark ? "rgba(255,255,255,0.05)" : "rgba(255, 255, 255, 0.5)",
                      borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)",
                      color: t.text
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <Monitor size={16} color={t.text} />
                      <span>Continue with Apple</span>
                    </div>
                    <ChevronRight size={12} style={{ color: t.muted }} />
                  </motion.button>
                </div>
              </div>

              {/* Terms Footer */}
              <div className="text-center mt-4 pt-2">
                <p className="text-[9px] leading-relaxed text-gray-400" style={{ color: t.muted }}>
                  By continuing, you agree to our <br />
                  <span className="font-extrabold underline cursor-pointer" style={{ color: B.orange }}>Terms of Service</span> & <span className="font-extrabold underline cursor-pointer" style={{ color: B.orange }}>Privacy Policy</span>
                </p>
              </div>
            </div>
          ) : (
            /* OTP VERIFICATION VIEW */
            <div className="px-6 py-6 overflow-y-auto flex-1 flex flex-col justify-between" style={{ scrollbarWidth: "none" }}>
              <div>
                {/* Back to mobile */}
                <button
                  onClick={() => {
                    setView("step1_mobile");
                    setValidationError(null);
                  }}
                  className="flex items-center gap-1.5 text-[11px] font-bold mb-4 transition-colors"
                  style={{ color: t.muted }}
                >
                  <ArrowLeft size={13} />
                  <span>Change mobile number</span>
                </button>

                <h2 className="text-[18px] font-black mb-1 leading-tight" style={{ color: t.text }}>
                  OTP Verification
                </h2>
                <p className="text-[11px] mb-4 leading-relaxed" style={{ color: t.muted }}>
                  We sent a 6-digit verification code to <span className="font-bold" style={{ color: B.orange }}>+91 {mobileNumber}</span>
                </p>

                {/* Error display */}
                {validationError && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-[11px] font-bold flex items-center gap-2"
                  >
                    <AlertCircle size={14} />
                    <span>{validationError}</span>
                  </motion.div>
                )}

                {/* OTP Segments */}
                <div className="relative mb-4">
                  <input
                    type="tel"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    maxLength={6}
                    value={otpCode}
                    onChange={e => {
                      const val = e.target.value.replace(/[^\d]/g, "").slice(0, 6);
                      setOtpCode(val);
                      if (validationError) setValidationError(null);
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-default"
                    disabled={isSubmitting}
                    autoFocus
                  />
                  <div className="flex justify-between gap-2">
                    {[0, 1, 2, 3, 4, 5].map(idx => {
                      const char = otpCode[idx] || "";
                      const isActive = otpCode.length === idx || (otpCode.length === 6 && idx === 5);
                      return (
                        <div
                          key={idx}
                          className="flex-1 aspect-[4/5] rounded-[14px] border-2 flex items-center justify-center text-[16px] font-black transition-all"
                          style={{
                            background: isDark ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.45)",
                            borderColor: isActive ? B.orange : isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)",
                            boxShadow: isActive ? `0 0 10px ${B.orange}20` : "none",
                            color: t.text
                          }}
                        >
                          {char ? char : isActive ? (
                            <motion.div
                              animate={{ opacity: [0, 1, 0] }}
                              transition={{ duration: 1.2, repeat: Infinity }}
                              className="w-1.5 h-5 rounded-full"
                              style={{ background: B.orange }}
                            />
                          ) : (
                            <span className="opacity-15">•</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Resend Actions */}
                <div className="flex justify-between items-center px-1 mb-5">
                  {otpCountdown > 0 ? (
                    <p className="text-[10px]" style={{ color: t.muted }}>
                      Resend code in <span className="font-extrabold" style={{ color: B.orange }}>{otpCountdown}s</span>
                    </p>
                  ) : (
                    <button
                      className="text-[10px] font-black flex items-center gap-1"
                      style={{ color: B.orange }}
                      onClick={() => {
                        setOtpCountdown(30);
                        setValidationError(null);
                      }}
                    >
                      <RefreshCw size={11} /> Resend OTP Code
                    </button>
                  )}
                  <span className="text-[9px] font-black uppercase text-gray-400">Demo Code: 123456</span>
                </div>

                {/* Verify & Continue Button */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleOtpVerify}
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-2xl text-[14px] font-black text-white flex items-center justify-center gap-2 transition-all"
                  style={{
                    background: "linear-gradient(135deg, #FF9F43 0%, #FF6B6B 100%)",
                    boxShadow: "0 8px 24px rgba(255, 107, 107, 0.25)"
                  }}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <ShieldCheck size={15} />
                      <span>Verify & Login</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────

interface HomeScreenProps {
  go: (s: Screen) => void;
  t: T;
  paused: boolean;
  setPaused: (v: boolean) => void;
  subscribed: boolean;
  setSubscribed: (v: boolean) => void;
  user: any;
  mealsList: Meal[];
  setSelectedMealId: (id: number) => void;
}

function HomeScreen({ go, t, paused, setPaused, subscribed, setSubscribed, user, mealsList, setSelectedMealId }: HomeScreenProps) {
  // Get active today lunch meal dynamically
  const meal = mealsList.find(m => m.day === "Today" && m.when === "lunch") || mealsList[0];
  const isDark = t.bg === "#0E0E0E";

  return (
    <WithNav tab="home" go={go} t={t}>
      {/* Header with profile and action icons */}
      <div className="px-5 pt-6 pb-4 relative overflow-hidden" style={{ zIndex: 1 }}>
        <OrgBlob x={-30} y={-20} size={180} color={B.orange} opacity={0.07} blur={40} />
        <OrgBlob x="60%" y={10} size={140} color={B.green} opacity={0.05} blur={35} />
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            {/* Profile Photo */}
            <motion.button whileTap={{ scale: 0.92 }} onClick={() => go("profile")}
              className="w-11 h-11 rounded-full font-black text-[15px] text-white flex items-center justify-center cursor-pointer"
              style={{ background: B.orange, boxShadow: `0 4px 16px ${B.orange}40` }}>
              {user.avatar || "B"}
            </motion.button>
            <FadeUp delay={0}>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-[#888] tracking-wide">Good Morning,</span>
                <h1 className="text-[18px] font-black leading-tight flex items-center gap-1" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: t.text }}>
                  {user.name || "Bhargav"} 👋
                </h1>
              </div>
            </FadeUp>
          </div>
          <FadeIn delay={0.15}>
            <div className="flex items-center gap-2.5">
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => go("payments")}
                className="w-11 h-11 rounded-full flex items-center justify-center relative" style={{ background: t.surface }}>
                <Wallet size={18} color={t.text} />
              </motion.button>
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => go("notifications")}
                className="w-11 h-11 rounded-full flex items-center justify-center relative" style={{ background: t.surface }}>
                <Bell size={18} color={t.text} />
                <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-2 right-2 w-2 h-2 rounded-full border-2" style={{ background: "#EF4444", borderColor: t.bg }} />
              </motion.button>
            </div>
          </FadeIn>
        </div>
      </div>

      <div className="px-5 flex flex-col gap-5 pb-4">
        {/* HERO — Today's Active Delivery Card */}
        <FadeUp delay={0.08}>
          <motion.div whileTap={{ scale: 0.99 }} onClick={() => { setSelectedMealId(meal.id); go("tracking"); }}
            className="rounded-[28px] overflow-hidden cursor-pointer"
            style={{ boxShadow: `0 10px 48px rgba(0,0,0,0.12)`, background: t.card }}>
            <div className="relative" style={{ height: 210 }}>
              <img src={meal.img} alt={meal.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(0,0,0,0.02) 0%,rgba(0,0,0,0.85) 100%)" }} />
              {/* Top badges */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.95)" }}>
                  <PulsingDot color={B.green} size={7} />
                  <span className="text-[10px] font-black" style={{ color: B.green }}>LIVE TRACKING</span>
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <VegPill veg={meal.type === "veg"} />
              </div>
              {/* Bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white opacity-70 mb-1">
                  {meal.when === "lunch" ? "☀️ Lunch Slot" : "🌙 Dinner Slot"} · {meal.time}
                </p>
                <h2 className="text-[20px] font-black text-white leading-tight mb-3" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{meal.name}</h2>
                <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-[14px]" style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}>
                  <Bike size={14} color="white" />
                  <span className="text-[11px] font-bold text-white">Arjun is 2.4 km away · Delivery in 12 min</span>
                  <ChevronRight size={12} color="white" className="ml-auto" />
                </div>
              </div>
            </div>
            {/* Live Delivery Status Steps */}
            <div className="px-5 py-4 border-t" style={{ borderColor: t.border }}>
              <div className="flex items-start">
                {[{ l: "Prepared", d: true }, { l: "On the Way", a: true }, { l: "Delivered", d: false }].map((s, i, arr) => (
                  <div key={s.l} className="flex-1 flex flex-col items-center relative">
                    {i < arr.length - 1 && (
                      <div className="absolute top-3.5 left-1/2 w-full h-0.5 z-0"
                        style={{ background: s.d ? B.green : t.border }} />
                    )}
                    <div className="w-7 h-7 rounded-full z-10 flex items-center justify-center mb-1.5"
                      style={{ background: s.d ? B.green : (s as any).a ? B.orange : t.surface }}>
                      {s.d ? <Check size={12} color="white" strokeWidth={3} /> : (s as any).a ? <PulsingDot color="white" size={8} /> : null}
                    </div>
                    <p className="text-[9px] font-black text-center leading-tight uppercase tracking-wider" style={{ color: s.d ? B.green : (s as any).a ? B.orange : t.muted }}>{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </FadeUp>

        {/* SECTION: SYSTEM STATUS, WALLET, LIVE KITCHEN & REFERRALS (Stacked One After Another with High-quality Images) */}
        <div className="flex flex-col gap-4">
          {/* Card 1: Subscription Status */}
          <FadeUp delay={0.12}>
            <motion.div whileTap={{ scale: 0.98 }} onClick={() => go("plans")}
              className="p-4 rounded-[24px] cursor-pointer"
              style={{
                background: isDark ? "linear-gradient(135deg, #30190B 0%, #1C0F07 100%)" : "linear-gradient(135deg, #FFFDFB 0%, #FFEEDF 100%)",
                border: isDark ? "1.5px solid rgba(230, 126, 34, 0.35)" : "1.5px solid rgba(230, 126, 34, 0.25)",
                height: 136,
                boxShadow: "0 4px 18px rgba(230, 126, 34, 0.05)"
              }}>
              <div className="flex justify-between items-center h-full gap-3">
                <div className="flex-1 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: isDark ? "rgba(230, 126, 34, 0.15)" : "rgba(230, 126, 34, 0.08)" }}>
                        <Package size={14} color={isDark ? "#FF9F43" : "#E67E22"} />
                      </div>
                      <span className="text-[9px] font-black px-2 py-0.5 rounded-full text-white" style={{ background: paused ? "#F59E0B" : B.green }}>
                        {paused ? "PAUSED" : "ACTIVE"}
                      </span>
                    </div>
                    <h3 className="text-[14px] font-black leading-snug" style={{ color: isDark ? "#FF9F43" : "#D35400" }}>Monthly Dabba</h3>
                    <p className="text-[11px] mt-0.5 leading-snug font-medium" style={{ color: t.sub }}>Day 3 of 30 left</p>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold" style={{ color: isDark ? "#FF9F43" : "#E67E22" }}>
                    <span>Manage plan</span>
                    <ChevronRight size={10} />
                  </div>
                </div>

                {/* Right side Image */}
                <div className="w-[110px] h-[104px] rounded-[18px] overflow-hidden flex-shrink-0 border shadow-inner relative"
                  style={{ borderColor: isDark ? "rgba(230, 126, 34, 0.25)" : "rgba(230, 126, 34, 0.15)" }}>
                  <img src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=300&fit=crop&auto=format" alt="Monthly Dabba" className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
            </motion.div>
          </FadeUp>

          {/* Card 2: Wallet & Coins */}
          <FadeUp delay={0.14}>
            <motion.div whileTap={{ scale: 0.98 }} onClick={() => go("payments")}
              className="p-4 rounded-[24px] cursor-pointer"
              style={{
                background: isDark ? "linear-gradient(135deg, #072213 0%, #031109 100%)" : "linear-gradient(135deg, #F9FDFB 0%, #DCFCE7 100%)",
                border: isDark ? "1.5px solid rgba(34, 197, 94, 0.35)" : "1.5px solid rgba(34, 197, 94, 0.25)",
                height: 136,
                boxShadow: "0 4px 18px rgba(34, 197, 94, 0.05)"
              }}>
              <div className="flex justify-between items-center h-full gap-3">
                <div className="flex-1 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: isDark ? "rgba(34, 197, 94, 0.15)" : "rgba(34, 197, 94, 0.08)" }}>
                        <Wallet size={14} color={isDark ? "#4ADE80" : "#15803D"} />
                      </div>
                      <span className="text-[9px] font-black px-2 py-0.5 rounded-full text-white bg-indigo-600">
                        GOLD
                      </span>
                    </div>
                    <h3 className="text-[14px] font-black leading-snug" style={{ color: isDark ? "#4ADE80" : "#15803D" }}>My Wallet Balance</h3>
                    <p className="text-[12px] mt-0.5 leading-snug font-extrabold" style={{ color: isDark ? "#22C55E" : "#166534" }}>₹1,250.00 cash</p>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold" style={{ color: isDark ? "#4ADE80" : "#15803D" }}>
                    <span>View statement</span>
                    <ChevronRight size={10} />
                  </div>
                </div>

                {/* Right side Image */}
                <div className="w-[110px] h-[104px] rounded-[18px] overflow-hidden flex-shrink-0 border shadow-inner relative"
                  style={{ borderColor: isDark ? "rgba(34, 197, 94, 0.25)" : "rgba(34, 197, 94, 0.15)" }}>
                  <img src="https://images.unsplash.com/photo-1589758438368-0ad531db3366?w=300&h=300&fit=crop&auto=format" alt="Wallet Balance" className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
            </motion.div>
          </FadeUp>

          {/* Card 3: Live Kitchen Cam */}
          <FadeUp delay={0.16}>
            <motion.div whileTap={{ scale: 0.98 }} onClick={() => go("kitchen")}
              className="p-4 rounded-[24px] cursor-pointer"
              style={{
                background: isDark ? "linear-gradient(135deg, #0A1E36 0%, #040D1A 100%)" : "linear-gradient(135deg, #F6F9FF 0%, #DBEAFE 100%)",
                border: isDark ? "1.5px solid rgba(59, 130, 246, 0.35)" : "1.5px solid rgba(59, 130, 246, 0.25)",
                height: 136,
                boxShadow: "0 4px 18px rgba(59, 130, 246, 0.05)"
              }}>
              <div className="flex justify-between items-center h-full gap-3">
                <div className="flex-1 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: isDark ? "rgba(59, 130, 246, 0.15)" : "rgba(59, 130, 246, 0.08)" }}>
                        <Camera size={14} color={isDark ? "#60A5FA" : "#2563EB"} />
                      </div>
                      <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-red-100 text-red-600 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" /> LIVE
                      </span>
                    </div>
                    <h3 className="text-[14px] font-black leading-snug" style={{ color: isDark ? "#60A5FA" : "#1D4ED8" }}>Watch Live Kitchen</h3>
                    <p className="text-[11px] mt-0.5 leading-snug font-medium" style={{ color: t.sub }}>A+ Certified Hygiene</p>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold" style={{ color: isDark ? "#60A5FA" : "#2563EB" }}>
                    <span>Meet the Chef</span>
                    <ChevronRight size={10} />
                  </div>
                </div>

                {/* Right side Image */}
                <div className="w-[110px] h-[104px] rounded-[18px] overflow-hidden flex-shrink-0 border shadow-inner relative"
                  style={{ borderColor: isDark ? "rgba(59, 130, 246, 0.25)" : "rgba(59, 130, 246, 0.15)" }}>
                  <img src="https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?w=300&h=300&fit=crop&auto=format" alt="Live Kitchen" className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
            </motion.div>
          </FadeUp>

          {/* Card 4: Refer & Earn */}
          <FadeUp delay={0.18}>
            <motion.div whileTap={{ scale: 0.98 }} onClick={() => go("refer")}
              className="p-4 rounded-[24px] cursor-pointer"
              style={{
                background: isDark ? "linear-gradient(135deg, #1D1035 0%, #0D071A 100%)" : "linear-gradient(135deg, #FAF8FF 0%, #EDE9FE 100%)",
                border: isDark ? "1.5px solid rgba(139, 92, 246, 0.35)" : "1.5px solid rgba(139, 92, 246, 0.25)",
                height: 136,
                boxShadow: "0 4px 18px rgba(139, 92, 246, 0.05)"
              }}>
              <div className="flex justify-between items-center h-full gap-3">
                <div className="flex-1 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: isDark ? "rgba(139, 92, 246, 0.15)" : "rgba(139, 92, 246, 0.08)" }}>
                        <Gift size={14} color={isDark ? "#A78BFA" : "#7C3AED"} />
                      </div>
                      <span className="text-[9px] font-black px-2 py-0.5 rounded-full text-white bg-purple-600">
                        🎁 FREE
                      </span>
                    </div>
                    <h3 className="text-[14px] font-black leading-snug" style={{ color: isDark ? "#A78BFA" : "#6D28D9" }}>Invite Friends</h3>
                    <p className="text-[11px] mt-0.5 leading-snug font-medium" style={{ color: t.sub }}>Get ₹100 / referral</p>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold" style={{ color: isDark ? "#A78BFA" : "#7C3AED" }}>
                    <span>Get coupon code</span>
                    <ChevronRight size={10} />
                  </div>
                </div>

                {/* Right side Image */}
                <div className="w-[110px] h-[104px] rounded-[18px] overflow-hidden flex-shrink-0 border shadow-inner relative"
                  style={{ borderColor: isDark ? "rgba(139, 92, 246, 0.25)" : "rgba(139, 92, 246, 0.15)" }}>
                  <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=300&fit=crop&auto=format" alt="Invite Friends" className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
            </motion.div>
          </FadeUp>
        </div>

        {/* UP NEXT - Scheduled Meal Card */}
        <FadeUp delay={0.2}>
          <div>
            <div className="flex items-center justify-between mb-2.5 px-1">
              <p className="text-[14px] font-black" style={{ color: t.text, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Up Next tomorrow</p>
              <button className="text-[11px] font-black uppercase tracking-wider" style={{ color: B.orange }} onClick={() => go("meals")}>Full Menu →</button>
            </div>
            <Card t={t} onClick={() => { setSelectedMealId(mealsList[2].id); go("meal_detail"); }} p="p-3">
              <div className="flex items-center gap-3.5">
                <div className="rounded-[16px] overflow-hidden flex-shrink-0" style={{ width: 68, height: 68, background: t.surface }}>
                  <img src={mealsList[2].img} alt="next" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-black uppercase tracking-[0.12em] mb-1 text-gray-400" style={{ color: t.muted }}>TOMORROW LUNCH</p>
                  <p className="text-[14px] font-black leading-snug truncate" style={{ color: t.text }}>{mealsList[2].name}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: t.muted }}>{mealsList[2].time} · {mealsList[2].cal} kcal · {mealsList[2].protein}g protein</p>
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#FAFAF8] border" style={{ borderColor: t.border }}>
                  <ChevronRight size={14} color={t.text} />
                </div>
              </div>
            </Card>
          </div>
        </FadeUp>

        {/* ACTIVE OFFERS - Horizontal Scroll Carousel */}
        <FadeUp delay={0.22}>
          <div>
            <div className="flex items-center justify-between mb-2.5 px-1">
              <p className="text-[14px] font-black" style={{ color: t.text, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Active Wallet Coupons</p>
              <button className="text-[11px] font-semibold" style={{ color: B.orange }} onClick={() => go("offers")}>View all</button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
              {[
                { code: "WELCOME50", desc: "₹50 off next billing", col: B.orange, bg: B.orangeL },
                { code: "SAVE20", desc: "20% off monthly tier", col: "#6366F1", bg: "#EDE9FE" },
                { code: "REFER100", desc: "Earn cash in wallet", col: B.green, bg: B.greenL },
              ].map(o => (
                <motion.div key={o.code} whileTap={{ scale: 0.97 }} className="flex-shrink-0 w-44 p-4 rounded-[22px] cursor-pointer" style={{ background: o.bg }}>
                  <Tag size={13} color={o.col} className="mb-2" />
                  <p className="text-[13px] font-black mb-1" style={{ color: o.col }}>{o.code}</p>
                  <p className="text-[10px] leading-snug font-bold" style={{ color: o.col + "BB" }}>{o.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* MEALS RECOMMENDATION SECTION */}
        <FadeUp delay={0.24}>
          <div>
            <p className="text-[14px] font-black mb-2.5 px-1" style={{ color: t.text, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Recommended for {user.name || "Bhargav"}</p>
            <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
              {mealsList.slice(0, 4).map((m, i) => (
                <motion.div key={m.id} whileTap={{ scale: 0.97 }}
                  onClick={() => { setSelectedMealId(m.id); go("meal_detail"); }}
                  className="flex-shrink-0 w-40 rounded-[22px] overflow-hidden cursor-pointer"
                  style={{ background: t.card, boxShadow: "0 3px 18px rgba(0,0,0,0.06)", border: `1.5px solid ${t.border}` }}
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.06 }}>
                  <div className="relative" style={{ height: 100 }}>
                    <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2">
                      <VegPill veg={m.type === "veg"} />
                    </div>
                  </div>
                  <div className="p-3 flex flex-col gap-0.5">
                    <p className="text-[12px] font-black leading-snug truncate" style={{ color: t.text }}>{m.name}</p>
                    <p className="text-[10px]" style={{ color: t.muted }}>{m.cal} kcal · {m.protein}g protein</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </WithNav>
  );
}

// ─── MEALS ────────────────────────────────────────────────────────────────────


function Meals({ go, t, mealsList, selectedMealId, setSelectedMealId }: { go: (s: Screen) => void; t: T; mealsList: Meal[]; selectedMealId: number; setSelectedMealId: (id: number) => void }) {
  const [day, setDay] = useState("Today");
  const [filter, setFilter] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const id = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(id);
  }, [day, filter, selectedCategory]);

  const filteredMeals = mealsList.filter(m => {
    // 1. Day Filter
    const matchDay = (day === "Week") || (m.day === day);
    
    // 2. Type Filter (Veg/Non-Veg/Egg/All)
    let matchType = true;
    if (filter === "Veg") {
      matchType = m.type === "veg";
    } else if (filter === "Non-Veg") {
      matchType = m.type === "non-veg";
    } else if (filter === "Egg") {
      matchType = m.type === "egg";
    }
    
    // 3. Category Filter
    let matchCategory = true;
    if (selectedCategory !== "All Categories") {
      matchCategory = m.categories.includes(selectedCategory);
    }
    
    return matchDay && matchType && matchCategory;
  });

  return (
    <WithNav tab="meals" go={go} t={t}>
      {/* Top Filter & Header Panel */}
      <div className="px-5 pt-6 pb-3 border-b" style={{ borderColor: t.border }}>
        <FadeUp delay={0}>
          <div className="flex items-center justify-between mb-3.5">
            <h1 className="text-[25px] font-black" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: t.text }}>Daily Menu</h1>
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 border border-orange-100">
              ⚡ Delivery Active
            </span>
          </div>
          
          {/* Top Filter Bar: Day selection */}
          <div className="flex gap-2 mb-3">
            {["Today", "Tomorrow", "Week"].map(d => (
              <motion.button key={d} onClick={() => setDay(d)}
                className="flex-1 py-2 rounded-[14px] text-[12px] font-black uppercase tracking-wider transition-all"
                style={{
                  background: day === d ? B.orange : t.surface,
                  color: day === d ? "#fff" : t.muted,
                  boxShadow: day === d ? `0 4px 12px ${B.orange}35` : "none"
                }}
                whileTap={{ scale: 0.96 }}>
                {d}
              </motion.button>
            ))}
          </div>

          {/* Second Filter Bar: Type (Veg, Non-Veg, Egg, All) */}
          <div className="flex gap-2">
            {["All", "Veg", "Non-Veg", "Egg"].map(f => (
              <motion.button key={f} onClick={() => setFilter(f)}
                className="flex-1 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider transition-all border flex items-center justify-center gap-1"
                style={{
                  background: filter === f ? (f === "Veg" ? "#DCFCE7" : f === "Non-Veg" ? "#FEE2E2" : f === "Egg" ? "#FEF3C7" : t.surface) : "transparent",
                  color: filter === f ? (f === "Veg" ? "#15803D" : f === "Non-Veg" ? "#EF4444" : f === "Egg" ? "#B45309" : t.text) : t.muted,
                  borderColor: filter === f ? (f === "Veg" ? "#22C55E" : f === "Non-Veg" ? "#EF4444" : f === "Egg" ? "#F59E0B" : t.text) : t.border
                }}
                whileTap={{ scale: 0.95 }}>
                {f === "Veg" && <div className="w-1.5 h-1.5 rounded-full bg-green-600" />}
                {f === "Non-Veg" && <div className="w-1.5 h-1.5 rounded-full bg-red-600" />}
                {f === "Egg" && <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                {f}
              </motion.button>
            ))}
          </div>
        </FadeUp>
      </div>

      {/* Main split viewport (Left: Category Panel, Right: Meals List) */}
      <div className="flex flex-1 min-h-0 overflow-hidden" style={{ height: "calc(100vh - 280px)" }}>
        {/* Left Category Panel (Sidebar) */}
        <div className="w-[30%] border-r overflow-y-auto pt-3 px-1.5" style={{ borderColor: t.border, scrollbarWidth: "none" }}>
          <div className="flex flex-col gap-1">
            <button onClick={() => setSelectedCategory("All Categories")}
              className="text-left py-2 px-2 rounded-[12px] text-[11px] font-bold transition-all truncate"
              style={{
                background: selectedCategory === "All Categories" ? B.orangeL : "transparent",
                color: selectedCategory === "All Categories" ? B.orange : t.sub
              }}>
              All Menu
            </button>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)}
                className="text-left py-2 px-2 rounded-[12px] text-[11px] font-bold transition-all truncate"
                style={{
                  background: selectedCategory === cat ? B.orangeL : "transparent",
                  color: selectedCategory === cat ? B.orange : t.muted
                }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Right Meals Grid/List */}
        <div className="w-[70%] overflow-y-auto px-4 pt-3 pb-8" style={{ scrollbarWidth: "none" }}>
          {loading ? (
            <div className="flex flex-col gap-4">
              <SkeletonCard t={t} />
              <SkeletonCard t={t} />
            </div>
          ) : filteredMeals.length > 0 ? (
            <div className="flex flex-col gap-4">
              {filteredMeals.map((m, i) => (
                <motion.div key={m.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-[22px] overflow-hidden border cursor-pointer"
                  style={{ background: t.card, borderColor: t.border, boxShadow: "0 2px 12px rgba(0,0,0,0.03)" }}
                  onClick={() => { setSelectedMealId(m.id); go("meal_detail"); }}>
                  
                  {/* Meal Image */}
                  <div className="relative" style={{ height: 110 }}>
                    <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,transparent 30%,rgba(0,0,0,0.65) 100%)" }} />
                    <div className="absolute top-2 left-2">
                      <VegPill veg={m.type === "veg"} />
                    </div>
                    {/* Time or Day Badge */}
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                      <span className="text-[9px] font-black text-white bg-black/45 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                        {m.day}
                      </span>
                      <span className="text-[9px] font-black text-yellow-300 flex items-center gap-0.5">
                        ⭐ {m.rating}
                      </span>
                    </div>
                  </div>

                  {/* Meal Details */}
                  <div className="p-3">
                    <h3 className="text-[13px] font-black leading-snug mb-1 truncate" style={{ color: t.text }}>{m.name}</h3>
                    <p className="text-[10px] text-gray-400 mb-2 truncate" style={{ color: t.muted }}>{m.desc}</p>
                    
                    {/* Nutritional stats */}
                    <div className="grid grid-cols-4 gap-1 text-center bg-[#FDF9F4] p-1.5 rounded-xl border border-orange-50 mb-2">
                      <div>
                        <span className="text-[11px] font-black text-amber-700 block">{m.cal}</span>
                        <span className="text-[8px] uppercase font-bold text-amber-500 block">Kcal</span>
                      </div>
                      <div>
                        <span className="text-[11px] font-black text-indigo-700 block">{m.protein}g</span>
                        <span className="text-[8px] uppercase font-bold text-indigo-500 block">Prot</span>
                      </div>
                      <div>
                        <span className="text-[11px] font-black text-emerald-700 block">{m.carbs}g</span>
                        <span className="text-[8px] uppercase font-bold text-emerald-500 block">Carb</span>
                      </div>
                      <div>
                        <span className="text-[11px] font-black text-rose-700 block">{m.fat}g</span>
                        <span className="text-[8px] uppercase font-bold text-rose-500 block">Fat</span>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: t.border }}>
                      <span className="text-[12px] font-black text-orange-600">{m.price}</span>
                      <div className="flex gap-1.5">
                        <button className="px-2.5 py-1 rounded-lg text-[9px] font-black uppercase text-gray-500 bg-gray-100 hover:bg-gray-200 transition-all">
                          Details
                        </button>
                        <button className="px-2.5 py-1 rounded-lg text-[9px] font-black uppercase text-white transition-all" style={{ background: B.orange }}>
                          Get
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center text-orange-400 text-lg mb-2">
                🍽️
              </div>
              <p className="text-[12px] font-black" style={{ color: t.text }}>No match found</p>
              <p className="text-[10px] max-w-[120px] mx-auto mt-1" style={{ color: t.muted }}>Try modifying your menu filters.</p>
            </div>
          )}
        </div>
      </div>
    </WithNav>
  );
}

// ─── PLANS ────────────────────────────────────────────────────────────────────

interface PlansProps {
  go: (s: Screen) => void;
  t: T;
  user: any;
  setUser: (u: any) => void;
  subscribed: boolean;
  setSubscribed: (s: boolean) => void;
  paused: boolean;
  setPaused: (p: boolean) => void;
}

function Plans({ go, t, user, setUser, subscribed, setSubscribed, paused, setPaused }: PlansProps) {
  const isDark = t.bg === "#0E0E0E";
  const [selected, setSelected] = useState("monthly");
  const plan = PLANS.find(p => p.id === selected)!;

  // Checkout Sheet States
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutMealType, setCheckoutMealType] = useState<"Veg" | "Non-Veg">("Veg");
  const [checkoutFreq, setCheckoutFreq] = useState<"lunch" | "dinner" | "both">("both");
  const [checkoutPrefs, setCheckoutPrefs] = useState<string[]>(["Medium Spicy"]);
  const [checkoutStartDate, setCheckoutStartDate] = useState<"tomorrow" | "custom">("tomorrow");
  const [isPaying, setIsPaying] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

  // Management Actions States
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Auto dismiss toasts
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(id);
  }, [toast]);

  const handleSubscribeSubmit = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setShowSuccessOverlay(true);
      setTimeout(() => {
        setShowSuccessOverlay(false);
        setShowCheckout(false);
        setSubscribed(true);
        setUser({
          ...user,
          foodPref: checkoutMealType,
        });
        setToast("Subscribed successfully! Welcome to Koi Koi Dabba 🎉");
      }, 2000);
    }, 1500);
  };

  const handleSkipConfirm = () => {
    setShowSkipConfirm(false);
    setToast("Tomorrow's delivery skipped! Day credited back to your wallet balance 💳");
  };

  const handleCancelConfirm = () => {
    setShowCancelConfirm(false);
    setSubscribed(false);
    setToast("Subscription cancelled successfully. We will miss you! 🍱");
  };

  const handleUpgradePlan = (planName: string) => {
    setShowUpgradeModal(false);
    setToast(`Upgraded successfully to ${planName} Plan!`);
  };

  const togglePref = (p: string) => {
    setCheckoutPrefs(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  };

  return (
    <WithNav tab="plans" go={go} t={t}>
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-4 left-6 right-6 p-4 rounded-[20px] text-white font-bold text-[12px] text-center z-50 flex items-center justify-center gap-2 shadow-2xl"
            style={{ background: "rgba(17,24,39,0.94)", backdropFilter: "blur(8px)" }}
          >
            <Sparkles size={14} className="text-yellow-400" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Animation Overlay */}
      <AnimatePresence>
        {showSuccessOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center p-6 text-center bg-black/95"
          >
            <SuccessCheck size={100} color={B.green} />
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-[24px] font-black text-white mt-6 mb-2"
              style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}
            >
              Subscription Active!
            </motion.h2>
            <motion.p
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-[13px] text-gray-400 max-w-xs leading-relaxed"
            >
              Your kitchen is warmed up and Arjun is preparing for your first dabba delivery tomorrow morning.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Screen Content */}
      <div className="flex-1 overflow-y-auto pb-[90px]" style={{ scrollbarWidth: "none" }}>
        
        {/* SUBSCRIBED STATE */}
        {subscribed ? (
          <div className="px-6 pt-6 flex flex-col gap-5">
            <FadeUp delay={0}>
              <div className="flex items-center justify-between mb-1">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.16em]" style={{ color: B.orange }}>MY SUBSCRIPTION</p>
                  <h1 className="text-[26px] font-black leading-tight" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: t.text }}>Current Plan</h1>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: paused ? "#FEF3C7" : B.greenL }}>
                  <PulsingDot color={paused ? "#F59E0B" : B.green} size={6} />
                  <span className="text-[9px] font-black uppercase tracking-wider" style={{ color: paused ? "#D97706" : "#15803D" }}>
                    {paused ? "PAUSED" : "ACTIVE"}
                  </span>
                </div>
              </div>
              <p className="text-[13px]" style={{ color: t.muted }}>Pause, upgrade, or reschedule your meals on the fly.</p>
            </FadeUp>

            {/* Premium Plan Dashboard Card */}
            <FadeUp delay={0.06}>
              <div
                className="rounded-[28px] overflow-hidden p-6 relative"
                style={{
                  background: isDark
                    ? "linear-gradient(135deg, #1f1f1f 0%, #0c0c0c 100%)"
                    : "linear-gradient(135deg, #ffffff 0%, #f6f1e9 100%)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
                  border: `1.5px solid ${t.border}`
                }}
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-[18px] flex items-center justify-center" style={{ background: B.orangeL }}>
                      <Package size={22} color={B.orange} />
                    </div>
                    <div>
                      <h2 className="text-[18px] font-black" style={{ color: t.text, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Monthly Subscription</h2>
                      <p className="text-[12px]" style={{ color: t.muted }}>Koi Koi Premium</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full text-white bg-indigo-600">BEST VALUE</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-5 pt-4 border-t" style={{ borderColor: t.border }}>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: t.muted }}>MEAL STYLE</p>
                    <p className="text-[13px] font-black mt-0.5" style={{ color: t.text }}>{user.foodPref || "Veg"} · Healthy</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: t.muted }}>FREQUENCY</p>
                    <p className="text-[13px] font-black mt-0.5" style={{ color: t.text }}>Lunch + Dinner (Daily)</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: t.muted }}>REMAINING DAYS</p>
                    <p className="text-[13px] font-black mt-0.5" style={{ color: B.green }}>27 of 30 Days left</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: t.muted }}>NEXT DELIVERY</p>
                    <p className="text-[13px] font-black mt-0.5" style={{ color: paused ? "#F59E0B" : t.text }}>
                      {paused ? "Delivery Paused" : "Tomorrow, 12:30 PM"}
                    </p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full relative overflow-hidden mb-3" style={{ background: t.surface }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "90%" }}
                    transition={{ duration: 1 }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${B.orange} 0%, ${B.green} 100%)` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold" style={{ color: t.muted }}>
                  <span>Day 3 of 30</span>
                  <span>Ends 30 Jul 2026</span>
                </div>
              </div>
            </FadeUp>

            {/* Manage Actions */}
            <FadeUp delay={0.12}>
              <div className="flex flex-col gap-3">
                
                {/* Pause/Resume Toggle */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setPaused(!paused);
                    setToast(paused ? "Subscription resumed successfully! 🍱" : "Subscription paused successfully. No food will be delivered until resumed. ⏸️");
                  }}
                  className="w-full flex items-center justify-between p-4.5 rounded-[22px] border cursor-pointer"
                  style={{ background: t.card, borderColor: t.border }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[14px] flex items-center justify-center" style={{ background: paused ? B.greenL : "#FEF3C7" }}>
                      {paused ? <Play size={17} color="#15803D" /> : <Pause size={17} color="#D97706" />}
                    </div>
                    <div className="text-left">
                      <p className="text-[14px] font-bold" style={{ color: t.text }}>{paused ? "Resume Deliveries" : "Pause Subscription"}</p>
                      <p className="text-[11px]" style={{ color: t.muted }}>{paused ? "Unpause to start receiving food" : "Temporarily pause your dabbas"}</p>
                    </div>
                  </div>
                  <ChevronRight size={16} color={t.muted} />
                </motion.button>

                {/* Skip Tomorrow Delivery */}
                <div className="rounded-[22px] border overflow-hidden" style={{ background: t.card, borderColor: t.border }}>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (paused) {
                        setToast("Your plan is currently paused.");
                        return;
                      }
                      setShowSkipConfirm(!showSkipConfirm);
                    }}
                    className="w-full flex items-center justify-between p-4.5 cursor-pointer"
                    disabled={paused}
                    style={{ opacity: paused ? 0.5 : 1 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-[14px] flex items-center justify-center" style={{ background: "#EFF6FF" }}>
                        <SkipForward size={17} color="#3B82F6" />
                      </div>
                      <div className="text-left">
                        <p className="text-[14px] font-bold" style={{ color: t.text }}>Skip Tomorrow's Delivery</p>
                        <p className="text-[11px]" style={{ color: t.muted }}>Skip next dabba, day credited back</p>
                      </div>
                    </div>
                    <ChevronRight size={16} color={t.muted} style={{ transform: showSkipConfirm ? "rotate(90deg)" : "none" }} />
                  </motion.button>
                  <AnimatePresence>
                    {showSkipConfirm && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-4.5 pb-4.5 pt-1 bg-blue-50/50 dark:bg-blue-950/20"
                      >
                        <p className="text-[12px] mb-3 leading-normal" style={{ color: t.sub }}>
                          Are you sure you want to skip lunch and dinner for tomorrow? Your current monthly billing cycle will be extended by 1 day.
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setShowSkipConfirm(false)}
                            className="flex-1 py-2.5 rounded-[12px] text-[11px] font-black border"
                            style={{ borderColor: t.border, color: t.muted }}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSkipConfirm}
                            className="flex-1 py-2.5 rounded-[12px] text-[11px] font-black text-white"
                            style={{ background: "#3B82F6" }}
                          >
                            Confirm Skip
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Upgrade Plan */}
                <div className="rounded-[22px] border overflow-hidden" style={{ background: t.card, borderColor: t.border }}>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowUpgradeModal(!showUpgradeModal)}
                    className="w-full flex items-center justify-between p-4.5 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-[14px] flex items-center justify-center" style={{ background: "#F5F3FF" }}>
                        <Zap size={17} color="#8B5CF6" />
                      </div>
                      <div className="text-left">
                        <p className="text-[14px] font-bold" style={{ color: t.text }}>Upgrade Subscription</p>
                        <p className="text-[11px]" style={{ color: t.muted }}>Switch to a different premium tier</p>
                      </div>
                    </div>
                    <ChevronRight size={16} color={t.muted} style={{ transform: showUpgradeModal ? "rotate(90deg)" : "none" }} />
                  </motion.button>
                  <AnimatePresence>
                    {showUpgradeModal && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-4.5 pb-4.5 pt-1 flex flex-col gap-2"
                      >
                        <p className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: t.muted }}>Choose Higher Tier</p>
                        {PLANS.filter(p => p.id !== "daily" && p.id !== "weekly" && p.id !== "monthly").map(up => (
                          <button
                            key={up.id}
                            onClick={() => handleUpgradePlan(up.name)}
                            className="w-full flex items-center justify-between p-3 rounded-[14px] border text-left"
                            style={{ borderColor: t.border, background: t.surface }}
                          >
                            <div>
                              <p className="text-[12px] font-bold" style={{ color: t.text }}>{up.name} Plan</p>
                              <p className="text-[10px]" style={{ color: t.muted }}>{up.sub}</p>
                            </div>
                            <span className="text-[12px] font-black" style={{ color: B.orange }}>{up.price}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Cancel Subscription */}
                <div className="rounded-[22px] border overflow-hidden" style={{ background: t.card, borderColor: t.border }}>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowCancelConfirm(!showCancelConfirm)}
                    className="w-full flex items-center justify-between p-4.5 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-[14px] flex items-center justify-center" style={{ background: "#FEF2F2" }}>
                        <X size={17} color="#EF4444" />
                      </div>
                      <div className="text-left">
                        <p className="text-[14px] font-bold" style={{ color: t.text }}>Cancel Subscription</p>
                        <p className="text-[11px]" style={{ color: t.muted }}>Deactivate your account deliveries</p>
                      </div>
                    </div>
                    <ChevronRight size={16} color={t.muted} style={{ transform: showCancelConfirm ? "rotate(90deg)" : "none" }} />
                  </motion.button>
                  <AnimatePresence>
                    {showCancelConfirm && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-4.5 pb-4.5 pt-1 bg-red-50/50 dark:bg-red-950/10"
                      >
                        <p className="text-[12px] mb-3 leading-normal" style={{ color: t.sub }}>
                          Are you sure you want to cancel your dabba subscription? You will lose access to premium slots, and refund for remaining balance will be credited to your wallet.
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setShowCancelConfirm(false)}
                            className="flex-1 py-2.5 rounded-[12px] text-[11px] font-black border"
                            style={{ borderColor: t.border, color: t.muted }}
                          >
                            Keep Plan
                          </button>
                          <button
                            onClick={handleCancelConfirm}
                            className="flex-1 py-2.5 rounded-[12px] text-[11px] font-black text-white"
                            style={{ background: "#EF4444" }}
                          >
                            Confirm Cancel
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </FadeUp>
          </div>
        ) : (
          
          /* UNSUBSCRIBED STATE (PREMIUM EMPTY STATE + PLAN CATALOG) */
          <div>
            {/* Organic blobs background */}
            <div className="px-6 pt-6 pb-4 relative overflow-hidden">
              <OrgBlob x={-40} y={-20} size={200} color={B.orange} opacity={0.06} blur={40} />
              <FadeUp delay={0}>
                <p className="text-[11px] font-black uppercase tracking-[0.16em] mb-1 relative z-10" style={{ color: B.orange }}>KOI KOI DABBA</p>
                <h1 className="text-[28px] font-black leading-tight mb-1 relative z-10" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: t.text }}>Choose Your Plan</h1>
                <p className="text-[14px] relative z-10" style={{ color: t.muted }}>Pause, skip or cancel anytime.</p>
              </FadeUp>
            </div>

            {/* Premium Empty State Block */}
            <div className="px-6 pb-6">
              <FadeUp delay={0.06}>
                <div className="p-6 rounded-[28px] border-2 border-dashed flex flex-col items-center text-center" style={{ borderColor: t.border, background: t.card }}>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ background: B.orangeL }}>
                    <Calendar size={24} color={B.orange} />
                  </div>
                  <h3 className="text-[18px] font-black mb-1.5" style={{ color: t.text, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>No Active Subscription</h3>
                  <p className="text-[12px] text-gray-500 max-w-xs leading-relaxed mb-4">
                    Subscribe to start receiving fresh, healthy, home-style dabbas. Choose your schedule and enjoy absolute delivery convenience.
                  </p>
                  <button
                    onClick={() => {
                      const el = document.getElementById("catalog-heading");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-5 py-3 rounded-full text-[12px] font-black text-white"
                    style={{ background: B.orange, boxShadow: `0 4px 16px ${B.orange}35` }}
                  >
                    Explore Plans Below
                  </button>
                </div>
              </FadeUp>
            </div>

            <div id="catalog-heading" className="px-6 mb-3 pt-2">
              <p className="text-[12px] font-black uppercase tracking-wider" style={{ color: t.muted }}>Select Your Plan</p>
            </div>

            {/* 6 Plans Grid */}
            <div className="px-5 flex flex-col gap-3.5 mb-[110px]">
              {PLANS.map((p, i) => {
                const isSel = selected === p.id;
                return (
                  <motion.button
                    key={p.id}
                    onClick={() => setSelected(p.id)}
                    className="w-full text-left rounded-[24px] border-2 overflow-hidden cursor-pointer"
                    style={{
                      borderColor: isSel ? p.color : t.border,
                      background: isSel ? p.color + "0a" : t.card,
                      boxShadow: isSel ? `0 4px 28px ${p.color}18` : "0 1px 12px rgba(0,0,0,0.03)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div className="p-4.5">
                      <div className="flex items-start justify-between mb-2.5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-[14px] flex items-center justify-center" style={{ background: isSel ? p.color + "18" : t.surface }}>
                            <Package size={18} color={isSel ? p.color : t.muted} />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <p className="text-[15px] font-black" style={{ color: t.text }}>{p.name}</p>
                              {p.badge && (
                                <motion.span
                                  animate={{ scale: isSel ? [1, 1.05, 1] : 1 }}
                                  transition={{ duration: 1.5, repeat: Infinity }}
                                  className="text-[8px] font-black px-1.5 py-0.5 rounded-full text-white"
                                  style={{ background: p.color }}
                                >
                                  {p.badge}
                                </motion.span>
                              )}
                            </div>
                            <p className="text-[11px]" style={{ color: t.muted }}>{p.sub}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[20px] font-black leading-none" style={{ color: isSel ? p.color : t.text, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{p.price}</p>
                          <p className="text-[11px]" style={{ color: t.muted }}>{p.unit}</p>
                        </div>
                      </div>
                      <AnimatePresence>
                        {isSel && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="pt-3.5 mt-2" style={{ borderTop: `1px solid ${t.border}` }}>
                              <div className="flex flex-wrap gap-1.5">
                                {p.perks.map((perk, pi) => (
                                  <motion.div
                                    key={perk}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: pi * 0.04 }}
                                    className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold"
                                    style={{ background: p.color + "12", color: p.color }}
                                  >
                                    <Check size={10} color={p.color} strokeWidth={3} />
                                    <span>{perk}</span>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Subscribe floating CTA bar */}
            <div className="absolute bottom-0 left-0 right-0 p-4 pb-6 border-t z-20 flex flex-col gap-1.5" style={{ background: t.nav, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderColor: t.border }}>
              <OrangeBtn
                label={`Subscribe to ${plan.name}`}
                icon={<Sparkles size={16} />}
                onClick={() => setShowCheckout(true)}
              />
              <p className="text-center text-[10px]" style={{ color: t.muted }}>No lock-in contracts · Cancel or pause deliveries anytime</p>
            </div>
          </div>
        )}

      </div>

      {/* Subscription Checkout Sheet */}
      <AnimatePresence>
        {showCheckout && (
          <div className="absolute inset-0 z-40 bg-black/60 flex flex-col justify-end">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="rounded-t-[32px] p-6 max-h-[92%] flex flex-col shadow-2xl"
              style={{ background: t.card }}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b mb-4" style={{ borderColor: t.border }}>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider" style={{ color: B.orange }}>SUBSCRIBE CHECKOUT</p>
                  <h3 className="text-[18px] font-black" style={{ color: t.text, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{plan.name} Subscription</h3>
                </div>
                <button
                  onClick={() => setShowCheckout(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                  style={{ background: t.surface }}
                >
                  <X size={16} color={t.text} />
                </button>
              </div>

              {/* Scrollable inputs */}
              <div className="flex-1 overflow-y-auto pb-6 flex flex-col gap-5" style={{ scrollbarWidth: "none" }}>
                
                {/* Choose Meal Type */}
                <div>
                  <p className="text-[11px] font-black uppercase tracking-wider mb-2.5" style={{ color: t.muted }}>Meal Preference</p>
                  <div className="grid grid-cols-2 gap-3">
                    {["Veg", "Non-Veg"].map(type => {
                      const sel = checkoutMealType === type;
                      return (
                        <button
                          key={type}
                          onClick={() => setCheckoutMealType(type as any)}
                          className="py-3 px-4 rounded-[16px] font-bold text-[13px] border-2 transition-all text-center flex items-center justify-center gap-1.5"
                          style={{
                            borderColor: sel ? B.orange : t.border,
                            background: sel ? B.orangeL : "transparent",
                            color: sel ? B.orange : t.text
                          }}
                        >
                          {type === "Veg" ? <Leaf size={14} /> : <Coffee size={14} />}
                          <span>{type}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Frequency */}
                <div>
                  <p className="text-[11px] font-black uppercase tracking-wider mb-2.5" style={{ color: t.muted }}>Dabba Frequency</p>
                  <div className="flex flex-col gap-2">
                    {[
                      { id: "lunch", label: "☀️ Lunch Only" },
                      { id: "dinner", label: "🌙 Dinner Only" },
                      { id: "both", label: "☀️🌙 Lunch + Dinner" }
                    ].map(f => {
                      const sel = checkoutFreq === f.id;
                      return (
                        <button
                          key={f.id}
                          onClick={() => setCheckoutFreq(f.id as any)}
                          className="p-3.5 rounded-[16px] font-bold text-[13px] border-2 flex items-center justify-between text-left"
                          style={{
                            borderColor: sel ? B.orange : t.border,
                            background: sel ? B.orangeL : "transparent",
                            color: sel ? B.orange : t.text
                          }}
                        >
                          <span>{f.label}</span>
                          {sel && <Check size={14} color={B.orange} />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom preferences */}
                <div>
                  <p className="text-[11px] font-black uppercase tracking-wider mb-2" style={{ color: t.muted }}>Custom Preferences</p>
                  <div className="flex gap-2 flex-wrap">
                    {["Mild Spicy", "Medium Spicy", "Low Carb", "High Protein", "No Dairy"].map(pref => {
                      const active = checkoutPrefs.includes(pref);
                      return (
                        <button
                          key={pref}
                          onClick={() => togglePref(pref)}
                          className="px-3.5 py-2 rounded-full text-[11px] font-bold border transition-colors"
                          style={{
                            background: active ? B.orange + "15" : "transparent",
                            borderColor: active ? B.orange : t.border,
                            color: active ? B.orange : t.muted
                          }}
                        >
                          {pref}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Delivery Start Date */}
                <div>
                  <p className="text-[11px] font-black uppercase tracking-wider mb-2" style={{ color: t.muted }}>Delivery Start Date</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setCheckoutStartDate("tomorrow")}
                      className="py-3 px-4 rounded-[16px] font-bold text-[12px] border flex flex-col items-center gap-1"
                      style={{
                        borderColor: checkoutStartDate === "tomorrow" ? B.orange : t.border,
                        background: checkoutStartDate === "tomorrow" ? B.orangeL : "transparent",
                        color: checkoutStartDate === "tomorrow" ? B.orange : t.muted
                      }}
                    >
                      <span className="font-black">Tomorrow</span>
                      <span className="text-[10px] opacity-70">Starts at 12:30 PM</span>
                    </button>
                    <button
                      onClick={() => setCheckoutStartDate("custom")}
                      className="py-3 px-4 rounded-[16px] font-bold text-[12px] border flex flex-col items-center gap-1"
                      style={{
                        borderColor: checkoutStartDate === "custom" ? B.orange : t.border,
                        background: checkoutStartDate === "custom" ? B.orangeL : "transparent",
                        color: checkoutStartDate === "custom" ? B.orange : t.muted
                      }}
                    >
                      <span className="font-black">Custom Date</span>
                      <span className="text-[10px] opacity-70">Select calendar slot</span>
                    </button>
                  </div>
                </div>

                {/* Pricing Summary */}
                <div className="p-4 rounded-[20px] flex flex-col gap-2.5" style={{ background: t.surface }}>
                  <div className="flex justify-between items-center text-[12px]">
                    <span style={{ color: t.muted }}>Plan Rate ({plan.name})</span>
                    <span className="font-black" style={{ color: t.text }}>{plan.price}</span>
                  </div>
                  <div className="flex justify-between items-center text-[12px]">
                    <span style={{ color: t.muted }}>Steel Dabba Deposit (Refundable)</span>
                    <span className="font-black" style={{ color: t.text }}>₹299</span>
                  </div>
                  <div className="flex justify-between items-center text-[12px] pb-2 border-b" style={{ borderColor: t.border }}>
                    <span style={{ color: t.muted }}>Monsoon Discount</span>
                    <span className="font-black text-green-600">−₹100</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[13px] font-black" style={{ color: t.text }}>Total Due</span>
                    <span className="text-[18px] font-black" style={{ color: B.orange, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                      ₹{parseInt(plan.price.replace(/[^\d]/g, "")) + 199}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout CTA */}
              <div className="pt-4 border-t flex flex-col gap-2" style={{ borderColor: t.border }}>
                <OrangeBtn
                  label={isPaying ? "Authorizing Payment..." : `Pay & Activate Subscription`}
                  onClick={handleSubscribeSubmit}
                  disabled={isPaying}
                  icon={isPaying ? null : <CheckCircle2 size={16} />}
                />
                <p className="text-center text-[9px]" style={{ color: t.muted }}>Security SSL Encrypted · Refund of Deposit is instant on cancellation</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </WithNav>
  );
}

// ─── PROFILE ──────────────────────────────────────────────────────────────────

function ProfileScreen({
  go, t, user, setUser, subscribed, setSubscribed
}: {
  go: (s: Screen) => void;
  t: T;
  user: any;
  setUser: (u: any) => void;
  subscribed: boolean;
  setSubscribed: (s: boolean) => void;
}) {
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const avatarPresets = [
    { char: "👩‍🍳", name: "Chef Reddy" },
    { char: "🥑", name: "Super Healthy" },
    { char: "🍱", name: "Classic Dabba" },
    { char: "🍛", name: "Thali King" },
    { char: "🥭", name: "Mango Sweet" },
    { char: "🌶️", name: "Spice Lover" },
    { char: "🥛", name: "Lassi Cool" },
    { char: "🍋", name: "Zesty Lemon" },
    { char: "R", name: "Initial 'R'" },
  ];

  function Row({ I, label, sub, col=t.muted, fn }: any) {
    return (
      <motion.button whileTap={{ scale:0.98 }} onClick={fn} className="w-full flex items-center gap-4 px-5 py-4 text-left cursor-pointer">
        <div className="w-10 h-10 rounded-[14px] flex items-center justify-center flex-shrink-0" style={{ background:col+"18" }}>
          <I size={17} color={col} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-bold" style={{ color:t.text }}>{label}</p>
          {sub && <p className="text-[11px]" style={{ color:t.muted }}>{sub}</p>}
        </div>
        <ChevronRight size={15} color={t.muted} />
      </motion.button>
    );
  }

  function Group({ title, children }: { title:string; children:React.ReactNode }) {
    return (
      <div className="mb-4">
        <p className="text-[10px] font-black uppercase tracking-[0.14em] px-6 mb-2" style={{ color:t.muted }}>{title}</p>
        <div className="rounded-[24px] overflow-hidden mx-4 border" style={{ background:t.card, borderColor:t.border, boxShadow:"0 1px 12px rgba(0,0,0,0.03)" }}>
          <div className="divide-y" style={{ borderColor:t.border }}>{children}</div>
        </div>
      </div>
    );
  }

  return (
    <WithNav tab="profile" go={go} t={t}>
      <div className="relative flex-1 flex flex-col pb-8">
        
        {/* Toast feedback */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity:0, y:-10, scale:0.95 }}
              animate={{ opacity:1, y:0, scale:1 }}
              exit={{ opacity:0, y:-10, scale:0.95 }}
              className="absolute top-4 left-6 right-6 z-50 p-4 rounded-xl shadow-lg flex items-center gap-3 text-white text-[12px] font-black"
              style={{ background:"#111827", boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
            >
              <Sparkles size={14} color={B.orange} />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* User hero */}
        <div className="px-6 pt-6 pb-5 relative overflow-hidden">
          <OrgBlob x={-30} y={-20} size={180} color={B.orange} opacity={0.06} blur={40} />
          <FadeUp delay={0}>
            <div className="flex items-center gap-4 mb-4 relative z-10">
              <motion.button
                onClick={() => setShowAvatarSelector(true)}
                className="rounded-[24px] font-black text-2xl flex items-center justify-center relative cursor-pointer border shadow-md"
                style={{ width:76, height:76, background:B.orange, borderColor: t.border, color: "white" }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale:0.95 }}
              >
                {user?.avatar || "R"}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 bg-green-500" style={{ borderColor:t.bg }}>
                  <Check size={11} color="white" strokeWidth={3} />
                </div>
              </motion.button>
              <div>
                <h1 className="text-[20px] font-black leading-tight" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", color:t.text }}>{user?.name || "Riya Sharma"}</h1>
                <p className="text-[12px] font-bold opacity-80" style={{ color:t.text }}>{user?.phone || "+91 98765 43210"}</p>
                <p className="text-[11px]" style={{ color:t.muted }}>{user?.email || "riya@email.com"}</p>
              </div>
              <motion.button whileTap={{ scale:0.9 }} onClick={()=>go("personal")}
                className="w-10 h-10 rounded-full flex items-center justify-center ml-auto border cursor-pointer" style={{ background:t.surface, borderColor:t.border }}>
                <Edit size={15} color={t.muted} />
              </motion.button>
            </div>
            
            {/* Badges */}
            <div className="flex gap-2 relative z-10">
              <span className="text-[11px] font-black px-3.5 py-1.5 rounded-full border shadow-sm" style={{ background:B.orangeL, color:B.orange, borderColor: B.orange + "20" }}>
                {subscribed ? "Active Plan" : "No Active Plan"}
              </span>
              <span className="text-[11px] font-black px-3.5 py-1.5 rounded-full border shadow-sm" style={{ background:B.greenL, color:"#15803D", borderColor: B.green + "20" }}>
                1,250 pts · Gold
              </span>
            </div>
          </FadeUp>
        </div>

        <Group title="Account & Identity">
          <Row I={User} label="Personal Details" sub="Name, email, phone number & gender" col={"#6366F1"} fn={()=>go("personal")} />
          <Row I={Heart} label="Health Info" sub="Nutrition goals, calories, allergies" col={"#EC4899"} fn={()=>go("health_info")} />
          <Row I={MapPin} label="Saved Addresses" sub="Home, work & delivery instructions" col={B.orange} fn={()=>go("addresses")} />
        </Group>

        <Group title="Preferences">
          <div className="w-full flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-[14px] flex items-center justify-center" style={{ background: B.green + "18" }}>
                <Leaf size={17} color={B.green} />
              </div>
              <div>
                <p className="text-[14px] font-bold" style={{ color: t.text }}>Meal Preference</p>
                <p className="text-[11px]" style={{ color: t.muted }}>{(user?.foodPref || "Veg")} Preference</p>
              </div>
            </div>
            <div className="flex items-center p-1 rounded-[12px]" style={{ background: t.surface }}>
              {["Veg", "Non-Veg"].map(pref => {
                const active = (user?.foodPref || "Veg") === pref;
                return (
                  <button
                    key={pref}
                    onClick={() => {
                      setUser({ ...user, foodPref: pref });
                      setToastMessage(`Preferred meal set to ${pref === "Veg" ? "Vegetarian 🌿" : "Non-Vegetarian 🍗"}`);
                      setTimeout(() => setToastMessage(""), 2200);
                    }}
                    className="px-3.5 py-2 rounded-[9px] text-[10px] font-black transition-all cursor-pointer"
                    style={{
                      background: active ? (pref === "Veg" ? B.green : B.orange) : "transparent",
                      color: active ? "white" : t.muted
                    }}
                  >
                    {pref}
                  </button>
                );
              })}
            </div>
          </div>
        </Group>

        <Group title="Subscription & Finances">
          <Row I={Package} label="Subscription Status" sub={subscribed ? "Monthly Veg Plan · Active" : "No active subscription · Choose plan"} col={B.orange} fn={()=>go("plans")} />
          <Row I={Award} label="Rewards & Points" sub="1,250 pts · Gold Tier perks" col={"#F59E0B"} fn={()=>go("rewards")} />
          <Row I={Tag} label="Offers & Coupons" col={"#EC4899"} fn={()=>go("offers")} />
          <Row I={Gift} label="Referral Program" sub="Earn ₹100 per friend" col={"#8B5CF6"} fn={()=>go("refer")} />
        </Group>

        <Group title="App Settings">
          <Row I={Monitor} label="Appearance & Theme" sub="Light, Dark & System default" col={"#7C3AED"} fn={()=>go("appearance")} />
          <Row I={Bell} label="Notifications" sub="Updates, alerts & promo preferences" col={"#6366F1"} fn={()=>go("appearance")} />
        </Group>

        <Group title="Help & Support">
          <Row I={MessageCircle} label="Support Centre" sub="Live chat, phone call & tickets" col={"#3B82F6"} fn={()=>go("support")} />
          <Row I={HelpCircle} label="Frequently Asked Questions" col={t.muted} fn={()=>go("support")} />
          <Row I={Info} label="About KOI KOI" sub="v4.0.0 · Active" col={B.orange} fn={()=>{}} />
        </Group>

        <div className="px-5 mt-2 mb-2">
          <motion.button whileTap={{ scale:0.97 }} onClick={()=>go("auth")}
            className="w-full flex items-center justify-center gap-2.5 py-4 rounded-[22px] border-2 cursor-pointer font-bold text-[15px]"
            style={{ borderColor:"#EF4444", color:"#EF4444" }}>
            <LogOut size={17} />
            <span>Logout</span>
          </motion.button>
        </div>

        {/* Avatar Bottom Sheet Selector */}
        <AnimatePresence>
          {showAvatarSelector && (
            <div className="absolute inset-0 z-50 bg-black/60 flex flex-col justify-end">
              <div className="absolute inset-0 z-0" onClick={() => setShowAvatarSelector(false)} />
              
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="rounded-t-[32px] p-6 max-h-[90%] flex flex-col shadow-2xl relative z-10"
                style={{ background: t.card }}
              >
                <div className="w-12 h-1.5 rounded-full mx-auto mb-5 opacity-25" style={{ background: t.text }} />

                <div className="flex items-center justify-between pb-4 border-b mb-5" style={{ borderColor: t.border }}>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider" style={{ color: B.orange }}>CHOOSE AVATAR</p>
                    <h3 className="text-[18px] font-black" style={{ color: t.text, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Profile Identity</h3>
                  </div>
                  <button
                    onClick={() => setShowAvatarSelector(false)}
                    className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer border"
                    style={{ background: t.surface, borderColor: t.border }}
                  >
                    <Plus size={15} color={t.text} className="rotate-45" />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3 pb-8">
                  {avatarPresets.map(preset => {
                    const active = user?.avatar === preset.char;
                    return (
                      <motion.button
                        key={preset.name}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setUser({ ...user, avatar: preset.char });
                          setShowAvatarSelector(false);
                          setToastMessage(`Profile photo updated to ${preset.name}! ✨`);
                          setTimeout(() => setToastMessage(""), 2000);
                        }}
                        className="p-3.5 rounded-[20px] flex flex-col items-center justify-center gap-2 border border-dashed cursor-pointer text-center"
                        style={{
                          borderColor: active ? B.orange : t.border,
                          background: active ? B.orangeL : t.surface,
                        }}
                      >
                        <span className="text-[28px]">{preset.char}</span>
                        <span className="text-[10px] font-bold leading-tight" style={{ color: active ? B.orange : t.muted }}>{preset.name}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </WithNav>
  );
}

// ─── SUB-SCREENS ─────────────────────────────────────────────────────────────

function Notifications({ back, t }: { back:()=>void; t:T }) {
  const items = [
    {I:Bike,col:B.green,bg:B.greenL,title:"Lunch is out for delivery!",sub:"Arjun is 2.4 km away · ETA 2 min",time:"12:10 PM"},
    {I:CreditCard,col:"#6366F1",bg:"#EDE9FE",title:"Payment successful",sub:"₹4,298 debited for July plan",time:"7 Jul"},
    {I:Tag,col:B.orange,bg:B.orangeL,title:"New offer: WELCOME50",sub:"₹50 off your next payment",time:"5 Jul"},
    {I:Package,col:"#F59E0B",bg:"#FEF3C7",title:"Subscription renews in 7 days",sub:"Monthly plan · 8 Aug 2026 · ₹3,999",time:"4 Jul"},
    {I:Star,col:"#EC4899",bg:"#FCE7F3",title:"Rate yesterday's meal",sub:"How was Dal Tadka + Rice?",time:"3 Jul"},
    {I:Gift,col:"#8B5CF6",bg:"#F5F3FF",title:"Referral bonus credited!",sub:"₹100 added · Priya subscribed",time:"1 Jul"},
    {I:AlertCircle,col:"#F59E0B",bg:"#FEF3C7",title:"Delivery delayed slightly",sub:"Dinner is 15 min late. We apologise!",time:"30 Jun"},
  ];
  return (
    <div style={{ flex:1, minHeight:0, display:"flex", flexDirection:"column", background:t.bg }}>
      <BackBar title="Notifications" onBack={back} t={t} />
      <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-3 pb-6 min-h-0" style={{ scrollbarWidth:"none" }}>
        {items.map((n,i)=>(
          <motion.div key={i} whileTap={{ scale:0.99 }}
            initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.06 }}
            className="flex items-start gap-3 p-4 rounded-[22px]"
            style={{ background:t.card, boxShadow:"0 1px 12px rgba(0,0,0,0.05)" }}>
            <div className="w-11 h-11 rounded-[16px] flex items-center justify-center flex-shrink-0" style={{ background:n.bg }}>
              <n.I size={19} color={n.col} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-bold mb-0.5" style={{ color:t.text }}>{n.title}</p>
              <p className="text-[12px] leading-snug" style={{ color:t.muted }}>{n.sub}</p>
            </div>
            <p className="text-[10px] flex-shrink-0 font-semibold mt-0.5" style={{ color:t.muted }}>{n.time}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Tracking({ back, t }: { back:()=>void; t:T }) {
  const steps = [{l:"Prepared",sub:"12:00 PM",d:true},{l:"Picked Up",sub:"12:15 PM",d:true},{l:"On the Way",sub:"12:20 PM",a:true},{l:"Arriving",sub:"ETA 12:28",d:false},{l:"Delivered",sub:"~12:30 PM",d:false}];
  return (
    <div style={{ flex:1, minHeight:0, display:"flex", flexDirection:"column", background:t.bg }}>
      <BackBar title="Live Tracking" onBack={back} t={t} />
      {/* Map */}
      <div className="mx-5 rounded-[24px] overflow-hidden mb-4 relative" style={{ height:190, background:t.surface, flexShrink:0 }}>
        <svg className="absolute inset-0 w-full h-full opacity-15">
          {[[0,95,300,95],[0,145,300,145],[0,52,300,52],[63,0,63,190],[150,0,150,190],[237,0,237,190]].map(([x1,y1,x2,y2],i)=>(
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={t.muted} strokeWidth="1" />
          ))}
        </svg>
        {/* Route line */}
        <svg className="absolute inset-0 w-full h-full">
          <motion.path d="M130 92 Q180 70 255 120" stroke={B.orange} strokeWidth="2" strokeDasharray="5 4" fill="none" opacity="0.6"
            initial={{ pathLength:0 }} animate={{ pathLength:1 }} transition={{ duration:1.5, delay:0.5, ease:"easeOut" }} />
        </svg>
        {/* Delivery partner */}
        <motion.div style={{ position:"absolute", width:44, height:44, background:B.orange, borderRadius:14, boxShadow:`0 6px 24px ${B.orange}60`, left:120, top:68, display:"flex", alignItems:"center", justifyContent:"center", zIndex:5 }}
          animate={{ y:[-2,2,-2] }} transition={{ duration:2, repeat:Infinity, ease:"easeInOut" }}>
          <Bike size={20} color="white" />
        </motion.div>
        {/* Home */}
        <div style={{ position:"absolute", width:38, height:38, background:B.green, borderRadius:12, boxShadow:`0 4px 20px ${B.green}50`, right:36, bottom:28, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <Home size={16} color="white" />
        </div>
        <div className="absolute top-3.5 left-3.5 flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background:t.bg, boxShadow:"0 2px 8px rgba(0,0,0,0.1)" }}>
          <PulsingDot color="#EF4444" size={8} />
          <span className="text-[11px] font-bold" style={{ color:t.text }}>LIVE</span>
        </div>
      </div>
      <div className="px-5 flex flex-col gap-4 flex-1 overflow-y-auto pb-6 min-h-0" style={{ scrollbarWidth:"none" }}>
        <Card t={t} p="p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[15px] font-black" style={{ color:t.text }}>Arjun Kumar</p>
            <div className="flex gap-2">
              <motion.button whileTap={{ scale:0.9 }} className="w-10 h-10 rounded-[14px] flex items-center justify-center" style={{ background:B.greenL }}><PhoneCall size={16} color={B.green} /></motion.button>
              <motion.button whileTap={{ scale:0.9 }} className="w-10 h-10 rounded-[14px] flex items-center justify-center" style={{ background:B.orangeL }}><MessageCircle size={16} color={B.orange} /></motion.button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-[16px] font-black text-white text-xl flex items-center justify-center" style={{ background:"#374151" }}>A</div>
            <div>
              <Stars val={4} />
              <p className="text-[11px] mt-1" style={{ color:t.muted }}>4.8 ★ · 340+ deliveries</p>
              <p className="text-[11px] font-bold" style={{ color:B.orange }}>2.4 km away · ETA ~2 min</p>
            </div>
          </div>
        </Card>
        <Card t={t} p="p-5">
          <p className="text-[11px] font-black uppercase tracking-[0.12em] mb-5" style={{ color:t.muted }}>Order Status</p>
          {steps.map((s,i)=>(
            <motion.div key={s.l} className="flex items-start gap-4 mb-3"
              initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.08 }}>
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background:s.d?B.green:(s as any).a?B.orange:t.surface }}>
                  {s.d?<Check size={13} color="white" strokeWidth={3}/>:(s as any).a?<PulsingDot color="white" size={9}/>:null}
                </div>
                {i<steps.length-1&&<div className="w-0.5 h-5 mt-1" style={{ background:s.d?B.green:t.border }} />}
              </div>
              <div className="pt-0.5">
                <p className="text-[13px] font-bold" style={{ color:s.d?B.green:(s as any).a?B.orange:t.muted }}>{s.l}</p>
                <p className="text-[11px]" style={{ color:t.muted }}>{s.sub}</p>
              </div>
            </motion.div>
          ))}
        </Card>
      </div>
    </div>
  );
}

function Offers({ back, t }: { back:()=>void; t:T }) {
  const list = [
    {code:"WELCOME50",title:"Welcome Offer",val:"₹50 OFF",desc:"₹50 off your next payment",col:B.orange,bg:B.orangeL,exp:"31 Jul 2026"},
    {code:"SAVE20",title:"Monthly Saver",val:"20% OFF",desc:"20% off this month",col:"#6366F1",bg:"#EDE9FE",exp:"31 Jul 2026"},
    {code:"REFER100",title:"Referral Bonus",val:"₹100",desc:"₹100 per friend who subscribes",col:B.green,bg:B.greenL,exp:"No expiry"},
    {code:"FIRST100",title:"First Week",val:"₹100 OFF",desc:"₹100 off your first week",col:"#EC4899",bg:"#FCE7F3",exp:"14 Jul 2026"},
    {code:"GREENDAY",title:"Eco Discount",val:"₹50 OFF",desc:"Plant a tree, save ₹50",col:"#14B8A6",bg:"#CCFBF1",exp:"20 Jul 2026"},
  ];
  return (
    <div style={{ flex:1, minHeight:0, display:"flex", flexDirection:"column", background:t.bg }}>
      <BackBar title="Offers & Coupons" onBack={back} t={t} />
      <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-4 pb-6 min-h-0" style={{ scrollbarWidth:"none" }}>
        {list.map((o,i)=>(
          <motion.div key={o.code} className="p-5 rounded-[24px] border" style={{ background:o.bg, borderColor:o.col+"28" }}
            initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.07 }}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.15em] opacity-60 mb-0.5" style={{ color:o.col }}>{o.title}</p>
                <p className="text-[26px] font-black leading-none" style={{ color:o.col, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{o.val}</p>
              </div>
              <div className="px-3 py-2 rounded-[14px] border-2 border-dashed" style={{ borderColor:o.col }}>
                <p className="text-[12px] font-black" style={{ color:o.col }}>{o.code}</p>
              </div>
            </div>
            <p className="text-[13px] mb-3" style={{ color:o.col+"BB" }}>{o.desc}</p>
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold" style={{ color:o.col+"80" }}>Expires: {o.exp}</p>
              <motion.button whileTap={{ scale:0.95 }} className="px-5 py-2 rounded-[14px] text-[12px] font-black text-white" style={{ background:o.col }}>Apply</motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Rewards({ back, t }: { back:()=>void; t:T }) {
  const pts = 1250;
  const tiers = [{n:"Bronze",max:500,col:"#CD7F32"},{n:"Silver",max:1000,col:"#9CA3AF"},{n:"Gold",max:2000,col:"#F59E0B"},{n:"Platinum",max:5000,col:"#6366F1"}];
  return (
    <div style={{ flex:1, minHeight:0, display:"flex", flexDirection:"column", background:t.bg }}>
      <BackBar title="Rewards" onBack={back} t={t} />
      <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-4 pb-6 min-h-0" style={{ scrollbarWidth:"none" }}>
        {/* Points hero */}
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.05 }}
          className="p-6 rounded-[28px] text-center relative overflow-hidden"
          style={{ background:"linear-gradient(135deg,#F59E0B 0%,#D97706 100%)", boxShadow:"0 10px 48px rgba(245,158,11,0.35)" }}>
          <OrgBlob x={-20} y={-20} size={160} color="#FCD34D" opacity={0.25} blur={30} />
          <OrgBlob x="60%" y="40%" size={120} color="#92400E" opacity={0.2} blur={25} />
          <div className="flex justify-center mb-3">
            <FloatIll><div className="w-28 h-24"><IllRewards /></div></FloatIll>
          </div>
          <motion.p className="text-[52px] font-black text-white leading-none mb-1" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3 }}>
            {pts.toLocaleString()}
          </motion.p>
          <p className="text-[14px] text-white opacity-75 mb-4">Gold Member · 750 pts to Platinum</p>
          <div className="flex gap-1 mb-1.5">
            {tiers.map(ti=>(
              <div key={ti.n} className="flex-1 h-2 rounded-full" style={{ background:pts>=ti.max?"rgba(255,255,255,0.4)":"white", opacity:pts>=ti.max?0.4:0.9 }} />
            ))}
          </div>
        </motion.div>

        <FadeUp delay={0.1}>
          <Card t={t} p="p-5">
            <p className="text-[11px] font-black uppercase tracking-[0.12em] mb-4" style={{ color:t.muted }}>How to Earn</p>
            {[{label:"Daily meal delivered",pts:"+5 pts",I:UtensilsCrossed,col:B.orange},{label:"Refer a friend",pts:"+100 pts",I:Gift,col:"#8B5CF6"},{label:"Rate a meal",pts:"+2 pts",I:Star,col:"#F59E0B"},{label:"Monthly subscription",pts:"+50 pts",I:Package,col:B.green}].map((r,i,a)=>(
              <div key={r.label} className="flex items-center gap-3.5 py-3.5" style={{ borderBottom:i<a.length-1?`1px solid ${t.border}`:"none" }}>
                <div className="w-10 h-10 rounded-[14px] flex items-center justify-center" style={{ background:t.surface }}><r.I size={16} color={r.col} /></div>
                <p className="flex-1 text-[13px] font-semibold" style={{ color:t.text }}>{r.label}</p>
                <span className="text-[12px] font-black px-2.5 py-1 rounded-full" style={{ background:B.greenL, color:"#15803D" }}>{r.pts}</span>
              </div>
            ))}
          </Card>
        </FadeUp>

        <FadeUp delay={0.15}>
          <Card t={t} p="p-5">
            <p className="text-[11px] font-black uppercase tracking-[0.12em] mb-4" style={{ color:t.muted }}>Points History</p>
            {[{label:"Meal delivered",pts:"+5",date:"Today"},{label:"Meal delivered",pts:"+5",date:"Yesterday"},{label:"Referral — Priya J.",pts:"+100",date:"5 Jul"},{label:"Meal rated",pts:"+2",date:"4 Jul"},{label:"Monthly subscription",pts:"+50",date:"7 Jun"}].map((h,i,a)=>(
              <div key={i} className="flex justify-between py-2.5" style={{ borderBottom:i<a.length-1?`1px solid ${t.border}`:"none" }}>
                <div>
                  <p className="text-[13px] font-semibold" style={{ color:t.text }}>{h.label}</p>
                  <p className="text-[11px]" style={{ color:t.muted }}>{h.date}</p>
                </div>
                <span className="text-[14px] font-black" style={{ color:B.green }}>{h.pts}</span>
              </div>
            ))}
          </Card>
        </FadeUp>
      </div>
    </div>
  );
}

function Appearance({ back, t, theme, setTheme }: { back:()=>void; t:T; theme:AppTheme; setTheme:(v:AppTheme)=>void }) {
  const [nf, setNf] = useState<Record<string,boolean>>({delivery:true,payment:true,offers:false,sub:true});
  return (
    <div style={{ flex:1, minHeight:0, display:"flex", flexDirection:"column", background:t.bg }}>
      <BackBar title="Appearance" onBack={back} t={t} />
      <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-4 pb-6 min-h-0" style={{ scrollbarWidth:"none" }}>
        <FadeUp delay={0.05}>
          <Card t={t} p="p-5">
            <p className="text-[11px] font-black uppercase tracking-[0.12em] mb-4" style={{ color:t.muted }}>Theme</p>
            {([["light","Light Mode",Sun,"#F59E0B"],["dark","Dark Mode",Moon,"#6366F1"],["system","System Default",Monitor,"#6B7280"]] as const).map(([val,label,Icon,col])=>(
              <motion.button key={val} whileTap={{ scale:0.98 }} onClick={()=>setTheme(val)}
                className="w-full flex items-center gap-4 p-4 rounded-[20px] mb-2.5 border-2"
                style={{ borderColor:theme===val?B.orange:t.border, background:theme===val?B.orangeL:t.surface }}>
                <div className="w-10 h-10 rounded-[14px] flex items-center justify-center" style={{ background:col+"22" }}>
                  <Icon size={19} color={col} />
                </div>
                <p className="flex-1 text-[15px] font-bold text-left" style={{ color:t.text }}>{label}</p>
                <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center" style={{ borderColor:theme===val?B.orange:t.border }}>
                  {theme===val&&<motion.div initial={{ scale:0 }} animate={{ scale:1 }} className="w-2.5 h-2.5 rounded-full" style={{ background:B.orange }} />}
                </div>
              </motion.button>
            ))}
          </Card>
        </FadeUp>
        <FadeUp delay={0.1}>
          <Card t={t} p="p-5">
            <p className="text-[11px] font-black uppercase tracking-[0.12em] mb-3" style={{ color:t.muted }}>Notifications</p>
            {[["delivery","Delivery Updates"],["payment","Payment Alerts"],["offers","Offers & Promotions"],["sub","Subscription Alerts"]].map(([k,l])=>(
              <div key={k} className="flex items-center justify-between py-3.5" style={{ borderBottom:`1px solid ${t.border}` }}>
                <p className="text-[14px] font-semibold" style={{ color:t.text }}>{l}</p>
                <button onClick={()=>setNf(n=>({...n,[k]:!n[k]}))}>
                  <div className="w-11 h-6 rounded-full flex items-center px-0.5" style={{ background:nf[k]?B.orange:t.border }}>
                    <motion.div animate={{ x:nf[k]?20:0 }} transition={{ type:"spring", stiffness:500, damping:35 }}
                      className="w-5 h-5 rounded-full bg-white shadow" />
                  </div>
                </button>
              </div>
            ))}
          </Card>
        </FadeUp>
        <FadeUp delay={0.14}>
          <Card t={t} p="p-5">
            <p className="text-[11px] font-black uppercase tracking-[0.12em] mb-3" style={{ color:t.muted }}>Language</p>
            <div className="flex items-center justify-between py-3 px-4 rounded-[16px]" style={{ background:t.surface }}>
              <div className="flex items-center gap-3"><Globe size={16} color={t.muted} /><p className="text-[14px] font-semibold" style={{ color:t.text }}>English</p></div>
              <ChevronDown size={16} color={t.muted} />
            </div>
          </Card>
        </FadeUp>
      </div>
    </div>
  );
}

function Support({ back, t }: { back:()=>void; t:T }) {
  return (
    <div style={{ flex:1, minHeight:0, display:"flex", flexDirection:"column", background:t.bg }}>
      <BackBar title="Support" onBack={back} t={t} />
      <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-4 pb-6 min-h-0" style={{ scrollbarWidth:"none" }}>
        <FadeUp delay={0.05}>
          <div className="flex justify-center py-4">
            <FloatIll><div className="w-44 h-36"><IllSupport /></div></FloatIll>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="grid grid-cols-2 gap-3">
            {[{I:MessageCircle,label:"Chat",sub:"Avg. 2 min reply",col:B.green,bg:B.greenL},{I:PhoneCall,label:"Call",sub:"Mon–Sat 9–6 PM",col:"#3B82F6",bg:"#EFF6FF"},{I:FileText,label:"Raise Ticket",sub:"Track issues",col:B.orange,bg:B.orangeL},{I:HelpCircle,label:"FAQs",sub:"Quick answers",col:"#8B5CF6",bg:"#F5F3FF"}].map(s=>(
              <motion.button key={s.label} whileTap={{ scale:0.95 }} className="flex flex-col items-start p-5 rounded-[24px]" style={{ background:s.bg }}>
                <div className="w-12 h-12 rounded-[18px] flex items-center justify-center mb-3" style={{ background:s.col+"22" }}>
                  <s.I size={22} color={s.col} />
                </div>
                <p className="text-[14px] font-black mb-0.5" style={{ color:s.col }}>{s.label}</p>
                <p className="text-[11px]" style={{ color:s.col+"99" }}>{s.sub}</p>
              </motion.button>
            ))}
          </div>
        </FadeUp>
        <FadeUp delay={0.14}>
          <Card t={t} p="p-5">
            <div className="flex flex-col items-center py-4 mb-2">
              <CheckCircle2 size={36} color={B.green} />
              <p className="text-[14px] font-bold mt-2" style={{ color:t.text }}>No open tickets</p>
              <p className="text-[12px]" style={{ color:t.muted }}>All issues resolved ✓</p>
            </div>
          </Card>
        </FadeUp>
        <FadeUp delay={0.18}>
          <Card t={t} p="p-5">
            <p className="text-[11px] font-black uppercase tracking-[0.12em] mb-4" style={{ color:t.muted }}>Top FAQs</p>
            {["How do I pause my subscription?","Can I change my delivery address?","How is the dabba deposit refunded?","What if I miss a delivery?","Can I switch from veg to non-veg?"].map((q,i,a)=>(
              <div key={i} className="flex items-center gap-3 py-3.5" style={{ borderBottom:i<a.length-1?`1px solid ${t.border}`:"none" }}>
                <p className="flex-1 text-[13px] font-semibold" style={{ color:t.sub }}>{q}</p>
                <ChevronRight size={15} color={t.muted} />
              </div>
            ))}
          </Card>
        </FadeUp>
      </div>
    </div>
  );
}

function Addresses({ back, t }: { back:()=>void; t:T }) {
  const isDark = t.bg === "#0E0E0E";
  const orangeLight = isDark ? "rgba(230, 126, 34, 0.15)" : B.orangeL;
  const greenLight = isDark ? "rgba(34, 197, 94, 0.15)" : B.greenL;
  const greenText = isDark ? B.green : "#15803D";

  return (
    <div style={{ flex:1, minHeight:0, display:"flex", flexDirection:"column", background:t.bg }}>
      <BackBar title="Saved Addresses" onBack={back} t={t}
        right={<motion.button whileTap={{ scale:0.9 }} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background:orangeLight }}><Plus size={17} color={B.orange} /></motion.button>} />
      <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-3 pb-6 min-h-0" style={{ scrollbarWidth:"none" }}>
        {[{type:"Home",I:Home,addr:"B-204, Sunrise Apartments",area:"MG Road, Indiranagar, Bengaluru 560038",def:true},{type:"Work",I:Building2,addr:"3rd Floor, TechPark Tower",area:"ORR, Marathahalli, Bengaluru 560037",def:false}].map((a,i)=>(
          <motion.div key={a.type} initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.08 }}>
            <Card t={t} p="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-[12px] flex items-center justify-center" style={{ background:orangeLight }}>
                    <a.I size={16} color={B.orange} />
                  </div>
                  <p className="text-[15px] font-black" style={{ color:t.text }}>{a.type}</p>
                  {a.def&&<span className="text-[9px] font-black px-2 py-0.5 rounded-full" style={{ background:greenLight, color:greenText }}>DEFAULT</span>}
                </div>
                <motion.button whileTap={{ scale:0.9 }} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background:t.surface }}>
                  <Edit size={14} color={t.muted} />
                </motion.button>
              </div>
              <p className="text-[14px] font-semibold" style={{ color:t.text }}>{a.addr}</p>
              <p className="text-[12px] mt-0.5" style={{ color:t.muted }}>{a.area}</p>
            </Card>
          </motion.div>
        ))}
        <OrangeBtn label="Add New Address" icon={<Plus size={15} />} />
      </div>
    </div>
  );
}

function Payments({ back, t }: { back:()=>void; t:T }) {
  const isDark = t.bg === "#0E0E0E";
  const orangeLight = isDark ? "rgba(230, 126, 34, 0.15)" : B.orangeL;
  const greenLight = isDark ? "rgba(34, 197, 94, 0.15)" : B.greenL;
  const greenText = isDark ? B.green : "#15803D";

  return (
    <div style={{ flex:1, minHeight:0, display:"flex", flexDirection:"column", background:t.bg }}>
      <BackBar title="Payment Methods" onBack={back} t={t}
        right={<motion.button whileTap={{ scale:0.9 }} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background:orangeLight }}><Plus size={17} color={B.orange} /></motion.button>} />
      <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-3 pb-6 min-h-0" style={{ scrollbarWidth:"none" }}>
        {[{type:"UPI",label:"GPay — riya@okaxis",I:Zap,col:"#4285F4",def:true},{type:"Card",label:"HDFC Regalia •••• 4521",I:CreditCard,col:"#6366F1",def:false},{type:"Wallet",label:"Paytm Wallet",I:Wallet,col:"#00BAF2",def:false}].map((p,i)=>(
          <motion.div key={p.type} initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.07 }}>
            <Card t={t} p="p-5">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-[16px] flex items-center justify-center" style={{ background:p.col+"18" }}>
                  <p.I size={20} color={p.col} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-[14px] font-bold" style={{ color:t.text }}>{p.label}</p>
                    {p.def&&<span className="text-[9px] font-black px-2 py-0.5 rounded-full" style={{ background:greenLight, color:greenText }}>DEFAULT</span>}
                  </div>
                  <p className="text-[11px]" style={{ color:t.muted }}>{p.type}</p>
                </div>
                <motion.button whileTap={{ scale:0.9 }} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background:t.surface }}>
                  <Edit size={14} color={t.muted} />
                </motion.button>
              </div>
            </Card>
          </motion.div>
        ))}
        <OrangeBtn label="Add Payment Method" icon={<Plus size={15} />} />
      </div>
    </div>
  );
}

function Personal({ back, t, user, setUser }: { back:()=>void; t:T; user:any; setUser:(u:any)=>void }) {
  const [focused, setFocused] = useState("");
  const [name, setName] = useState(user?.name || "Riya Sharma");
  const [phone, setPhone] = useState(user?.phone || "+91 98765 43210");
  const [email, setEmail] = useState(user?.email || "riya@email.com");
  const [gender, setGender] = useState(user?.gender || "Female");
  const [showToast, setShowToast] = useState(false);

  const handleSave = () => {
    setUser({ ...user, name, phone, email, gender });
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      back();
    }, 1500);
  };

  return (
    <div style={{ flex:1, minHeight:0, display:"flex", flexDirection:"column", background:t.bg }}>
      <BackBar title="Personal Information" onBack={back} t={t} />
      <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-4 pb-6 min-h-0 relative" style={{ scrollbarWidth:"none" }}>
        {/* Toast Notification */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity:0, y:-10, scale:0.9 }}
              animate={{ opacity:1, y:0, scale:1 }}
              exit={{ opacity:0, y:-10, scale:0.9 }}
              className="absolute top-4 left-4 right-4 z-50 p-4 rounded-xl shadow-lg flex items-center gap-3 text-white text-[13px] font-bold"
              style={{ background:B.green }}
            >
              <CheckCircle2 size={16} color="white" />
              <span>Personal details updated successfully!</span>
            </motion.div>
          )}
        </AnimatePresence>

        <FadeUp delay={0.05}>
          <div className="flex flex-col items-center py-5">
            <motion.div whileTap={{ scale:0.94 }}
              className="rounded-[28px] font-black text-white text-3xl flex items-center justify-center mb-3 relative cursor-pointer"
              style={{ width:88, height:88, background:B.orange, boxShadow:`0 12px 40px ${B.orange}45` }}>
              {user?.avatar || name[0]}
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center border-2" style={{ background:t.card, borderColor:t.bg }}>
                <Edit size={13} color={B.orange} />
              </div>
            </motion.div>
            <p className="text-[13px] font-bold animate-pulse" style={{ color:B.orange }}>Use Profile page to choose avatar preset</p>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="mb-4">
            <label className="text-[11px] font-black uppercase tracking-[0.1em] block mb-1.5"
              style={{ color:focused==="name"?B.orange:t.muted }}>Full Name</label>
            <input value={name} onChange={e=>setName(e.target.value)} onFocus={()=>setFocused("name")} onBlur={()=>setFocused("")}
              className="w-full py-4 px-5 rounded-[18px] text-[15px] outline-none border"
              style={{ background:t.input, color:t.text, fontFamily:"'Inter',sans-serif", borderColor:focused==="name"?B.orange:t.border }} />
          </div>

          <div className="mb-4">
            <label className="text-[11px] font-black uppercase tracking-[0.1em] block mb-1.5"
              style={{ color:focused==="phone"?B.orange:t.muted }}>Phone</label>
            <input value={phone} onChange={e=>setPhone(e.target.value)} onFocus={()=>setFocused("phone")} onBlur={()=>setFocused("")}
              className="w-full py-4 px-5 rounded-[18px] text-[15px] outline-none border"
              style={{ background:t.input, color:t.text, fontFamily:"'Inter',sans-serif", borderColor:focused==="phone"?B.orange:t.border }} />
          </div>

          <div className="mb-4">
            <label className="text-[11px] font-black uppercase tracking-[0.1em] block mb-1.5"
              style={{ color:focused==="email"?B.orange:t.muted }}>Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} onFocus={()=>setFocused("email")} onBlur={()=>setFocused("")}
              className="w-full py-4 px-5 rounded-[18px] text-[15px] outline-none border"
              style={{ background:t.input, color:t.text, fontFamily:"'Inter',sans-serif", borderColor:focused==="email"?B.orange:t.border }} />
          </div>

          <div className="mb-5">
            <label className="text-[11px] font-black uppercase tracking-[0.1em] block mb-2" style={{ color:t.muted }}>Gender</label>
            <div className="grid grid-cols-3 gap-2.5">
              {["Male", "Female", "Other"].map(g => {
                const active = gender === g;
                return (
                  <button
                    key={g}
                    onClick={() => setGender(g)}
                    className="py-3.5 rounded-[16px] text-[13px] font-bold border transition-all cursor-pointer"
                    style={{
                      background: active ? B.orangeL : t.card,
                      borderColor: active ? B.orange : t.border,
                      color: active ? B.orange : t.sub
                    }}
                  >
                    {g}
                  </button>
                );
              })}
            </div>
          </div>
          <OrangeBtn label="Save Changes" onClick={handleSave} />
        </FadeUp>
      </div>
    </div>
  );
}

function HealthInfoScreen({ back, t, user, setUser }: { back:()=>void; t:T; user:any; setUser:(u:any)=>void }) {
  const isDark = t.bg === "#0E0E0E";
  const activeBg = isDark ? "rgba(230, 126, 34, 0.15)" : B.orangeL;
  const activeSpiceBg = isDark ? "rgba(239, 68, 68, 0.15)" : "#FEF2F2";

  const [goal, setGoal] = useState(user?.healthGoal || "Healthy Lifestyle");
  const [activity, setActivity] = useState(user?.activityLevel || "Moderately Active");
  const [calories, setCalories] = useState(user?.targetCalories || 2100);
  const [allergies, setAllergies] = useState(user?.allergies || "");
  const [spice, setSpice] = useState(user?.spiceLevel || "🌶🌶 Medium Spicy");
  const [showToast, setShowToast] = useState(false);

  const goals = ["Weight Loss", "Weight Gain", "Muscle Gain", "Maintain Weight", "Healthy Lifestyle"];
  const activityLevels = ["Sedentary", "Lightly Active", "Moderately Active", "Very Active"];
  const spiceLevels = ["🌶 Mild", "🌶🌶 Medium Spicy", "🌶🌶🌶 Spicy", "🔥 Extra Hot"];

  const handleSave = () => {
    setUser({
      ...user,
      healthGoal: goal,
      activityLevel: activity,
      targetCalories: calories,
      allergies,
      spiceLevel: spice,
    });
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      back();
    }, 1500);
  };

  return (
    <div style={{ flex:1, minHeight:0, display:"flex", flexDirection:"column", background:t.bg }}>
      <BackBar title="Health & Nutrition" onBack={back} t={t} />
      <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-4 pb-6 min-h-0 relative" style={{ scrollbarWidth:"none" }}>
        {/* Toast Notification */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity:0, y:-10, scale:0.9 }}
              animate={{ opacity:1, y:0, scale:1 }}
              exit={{ opacity:0, y:-10, scale:0.9 }}
              className="absolute top-4 left-4 right-4 z-50 p-4 rounded-xl shadow-lg flex items-center gap-3 text-white text-[13px] font-bold"
              style={{ background:B.green }}
            >
              <CheckCircle2 size={16} color="white" />
              <span>Health profile updated successfully!</span>
            </motion.div>
          )}
        </AnimatePresence>

        <FadeUp delay={0.05}>
          <div className="p-4 rounded-[22px] flex items-center gap-4 mb-1 border" style={{ background: t.card, borderColor: t.border }}>
            <div className="w-11 h-11 rounded-full flex items-center justify-center bg-green-500/10">
              <Heart size={20} color={B.green} />
            </div>
            <div>
              <p className="text-[15px] font-black" style={{ color: t.text }}>Active Nutrition Profile</p>
              <p className="text-[12px]" style={{ color: t.muted }}>Dabbas will be adjusted to your goals.</p>
            </div>
          </div>
        </FadeUp>

        {/* Calories Counter */}
        <FadeUp delay={0.1}>
          <div className="p-5 rounded-[22px]" style={{ background: t.card, border: `1.5px solid ${t.border}` }}>
            <p className="text-[11px] font-black uppercase tracking-[0.12em] mb-1.5 text-center" style={{ color: t.muted }}>Target Daily Calories</p>
            <div className="flex items-center justify-between mt-3">
              <button
                onClick={() => setCalories(c => Math.max(1200, c - 100))}
                className="w-12 h-12 rounded-full border flex items-center justify-center font-bold text-lg hover:bg-orange-500/10 transition-colors cursor-pointer"
                style={{ borderColor: B.orange, color: B.orange }}
              >
                −
              </button>
              <div className="text-center">
                <span className="text-[32px] font-black" style={{ color: t.text, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{calories}</span>
                <span className="text-[12px] font-bold block" style={{ color: t.muted }}>KCAL / DAY</span>
              </div>
              <button
                onClick={() => setCalories(c => Math.min(4500, c + 100))}
                className="w-12 h-12 rounded-full border flex items-center justify-center font-bold text-lg hover:bg-orange-500/10 transition-colors cursor-pointer"
                style={{ borderColor: B.orange, color: B.orange }}
              >
                +
              </button>
            </div>
          </div>
        </FadeUp>

        {/* Health Goals list */}
        <FadeUp delay={0.15}>
          <div className="mb-1">
            <label className="text-[11px] font-black uppercase tracking-[0.1em] block mb-2" style={{ color: t.muted }}>Fitness Goal</label>
            <div className="flex flex-col gap-2">
              {goals.map(g => {
                const active = goal === g;
                return (
                  <button
                    key={g}
                    onClick={() => setGoal(g)}
                    className="p-3.5 rounded-[16px] text-left text-[14px] font-bold border flex items-center justify-between cursor-pointer"
                    style={{
                      borderColor: active ? B.orange : t.border,
                      background: active ? activeBg : t.card,
                      color: active ? B.orange : t.text,
                    }}
                  >
                    <span>{g}</span>
                    {active && <Check size={14} color={B.orange} />}
                  </button>
                );
              })}
            </div>
          </div>
        </FadeUp>

        {/* Activity Level selection */}
        <FadeUp delay={0.2}>
          <div className="mb-1">
            <label className="text-[11px] font-black uppercase tracking-[0.1em] block mb-2" style={{ color: t.muted }}>Activity Level</label>
            <div className="flex flex-col gap-2">
              {activityLevels.map(act => {
                const active = activity === act;
                return (
                  <button
                    key={act}
                    onClick={() => setActivity(act)}
                    className="p-3.5 rounded-[16px] text-left text-[14px] font-bold border flex items-center justify-between cursor-pointer"
                    style={{
                      borderColor: active ? B.orange : t.border,
                      background: active ? activeBg : t.card,
                      color: active ? B.orange : t.text,
                    }}
                  >
                    <span>{act}</span>
                    {active && <Check size={14} color={B.orange} />}
                  </button>
                );
              })}
            </div>
          </div>
        </FadeUp>

        {/* Spice Level selection */}
        <FadeUp delay={0.25}>
          <div className="mb-1">
            <label className="text-[11px] font-black uppercase tracking-[0.1em] block mb-2" style={{ color: t.muted }}>Spice Level Preference</label>
            <div className="grid grid-cols-2 gap-2.5">
              {spiceLevels.map(sp => {
                const active = spice === sp;
                return (
                  <button
                    key={sp}
                    onClick={() => setSpice(sp)}
                    className="py-3 px-4 rounded-[16px] text-[13px] font-bold border transition-all text-center flex items-center justify-center cursor-pointer"
                    style={{
                      borderColor: active ? "#EF4444" : t.border,
                      background: active ? activeSpiceBg : t.card,
                      color: active ? "#EF4444" : t.sub
                    }}
                  >
                    {sp}
                  </button>
                );
              })}
            </div>
          </div>
        </FadeUp>

        {/* Allergies input */}
        <FadeUp delay={0.3}>
          <div className="mb-4">
            <label className="text-[11px] font-black uppercase tracking-[0.1em] block mb-1.5" style={{ color: t.muted }}>Allergies / Restrictions</label>
            <input
              value={allergies}
              onChange={e => setAllergies(e.target.value)}
              placeholder="e.g. Peanuts, Gluten, Dairy"
              className="w-full py-4 px-5 rounded-[18px] text-[15px] outline-none border"
              style={{ background: t.input, color: t.text, fontFamily:"'Inter',sans-serif", borderColor: t.border }}
            />
          </div>
        </FadeUp>

        <OrangeBtn label="Save Health Profile" onClick={handleSave} />
      </div>
    </div>
  );
}

function Refer({ back, t }: { back:()=>void; t:T }) {
  return (
    <div style={{ flex:1, minHeight:0, display:"flex", flexDirection:"column", background:t.bg }}>
      <BackBar title="Refer & Earn" onBack={back} t={t} />
      <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-4 pb-6 min-h-0" style={{ scrollbarWidth:"none" }}>
        <FadeUp delay={0.05}>
          <div className="p-6 rounded-[28px] text-center relative overflow-hidden"
            style={{ background:"linear-gradient(135deg,#FFF7ED 0%,#FEF3C7 100%)", border:`1.5px solid ${B.orangeM}` }}>
            <OrgBlob x={-30} y={-20} size={160} color={B.orange} opacity={0.1} blur={30} />
            <div className="flex justify-center mb-4">
              <FloatIll>
                <div className="w-16 h-16 rounded-[22px] flex items-center justify-center" style={{ background:B.orange, boxShadow:`0 8px 28px ${B.orange}45` }}>
                  <Gift size={30} color="white" />
                </div>
              </FloatIll>
            </div>
            <h2 className="text-[22px] font-black mb-2 relative z-10" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", color:"#111827" }}>Invite & Earn ₹100</h2>
            <p className="text-[14px] mb-5 relative z-10" style={{ color:"#6B7280" }}>For every friend who subscribes, you both get ₹100 instantly.</p>
            <div className="flex items-center gap-3 p-4 rounded-[18px] bg-white relative z-10">
              <p className="flex-1 text-[17px] font-black" style={{ color:"#111827" }}>RIYA2026</p>
              <motion.button whileTap={{ scale:0.94 }} className="flex items-center gap-2 px-4 py-2 rounded-[14px] text-[13px] font-black text-white" style={{ background:B.orange }}>
                <Copy size={14} />Copy
              </motion.button>
            </div>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <Card t={t} p="p-5">
            <p className="text-[11px] font-black uppercase tracking-[0.12em] mb-4" style={{ color:t.muted }}>Your Referrals</p>
            {[{name:"Priya Joshi",date:"5 Jul",status:"Subscribed",earned:"+₹100"},{name:"Amit Sharma",date:"Invited",status:"Pending",earned:"—"}].map((r,i,a)=>(
              <div key={r.name} className="flex items-center gap-4 py-3.5" style={{ borderBottom:i<a.length-1?`1px solid ${t.border}`:"none" }}>
                <div className="w-10 h-10 rounded-[14px] font-black text-white flex items-center justify-center" style={{ background:B.orange }}>{r.name[0]}</div>
                <div className="flex-1">
                  <p className="text-[14px] font-bold" style={{ color:t.text }}>{r.name}</p>
                  <p className="text-[11px]" style={{ color:t.muted }}>{r.date} · {r.status}</p>
                </div>
                <span className="text-[14px] font-black" style={{ color:r.earned==="—"?t.muted:B.green }}>{r.earned}</span>
              </div>
            ))}
          </Card>
        </FadeUp>
        <FadeUp delay={0.14}>
          <div className="flex gap-3">
            <OrangeBtn label="Share via WhatsApp" />
            <motion.button whileTap={{ scale:0.95 }} className="h-[54px] px-4 rounded-[20px] border-2 flex items-center" style={{ borderColor:t.border }}>
              <Share2 size={18} color={t.muted} />
            </motion.button>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}

// ─── Setup Onboarding (post-auth, 5 steps) ───────────────────────────────────

function SetupProgressBar({ step, total=11, t }: { step:number; total?:number; t:T }) {
  const progressPct = Math.round((step / total) * 100);
  return (
    <div className="w-full flex flex-col items-end px-1 mb-2">
      <div className="flex items-center justify-between w-full text-[10px] font-black uppercase tracking-[0.1em]">
        <span style={{ color: B.orange }}>Step {step} of {total}</span>
        <span style={{ color: t.muted }}>{progressPct}% Complete</span>
      </div>
      <div className="h-1.5 rounded-full w-full mt-1 overflow-hidden" style={{ background: "rgba(0,0,0,0.05)" }}>
        <motion.div className="h-full rounded-full" style={{ background: "linear-gradient(90deg, #FF9F43, #FF6B6B)" }}
          initial={{ width: 0 }}
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }} />
      </div>
    </div>
  );
}

function SetupShell({ step, title, subtitle, go, back, onContinue, ctaLabel="Continue", children, t, totalSteps = 11, showCta = true, isSubmitting = false }: {
  step:number; title:string; subtitle:string;
  go:(s:Screen)=>void; back:()=>void;
  onContinue:()=>void; ctaLabel?:string;
  children:React.ReactNode; t:T; totalSteps?:number; showCta?:boolean; isSubmitting?:boolean;
}) {
  const isDark = t.bg === "#0E0E0E";
  
  // Custom Glass Styling for both modes
  const glassBg = isDark ? "rgba(15, 15, 15, 0.35)" : "rgba(255, 255, 255, 0.28)";
  const glassBorder = isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.4)";
  const glassShadow = isDark
    ? "0 24px 60px -15px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.1)"
    : "0 24px 50px -15px rgba(139, 92, 26, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.55)";

  const progressPct = Math.round((step / totalSteps) * 100);

  return (
    <motion.div {...pageIn} className="flex-1 min-h-0 flex flex-col justify-center relative overflow-hidden" style={{ background: t.bg }}>
      <style>{`
        @keyframes slow-zoom {
          0% { transform: scale(1.05); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1.05); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 25s ease-in-out infinite;
        }
      `}</style>

      {/* Blurred food background with dark vignette overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=1200&auto=format&fit=crop"
          alt="Homemade Meals"
          className="w-full h-full object-cover filter blur-[12px] scale-110 animate-slow-zoom"
          referrerPolicy="no-referrer"
        />
        {/* Dynamic theme overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr transition-all duration-300"
          style={{
            background: isDark
              ? "radial-gradient(circle at top right, rgba(230, 126, 34, 0.15), rgba(14, 14, 14, 0.9) 70%)"
              : "radial-gradient(circle at top right, rgba(255, 159, 67, 0.2), rgba(253, 246, 238, 0.65) 75%)"
          }}
        />
        <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.5)] opacity-60" />
      </div>

      {/* Card Wrapper (Centered vertically) */}
      <div className="flex-1 min-h-0 flex flex-col justify-center px-4 py-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 16 }}
          className="w-full max-w-sm mx-auto rounded-[32px] border flex flex-col overflow-hidden"
          style={{
            background: glassBg,
            borderColor: glassBorder,
            boxShadow: glassShadow,
            backdropFilter: "blur(24px) contrast(105%)",
            WebkitBackdropFilter: "blur(24px) contrast(105%)",
            maxHeight: "92%"
          }}
        >
          {/* Header & Sub-Progress Bar */}
          <div className="px-6 pt-6 pb-2 flex-shrink-0">
            <div className="flex items-center justify-between mb-3">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={back}
                className="w-9 h-9 rounded-full flex items-center justify-center border transition-colors"
                style={{
                  background: isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(255, 255, 255, 0.5)",
                  borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.06)",
                  color: t.text
                }}
              >
                <ArrowLeft size={16} />
              </motion.button>
              
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black uppercase tracking-[0.1em]" style={{ color: B.orange }}>
                  Question {step} of {totalSteps}
                </span>
                <span className="text-[10px] font-bold mt-0.5" style={{ color: t.muted }}>
                  {progressPct}% Done
                </span>
              </div>
            </div>

            {/* Seamless tiny progress line */}
            <div className="h-1.5 rounded-full w-full overflow-hidden" style={{ background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #FF9F43, #FF6B6B)" }}
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Heading Section */}
          <div className="px-6 pt-3 pb-3 flex-shrink-0">
            <h1 className="text-[18px] font-black leading-tight tracking-tight" style={{ color: t.text }}>
              {title}
            </h1>
            <p className="text-[11px] mt-1 font-medium leading-relaxed" style={{ color: t.muted }}>
              {subtitle}
            </p>
          </div>

          {/* Scrollable Form Content */}
          <div className="flex-1 min-h-0 overflow-y-auto px-6 py-2" style={{ scrollbarWidth: "none" }}>
            {children}
          </div>

          {/* Large Gradient CTA Button */}
          {showCta && (
            <div className="px-6 pb-6 pt-3 flex-shrink-0">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={onContinue}
                disabled={isSubmitting}
                className="w-full py-4 rounded-[20px] text-[14px] font-black text-white flex items-center justify-center gap-2 transition-all"
                style={{
                  background: "linear-gradient(135deg, #FF9F43 0%, #FF6B6B 100%)",
                  boxShadow: "0 8px 24px rgba(255, 107, 107, 0.25)"
                }}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{ctaLabel}</span>
                    <ChevronRight size={15} />
                  </>
                )}
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

function SetupField({ label, placeholder, type="text", t, value, onChange, error }: {
  label:string; placeholder:string; type?:string; t:T; value?:string; onChange?:(v:string)=>void; error?:string|null;
}) {
  const [focused, setFocused] = useState(false);
  const isDark = t.bg === "#0E0E0E";
  return (
    <div className="mb-4">
      <label className="text-[11px] font-black uppercase tracking-[0.1em] block mb-1.5" style={{ color: focused ? B.orange : error ? "#EF4444" : t.muted }}>{label}</label>
      <div className="relative rounded-2xl border-2 transition-all" 
        style={{ 
          borderColor: focused ? B.orange : error ? "#EF4444" : t.border,
          background: isDark ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.45)",
          boxShadow: focused ? `0 0 10px ${B.orange}20` : "none"
        }}>
        <input type={type} placeholder={placeholder} value={value || ""} onChange={e=>onChange?.(e.target.value)}
          onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
          className="w-full py-3.5 px-5 rounded-2xl text-[14px] font-bold outline-none bg-transparent"
          style={{ color:t.text, fontFamily:"'Inter',sans-serif" }} />
      </div>
    </div>
  );
}

function SetupChip({ label, selected, onToggle, t, color=B.orange }: { label:string; selected:boolean; onToggle:()=>void; t:T; color?:string }) {
  const isDark = t.bg === "#0E0E0E";
  return (
    <motion.button whileTap={{ scale:0.96 }} onClick={onToggle}
      className="px-4 py-3 rounded-2xl text-[13px] font-bold border-2 transition-all flex items-center gap-1.5"
      style={{
        borderColor: selected ? color : (isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.08)"),
        background: selected ? color+"20" : (isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.55)"),
        color: selected ? color : t.text,
        boxShadow: selected ? `0 4px 12px ${color}15` : "none"
      }}>
      <span>{label}</span>
      {selected && <Check size={14} style={{ color }} />}
    </motion.button>
  );
}

// Step 1 — Profile Information
function Setup1({ go, back, t, user, setUser }: { go:(s:Screen)=>void; back:()=>void; t:T; user:any; setUser:(u:any)=>void }) {
  const isDark = t.bg === "#0E0E0E";
  const unselectedBorder = isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.08)";
  const unselectedBg = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.55)";

  const AVATARS = ["🍛", "👨‍🍳", "🥗", "🍱", "🍲", "🍎", "🙋‍♀️", "🙋‍♂️"];
  const [localError, setLocalError] = useState<string | null>(null);

  const onboardingStep = user.onboardingStep || 1;
  const setOnboardingStep = (s: number) => setUser({ ...user, onboardingStep: s });

  const handleNextAvatar = () => {
    const current = user.avatar || "🍛";
    const idx = AVATARS.indexOf(current);
    const nextIdx = idx === -1 ? 0 : (idx + 1) % AVATARS.length;
    setUser({ ...user, avatar: AVATARS[nextIdx] });
  };

  const handleBack = () => {
    if (onboardingStep > 1) {
      setOnboardingStep(onboardingStep - 1);
    } else {
      go("auth");
    }
  };

  const handleContinue = () => {
    setLocalError(null);

    if (onboardingStep === 1) {
      setOnboardingStep(2);
    } else if (onboardingStep === 2) {
      if (!user.name?.trim()) {
        setLocalError("Please enter your Full Name.");
        return;
      }
      setOnboardingStep(3);
    } else if (onboardingStep === 3) {
      if (user.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
        setLocalError("Please enter a valid email address.");
        return;
      }
      setOnboardingStep(4);
    } else if (onboardingStep === 4) {
      if (!user.dob?.trim() || !user.age) {
        setLocalError("Please specify both your Date of Birth and Age.");
        return;
      }
      setOnboardingStep(5);
    } else if (onboardingStep === 5) {
      setOnboardingStep(6);
      go("setup2");
    }
  };

  // Render question depending on active onboardingStep
  switch (onboardingStep) {
    case 1:
      return (
        <SetupShell step={1} title="Choose your dining vibe" subtitle="Pick an emoji avatar that represents you." go={go} back={handleBack} onContinue={handleContinue} t={t}>
          <div className="flex flex-col items-center justify-center py-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextAvatar}
              className="w-24 h-24 rounded-full flex items-center justify-center border-4 cursor-pointer relative shadow-lg"
              style={{ background: "rgba(255,255,255,0.15)", borderColor: B.orange }}
            >
              <span className="text-[44px] select-none">{user.avatar || "🍛"}</span>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center shadow-md border" style={{ background: B.orange, borderColor: "white" }}>
                <Camera size={13} color="white" />
              </div>
            </motion.div>
            
            <p className="text-[10px] mt-4 font-black uppercase tracking-wider text-gray-400 text-center leading-relaxed">
              TAP AVATAR TO RANDOMIZE <br />
              <span style={{ color: B.orange }}>OR CHOOSE FROM PRESETS BELOW</span>
            </p>

            <div className="grid grid-cols-4 gap-3 mt-6 w-full max-w-xs">
              {AVATARS.map(av => (
                <motion.button
                  key={av}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setUser({ ...user, avatar: av })}
                  className="w-12 h-12 rounded-2xl flex items-center justify-center border-2 text-[20px] transition-all"
                  style={{
                    background: user.avatar === av ? B.orange+"15" : unselectedBg,
                    borderColor: user.avatar === av ? B.orange : unselectedBorder
                  }}
                >
                  {av}
                </motion.button>
              ))}
            </div>
          </div>
        </SetupShell>
      );

    case 2:
      return (
        <SetupShell step={2} title="What should we call you?" subtitle="This is how our kitchen staff will identify your dabbas." go={go} back={handleBack} onContinue={handleContinue} t={t}>
          <div className="py-4">
            <SetupField label="Full Name" placeholder="Riya Sharma" t={t} value={user.name || ""} onChange={val => setUser({ ...user, name: val, avatar: user.avatar || (val ? val[0].toUpperCase() : "🍛") })} error={localError} />
            {localError && (
              <p className="text-[11px] font-bold text-red-500 mt-2 flex items-center gap-1.5">
                <AlertCircle size={12} /> {localError}
              </p>
            )}
          </div>
        </SetupShell>
      );

    case 3:
      return (
        <SetupShell step={3} title="What's your email address?" subtitle="We'll send weekly nutrition digests, bills, and menu updates here." go={go} back={handleBack} onContinue={handleContinue} t={t}>
          <div className="py-4">
            <SetupField label="Email Address" placeholder="riya@example.com" type="email" t={t} value={user.email || ""} onChange={val => setUser({ ...user, email: val })} error={localError} />
            {localError && (
              <p className="text-[11px] font-bold text-red-500 mt-2 flex items-center gap-1.5">
                <AlertCircle size={12} /> {localError}
              </p>
            )}
            <p className="text-[10px] text-gray-400 leading-relaxed mt-2 font-medium">
              💡 We promise never to spam you or share your details with anyone else.
            </p>
          </div>
        </SetupShell>
      );

    case 4:
      return (
        <SetupShell step={4} title="When's your birthday?" subtitle="We auto-calculate your age to customize your dynamic daily calorie budget." go={go} back={handleBack} onContinue={handleContinue} t={t}>
          <div className="py-4 flex flex-col gap-4">
            <SetupField label="Date of Birth" placeholder="DD / MM / YYYY" t={t} value={user.dob || ""} onChange={val => setUser({ ...user, dob: val })} error={localError} />
            <SetupField label="Age" placeholder="28" type="number" t={t} value={user.age || ""} onChange={val => setUser({ ...user, age: val })} error={localError} />
            {localError && (
              <p className="text-[11px] font-bold text-red-500 flex items-center gap-1.5">
                <AlertCircle size={12} /> {localError}
              </p>
            )}
          </div>
        </SetupShell>
      );

    case 5:
      return (
        <SetupShell step={5} title="Choose your gender identity" subtitle="This helps customize health metrics like body fat and muscle distribution." go={go} back={handleBack} onContinue={handleContinue} t={t}>
          <div className="py-4 flex flex-col gap-3">
            {["Male", "Female", "Non-binary", "Prefer not to say"].map(g => {
              const isSelected = user.gender === g;
              return (
                <motion.button
                  key={g}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setUser({ ...user, gender: g })}
                  className="w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between"
                  style={{
                    borderColor: isSelected ? B.orange : unselectedBorder,
                    background: isSelected ? B.orange + "20" : unselectedBg
                  }}
                >
                  <span className="text-[14px] font-black" style={{ color: t.text }}>{g}</span>
                  {isSelected && <Check size={16} color={B.orange} />}
                </motion.button>
              );
            })}
          </div>
        </SetupShell>
      );

    default:
      return null;
  }
}

// Step 2 — Delivery Location
function Setup2({ go, back, t, user, setUser }: { go:(s:Screen)=>void; back:()=>void; t:T; user:any; setUser:(u:any)=>void }) {
  const isDark = t.bg === "#0E0E0E";
  const unselectedBorder = isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.08)";
  const unselectedBg = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.55)";

  const mode = user.addressMode || "manual";
  const setMode = (m: "detect" | "manual" | null) => setUser({ ...user, addressMode: m });
  const [localError, setLocalError] = useState<string | null>(null);

  const onboardingStep = user.onboardingStep || 6;
  const setOnboardingStep = (s: number) => setUser({ ...user, onboardingStep: s });

  const handleBack = () => {
    if (onboardingStep > 6) {
      setOnboardingStep(onboardingStep - 1);
    } else {
      setOnboardingStep(5);
      go("setup1");
    }
  };

  const handleContinue = () => {
    setLocalError(null);

    if (onboardingStep === 6) {
      setOnboardingStep(7);
    } else if (onboardingStep === 7) {
      if (mode === "manual" && (!user.houseNo?.trim() || !user.society?.trim() || !user.pincode?.trim())) {
        setLocalError("Please fill out your House No, Society/Building, and Pincode.");
        return;
      }
      setOnboardingStep(8);
      go("setup3");
    }
  };

  switch (onboardingStep) {
    case 6:
      return (
        <SetupShell step={6} title="Where do we deliver?" subtitle="Choose whether to auto-detect your location via GPS or type it manually." go={go} back={handleBack} onContinue={handleContinue} t={t}>
          <div className="flex flex-col gap-4 py-4">
            {[
              { id: "detect" as const, icon: <Navigation size={22} color={B.orange} />, title: "Detect My Location", sub: "Auto-fill using GPS coords" },
              { id: "manual" as const, icon: <MapPin size={22} color="#6366F1" />, title: "Enter Manually", sub: "Type your full dabba address" },
            ].map(opt => {
              const isSelected = mode === opt.id;
              return (
                <motion.button
                  key={opt.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setMode(opt.id)}
                  className="flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all"
                  style={{
                    borderColor: isSelected ? B.orange : unselectedBorder,
                    background: isSelected ? B.orange + "20" : unselectedBg
                  }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/10">
                    {opt.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] font-black" style={{ color: t.text }}>{opt.title}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{opt.sub}</p>
                  </div>
                  {isSelected && <Check size={18} color={B.orange} />}
                </motion.button>
              );
            })}
          </div>
        </SetupShell>
      );

    case 7:
      return (
        <SetupShell step={7} title={mode === "detect" ? "Confirm GPS Location" : "Dabba Delivery Address"} subtitle={mode === "detect" ? "Confirm your detected address coordinates below." : "Enter delivery details so our partners can locate your door."} go={go} back={handleBack} onContinue={handleContinue} t={t}>
          <div className="py-2">
            {mode === "detect" ? (
              <div className="flex flex-col gap-4">
                <div className="rounded-2xl overflow-hidden relative shadow-lg" style={{ height: 140, background: `linear-gradient(135deg,#E8F5E9 0%,#C8E6C9 100%)` }}>
                  <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg,rgba(0,0,0,0.04) 0,rgba(0,0,0,0.04) 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,rgba(0,0,0,0.04) 0,rgba(0,0,0,0.04) 1px,transparent 1px,transparent 40px)" }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PulsingDot color={B.orange} size={14} />
                  </div>
                </div>
                <SetupField label="Confirm Address" placeholder="Block 5, Sector 14, Gurugram" t={t} value={user.society || ""} onChange={val => setUser({ ...user, society: val })} />
              </div>
            ) : (
              <div className="flex flex-col gap-1 max-h-[380px] overflow-y-auto pr-1" style={{ scrollbarWidth: "none" }}>
                <SetupField label="House / Flat No." placeholder="Flat 4B" t={t} value={user.houseNo || ""} onChange={val => setUser({ ...user, houseNo: val })} error={localError} />
                <SetupField label="Apartment / Society" placeholder="Sunrise Apartments" t={t} value={user.society || ""} onChange={val => setUser({ ...user, society: val })} error={localError} />
                <SetupField label="Street" placeholder="MG Road" t={t} value={user.street || ""} onChange={val => setUser({ ...user, street: val })} />
                <SetupField label="Landmark" placeholder="Near City Mall" t={t} value={user.landmark || ""} onChange={val => setUser({ ...user, landmark: val })} />
                <SetupField label="Area / Locality" placeholder="Koramangala" t={t} value={user.area || ""} onChange={val => setUser({ ...user, area: val })} />
                <div className="flex gap-3">
                  <div className="flex-1">
                    <SetupField label="City" placeholder="Bengaluru" t={t} value={user.city || ""} onChange={val => setUser({ ...user, city: val })} />
                  </div>
                  <div className="flex-1">
                    <SetupField label="Pincode" placeholder="560034" t={t} value={user.pincode || ""} onChange={val => setUser({ ...user, pincode: val })} error={localError} />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-[11px] font-black uppercase tracking-[0.1em] block mb-2" style={{ color: t.muted }}>Address Type</label>
                  <div className="flex gap-2.5">
                    {["🏠 Home", "💼 Work", "📍 Other"].map(tp => (
                      <SetupChip key={tp} label={tp} selected={user.addressType === tp} onToggle={() => setUser({ ...user, addressType: tp })} t={t} />
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-[11px] font-black uppercase tracking-[0.1em] block mb-1.5" style={{ color: t.muted }}>Delivery Instructions</label>
                  <textarea
                    placeholder="Leave at door, ring bell twice..."
                    rows={2}
                    value={user.deliveryInstructions || ""}
                    onChange={e => setUser({ ...user, deliveryInstructions: e.target.value })}
                    className="w-full px-5 py-3 rounded-2xl text-[13px] outline-none resize-none transition-all border-2"
                    style={{
                      background: unselectedBg,
                      borderColor: unselectedBorder,
                      color: t.text,
                      fontFamily: "'Inter',sans-serif"
                    }}
                  />
                </div>
              </div>
            )}

            {localError && (
              <p className="text-[11px] font-bold text-red-500 mt-2 flex items-center gap-1.5">
                <AlertCircle size={12} /> {localError}
              </p>
            )}
          </div>
        </SetupShell>
      );

    default:
      return null;
  }
}

// Step 3 — Fitness & Health Profile
function Setup3({ go, back, t, user, setUser }: { go:(s:Screen)=>void; back:()=>void; t:T; user:any; setUser:(u:any)=>void }) {
  const isDark = t.bg === "#0E0E0E";
  const unselectedBorder = isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.08)";
  const unselectedBg = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.55)";

  const hVal = parseFloat(user.height) || 168;
  const wVal = parseFloat(user.weight) || 62;
  const heightM = hVal / 100;
  const bmi = heightM > 0 ? parseFloat((wVal / (heightM * heightM)).toFixed(1)) : 22.0;

  const [localError, setLocalError] = useState<string | null>(null);

  const onboardingStep = user.onboardingStep || 8;
  const setOnboardingStep = (s: number) => setUser({ ...user, onboardingStep: s });

  let bmiLabel = "Normal Weight";
  let bmiColor = B.green;
  if (bmi < 18.5) {
    bmiLabel = "Underweight";
    bmiColor = "#3B82F6";
  } else if (bmi >= 18.5 && bmi < 25) {
    bmiLabel = "Normal Weight";
    bmiColor = B.green;
  } else if (bmi >= 25 && bmi < 30) {
    bmiLabel = "Overweight";
    bmiColor = "#F59E0B";
  } else {
    bmiLabel = "Obese";
    bmiColor = "#EF4444";
  }

  const activityLevels = ["Sedentary", "Lightly Active", "Moderately Active", "Very Active", "Athlete"];
  const goals = ["Weight Loss", "Weight Gain", "Muscle Gain", "Maintain Weight", "Healthy Lifestyle"];
  const foodPrefs = ["🌿 Veg", "🍗 Non-Veg", "🥚 Eggetarian"];
  const cuisines = ["South Indian", "North Indian", "Andhra", "Telangana", "Jain"];
  const spiceLevels = ["🌶 Mild", "🌶🌶 Medium", "🌶🌶🌶 Spicy", "🔥 Extra Hot"];

  const handleBack = () => {
    if (onboardingStep > 8) {
      setOnboardingStep(onboardingStep - 1);
    } else {
      setOnboardingStep(7);
      go("setup2");
    }
  };

  const handleContinue = () => {
    setLocalError(null);

    if (onboardingStep === 8) {
      if (!user.height || !user.weight) {
        setLocalError("Please enter both your Height and Weight.");
        return;
      }
      setOnboardingStep(9);
    } else if (onboardingStep === 9) {
      setOnboardingStep(10);
    } else if (onboardingStep === 10) {
      setOnboardingStep(11);
    } else if (onboardingStep === 11) {
      const cleanFoodPref = foodPrefs[user.food || 0].replace(/[^a-zA-Z-]/g, '').trim();
      setUser({ ...user, foodPref: cleanFoodPref, onboardingStep: undefined });
      go("home");
    }
  };

  switch (onboardingStep) {
    case 8:
      return (
        <SetupShell step={8} title="Let's check your body metrics" subtitle="Enter height & weight to calculate your BMI and caloric targets." go={go} back={handleBack} onContinue={handleContinue} t={t}>
          <div className="py-2 flex flex-col gap-2">
            <div className="flex gap-3">
              <div className="flex-1">
                <SetupField label="Height (cm)" placeholder="168" t={t} value={user.height} onChange={val => setUser({ ...user, height: val })} error={localError} />
              </div>
              <div className="flex-1">
                <SetupField label="Weight (kg)" placeholder="62" t={t} value={user.weight} onChange={val => setUser({ ...user, weight: val })} error={localError} />
              </div>
            </div>

            <div className="p-4 rounded-[20px] flex items-center gap-4 my-2 border transition-colors duration-300" 
              style={{ 
                background: bmiColor + "15", 
                borderColor: bmiColor + "40" 
              }}
            >
              <ProgressRing pct={Math.min(100, (bmi/40)*100)} size={54} color={bmiColor} label={bmi.toString()} sub="BMI" strokeW={4.5} />
              <div>
                <p className="text-[14px] font-black" style={{ color: t.text }}>{bmiLabel}</p>
                <p className="text-[11px]" style={{ color: t.muted }}>Metric auto-calculated from height & weight.</p>
              </div>
            </div>

            {localError && (
              <p className="text-[11px] font-bold text-red-500 flex items-center gap-1.5">
                <AlertCircle size={12} /> {localError}
              </p>
            )}
          </div>
        </SetupShell>
      );

    case 9:
      return (
        <SetupShell step={9} title="How active is your lifestyle?" subtitle="Your daily caloric budget adapts dynamically based on physical energy consumption." go={go} back={handleBack} onContinue={handleContinue} t={t}>
          <div className="py-4 flex flex-col gap-3">
            {activityLevels.map((act, idx) => {
              const isSelected = user.activity === idx;
              return (
                <motion.button
                  key={act}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setUser({ ...user, activity: idx })}
                  className="w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between"
                  style={{
                    borderColor: isSelected ? B.orange : unselectedBorder,
                    background: isSelected ? B.orange + "20" : unselectedBg
                  }}
                >
                  <span className="text-[14px] font-black" style={{ color: t.text }}>{act}</span>
                  {isSelected && <Check size={16} color={B.orange} />}
                </motion.button>
              );
            })}
          </div>
        </SetupShell>
      );

    case 10:
      return (
        <SetupShell step={10} title="What's your health goal?" subtitle="We'll tailor your macro-nutrients and protein portions to match this." go={go} back={handleBack} onContinue={handleContinue} t={t}>
          <div className="py-4 flex flex-col gap-3">
            {goals.map((g, idx) => {
              const isSelected = user.goal === idx;
              return (
                <motion.button
                  key={g}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setUser({ ...user, goal: idx })}
                  className="w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between"
                  style={{
                    borderColor: isSelected ? B.orange : unselectedBorder,
                    background: isSelected ? B.orange + "20" : unselectedBg
                  }}
                >
                  <span className="text-[14px] font-black" style={{ color: t.text }}>{g}</span>
                  {isSelected && <Check size={16} color={B.orange} />}
                </motion.button>
              );
            })}
          </div>
        </SetupShell>
      );

    case 11:
      return (
        <SetupShell step={11} title="Customize your dabba taste" subtitle="We will craft spice levels, cuisine styles, and food selections exactly to your palate." go={go} back={handleBack} onContinue={handleContinue} ctaLabel="Complete Onboarding ✓" t={t}>
          <div className="py-2 flex flex-col gap-4 max-h-[380px] overflow-y-auto pr-1" style={{ scrollbarWidth: "none" }}>
            
            {/* Food preference */}
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.1em] mb-2.5" style={{ color: t.muted }}>Dietary Preference</p>
              <div className="flex gap-2 flex-wrap">
                {foodPrefs.map((f, i) => (
                  <SetupChip key={f} label={f} selected={user.food === i} onToggle={() => setUser({ ...user, food: i })} t={t} />
                ))}
              </div>
            </div>

            {/* Spice level */}
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.1em] mb-2.5" style={{ color: t.muted }}>Spice Level tolerance</p>
              <div className="flex gap-2 flex-wrap">
                {spiceLevels.map((s, i) => (
                  <SetupChip key={s} label={s} selected={user.spice === i} onToggle={() => setUser({ ...user, spice: i })} color="#EF4444" t={t} />
                ))}
              </div>
            </div>

            {/* Cuisine */}
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.1em] mb-2.5" style={{ color: t.muted }}>Favorite Cuisines (Multi-select)</p>
              <div className="flex gap-2 flex-wrap">
                {cuisines.map((c, i) => {
                  const currentList = user.cuisines || [];
                  const isSelected = currentList.includes(i);
                  return (
                    <SetupChip
                      key={c}
                      label={c}
                      selected={isSelected}
                      onToggle={() => {
                        const nextList = isSelected ? currentList.filter((x: number) => x !== i) : [...currentList, i];
                        setUser({ ...user, cuisines: nextList });
                      }}
                      t={t}
                    />
                  );
                })}
              </div>
            </div>

            {/* Allergies */}
            <SetupField label="Allergies (optional)" placeholder="e.g. Peanuts, Dairy, Gluten" t={t} value={user.allergies} onChange={val => setUser({ ...user, allergies: val })} />

          </div>
        </SetupShell>
      );

    default:
      return null;
  }
}

// ─── MEAL DETAIL ─────────────────────────────────────────────────────────────

interface MealDetailScreenProps {
  go: (s: Screen) => void;
  back: () => void;
  t: T;
  mealsList: Meal[];
  setMealsList: React.Dispatch<React.SetStateAction<Meal[]>>;
  selectedMealId: number;
}

function MealDetailScreen({ go, back, t, mealsList, setMealsList, selectedMealId }: MealDetailScreenProps) {
  const meal = mealsList.find(m => m.id === selectedMealId) || mealsList[0];
  const [userRating, setUserRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [filterType, setFilterType] = useState<"Newest" | "Highest" | "Lowest" | "Helpful">("Newest");

  // Premium ingredient transparency categories with custom styling and lucide icons
  const ingredientTransparency = [
    { title: "Pure Cooking Mediums", items: ["Cold-pressed Groundnut Oil", "Pure Desi Cow Ghee", "Zero Palm Oil"], color: "#F59E0B", icon: <Flame size={16} /> },
    { title: "Premium Grains Selection", items: ["Sona Masoori Rice (single-polished)", "Aromatic Basmati"], color: B.orange, icon: <Leaf size={16} /> },
    { title: "Farm-Fresh Veggies", items: ["Local Red Onion", "Vedic Tomatoes", "Fresh Coriander", "Organic Ginger & Garlic"], color: B.green, icon: <CheckCircle2 size={16} /> },
    { title: "Vedic Fresh Ground Spices", items: ["Guntur Red Chilli", "Salem Turmeric Powder", "Stone-ground Cumin"], color: "#EC4899", icon: <Wind size={16} /> },
    { title: "High-Protein Lentils", items: ["Toor Dal (unpolished)", "Premium Kabuli Chana"], color: "#6366F1", icon: <Award size={16} /> },
  ];

  // Submit dynamic review handler that registers directly in application state
  const handleAddReview = () => {
    if (!reviewText.trim()) return;

    const newReview: Review = {
      id: Date.now(),
      user: "Bhargav",
      rating: userRating,
      comment: reviewText,
      date: "Just now",
      verified: true,
      avatar: "B",
      helpful: 0
    };

    setMealsList(prev => prev.map(m => {
      if (m.id === meal.id) {
        const updated = [newReview, ...m.reviews];
        const avg = parseFloat((updated.reduce((sum, r) => sum + r.rating, 0) / updated.length).toFixed(1));
        return {
          ...m,
          reviews: updated,
          rating: avg,
          reviewsCount: updated.length
        };
      }
      return m;
    }));

    setReviewText("");
    setUserRating(5);
  };

  // Upvote helpful review count handler
  const handleHelpfulIncrement = (reviewId: number) => {
    setMealsList(prev => prev.map(m => {
      if (m.id === meal.id) {
        return {
          ...m,
          reviews: m.reviews.map(r => r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r)
        };
      }
      return m;
    }));
  };

  // Reviews sorting algorithm
  const sortedReviews = [...meal.reviews].sort((a, b) => {
    if (filterType === "Highest") return b.rating - a.rating;
    if (filterType === "Lowest") return a.rating - b.rating;
    if (filterType === "Helpful") return b.helpful - a.helpful;
    return b.id - a.id; // default Newest
  });

  return (
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", background: t.bg }}>
      {/* Dynamic Hero Cover Header */}
      <div className="relative flex-shrink-0" style={{ height: 250 }}>
        <img src={meal.img} alt={meal.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(0,0,0,0.1) 0%,rgba(0,0,0,0.85) 100%)" }} />
        
        {/* Back navigation */}
        <motion.button whileTap={{ scale: 0.9 }} onClick={back}
          className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center border"
          style={{ background: t.card, borderColor: t.border }}>
          <ArrowLeft size={16} style={{ color: t.text }} />
        </motion.button>

        {/* Floating dietary tags */}
        <div className="absolute bottom-4 left-5 right-5">
          <VegPill veg={meal.type === "veg"} />
          <h1 className="text-[22px] font-black text-white leading-tight mt-1.5" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
            {meal.name}
          </h1>
          <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-300">
            <Clock size={11} />
            <span>Prep: 25 min · {meal.when === "lunch" ? "☀️ Lunch" : "🌙 Dinner"} · Slot: {meal.time}</span>
          </div>
        </div>
      </div>

      {/* Main detail scrolls */}
      <div className="flex-1 min-h-0 overflow-y-auto pb-24" style={{ scrollbarWidth: "none" }}>
        <div className="px-5 py-5 flex flex-col gap-4">
          
          {/* Section: Nutritional Transparency */}
          <FadeUp delay={0.04}>
            <div className="p-4 rounded-[24px] border" style={{ background: t.card, borderColor: t.border, boxShadow: "0 2px 14px rgba(0,0,0,0.02)" }}>
              <p className="text-[10px] font-black uppercase tracking-[0.15em] mb-3" style={{ color: t.muted }}>Nutritional Profile per serving</p>
              
              <div className="grid grid-cols-4 gap-2 text-center mb-3">
                {[{ v: `${meal.cal}`, l: "Calories", c: B.orange }, { v: `${meal.protein}g`, l: "Protein", c: "#6366F1" }, { v: `${meal.carbs}g`, l: "Carbs", c: B.green }, { v: `${meal.fat}g`, l: "Fat", c: "#F59E0B" }].map(n => (
                  <div key={n.l} className="p-2.5 rounded-[16px]" style={{ background: n.c + "09" }}>
                    <p className="text-[17px] font-black" style={{ color: n.c }}>{n.v}</p>
                    <p className="text-[9px] uppercase font-bold mt-0.5" style={{ color: t.muted }}>{n.l}</p>
                  </div>
                ))}
              </div>

              {/* Extra micro-stats */}
              <div className="grid grid-cols-3 gap-2">
                {[{ v: `${meal.fiber}g`, l: "Dietary Fiber" }, { v: meal.serving, l: "Portion Size" }, { v: "A+ Grade", l: "Genuineness" }].map(n => (
                  <div key={n.l} className="flex justify-between items-center px-3 py-2 rounded-xl" style={{ background: t.surface }}>
                    <span className="text-[9px] font-bold" style={{ color: t.muted }}>{n.l}</span>
                    <span className="text-[10px] font-black" style={{ color: t.text }}>{n.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Section: Chef's Quality Assurance Promise */}
          <FadeUp delay={0.07}>
            <div className="p-4 rounded-[24px]" style={{ background: t.surface, border: `1px solid ${t.border}` }}>
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white" style={{ background: B.orange }}>
                  <ChefHat size={18} />
                </div>
                <div>
                  <p className="text-[13px] font-black" style={{ color: t.text }}>Chef's Sourcing Statement</p>
                  <p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: B.orange }}>Koi Koi Premium Kitchens</p>
                </div>
              </div>
              <p className="text-[12px] leading-relaxed italic" style={{ fontFamily: "'Inter',sans-serif", color: t.sub }}>
                "We slow-cook every dabba over clean, low fires. We strictly source single-polished rice and avoid refined white sugars or industrial color agents. Good health starts with premium ingredients."
              </p>
            </div>
          </FadeUp>

          {/* Section: Premium Ingredient Transparency Cards */}
          <FadeUp delay={0.1}>
            <div className="p-4 rounded-[24px] border" style={{ background: t.card, borderColor: t.border, boxShadow: "0 2px 14px rgba(0,0,0,0.02)" }}>
              <p className="text-[10px] font-black uppercase tracking-[0.15em] mb-4" style={{ color: t.muted }}>Complete Ingredient Sourcing Transparency</p>
              
              <div className="flex flex-col gap-3">
                {ingredientTransparency.map((sec) => (
                  <div key={sec.title} className="p-3.5 rounded-[18px] border" style={{ background: t.surface, borderColor: t.border }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center text-white" style={{ background: sec.color }}>
                        {sec.icon}
                      </div>
                      <p className="text-[12px] font-black" style={{ color: t.text }}>{sec.title}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {sec.items.map(item => (
                        <span key={item} className="text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 border"
                          style={{ color: t.text, background: t.card, borderColor: t.border }}>
                          🌿 {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Allergen, Hygiene & FSSAI Licenses */}
          <FadeUp delay={0.13}>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-[22px] border" style={{ background: t.card, borderColor: t.border }}>
                <AlertCircle size={18} color="#F59E0B" className="mb-2" />
                <h4 className="text-[12px] font-black mb-1" style={{ color: t.text }}>Allergens Info</h4>
                <p className="text-[10px] leading-relaxed" style={{ color: t.muted }}>
                  Contains gluten and pure cow dairy (ghee). Completely peanut, soy and yeast free.
                </p>
              </div>
              <div className="p-4 rounded-[22px] border" style={{ background: t.card, borderColor: t.border }}>
                <BadgeCheck size={18} color={B.green} className="mb-2" />
                <h4 className="text-[12px] font-black mb-1" style={{ color: t.text }}>FSSAI Validated</h4>
                <p className="text-[10px] leading-relaxed" style={{ color: t.muted }}>
                  License: 10024010004561. Certified clean kitchen audits monthly.
                </p>
              </div>
            </div>
          </FadeUp>

          {/* Section: Verified Customer Reviews Section */}
          <FadeUp delay={0.16}>
            <div className="p-4 rounded-[24px] border" style={{ background: t.card, borderColor: t.border, boxShadow: "0 2px 14px rgba(0,0,0,0.02)" }}>
              <div className="flex items-center justify-between pb-3 border-b mb-4" style={{ borderColor: t.border }}>
                <div>
                  <h3 className="text-[14px] font-black" style={{ color: t.text, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Customer Reviews</h3>
                  <p className="text-[10px] mt-0.5" style={{ color: t.muted }}>Showing {meal.reviewsCount} verified experiences</p>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border" style={{ background: t.surface, borderColor: t.border }}>
                  <Star size={13} fill={B.orange} color={B.orange} />
                  <span className="text-[13px] font-black" style={{ color: t.text }}>{meal.rating}</span>
                </div>
              </div>

              {/* Sorting Filter Bar */}
              <div className="flex gap-1 mb-4 p-1 rounded-xl" style={{ background: t.surface }}>
                {(["Newest", "Highest", "Lowest", "Helpful"] as const).map(f => (
                  <button key={f} onClick={() => setFilterType(f)}
                    className="flex-1 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all"
                    style={{
                      background: filterType === f ? B.orange : "transparent",
                      color: filterType === f ? "#fff" : t.muted
                    }}>
                    {f}
                  </button>
                ))}
              </div>

              {/* Customer experiences list */}
              <div className="flex flex-col gap-4">
                {sortedReviews.map((rv) => (
                  <div key={rv.id} className="pb-4 border-b last:border-0 last:pb-0" style={{ borderColor: t.border }}>
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center font-black text-[12px] text-white" style={{ background: B.orange }}>
                        {rv.avatar || rv.user[0]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1">
                          <p className="text-[12px] font-black" style={{ color: t.text }}>{rv.user}</p>
                          {rv.verified && <span className="text-[8px] px-1 py-0.2 rounded font-black bg-emerald-500/10 text-emerald-500">VERIFIED</span>}
                        </div>
                        <div className="flex gap-0.5 mt-0.5">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star key={idx} size={9} fill={idx < rv.rating ? B.orange : "none"} color={B.orange} />
                          ))}
                        </div>
                      </div>
                      <span className="text-[10px]" style={{ color: t.muted }}>{rv.date}</span>
                    </div>
                    <p className="text-[12px] leading-relaxed mb-2" style={{ color: t.sub }}>{rv.comment}</p>
                    
                    {/* Upvote Helpful button */}
                    <button onClick={() => handleHelpfulIncrement(rv.id)}
                      className="text-[10px] font-bold px-2.5 py-1 rounded-lg border flex items-center gap-1 transition-colors"
                      style={{ borderColor: t.border, color: t.muted, background: t.surface }}>
                      👍 Helpfully Validated ({rv.helpful})
                    </button>
                  </div>
                ))}
              </div>

              {/* Dynamic review addition form */}
              <div className="mt-5 p-4 rounded-[18px] border-2 border-dashed" style={{ borderColor: t.border, background: t.surface }}>
                <h4 className="text-[12px] font-black mb-1" style={{ color: t.text }}>Share your experience</h4>
                <p className="text-[10px] mb-3" style={{ color: t.muted }}>Let Bhargav and other subscribers know how your meal was cooked.</p>
                
                {/* Score Picker */}
                <div className="flex items-center gap-1.5 mb-3">
                  <span className="text-[10px] font-bold mr-1" style={{ color: t.muted }}>Rating:</span>
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <button key={idx} onClick={() => setUserRating(idx + 1)}>
                      <Star size={16} fill={idx < userRating ? B.orange : "none"} color={B.orange} />
                    </button>
                  ))}
                </div>

                {/* Review Message Input */}
                <textarea rows={3} value={reviewText} onChange={e => setReviewText(e.target.value)}
                  placeholder="The spice level was ideal, perfect home cooked taste..."
                  className="w-full p-3 text-[12px] rounded-xl outline-none mb-3 resize-none border"
                  style={{ background: t.card, color: t.text, borderColor: t.border }} />

                <OrangeBtn label="Submit Review" onClick={handleAddReview} sm />
              </div>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Subscribe bottom call-to-action sheet */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t flex items-center justify-between z-20"
        style={{ background: t.card, borderColor: t.border, boxShadow: "0 -4px 16px rgba(0,0,0,0.03)" }}>
        <div>
          <span className="text-[9px] uppercase font-bold" style={{ color: t.muted }}>Total single billing</span>
          <p className="text-[18px] font-black text-orange-600">{meal.price}</p>
        </div>
        <div className="w-[180px]">
          <OrangeBtn label="Subscribe Now" onClick={() => go("subscribe_flow")} icon={<Package size={14} />} sm />
        </div>
      </div>
    </div>
  );
}

// ─── SUBSCRIBE FLOW ───────────────────────────────────────────────────────────

function SubscribeFlow({ go, back, t }: { go:(s:Screen)=>void; back:()=>void; t:T }) {
  const [step, setStep] = useState(0);
  const [plan, setPlan] = useState(1);
  const [mealType, setMealType] = useState(2);
  const [days, setDays] = useState([0,1,2,3,4]);
  const [time, setTime] = useState("12:30 PM");
  const planOpts = [
    { label:"Daily", price:"₹180/day", sub:"Pay per day", color:"#4A4A4A" },
    { label:"Weekly", price:"₹1,099/wk", sub:"Save 13%", color:B.orange, badge:"POPULAR" },
    { label:"Monthly", price:"₹3,999/mo", sub:"Save 26%", color:"#6366F1", badge:"BEST VALUE" },
    { label:"Custom", price:"Choose days", sub:"Your schedule", color:"#EC4899" },
  ];
  const mealOpts = ["☀️ Lunch Only","🌙 Dinner Only","☀️🌙 Lunch + Dinner"];
  const dayNames = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const times = ["12:00 PM","12:30 PM","1:00 PM","7:00 PM","7:30 PM","8:00 PM"];

  const steps = ["Plan","Days","Time","Confirm","Payment","Done"];
  return (
    <div style={{ flex:1, minHeight:0, display:"flex", flexDirection:"column", background:t.bg }}>
      <BackBar title="Subscribe" onBack={step===0?back:()=>setStep(s=>s-1)} t={t} />
      {/* Mini progress */}
      <div style={{ padding:"0 20px 12px", flexShrink:0 }}>
        <div style={{ display:"flex", gap:4 }}>
          {steps.map((_,i)=>(
            <div key={i} style={{ flex:1, height:3, borderRadius:2, background:i<=step?B.orange:t.surface }} />
          ))}
        </div>
        <p style={{ fontSize:11, color:t.muted, marginTop:6 }}>Step {step+1} of {steps.length}</p>
      </div>
      <div style={{ flex:1, minHeight:0, overflowY:"auto", padding:"0 20px 20px", scrollbarWidth:"none" } as any}>
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity:0, x:24 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-24 }} transition={{ duration:0.22 }}>
            {step===0 && (
              <div>
                <h2 style={{ fontSize:22, fontWeight:900, color:t.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:6 }}>Choose Meal Type</h2>
                <p style={{ fontSize:13, color:t.muted, marginBottom:20 }}>What would you like delivered?</p>
                {mealOpts.map((m,i)=>(
                  <motion.button key={m} whileTap={{ scale:0.98 }} onClick={()=>setMealType(i)}
                    style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"18px 20px", borderRadius:20, marginBottom:10, border:`2px solid ${mealType===i?B.orange:t.border}`, background:mealType===i?B.orangeL:t.card, cursor:"pointer", textAlign:"left" }}>
                    <span style={{ fontSize:16, fontWeight:700, color:t.text }}>{m}</span>
                    {mealType===i && <Check size={18} color={B.orange} />}
                  </motion.button>
                ))}
                <h2 style={{ fontSize:18, fontWeight:900, color:t.text, fontFamily:"'Plus Jakarta Sans',sans-serif", margin:"20px 0 12px" }}>Choose Plan</h2>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                  {planOpts.map((p,i)=>(
                    <motion.button key={p.label} whileTap={{ scale:0.97 }} onClick={()=>setPlan(i)}
                      style={{ padding:16, borderRadius:20, border:`2px solid ${plan===i?p.color:t.border}`, background:plan===i?p.color+"12":t.card, textAlign:"left", cursor:"pointer", position:"relative" }}>
                      {p.badge && <span style={{ fontSize:8, fontWeight:900, background:p.color, color:"white", padding:"2px 6px", borderRadius:6, position:"absolute", top:-8, left:10 }}>{p.badge}</span>}
                      <p style={{ fontSize:15, fontWeight:900, color:plan===i?p.color:t.text, marginTop:4 }}>{p.label}</p>
                      <p style={{ fontSize:13, fontWeight:700, color:p.color, marginTop:2 }}>{p.price}</p>
                      <p style={{ fontSize:10, color:t.muted }}>{p.sub}</p>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
            {step===1 && (
              <div>
                <h2 style={{ fontSize:22, fontWeight:900, color:t.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:6 }}>Delivery Days</h2>
                <p style={{ fontSize:13, color:t.muted, marginBottom:20 }}>Select which days you want delivery</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginBottom:20 }}>
                  {dayNames.map((d,i)=>(
                    <motion.button key={d} whileTap={{ scale:0.93 }} onClick={()=>setDays(prev=>prev.includes(i)?prev.filter(x=>x!==i):[...prev,i].sort())}
                      style={{ width:60, height:60, borderRadius:18, border:`2px solid ${days.includes(i)?B.orange:t.border}`, background:days.includes(i)?B.orangeL:t.card, fontWeight:700, fontSize:13, color:days.includes(i)?B.orange:t.muted, cursor:"pointer" }}>
                      {d}
                    </motion.button>
                  ))}
                </div>
                <p style={{ fontSize:12, color:t.muted }}>{days.length} day{days.length!==1?"s":""} selected per week</p>
              </div>
            )}
            {step===2 && (
              <div>
                <h2 style={{ fontSize:22, fontWeight:900, color:t.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:6 }}>Delivery Time</h2>
                <p style={{ fontSize:13, color:t.muted, marginBottom:20 }}>When should we deliver?</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
                  {times.map(tm=>(
                    <motion.button key={tm} whileTap={{ scale:0.95 }} onClick={()=>setTime(tm)}
                      style={{ padding:"12px 20px", borderRadius:16, border:`2px solid ${time===tm?B.orange:t.border}`, background:time===tm?B.orangeL:t.card, fontWeight:700, fontSize:14, color:time===tm?B.orange:t.text, cursor:"pointer" }}>
                      {tm}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
            {step===3 && (
              <div>
                <h2 style={{ fontSize:22, fontWeight:900, color:t.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:16 }}>Summary</h2>
                {[["Meal Type",mealOpts[mealType]],["Plan",planOpts[plan].label],["Price",planOpts[plan].price],["Days",`${days.length} days/week`],["Time",time],["Delivery","Koramangala, Bengaluru"]].map(([k,v])=>(
                  <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"14px 0", borderBottom:`1px solid ${t.border}` }}>
                    <span style={{ fontSize:13, color:t.muted }}>{k}</span>
                    <span style={{ fontSize:13, fontWeight:700, color:t.text }}>{v}</span>
                  </div>
                ))}
                <div style={{ background:`linear-gradient(135deg,${B.orange},#C25E00)`, borderRadius:20, padding:20, marginTop:20, textAlign:"center" }}>
                  <p style={{ fontSize:14, color:"rgba(255,255,255,0.7)", fontWeight:600 }}>{planOpts[plan].label} Plan Total</p>
                  <p style={{ fontSize:32, fontWeight:900, color:"white", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{planOpts[plan].price}</p>
                </div>
              </div>
            )}
            {step===4 && (
              <div>
                <h2 style={{ fontSize:22, fontWeight:900, color:t.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:6 }}>Payment</h2>
                <p style={{ fontSize:13, color:t.muted, marginBottom:20 }}>Choose your payment method</p>
                {[{label:"UPI / GPay / PhonePe",icon:<Zap size={18} color="#6366F1"/>},{label:"Credit / Debit Card",icon:<CreditCard size={18} color={B.orange}/>},{label:"Net Banking",icon:<Building2 size={18} color="#0EA5E9"/>}].map((pm,i)=>(
                  <motion.button key={pm.label} whileTap={{ scale:0.98 }} onClick={()=>setStep(5)}
                    style={{ width:"100%", display:"flex", alignItems:"center", gap:14, padding:"16px 18px", borderRadius:18, border:`1.5px solid ${t.border}`, background:t.card, marginBottom:10, cursor:"pointer" }}>
                    <div style={{ width:40, height:40, borderRadius:14, background:t.surface, display:"flex", alignItems:"center", justifyContent:"center" }}>{pm.icon}</div>
                    <span style={{ fontSize:14, fontWeight:600, color:t.text, flex:1, textAlign:"left" }}>{pm.label}</span>
                    <ChevronRight size={15} color={t.muted} />
                  </motion.button>
                ))}
              </div>
            )}
            {step===5 && (
              <div style={{ textAlign:"center", paddingTop:20 }}>
                <div style={{ display:"flex", justifyContent:"center", marginBottom:20 }}>
                  <SuccessCheck size={80} color={B.green} />
                </div>
                <h2 style={{ fontSize:26, fontWeight:900, color:t.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8 }}>Subscribed! 🎉</h2>
                <p style={{ fontSize:14, color:t.muted, marginBottom:24, lineHeight:1.6 }}>Your {planOpts[plan].label} plan is active. First delivery tomorrow at {time}.</p>
                <OrangeBtn label="Go to Dashboard" onClick={()=>go("home")} />
                <button onClick={()=>go("meals")} style={{ display:"block", width:"100%", marginTop:12, padding:"14px 0", fontSize:13, fontWeight:600, color:t.muted, background:"none", border:"none", cursor:"pointer" }}>Browse Meals</button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      {step < 5 && (
        <div style={{ padding:"12px 20px 24px", flexShrink:0, background:t.bg, borderTop:`1px solid ${t.border}` }}>
          <OrangeBtn label={step===4?"Pay Now":step===3?"Proceed to Pay":"Continue"} onClick={()=>setStep(s=>s+1)} />
        </div>
      )}
    </div>
  );
}

// ─── KITCHEN ──────────────────────────────────────────────────────────────────

function KitchenScreen({ go, t }: { go:(s:Screen)=>void; t:T }) {
  const [liveOn, setLiveOn] = useState(true);
  const [bookOpen, setBookOpen] = useState(false);
  const [bookDate, setBookDate] = useState("");
  const [bookSent, setBookSent] = useState(false);

  const certs = [
    { label:"FSSAI Licensed", num:"10024010004561", icon:<BadgeCheck size={16} color={B.green}/> },
    { label:"A+ Hygiene Rating", num:"Last audit: Jul 2026", icon:<ShieldCheck size={16} color="#3B82F6"/> },
    { label:"ISO 22000", num:"Food Safety Certified", icon:<Award size={16} color="#8B5CF6"/> },
  ];
  const process = [
    { label:"Ingredients sourced", time:"5 AM", icon:<Leaf size={15} color={B.green}/>, done:true },
    { label:"Kitchen prep begins", time:"6 AM", icon:<Thermometer size={15} color={B.orange}/>, done:true },
    { label:"Cooking in progress", time:"9 AM", icon:<Flame size={15} color="#EF4444"/>, active:true },
    { label:"Quality check", time:"11 AM", icon:<BadgeCheck size={15} color="#6366F1"/>, done:false },
    { label:"Packaging", time:"11:30 AM", icon:<Package size={15} color="#0EA5E9"/>, done:false },
    { label:"Delivery begins", time:"12 PM", icon:<Bike size={15} color="#F59E0B"/>, done:false },
  ];

  return (
    <WithNav tab="kitchen" go={go} t={t}>
      <OrgBlob x={-40} y={-20} size={200} color={B.orange} opacity={0.05} blur={40} />
      {/* Header */}
      <div style={{ padding:"24px 20px 8px", position:"relative", zIndex:1 }}>
        <FadeUp delay={0}>
          <p style={{ fontSize:11, fontWeight:900, color:B.orange, textTransform:"uppercase", letterSpacing:"0.15em" }}>Our Kitchen</p>
          <h1 style={{ fontSize:28, fontWeight:900, color:t.text, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>The Heart of KOI KOI</h1>
          <p style={{ fontSize:13, color:t.muted, marginTop:4 }}>Watch your food being prepared live, meet the chef, and book a visit.</p>
        </FadeUp>
      </div>

      {/* Live Camera */}
      <div style={{ padding:"12px 20px" }}>
        <FadeUp delay={0.06}>
          <div style={{ borderRadius:24, overflow:"hidden", position:"relative", marginBottom:4 }}>
            {/* Mock camera feed */}
            <div style={{ height:200, background:"linear-gradient(135deg,#1A0A00 0%,#2D1500 50%,#1A0A00 100%)", position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <div style={{ position:"absolute", inset:0, backgroundImage:"repeating-linear-gradient(45deg,rgba(255,165,0,0.03) 0,rgba(255,165,0,0.03) 1px,transparent 1px,transparent 20px)" }} />
              {liveOn ? (
                <div style={{ textAlign:"center" }}>
                  <motion.div animate={{ opacity:[0.6,1,0.6] }} transition={{ duration:2, repeat:Infinity }}>
                    <Flame size={40} color={B.orange} />
                  </motion.div>
                  <p style={{ color:"rgba(255,255,255,0.6)", fontSize:12, marginTop:8 }}>Live from the kitchen</p>
                </div>
              ) : (
                <div style={{ textAlign:"center" }}>
                  <Camera size={32} color="rgba(255,255,255,0.3)" />
                  <p style={{ color:"rgba(255,255,255,0.3)", fontSize:12, marginTop:8 }}>Camera off</p>
                </div>
              )}
              {/* Badges */}
              <div style={{ position:"absolute", top:12, left:12, display:"flex", gap:8 }}>
                {liveOn && (
                  <div style={{ display:"flex", alignItems:"center", gap:5, background:"rgba(239,68,68,0.9)", borderRadius:8, padding:"4px 10px" }}>
                    <PulsingDot color="white" size={7} />
                    <span style={{ fontSize:10, fontWeight:900, color:"white" }}>LIVE</span>
                  </div>
                )}
                <div style={{ background:"rgba(0,0,0,0.6)", borderRadius:8, padding:"4px 10px" }}>
                  <span style={{ fontSize:9, color:"rgba(255,255,255,0.8)" }}>Kitchen Cam 1</span>
                </div>
              </div>
              <motion.button whileTap={{ scale:0.9 }} onClick={()=>setLiveOn(!liveOn)}
                style={{ position:"absolute", top:12, right:12, width:36, height:36, borderRadius:10, background:liveOn?"rgba(239,68,68,0.9)":"rgba(255,255,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center", border:"none", cursor:"pointer" }}>
                {liveOn?<Video size={15} color="white"/>:<Camera size={15} color="white"/>}
              </motion.button>
            </div>
            {/* Camera info strip */}
            <div style={{ background:t.card, padding:"12px 16px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div>
                <p style={{ fontSize:13, fontWeight:700, color:t.text }}>Live Kitchen Feed</p>
                <p style={{ fontSize:11, color:t.muted }}>Working hours: 5 AM – 2 PM</p>
              </div>
              <div style={{ display:"flex", gap:6 }}>
                {["Cam 1","Cam 2","Cam 3"].map((c,i)=>(
                  <button key={c} style={{ fontSize:9, fontWeight:700, padding:"4px 8px", borderRadius:8, background:i===0?B.orange:t.surface, color:i===0?"white":t.muted, border:"none", cursor:"pointer" }}>{c}</button>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>
      </div>

      {/* Cooking Process Timeline */}
      <div style={{ padding:"0 20px 4px" }}>
        <FadeUp delay={0.09}>
          <div style={{ background:t.card, borderRadius:24, padding:20, boxShadow:"0 2px 20px rgba(0,0,0,0.06)" }}>
            <p style={{ fontSize:11, fontWeight:900, color:t.muted, textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:16 }}>Today's Cooking Schedule</p>
            {process.map((p,i)=>(
              <div key={p.label} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:i<process.length-1?14:0 }}>
                <div style={{ position:"relative", display:"flex", flexDirection:"column", alignItems:"center" }}>
                  <div style={{ width:32, height:32, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", background:p.done?B.green+"20":p.active?B.orange+"20":t.surface }}>
                    {p.icon}
                  </div>
                  {i<process.length-1 && <div style={{ width:2, height:14, background:p.done?B.green:t.border, marginTop:4 }} />}
                </div>
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:13, fontWeight:700, color:p.active?B.orange:p.done?t.sub:t.muted }}>{p.label}</p>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                  {p.active && <PulsingDot color={B.orange} size={7} />}
                  <span style={{ fontSize:11, fontWeight:600, color:p.active?B.orange:t.muted }}>{p.time}</span>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>

      {/* Meet the Chef */}
      <div style={{ padding:"12px 20px 4px" }}>
        <FadeUp delay={0.12}>
          <div style={{ background:`linear-gradient(135deg,${B.orangeL},${B.orangeM})`, borderRadius:24, padding:20, position:"relative", overflow:"hidden" }}>
            <OrgBlob x="65%" y={-20} size={120} color={B.orange} opacity={0.12} blur={20} />
            <div style={{ display:"flex", gap:14, alignItems:"center", position:"relative", zIndex:1 }}>
              <div style={{ width:64, height:64, borderRadius:20, background:B.orange, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow:`0 8px 24px ${B.orange}45` }}>
                <ChefHat size={32} color="white" />
              </div>
              <div>
                <p style={{ fontSize:10, fontWeight:900, color:B.orange, textTransform:"uppercase", letterSpacing:"0.1em" }}>Head Chef</p>
                <p style={{ fontSize:18, fontWeight:900, color:"#1A1A1A", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Amrita Reddy</p>
                <p style={{ fontSize:12, color:"#666" }}>12 years · Hyderabad & Bengaluru</p>
                <div style={{ display:"flex", gap:12, marginTop:6 }}>
                  <span style={{ fontSize:11, fontWeight:700, color:B.orange }}>★ 4.9</span>
                  <span style={{ fontSize:11, color:"#666" }}>South Indian Specialist</span>
                </div>
              </div>
            </div>
            <p style={{ fontSize:12, color:"#4A4A4A", marginTop:14, lineHeight:1.6, fontFamily:"'Inter',sans-serif", position:"relative", zIndex:1 }}>
              "I cook every meal like it's for my own family. No shortcuts, no MSG — only honest, home-style cooking with the best local ingredients."
            </p>
          </div>
        </FadeUp>
      </div>

      {/* Certifications */}
      <div style={{ padding:"12px 20px 4px" }}>
        <FadeUp delay={0.14}>
          <div style={{ background:t.card, borderRadius:24, padding:20, boxShadow:"0 2px 20px rgba(0,0,0,0.06)" }}>
            <p style={{ fontSize:11, fontWeight:900, color:t.muted, textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:14 }}>Certifications & Hygiene</p>
            {certs.map((c,i,a)=>(
              <div key={c.label} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 0", borderBottom:i<a.length-1?`1px solid ${t.border}`:"none" }}>
                <div style={{ width:36, height:36, borderRadius:12, background:t.surface, display:"flex", alignItems:"center", justifyContent:"center" }}>{c.icon}</div>
                <div>
                  <p style={{ fontSize:13, fontWeight:700, color:t.text }}>{c.label}</p>
                  <p style={{ fontSize:11, color:t.muted }}>{c.num}</p>
                </div>
                <Check size={14} color={B.green} style={{ marginLeft:"auto" }} />
              </div>
            ))}
          </div>
        </FadeUp>
      </div>

      {/* Daily Cleaning Status */}
      <div style={{ padding:"12px 20px 4px" }}>
        <FadeUp delay={0.16}>
          <div style={{ background:B.green+"12", borderRadius:24, padding:20, border:`1.5px solid ${B.green}30` }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
              <ShieldCheck size={22} color={B.green} />
              <p style={{ fontSize:14, fontWeight:900, color:t.text }}>Daily Cleaning Log</p>
              <span style={{ marginLeft:"auto", fontSize:10, fontWeight:900, background:B.green, color:"white", padding:"2px 8px", borderRadius:6 }}>TODAY ✓</span>
            </div>
            {["Floor & surfaces sanitised","Equipment deep-cleaned","Pest control inspection","Cold storage checked","Team health screening"].map((item,i)=>(
              <div key={item} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:i<4?8:0 }}>
                <Check size={12} color={B.green} />
                <span style={{ fontSize:12, color:t.sub }}>{item}</span>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>

      {/* Book a Kitchen Visit */}
      <div style={{ padding:"12px 20px 8px" }}>
        <FadeUp delay={0.18}>
          {!bookOpen && !bookSent ? (
            <motion.button whileTap={{ scale:0.98 }} onClick={()=>setBookOpen(true)}
              style={{ width:"100%", borderRadius:24, padding:20, background:`linear-gradient(135deg,#0F2027,#203A43,#2C5364)`, border:"none", cursor:"pointer", textAlign:"left", position:"relative", overflow:"hidden" }}>
              <OrgBlob x="65%" y={-20} size={120} color="#60A5FA" opacity={0.12} blur={20} />
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12, position:"relative", zIndex:1 }}>
                <div style={{ width:44, height:44, borderRadius:14, background:"rgba(255,255,255,0.15)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Users size={22} color="white" />
                </div>
                <div>
                  <p style={{ fontSize:11, fontWeight:900, color:"rgba(255,255,255,0.6)", textTransform:"uppercase", letterSpacing:"0.1em" }}>Open Invitation</p>
                  <p style={{ fontSize:18, fontWeight:900, color:"white", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Visit Our Kitchen</p>
                </div>
              </div>
              <p style={{ fontSize:12, color:"rgba(255,255,255,0.65)", lineHeight:1.6, position:"relative", zIndex:1 }}>See exactly how your food is made. Book a free kitchen tour and meet the chef in person.</p>
              <div style={{ display:"flex", gap:8, marginTop:14, position:"relative", zIndex:1 }}>
                <span style={{ fontSize:11, fontWeight:700, background:"rgba(255,255,255,0.15)", color:"white", padding:"6px 14px", borderRadius:10 }}>Book a Tour →</span>
              </div>
            </motion.button>
          ) : bookSent ? (
            <div style={{ background:t.card, borderRadius:24, padding:24, textAlign:"center", boxShadow:"0 2px 20px rgba(0,0,0,0.06)" }}>
              <SuccessCheck size={60} color={B.green} />
              <p style={{ fontSize:18, fontWeight:900, color:t.text, marginTop:12 }}>Visit Booked!</p>
              <p style={{ fontSize:13, color:t.muted, marginTop:4 }}>We'll confirm via WhatsApp within 24 hours.</p>
            </div>
          ) : (
            <div style={{ background:t.card, borderRadius:24, padding:20, boxShadow:"0 2px 20px rgba(0,0,0,0.06)" }}>
              <p style={{ fontSize:16, fontWeight:900, color:t.text, marginBottom:16 }}>Book a Kitchen Visit</p>
              {[{l:"Preferred Date",p:"e.g. 15 Aug 2026"},{l:"Preferred Time",p:"e.g. 10:00 AM"},{l:"Number of Visitors",p:"e.g. 2"},{l:"Your Name",p:"Full name"},{l:"Contact Number",p:"+91 ..."},{l:"Purpose",p:"e.g. Curiosity / Inspection / Media"}].map(f=>(
                <div key={f.l} style={{ marginBottom:12 }}>
                  <p style={{ fontSize:11, fontWeight:900, color:t.muted, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:4 }}>{f.l}</p>
                  <input placeholder={f.p} style={{ width:"100%", padding:"12px 16px", borderRadius:14, border:`1.5px solid ${t.border}`, background:t.input, color:t.text, fontSize:14, outline:"none", boxSizing:"border-box" }} />
                </div>
              ))}
              <div style={{ display:"flex", gap:10, marginTop:16 }}>
                <button onClick={()=>setBookOpen(false)} style={{ flex:1, padding:"14px 0", borderRadius:16, border:`1.5px solid ${t.border}`, background:"none", color:t.muted, fontWeight:700, cursor:"pointer" }}>Cancel</button>
                <motion.button whileTap={{ scale:0.97 }} onClick={()=>setBookSent(true)} style={{ flex:2, padding:"14px 0", borderRadius:16, border:"none", background:B.orange, color:"white", fontWeight:900, cursor:"pointer", boxShadow:`0 6px 20px ${B.orange}40` }}>Confirm Booking</motion.button>
              </div>
            </div>
          )}
        </FadeUp>
      </div>
    </WithNav>
  );
}

// ─── OLD SETUP 4 placeholder kept for router (removes from type) ───────────────

// Step 4 — Subscription Preference (REMOVED — kept as dead code boundary)

// ─── Screen Router ────────────────────────────────────────────────────────────

function ScreenContent({
  screen, go, back, t, theme, setTheme, paused, setPaused, user, setUser, subscribed, setSubscribed,
  mealsList, setMealsList, selectedMealId, setSelectedMealId
}: {
  screen:Screen; go:(s:Screen)=>void; back:()=>void;
  t:T; theme:AppTheme; setTheme:(v:AppTheme)=>void;
  paused:boolean; setPaused:(v:boolean)=>void;
  user:any; setUser:(u:any)=>void;
  subscribed:boolean; setSubscribed:(s:boolean)=>void;
  mealsList:Meal[]; setMealsList:React.Dispatch<React.SetStateAction<Meal[]>>;
  selectedMealId:number; setSelectedMealId:(id:number)=>void;
}) {
  const map: Record<Screen,React.ReactNode> = {
    splash:<Splash go={go} t={t} />,
    ob1:<OB go={go} step={0} Ill={IllDelivery} head="Healthy Home-Style Meals" body="Freshly prepared lunch and dinner cooked every day — delivered warm to your doorstep." cta="Get Started" t={t} />,
    ob2:<OB go={go} step={1} Ill={IllDabba} head="Fresh Food. Steel Dabbas." body="Hygienic meals in reusable steel containers. Zero plastic, maximum freshness, right on time every day." cta="Continue" t={t} />,
    ob3:<OB go={go} step={2} Ill={IllFamily} head="Subscribe Once. Eat Every Day." body="Choose your plan and relax. Pause, skip or resume anytime — complete flexibility, zero stress." cta="Let's Begin" t={t} />,
    auth:<Auth go={go} t={t} setUser={setUser} setSubscribed={setSubscribed} />,
    setup1:<Setup1 go={go} back={back} t={t} user={user} setUser={setUser} />,
    setup2:<Setup2 go={go} back={back} t={t} user={user} setUser={setUser} />,
    setup3:<Setup3 go={go} back={back} t={t} user={user} setUser={setUser} />,
    home:<HomeScreen go={go} t={t} paused={paused} setPaused={setPaused} subscribed={subscribed} setSubscribed={setSubscribed} user={user} mealsList={mealsList} setSelectedMealId={setSelectedMealId} />,
    meals:<Meals go={go} t={t} mealsList={mealsList} selectedMealId={selectedMealId} setSelectedMealId={setSelectedMealId} />,
    kitchen:<KitchenScreen go={go} t={t} />,
    profile:<ProfileScreen go={go} t={t} user={user} setUser={setUser} subscribed={subscribed} setSubscribed={setSubscribed} />,
    meal_detail:<MealDetailScreen go={go} back={back} t={t} mealsList={mealsList} setMealsList={setMealsList} selectedMealId={selectedMealId} />,
    subscribe_flow:<SubscribeFlow go={go} back={back} t={t} />,
    notifications:<Notifications back={back} t={t} />,
    tracking:<Tracking back={back} t={t} />,
    offers:<Offers back={back} t={t} />,
    rewards:<Rewards back={back} t={t} />,
    appearance:<Appearance back={back} t={t} theme={theme} setTheme={setTheme} />,
    support:<Support back={back} t={t} />,
    addresses:<Addresses back={back} t={t} />,
    payments:<Payments back={back} t={t} />,
    personal:<Personal back={back} t={t} user={user} setUser={setUser} />,
    health_info:<HealthInfoScreen back={back} t={t} user={user} setUser={setUser} />,
    refer:<Refer back={back} t={t} />,
    plans:<Plans go={go} t={t} user={user} setUser={setUser} subscribed={subscribed} setSubscribed={setSubscribed} paused={paused} setPaused={setPaused} />,
  };
  return (
    <AnimatePresence mode="wait">
      <motion.div key={screen} style={{ flex:1, minHeight:0, display:"flex", flexDirection:"column" }}
        initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-6 }}
        transition={{ duration:0.2, ease:[0.25,0.1,0.25,1] }}>
        {map[screen]}
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Phone Frame ─────────────────────────────────────────────────────────────

function PhoneFrame({ ios, screen, go, back, t, theme, setTheme, paused, setPaused, user, setUser, subscribed, setSubscribed, mealsList, setMealsList, selectedMealId, setSelectedMealId }: any) {
  const cfg = ios
    ? { w:314, h:664, br:52, inner:49, sbH:44, sbBg:"#1C1C1E", shell:"0 32px 100px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)" }
    : { w:314, h:664, br:44, inner:41, sbH:40, sbBg:"#0F0F0F", shell:"0 32px 100px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)" };
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1.5 h-1.5 rounded-full" style={{ background:ios?"#888":"#444" }} />
        <p className="text-[10px] font-black uppercase tracking-widest" style={{ color:"#6B7280" }}>
          {ios?"iOS · iPhone 16 Pro":"Android · Pixel 9 Pro"}
        </p>
      </div>
      <div style={{ width:cfg.w, height:cfg.h, background:cfg.sbBg, borderRadius:cfg.br, padding:3, boxShadow:cfg.shell }}>
        <div style={{ height:"100%", borderRadius:cfg.inner, background:t.bg, overflow:"hidden", display:"flex", flexDirection:"column" }}>
          {/* Status bar */}
          <div style={{ height:cfg.sbH, background:"transparent", display:"flex", alignItems:"center", justifyContent:"space-between", padding:ios?"8px 20px 0":"6px 16px 0", flexShrink:0, position:"relative", zIndex:20 }}>
            <span style={{ fontSize:11, fontWeight:700, color:t.text, fontFamily:ios?"'Plus Jakarta Sans',sans-serif":"'Roboto',sans-serif" }}>9:41</span>
            {ios
              ? <div style={{ position:"absolute", left:"50%", transform:"translateX(-50%)", top:8, width:100, height:30, borderRadius:15, background:"#000" }} />
              : <div style={{ position:"absolute", left:"50%", transform:"translateX(-50%)", top:8, width:14, height:14, borderRadius:"50%", background:"#000" }} />}
            <div style={{ display:"flex", alignItems:"center", gap:4 }}>
              {ios
                ? <div style={{ width:22,height:11,borderRadius:3,border:`1.5px solid ${t.muted}`,padding:1,opacity:0.75 }}>
                    <div style={{ height:"100%",borderRadius:2,width:"75%",background:B.green }} />
                  </div>
                : <span style={{ fontSize:9,color:t.muted,opacity:0.8 }}>●●▲</span>}
            </div>
          </div>
          {/* Content */}
          <div style={{ flex:1, minHeight:0, overflow:"hidden", display:"flex", flexDirection:"column", fontFamily:ios?"'Inter','SF Pro Display',sans-serif":"'Roboto',sans-serif", position:"relative" }}>
            <ScreenContent screen={screen} go={go} back={back} t={t} theme={theme} setTheme={setTheme} paused={paused} setPaused={setPaused} user={user} setUser={setUser} subscribed={subscribed} setSubscribed={setSubscribed} mealsList={mealsList} setMealsList={setMealsList} selectedMealId={selectedMealId} setSelectedMealId={setSelectedMealId} />
          </div>
          {/* Bottom chrome */}
          {ios
            ? <div style={{ display:"flex",justifyContent:"center",padding:"5px 0 8px",background:t.nav,backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",flexShrink:0 }}>
                <div style={{ width:120,height:4,borderRadius:2,background:t.muted,opacity:0.25 }} />
              </div>
            : <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:28,padding:"7px 0",background:t.nav,backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",flexShrink:0 }}>
                {["◀","⬤","■"].map(s=><span key={s} style={{ fontSize:11,opacity:0.22,color:t.text }}>{s}</span>)}
              </div>}
        </div>
      </div>
    </div>
  );
}

// ─── Nav Groups ───────────────────────────────────────────────────────────────

const GROUPS = [
  { label:"Flow", screens:["splash","ob1","ob2","ob3","auth"] as Screen[] },
  { label:"Setup", screens:["setup1","setup2","setup3"] as Screen[] },
  { label:"Main", screens:["home","meals","kitchen","profile"] as Screen[] },
  { label:"Meals", screens:["meal_detail","subscribe_flow"] as Screen[] },
  { label:"Sections", screens:["notifications","tracking","offers","rewards"] as Screen[] },
  { label:"Profile", screens:["appearance","support","addresses","payments","personal","refer"] as Screen[] },
];
const LABELS: Partial<Record<Screen,string>> = {
  splash:"Splash",ob1:"OB 1",ob2:"OB 2",ob3:"OB 3",auth:"Login",
  setup1:"Profile",setup2:"Location",setup3:"Health",
  home:"Home",meals:"Meals",kitchen:"Kitchen",profile:"Profile",
  meal_detail:"Meal",subscribe_flow:"Subscribe",
  notifications:"Notifs",tracking:"Track",offers:"Offers",rewards:"Rewards",
  appearance:"Theme",support:"Support",addresses:"Address",payments:"Payments",personal:"Info",refer:"Refer",
  plans:"Plans",
};
const ALL = GROUPS.flatMap(g=>g.screens);

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [history, setHistory] = useState<Screen[]>(["splash"]);
  const [appTheme, setAppTheme] = useState<AppTheme>("light");
  const [platform, setPlatform] = useState<"both"|"ios"|"android">("both");
  const [paused, setPaused] = useState(false);
  const [mealsList, setMealsList] = useState<Meal[]>(MEALS);
  const [selectedMealId, setSelectedMealId] = useState<number>(1);
  const [user, setUser] = useState({
    name: "Bhargav",
    email: "bhargav.s@gmail.com",
    phone: "+91 98765 43210",
    dob: "1995-08-15",
    gender: "Male",
    avatar: "B",
    foodPref: "Veg",
    
    // Address fields
    addressMode: "manual" as "detect" | "manual" | null,
    houseNo: "Plot 42, Jubilee Hills",
    society: "Park View Residency",
    street: "Road No 3",
    landmark: "Near KBR Park",
    area: "Jubilee Hills",
    city: "Hyderabad",
    pincode: "500033",
    addressType: "Home",
    deliveryInstructions: "Leave with security guard inside steel box.",
    
    // Health / Nutrition fields
    height: "178",
    weight: "74",
    activity: 1, // 1 = Lightly Active
    goal: 4, // 4 = Healthy Lifestyle
    food: 0, // 0 = Veg
    cuisines: [0, 2] as number[],
    allergies: "None",
    spice: 1, // 1 = Medium
  });
  const [subscribed, setSubscribed] = useState(true);

  const screen = history[history.length-1];
  const go = (s:Screen)=>setHistory(h=>[...h,s]);
  const back = ()=>setHistory(h=>h.length>1?h.slice(0,-1):h);
  const jump = (s:Screen)=>setHistory([s]);

  const isDark = appTheme==="dark";
  const t = isDark ? DARK : LIGHT;

  return (
    <div className="min-h-screen" style={{ background:isDark?"#050505":"#EDE8DF", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
      {/* Showcase Header */}
      <div className="sticky top-0 z-30 border-b"
        style={{ background:isDark?"rgba(5,5,5,0.96)":"rgba(237,232,223,0.96)", backdropFilter:"blur(20px)", borderColor:isDark?"#1C1C1C":"#D9D0C2" }}>
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[14px] flex items-center justify-center" style={{ background:B.orange }}>
              <Package size={18} color="white" />
            </div>
            <div>
              <p className="text-[8px] font-black tracking-[0.35em] uppercase" style={{ color:B.orange }}>KOI KOI</p>
              <p className="text-[14px] font-black leading-none" style={{ color:isDark?"#F5F5F5":"#1A1A1A" }}>DABBA</p>
            </div>
          </div>
          <div className="flex items-center gap-1 p-1 rounded-[16px]" style={{ background:isDark?"#1C1C1C":"rgba(255,255,255,0.6)" }}>
            {(["both","ios","android"] as const).map(p=>(
              <motion.button key={p} onClick={()=>setPlatform(p)} whileTap={{ scale:0.94 }}
                className="px-3 py-1.5 rounded-[12px] text-[11px] font-bold transition-all"
                style={{ background:platform===p?B.orange:"transparent", color:platform===p?"white":isDark?"#555":"#888" }}>
                {p==="both"?"Both":p==="ios"?"iOS":"Android"}
              </motion.button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <motion.button whileTap={{ scale:0.9 }} onClick={()=>setAppTheme(isDark?"light":"dark")}
              className="w-9 h-9 rounded-[12px] flex items-center justify-center"
              style={{ background:isDark?"#1C1C1C":"rgba(255,255,255,0.7)" }}>
              {isDark?<Sun size={16} color="#F59E0B"/>:<Moon size={16} color="#6366F1"/>}
            </motion.button>
            <p className="text-[10px] font-semibold hidden sm:block" style={{ color:isDark?"#444":"#999" }}>
              v4.0 · {ALL.length} screens
            </p>
          </div>
        </div>
      </div>

      {/* Screen Nav */}
      <div className="overflow-x-auto border-b" style={{ background:isDark?"rgba(5,5,5,0.7)":"rgba(237,232,223,0.7)", borderColor:isDark?"#1C1C1C":"#D9D0C2" }}>
        <div className="flex items-center px-4 py-2 min-w-max gap-0">
          {GROUPS.map((grp,gi)=>(
            <div key={grp.label} className="flex items-center">
              {gi>0&&<div className="w-px h-4 mx-3" style={{ background:isDark?"#1C1C1C":"#D9D0C2" }} />}
              <div className="flex items-center gap-0.5">
                <span className="text-[8px] font-black uppercase tracking-[0.2em] mr-1.5 pl-1" style={{ color:isDark?"#2A2A2A":"#AAA099" }}>{grp.label}</span>
                {grp.screens.map(s=>(
                  <button key={s} onClick={()=>jump(s)}
                    className="px-2.5 py-1.5 rounded-[10px] text-[10px] font-bold whitespace-nowrap"
                    style={{ background:screen===s?B.orange:"transparent", color:screen===s?"white":isDark?"#555":"#888" }}>
                    {LABELS[s]||s}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Phones */}
      <div className="py-12 px-4">
        <div className="flex justify-center gap-8 flex-wrap">
          {(platform==="both"||platform==="ios") && (
            <PhoneFrame ios screen={screen} go={go} back={back} t={t} theme={appTheme} setTheme={(v:AppTheme)=>setAppTheme(v)} paused={paused} setPaused={setPaused} user={user} setUser={setUser} subscribed={subscribed} setSubscribed={setSubscribed} mealsList={mealsList} setMealsList={setMealsList} selectedMealId={selectedMealId} setSelectedMealId={setSelectedMealId} />
          )}
          {(platform==="both"||platform==="android") && (
            <PhoneFrame ios={false} screen={screen} go={go} back={back} t={t} theme={appTheme} setTheme={(v:AppTheme)=>setAppTheme(v)} paused={paused} setPaused={setPaused} user={user} setUser={setUser} subscribed={subscribed} setSubscribed={setSubscribed} mealsList={mealsList} setMealsList={setMealsList} selectedMealId={selectedMealId} setSelectedMealId={setSelectedMealId} />
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <motion.button whileTap={{ scale:0.92 }} onClick={back}
            className="w-10 h-10 rounded-full flex items-center justify-center border-2 font-bold text-sm"
            style={{ borderColor:history.length<=1?(isDark?"#1C1C1C":"#D9D0C2"):B.orange, color:history.length<=1?(isDark?"#333":"#CCC"):B.orange, opacity:history.length<=1?0.4:1 }}>←</motion.button>
          <div className="flex gap-1.5 flex-wrap justify-center max-w-sm">
            {ALL.map(s=>(
              <motion.button key={s} onClick={()=>jump(s)}
                animate={{ width:screen===s?18:5, opacity:screen===s?1:0.2 }}
                transition={{ type:"spring", stiffness:400, damping:30 }}
                className="h-1.5 rounded-full" style={{ background:B.orange }} />
            ))}
          </div>
          <motion.button whileTap={{ scale:0.92 }}
            onClick={()=>{ const i=ALL.indexOf(screen); if(i<ALL.length-1) go(ALL[i+1]); }}
            className="w-10 h-10 rounded-full flex items-center justify-center border-2 font-bold text-sm"
            style={{ borderColor:ALL.indexOf(screen)>=ALL.length-1?(isDark?"#1C1C1C":"#D9D0C2"):B.orange, color:ALL.indexOf(screen)>=ALL.length-1?(isDark?"#333":"#CCC"):B.orange, opacity:ALL.indexOf(screen)>=ALL.length-1?0.4:1 }}>→</motion.button>
        </div>
        <p className="text-center text-[11px] mt-3" style={{ color:isDark?"#2A2A2A":"#AAA099" }}>
          {ALL.length} screens · Click inside phones to navigate · Toggle {isDark?"☀️":"🌙"} to switch theme
        </p>
      </div>

      {/* Design tokens */}
      <div className="border-t py-16 px-8 max-w-5xl mx-auto" style={{ borderColor:isDark?"#1C1C1C":"#D9D0C2" }}>
        <p className="text-[10px] font-black uppercase tracking-[0.25em] mb-1" style={{ color:B.orange }}>Design System</p>
        <h2 className="text-[30px] font-black mb-8" style={{ color:isDark?"#F5F5F5":"#1A1A1A", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>KOI KOI DABBA · v4.0</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-10">
          {[{n:"Orange",h:"#E67E22",bg:"#E67E22"},{n:"Cream",h:"#FAFAF8",bg:"#FAFAF8"},{n:"Green",h:"#22C55E",bg:"#22C55E"},{n:"Dark",h:"#1A1A1A",bg:"#1A1A1A"},{n:"Muted",h:"#999999",bg:"#999999"},{n:"Deep Dark",h:"#0E0E0E",bg:"#0E0E0E"}].map(c=>(
            <div key={c.n}>
              <div className="h-14 rounded-[18px] mb-2" style={{ background:c.bg, border:c.h==="#FAFAF8"?"1.5px solid #E5E0D8":undefined }} />
              <p className="text-[11px] font-bold" style={{ color:isDark?"#F5F5F5":"#1A1A1A" }}>{c.n}</p>
              <p className="text-[10px] font-mono" style={{ color:isDark?"#444":"#999" }}>{c.h}</p>
            </div>
          ))}
        </div>
        <div className="p-6 rounded-[24px]" style={{ background:isDark?"#1C1C1C":"#FFFFFF" }}>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-5" style={{ color:isDark?"#333":"#CCC" }}>Animation Tokens</p>
          <div className="grid grid-cols-2 gap-4 text-[12px]" style={{ color:isDark?"#888":"#888" }}>
            {[["Page transition","opacity + y:8, 200ms"],["Card tap","scale 0.97, spring"],["Float","y:±7px, 3.8s loop"],["Shimmer","100% → 200%, 1.6s"],["Progress ring","1.5s spring, delay 0.3s"],["Success check","pathLength, 0.45s"]].map(([l,v])=>(
              <div key={l}>
                <p className="font-bold" style={{ color:isDark?"#F5F5F5":"#1A1A1A" }}>{l}</p>
                <p className="font-mono text-[10px] mt-0.5">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
