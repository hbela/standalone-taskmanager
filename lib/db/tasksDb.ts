/**
 * Task Database Operations
 * Provides CRUD operations for tasks using SQLite
 */

import {
  CreateTaskInput,
  RecurrenceRuleInput,
  RecurrenceScope,
  RecurrenceSeries,
  Task,
  UpdateTaskInput
} from '@/types/task';
import {
  calculateRecurrenceDates,
  createOccurrenceInput,
  getDueTime,
  normalizeInterval,
  recurrenceSeriesToRule,
  RECURRENCE_GENERATION_DAYS
} from '../recurrenceUtils';
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
    recurrenceSeriesId: row.recurrenceSeriesId,
    recurrenceOccurrenceDate: row.recurrenceOccurrenceDate,
    recurrenceException: Boolean(row.recurrenceException),
    generatedFromRuleVersion: row.generatedFromRuleVersion,
    recurrenceFrequency: row.recurrenceFrequency || null,
    recurrenceInterval: row.recurrenceInterval || null,
    recurrenceWeekdays: row.recurrenceWeekdays ? JSON.parse(row.recurrenceWeekdays) : null,
    recurrenceEndDate: row.recurrenceEndDate || null,
    recurrenceOccurrenceCount: row.recurrenceOccurrenceCount || null,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

function rowToSeries(row: any): RecurrenceSeries {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    priority: row.priority || 'medium',
    dueTime: row.dueTime,
    reminderTimes: row.reminderTimes ? JSON.parse(row.reminderTimes) : null,
    contactId: row.contactId,
    taskAddress: row.taskAddress,
    latitude: row.latitude,
    longitude: row.longitude,
    bill: row.bill,
    billCurrency: row.billCurrency,
    comment: row.comment,
    frequency: row.frequency,
    interval: row.interval || 1,
    weekdays: row.weekdays ? JSON.parse(row.weekdays) : null,
    startDate: row.startDate,
    endDate: row.endDate,
    occurrenceCount: row.occurrenceCount,
    active: Boolean(row.active),
    ruleVersion: row.ruleVersion || 1,
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
  
  let query = `
    SELECT tasks.*,
      recurrence_series.frequency as recurrenceFrequency,
      recurrence_series.interval as recurrenceInterval,
      recurrence_series.weekdays as recurrenceWeekdays,
      recurrence_series.endDate as recurrenceEndDate,
      recurrence_series.occurrenceCount as recurrenceOccurrenceCount
    FROM tasks
    LEFT JOIN recurrence_series ON tasks.recurrenceSeriesId = recurrence_series.id
  `;
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
  
  query += ' ORDER BY tasks.createdAt DESC';
  
  const rows = await db.getAllAsync(query, values);
  return rows.map(rowToTask);
}

/**
 * Get a single task by ID
 */
export async function getTaskById(id: number): Promise<Task | null> {
  const db = await getDatabase();
  const row = await db.getFirstAsync(`
    SELECT tasks.*,
      recurrence_series.frequency as recurrenceFrequency,
      recurrence_series.interval as recurrenceInterval,
      recurrence_series.weekdays as recurrenceWeekdays,
      recurrence_series.endDate as recurrenceEndDate,
      recurrence_series.occurrenceCount as recurrenceOccurrenceCount
    FROM tasks
    LEFT JOIN recurrence_series ON tasks.recurrenceSeriesId = recurrence_series.id
    WHERE tasks.id = ?
  `, [id]);
  
  if (!row) {
    return null;
  }
  
  return rowToTask(row);
}

/**
 * Create a new task
 */
