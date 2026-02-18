/**
 * In-App Purchase Service
 * Handles Google Play Billing integration via react-native-iap
 */

import { IAP_PRODUCT_IDS, IAP_AVAILABLE } from '@/constants/iap';
import { logError, logInfo } from '@/utils/errorHandler';
import {
  initConnection,
  endConnection,
  getProducts,
  requestPurchase,
  finishTransaction,
  getAvailablePurchases,
  purchaseUpdatedListener,
  purchaseErrorListener,
  type ProductPurchase,
  type Product,
  type PurchaseError,
  type Subscription,
} from 'react-native-iap';

let purchaseUpdateSubscription: ReturnType<typeof purchaseUpdatedListener> | null = null;
let purchaseErrorSubscription: ReturnType<typeof purchaseErrorListener> | null = null;

/**
 * Initialize the IAP connection to the store
 */
export async function initIAP(): Promise<boolean> {
  if (!IAP_AVAILABLE) {
    logInfo('IAP', 'IAP not available on this platform');
    return false;
  }

  try {
    await initConnection();
    logInfo('IAP', 'IAP connection initialized');
    return true;
  } catch (error) {
    logError('IAP', error);
    return false;
  }
}

/**
 * End the IAP connection and remove listeners
 */
export async function endIAP(): Promise<void> {
  purchaseUpdateSubscription?.remove();
  purchaseErrorSubscription?.remove();
  purchaseUpdateSubscription = null;
  purchaseErrorSubscription = null;

  try {
    await endConnection();
    logInfo('IAP', 'IAP connection ended');
  } catch (error) {
    logError('IAP', error);
  }
}

/**
 * Fetch product details (prices, descriptions) from Google Play
 */
export async function fetchProducts(): Promise<Product[]> {
  if (!IAP_AVAILABLE) return [];

  try {
    const products = await getProducts({
      skus: [...IAP_PRODUCT_IDS],
    });
    logInfo('IAP', `Fetched ${products.length} products`);
    return products;
  } catch (error) {
    logError('IAP', error);
    return [];
  }
}

/**
 * Request a purchase for a given product ID
 */
export async function purchaseProduct(productId: string): Promise<void> {
  if (!IAP_AVAILABLE) {
    throw new Error('IAP not available on this platform');
  }

  try {
    await requestPurchase({ skus: [productId] });
  } catch (error) {
    logError('IAP', error);
    throw error;
  }
}

/**
 * Acknowledge/consume a completed purchase
 */
export async function acknowledgePurchase(
  purchase: ProductPurchase,
): Promise<void> {
  try {
    await finishTransaction({ purchase, isConsumable: true });
    logInfo('IAP', `Purchase finished: ${purchase.productId}`);
  } catch (error) {
    logError('IAP', error);
    throw error;
  }
}

/**
 * Restore previously made purchases
 */
export async function restorePurchases(): Promise<ProductPurchase[]> {
  if (!IAP_AVAILABLE) return [];

  try {
    const purchases = await getAvailablePurchases();
    logInfo('IAP', `Restored ${purchases.length} purchases`);
    return purchases;
  } catch (error) {
    logError('IAP', error);
    return [];
  }
}

/**
 * Set up purchase update and error listeners
 */
export function setupPurchaseListeners(
  onPurchaseUpdate: (purchase: ProductPurchase) => void,
  onPurchaseError: (error: PurchaseError) => void,
): void {
  // Remove any existing listeners
  purchaseUpdateSubscription?.remove();
  purchaseErrorSubscription?.remove();

  purchaseUpdateSubscription = purchaseUpdatedListener(onPurchaseUpdate);
  purchaseErrorSubscription = purchaseErrorListener(onPurchaseError);
}
