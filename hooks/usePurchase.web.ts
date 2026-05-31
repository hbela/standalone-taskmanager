interface WebProduct {
  id?: string;
  productId?: string;
  title?: string;
  description?: string;
  price?: string;
}

interface UsePurchaseReturn {
  products: WebProduct[];
  isLoading: boolean;
  isPurchasing: boolean;
  isSupporter: boolean;
  error: string | null;
  purchase: (productId: string) => Promise<void>;
  restore: () => Promise<void>;
}

export function usePurchase(): UsePurchaseReturn {
  return {
    products: [],
    isLoading: false,
    isPurchasing: false,
    isSupporter: false,
    error: null,
    purchase: async () => {
      throw new Error('In-app purchases are only available in the native app.');
    },
    restore: async () => {
      throw new Error('Purchase restore is only available in the native app.');
    },
  };
}
