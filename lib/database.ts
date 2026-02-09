/**
 * SQLite Database Initialization
 * Manages the local SQLite database for task storage
 */

import { logError, logInfo } from '@/utils/errorHandler';
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
        bill REAL,
        billCurrency TEXT,
        comment TEXT,
        completedAt TEXT,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // Add bill column to existing tables (migration)
    try {
      await db.execAsync(`
        ALTER TABLE tasks ADD COLUMN bill REAL;
      `);
      logInfo('Database', 'Bill column added to tasks table');
    } catch (error: any) {
      // Column might already exist, which is fine
      if (!error.message?.includes('duplicate column name')) {
        logInfo('Database', 'Bill column migration note:', error.message);
      }
    }
    
    // Add billCurrency column to existing tables (migration)
    try {
      await db.execAsync(`
        ALTER TABLE tasks ADD COLUMN billCurrency TEXT;
      `);
      logInfo('Database', 'BillCurrency column added to tasks table');
    } catch (error: any) {
      // Column might already exist, which is fine
      if (!error.message?.includes('duplicate column name')) {
        logInfo('Database', 'BillCurrency column migration note:', error.message);
      }
    }

    // Add comment column to existing tables (migration)
    try {
      await db.execAsync(`
        ALTER TABLE tasks ADD COLUMN comment TEXT;
      `);
      logInfo('Database', 'Comment column added to tasks table');
    } catch (error: any) {
      if (!error.message?.includes('duplicate column name')) {
        logInfo('Database', 'Comment column migration note:', error.message);
      }
    }

    // Add completedAt column to existing tables (migration)
    try {
      await db.execAsync(`
        ALTER TABLE tasks ADD COLUMN completedAt TEXT;
      `);
      logInfo('Database', 'CompletedAt column added to tasks table');
    } catch (error: any) {
      if (!error.message?.includes('duplicate column name')) {
        logInfo('Database', 'CompletedAt column migration note:', error.message);
      }
    }
    
    // Create indexes for better query performance
    await db.execAsync(`
      CREATE INDEX IF NOT EXISTS idx_tasks_completed ON tasks(completed);
      CREATE INDEX IF NOT EXISTS idx_tasks_priority ON tasks(priority);
      CREATE INDEX IF NOT EXISTS idx_tasks_dueDate ON tasks(dueDate);
      CREATE INDEX IF NOT EXISTS idx_tasks_contactId ON tasks(contactId);
    `);
    
    dbInstance = db;
    logInfo('Database', 'Database initialized successfully');
    
    return db;
  } catch (error) {
    logError('Database', error);
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
    logInfo('Database', 'Database connection closed');
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
  logInfo('Database', 'Database reset complete');
}
