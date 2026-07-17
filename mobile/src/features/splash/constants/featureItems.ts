import { Leaf, ChefHat, Heart, Users } from 'lucide-react-native';
import { FeatureItem } from '../types/splash';
import { theme } from '../../../design-system';

export const SPLASH_FEATURES: FeatureItem[] = [
  {
    id: 'natural',
    icon: Leaf,
    title: 'No Preservatives',
    subtitle: '100% Natural',
    accentColor: theme.colors.primary,
    analyticsEvent: 'Splash Feature View - 100% Natural',
    accessibilityLabel: 'No Preservatives: 100% Natural',
  },
  {
    id: 'hygienic',
    icon: ChefHat,
    title: 'Hygienic Kitchen',
    subtitle: 'Fresh Everyday',
    accentColor: theme.colors.primary,
    analyticsEvent: 'Splash Feature View - Hygienic Kitchen',
    accessibilityLabel: 'Hygienic Kitchen: Fresh Everyday',
  },
  {
    id: 'love',
    icon: Heart,
    title: 'Made with Love',
    subtitle: 'Home Style',
    accentColor: theme.colors.secondary,
    analyticsEvent: 'Splash Feature View - Made with Love',
    accessibilityLabel: 'Made with Love: Home Style',
  },
  {
    id: 'trusted',
    icon: Users,
    title: 'Trusted',
    subtitle: '10K+ Families',
    accentColor: theme.colors.accent,
    analyticsEvent: 'Splash Feature View - Trusted Families',
    accessibilityLabel: 'Trusted: 10K+ Families',
  },
];
