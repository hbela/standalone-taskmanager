/**
 * In-App Purchase Configuration
 * Product IDs must match those configured in Google Play Console
 */

import { Platform } from 'react-native';

export const IAP_PRODUCT_IDS = [
  'coffee_small',
  'coffee_medium',
  'coffee_large',
] as const;

export type IAPProductId = (typeof IAP_PRODUCT_IDS)[number];

/** Fallback product metadata (used when store prices can't be loaded) */
export const IAP_PRODUCTS_FALLBACK: Record<
  IAPProductId,
  { price: string; emoji: string }
> = {
  coffee_small: {
    price: '€1.99',
    emoji: '☕',
  },
  coffee_medium: {
    price: '€4.99',
    emoji: '☕☕',
  },
  coffee_large: {
    price: '€9.99',
    emoji: '🚀',
  },
};

/** Whether IAP is available on this platform */
export const IAP_AVAILABLE = Platform.OS === 'android' || Platform.OS === 'ios';
