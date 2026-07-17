import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppContext } from '../../app/context';

import HomeScreen from '../screens/HomeScreen';
import TokensScreen from '../screens/TokensScreen';
import TypographyScreen from '../screens/TypographyScreen';
import ComponentsScreen from '../screens/ComponentsScreen';
import MotionScreen from '../screens/MotionScreen';
import AccessibilityScreen from '../screens/AccessibilityScreen';
import StorageScreen from '../screens/StorageScreen';
import NetworkScreen from '../screens/NetworkScreen';
import FeatureFlagsScreen from '../screens/FeatureFlagsScreen';
import ApiPlaygroundScreen from '../screens/ApiPlaygroundScreen';
import DeviceInfoScreen from '../screens/DeviceInfoScreen';
import BuildInfoScreen from '../screens/BuildInfoScreen';
import IconGalleryScreen from '../screens/IconGalleryScreen';
import ChangelogScreen from '../screens/ChangelogScreen';

export type DevScreenType =
  | 'home'
  | 'tokens'
  | 'typography'
  | 'components'
  | 'motion'
  | 'accessibility'
  | 'storage'
  | 'network'
  | 'flags'
  | 'api_playground'
  | 'device_info'
  | 'build_info'
  | 'icon_gallery'
  | 'changelog';

export function DeveloperNavigator() {
  const [currentDevScreen, setCurrentDevScreen] = useState<DevScreenType>('home');
  const { back, t } = useAppContext();

  const handleBack = () => {
    if (currentDevScreen === 'home') {
      back();
    } else {
      setCurrentDevScreen('home');
    }
  };

  const navigate = (screen: DevScreenType) => {
    setCurrentDevScreen(screen);
  };

  const renderContent = () => {
    switch (currentDevScreen) {
      case 'home':
        return <HomeScreen navigate={navigate} onClose={handleBack} />;
      case 'tokens':
        return <TokensScreen onBack={handleBack} />;
      case 'typography':
        return <TypographyScreen onBack={handleBack} />;
      case 'components':
        return <ComponentsScreen onBack={handleBack} />;
      case 'motion':
        return <MotionScreen onBack={handleBack} />;
      case 'accessibility':
        return <AccessibilityScreen onBack={handleBack} />;
      case 'storage':
        return <StorageScreen onBack={handleBack} />;
      case 'network':
        return <NetworkScreen onBack={handleBack} />;
      case 'flags':
        return <FeatureFlagsScreen onBack={handleBack} />;
      case 'api_playground':
        return <ApiPlaygroundScreen onBack={handleBack} />;
      case 'device_info':
        return <DeviceInfoScreen onBack={handleBack} />;
      case 'build_info':
        return <BuildInfoScreen onBack={handleBack} />;
      case 'icon_gallery':
        return <IconGalleryScreen onBack={handleBack} />;
      case 'changelog':
        return <ChangelogScreen onBack={handleBack} />;
      default:
        return <HomeScreen navigate={navigate} onClose={handleBack} />;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: t.bg }]}>
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
