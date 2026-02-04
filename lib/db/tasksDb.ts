/**
 * Task Database Operations
 * Provides CRUD operations for tasks using SQLite
 */

import { CreateTaskInput, Task, UpdateTaskInput } from '@/types/task';
import { getDatabase } from '../database';

/**
 * Convert database row to Task object
 */
function rowToTask(row: any): Task {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    completed: Boolean(row.completed),
    priority: row.priority || 'medium',
    dueDate: row.dueDate,
    notificationId: row.notificationId,
    reminderTimes: row.reminderTimes ? JSON.parse(row.reminderTimes) : [60, 1440],
    contactId: row.contactId,
    taskAddress: row.taskAddress,
    latitude: row.latitude,
    longitude: row.longitude,
    bill: row.bill,
    billCurrency: row.billCurrency,
    comment: row.comment,
    completedAt: row.completedAt,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

/**
 * Get all tasks with optional filtering
 */
export async function getAllTasks(params?: {
  completed?: boolean;
  priority?: string;
}): Promise<Task[]> {
  const db = await getDatabase();
  
  let query = 'SELECT * FROM tasks';
  const conditions: string[] = [];
  const values: any[] = [];
  
  if (params?.completed !== undefined) {
    conditions.push('completed = ?');
    values.push(params.completed ? 1 : 0);
  }
  
  if (params?.priority) {
    conditions.push('priority = ?');
    values.push(params.priority);
  }
  
  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }
  
  query += ' ORDER BY createdAt DESC';
  
  const rows = await db.getAllAsync(query, values);
  return rows.map(rowToTask);
}

/**
 * Get a single task by ID
 */
export async function getTaskById(id: number): Promise<Task | null> {
  const db = await getDatabase();
  const row = await db.getFirstAsync('SELECT * FROM tasks WHERE id = ?', [id]);
  
  if (!row) {
    return null;
  }
  
  return rowToTask(row);
}

/**
 * Create a new task
 */
