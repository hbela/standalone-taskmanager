export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type RecurrenceFrequency = 'daily' | 'weekly' | 'monthly' | 'yearly';
export type RecurrenceScope = 'this' | 'future' | 'series';

export interface RecurrenceRuleInput {
  frequency: RecurrenceFrequency;
  interval?: number;
  weekdays?: number[];
  startDate: string;
  endDate?: string | null;
  occurrenceCount?: number | null;
}

export interface RecurrenceSeries {
  id: number;
  title: string;
  description: string | null;
  priority: TaskPriority;
  dueTime: string | null;
  reminderTimes: number[] | null;
  contactId: string | null;
  taskAddress: string | null;
  latitude: number | null;
  longitude: number | null;
  bill: number | null;
  billCurrency: string | null;
  comment: string | null;
  frequency: RecurrenceFrequency;
  interval: number;
  weekdays: number[] | null;
  startDate: string;
  endDate: string | null;
  occurrenceCount: number | null;
  active: boolean;
  ruleVersion: number;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  priority: TaskPriority;
  dueDate: string | null;
  notificationId: string | null;
  reminderTimes: number[] | null; // Minutes before due date
  contactId: string | null;
  contact?: {
    id: number;
    fullName: string;
    phone: string | null;
    email: string | null;
    address: string | null;
  } | null;
  taskAddress: string | null;
  latitude: number | null;
  longitude: number | null;
  bill: number | null;
  billCurrency: string | null;
  comment: string | null; // User comment
  completedAt: string | null; // ISO date string when task was completed
  recurrenceSeriesId: number | null;
  recurrenceOccurrenceDate: string | null;
  recurrenceException: boolean;
  generatedFromRuleVersion: number | null;
  recurrenceFrequency?: RecurrenceFrequency | null;
  recurrenceInterval?: number | null;
  recurrenceWeekdays?: number[] | null;
  recurrenceEndDate?: string | null;
  recurrenceOccurrenceCount?: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  completed?: boolean;
  priority?: TaskPriority;
  dueDate?: string;
  notificationId?: string;
  reminderTimes?: number[]; // Minutes before due date
  contactId?: string;
  taskAddress?: string;
  latitude?: number;
  longitude?: number;
  bill?: number;
  billCurrency?: string;
  comment?: string | null;
  completedAt?: string | null;
  recurrence?: RecurrenceRuleInput | null;
  recurrenceSeriesId?: number | null;
  recurrenceOccurrenceDate?: string | null;
  recurrenceException?: boolean;
  generatedFromRuleVersion?: number | null;
}

export interface UpdateTaskInput extends Partial<CreateTaskInput> {
  completed?: boolean;
}

export interface TasksResponse {
  tasks: Task[];
  total?: number;
  page?: number;
  limit?: number;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface TaskResponse {
  task: Task;
}
