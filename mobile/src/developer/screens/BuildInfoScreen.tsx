import React from 'react';
import DeviceInfoScreen from './DeviceInfoScreen';

interface BuildInfoScreenProps {
  onBack: () => void;
}

export default function BuildInfoScreen({ onBack }: BuildInfoScreenProps) {
  return <DeviceInfoScreen onBack={onBack} />;
}