export async function createTask(data: CreateTaskInput): Promise<Task> {
  const db = await getDatabase();
  
  const reminderTimesJson = data.reminderTimes 
    ? JSON.stringify(data.reminderTimes) 
    : JSON.stringify([60, 1440]);
  
  const result = await db.runAsync(
    `INSERT INTO tasks (
      title, description, completed, priority, dueDate, 
      notificationId, reminderTimes, contactId, taskAddress, 
      latitude, longitude, bill, billCurrency, comment, completedAt, createdAt, updatedAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.title,
      data.description || null,
      data.completed ? 1 : 0,
      data.priority || 'medium',
      data.dueDate || null,
      data.notificationId || null,
      reminderTimesJson,
      data.contactId || null,
      data.taskAddress || null,
      data.latitude || null,
      data.longitude || null,
      data.bill || null,
      data.billCurrency || null,
      data.comment || null,
      data.completed && !data.completedAt ? new Date().toISOString() : (data.completedAt || null),
      new Date().toISOString(), // createdAt
      new Date().toISOString()  // updatedAt
    ]
  );
  
  const newTask = await getTaskById(result.lastInsertRowId);
  if (!newTask) {
    throw new Error('Failed to create task');
  }
  
  return newTask;
}

/**
 * Update an existing task
 */
export async function updateTask(id: number, data: UpdateTaskInput): Promise<Task> {
  const db = await getDatabase();
  
  const updates: string[] = [];
  const values: any[] = [];
  
  if (data.title !== undefined) {
    updates.push('title = ?');
    values.push(data.title);
  }
  
  if (data.description !== undefined) {
    updates.push('description = ?');
    values.push(data.description);
  }
  
  if (data.completed !== undefined) {
    updates.push('completed = ?');
    values.push(data.completed ? 1 : 0);
  }
  
  if (data.priority !== undefined) {
    updates.push('priority = ?');
    values.push(data.priority);
  }
  
  if (data.dueDate !== undefined) {
    updates.push('dueDate = ?');
    values.push(data.dueDate);
  }
  
  if (data.notificationId !== undefined) {
    updates.push('notificationId = ?');
    values.push(data.notificationId);
  }
  
  if (data.reminderTimes !== undefined) {
    updates.push('reminderTimes = ?');
    values.push(JSON.stringify(data.reminderTimes));
  }
  
  if (data.contactId !== undefined) {
    updates.push('contactId = ?');
    values.push(data.contactId);
  }
  
  if (data.taskAddress !== undefined) {
    updates.push('taskAddress = ?');
    values.push(data.taskAddress);
  }
  
  if (data.latitude !== undefined) {
    updates.push('latitude = ?');
    values.push(data.latitude);
  }
  
  if (data.longitude !== undefined) {
    updates.push('longitude = ?');
    values.push(data.longitude);
  }
  
  if (data.bill !== undefined) {
    updates.push('bill = ?');
    values.push(data.bill);
  }
  
  if (data.billCurrency !== undefined) {
    updates.push('billCurrency = ?');
    values.push(data.billCurrency);
  }
  
  if (data.comment !== undefined) {
    updates.push('comment = ?');
    values.push(data.comment);
  }
  
  if (data.completedAt !== undefined) {
    updates.push('completedAt = ?');
    values.push(data.completedAt);
  }
  
  updates.push('updatedAt = datetime(\'now\')');
  values.push(id);
  
  await db.runAsync(
    `UPDATE tasks SET ${updates.join(', ')} WHERE id = ?`,
    values
  );
  
  const updatedTask = await getTaskById(id);
  if (!updatedTask) {
    throw new Error('Task not found');
  }
  
  return updatedTask;
}

/**
 * Delete a task
 */
export async function deleteTask(id: number): Promise<void> {
  const db = await getDatabase();
  await db.runAsync('DELETE FROM tasks WHERE id = ?', [id]);
}

/**
 * Toggle task completion status
 */
export async function toggleTaskComplete(id: number): Promise<Task> {
  const task = await getTaskById(id);
  if (!task) {
    throw new Error('Task not found');
  }
  
  const newCompleted = !task.completed;
  return updateTask(id, { 
    completed: newCompleted,
    completedAt: newCompleted ? new Date().toISOString() : null
  });
}

/**
 * Get task statistics
 */
export async function getTaskStats(): Promise<{
  total: number;
  completed: number;
  pending: number;
  overdue: number;
  byPriority: Record<string, number>;
  totalBilling: { currency: string; amount: number }[];
  monthlyBilling: { month: string; currency: string; amount: number }[];
  billingByCategory: { category: string; currency: string; amount: number }[];
}> {
  const db = await getDatabase();
  
  const totalRow = await db.getFirstAsync('SELECT COUNT(*) as count FROM tasks');
  const completedRow = await db.getFirstAsync('SELECT COUNT(*) as count FROM tasks WHERE completed = 1');
  const overdueRow = await db.getFirstAsync(
    'SELECT COUNT(*) as count FROM tasks WHERE completed = 0 AND dueDate IS NOT NULL AND dueDate < ?',
    [new Date().toISOString()]
  );
  
  const priorityRows = await db.getAllAsync(
    'SELECT priority, COUNT(*) as count FROM tasks GROUP BY priority'
  );
  
  // Billing stats (Current Month Total for Completed Tasks)
  const currentMonth = new Date().toISOString().substring(0, 7); // YYYY-MM
  
  const totalBillingRows = await db.getAllAsync(
    `SELECT billCurrency, SUM(bill) as total 
     FROM tasks 
     WHERE bill IS NOT NULL AND completed = 1 AND substr(completedAt, 1, 7) = ?
     GROUP BY billCurrency`,
    [currentMonth]
  );
  
  // Monthly billing (group by YYYY-MM of completedAt) - ONLY COMPLETED TASKS
  const monthlyBillingRows = await db.getAllAsync(
    `SELECT substr(completedAt, 1, 7) as month, billCurrency, SUM(bill) as total 
     FROM tasks 
     WHERE bill IS NOT NULL AND completed = 1 AND completedAt IS NOT NULL 
     GROUP BY month, billCurrency 
     ORDER BY month DESC 
     LIMIT 12`
  );
  
  // Billing by Category (Title) - ONLY COMPLETED TASKS
  const billingByCategoryRows = await db.getAllAsync(
    `SELECT title as category, billCurrency, SUM(bill) as total 
     FROM tasks 
     WHERE bill IS NOT NULL AND completed = 1
     GROUP BY title, billCurrency
     ORDER BY total DESC
     LIMIT 10`
  );
  
  const total = (totalRow as any)?.count || 0;
  const completed = (completedRow as any)?.count || 0;
  const overdue = (overdueRow as any)?.count || 0;
  
  const byPriority: Record<string, number> = {};
  priorityRows.forEach((row: any) => {
    byPriority[row.priority] = row.count;
  });
  
  return {
    total,
    completed,
    pending: total - completed,
    overdue,
    byPriority,
    totalBilling: totalBillingRows.map((row: any) => ({ 
      currency: row.billCurrency || 'USD', 
      amount: row.total 
    })),
    monthlyBilling: monthlyBillingRows.map((row: any) => ({
      month: row.month,
      currency: row.billCurrency || 'USD',
      amount: row.total
    })),
    billingByCategory: billingByCategoryRows.map((row: any) => ({
      category: row.category,
      currency: row.billCurrency || 'USD',
      amount: row.total
    })),
  };
}
