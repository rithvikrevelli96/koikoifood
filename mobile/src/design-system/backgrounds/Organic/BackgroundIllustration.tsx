import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { organicBackgroundAssets } from './assets';

export type BackgroundVariant = 
  | 'clean' 
  | 'minimal' 
  | 'organic' 
  | 'celebration' 
  | 'default' 
  | 'auth' 
  | 'dashboard' 
  | 'onboarding' 
  | 'fullscreen';

export type BackgroundDensity = 'none' | 'light' | 'medium' | 'full';

interface BackgroundIllustrationProps {
  variant?: BackgroundVariant;
  density?: BackgroundDensity;
  animated?: boolean;
  isDark?: boolean;
  artwork?: any;
}

export const BackgroundIllustration = React.memo(({
  variant = 'default',
  isDark = false,
  artwork,
}: BackgroundIllustrationProps) => {
  // Normalize variants to the 4 design-system level standards
  let resolvedVariant: 'clean' | 'minimal' | 'organic' | 'celebration' = 'clean';
  
  if (variant === 'clean' || variant === 'minimal' || variant === 'organic' || variant === 'celebration') {
    resolvedVariant = variant;
  } else {
    // Backwards compatibility mappings for older layouts
    switch (variant) {
      case 'dashboard':
        resolvedVariant = 'minimal'; // Dashboard uses Level 2 (Minimal Organic)
        break;
      case 'auth':
      case 'fullscreen':
      case 'default':
        resolvedVariant = 'organic'; // Auth/Entry points use Level 3 (Warm Organic)
        break;
      case 'onboarding':
        resolvedVariant = 'celebration'; // Onboarding flows use Level 4 (Celebration)
        break;
      default:
        resolvedVariant = 'clean';
    }
  }

  const bgColor = isDark ? '#1A1815' : '#FCFAF6';

  return (
    <View style={[StyleSheet.absoluteFillObject, { backgroundColor: bgColor }]} pointerEvents="none">
      {/* Level 2 — Minimal Organic: 2-3% opacity texture for subtle branding */}
      {resolvedVariant === 'minimal' && (
        <Image
          source={organicBackgroundAssets.minimal}
          style={[StyleSheet.absoluteFillObject, { opacity: isDark ? 0.05 : 0.03 }]}
          resizeMode="cover"
        />
      )}
      
      {/* Level 3 — Warm Organic: full illustrations for entry emotional screens */}
      {resolvedVariant === 'organic' && (
        <Image
          source={artwork || organicBackgroundAssets.auth}
          style={[StyleSheet.absoluteFillObject, { opacity: isDark ? 0.15 : 1.0 }]}
          resizeMode="cover"
        />
      )}
      
      {/* Level 4 — Celebration: rich graphics for milestones */}
      {resolvedVariant === 'celebration' && (
        <Image
          source={artwork || organicBackgroundAssets.onboarding}
          style={[StyleSheet.absoluteFillObject, { opacity: isDark ? 0.2 : 1.0 }]}
          resizeMode="cover"
        />
      )}
    </View>
  );
});
