import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';

export interface WalletTransaction {
  id: string;
  title: string;
  amount: string;
  date: string;
  status: string;
  type: 'credit' | 'debit';
}

interface WalletContextType {
  walletBalance: number;
  transactionsList: WalletTransaction[];
  topUpWallet: (amount: number, method: string) => Promise<void>;
  creditSkippedMeal: (dateString: string, amount?: number) => Promise<void>;
  deductForOrder: (amount: number, title: string) => Promise<boolean>;
}

const DEFAULT_TRANSACTIONS: WalletTransaction[] = [
  { id: '1', title: 'Top-up Wallet Credit', amount: '+₹500', date: 'Today', status: 'Success', type: 'credit' },
  { id: '2', title: 'Order #KKD-9482: North Indian Dabba', amount: '-₹185', date: 'Today', status: 'Success', type: 'debit' },
  { id: '3', title: 'Plan Renewal: Monthly Veg', amount: '-₹1,850', date: '12-07-2026', status: 'Success', type: 'debit' },
  { id: '4', title: 'Top-up Wallet Credit', amount: '+₹1,000', date: '08-07-2026', status: 'Success', type: 'credit' },
  { id: '5', title: 'Lunch refund: Skipped slot', amount: '+₹65', date: '01-07-2026', status: 'Success', type: 'credit' },
];

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [walletBalance, setWalletBalance] = useState<number>(1250);
  const [transactionsList, setTransactionsList] = useState<WalletTransaction[]>(DEFAULT_TRANSACTIONS);

  // Restore saved wallet state on mount
  useEffect(() => {
    async function loadSavedWallet() {
      try {
        const savedData = await storage.getItem('@koikoi_wallet_data');
        if (savedData) {
          const parsed = JSON.parse(savedData);
          if (typeof parsed.balance === 'number') setWalletBalance(parsed.balance);
          if (Array.isArray(parsed.transactions)) setTransactionsList(parsed.transactions);
        }
      } catch (err) {
        console.warn('Failed to restore wallet state:', err);
      }
    }
    loadSavedWallet();
  }, []);

  // Save wallet data whenever balance or transactions update
  const persistWalletData = async (balance: number, txs: WalletTransaction[]) => {
    try {
      await storage.setItem('@koikoi_wallet_data', JSON.stringify({ balance, transactions: txs }));
    } catch (err) {
      console.warn('Failed to persist wallet data:', err);
    }
  };

  const topUpWallet = async (amount: number, method: string) => {
    const newBalance = walletBalance + amount;
    const newTx: WalletTransaction = {
      id: Date.now().toString(),
      title: `Top-up Wallet via ${method.toUpperCase()}`,
      amount: `+₹${amount.toLocaleString('en-IN')}`,
      date: 'Just now',
      status: 'Success',
      type: 'credit',
    };
    const updatedTxs = [newTx, ...transactionsList];
    setWalletBalance(newBalance);
    setTransactionsList(updatedTxs);
    await persistWalletData(newBalance, updatedTxs);
  };

  const creditSkippedMeal = async (dateString: string, amount: number = 95) => {
    const newBalance = walletBalance + amount;
    const newTx: WalletTransaction = {
      id: Date.now().toString(),
      title: `Refund: Skipped Dabba (${dateString})`,
      amount: `+₹${amount}`,
      date: 'Just now',
      status: 'Success',
      type: 'credit',
    };
    const updatedTxs = [newTx, ...transactionsList];
    setWalletBalance(newBalance);
    setTransactionsList(updatedTxs);
    await persistWalletData(newBalance, updatedTxs);
  };

  const deductForOrder = async (amount: number, title: string): Promise<boolean> => {
    if (walletBalance < amount) return false;
    const newBalance = walletBalance - amount;
    const newTx: WalletTransaction = {
      id: Date.now().toString(),
      title: title,
      amount: `-₹${amount.toLocaleString('en-IN')}`,
      date: 'Just now',
      status: 'Success',
      type: 'debit',
    };
    const updatedTxs = [newTx, ...transactionsList];
    setWalletBalance(newBalance);
    setTransactionsList(updatedTxs);
    await persistWalletData(newBalance, updatedTxs);
    return true;
  };

  return (
    <WalletContext.Provider value={{ walletBalance, transactionsList, topUpWallet, creditSkippedMeal, deductForOrder }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
