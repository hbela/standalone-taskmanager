/**
 * Web database shim.
 *
 * Expo SQLite's web worker can fail when its persistent AccessHandle VFS cannot be
 * initialized. The web build uses a localStorage task adapter instead, so this
 * module intentionally avoids importing expo-sqlite on web.
 */

export async function initializeDatabase(): Promise<null> {
  return null;
}

export async function getDatabase(): Promise<never> {
  throw new Error('SQLite database is not available on web. Use the web task adapter instead.');
}

export async function closeDatabase(): Promise<void> {
  // No-op on web.
}

export async function resetDatabase(): Promise<void> {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem('standalone-taskmanager.tasks');
  }
}
