export interface T {
  // Surfaces & Backgrounds
  bg: string;
  surface: string;
  card: string;
  elevated: string;
  modal: string;
  bottomSheet: string;
  overlay: string;
  backdrop: string;
  input: string;
  nav: string;
  tabBar: string;
  statusBar: string;

  // Neutrals & Typography
  text: string;
  sub: string;
  secondaryText: string;
  muted: string;
  placeholder: string;
  disabled: string;
  border: string;
  divider: string;
  shadow: string;

  // Brand & Accents
  primary: string;
  secondary: string;
  accent: string;

  // Semantics
  success: string;
  warning: string;
  error: string;
  info: string;

  // Domain Presets
  veg: { bg: string; text: string };
  nonVeg: { bg: string; text: string };
  premium: { bg: string; text: string };
  wallet: { bg: string; text: string };

  // Components & Controls
  chip: { bg: string; text: string; border: string };
  badge: { bg: string; text: string };
  progressTrack: string;
  progressFill: string;
  skeleton: string;

  // Interaction State Tokens
  states: {
    hover: string;
    pressed: string;
    focused: string;
    selected: string;
    disabled: string;
    error: string;
    success: string;
    warning: string;
  };
}

export type AppTheme = 'light' | 'dark' | 'system';


export type Screen =
  | 'splash'
  | 'ob1'
  | 'ob2'
  | 'ob3'
  | 'auth'
  | 'setup1'
  | 'setup2'
  | 'setup3'
  | 'home'
  | 'meals'
  | 'kitchen'
  | 'profile'
  | 'meal_detail'
  | 'subscribe_flow'
  | 'tour_booking'
  | 'notifications'
  | 'tracking'
  | 'offers'
  | 'rewards'
  | 'appearance'
  | 'support'
  | 'addresses'
  | 'payments'
  | 'personal'
  | 'refer'
  | 'plans'
  | 'health_info'
  | 'dev_panel'
  | 'animation_demo'
  | 'meal_pref'
  | 'finances'
  | 'family'
  | 'settings'
  | 'kitchen_ingredients'
  | 'about';

export interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  avatar: string;
  helpful: number;
}

export interface MealIngredients {
  oil: string;
  rice?: string;
  veg: string[];
  spices: string[];
  dairy?: string[];
  flour?: string;
  dal?: string;
  meat?: string;
}

export interface Meal {
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
