import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { useWallet } from './WalletContext';

interface SubscriptionContextType {
  skippedDates: string[];
  swappedMeals: Record<string, string>;
  activePlanTitle: string;
  toggleSkipDate: (dateString: string) => Promise<boolean>;
  swapMeal: (dateString: string, newMealTitle: string) => Promise<void>;
  isDateSkipped: (dateString: string) => boolean;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { creditSkippedMeal } = useWallet();
  const [skippedDates, setSkippedDates] = useState<string[]>(['2026-07-24']);
  const [swappedMeals, setSwappedMeals] = useState<Record<string, string>>({
    '2026-07-23': 'North Indian Deluxe Thali',
  });
  const [activePlanTitle] = useState<string>('Monthly Veg Plan');

  // Restore saved subscription data on mount
  useEffect(() => {
    async function loadSavedSubscription() {
      try {
        const savedData = await storage.getItem('@koikoi_subscription_data');
        if (savedData) {
          const parsed = JSON.parse(savedData);
          if (Array.isArray(parsed.skippedDates)) setSkippedDates(parsed.skippedDates);
          if (parsed.swappedMeals && typeof parsed.swappedMeals === 'object') {
            setSwappedMeals(parsed.swappedMeals);
          }
        }
      } catch (err) {
        console.warn('Failed to restore subscription state:', err);
      }
    }
    loadSavedSubscription();
  }, []);

  const persistSubscriptionData = async (skips: string[], swaps: Record<string, string>) => {
    try {
      await storage.setItem('@koikoi_subscription_data', JSON.stringify({ skippedDates: skips, swappedMeals: swaps }));
    } catch (err) {
      console.warn('Failed to persist subscription data:', err);
    }
  };

  const isDateSkipped = (dateString: string) => skippedDates.includes(dateString);

  const toggleSkipDate = async (dateString: string): Promise<boolean> => {
    let newSkips: string[];
    let isNowSkipped = false;

    if (skippedDates.includes(dateString)) {
      newSkips = skippedDates.filter(d => d !== dateString);
      isNowSkipped = false;
    } else {
      newSkips = [...skippedDates, dateString];
      isNowSkipped = true;
      // Credit +₹95 to Dabba Wallet upon skipping
      await creditSkippedMeal(dateString, 95);
    }

    setSkippedDates(newSkips);
    await persistSubscriptionData(newSkips, swappedMeals);
    return isNowSkipped;
  };

  const swapMeal = async (dateString: string, newMealTitle: string) => {
    const newSwaps = { ...swappedMeals, [dateString]: newMealTitle };
    setSwappedMeals(newSwaps);
    await persistSubscriptionData(skippedDates, newSwaps);
  };

  return (
    <SubscriptionContext.Provider
      value={{
        skippedDates,
        swappedMeals,
        activePlanTitle,
        toggleSkipDate,
        swapMeal,
        isDateSkipped,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
