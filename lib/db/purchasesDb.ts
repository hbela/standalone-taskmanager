/**
 * Purchase Database Operations
 * Persists in-app purchase records locally using SQLite
 */

import { getDatabase } from '../database';

export interface PurchaseRecord {
  id: number;
  productId: string;
  transactionId: string;
  purchaseDate: string;
  createdAt: string;
}

/**
 * Save a completed purchase to the local database
 */
export async function savePurchase(
  productId: string,
  transactionId: string,
): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    `INSERT OR REPLACE INTO purchases (productId, transactionId, purchaseDate)
     VALUES (?, ?, datetime('now'))`,
    [productId, transactionId],
  );
}

/**
 * Get all recorded purchases
 */
export async function getPurchases(): Promise<PurchaseRecord[]> {
  const db = await getDatabase();
  return db.getAllAsync<PurchaseRecord>(
    'SELECT * FROM purchases ORDER BY purchaseDate DESC',
  );
}

/**
 * Check if the user has made any purchase (supporter check)
 */
export async function hasAnyPurchase(): Promise<boolean> {
  const db = await getDatabase();
  const result = await db.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM purchases',
  );
  return (result?.count ?? 0) > 0;
}
