/**
 * Custom hook for in-app purchase operations
 * Manages IAP lifecycle, product loading, and purchase flow
 */

import { useCallback, useEffect, useState } from 'react';
import { type Product, type ProductPurchase } from 'react-native-iap';
import { IAP_AVAILABLE } from '@/constants/iap';
import {
  initIAP,
  endIAP,
  fetchProducts,
  purchaseProduct,
  acknowledgePurchase,
  restorePurchases,
  setupPurchaseListeners,
} from '@/lib/iap/purchaseService';
import { savePurchase, hasAnyPurchase } from '@/lib/db/purchasesDb';
import { logError, logInfo } from '@/utils/errorHandler';

interface UsePurchaseReturn {
  products: Product[];
  isLoading: boolean;
  isPurchasing: boolean;
  isSupporter: boolean;
  error: string | null;
  purchase: (productId: string) => Promise<void>;
  restore: () => Promise<void>;
}

export function usePurchase(): UsePurchaseReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isSupporter, setIsSupporter] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check local supporter status
  const checkSupporterStatus = useCallback(async () => {
    try {
      const supported = await hasAnyPurchase();
      setIsSupporter(supported);
    } catch (err) {
      logError('usePurchase', err);
    }
  }, []);

  // Handle successful purchase
  const handlePurchaseUpdate = useCallback(
    async (purchase: ProductPurchase) => {
      try {
        // Acknowledge/consume the purchase
        await acknowledgePurchase(purchase);

        // Save to local database
        const transactionId =
          purchase.transactionId ?? purchase.purchaseToken ?? 'unknown';
        await savePurchase(purchase.productId, transactionId);

        setIsSupporter(true);
        setIsPurchasing(false);
        logInfo('usePurchase', `Purchase complete: ${purchase.productId}`);
      } catch (err) {
        logError('usePurchase', err);
        setError('Failed to complete purchase. Please try again.');
        setIsPurchasing(false);
      }
    },
    [],
  );

  // Handle purchase error
  const handlePurchaseError = useCallback(
    (err: { message?: string; code?: string }) => {
      // User cancelled is not a real error
      if (err.code === 'E_USER_CANCELLED') {
        setIsPurchasing(false);
        return;
      }
      logError('usePurchase', err);
      setError(err.message ?? 'Purchase failed. Please try again.');
      setIsPurchasing(false);
    },
    [],
  );

  // Initialize IAP on mount
  useEffect(() => {
    let mounted = true;

    async function init() {
      // Always check local supporter status
      await checkSupporterStatus();

      if (!IAP_AVAILABLE) {
        setIsLoading(false);
        return;
      }

      const connected = await initIAP();
      if (!connected || !mounted) {
        setIsLoading(false);
        return;
      }

      // Set up listeners
      setupPurchaseListeners(handlePurchaseUpdate, handlePurchaseError);

      // Fetch products
      const storeProducts = await fetchProducts();
      if (mounted) {
        setProducts(storeProducts);
        setIsLoading(false);
      }
    }

    init();

    return () => {
      mounted = false;
      endIAP();
    };
  }, [checkSupporterStatus, handlePurchaseUpdate, handlePurchaseError]);

  // Request a purchase
  const purchase = useCallback(async (productId: string) => {
    setError(null);
    setIsPurchasing(true);
    try {
      await purchaseProduct(productId);
    } catch (err) {
      setIsPurchasing(false);
      setError('Failed to start purchase. Please try again.');
    }
  }, []);

  // Restore purchases
  const restore = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const purchases = await restorePurchases();
      for (const p of purchases) {
        const transactionId =
          p.transactionId ?? p.purchaseToken ?? 'unknown';
        await savePurchase(p.productId, transactionId);
      }
      if (purchases.length > 0) {
        setIsSupporter(true);
      }
    } catch (err) {
      logError('usePurchase', err);
      setError('Failed to restore purchases.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    products,
    isLoading,
    isPurchasing,
    isSupporter,
    error,
    purchase,
    restore,
  };
}
