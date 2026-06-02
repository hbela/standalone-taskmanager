/**
 * Web task storage adapter.
 *
 * The native app uses SQLite. On web, expo-sqlite relies on a worker-backed VFS
 * that can be unavailable in some browsers/dev-server contexts, so we use
 * localStorage to keep the web preview functional.
 */

import { CreateTaskInput, RecurrenceScope, RecurrenceSeries, Task, UpdateTaskInput } from '@/types/task';

const STORAGE_KEY = 'standalone-taskmanager.tasks';

function nowIso(): string {
  return new Date().toISOString();
}

function readTasks(): Task[] {
  if (typeof window === 'undefined') return [];

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as Task[];
  } catch {
    return [];
  }
}

function writeTasks(tasks: Task[]): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function nextId(tasks: Task[]): number {
  return tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1;
}

function createTaskFromInput(data: CreateTaskInput, id: number): Task {
  const createdAt = nowIso();
  const completed = Boolean(data.completed);

  return {
    id,
    title: data.title,
    description: data.description || null,
    completed,
    priority: data.priority || 'medium',
    dueDate: data.dueDate || null,
    notificationId: data.notificationId || null,
    reminderTimes: data.reminderTimes || [60, 1440],
    contactId: data.contactId || null,
    taskAddress: data.taskAddress || null,
    latitude: data.latitude || null,
    longitude: data.longitude || null,
    bill: data.bill || null,
    billCurrency: data.billCurrency || null,
    comment: data.comment || null,
    completedAt: completed ? (data.completedAt || createdAt) : (data.completedAt || null),
    recurrenceSeriesId: data.recurrenceSeriesId || null,
    recurrenceOccurrenceDate: data.recurrenceOccurrenceDate || null,
    recurrenceException: Boolean(data.recurrenceException),
    generatedFromRuleVersion: data.generatedFromRuleVersion || null,
    recurrenceFrequency: data.recurrence?.frequency || null,
    recurrenceInterval: data.recurrence?.interval || null,
    recurrenceWeekdays: data.recurrence?.weekdays || null,
    recurrenceEndDate: data.recurrence?.endDate || null,
    recurrenceOccurrenceCount: data.recurrence?.occurrenceCount || null,
    createdAt,
    updatedAt: createdAt,
  };
}