async function insertTask(data: CreateTaskInput): Promise<Task> {
  const db = await getDatabase();
  
  const reminderTimesJson = data.reminderTimes 
    ? JSON.stringify(data.reminderTimes) 
    : JSON.stringify([60, 1440]);
  
  const result = await db.runAsync(
    `INSERT INTO tasks (
      title, description, completed, priority, dueDate, 
      notificationId, reminderTimes, contactId, taskAddress, 
      latitude, longitude, bill, billCurrency, comment, completedAt,
      recurrenceSeriesId, recurrenceOccurrenceDate, recurrenceException, generatedFromRuleVersion,
      createdAt, updatedAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
      data.recurrenceSeriesId || null,
      data.recurrenceOccurrenceDate || null,
      data.recurrenceException ? 1 : 0,
      data.generatedFromRuleVersion || null,
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

export async function getRecurrenceSeriesById(id: number): Promise<RecurrenceSeries | null> {
  const db = await getDatabase();
  const row = await db.getFirstAsync('SELECT * FROM recurrence_series WHERE id = ?', [id]);
  return row ? rowToSeries(row) : null;
}

async function createRecurrenceSeries(data: CreateTaskInput, recurrence: RecurrenceRuleInput): Promise<RecurrenceSeries> {
  const db = await getDatabase();
  const result = await db.runAsync(
    `INSERT INTO recurrence_series (
      title, description, priority, dueTime, reminderTimes, contactId, taskAddress,
      latitude, longitude, bill, billCurrency, comment, frequency, interval, weekdays,
      startDate, endDate, occurrenceCount, active, ruleVersion, createdAt, updatedAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.title,
      data.description || null,
      data.priority || 'medium',
      getDueTime(data.dueDate || recurrence.startDate),
      data.reminderTimes ? JSON.stringify(data.reminderTimes) : JSON.stringify([60, 1440]),
      data.contactId || null,
      data.taskAddress || null,
      data.latitude || null,
      data.longitude || null,
      data.bill || null,
      data.billCurrency || null,
      data.comment || null,
      recurrence.frequency,
      normalizeInterval(recurrence.interval),
      recurrence.weekdays ? JSON.stringify(recurrence.weekdays) : null,
      recurrence.startDate,
      recurrence.endDate || null,
      recurrence.occurrenceCount || null,
      1,
      1,
      new Date().toISOString(),
      new Date().toISOString(),
    ]
  );

  const series = await getRecurrenceSeriesById(result.lastInsertRowId);
  if (!series) {
    throw new Error('Failed to create recurring task series');
  }
  return series;
}

export async function generateMissingOccurrences(series: RecurrenceSeries, fromDate?: string): Promise<Task[]> {
  const db = await getDatabase();
  if (!series.active) return [];

  const windowEnd = new Date();
  windowEnd.setDate(windowEnd.getDate() + RECURRENCE_GENERATION_DAYS);
  const dates = calculateRecurrenceDates(recurrenceSeriesToRule(series), {
    windowEnd,
    fromDate: fromDate ? new Date(fromDate) : undefined,
  });

  const existingRows = await db.getAllAsync(
    'SELECT recurrenceOccurrenceDate FROM tasks WHERE recurrenceSeriesId = ?',
    [series.id]
  );
  const existing = new Set(
    existingRows.map((row: any) => row.recurrenceOccurrenceDate).filter(Boolean)
  );

  const created: Task[] = [];
  for (const occurrenceDate of dates) {
    if (existing.has(occurrenceDate)) continue;
    created.push(await insertTask(createOccurrenceInput(series, occurrenceDate)));
  }

  return created;
}

/**
 * Create a new task or a recurring series with generated occurrences.
 */
export async function createTask(data: CreateTaskInput): Promise<Task> {
  if (data.dueDate && new Date(data.dueDate).getTime() <= Date.now()) {
    throw new Error(data.recurrence
      ? 'Recurring tasks must start in the future.'
      : 'Due date and time must be in the future.'
    );
  }

  if (data.recurrence && data.dueDate) {
    const series = await createRecurrenceSeries(data, {
      ...data.recurrence,
      startDate: data.recurrence.startDate || data.dueDate,
    });
    const occurrences = await generateMissingOccurrences(series);
    if (occurrences.length === 0) {
      throw new Error('Recurring task did not generate any occurrences');
    }
    return occurrences[0];
  }

  return insertTask(data);
}

