import { CreateTaskInput, RecurrenceFrequency, RecurrenceRuleInput, RecurrenceSeries } from '@/types/task';

export const RECURRENCE_GENERATION_DAYS = 90;

export function normalizeInterval(interval?: number | null): number {
  if (!interval || interval < 1 || !Number.isFinite(interval)) {
    return 1;
  }
  return Math.floor(interval);
}

function startOfDay(date: Date): Date {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function parseRuleDate(value: string): Date {
  const [year, month, day] = value.split('T')[0].split('-').map(Number);
  if (year && month && day) {
    return startOfDay(new Date(year, month - 1, day));
  }
  return startOfDay(new Date(value));
}

function dateKey(date: Date): string {
  const normalized = startOfDay(date);
  const year = normalized.getFullYear();
  const month = String(normalized.getMonth() + 1).padStart(2, '0');
  const day = String(normalized.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function addMonthsClamped(date: Date, months: number, preferredDay: number): Date {
  const next = new Date(date);
  next.setDate(1);
  next.setMonth(next.getMonth() + months);
  const lastDay = new Date(next.getFullYear(), next.getMonth() + 1, 0).getDate();
  next.setDate(Math.min(preferredDay, lastDay));
  return next;
}

function addYearsClamped(date: Date, years: number, preferredMonth: number, preferredDay: number): Date {
  const next = new Date(date);
  next.setFullYear(next.getFullYear() + years, preferredMonth, 1);
  const lastDay = new Date(next.getFullYear(), preferredMonth + 1, 0).getDate();
  next.setDate(Math.min(preferredDay, lastDay));
  return next;
}

function weeksBetween(a: Date, b: Date): number {
  const dayMs = 24 * 60 * 60 * 1000;
  return Math.floor((startOfDay(b).getTime() - startOfDay(a).getTime()) / dayMs / 7);
}

export function buildOccurrenceDueDate(occurrenceDate: string, dueTime: string | null): string {
  const dueDate = new Date(`${occurrenceDate}T00:00:00.000`);
  if (dueTime) {
    const [hours, minutes] = dueTime.split(':').map(Number);
    dueDate.setHours(hours || 0, minutes || 0, 0, 0);
  }
  return dueDate.toISOString();
}

export function getDueTime(dueDate?: string | null): string | null {
  if (!dueDate) return null;
  const date = new Date(dueDate);
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

export function calculateRecurrenceDates(
  rule: RecurrenceRuleInput,
  options?: { windowEnd?: Date; fromDate?: Date }
): string[] {
  const interval = normalizeInterval(rule.interval);
  const start = parseRuleDate(rule.startDate);
  const defaultWindowEnd = addDays(start, RECURRENCE_GENERATION_DAYS);
  const windowEnd = startOfDay(options?.windowEnd || defaultWindowEnd);
  const fromDate = startOfDay(options?.fromDate || start);
  const endDate = rule.endDate ? parseRuleDate(rule.endDate) : null;
  const maxCount = rule.occurrenceCount || null;
  const dates: string[] = [];

  const canInclude = (candidate: Date, generatedCount: number) => {
    if (candidate > windowEnd) return false;
    if (endDate && candidate > endDate) return false;
    if (maxCount && generatedCount >= maxCount) return false;
    return true;
  };

  if (rule.frequency === 'weekly') {
    const weekdays = (rule.weekdays?.length ? rule.weekdays : [start.getDay()])
      .map((day) => Math.max(0, Math.min(6, Math.floor(day))))
      .sort((a, b) => a - b);
    let cursor = new Date(start);
    let generatedCount = 0;
    while (canInclude(cursor, generatedCount)) {
      if (weekdays.includes(cursor.getDay()) && weeksBetween(start, cursor) % interval === 0) {
        generatedCount += 1;
        if (cursor >= fromDate) {
          dates.push(dateKey(cursor));
        }
      }
      cursor = addDays(cursor, 1);
    }
    return dates;
  }

  let cursor = new Date(start);
  let generatedCount = 0;
  const preferredDay = start.getDate();
  const preferredMonth = start.getMonth();

  while (canInclude(cursor, generatedCount)) {
    generatedCount += 1;
    if (cursor >= fromDate) {
      dates.push(dateKey(cursor));
    }

    if (rule.frequency === 'daily') {
      cursor = addDays(cursor, interval);
    } else if (rule.frequency === 'monthly') {
      cursor = addMonthsClamped(cursor, interval, preferredDay);
    } else {
      cursor = addYearsClamped(cursor, interval, preferredMonth, preferredDay);
    }
  }

  return dates;
}

export function recurrenceSeriesToRule(series: RecurrenceSeries): RecurrenceRuleInput {
  return {
    frequency: series.frequency,
    interval: series.interval,
    weekdays: series.weekdays || undefined,
    startDate: series.startDate,
    endDate: series.endDate,
    occurrenceCount: series.occurrenceCount,
  };
}

export function getRecurrenceSummary(frequency?: RecurrenceFrequency | null, interval: number = 1): string | null {
  if (!frequency) return null;
  const cadence = interval > 1 ? `Every ${interval}` : 'Every';
  switch (frequency) {
    case 'daily':
      return interval > 1 ? `${cadence} days` : 'Repeats daily';
    case 'weekly':
      return interval > 1 ? `${cadence} weeks` : 'Repeats weekly';
    case 'monthly':
      return interval > 1 ? `${cadence} months` : 'Repeats monthly';
    case 'yearly':
      return interval > 1 ? `${cadence} years` : 'Repeats yearly';
  }
}

export function createOccurrenceInput(
  series: RecurrenceSeries,
  occurrenceDate: string
): CreateTaskInput {
  return {
    title: series.title,
    description: series.description || undefined,
    completed: false,
    priority: series.priority,
    dueDate: buildOccurrenceDueDate(occurrenceDate, series.dueTime),
    reminderTimes: series.reminderTimes || undefined,
    contactId: series.contactId || undefined,
    taskAddress: series.taskAddress || undefined,
    latitude: series.latitude || undefined,
    longitude: series.longitude || undefined,
    bill: series.bill || undefined,
    billCurrency: series.billCurrency || undefined,
    comment: series.comment || undefined,
    recurrenceSeriesId: series.id,
    recurrenceOccurrenceDate: occurrenceDate,
    recurrenceException: false,
    generatedFromRuleVersion: series.ruleVersion,
  };
}
