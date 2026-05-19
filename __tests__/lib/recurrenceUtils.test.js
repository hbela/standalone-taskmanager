import { calculateRecurrenceDates, getRecurrenceSummary } from '../../lib/recurrenceUtils';

describe('recurrenceUtils', () => {
  it('generates daily occurrences with an interval and count', () => {
    const dates = calculateRecurrenceDates({
      frequency: 'daily',
      interval: 2,
      startDate: '2026-05-01T09:00:00.000Z',
      occurrenceCount: 3,
    });

    expect(dates).toEqual(['2026-05-01', '2026-05-03', '2026-05-05']);
  });

  it('generates weekly occurrences on selected weekdays', () => {
    const dates = calculateRecurrenceDates({
      frequency: 'weekly',
      interval: 1,
      weekdays: [1, 3],
      startDate: '2026-05-04T09:00:00.000Z',
      occurrenceCount: 4,
    });

    expect(dates).toEqual(['2026-05-04', '2026-05-06', '2026-05-11', '2026-05-13']);
  });

  it('clamps monthly occurrences to the end of shorter months', () => {
    const dates = calculateRecurrenceDates({
      frequency: 'monthly',
      interval: 1,
      startDate: '2026-01-31T09:00:00.000Z',
      occurrenceCount: 3,
    });

    expect(dates).toEqual(['2026-01-31', '2026-02-28', '2026-03-31']);
  });

  it('clamps yearly leap-day occurrences when needed', () => {
    const dates = calculateRecurrenceDates({
      frequency: 'yearly',
      interval: 1,
      startDate: '2024-02-29T09:00:00.000Z',
      occurrenceCount: 3,
    }, {
      windowEnd: new Date('2026-12-31T00:00:00.000Z'),
    });

    expect(dates).toEqual(['2024-02-29', '2025-02-28', '2026-02-28']);
  });

  it('stops at an end date', () => {
    const dates = calculateRecurrenceDates({
      frequency: 'daily',
      interval: 1,
      startDate: '2026-05-01T09:00:00.000Z',
      endDate: '2026-05-03T23:59:59.000Z',
    });

    expect(dates).toEqual(['2026-05-01', '2026-05-02', '2026-05-03']);
  });

  it('formats recurrence summaries', () => {
    expect(getRecurrenceSummary('weekly', 1)).toBe('Repeats weekly');
    expect(getRecurrenceSummary('monthly', 2)).toBe('Every 2 months');
  });
});
