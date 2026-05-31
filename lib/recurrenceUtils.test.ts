import { calculateRecurrenceDates } from './recurrenceUtils';

describe('calculateRecurrenceDates', () => {
  it('generates every requested monthly occurrence when count exceeds the rolling window', () => {
    const dates = calculateRecurrenceDates({
      frequency: 'monthly',
      interval: 1,
      startDate: '2026-06-15T10:30:00.000Z',
      occurrenceCount: 12,
    });

    expect(dates).toEqual([
      '2026-06-15',
      '2026-07-15',
      '2026-08-15',
      '2026-09-15',
      '2026-10-15',
      '2026-11-15',
      '2026-12-15',
      '2027-01-15',
      '2027-02-15',
      '2027-03-15',
      '2027-04-15',
      '2027-05-15',
    ]);
  });

  it('keeps weekly repeats anchored to the initial due date weekday', () => {
    const dates = calculateRecurrenceDates({
      frequency: 'weekly',
      interval: 1,
      weekdays: [1],
      startDate: '2026-06-15T10:30:00.000Z',
      occurrenceCount: 4,
    });

    expect(dates).toEqual([
      '2026-06-15',
      '2026-06-22',
      '2026-06-29',
      '2026-07-06',
    ]);
  });
});
