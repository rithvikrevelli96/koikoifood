import { Platform } from 'react-native';

const globalInMemoryStore: Record<string, string> = {};

export const storage = {
  getItem: async (key: string): Promise<string | null> => {
    if (Platform.OS === 'web') {
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    }
    return globalInMemoryStore[key] || null;
  },
  setItem: async (key: string, value: string): Promise<void> => {
    if (Platform.OS === 'web') {
      try {
        localStorage.setItem(key, value);
      } catch {}
    } else {
      globalInMemoryStore[key] = value;
    }
  },
  removeItem: async (key: string): Promise<void> => {
    if (Platform.OS === 'web') {
      try {
        localStorage.removeItem(key);
      } catch {}
    } else {
      delete globalInMemoryStore[key];
    }
  },
  getAllKeys: async (): Promise<string[]> => {
    if (Platform.OS === 'web') {
      try {
        return Object.keys(localStorage);
      } catch {
        return [];
      }
    }
    return Object.keys(globalInMemoryStore);
  },
  clear: async (): Promise<void> => {
    if (Platform.OS === 'web') {
      try {
        localStorage.clear();
      } catch {}
    } else {
      Object.keys(globalInMemoryStore).forEach(key => {
        delete globalInMemoryStore[key];
      });
    }
  }
};