function hasTemplateChanges(data: UpdateTaskInput): boolean {
  const templateFields: (keyof UpdateTaskInput)[] = [
    'title', 'description', 'priority', 'dueDate', 'reminderTimes', 'contactId',
    'taskAddress', 'latitude', 'longitude', 'bill', 'billCurrency', 'comment'
  ];
  return templateFields.some((field) => data[field] !== undefined);
}

async function updateSeriesTemplate(series: RecurrenceSeries, data: UpdateTaskInput, startDate?: string) {
  const db = await getDatabase();
  const recurrence = data.recurrence;
  await db.runAsync(
    `UPDATE recurrence_series SET
      title = ?, description = ?, priority = ?, dueTime = ?, reminderTimes = ?,
      contactId = ?, taskAddress = ?, latitude = ?, longitude = ?, bill = ?,
      billCurrency = ?, comment = ?, frequency = ?, interval = ?, weekdays = ?,
      startDate = ?, endDate = ?, occurrenceCount = ?, ruleVersion = ruleVersion + 1,
      updatedAt = datetime('now')
    WHERE id = ?`,
    [
      data.title ?? series.title,
      data.description ?? series.description,
      data.priority ?? series.priority,
      data.dueDate !== undefined ? getDueTime(data.dueDate) : series.dueTime,
      data.reminderTimes !== undefined ? JSON.stringify(data.reminderTimes) : JSON.stringify(series.reminderTimes || [60, 1440]),
      data.contactId ?? series.contactId,
      data.taskAddress ?? series.taskAddress,
      data.latitude ?? series.latitude,
      data.longitude ?? series.longitude,
      data.bill ?? series.bill,
      data.billCurrency ?? series.billCurrency,
      data.comment ?? series.comment,
      recurrence?.frequency ?? series.frequency,
      normalizeInterval(recurrence?.interval ?? series.interval),
      recurrence?.weekdays !== undefined ? JSON.stringify(recurrence.weekdays) : (series.weekdays ? JSON.stringify(series.weekdays) : null),
      startDate || recurrence?.startDate || series.startDate,
      recurrence?.endDate !== undefined ? recurrence.endDate : series.endDate,
      recurrence?.occurrenceCount !== undefined ? recurrence.occurrenceCount : series.occurrenceCount,
      series.id,
    ]
  );
}

/**
 * Update an existing task
 */
export async function updateTask(id: number, data: UpdateTaskInput, scope: RecurrenceScope = 'this'): Promise<Task> {
  const db = await getDatabase();
  const currentTask = await getTaskById(id);
  if (!currentTask) {
    throw new Error('Task not found');
  }

  if (currentTask.recurrenceSeriesId && scope !== 'this') {
    const series = await getRecurrenceSeriesById(currentTask.recurrenceSeriesId);
    if (!series) {
      throw new Error('Recurring task series not found');
    }
    const boundary = currentTask.recurrenceOccurrenceDate || currentTask.dueDate?.split('T')[0] || series.startDate;
    await updateSeriesTemplate(series, data, scope === 'future' ? boundary : undefined);

    if (scope === 'future') {
      await db.runAsync(
        `DELETE FROM tasks
         WHERE recurrenceSeriesId = ?
           AND recurrenceOccurrenceDate > ?
           AND completed = 0
           AND recurrenceException = 0`,
        [series.id, boundary]
      );
    } else {
      await db.runAsync(
        `DELETE FROM tasks
         WHERE recurrenceSeriesId = ?
           AND completed = 0
           AND recurrenceException = 0
           AND id <> ?`,
        [series.id, id]
      );
    }

    const updatedSeries = await getRecurrenceSeriesById(series.id);
    if (updatedSeries) {
      await generateMissingOccurrences(updatedSeries, scope === 'future' ? boundary : undefined);
    }
  }
  
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

  if (data.recurrenceException !== undefined) {
    updates.push('recurrenceException = ?');
    values.push(data.recurrenceException ? 1 : 0);
  } else if (currentTask.recurrenceSeriesId && scope === 'this' && hasTemplateChanges(data)) {
    updates.push('recurrenceException = ?');
    values.push(1);
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