export async function getAllTasks(params?: { completed?: boolean; priority?: string }): Promise<Task[]> {
  let tasks = readTasks();

  if (params?.completed !== undefined) {
    tasks = tasks.filter((task) => task.completed === params.completed);
  }

  if (params?.priority) {
    tasks = tasks.filter((task) => task.priority === params.priority);
  }

  return tasks.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getTaskById(id: number): Promise<Task | null> {
  return readTasks().find((task) => task.id === id) || null;
}

export async function getRecurrenceSeriesById(_id: number): Promise<RecurrenceSeries | null> {
  return null;
}

export async function generateMissingOccurrences(_series: RecurrenceSeries, _fromDate?: string): Promise<Task[]> {
  return [];
}

export async function createTask(data: CreateTaskInput): Promise<Task> {
  if (data.dueDate && new Date(data.dueDate).getTime() <= Date.now()) {
    throw new Error(data.recurrence
      ? 'Recurring tasks must start in the future.'
      : 'Due date and time must be in the future.'
    );
  }

  const tasks = readTasks();
  const task = createTaskFromInput(data, nextId(tasks));
  tasks.push(task);
  writeTasks(tasks);
  return task;
}

export async function updateTask(id: number, data: UpdateTaskInput, _scope: RecurrenceScope = 'this'): Promise<Task> {
  const tasks = readTasks();
  const index = tasks.findIndex((task) => task.id === id);
  if (index < 0) {
    throw new Error('Task not found');
  }

  const current = tasks[index];
  const completed = data.completed ?? current.completed;
  const updated: Task = {
    ...current,
    title: data.title ?? current.title,
    description: data.description !== undefined ? data.description || null : current.description,
    completed,
    priority: data.priority ?? current.priority,
    dueDate: data.dueDate !== undefined ? data.dueDate || null : current.dueDate,
    notificationId: data.notificationId !== undefined ? data.notificationId || null : current.notificationId,
    reminderTimes: data.reminderTimes !== undefined ? data.reminderTimes : current.reminderTimes,
    contactId: data.contactId !== undefined ? data.contactId || null : current.contactId,
    taskAddress: data.taskAddress !== undefined ? data.taskAddress || null : current.taskAddress,
    latitude: data.latitude !== undefined ? data.latitude || null : current.latitude,
    longitude: data.longitude !== undefined ? data.longitude || null : current.longitude,
    bill: data.bill !== undefined ? data.bill || null : current.bill,
    billCurrency: data.billCurrency !== undefined ? data.billCurrency || null : current.billCurrency,
    comment: data.comment !== undefined ? data.comment || null : current.comment,
    completedAt: data.completedAt !== undefined
      ? data.completedAt
      : completed && !current.completedAt
        ? nowIso()
        : !completed
          ? null
          : current.completedAt,
    recurrenceFrequency: data.recurrence?.frequency ?? current.recurrenceFrequency ?? null,
    recurrenceInterval: data.recurrence?.interval ?? current.recurrenceInterval ?? null,
    recurrenceWeekdays: data.recurrence?.weekdays ?? current.recurrenceWeekdays ?? null,
    recurrenceEndDate: data.recurrence?.endDate ?? current.recurrenceEndDate ?? null,
    recurrenceOccurrenceCount: data.recurrence?.occurrenceCount ?? current.recurrenceOccurrenceCount ?? null,
    updatedAt: nowIso(),
  };

  tasks[index] = updated;
  writeTasks(tasks);
  return updated;
}

export async function deleteTask(id: number): Promise<void> {
  writeTasks(readTasks().filter((task) => task.id !== id));
}

export async function toggleTaskComplete(id: number): Promise<Task> {
  const task = await getTaskById(id);
  if (!task) {
    throw new Error('Task not found');
  }

  return updateTask(id, {
    completed: !task.completed,
    completedAt: !task.completed ? nowIso() : null,
  });
}

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
  const tasks = readTasks();
  const now = nowIso();
  const currentMonth = now.slice(0, 7);
  const byPriority: Record<string, number> = {};

  for (const task of tasks) {
    byPriority[task.priority] = (byPriority[task.priority] || 0) + 1;
  }

  const billingByCurrency = new Map<string, number>();
  const monthlyBilling = new Map<string, { month: string; currency: string; amount: number }>();
  const billingByCategory = new Map<string, { category: string; currency: string; amount: number }>();

  for (const task of tasks) {
    if (task.bill == null) continue;
    const currency = task.billCurrency || 'USD';
    const expenditureDate = task.completed && task.completedAt
      ? task.completedAt
      : task.dueDate || task.createdAt;
    const expenditureMonth = expenditureDate?.slice(0, 7);

    if (expenditureMonth === currentMonth) {
      billingByCurrency.set(currency, (billingByCurrency.get(currency) || 0) + task.bill);
    }

    if (expenditureMonth) {
      const monthlyKey = `${expenditureMonth}:${currency}`;
      const monthly = monthlyBilling.get(monthlyKey) || { month: expenditureMonth, currency, amount: 0 };
      monthly.amount += task.bill;
      monthlyBilling.set(monthlyKey, monthly);
    }

    const categoryKey = `${task.title}:${currency}`;
    const category = billingByCategory.get(categoryKey) || { category: task.title, currency, amount: 0 };
    category.amount += task.bill;
    billingByCategory.set(categoryKey, category);
  }

  return {
    total: tasks.length,
    completed: tasks.filter((task) => task.completed).length,
    pending: tasks.filter((task) => !task.completed).length,
    overdue: tasks.filter((task) => !task.completed && task.dueDate && task.dueDate < now).length,
    byPriority,
    totalBilling: Array.from(billingByCurrency, ([currency, amount]) => ({ currency, amount })),
    monthlyBilling: Array.from(monthlyBilling.values()).sort((a, b) => b.month.localeCompare(a.month)).slice(0, 12),
    billingByCategory: Array.from(billingByCategory.values()).sort((a, b) => b.amount - a.amount).slice(0, 10),
  };
}
