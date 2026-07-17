import { AccessibilityInfo } from 'react-native';

/**
 * Checks if the system-level Reduced Motion setting is enabled.
 */
export async function checkReduceMotion(): Promise<boolean> {
  try {
    return await AccessibilityInfo.isReduceMotionEnabled();
  } catch (error) {
    console.warn('Failed to query reduce motion preference:', error);
    return false;
  }
}
