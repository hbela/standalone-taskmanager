/**
 * SQLite Database Initialization
 * Manages the local SQLite database for task storage
 */

import * as SQLite from 'expo-sqlite';

const DB_NAME = 'tasks.db';

let dbInstance: SQLite.SQLiteDatabase | null = null;

/**
 * Initialize the SQLite database
 * Creates tables and indexes if they don't exist
 */
export async function initializeDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (dbInstance) {
    return dbInstance;
  }

  try {
    // Open database connection
    const db = await SQLite.openDatabaseAsync(DB_NAME);
    
    // Enable WAL mode for better performance
    await db.execAsync('PRAGMA journal_mode = WAL;');
    
    // Create tasks table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        completed INTEGER DEFAULT 0,
        priority TEXT DEFAULT 'medium',
        dueDate TEXT,
        notificationId TEXT,
        reminderTimes TEXT,
        contactId TEXT,
        taskAddress TEXT,
        latitude REAL,
        longitude REAL,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // Create indexes for better query performance
    await db.execAsync(`
      CREATE INDEX IF NOT EXISTS idx_tasks_completed ON tasks(completed);
      CREATE INDEX IF NOT EXISTS idx_tasks_priority ON tasks(priority);
      CREATE INDEX IF NOT EXISTS idx_tasks_dueDate ON tasks(dueDate);
      CREATE INDEX IF NOT EXISTS idx_tasks_contactId ON tasks(contactId);
    `);
    
    dbInstance = db;
    console.log('✅ Database initialized successfully');
    
    return db;
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    throw error;
  }
}

/**
 * Get the database instance
 * Initializes if not already initialized
 */
export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (!dbInstance) {
    return initializeDatabase();
  }
  return dbInstance;
}

/**
 * Close the database connection
 */
export async function closeDatabase(): Promise<void> {
  if (dbInstance) {
    await dbInstance.closeAsync();
    dbInstance = null;
    console.log('Database connection closed');
  }
}

/**
 * Reset the database (for testing/development)
 * WARNING: This will delete all data
 */
export async function resetDatabase(): Promise<void> {
  const db = await getDatabase();
  await db.execAsync('DROP TABLE IF EXISTS tasks;');
  dbInstance = null;
  await initializeDatabase();
  console.log('Database reset complete');
}
