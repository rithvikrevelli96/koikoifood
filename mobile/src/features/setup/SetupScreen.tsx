import React from 'react';
import { useAppContext } from '../../app/context';
import { SetupStep1 } from './components/SetupStep1';
import { SetupStep2 } from './components/SetupStep2';
import { SetupStep3 } from './components/SetupStep3';

export default function SetupScreen() {
  const { currentScreen } = useAppContext();

  if (currentScreen === 'setup1') {
    return <SetupStep1 />;
  }
  if (currentScreen === 'setup2') {
    return <SetupStep2 />;
  }
  return <SetupStep3 />;
}
