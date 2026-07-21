import React from 'react';
import { useAppContext } from '../../app/context';
import { SubscribedHomeScreen } from './components/SubscribedHomeScreen';
import { NewUserHomeScreen } from './components/NewUserHomeScreen';

export default function HomeScreen() {
  const { subscribed } = useAppContext();

  if (subscribed) {
    return <SubscribedHomeScreen />;
  }
  return <NewUserHomeScreen />;
}
