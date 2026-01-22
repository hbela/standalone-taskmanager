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
      latitude, longitude, createdAt, updatedAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
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
  
  return updateTask(id, { completed: !task.completed });
}

/**
 * Get task statistics
 */
export async function getTaskStats(): Promise<{
  total: number;
  completed: number;
  pending: number;
  byPriority: Record<string, number>;
}> {
  const db = await getDatabase();
  
  const totalRow = await db.getFirstAsync('SELECT COUNT(*) as count FROM tasks');
  const completedRow = await db.getFirstAsync('SELECT COUNT(*) as count FROM tasks WHERE completed = 1');
  const priorityRows = await db.getAllAsync(
    'SELECT priority, COUNT(*) as count FROM tasks GROUP BY priority'
  );
  
  const total = (totalRow as any)?.count || 0;
  const completed = (completedRow as any)?.count || 0;
  
  const byPriority: Record<string, number> = {};
  priorityRows.forEach((row: any) => {
    byPriority[row.priority] = row.count;
  });
  
  return {
    total,
    completed,
    pending: total - completed,
    byPriority,
  };
}
